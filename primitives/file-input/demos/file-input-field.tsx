import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"
import { FileInput } from "@/components/ui/file-input"

export function FileInputField() {
  return (
    <Field className="w-full max-w-sm">
      <FieldLabel htmlFor="contract-files">Contract</FieldLabel>
      <FileInput id="contract-files" multiple name="contract" />
      <FieldDescription>PDF or Word, up to 10 MB each.</FieldDescription>
    </Field>
  )
}
