import { Badge } from "@frontend/primitives/badge"
import { Input } from "@frontend/primitives/input"
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemTitle,
} from "@frontend/primitives/item"
import { ToggleGroup, ToggleGroupItem } from "@frontend/primitives/toggle-group"
import { useState } from "react"
import { Link } from "react-router-dom"
import { PageHeader } from "../components/page-header"
import {
  type CatalogSection,
  groupByLevel,
  primitiveSection,
} from "../primitives-data"

const statusFilters = ["all", "stable", "experimental", "draft"] as const

type StatusFilter = (typeof statusFilters)[number]

const sectionCopy: Record<string, { description: string; filter: string }> = {
  "/primitives": {
    description:
      "Every component in the registry, grouped by level: primitives are single controls, composites combine them, surfaces float above the page, and layout arranges it.",
    filter: "Filter components...",
  },
  "/shells": {
    description:
      "Page-level layouts built from the primitives. Reuse one before composing a screen yourself; a new shell needs a written justification.",
    filter: "Filter shells...",
  },
}

export function PrimitivesIndexPage({
  section = primitiveSection,
}: {
  section?: CatalogSection
}) {
  const copy = sectionCopy[section.basePath] ?? sectionCopy["/primitives"]
  const [query, setQuery] = useState("")
  const [status, setStatus] = useState<StatusFilter>("all")

  const visibleRoutes = section.routes.filter((route) => {
    const matchesStatus = status === "all" || route.status === status
    const text = `${route.title} ${route.name} ${route.description}`
    const matchesQuery = text.toLowerCase().includes(query.toLowerCase())

    return matchesStatus && matchesQuery
  })

  const groups =
    section === primitiveSection
      ? groupByLevel(visibleRoutes)
      : [{ label: section.label, routes: visibleRoutes }]

  return (
    <div>
      <PageHeader
        eyebrow={section === primitiveSection ? "Components" : "Shells"}
        title={section === primitiveSection ? "All components" : "All shells"}
        description={copy.description}
      />

      <div className="mb-8 flex flex-wrap items-center gap-3">
        <Input
          className="max-w-xs"
          onChange={(event) => setQuery(event.target.value)}
          placeholder={copy.filter}
          value={query}
        />
        <ToggleGroup
          onValueChange={(value) => {
            if (value) {
              setStatus(value as StatusFilter)
            }
          }}
          type="single"
          value={status}
          variant="outline"
        >
          {statusFilters.map((filter) => (
            <ToggleGroupItem key={filter} value={filter}>
              {filter}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>

      <div className="flex flex-col gap-12">
        {groups.map((group) => (
          <section className="flex flex-col gap-3" key={group.label}>
            <h2 className="flex items-baseline gap-2 font-semibold text-lg tracking-tight">
              {group.label}
              <span className="font-normal text-muted-foreground text-sm tabular-nums">
                {group.routes.length}
              </span>
            </h2>
            <ItemGroup className="grid gap-2 md:grid-cols-2 xl:grid-cols-3">
              {group.routes.map((route) => (
                <Item asChild key={route.name} variant="outline">
                  <Link to={`${section.basePath}/${route.name}`}>
                    <ItemContent>
                      <ItemTitle>
                        {route.title}
                        {route.status === "stable" ? null : (
                          <Badge size="sm" variant="secondary">
                            {route.status}
                          </Badge>
                        )}
                      </ItemTitle>
                      <ItemDescription>
                        {route.usage.summary || route.description}
                      </ItemDescription>
                    </ItemContent>
                  </Link>
                </Item>
              ))}
            </ItemGroup>
          </section>
        ))}
      </div>
    </div>
  )
}
