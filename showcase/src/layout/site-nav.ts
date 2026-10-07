import { designDocs } from "../design-docs"
import {
  groupByLevel,
  type PrimitiveRoute,
  primitiveRoutes,
  shellRoutes,
} from "../primitives-data"

export type NavLink = {
  to: string
  label: string
  status?: PrimitiveRoute["status"]
}

export type NavGroup = { label: string; links: NavLink[] }

export type NavSection = {
  id: string
  label: string
  /** Where the section tab points. */
  to: string
  groups: NavGroup[]
}

function designLinks(group: string) {
  return designDocs
    .filter((doc) => doc.group === group)
    .map((doc) => ({
      to: doc.slug ? `/design/${doc.slug}` : "/design",
      label: doc.title,
    }))
}

function catalogLinks(basePath: string, routes: PrimitiveRoute[]) {
  return routes.map((route) => ({
    to: `${basePath}/${route.name}`,
    label: route.title,
    status: route.status,
  }))
}

export const navSections: NavSection[] = [
  {
    id: "start",
    label: "Get started",
    to: "/",
    groups: [
      {
        label: "Get started",
        links: [
          { to: "/", label: "Introduction" },
          { to: "/installation", label: "Installation" },
        ],
      },
    ],
  },
  {
    id: "foundations",
    label: "Foundations",
    to: "/design",
    groups: [
      { label: "Overview", links: designLinks("Overview") },
      { label: "Foundations", links: designLinks("Foundations") },
      {
        label: "Tokens",
        links: [
          { to: "/style", label: "Style & utilities" },
          { to: "/style-lab", label: "Style lab" },
        ],
      },
    ],
  },
  {
    id: "components",
    label: "Components",
    to: "/primitives",
    groups: [
      {
        label: "Overview",
        links: [{ to: "/primitives", label: "All components" }],
      },
      ...groupByLevel(primitiveRoutes).map((group) => ({
        label: group.label,
        links: catalogLinks("/primitives", group.routes),
      })),
    ],
  },
  {
    id: "shells",
    label: "Shells",
    to: "/shells",
    groups: [
      {
        label: "Overview",
        links: [
          { to: "/shells", label: "All shells" },
          ...designLinks("Reference").filter(
            (link) => link.to === "/design/shells"
          ),
        ],
      },
      { label: "Shells", links: catalogLinks("/shells", shellRoutes) },
    ],
  },
  {
    id: "patterns",
    label: "Patterns",
    to: "/design/patterns/selection-controls",
    groups: [
      { label: "Patterns", links: designLinks("Patterns") },
      {
        label: "Reference",
        links: designLinks("Reference").filter(
          (link) => link.to !== "/design/shells"
        ),
      },
    ],
  },
]

/** The section a path belongs to, so the right tab and side nav show. */
export function getNavSection(pathname: string) {
  const owner = navSections.find((section) =>
    section.groups.some((group) =>
      group.links.some((link) => link.to === pathname)
    )
  )
  if (owner) return owner

  const [first] = pathname.split("/").filter(Boolean)
  const byPrefix: Record<string, string> = {
    primitives: "components",
    shells: "shells",
    design: "foundations",
    style: "foundations",
    "style-lab": "foundations",
  }
  return (
    navSections.find((section) => section.id === byPrefix[first ?? ""]) ??
    navSections[0]
  )
}
