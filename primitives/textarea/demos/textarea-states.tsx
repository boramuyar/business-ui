import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Textarea } from "@/components/ui/textarea"

export function TextareaStates() {
  return (
    <FieldGroup className="max-w-sm">
      <Field data-disabled="true">
        <FieldLabel htmlFor="textarea-states-disabled">
          Internal note
        </FieldLabel>
        <Textarea disabled id="textarea-states-disabled" />
      </Field>
      <Field data-invalid="true">
        <FieldLabel htmlFor="textarea-states-invalid">Reason</FieldLabel>
        <Textarea
          aria-invalid
          defaultValue="n/a"
          id="textarea-states-invalid"
        />
        <FieldError>Describe the reason in a full sentence.</FieldError>
      </Field>
    </FieldGroup>
  )
}
