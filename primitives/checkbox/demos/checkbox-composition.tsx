import { Checkbox } from "@/components/ui/checkbox"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldTitle,
} from "@/components/ui/field"
import { Label } from "@/components/ui/label"

export function CheckboxComposition() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Checkbox defaultChecked id="checkbox-demo-terms" />
        <Label htmlFor="checkbox-demo-terms">Accept terms and conditions</Label>
      </div>
      <Field orientation="horizontal">
        <Checkbox id="checkbox-demo-marketing" />
        <FieldContent>
          <FieldTitle>Marketing emails</FieldTitle>
          <FieldDescription>Occasional product announcements.</FieldDescription>
        </FieldContent>
      </Field>
    </div>
  )
}
