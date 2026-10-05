import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function DropdownMenuStates() {
  const [showGrid, setShowGrid] = useState(true)
  const [zoom, setZoom] = useState("100")

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">View options</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48">
        <DropdownMenuCheckboxItem
          checked={showGrid}
          onCheckedChange={setShowGrid}
        >
          Show grid
        </DropdownMenuCheckboxItem>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Zoom</DropdownMenuLabel>
        <DropdownMenuRadioGroup onValueChange={setZoom} value={zoom}>
          <DropdownMenuRadioItem value="50">50%</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="100">100%</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="200">200%</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
