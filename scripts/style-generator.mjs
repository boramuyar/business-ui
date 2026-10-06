import { readFile, writeFile } from "node:fs/promises"
import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"

const rootDirectory = resolve(dirname(fileURLToPath(import.meta.url)), "..")

const styleItem = {
  $schema: "https://ui.shadcn.com/schema/registry-item.json",
  extends: "none",
  name: "style",
  type: "registry:style",
  title: "Business UI Style",
  description:
    "Tailwind v4 theme, tokens, fonts, base styles, and custom utilities.",
}

export const styleSourceFiles = [
  "style/colors.json",
  "style/tokens.json",
  "style/theme.json",
  "style/css.json",
]

export async function generateStyle(options = {}) {
  const cwd = options.cwd ? resolve(options.cwd) : rootDirectory
  const [colors, tokens, theme, cssSource] = await Promise.all([
    readJson(resolve(cwd, "style/colors.json")),
    readJson(resolve(cwd, "style/tokens.json")),
    readJson(resolve(cwd, "style/theme.json")),
    readJson(resolve(cwd, "style/css.json")),
  ])

  const [lightStandard, lightCustom] = splitCustomColorVars({
    ...colors.light,
    ...tokens.light,
  })
  const [darkStandard, darkCustom] = splitCustomColorVars({
    ...colors.dark,
    ...tokens.dark,
  })

  const cssVars = {
    theme: {
      ...deriveColorTheme(colors),
      ...theme,
    },
    light: lightStandard,
    dark: darkStandard,
  }

  // Custom-named vars ship as plain css rules: the shadcn CLI auto-mirrors any
  // non-standard cssVars.light/dark entry into the consumer's @theme inline
  // block as a self-referential `--x: var(--x)`, which is dead weight next to
  // the explicit --color-* mappings in cssVars.theme.
  const css = {
    ":root": prefixVarKeys(lightCustom),
    ".dark": prefixVarKeys(darkCustom),
    ...(cssSource.css ?? {}),
  }
  const globalsCss = renderGlobalsCss({ css, cssVars })
  const registry = {
    $schema: "https://ui.shadcn.com/schema/registry.json",
    items: [
      {
        ...styleItem,
        dependencies: cssSource.dependencies ?? [],
        cssVars,
        css,
      },
    ],
  }

  await Promise.all([
    writeFile(resolve(cwd, "style/globals.css"), globalsCss),
    writeFile(
      resolve(cwd, "style/registry.json"),
      `${JSON.stringify(registry, null, 2)}\n`
    ),
  ])
}

async function readJson(path) {
  return JSON.parse(await readFile(path, "utf8"))
}

function deriveColorTheme(colors) {
  return Object.fromEntries(
    Object.keys(colors.light).map((color) => [`color-${color}`, `var(--${color})`])
  )
}

const CUSTOM_COLOR_VAR = /^(primary|destructive|success|warning|info)-(subtle|border|strong|emphasis)$/
// Layered shadow values behind the shadow-control/raised/overlay/modal
// utilities, which theme.json maps to these vars.
const CUSTOM_ELEVATION_VAR = /^elevation-[a-z]+$/

function splitCustomColorVars(vars) {
  const standard = {}
  const custom = {}
  for (const [key, value] of Object.entries(vars)) {
    if (CUSTOM_COLOR_VAR.test(key) || CUSTOM_ELEVATION_VAR.test(key))
      custom[key] = value
    else standard[key] = value
  }
  return [standard, custom]
}

/** css rules carry raw property names, so variable keys need their -- prefix. */
function prefixVarKeys(vars) {
  return Object.fromEntries(
    Object.entries(vars).map(([key, value]) => [`--${key}`, value])
  )
}

function renderGlobalsCss({ css, cssVars }) {
  const entries = Object.entries(css)
  const directives = entries.filter(([key, value]) => isDirective(key, value))
  const rules = entries.filter(([key, value]) => !isDirective(key, value))

  return [
    directives.map(([key]) => `${key};`).join("\n"),
    renderVarsBlock("@theme inline", cssVars.theme),
    renderVarsBlock(":root", cssVars.light),
    renderVarsBlock(".dark", cssVars.dark),
    ...rules.map(([key, value]) => renderRule(key, value)),
  ]
    .filter(Boolean)
    .join("\n\n")
    .concat("\n")
}

function isDirective(key, value) {
  return (
    isEmptyObject(value) &&
    (key.startsWith("@import") ||
      key.startsWith("@plugin") ||
      key.startsWith("@custom-variant"))
  )
}

function renderVarsBlock(selector, vars) {
  return `${selector} {\n${Object.entries(vars)
    .map(([key, value]) => `  --${key}: ${value};`)
    .join("\n")}\n}`
}

function renderRule(selector, value, indent = 0) {
  const space = " ".repeat(indent)

  if (typeof value === "string") {
    return `${space}${selector}: ${value};`
  }

  if (isEmptyObject(value)) {
    return `${space}${selector};`
  }

  return `${space}${selector} {\n${renderRuleBody(value, indent + 2)}\n${space}}`
}

function renderRuleBody(value, indent) {
  return Object.entries(value)
    .map(([key, child]) => renderRule(key, child, indent))
    .join("\n")
}

function isEmptyObject(value) {
  return (
    value &&
    typeof value === "object" &&
    !Array.isArray(value) &&
    Object.keys(value).length === 0
  )
}
