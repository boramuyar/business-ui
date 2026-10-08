import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export function InputStates() {
  return (
    <FieldGroup className="max-w-sm">
      <Field data-disabled="true">
        <FieldLabel htmlFor="input-states-disabled">Workspace ID</FieldLabel>
        <Input disabled id="input-states-disabled" />
      </Field>
      <Field data-invalid="true">
        <FieldLabel htmlFor="input-states-invalid">Email</FieldLabel>
        <Input aria-invalid defaultValue="boram@" id="input-states-invalid" />
        <FieldError>Enter a full email address.</FieldError>
      </Field>
      <Field>
        <FieldLabel htmlFor="input-states-readonly">Invoice number</FieldLabel>
        <Input id="input-states-readonly" readOnly value="INV-2041" />
      </Field>
    </FieldGroup>
  )
}
