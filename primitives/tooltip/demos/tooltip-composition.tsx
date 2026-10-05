import { CopyIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Kbd } from "@/components/ui/kbd"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export function TooltipComposition() {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button aria-label="Copy" size="icon" variant="outline">
          <CopyIcon />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        Copy
        <Kbd>Ctrl</Kbd>
        <Kbd>C</Kbd>
      </TooltipContent>
    </Tooltip>
  )
}
