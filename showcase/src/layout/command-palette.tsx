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
import { primitiveRoutes } from "../primitives-data"

const pageEntries = [
  { to: "/", label: "Home" },
  { to: "/installation", label: "Installation" },
  { to: "/primitives", label: "Primitives" },
  { to: "/style", label: "Style & Utilities" },
  { to: "/style-lab", label: "Style Lab" },
]

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
      description="Search pages and primitives"
      onOpenChange={onOpenChange}
      open={open}
      title="Search"
    >
      <CommandInput placeholder="Search pages and primitives..." />
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
        <CommandGroup heading="Primitives">
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
      </CommandList>
    </CommandDialog>
  )
}
