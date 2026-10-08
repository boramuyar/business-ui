import { Field, FieldLabel } from "@/components/ui/field"
import { Slider } from "@/components/ui/slider"

export function SliderOrientation() {
  return (
    <Field className="w-auto items-center">
      <FieldLabel htmlFor="slider-orientation-volume">Volume</FieldLabel>
      <Slider
        defaultValue={[60]}
        id="slider-orientation-volume"
        orientation="vertical"
      />
    </Field>
  )
}
