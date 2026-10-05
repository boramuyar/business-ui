import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export function FieldStates() {
  return (
    <Field className="max-w-sm" data-invalid="true">
      <FieldLabel htmlFor="field-demo-error">Workspace URL</FieldLabel>
      <Input
        aria-invalid
        defaultValue="example .com"
        id="field-demo-error"
      />
      <FieldError
        errors={[
          { message: "URLs cannot contain spaces." },
          { message: "Use a .global domain." },
        ]}
      />
    </Field>
  )
}
