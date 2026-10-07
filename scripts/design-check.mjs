#!/usr/bin/env node
/**
 * Business UI design check.
 *
 * Scans source files for things the design system does not allow and prints
 * the fix for each. Run it before finishing UI work:
 *
 *   node scripts/design-check.mjs [paths...]
 *
 * With no paths it scans `src` when it exists, otherwise the current folder.
 * Rules are described in DESIGN.md. To allow one line on purpose, put
 * `// design-check-ignore: <reason>` on the line above it.
 */

import { readdir, readFile, stat } from "node:fs/promises"
import { join, relative, sep } from "node:path"

const SOURCE_EXTENSIONS = [".tsx", ".jsx", ".ts", ".js"]
const SKIP_DIRECTORIES = new Set(["node_modules", "dist", "build", ".git", ".next", "coverage"])

const PALETTE_FAMILIES =
  "slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose"
const COLOR_UTILITIES =
  "bg|text|border|border-[trblxyse]|ring|ring-offset|outline|fill|stroke|from|via|to|divide|placeholder|decoration|caret|accent|shadow|inset-shadow|inset-ring"

const RULES = [
  {
    id: "palette-color",
    pattern: new RegExp(
      `(?<![\\w-])(?:[\\w-]+:)*(?:${COLOR_UTILITIES})-(?:(?:${PALETTE_FAMILIES})-\\d{2,3}|white|black)(?:\\/\\d+)?(?![\\w-])`,
      "g"
    ),
    message: "Tailwind palette colors are removed and render nothing.",
    fix: "Use a role color such as primary, brand, destructive, success, warning, info, muted or foreground (design/foundations/color.md).",
  },
  {
    id: "arbitrary-color",
    pattern: /-\[(?:#[0-9a-fA-F]{3,8}|(?:rgba?|hsla?|oklch|oklab|lab|lch|hwb|color)\()[^\]]*\]/g,
    message: "Arbitrary color values bypass the theme.",
    fix: "Use a role color token. Mixing tokens is fine: bg-[color-mix(in_oklch,var(--brand),var(--background)_80%)].",
  },
  {
    id: "arbitrary-type-size",
    pattern: /(?<![\w-])(?:[\w-]+:)*text-\[\d[\d.]*(?:px|rem|em)\]/g,
    message: "Made-up font sizes break the type scale.",
    fix: "Use text-xs, text-sm, text-base, text-lg, text-xl, text-2xl or text-3xl (design/foundations/typography.md).",
  },
  {
    id: "removed-type-step",
    pattern: /(?<![\w-])(?:[\w-]+:)*(?:text-[4-9]xl|font-(?:thin|extralight|light|bold|extrabold|black)|font-serif)(?![\w-])/g,
    message: "This type step is removed from the theme and renders nothing.",
    fix: "Sizes stop at text-3xl. Weights are font-normal, font-medium and font-semibold. Families are font-sans and font-mono.",
  },
  {
    id: "inline-style-color",
    pattern: /\b(?:color|background|backgroundColor|borderColor|outlineColor|fill|stroke)\s*:\s*["'`](?!var\(--|currentColor|transparent|inherit)[^"'`]+["'`]/g,
    when: (line) => /style\s*=\s*\{\{|style:\s*\{/.test(line),
    message: "Inline style colors bypass the theme.",
    fix: "Use a Tailwind role color class, or var(--token) when a style prop is unavoidable.",
  },
]

const SHELL_TAGS = ["@shell", "@closest", "@why", "@reuses"]
const COMPONENT_TAGS = ["@component", "@level", "@use", "@avoid"]

const findings = []

const args = process.argv.slice(2)
const roots = args.length > 0 ? args : [(await exists("src")) ? "src" : "."]

for (const root of roots) {
  for (const file of await collectFiles(root)) {
    await checkFile(file)
  }
}

report()

async function checkFile(file) {
  const source = await readFile(file, "utf8")
  const lines = source.split("\n")
  const path = file.split(sep).join("/")

  lines.forEach((line, index) => {
    if (index > 0 && lines[index - 1].includes("design-check-ignore")) return
    for (const rule of RULES) {
      if (rule.when && !rule.when(line)) continue
      for (const match of line.matchAll(rule.pattern)) {
        findings.push({ file, line: index + 1, rule, match: match[0] })
      }
    }
  })

  const header = source.match(/\/\*\*[\s\S]*?\*\//)?.[0] ?? ""

  if (isShellFile(path)) {
    const missing = SHELL_TAGS.filter((tag) => !new RegExp(`${tag}\\s+\\S`).test(header))
    if (missing.length > 0) {
      findings.push({
        file,
        line: 1,
        rule: {
          id: "shell-justification",
          message: `Shell is missing ${missing.join(", ")} in its header comment.`,
          fix: "Reuse an existing shell if one fits. A new shell needs @shell, @closest, @why and @reuses (design/shells.md).",
        },
        match: "",
      })
    }
  }

  if (isComponentFile(path)) {
    const missing = COMPONENT_TAGS.filter((tag) => !new RegExp(`${tag}\\s+\\S`).test(header))
    if (missing.length > 0) {
      findings.push({
        file,
        line: 1,
        rule: {
          id: "component-usage",
          message: `Component is missing ${missing.join(", ")} in its header comment.`,
          fix: "Document when to use it and what to use instead, so the next agent reads it where the code lives (DESIGN.md).",
        },
        match: "",
      })
    }
  }
}

function isShellFile(path) {
  return /(^|\/)shells\/(?:[\w-]+\/)?[\w-]+\.tsx$/.test(path) && !/\/demos\//.test(path)
}

function isComponentFile(path) {
  // Registry source: primitives/<name>/<name>.tsx. Consumer apps: components/ui/<name>.tsx.
  const registry = path.match(/(?:^|\/)primitives\/([\w-]+)\/([\w-]+)\.tsx$/)
  if (registry) return registry[1] === registry[2]
  return /(?:^|\/)components\/ui\/[\w-]+\.tsx$/.test(path)
}

async function collectFiles(root) {
  const info = await stat(root).catch(() => undefined)
  if (!info) {
    console.error(`design-check: ${root} does not exist`)
    process.exitCode = 2
    return []
  }
  if (info.isFile()) return [root]

  const files = []
  for (const entry of await readdir(root, { withFileTypes: true })) {
    if (SKIP_DIRECTORIES.has(entry.name)) continue
    const path = join(root, entry.name)
    if (entry.isDirectory()) files.push(...(await collectFiles(path)))
    else if (SOURCE_EXTENSIONS.some((extension) => entry.name.endsWith(extension))) files.push(path)
  }
  return files
}

async function exists(path) {
  return Boolean(await stat(path).catch(() => undefined))
}

function report() {
  if (findings.length === 0) {
    console.log("design-check: no issues")
    return
  }

  for (const { file, line, rule, match } of findings) {
    const where = `${relative(process.cwd(), file)}:${line}`
    console.log(`${where}  ${rule.id}${match ? `  ${match}` : ""}`)
    console.log(`  ${rule.message}`)
    console.log(`  Fix: ${rule.fix}`)
  }
  console.log(`\ndesign-check: ${findings.length} issue${findings.length === 1 ? "" : "s"}`)
  process.exitCode = 1
}
