import { Field, FieldLabel, FieldLegend, FieldSet } from "@/components/ui/field"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export function RadioGroupStates() {
  return (
    <FieldSet>
      <FieldLegend variant="label">Plan</FieldLegend>
      <RadioGroup defaultValue="starter">
        <Field orientation="horizontal">
          <RadioGroupItem id="radio-group-states-starter" value="starter" />
          <FieldLabel htmlFor="radio-group-states-starter">Starter</FieldLabel>
        </Field>
        <Field data-disabled="true" orientation="horizontal">
          <RadioGroupItem
            disabled
            id="radio-group-states-enterprise"
            value="enterprise"
          />
          <FieldLabel htmlFor="radio-group-states-enterprise">
            Enterprise (contact us)
          </FieldLabel>
        </Field>
      </RadioGroup>
    </FieldSet>
  )
}
