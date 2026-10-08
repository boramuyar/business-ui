import { Field, FieldLabel } from "@/components/ui/field"
import { Textarea } from "@/components/ui/textarea"

export function TextareaVariants() {
  return (
    <Field className="max-w-sm">
      <FieldLabel htmlFor="textarea-variants-message">Message</FieldLabel>
      <Textarea id="textarea-variants-message" />
    </Field>
  )
}
