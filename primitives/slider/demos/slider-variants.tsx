import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Slider } from "@/components/ui/slider"

export function SliderVariants() {
  return (
    <FieldGroup className="max-w-sm">
      <Field>
        <FieldLabel htmlFor="slider-variants-volume">Volume</FieldLabel>
        <Slider defaultValue={[50]} id="slider-variants-volume" />
      </Field>
      <Field>
        <FieldLabel htmlFor="slider-variants-price">Price range</FieldLabel>
        <Slider defaultValue={[20, 80]} id="slider-variants-price" />
      </Field>
      <Field>
        <FieldLabel htmlFor="slider-variants-zoom">Zoom</FieldLabel>
        <Slider
          defaultValue={[40]}
          id="slider-variants-zoom"
          max={100}
          step={5}
        />
      </Field>
    </FieldGroup>
  )
}
