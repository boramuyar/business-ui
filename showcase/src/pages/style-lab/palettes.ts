import colors from "../../../../style/colors.json"

export type PaletteMode = "light" | "dark"
export type ColorSet = Record<string, string>

const shippedLight = colors.light as ColorSet
const shippedDark = colors.dark as ColorSet

/** Every color the style ships, per mode. Palettes fill the same keys. */
export function shippedColors(mode: PaletteMode): ColorSet {
  return mode === "light" ? shippedLight : { ...shippedLight, ...shippedDark }
}

export const PALETTE_KEYS = Object.keys(shippedLight)

/* ------------------------------------------------------------------ recipe */

export type Intent = { light: string; dark: string }

export const STATUS_INTENTS = [
  "destructive",
  "success",
  "warning",
  "info",
] as const
export type StatusIntent = (typeof STATUS_INTENTS)[number]

/**
 * A palette is a recipe: a gray ramp, a brand color, four status colors and
 * five chart colors. Everything else in colors.json is derived from these,
 * and `overrides` pins any single token by hand.
 */
export type PaletteSpec = {
  neutral: {
    /** oklch hue of the gray ramp. */
    hue: number
    /** Chroma multiplier against zinc: 0 is pure gray, 1 is zinc, 3 is slate. */
    tint: number
  }
  primary: Intent
  primaryForeground: Intent
  sidebarPrimary: Intent
  destructive: Intent
  success: Intent
  warning: Intent
  info: Intent
  /** Five chart colors, shared by both modes. */
  chart: string[]
  overrides: { light: ColorSet; dark: ColorSet }
}

/**
 * Zinc's steps as the shipped style uses them: [lightness, chroma, hue].
 * The neutral hue rotates these hues, and the tint scales the chroma, so the
 * shipped grays come back exactly at hue 286 and tint 1.
 */
const ZINC_HUE = 286
type Step = [number, number, number]
const GRAYS: Record<PaletteMode, Record<string, Step>> = {
  light: {
    background: [1, 0, 0],
    foreground: [0.141, 0.005, 285.823],
    card: [1, 0, 0],
    "card-foreground": [0.141, 0.005, 285.823],
    popover: [1, 0, 0],
    "popover-foreground": [0.141, 0.005, 285.823],
    secondary: [0.967, 0.001, 286.375],
    "secondary-foreground": [0.21, 0.006, 285.885],
    muted: [0.967, 0.001, 286.375],
    "muted-foreground": [0.552, 0.016, 285.938],
    accent: [0.967, 0.001, 286.375],
    "accent-foreground": [0.21, 0.006, 285.885],
    border: [0.92, 0.004, 286.32],
    input: [0.92, 0.004, 286.32],
    ring: [0.705, 0.015, 286.067],
    sidebar: [0.985, 0, 0],
    "sidebar-foreground": [0.141, 0.005, 285.823],
    "sidebar-accent": [0.937, 0.001, 286.375],
    "sidebar-accent-foreground": [0.21, 0.006, 285.885],
    "sidebar-border": [0.92, 0.004, 286.32],
    "sidebar-ring": [0.705, 0.015, 286.067],
  },
  dark: {
    background: [0.141, 0.005, 285.823],
    foreground: [0.985, 0, 0],
    card: [0.21, 0.006, 285.885],
    "card-foreground": [0.985, 0, 0],
    popover: [0.21, 0.006, 285.885],
    "popover-foreground": [0.985, 0, 0],
    secondary: [0.274, 0.006, 286.033],
    "secondary-foreground": [0.985, 0, 0],
    muted: [0.274, 0.006, 286.033],
    "muted-foreground": [0.705, 0.015, 286.067],
    accent: [0.274, 0.006, 286.033],
    "accent-foreground": [0.985, 0, 0],
    ring: [0.552, 0.016, 285.938],
    sidebar: [0.191, 0.005, 285.823],
    "sidebar-foreground": [0.985, 0, 0],
    "sidebar-accent": [0.274, 0.006, 286.033],
    "sidebar-accent-foreground": [0.985, 0, 0],
    "sidebar-ring": [0.552, 0.016, 285.938],
  },
}

function fixed(value: number, digits: number) {
  return Number(value.toFixed(digits))
}

function gray([l, c, h]: Step, neutral: PaletteSpec["neutral"]): string {
  const chroma = fixed(c * neutral.tint, 4)
  if (chroma === 0) return `oklch(${l} 0 0)`
  const hue = fixed((((h + neutral.hue - ZINC_HUE) % 360) + 360) % 360, 3)
  return `oklch(${l} ${chroma} ${hue})`
}

/** Grays, brand, status and chart colors for one mode, before overrides. */
export function generatedColors(spec: PaletteSpec, mode: PaletteMode) {
  const grays = Object.fromEntries(
    Object.entries(GRAYS[mode]).map(([key, step]) => [
      key,
      gray(step, spec.neutral),
    ])
  )
  return {
    ...grays,
    primary: spec.primary[mode],
    "primary-foreground": spec.primaryForeground[mode],
    ...Object.fromEntries(STATUS_INTENTS.map((i) => [i, spec[i][mode]])),
    ...Object.fromEntries(
      spec.chart.map((value, i) => [`chart-${i + 1}`, value])
    ),
    "sidebar-primary": spec.sidebarPrimary[mode],
    "sidebar-primary-foreground": spec.primaryForeground[mode],
  } as ColorSet
}

/** The full colors.json set for one mode. */
export function buildColors(spec: PaletteSpec, mode: PaletteMode): ColorSet {
  return {
    // Derived shades (subtle, border, strong, emphasis) and the dark-mode
    // translucent borders keep the shipped values, so they follow the base
    // colors.
    ...shippedColors(mode),
    ...generatedColors(spec, mode),
    ...spec.overrides[mode],
  }
}

/** Keys a person can pin by hand: everything that is not a derived shade. */
export const EDITABLE_KEYS = PALETTE_KEYS.filter(
  (key) => !/-(subtle|border|strong|emphasis)$/.test(key)
)

/* ----------------------------------------------------------------- helpers */

function same(value: string): Intent {
  return { light: value, dark: value }
}

/** Five steps on one hue, light to dark, for single-series-first charts. */
export function chartRamp(hue: number, chroma: number) {
  const step = (l: number, c: number) =>
    `oklch(${l} ${fixed(c, 3)} ${fixed(hue, 2)})`
  return [
    step(0.72, chroma * 0.7),
    step(0.62, chroma * 0.9),
    step(0.54, chroma),
    step(0.46, chroma * 0.95),
    step(0.38, chroma * 0.8),
  ]
}

/** Five evenly spaced hues starting at `hue`, for categorical charts. */
export function chartSpread(hue: number, chroma: number) {
  return [0, 1, 2, 3, 4].map(
    (i) =>
      `oklch(${i % 2 === 0 ? 0.62 : 0.7} ${fixed(Math.min(chroma, 0.17), 3)} ${fixed((hue + i * 72) % 360, 2)})`
  )
}

const shippedStatus = Object.fromEntries(
  STATUS_INTENTS.map((i) => [
    i,
    { light: shippedLight[i], dark: shippedColors("dark")[i] },
  ])
) as Record<StatusIntent, Intent>

function spec(
  partial: Omit<PaletteSpec, StatusIntent | "sidebarPrimary" | "overrides"> &
    Partial<Pick<PaletteSpec, StatusIntent | "sidebarPrimary">>
): PaletteSpec {
  return {
    ...shippedStatus,
    sidebarPrimary: partial.primary,
    ...partial,
    overrides: { light: {}, dark: {} },
  }
}

/* --------------------------------------------------------------- palettes */

export type Palette = {
  name: string
  description: string
  spec: PaletteSpec
  /** True for palettes saved in this browser. */
  custom?: boolean
}

export const PRESET_PALETTES: Palette[] = [
  {
    name: "Violet",
    description: "What style/colors.json ships today: violet on zinc.",
    spec: spec({
      neutral: { hue: ZINC_HUE, tint: 1 },
      primary: {
        light: shippedLight.primary,
        dark: shippedColors("dark").primary,
      },
      primaryForeground: same(shippedLight["primary-foreground"]),
      sidebarPrimary: {
        light: shippedLight["sidebar-primary"],
        dark: shippedColors("dark")["sidebar-primary"],
      },
      chart: [1, 2, 3, 4, 5].map((n) => shippedLight[`chart-${n}`]),
    }),
  },
  {
    name: "Ink",
    description:
      "Deep indigo on cool slate grays. Calm and familiar for finance and admin tools.",
    spec: spec({
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
    }),
  },
  {
    name: "Ledger",
    description:
      "Muted teal on blue-green grays. Quiet, trustworthy, easy on long sessions.",
    spec: spec({
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
      success: same("oklch(0.627 0.17 149.21)"),
    }),
  },
  {
    name: "Graphite",
    description:
      "Monochrome: near-black actions on pure grays, color reserved for status and charts.",
    spec: spec({
      neutral: { hue: ZINC_HUE, tint: 0 },
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
    }),
  },
  {
    name: "Evergreen",
    description:
      "Forest green on warm stone grays. Grounded and natural, good for money-positive products.",
    spec: spec({
      neutral: { hue: 70, tint: 1.6 },
      primary: {
        light: "oklch(0.448 0.108 151.33)",
        dark: "oklch(0.527 0.137 150.07)",
      },
      primaryForeground: same("oklch(0.982 0.018 155.83)"),
      chart: chartRamp(152, 0.13),
      // Success moves to a bluer emerald so it stays apart from primary.
      success: same("oklch(0.62 0.15 165)"),
    }),
  },
  {
    name: "Clay",
    description:
      "Burnt orange on warm stone grays. Friendly and editorial without feeling loud.",
    spec: spec({
      neutral: { hue: 56, tint: 1.6 },
      primary: {
        light: "oklch(0.553 0.163 40.5)",
        dark: "oklch(0.56 0.165 40.5)",
      },
      primaryForeground: same("oklch(0.98 0.016 73.68)"),
      chart: chartRamp(42, 0.15),
      // Destructive moves toward crimson so it stays apart from the orange.
      destructive: {
        light: "oklch(0.514 0.222 16.94)",
        dark: "oklch(0.514 0.2 16.94)",
      },
    }),
  },
  {
    name: "Plum",
    description:
      "Magenta-plum on neutral grays. Distinctive and confident, still businesslike.",
    spec: spec({
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
    }),
  },
]

export const DEFAULT_PALETTE = PRESET_PALETTES[0]

/** Deep copy, so editing never mutates a preset. */
export function cloneSpec(source: PaletteSpec): PaletteSpec {
  return JSON.parse(JSON.stringify(source)) as PaletteSpec
}
