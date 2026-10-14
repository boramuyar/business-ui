import { Field, FieldError, FieldInput, FieldLabel } from "@/components/ui/field"

export function FieldStates() {
  return (
    <Field className="max-w-sm" invalid required>
      <FieldLabel>Workspace URL</FieldLabel>
      <FieldInput defaultValue="example .com" />
      <FieldError
        errors={[
          { message: "URLs cannot contain spaces." },
          { message: "Use a .com domain." },
        ]}
      />
    </Field>
  )
}
