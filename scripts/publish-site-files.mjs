#!/usr/bin/env node
/**
 * Copies the design guide and the design check into the built site, so agents
 * read the current version from https://ui.uyar.design instead of a copy in
 * their own repository:
 *
 *   /llms.txt            index for agents
 *   /design.md           DESIGN.md
 *   /design/**.md        the design/ guides
 *   /design-check.mjs    scripts/design-check.mjs
 *
 * Runs after the showcase build, which writes showcase/dist.
 */

import { cp, mkdir, readdir, readFile, writeFile } from "node:fs/promises"
import { dirname, join, relative, resolve } from "node:path"
import { fileURLToPath } from "node:url"

const siteUrl = "https://ui.uyar.design"

const rootDirectory = resolve(dirname(fileURLToPath(import.meta.url)), "..")
const outputDirectory = join(rootDirectory, "showcase/dist")

await mkdir(outputDirectory, { recursive: true })
await cp(join(rootDirectory, "DESIGN.md"), join(outputDirectory, "design.md"))
await cp(join(rootDirectory, "design"), join(outputDirectory, "design"), {
  recursive: true,
  filter: (source) => !source.endsWith(".json"),
})
await cp(
  join(rootDirectory, "scripts/design-check.mjs"),
  join(outputDirectory, "design-check.mjs")
)

const guides = await listMarkdown(join(rootDirectory, "design"))
const lines = [
  "# Business UI",
  "",
  "> A shadcn registry and design system for business apps: a token-only Tailwind v4 style, primitives, page shells, and rules for which component, shell, color and type step to use.",
  "",
  "Read the design rules before building UI. They are always current here; don't copy them into your repository.",
  "",
  "## Rules",
  "",
  `- [Design rules](${siteUrl}/design.md): build order, hard rules, and the check command.`,
  ...(await Promise.all(
    guides.map(async (path) => {
      const title = await readTitle(join(rootDirectory, "design", path))
      return `- [${title}](${siteUrl}/design/${path})`
    })
  )),
  "",
  "## Install",
  "",
  "- Style first: `pnpm dlx shadcn@latest add boramuyar/business-ui/style`",
  "- Then items: `pnpm dlx shadcn@latest add boramuyar/business-ui/<item>`",
  `- Item JSON: ${siteUrl}/r/<item>.json`,
  "",
  "## Check",
  "",
  `- Run before finishing UI work: \`curl -fsSL ${siteUrl}/design-check.mjs | node --input-type=module - src\``,
  "",
]

await writeFile(join(outputDirectory, "llms.txt"), lines.join("\n"))

async function listMarkdown(directory) {
  const entries = await readdir(directory, { recursive: true })
  return entries
    .filter((entry) => entry.endsWith(".md"))
    .map((entry) => relative(directory, join(directory, entry)).split("\\").join("/"))
    .sort()
}

async function readTitle(path) {
  const source = await readFile(path, "utf8")
  return source.match(/^# (.+)$/m)?.[1] ?? path
}
