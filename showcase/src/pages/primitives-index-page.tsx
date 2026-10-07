import { Badge } from "@frontend/primitives/badge"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@frontend/primitives/card"
import { Input } from "@frontend/primitives/input"
import { ToggleGroup, ToggleGroupItem } from "@frontend/primitives/toggle-group"
import { useState } from "react"
import { Link } from "react-router-dom"
import { PageHeader } from "../components/page-header"
import { type CatalogSection, primitiveSection } from "../primitives-data"

const statusFilters = ["all", "stable", "experimental", "draft"] as const

type StatusFilter = (typeof statusFilters)[number]

const sectionCopy: Record<string, { description: string; filter: string }> = {
  "/primitives": {
    description:
      "This index is generated from primitive registry files. Each primitive has a co-located showcase.mdx reference.",
    filter: "Filter primitives...",
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

  return (
    <div>
      <PageHeader
        eyebrow="Generated"
        title={section.label}
        description={copy.description}
      />

      <div className="mb-4 flex flex-wrap items-center gap-3">
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

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {visibleRoutes.map((route) => (
          <Link key={route.name} to={`${section.basePath}/${route.name}`}>
            <Card className="h-full transition-colors hover:bg-muted/50">
              <CardHeader>
                <div className="flex items-start justify-between gap-3">
                  <CardTitle>{route.title}</CardTitle>
                  <Badge variant="outline">{route.status}</Badge>
                </div>
                <CardDescription>{route.description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
