import { type ReactNode, useState } from "react"
import { NumberField, type NumberSpec } from "@/components/ui/number-field"

const spec: NumberSpec = { min: 0, max: 25, step: 0.05, decimals: 2 }

export function NumberFieldStates() {
  const [rate, setRate] = useState(4.25)
  const field = {
    label: "Base rate",
    glyph: "r",
    unit: "%",
    spec,
    value: rate,
    onValueChange: setRate,
  }

  return (
    <div className="grid w-full max-w-sm grid-cols-2 gap-x-2 gap-y-3">
      <State name="Default">
        <NumberField {...field} />
      </State>
      <State name="Dragging">
        <NumberField {...field} scrubbing />
      </State>
      <State name="Invalid">
        <NumberField {...field} invalid />
      </State>
      <State name="Disabled">
        <NumberField {...field} disabled />
      </State>
      <State name="Read-only, derived">
        <NumberField {...field} glyph="r′" value={rate + 2} readOnly />
      </State>
    </div>
  )
}

function State({ name, children }: { name: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-xs text-muted-foreground">{name}</span>
      {children}
    </div>
  )
}
