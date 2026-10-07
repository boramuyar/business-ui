#!/usr/bin/env node
/**
 * Builds design/components.md from the usage header at the top of every
 * primitive and shell. The header comment is the source of truth; this file
 * only collects it so agents can scan every component in one place.
 *
 *   node scripts/generate-design-catalog.mjs          write the catalog
 *   node scripts/generate-design-catalog.mjs --check  fail if it is out of date
 */

import { readdir, readFile, writeFile } from "node:fs/promises"
import { dirname, join, resolve } from "node:path"
import { fileURLToPath } from "node:url"

const rootDirectory = resolve(dirname(fileURLToPath(import.meta.url)), "..")
const outputPath = join(rootDirectory, "design/components.md")

const LEVEL_ORDER = ["shell", "surface", "composite", "primitive", "layout"]
const LEVEL_TITLES = {
  shell: "Shells",
  surface: "Surfaces",
  composite: "Composites",
  primitive: "Primitives",
  layout: "Layout",
}

const entries = [
  ...(await readEntries("shells")),
  ...(await readEntries("primitives")),
]
const markdown = render(entries)

if (process.argv.includes("--check")) {
  const current = await readFile(outputPath, "utf8").catch(() => "")
  if (current !== markdown) {
    console.error(
      "design/components.md is out of date. Run pnpm design:build and commit the result."
    )
    process.exit(1)
  }
  console.log("design/components.md is up to date")
} else {
  await writeFile(outputPath, markdown)
}

async function readEntries(folder) {
  const directory = join(rootDirectory, folder)
  const names = (await readdir(directory, { withFileTypes: true }))
    .filter((entry) => entry.isDirectory() && entry.name !== "node_modules")
    .map((entry) => entry.name)
    .sort()

  const result = []
  for (const name of names) {
    const source = await readFile(join(directory, name, `${name}.tsx`), "utf8")
    const tags = parseHeader(source)
    result.push({
      name,
      title: tags.component?.[0] ?? tags.shell?.[0] ?? name,
      level: tags.level?.[0] ?? "primitive",
      summary: tags.summary?.[0] ?? "",
      use: tags.use ?? [],
      avoid: tags.avoid ?? [],
      related: tags.related?.[0] ?? "",
      guide: tags.guide?.[0],
      path:
        folder === "shells"
          ? `components/shells/${name}.tsx`
          : `components/ui/${name}.tsx`,
    })
  }
  return result
}

function parseHeader(source) {
  const header = source.match(/^\s*\/\*\*([\s\S]*?)\*\//)?.[1] ?? ""
  const tags = {}
  let current

  for (const rawLine of header.split("\n")) {
    const line = rawLine.replace(/^\s*\*\s?/, "")
    const tag = line.match(/^@(\w+)\s+(.*)$/)
    if (tag) {
      current = { name: tag[1], text: tag[2].trim() }
      tags[current.name] ??= []
      tags[current.name].push(current.text)
    } else if (current && line.trim() && /^\s{2,}/.test(line)) {
      const list = tags[current.name]
      list[list.length - 1] += ` ${line.trim()}`
    } else {
      current = undefined
    }
  }
  return tags
}

function render(items) {
  const lines = [
    "# Component catalog",
    "",
    "Generated from the usage header at the top of each component and shell. Do not edit by hand: change the header in the source file, then run `pnpm design:build`.",
    "",
    "Each entry says when to use the item and what to use instead. Install names match the headings: `pnpm dlx shadcn@latest add boramuyar/business-ui/<name>`.",
    "",
  ]

  for (const level of LEVEL_ORDER) {
    const group = items.filter((item) => item.level === level)
    if (group.length === 0) continue
    lines.push(`## ${LEVEL_TITLES[level]}`, "")
    for (const item of group) {
      lines.push(`### ${item.name}`, "", item.summary, "")
      for (const use of item.use) lines.push(`- Use: ${use}`)
      for (const avoid of item.avoid) lines.push(`- Avoid: ${avoid}`)
      if (item.related) lines.push(`- Related: ${item.related}`)
      if (item.guide) lines.push(`- Guide: [${item.guide.replace(/^design\//, "")}](${item.guide.replace(/^design\//, "")})`)
      lines.push(`- File: \`${item.path}\``, "")
    }
  }

  return `${lines.join("\n").trimEnd()}\n`
}
