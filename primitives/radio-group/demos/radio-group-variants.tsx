import { Field, FieldLabel, FieldLegend, FieldSet } from "@/components/ui/field"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export function RadioGroupVariants() {
  return (
    <FieldSet>
      <FieldLegend variant="label">Email digest</FieldLegend>
      <RadioGroup defaultValue="weekly">
        <Field orientation="horizontal">
          <RadioGroupItem id="radio-group-variants-daily" value="daily" />
          <FieldLabel htmlFor="radio-group-variants-daily">
            Daily digest
          </FieldLabel>
        </Field>
        <Field orientation="horizontal">
          <RadioGroupItem id="radio-group-variants-weekly" value="weekly" />
          <FieldLabel htmlFor="radio-group-variants-weekly">
            Weekly digest
          </FieldLabel>
        </Field>
        <Field orientation="horizontal">
          <RadioGroupItem id="radio-group-variants-never" value="never" />
          <FieldLabel htmlFor="radio-group-variants-never">Never</FieldLabel>
        </Field>
      </RadioGroup>
    </FieldSet>
  )
}
