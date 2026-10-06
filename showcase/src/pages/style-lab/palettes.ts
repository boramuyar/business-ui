import colors from "../../../../style/colors.json"

export type PaletteMode = "light" | "dark"
type ColorSet = Record<string, string>

const shippedLight = colors.light as ColorSet
const shippedDark = colors.dark as ColorSet

/** Every color the style ships, per mode. Palettes fill the same keys. */
export function shippedColors(mode: PaletteMode): ColorSet {
  return mode === "light" ? shippedLight : { ...shippedLight, ...shippedDark }
}

export const PALETTE_KEYS = Object.keys(shippedLight)

/* ---------------------------------------------------------------- builder */

type Neutral = {
  /** oklch hue of the gray ramp. */
  hue: number
  /** Chroma multiplier against zinc: 0 is pure gray, 1 is zinc, 4 is slate. */
  tint: number
}

type Intent = { light: string; dark: string }

type PaletteSpec = {
  neutral: Neutral
  primary: Intent
  primaryForeground: Intent
  /** Five chart colors, darkest last. Defaults to a ramp on the primary hue. */
  chart?: string[]
  destructive?: Intent
  success?: Intent
  warning?: Intent
  info?: Intent
}

function oklch(l: number, c: number, h: number, alpha?: string) {
  const round = (n: number, d: number) => Number(n.toFixed(d))
  const base = `oklch(${round(l, 3)} ${round(c, 4)} ${round(h, 2)}`
  return alpha ? `${base} / ${alpha})` : `${base})`
}

/** Zinc's lightness and chroma steps, re-hued and re-tinted. */
function gray({ hue, tint }: Neutral, l: number, zincChroma: number) {
  return oklch(l, zincChroma * tint, hue)
}

function build(spec: PaletteSpec, mode: PaletteMode): ColorSet {
  const n = (l: number, c: number) => gray(spec.neutral, l, c)
  const pick = (intent: Intent | undefined, key: string) =>
    intent ? intent[mode] : shippedColors(mode)[key]

  const primary = spec.primary[mode]
  const primaryForeground = spec.primaryForeground[mode]
  const chart = spec.chart ?? []

  const neutrals: ColorSet =
    mode === "light"
      ? {
          background: "oklch(1 0 0)",
          foreground: n(0.141, 0.005),
          card: "oklch(1 0 0)",
          "card-foreground": n(0.141, 0.005),
          popover: "oklch(1 0 0)",
          "popover-foreground": n(0.141, 0.005),
          secondary: n(0.967, 0.0015),
          "secondary-foreground": n(0.21, 0.006),
          muted: n(0.967, 0.0015),
          "muted-foreground": n(0.552, 0.016),
          accent: n(0.967, 0.0015),
          "accent-foreground": n(0.21, 0.006),
          border: n(0.92, 0.004),
          input: n(0.92, 0.004),
          ring: n(0.705, 0.015),
          sidebar: n(0.985, 0.001),
          "sidebar-foreground": n(0.141, 0.005),
          "sidebar-accent": n(0.937, 0.002),
          "sidebar-accent-foreground": n(0.21, 0.006),
          "sidebar-border": n(0.92, 0.004),
          "sidebar-ring": n(0.705, 0.015),
        }
      : {
          background: n(0.141, 0.005),
          foreground: n(0.985, 0.001),
          card: n(0.21, 0.006),
          "card-foreground": n(0.985, 0.001),
          popover: n(0.21, 0.006),
          "popover-foreground": n(0.985, 0.001),
          secondary: n(0.274, 0.006),
          "secondary-foreground": n(0.985, 0.001),
          muted: n(0.274, 0.006),
          "muted-foreground": n(0.705, 0.015),
          accent: n(0.274, 0.006),
          "accent-foreground": n(0.985, 0.001),
          border: "oklch(1 0 0 / 10%)",
          input: "oklch(1 0 0 / 15%)",
          ring: n(0.552, 0.016),
          sidebar: n(0.191, 0.005),
          "sidebar-foreground": n(0.985, 0.001),
          "sidebar-accent": n(0.274, 0.006),
          "sidebar-accent-foreground": n(0.985, 0.001),
          "sidebar-border": "oklch(1 0 0 / 10%)",
          "sidebar-ring": n(0.552, 0.016),
        }

  return {
    // Derived shades (subtle, border, strong, emphasis) keep the shipped
    // color-mix formulas, so they follow whatever the base colors are.
    ...shippedColors(mode),
    ...neutrals,
    primary,
    "primary-foreground": primaryForeground,
    destructive: pick(spec.destructive, "destructive"),
    success: pick(spec.success, "success"),
    warning: pick(spec.warning, "warning"),
    info: pick(spec.info, "info"),
    ...Object.fromEntries(chart.map((value, i) => [`chart-${i + 1}`, value])),
    "sidebar-primary": primary,
    "sidebar-primary-foreground": primaryForeground,
  }
}

/** Five steps on one hue, light to dark, for single-series-first charts. */
function chartRamp(hue: number, chroma: number) {
  return [
    oklch(0.72, chroma * 0.7, hue),
    oklch(0.62, chroma * 0.9, hue),
    oklch(0.54, chroma, hue),
    oklch(0.46, chroma * 0.95, hue),
    oklch(0.38, chroma * 0.8, hue),
  ]
}

/* --------------------------------------------------------------- palettes */

export type Palette = {
  name: string
  description: string
  light: ColorSet
  dark: ColorSet
}

function palette(name: string, description: string, spec: PaletteSpec) {
  return {
    name,
    description,
    light: build(spec, "light"),
    dark: build(spec, "dark"),
  }
}

export const PALETTES: Palette[] = [
  {
    name: "Violet",
    description: "What style/colors.json ships today: violet on zinc.",
    light: shippedColors("light"),
    dark: shippedColors("dark"),
  },
  palette(
    "Ink",
    "Deep indigo on cool slate grays. Calm and familiar for finance and admin tools.",
    {
      neutral: { hue: 257, tint: 3 },
      primary: {
        light: "oklch(0.488 0.217 264.4)",
        dark: "oklch(0.546 0.215 262.9)",
      },
      primaryForeground: {
        light: "oklch(0.97 0.014 254.6)",
        dark: "oklch(0.985 0.008 254.6)",
      },
      chart: chartRamp(263, 0.2),
      // Info moves to sky so it doesn't read as a primary action.
      info: {
        light: "oklch(0.588 0.139 241.97)",
        dark: "oklch(0.685 0.148 237.32)",
      },
    }
  ),
  palette(
    "Ledger",
    "Muted teal on blue-green grays. Quiet, trustworthy, easy on long sessions.",
    {
      neutral: { hue: 205, tint: 2.2 },
      primary: {
        light: "oklch(0.511 0.096 186.4)",
        dark: "oklch(0.6 0.104 184.7)",
      },
      primaryForeground: {
        light: "oklch(0.984 0.014 180.72)",
        dark: "oklch(0.21 0.036 190)",
      },
      chart: chartRamp(190, 0.11),
      // Success shifts toward true green so it stays apart from teal.
      success: {
        light: "oklch(0.627 0.17 149.21)",
        dark: "oklch(0.627 0.17 149.21)",
      },
    }
  ),
  palette(
    "Graphite",
    "Monochrome: near-black actions on pure grays, color reserved for status and charts.",
    {
      neutral: { hue: 286, tint: 0 },
      primary: { light: "oklch(0.205 0 0)", dark: "oklch(0.922 0 0)" },
      primaryForeground: {
        light: "oklch(0.985 0 0)",
        dark: "oklch(0.205 0 0)",
      },
      chart: [
        "oklch(0.809 0.105 251.81)",
        "oklch(0.623 0.214 259.82)",
        "oklch(0.546 0.245 262.88)",
        "oklch(0.488 0.243 264.38)",
        "oklch(0.424 0.199 265.64)",
      ],
    }
  ),
  palette(
    "Evergreen",
    "Forest green on warm stone grays. Grounded and natural, good for money-positive products.",
    {
      neutral: { hue: 70, tint: 1.6 },
      primary: {
        light: "oklch(0.448 0.108 151.33)",
        dark: "oklch(0.527 0.137 150.07)",
      },
      primaryForeground: {
        light: "oklch(0.982 0.018 155.83)",
        dark: "oklch(0.982 0.018 155.83)",
      },
      chart: chartRamp(152, 0.13),
      // Success moves to a bluer emerald so it stays apart from primary.
      success: {
        light: "oklch(0.62 0.15 165)",
        dark: "oklch(0.62 0.15 165)",
      },
    }
  ),
  palette(
    "Clay",
    "Burnt orange on warm stone grays. Friendly and editorial without feeling loud.",
    {
      neutral: { hue: 56, tint: 1.6 },
      primary: {
        light: "oklch(0.553 0.163 40.5)",
        dark: "oklch(0.56 0.165 40.5)",
      },
      primaryForeground: {
        light: "oklch(0.98 0.016 73.68)",
        dark: "oklch(0.98 0.016 73.68)",
      },
      chart: chartRamp(42, 0.15),
      // Destructive moves toward crimson so it stays apart from the orange.
      destructive: {
        light: "oklch(0.514 0.222 16.94)",
        dark: "oklch(0.514 0.2 16.94)",
      },
    }
  ),
  palette(
    "Plum",
    "Magenta-plum on neutral grays. Distinctive and confident, still businesslike.",
    {
      neutral: { hue: 330, tint: 1 },
      primary: {
        light: "oklch(0.496 0.209 340)",
        dark: "oklch(0.56 0.21 342)",
      },
      primaryForeground: {
        light: "oklch(0.977 0.017 343.2)",
        dark: "oklch(0.985 0.01 343.2)",
      },
      chart: chartRamp(340, 0.2),
      // Destructive moves toward orange-red so it stays apart from plum.
      destructive: {
        light: "oklch(0.577 0.215 32)",
        dark: "oklch(0.58 0.2 32)",
      },
    }
  ),
]

export const DEFAULT_PALETTE = PALETTES[0].name

export function findPalette(name: string | undefined) {
  return PALETTES.find((p) => p.name === name) ?? PALETTES[0]
}
