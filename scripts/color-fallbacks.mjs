// Precomputed sRGB fallbacks for webviews that predate modern CSS color.
// Office for Mac renders add-ins in the system WKWebView, which can lag years
// behind Safari: without `oklch()` every color token is invalid, without
// `color-mix()` the -subtle/-border/-strong/-emphasis tints are, and without
// relative color syntax the chart ramp is. Each @supports block restates only
// the tokens that need that feature, so modern engines never read them.

const FEATURE_QUERIES = {
  oklch: "@supports not (color: oklch(0 0 0))",
  colorMix: "@supports not (color: color-mix(in oklab, red, white))",
  relativeColor: "@supports not (color: oklch(from red l c h))",
}

/**
 * Builds the fallback rules for a color theme.
 * @param {{ light: Record<string, string>, dark: Record<string, string> }} colors
 * @returns {Record<string, Record<string, Record<string, string>>>} css rules keyed by @supports query
 */
export function buildColorFallbacks(colors) {
  const themes = {
    ":root": { declared: colors.light, resolved: colors.light },
    ".dark": { declared: colors.dark, resolved: { ...colors.light, ...colors.dark } },
  }
  const rules = {}

  for (const [selector, { declared, resolved }] of Object.entries(themes)) {
    for (const [name, value] of Object.entries(declared)) {
      const feature = requiredFeature(value)
      if (!feature) continue
      const query = FEATURE_QUERIES[feature]
      rules[query] ??= {}
      rules[query][selector] ??= {}
      rules[query][selector][`--${name}`] = toRgbString(resolveColor(value, resolved, name))
    }
  }

  return Object.fromEntries(
    Object.values(FEATURE_QUERIES)
      .filter((query) => rules[query])
      .map((query) => [query, rules[query]])
  )
}

/** The newest color feature a value depends on, or null when it needs none. */
function requiredFeature(value) {
  if (value.startsWith("oklch(from")) return "relativeColor"
  if (value.startsWith("color-mix(")) return "colorMix"
  if (value.startsWith("oklch(")) return "oklch"
  return null
}

const OKLCH = /^oklch\(\s*([\d.]+%?)\s+([\d.]+)\s+([\d.]+)\s*(?:\/\s*([\d.]+%?)\s*)?\)$/
const COLOR_MIX = /^color-mix\(in oklab,\s*(.+?)\s+([\d.]+)%,\s*(.+)\)$/
const RELATIVE = /^oklch\(from\s+(var\(--[\w-]+\))\s+(\S+)\s+(c|calc\(c \* [\d.]+\))\s+h\)$/
const VAR = /^var\(--([\w-]+)\)$/

/** Resolves a token value to an OKLab color with alpha: [L, a, b, alpha]. */
function resolveColor(value, vars, name, seen = new Set()) {
  const reference = value.match(VAR)
  if (reference) {
    const [, target] = reference
    if (seen.has(target)) throw new Error(`Circular color reference at --${name}`)
    seen.add(target)
    if (!(target in vars)) throw new Error(`--${name} references unknown --${target}`)
    return resolveColor(vars[target], vars, target, seen)
  }

  const oklch = value.match(OKLCH)
  if (oklch) {
    const [, lightness, chroma, hue, alpha] = oklch
    return [...lchToLab(parseAmount(lightness), Number(chroma), Number(hue)), alpha ? parseAmount(alpha) : 1]
  }

  const mix = value.match(COLOR_MIX)
  if (mix) {
    const [, first, percent, second] = mix
    const weight = Number(percent) / 100
    const a = resolveColor(first, vars, name, new Set(seen))
    const b = resolveColor(second, vars, name, new Set(seen))
    return a.map((channel, index) => channel * weight + b[index] * (1 - weight))
  }

  const relative = value.match(RELATIVE)
  if (relative) {
    const [, source, lightness, chromaExpression] = relative
    const [, a, b, alpha] = resolveColor(source, vars, name, new Set(seen))
    const chroma = Math.hypot(a, b)
    const hue = Math.atan2(b, a)
    const factor = chromaExpression === "c" ? 1 : Number(chromaExpression.match(/[\d.]+/)[0])
    const nextChroma = chroma * factor
    return [parseAmount(lightness), nextChroma * Math.cos(hue), nextChroma * Math.sin(hue), alpha]
  }

  throw new Error(`Cannot compute a fallback for --${name}: ${value}`)
}

/** `0.5` and `50%` both mean one half. */
function parseAmount(amount) {
  return amount.endsWith("%") ? Number(amount.slice(0, -1)) / 100 : Number(amount)
}

function lchToLab(lightness, chroma, hue) {
  const radians = (hue * Math.PI) / 180
  return [lightness, chroma * Math.cos(radians), chroma * Math.sin(radians)]
}

/** OKLab to gamut-clipped sRGB, written in the comma syntax old WebKit parses. */
function toRgbString([lightness, a, b, alpha]) {
  const l = (lightness + 0.3963377774 * a + 0.2158037573 * b) ** 3
  const m = (lightness - 0.1055613458 * a - 0.0638541728 * b) ** 3
  const s = (lightness - 0.0894841775 * a - 1.291485548 * b) ** 3
  const [red, green, blue] = [
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
  ].map(encodeSrgb)

  if (alpha >= 1) return `rgb(${red}, ${green}, ${blue})`
  return `rgba(${red}, ${green}, ${blue}, ${Number(alpha.toFixed(3))})`
}

function encodeSrgb(linear) {
  const clamped = Math.min(1, Math.max(0, linear))
  const encoded = clamped <= 0.0031308 ? 12.92 * clamped : 1.055 * clamped ** (1 / 2.4) - 0.055
  return Math.round(255 * encoded)
}
