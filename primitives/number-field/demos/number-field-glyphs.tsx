import { LayersIcon } from "lucide-react"
import { useState } from "react"
import { NumberField } from "@/components/ui/number-field"

export function NumberFieldGlyphs() {
  const [rate, setRate] = useState(4.25)
  const [shock, setShock] = useState(200)
  const [batch, setBatch] = useState(50)

  return (
    <div className="grid w-full max-w-sm grid-cols-2 gap-2">
      <NumberField
        label="Base rate"
        glyph="r"
        unit="%"
        spec={{ min: 0, max: 25, step: 0.05, decimals: 2 }}
        value={rate}
        onValueChange={setRate}
      />
      <NumberField
        label="Rate shock"
        glyph="Δ"
        unit="bps"
        spec={{ min: -500, max: 500, step: 5, decimals: 0, signed: true }}
        value={shock}
        onValueChange={setShock}
      />
      <NumberField
        label="Batch size"
        glyph={<LayersIcon />}
        spec={{ min: 1, max: 100, step: 1, decimals: 0 }}
        value={batch}
        onValueChange={setBatch}
        className="col-span-2"
      />
    </div>
  )
}
