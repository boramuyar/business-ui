import { Button } from "@frontend/primitives/button"
import { Kbd, KbdGroup } from "@frontend/primitives/kbd"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@frontend/primitives/sheet"
import { cn } from "@frontend/utilities/cn"
import { MenuIcon, SearchIcon } from "lucide-react"
import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { CommandPalette } from "./command-palette"
import { SectionNav } from "./section-nav"
import { type NavSection, navSections } from "./site-nav"
import { ThemeToggle } from "./theme-toggle"

const logoUrl = `${import.meta.env.BASE_URL}logo.svg`

export function SiteHeader({ section }: { section: NavSection }) {
  const [paletteOpen, setPaletteOpen] = useState(false)

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
    <header className="sticky top-0 z-40 flex h-14 shrink-0 items-center gap-6 border-b bg-background px-4 sm:px-6">
      <MobileMenu />
      <Link className="flex shrink-0 items-center gap-2" to="/">
        <img alt="" className="size-5" src={logoUrl} />
        <span className="font-semibold text-sm">Business UI</span>
      </Link>
      <nav
        aria-label="Sections"
        className="hidden h-full items-stretch gap-1 lg:flex"
      >
        {navSections.map((entry) => {
          const active = entry.id === section.id

          return (
            <Link
              aria-current={active ? "page" : undefined}
              className={cn(
                "flex items-center border-transparent border-y-2 px-2.5 text-muted-foreground text-sm transition-colors hover:text-foreground",
                active && "border-b-brand font-medium text-foreground"
              )}
              key={entry.id}
              to={entry.to}
            >
              {entry.label}
            </Link>
          )
        })}
      </nav>
      <div className="ml-auto flex items-center gap-1">
        <Button
          className="w-9 justify-center gap-2 px-0 text-muted-foreground sm:w-56 sm:justify-between sm:px-2.5"
          onClick={() => setPaletteOpen(true)}
          variant="secondary"
        >
          <span className="flex items-center gap-2">
            <SearchIcon />
            <span className="hidden sm:inline">Search the handbook</span>
          </span>
          <KbdGroup className="hidden sm:inline-flex">
            <Kbd>Ctrl</Kbd>
            <Kbd>K</Kbd>
          </KbdGroup>
        </Button>
        <Button asChild className="hidden sm:inline-flex" variant="ghost">
          <a href="https://github.com/boramuyar/business-ui">GitHub</a>
        </Button>
        <ThemeToggle />
      </div>
      <CommandPalette onOpenChange={setPaletteOpen} open={paletteOpen} />
    </header>
  )
}

function MobileMenu() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  // Close the menu after navigating.
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    <Sheet onOpenChange={setOpen} open={open}>
      <SheetTrigger asChild>
        <Button
          aria-label="Open navigation"
          className="-ml-2 lg:hidden"
          size="icon"
          variant="ghost"
        >
          <MenuIcon />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-72 gap-0 overflow-y-auto" side="left">
        <SheetHeader>
          <SheetTitle>Business UI</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-8 px-4 pb-8">
          {navSections.map((section) => (
            <div className="flex flex-col gap-2" key={section.id}>
              <span className="px-2 font-semibold text-sm">
                {section.label}
              </span>
              <SectionNav section={section} />
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  )
}
