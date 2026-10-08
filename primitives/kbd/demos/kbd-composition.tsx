import { SearchIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Kbd, KbdGroup } from "@/components/ui/kbd"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export function KbdComposition() {
  return (
    <>
      <Button size="sm" variant="outline">
        <SearchIcon />
        Search
        <KbdGroup>
          <Kbd>Ctrl</Kbd>
          <Kbd>K</Kbd>
        </KbdGroup>
      </Button>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Save changes</Button>
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
