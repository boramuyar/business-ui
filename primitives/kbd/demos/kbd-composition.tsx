import { FileTextIcon, SearchIcon, SettingsIcon } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Kbd, KbdGroup } from "@/components/ui/kbd"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export function KbdComposition() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button
        className="gap-2 text-muted-foreground"
        onClick={() => setOpen(true)}
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
      <CommandDialog onOpenChange={setOpen} open={open}>
        <CommandInput placeholder="Search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Pages">
            <CommandItem onSelect={() => setOpen(false)}>
              <FileTextIcon />
              Invoices
            </CommandItem>
            <CommandItem onSelect={() => setOpen(false)}>
              <SettingsIcon />
              Settings
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Save</Button>
        </TooltipTrigger>
        <TooltipContent>
          Save changes
          <Kbd>Ctrl</Kbd>
          <Kbd>S</Kbd>
        </TooltipContent>
      </Tooltip>
    </>
  )
}
