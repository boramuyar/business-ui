import { Badge } from "@frontend/primitives/badge"
import { Button } from "@frontend/primitives/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@frontend/primitives/empty"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@frontend/primitives/input-group"
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemTitle,
} from "@frontend/primitives/item"
import { ToggleGroup, ToggleGroupItem } from "@frontend/primitives/toggle-group"
import { ListPage } from "@frontend/shells/list-page"
import { PageSection } from "@frontend/shells/page"
import { SearchIcon } from "lucide-react"
import { useState } from "react"
import { Link } from "react-router-dom"
import {
  type CatalogSection,
  groupByLevel,
  primitiveSection,
  statusBadge,
  statusLabel,
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
    <ListPage
      description={copy.description}
      filters={
        <InputGroup className="max-w-xs">
          <InputGroupAddon>
            <SearchIcon />
          </InputGroupAddon>
          <InputGroupInput
            aria-label={copy.filter}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={copy.filter}
            value={query}
          />
        </InputGroup>
      }
      title={section === primitiveSection ? "All components" : "All shells"}
      view={
        <ToggleGroup
          aria-label="Status"
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
              {statusLabel[filter]}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      }
    >
      {visibleRoutes.length === 0 ? (
        <Empty>
          <EmptyHeader>
            <EmptyTitle>No matches</EmptyTitle>
            <EmptyDescription>
              {query
                ? `Nothing matches "${query}".`
                : "Nothing has this status."}
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button
              onClick={() => {
                setQuery("")
                setStatus("all")
              }}
              variant="outline"
            >
              Clear filters
            </Button>
          </EmptyContent>
        </Empty>
      ) : (
        groups.map((group) => (
          <PageSection
            description={`${group.routes.length} ${group.routes.length === 1 ? "item" : "items"}`}
            key={group.label}
            title={group.label}
          >
            <ItemGroup>
              {group.routes.map((route) => (
                <Item asChild key={route.name} variant="outline">
                  <Link to={`${section.basePath}/${route.name}`}>
                    <ItemContent>
                      <ItemTitle>
                        {route.title}
                        {route.status === "stable" ? null : (
                          <Badge size="sm" variant={statusBadge[route.status]}>
                            {statusLabel[route.status]}
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
          </PageSection>
        ))
      )}
    </ListPage>
  )
}
