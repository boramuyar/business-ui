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

export type PrimitiveRoute = {
  name: string
  title: string
  description: string
  status: NonNullable<PrimitiveFrontmatter["status"]>
  dependencies: string[]
  registryDependencies: string[]
  registryItem: RegistryItem
  Doc?: ComponentType
}

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

    routes.push({
      name: registryItem.name,
      title:
        frontmatter.title ??
        registryItem.title ??
        titleFromName(registryItem.name),
      description: frontmatter.description ?? registryItem.description ?? "",
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

function titleFromName(name: string) {
  return name
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ")
}
