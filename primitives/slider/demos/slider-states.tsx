import { Field, FieldLabel } from "@/components/ui/field"
import { Slider } from "@/components/ui/slider"

export function SliderStates() {
  return (
    <Field className="max-w-sm" data-disabled="true">
      <FieldLabel htmlFor="slider-states-volume">Volume</FieldLabel>
      <Slider defaultValue={[30]} disabled id="slider-states-volume" />
    </Field>
  )
}
