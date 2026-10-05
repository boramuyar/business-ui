import { BoldIcon, ItalicIcon } from "lucide-react"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

export function ToggleGroupStates() {
  return (
    <ToggleGroup disabled type="multiple" variant="outline">
      <ToggleGroupItem aria-label="Bold" value="bold">
        <BoldIcon />
      </ToggleGroupItem>
      <ToggleGroupItem aria-label="Italic" value="italic">
        <ItalicIcon />
      </ToggleGroupItem>
    </ToggleGroup>
  )
}
