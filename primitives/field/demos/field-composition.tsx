import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export function FieldComposition() {
  return (
    <FieldGroup className="max-w-sm">
      <FieldSet>
        <FieldLegend>Profile</FieldLegend>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="field-demo-name">Name</FieldLabel>
            <Input id="field-demo-name" placeholder="Boram Uyar" />
          </Field>
          <Field>
            <FieldLabel htmlFor="field-demo-title">Title</FieldLabel>
            <Input id="field-demo-title" placeholder="Design engineer" />
          </Field>
        </FieldGroup>
      </FieldSet>
      <FieldSeparator>Preferences</FieldSeparator>
      <Field orientation="horizontal">
        <Checkbox defaultChecked id="field-demo-updates" />
        <FieldContent>
          <FieldLabel htmlFor="field-demo-updates">Product updates</FieldLabel>
          <FieldDescription>A short monthly summary.</FieldDescription>
        </FieldContent>
      </Field>
      <Button className="self-start">Save profile</Button>
    </FieldGroup>
  )
}
