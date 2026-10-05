import { BoldIcon } from "lucide-react"

import { Toggle } from "@/components/ui/toggle"

export function ToggleSizes() {
  return (
    <>
      <Toggle aria-label="Small" size="sm" variant="outline">
        <BoldIcon />
      </Toggle>
      <Toggle aria-label="Default" variant="outline">
        <BoldIcon />
      </Toggle>
      <Toggle aria-label="Large" size="lg" variant="outline">
        <BoldIcon />
      </Toggle>
    </>
  )
}
