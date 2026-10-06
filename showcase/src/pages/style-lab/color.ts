/** OKLCH helpers for the palette designer. Lightness is 0..1, hue in degrees. */
export type Oklch = { l: number; c: number; h: number }

function round(value: number, digits: number) {
  return Number(value.toFixed(digits))
}

export function formatOklch({ l, c, h }: Oklch) {
  return `oklch(${round(l, 3)} ${round(c, 3)} ${c === 0 ? 0 : round(h, 2)})`
}

/** Parses `oklch(L C H)` with L as 0..1 or a percentage. Null for anything else. */
export function parseOklch(css: string): Oklch | null {
  const match = css
    .trim()
    .match(
      /^oklch\(\s*([\d.]+)(%?)\s+([\d.]+)\s+([\d.]+)(?:deg)?\s*(?:\/[^)]*)?\)$/i
    )
  if (!match) return null
  const l = Number(match[1]) / (match[2] === "%" ? 100 : 1)
  return { l, c: Number(match[3]), h: Number(match[4]) }
}

function linearToSrgb(x: number) {
  return x <= 0.0031308 ? 12.92 * x : 1.055 * x ** (1 / 2.4) - 0.055
}

function srgbToLinear(x: number) {
  return x <= 0.04045 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4
}

/** Linear sRGB, not clamped, so callers can tell when a color is out of gamut. */
export function oklchToLinearRgb({ l, c, h }: Oklch): [number, number, number] {
  const hr = (h * Math.PI) / 180
  const a = c * Math.cos(hr)
  const b = c * Math.sin(hr)
  const l_ = (l + 0.3963377774 * a + 0.2158037573 * b) ** 3
  const m_ = (l - 0.1055613458 * a - 0.0638541728 * b) ** 3
  const s_ = (l - 0.0894841775 * a - 1.291485548 * b) ** 3
  return [
    4.0767416621 * l_ - 3.3077115913 * m_ + 0.2309699292 * s_,
    -1.2684380046 * l_ + 2.6097574011 * m_ - 0.3413193965 * s_,
    -0.0041960863 * l_ - 0.7034186147 * m_ + 1.707614701 * s_,
  ]
}

export function inGamut(color: Oklch) {
  return oklchToLinearRgb(color).every((v) => v >= -0.0005 && v <= 1.0005)
}

export function oklchToHex(color: Oklch) {
  return `#${oklchToLinearRgb(color)
    .map((v) =>
      Math.round(Math.min(1, Math.max(0, linearToSrgb(v))) * 255)
        .toString(16)
        .padStart(2, "0")
    )
    .join("")}`
}

export function hexToOklch(hex: string): Oklch {
  const clean = hex.replace("#", "")
  const [r, g, b] = [0, 2, 4].map((i) =>
    srgbToLinear(Number.parseInt(clean.slice(i, i + 2), 16) / 255)
  )
  const l_ = Math.cbrt(0.4122214708 * r + 0.5363015719 * g + 0.0514459929 * b)
  const m_ = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b)
  const s_ = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b)
  const l = 0.2104542553 * l_ + 0.793617785 * m_ - 0.0040720468 * s_
  const a = 1.9779984951 * l_ - 2.428592205 * m_ + 0.4505937099 * s_
  const bb = 0.0259040371 * l_ + 0.7827717662 * m_ - 0.808675766 * s_
  const c = Math.sqrt(a * a + bb * bb)
  const h = ((Math.atan2(bb, a) * 180) / Math.PI + 360) % 360
  return { l, c: c < 0.0005 ? 0 : c, h: c < 0.0005 ? 0 : h }
}

/* ---------------------------------------------------------------- contrast */

let context: CanvasRenderingContext2D | null | undefined

/** Resolves any CSS color, painted over `backdrop`, to 0..255 sRGB. */
export function toRgb(
  css: string,
  backdrop = "#fff"
): [number, number, number] {
  if (context === undefined && typeof document !== "undefined") {
    context = document
      .createElement("canvas")
      .getContext("2d", { willReadFrequently: true })
  }
  if (!context) return [0, 0, 0]
  context.clearRect(0, 0, 1, 1)
  context.fillStyle = backdrop
  context.fillRect(0, 0, 1, 1)
  context.fillStyle = "#000"
  context.fillStyle = css
  context.fillRect(0, 0, 1, 1)
  const [r, g, b] = context.getImageData(0, 0, 1, 1).data
  return [r, g, b]
}

function luminance([r, g, b]: [number, number, number]) {
  const f = (v: number) => srgbToLinear(v / 255)
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b)
}

/** WCAG 2 contrast ratio of two already-resolved colors. */
export function contrast(
  fg: [number, number, number],
  bg: [number, number, number]
) {
  const [hi, lo] = [luminance(fg), luminance(bg)].sort((x, y) => y - x)
  return (hi + 0.05) / (lo + 0.05)
}
