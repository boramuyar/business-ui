import { Button } from "@/components/ui/button"
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"
import { Textarea } from "@/components/ui/textarea"

export function TextareaComposition() {
  return (
    <Field className="max-w-sm">
      <FieldLabel htmlFor="textarea-demo-feedback">Feedback</FieldLabel>
      <Textarea
        id="textarea-demo-feedback"
        placeholder="What should we improve?"
      />
      <FieldDescription>Visible to the design system team.</FieldDescription>
      <Button className="self-end">Send feedback</Button>
    </Field>
  )
}
