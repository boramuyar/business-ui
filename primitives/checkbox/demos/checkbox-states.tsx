import { Checkbox } from "@/components/ui/checkbox"

export function CheckboxStates() {
  return (
    <div className="flex items-center gap-4">
      <Checkbox aria-label="Unchecked" />
      <Checkbox aria-label="Checked" defaultChecked />
      <Checkbox aria-label="Indeterminate" checked="indeterminate" />
      <Checkbox aria-label="Disabled" disabled />
      <Checkbox aria-label="Disabled checked" defaultChecked disabled />
      <Checkbox aria-invalid aria-label="Invalid" />
    </div>
  )
}
