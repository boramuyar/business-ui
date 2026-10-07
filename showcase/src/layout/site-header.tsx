import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@frontend/primitives/breadcrumb"
import { Button } from "@frontend/primitives/button"
import { Kbd, KbdGroup } from "@frontend/primitives/kbd"
import { Separator } from "@frontend/primitives/separator"
import { SidebarTrigger } from "@frontend/primitives/sidebar"
import { SearchIcon } from "lucide-react"
import { Fragment, useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { getDesignDoc } from "../design-docs"
import { getPrimitiveRoute, getShellRoute } from "../primitives-data"
import { CommandPalette } from "./command-palette"
import { ThemeToggle } from "./theme-toggle"

const sectionLabels: Record<string, string> = {
  design: "Design",
  installation: "Installation",
  primitives: "Primitives",
  shells: "Shells",
  style: "Style & Utilities",
  "style-lab": "Style Lab",
}

function useBreadcrumbs() {
  const { pathname } = useLocation()
  const crumbs: { to: string; label: string }[] = [{ to: "/", label: "Home" }]
  const [section, detail] = pathname.split("/").filter(Boolean)

  if (section && sectionLabels[section]) {
    crumbs.push({ to: `/${section}`, label: sectionLabels[section] })
  }

  if ((section === "primitives" || section === "shells") && detail) {
    const route =
      section === "shells" ? getShellRoute(detail) : getPrimitiveRoute(detail)
    crumbs.push({
      to: `/${section}/${detail}`,
      label: route?.title ?? detail,
    })
  }

  if (section === "design" && detail) {
    const slug = pathname.replace(/^\/design\//, "")
    crumbs.push({ to: pathname, label: getDesignDoc(slug)?.title ?? slug })
  }

  return crumbs
}

export function SiteHeader() {
  const [paletteOpen, setPaletteOpen] = useState(false)
  const crumbs = useBreadcrumbs()

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault()
        setPaletteOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [])

  return (
    <header className="flex h-12 shrink-0 items-center gap-2 border-b px-3">
      <SidebarTrigger className="-ml-1" />
      <Separator
        className="mr-2 data-[orientation=vertical]:h-4"
        orientation="vertical"
      />
      <Breadcrumb>
        <BreadcrumbList>
          {crumbs.map((crumb, index) => {
            const isLast = index === crumbs.length - 1

            return (
              <Fragment key={crumb.to}>
                {index > 0 ? <BreadcrumbSeparator /> : null}
                <BreadcrumbItem>
                  {isLast ? (
                    <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink asChild>
                      <Link to={crumb.to}>{crumb.label}</Link>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
              </Fragment>
            )
          })}
        </BreadcrumbList>
      </Breadcrumb>
      <div className="ml-auto flex items-center gap-1">
        <Button
          className="gap-2 text-muted-foreground"
          onClick={() => setPaletteOpen(true)}
          size="sm"
          variant="outline"
        >
          <SearchIcon />
          Search
          <KbdGroup>
            <Kbd>Ctrl</Kbd>
            <Kbd>K</Kbd>
          </KbdGroup>
        </Button>
        <ThemeToggle />
      </div>
      <CommandPalette onOpenChange={setPaletteOpen} open={paletteOpen} />
    </header>
  )
}
