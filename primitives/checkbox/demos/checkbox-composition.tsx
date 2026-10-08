import { Checkbox } from "@/components/ui/checkbox"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"

export function CheckboxComposition() {
  return (
    <FieldGroup className="max-w-sm">
      <Field orientation="horizontal">
        <Checkbox defaultChecked id="checkbox-composition-terms" />
        <FieldLabel htmlFor="checkbox-composition-terms">
          Accept terms and conditions
        </FieldLabel>
      </Field>
      <Field orientation="horizontal">
        <Checkbox id="checkbox-composition-marketing" />
        <FieldContent>
          <FieldLabel htmlFor="checkbox-composition-marketing">
            Marketing emails
          </FieldLabel>
          <FieldDescription>Occasional product announcements.</FieldDescription>
        </FieldContent>
      </Field>
    </FieldGroup>
  )
}
