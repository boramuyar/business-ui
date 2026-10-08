import { useState } from "react"

import { Field, FieldLabel } from "@/components/ui/field"
import { Slider } from "@/components/ui/slider"

export function SliderControlled() {
  const [value, setValue] = useState([40])

  return (
    <Field className="w-full max-w-sm">
      <FieldLabel htmlFor="slider-controlled-volume">
        Volume: {value[0]}%
      </FieldLabel>
      <Slider
        id="slider-controlled-volume"
        max={100}
        onValueChange={setValue}
        step={1}
        value={value}
      />
    </Field>
  )
}
