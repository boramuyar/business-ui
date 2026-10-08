import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"

export function FieldVariants() {
  return (
    <FieldGroup className="max-w-sm">
      <Field>
        <FieldLabel htmlFor="field-demo-vertical">
          Vertical (default)
        </FieldLabel>
        <Input id="field-demo-vertical" placeholder="Value" />
        <FieldDescription>Label above, control below.</FieldDescription>
      </Field>
      <FieldSeparator />
      <Field orientation="horizontal">
        <FieldContent>
          <FieldLabel htmlFor="field-demo-horizontal">Horizontal</FieldLabel>
          <FieldDescription>Control sits beside the text.</FieldDescription>
        </FieldContent>
        <Switch id="field-demo-horizontal" />
      </Field>
    </FieldGroup>
  )
}
