import { BoldIcon } from "lucide-react"

import { Toggle } from "@/components/ui/toggle"

export function ToggleStates() {
  return (
    <>
      <Toggle aria-label="Pressed" defaultPressed variant="outline">
        <BoldIcon />
      </Toggle>
      <Toggle aria-label="Disabled" disabled variant="outline">
        <BoldIcon />
      </Toggle>
    </>
  )
}
