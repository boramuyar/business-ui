import { useState } from "react"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

const kinds = [
  { value: "error", label: "Errors (2)" },
  { value: "warning", label: "Warnings (3)" },
  { value: "info", label: "Info (2)" },
  { value: "test", label: "Tests (2)" },
]

export function ToggleGroupChips() {
  const [shown, setShown] = useState<string[]>(["warning"])
  return (
    <div className="flex flex-col gap-2">
      <ToggleGroup
        type="multiple"
        variant="chip"
        spacing={1}
        value={shown}
        onValueChange={setShown}
        aria-label="Filter the log"
        className="flex-wrap"
      >
        {kinds.map((kind) => (
          <ToggleGroupItem key={kind.value} value={kind.value}>
            {kind.label}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
      <p className="text-xs text-muted-foreground">
        {shown.length === 0
          ? "Showing every message"
          : `Showing ${shown.join(", ")}`}
      </p>
    </div>
  )
}
