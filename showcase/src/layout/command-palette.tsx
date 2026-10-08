import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@frontend/primitives/command"
import { useNavigate } from "react-router-dom"
import { designDocs } from "../design-docs"
import { primitiveRoutes, shellRoutes } from "../primitives-data"
import { navSections } from "./site-nav"

/** Site pages, labelled as in the navigation; docs and catalog items have their own groups. */
const pageEntries = navSections
  .flatMap((section) => section.groups.flatMap((group) => group.links))
  .filter(
    (link) =>
      !link.to.startsWith("/design") &&
      !/^\/(primitives|shells)\/./.test(link.to)
  )

export function CommandPalette({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const navigate = useNavigate()

  function goTo(path: string) {
    onOpenChange(false)
    navigate(path)
  }

  return (
    <CommandDialog
      description="Search pages and components"
      onOpenChange={onOpenChange}
      open={open}
      title="Search"
    >
      <CommandInput placeholder="Search pages and components..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Pages">
          {pageEntries.map((page) => (
            <CommandItem key={page.to} onSelect={() => goTo(page.to)}>
              {page.label}
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Design">
          {designDocs.map((doc) => (
            <CommandItem
              key={doc.path}
              onSelect={() =>
                goTo(doc.slug ? `/design/${doc.slug}` : "/design")
              }
              value={`design ${doc.title}`}
            >
              {doc.title}
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Components">
          {primitiveRoutes.map((route) => (
            <CommandItem
              key={route.name}
              onSelect={() => goTo(`/primitives/${route.name}`)}
              value={`${route.title} ${route.name} ${route.description}`}
            >
              {route.title}
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Shells">
          {shellRoutes.map((route) => (
            <CommandItem
              key={route.name}
              onSelect={() => goTo(`/shells/${route.name}`)}
              value={`${route.title} ${route.name} ${route.description}`}
            >
              {route.title}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}
