import { BoldIcon, ItalicIcon } from "lucide-react"
import { Toggle } from "@/components/ui/toggle"

export function ToggleVariants() {
  return (
    <>
      <Toggle aria-label="Bold" tooltip="Bold">
        <BoldIcon />
      </Toggle>
      <Toggle aria-label="Italic" tooltip="Italic" variant="outline">
        <ItalicIcon />
      </Toggle>
    </>
  )
}
