import { Button } from "@frontend/primitives/button"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@frontend/primitives/input-group"
import { Kbd, KbdGroup } from "@frontend/primitives/kbd"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@frontend/primitives/navigation-menu"
import { SidebarTrigger } from "@frontend/primitives/sidebar"
import { SearchIcon } from "lucide-react"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { CommandPalette } from "./command-palette"
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
    <header className="sticky top-0 z-40 flex h-14 shrink-0 items-center gap-6 border-b bg-background px-4 md:px-6">
      <div className="flex shrink-0 items-center gap-2">
        <SidebarTrigger
          aria-label="Open navigation"
          className="md:hidden"
          tooltip="Open navigation"
        />
        <Link className="flex items-center gap-2" to="/">
          <img alt="" className="size-5" src={logoUrl} />
          <span className="font-semibold text-sm">Business UI</span>
        </Link>
      </div>
      <NavigationMenu className="hidden md:flex" viewport={false}>
        <NavigationMenuList>
          {navSections.map((entry) => (
            <NavigationMenuItem key={entry.id}>
              <NavigationMenuLink
                active={entry.id === section.id}
                asChild
                variant="muted"
              >
                <Link to={entry.to}>{entry.label}</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
      <div className="ml-auto flex items-center gap-2">
        <InputGroup
          className="hidden w-60 lg:flex"
          onClick={() => setPaletteOpen(true)}
        >
          <InputGroupAddon>
            <SearchIcon />
          </InputGroupAddon>
          <InputGroupInput
            aria-label="Search the handbook"
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault()
                setPaletteOpen(true)
              }
            }}
            placeholder="Search the handbook"
            readOnly
          />
          <InputGroupAddon align="inline-end">
            <KbdGroup>
              <Kbd>Ctrl</Kbd>
              <Kbd>K</Kbd>
            </KbdGroup>
          </InputGroupAddon>
        </InputGroup>
        <Button
          aria-label="Search the handbook"
          className="lg:hidden"
          onClick={() => setPaletteOpen(true)}
          size="icon"
          tooltip="Search the handbook"
          variant="ghost"
        >
          <SearchIcon />
        </Button>
        <Button asChild className="hidden lg:inline-flex" variant="ghost">
          <a href="https://github.com/boramuyar/business-ui">GitHub</a>
        </Button>
        <ThemeToggle />
      </div>
      <CommandPalette onOpenChange={setPaletteOpen} open={paletteOpen} />
    </header>
  )
}
