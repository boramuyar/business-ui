import { Checkbox } from "@/components/ui/checkbox"
import { Field, FieldLabel } from "@/components/ui/field"

export function LabelStates() {
  return (
    <Field className="w-auto" data-disabled="true" orientation="horizontal">
      <Checkbox disabled id="label-states-disabled" />
      <FieldLabel htmlFor="label-states-disabled">Disabled option</FieldLabel>
    </Field>
  )
}
