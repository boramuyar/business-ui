import { AlignCenterIcon, AlignLeftIcon, AlignRightIcon } from "lucide-react"
import { useState } from "react"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

export function ToggleGroupSingle() {
  const [align, setAlign] = useState("left")

  return (
    <div className="flex flex-col items-center gap-2">
      <ToggleGroup
        onValueChange={(value) => value && setAlign(value)}
        type="single"
        value={align}
        variant="outline"
      >
        <ToggleGroupItem aria-label="Align left" value="left">
          <AlignLeftIcon />
        </ToggleGroupItem>
        <ToggleGroupItem aria-label="Align center" value="center">
          <AlignCenterIcon />
        </ToggleGroupItem>
        <ToggleGroupItem aria-label="Align right" value="right">
          <AlignRightIcon />
        </ToggleGroupItem>
      </ToggleGroup>
      <span className="text-muted-foreground text-xs">Align: {align}</span>
    </div>
  )
}
