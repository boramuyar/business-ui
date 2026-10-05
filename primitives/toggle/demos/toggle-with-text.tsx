import { PinIcon } from "lucide-react"

import { Toggle } from "@/components/ui/toggle"

export function ToggleWithText() {
  return (
    <Toggle variant="outline">
      <PinIcon data-icon="inline-start" />
      Pin to sidebar
    </Toggle>
  )
}
