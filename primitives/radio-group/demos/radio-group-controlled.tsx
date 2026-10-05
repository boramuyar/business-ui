import { useState } from "react"

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export function RadioGroupControlled() {
  const [density, setDensity] = useState("comfortable")

  return (
    <div className="flex flex-col gap-2">
      <RadioGroup onValueChange={setDensity} value={density}>
        <div className="flex items-center gap-2">
          <RadioGroupItem id="radio-demo-compact" value="compact" />
          <Label htmlFor="radio-demo-compact">Compact</Label>
        </div>
        <div className="flex items-center gap-2">
          <RadioGroupItem id="radio-demo-comfortable" value="comfortable" />
          <Label htmlFor="radio-demo-comfortable">Comfortable</Label>
        </div>
      </RadioGroup>
      <span className="text-muted-foreground text-xs">Density: {density}</span>
    </div>
  )
}
