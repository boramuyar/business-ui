import { useState } from "react"
import {
  NumberField,
  type NumberSpec,
  ScrubLabel,
  useNumberScrub,
} from "@/components/ui/number-field"

const spec: NumberSpec = { min: 0, max: 25, step: 0.05, decimals: 2 }

export function NumberFieldLabel() {
  const [rate, setRate] = useState(4.25)
  const scrub = useNumberScrub({ value: rate, spec, onValueChange: setRate })

  return (
    <div className="grid w-full max-w-sm grid-cols-[88px_minmax(0,1fr)] items-center gap-2">
      <ScrubLabel scrub={scrub}>Base rate</ScrubLabel>
      <NumberField
        label="Base rate"
        unit="%"
        spec={spec}
        value={rate}
        onValueChange={setRate}
        scrubbing={scrub.scrubbing}
      />
    </div>
  )
}
