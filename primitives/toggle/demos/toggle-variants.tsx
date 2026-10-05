import { BoldIcon, ItalicIcon } from "lucide-react"
import { Toggle } from "@/components/ui/toggle"

export function ToggleVariants() {
  return (
    <>
      <Toggle aria-label="Toggle bold">
        <BoldIcon />
      </Toggle>
      <Toggle aria-label="Toggle italic" variant="outline">
        <ItalicIcon />
      </Toggle>
    </>
  )
}
