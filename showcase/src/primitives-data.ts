import type { ComponentType } from "react"

type RegistryFile = {
  path: string
  target?: string
  type: string
}

type RegistryItem = {
  name: string
  title?: string
  description?: string
  type: string
  categories?: string[]
  dependencies?: string[]
  registryDependencies?: string[]
  files?: RegistryFile[]
}

type RegistryModule = {
  default?: {
    items?: RegistryItem[]
  }
  items?: RegistryItem[]
}

type PrimitiveDocModule = {
  default: ComponentType
  frontmatter?: PrimitiveFrontmatter
}

export type PrimitiveFrontmatter = {
  title?: string
  description?: string
  status?: "draft" | "experimental" | "stable"
}

export type UsageLevel =
  | "primitive"
  | "composite"
  | "surface"
  | "layout"
  | "shell"

/** Parsed from the usage header at the top of every primitive and shell. */
export type UsageHeader = {
  level: UsageLevel
  summary: string
  use: string[]
  avoid: string[]
  related: string[]
}

export type PrimitiveRoute = {
  name: string
  title: string
  description: string
  usage: UsageHeader
  status: NonNullable<PrimitiveFrontmatter["status"]>
  dependencies: string[]
  registryDependencies: string[]
  registryItem: RegistryItem
  Doc?: ComponentType
}

const sourceModules = import.meta.glob<string>(
  ["../../primitives/*/*.tsx", "../../shells/*/*.tsx"],
  { eager: true, import: "default", query: "?raw" }
)

const registryModules = import.meta.glob<RegistryModule>(
  "../../primitives/*/registry.json",
  { eager: true }
)

const docModules = import.meta.glob<PrimitiveDocModule>(
  "../../primitives/*/showcase.mdx",
  { eager: true }
)

const shellRegistryModules = import.meta.glob<RegistryModule>(
  "../../shells/*/registry.json",
  { eager: true }
)

const shellDocModules = import.meta.glob<PrimitiveDocModule>(
  "../../shells/*/showcase.mdx",
  { eager: true }
)

export const primitiveRoutes = buildRoutes(registryModules, docModules)

export const shellRoutes = buildRoutes(shellRegistryModules, shellDocModules)

export type CatalogSection = {
  basePath: string
  eyebrow: string
  label: string
  routes: PrimitiveRoute[]
}

export const primitiveSection: CatalogSection = {
  basePath: "/primitives",
  eyebrow: "Primitive",
  label: "Primitives",
  routes: primitiveRoutes,
}

export const shellSection: CatalogSection = {
  basePath: "/shells",
  eyebrow: "Shell",
  label: "Shells",
  routes: shellRoutes,
}

export function getPrimitiveRoute(name: string) {
  return primitiveRoutes.find((route) => route.name === name)
}

export function getShellRoute(name: string) {
  return shellRoutes.find((route) => route.name === name)
}

function buildRoutes(
  registryModules: Record<string, RegistryModule>,
  docModules: Record<string, PrimitiveDocModule>
) {
  const routes: PrimitiveRoute[] = []

  for (const [path, module] of Object.entries(registryModules)) {
    const registryItem = (module.default?.items ?? module.items ?? [])[0]

    if (!registryItem) {
      continue
    }

    const doc = docModules[path.replace("registry.json", "showcase.mdx")]
    const frontmatter = doc?.frontmatter ?? {}
    const folder = path.replace("/registry.json", "")
    const source =
      sourceModules[`${folder}/${folder.split("/").pop()}.tsx`] ?? ""

    routes.push({
      name: registryItem.name,
      title:
        frontmatter.title ??
        registryItem.title ??
        titleFromName(registryItem.name),
      description: frontmatter.description ?? registryItem.description ?? "",
      usage: parseUsageHeader(source),
      status: frontmatter.status ?? "draft",
      dependencies: registryItem.dependencies ?? [],
      registryDependencies: registryItem.registryDependencies ?? [],
      registryItem,
      Doc: doc?.default,
    })
  }

  return routes.sort((left, right) => left.title.localeCompare(right.title))
}

export function getAdjacentRoutes(routes: PrimitiveRoute[], name: string) {
  const index = routes.findIndex((route) => route.name === name)

  return {
    previous: index > 0 ? routes[index - 1] : undefined,
    next:
      index >= 0 && index < routes.length - 1 ? routes[index + 1] : undefined,
  }
}

export function countPrimitivesByStatus() {
  const counts = { stable: 0, experimental: 0, draft: 0 }

  for (const route of primitiveRoutes) {
    counts[route.status] += 1
  }

  return counts
}

export const usageLevels: { level: UsageLevel; label: string }[] = [
  { level: "primitive", label: "Primitives" },
  { level: "composite", label: "Composites" },
  { level: "surface", label: "Surfaces" },
  { level: "layout", label: "Layout" },
]

export function groupByLevel(routes: PrimitiveRoute[]) {
  return usageLevels
    .map((group) => ({
      ...group,
      routes: routes.filter((route) => route.usage.level === group.level),
    }))
    .filter((group) => group.routes.length > 0)
}

/** Same rules as scripts/generate-design-catalog.mjs. */
function parseUsageHeader(source: string): UsageHeader {
  const header = source.match(/^\s*\/\*\*([\s\S]*?)\*\//)?.[1] ?? ""
  const tags: Record<string, string[]> = {}
  let current: string[] | undefined

  for (const rawLine of header.split("\n")) {
    const line = rawLine.replace(/^\s*\*\s?/, "")
    const tag = line.match(/^@(\w+)\s+(.*)$/)
    if (tag) {
      tags[tag[1]] ??= []
      current = tags[tag[1]]
      current.push(tag[2].trim())
    } else if (current && line.trim() && /^\s{2,}/.test(line)) {
      current[current.length - 1] += ` ${line.trim()}`
    } else {
      current = undefined
    }
  }

  return {
    level: (tags.level?.[0] as UsageLevel | undefined) ?? "primitive",
    summary: tags.summary?.[0] ?? "",
    use: tags.use ?? [],
    avoid: tags.avoid ?? [],
    related: (tags.related?.[0] ?? "")
      .split(",")
      .map((name) => name.trim())
      .filter(Boolean),
  }
}

function titleFromName(name: string) {
  return name
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ")
}
