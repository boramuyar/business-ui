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

export const primitiveRoutes = buildPrimitiveRoutes()

export function getPrimitiveRoute(name: string) {
  return primitiveRoutes.find((route) => route.name === name)
}

function buildPrimitiveRoutes() {
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

export function getAdjacentPrimitives(name: string) {
  const index = primitiveRoutes.findIndex((route) => route.name === name)

  return {
    previous: index > 0 ? primitiveRoutes[index - 1] : undefined,
    next:
      index >= 0 && index < primitiveRoutes.length - 1
        ? primitiveRoutes[index + 1]
        : undefined,
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
