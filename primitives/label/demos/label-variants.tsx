import { Checkbox } from "@/components/ui/checkbox"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export function LabelVariants() {
  return (
    <FieldGroup className="max-w-sm">
      <div className="flex flex-col gap-2">
        <Label htmlFor="label-variants-input">Project name</Label>
        <Input id="label-variants-input" placeholder="Business UI" />
      </div>
      <Field orientation="horizontal">
        <Checkbox id="label-variants-checkbox" />
        <FieldLabel htmlFor="label-variants-checkbox">Accept terms</FieldLabel>
      </Field>
      <Field orientation="horizontal">
        <Switch id="label-variants-switch" />
        <FieldLabel htmlFor="label-variants-switch">
          Email notifications
        </FieldLabel>
      </Field>
    </FieldGroup>
  )
}
