import tokens from "../../../../style/tokens.json"
import { DEFAULT_PALETTE, findPalette, shippedColors } from "./palettes"

export const ELEVATIONS = ["control", "raised", "overlay", "modal"] as const
export type Elevation = (typeof ELEVATIONS)[number]

export const ELEVATION_INFO: Record<
  Elevation,
  { label: string; usage: string }
> = {
  control: {
    label: "Control",
    usage:
      "Buttons, inputs, select triggers, checkboxes, radios, switch thumbs",
  },
  raised: { label: "Raised", usage: "Cards, floating and inset sidebars" },
  overlay: {
    label: "Overlay",
    usage: "Menus, popovers, select lists, hover cards, tooltips, toasts",
  },
  modal: { label: "Modal", usage: "Dialogs, alert dialogs, sheets, drawers" },
}

export const COLOR_KEYS = [
  "background",
  "foreground",
  "card",
  "popover",
  "muted",
  "border",
  "input",
  "ring",
  "primary",
  "secondary",
] as const
export type ColorKey = (typeof COLOR_KEYS)[number]

export const MODES = ["light", "dark"] as const
export type Mode = (typeof MODES)[number]

export type Layer = {
  id: string
  x: number
  y: number
  blur: number
  spread: number
  /** #rrggbb */
  color: string
  /** 0..1 */
  alpha: number
  inset: boolean
  enabled: boolean
}

export type ModeState = {
  elevations: Record<Elevation, Layer[]>
  colors: Record<ColorKey, string>
  /** Multiplies every layer's alpha in this mode. */
  intensity: number
}

export type LabState = {
  /** px */
  radius: number
  /** Name of the palette in palettes.ts the colors start from. */
  palette: string
  light: ModeState
  dark: ModeState
}

let idCounter = 0
export function newId() {
  idCounter += 1
  return `l${Date.now().toString(36)}${idCounter}`
}

/* ------------------------------------------------------------------ colors */

function toHexPart(value: number) {
  return Math.round(Math.min(255, Math.max(0, value)))
    .toString(16)
    .padStart(2, "0")
}

export function rgbToHex(r: number, g: number, b: number) {
  return `#${toHexPart(r)}${toHexPart(g)}${toHexPart(b)}`
}

export function hexToRgb(hex: string): [number, number, number] {
  const clean = hex.replace("#", "")
  const full =
    clean.length === 3
      ? clean
          .split("")
          .map((c) => c + c)
          .join("")
      : clean.padEnd(6, "0")
  return [
    Number.parseInt(full.slice(0, 2), 16),
    Number.parseInt(full.slice(2, 4), 16),
    Number.parseInt(full.slice(4, 6), 16),
  ]
}

let canvasContext: CanvasRenderingContext2D | null | undefined

/** Resolves any CSS color (oklch, color-mix, names…) to sRGB through a canvas. */
export function resolveColor(css: string): { hex: string; alpha: number } {
  const rgbMatch = css.match(
    /^rgba?\(\s*([\d.]+)[\s,]+([\d.]+)[\s,]+([\d.]+)(?:\s*[,/]\s*([\d.]+)(%?))?\s*\)$/
  )
  if (rgbMatch) {
    const alphaRaw = rgbMatch[4] === undefined ? 1 : Number(rgbMatch[4])
    return {
      hex: rgbToHex(
        Number(rgbMatch[1]),
        Number(rgbMatch[2]),
        Number(rgbMatch[3])
      ),
      alpha: rgbMatch[5] === "%" ? alphaRaw / 100 : alphaRaw,
    }
  }
  if (/^#[\da-f]{3}([\da-f]{3})?$/i.test(css)) {
    return { hex: rgbToHex(...hexToRgb(css)), alpha: 1 }
  }
  if (canvasContext === undefined && typeof document !== "undefined") {
    canvasContext = document
      .createElement("canvas")
      .getContext("2d", { willReadFrequently: true })
  }
  if (!canvasContext) return { hex: "#000000", alpha: 1 }
  canvasContext.clearRect(0, 0, 1, 1)
  canvasContext.fillStyle = "#000"
  canvasContext.fillStyle = css
  canvasContext.fillRect(0, 0, 1, 1)
  const [r, g, b, a] = canvasContext.getImageData(0, 0, 1, 1).data
  return { hex: rgbToHex(r, g, b), alpha: Math.round((a / 255) * 100) / 100 }
}

/* ----------------------------------------------------------------- shadows */

function splitTopLevel(value: string) {
  const parts: string[] = []
  let depth = 0
  let current = ""
  for (const char of value) {
    if (char === "(") depth += 1
    if (char === ")") depth -= 1
    if (char === "," && depth === 0) {
      parts.push(current.trim())
      current = ""
    } else {
      current += char
    }
  }
  if (current.trim()) parts.push(current.trim())
  return parts
}

const LENGTH = /^-?[\d.]+(px)?$/

export function parseShadow(value: string): Layer[] {
  if (!value || value.trim() === "none") return []
  return splitTopLevel(value).map((part) => {
    let rest = part
    let inset = false
    if (/(^|\s)inset(\s|$)/.test(rest)) {
      inset = true
      rest = rest.replace(/(^|\s)inset(\s|$)/, " ").trim()
    }
    // Lengths are the leading space-separated numbers; the rest is the color.
    const tokens = rest.split(/\s+(?![^(]*\))/)
    const lengths: number[] = []
    const colorTokens: string[] = []
    for (const token of tokens) {
      if (
        colorTokens.length === 0 &&
        LENGTH.test(token) &&
        lengths.length < 4
      ) {
        lengths.push(Number.parseFloat(token))
      } else {
        colorTokens.push(token)
      }
    }
    const { hex, alpha } = resolveColor(
      colorTokens.join(" ") || "rgb(0 0 0 / 0.1)"
    )
    return {
      id: newId(),
      x: lengths[0] ?? 0,
      y: lengths[1] ?? 0,
      blur: lengths[2] ?? 0,
      spread: lengths[3] ?? 0,
      color: hex,
      alpha,
      inset,
      enabled: true,
    }
  })
}

function round(value: number, digits = 3) {
  const factor = 10 ** digits
  return Math.round(value * factor) / factor
}

export function layerToCss(layer: Layer, intensity = 1) {
  const [r, g, b] = hexToRgb(layer.color)
  const alpha = round(Math.min(1, layer.alpha * intensity))
  const lengths = [layer.x, layer.y, layer.blur, layer.spread]
    .map((n) => (n === 0 ? "0" : `${n}px`))
    .join(" ")
  return `${layer.inset ? "inset " : ""}${lengths} rgb(${r} ${g} ${b} / ${alpha})`
}

export function shadowToCss(layers: Layer[], intensity = 1) {
  const visible = layers.filter((layer) => layer.enabled)
  if (visible.length === 0) return "none"
  return visible.map((layer) => layerToCss(layer, intensity)).join(", ")
}

/* ----------------------------------------------------------------- presets */

export type Preset = {
  name: string
  description: string
  light: Record<Elevation, string>
  dark: Record<Elevation, string>
}

const lightTokens = tokens.light as Record<string, string>
const darkTokens = tokens.dark as Record<string, string>

function tokenSet(source: Record<string, string>) {
  return Object.fromEntries(
    ELEVATIONS.map((e) => [e, source[`elevation-${e}`] ?? "none"])
  ) as Record<Elevation, string>
}

export const PRESETS: Preset[] = [
  {
    name: "Current",
    description: "What style/tokens.json ships today.",
    light: tokenSet(lightTokens),
    dark: tokenSet({ ...lightTokens, ...darkTokens }),
  },
  {
    name: "Stripe",
    description: "Hairline ring plus a tight and a wide slate-blue drop.",
    light: {
      control:
        "0 0 0 1px rgb(60 66 87 / 0.16), 0 1px 1px 0 rgb(0 0 0 / 0.12), 0 2px 5px 0 rgb(60 66 87 / 0.08)",
      raised: "0 2px 5px 0 rgb(60 66 87 / 0.08), 0 1px 1px 0 rgb(0 0 0 / 0.12)",
      overlay:
        "0 0 0 1px rgb(136 152 170 / 0.1), 0 15px 35px 0 rgb(49 49 93 / 0.1), 0 5px 15px 0 rgb(0 0 0 / 0.08)",
      modal:
        "0 7px 14px 0 rgb(60 66 87 / 0.08), 0 3px 6px 0 rgb(0 0 0 / 0.12), 0 50px 100px -20px rgb(50 50 93 / 0.25), 0 30px 60px -30px rgb(0 0 0 / 0.3)",
    },
    dark: {
      control:
        "0 0 0 1px rgb(0 0 0 / 0.4), 0 1px 1px 0 rgb(0 0 0 / 0.3), 0 2px 5px 0 rgb(0 0 0 / 0.25)",
      raised: "0 2px 5px 0 rgb(0 0 0 / 0.3), 0 1px 1px 0 rgb(0 0 0 / 0.35)",
      overlay:
        "0 15px 35px 0 rgb(0 0 0 / 0.45), 0 5px 15px 0 rgb(0 0 0 / 0.35)",
      modal:
        "0 50px 100px -20px rgb(0 0 0 / 0.6), 0 30px 60px -30px rgb(0 0 0 / 0.7)",
    },
  },
  {
    name: "Soft",
    description: "Diffuse, low-contrast shadows with negative spread.",
    light: {
      control: "0 1px 2px 0 rgb(16 24 40 / 0.05)",
      raised:
        "0 1px 3px 0 rgb(16 24 40 / 0.1), 0 1px 2px 0 rgb(16 24 40 / 0.06)",
      overlay:
        "0 12px 16px -4px rgb(16 24 40 / 0.08), 0 4px 6px -2px rgb(16 24 40 / 0.03)",
      modal: "0 24px 48px -12px rgb(16 24 40 / 0.18)",
    },
    dark: {
      control: "0 1px 2px 0 rgb(0 0 0 / 0.3)",
      raised: "0 1px 3px 0 rgb(0 0 0 / 0.4), 0 1px 2px 0 rgb(0 0 0 / 0.3)",
      overlay:
        "0 12px 16px -4px rgb(0 0 0 / 0.4), 0 4px 6px -2px rgb(0 0 0 / 0.25)",
      modal: "0 24px 48px -12px rgb(0 0 0 / 0.6)",
    },
  },
  {
    name: "Crisp",
    description: "Hairline outline with short, stacked drops.",
    light: {
      control: "0 0 0 1px rgb(0 0 0 / 0.06), 0 1px 2px 0 rgb(0 0 0 / 0.06)",
      raised: "0 0 0 1px rgb(0 0 0 / 0.05), 0 2px 4px 0 rgb(0 0 0 / 0.04)",
      overlay:
        "0 0 0 1px rgb(0 0 0 / 0.08), 0 4px 8px 0 rgb(0 0 0 / 0.04), 0 16px 24px 0 rgb(0 0 0 / 0.06)",
      modal:
        "0 0 0 1px rgb(0 0 0 / 0.08), 0 8px 16px 0 rgb(0 0 0 / 0.06), 0 32px 64px 0 rgb(0 0 0 / 0.12)",
    },
    dark: {
      control:
        "0 0 0 1px rgb(255 255 255 / 0.06), 0 1px 2px 0 rgb(0 0 0 / 0.4)",
      raised:
        "0 0 0 1px rgb(255 255 255 / 0.05), 0 2px 4px 0 rgb(0 0 0 / 0.35)",
      overlay:
        "0 0 0 1px rgb(255 255 255 / 0.08), 0 4px 8px 0 rgb(0 0 0 / 0.3), 0 16px 24px 0 rgb(0 0 0 / 0.4)",
      modal:
        "0 0 0 1px rgb(255 255 255 / 0.08), 0 8px 16px 0 rgb(0 0 0 / 0.35), 0 32px 64px 0 rgb(0 0 0 / 0.55)",
    },
  },
  {
    name: "Flat",
    description: "No shadows anywhere.",
    light: { control: "none", raised: "none", overlay: "none", modal: "none" },
    dark: { control: "none", raised: "none", overlay: "none", modal: "none" },
  },
]

/* ----------------------------------------------------------------- default */

function paletteColors(paletteName: string, mode: Mode) {
  const source = findPalette(paletteName)[mode]
  return Object.fromEntries(
    COLOR_KEYS.map((key) => [key, source[key] ?? ""])
  ) as Record<ColorKey, string>
}

export function defaultRadius() {
  const raw = lightTokens.radius ?? "0.375rem"
  return raw.endsWith("rem")
    ? Number.parseFloat(raw) * 16
    : Number.parseFloat(raw)
}

export function presetElevations(preset: Preset, mode: Mode) {
  return Object.fromEntries(
    ELEVATIONS.map((e) => [e, parseShadow(preset[mode][e])])
  ) as Record<Elevation, Layer[]>
}

export function createDefaultState(): LabState {
  const current = PRESETS[0]
  return {
    radius: defaultRadius(),
    palette: DEFAULT_PALETTE,
    light: {
      elevations: presetElevations(current, "light"),
      colors: paletteColors(DEFAULT_PALETTE, "light"),
      intensity: 1,
    },
    dark: {
      elevations: presetElevations(current, "dark"),
      colors: paletteColors(DEFAULT_PALETTE, "dark"),
      intensity: 1,
    },
  }
}

export function paletteColorsFor(paletteName: string, mode: Mode) {
  return paletteColors(paletteName, mode)
}

/** The palette's full color set with the lab's per-key edits on top. */
export function effectiveColors(state: LabState, mode: Mode) {
  return { ...findPalette(state.palette)[mode], ...state[mode].colors }
}

/* ------------------------------------------------------------------ export */

function formatRadius(px: number) {
  return `${round(px / 16, 4)}rem`
}

export function modeVars(state: LabState, mode: Mode) {
  const modeState = state[mode]
  const vars: Record<string, string> = {}
  for (const e of ELEVATIONS) {
    vars[`elevation-${e}`] = shadowToCss(
      modeState.elevations[e],
      modeState.intensity
    )
  }
  return vars
}

export function changedColors(state: LabState, mode: Mode) {
  const shipped = shippedColors(mode)
  return Object.fromEntries(
    Object.entries(effectiveColors(state, mode)).filter(
      ([key, value]) => value !== shipped[key]
    )
  )
}

export function exportTokensJson(state: LabState) {
  return JSON.stringify(
    {
      light: {
        radius: formatRadius(state.radius),
        ...modeVars(state, "light"),
      },
      dark: modeVars(state, "dark"),
    },
    null,
    2
  )
}

export function exportColorsJson(state: LabState) {
  const light = changedColors(state, "light")
  const dark = changedColors(state, "dark")
  if (Object.keys(light).length === 0 && Object.keys(dark).length === 0)
    return ""
  return JSON.stringify({ light, dark }, null, 2)
}

export function exportCss(state: LabState) {
  const block = (selector: string, mode: Mode) => {
    const lines = [
      ...(mode === "light"
        ? [`  --radius: ${formatRadius(state.radius)};`]
        : []),
      ...Object.entries(changedColors(state, mode)).map(
        ([k, v]) => `  --${k}: ${v};`
      ),
      ...Object.entries(modeVars(state, mode)).map(
        ([k, v]) => `  --${k}: ${v};`
      ),
    ]
    return `${selector} {\n${lines.join("\n")}\n}`
  }
  return `${block(":root", "light")}\n\n${block(".dark", "dark")}`
}
