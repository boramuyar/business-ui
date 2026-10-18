import { useState } from "react"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

export function ToggleGroupSegmented() {
  const [content, setContent] = useState("dynamic")

  return (
    <div className="w-full max-w-60">
      <ToggleGroup
        type="single"
        variant="segmented"
        aria-label="Multi-cell content"
        value={content}
        onValueChange={setContent}
      >
        <ToggleGroupItem value="dynamic">Dynamic</ToggleGroupItem>
        <ToggleGroupItem value="text">Text</ToggleGroupItem>
      </ToggleGroup>
    </div>
  )
}
