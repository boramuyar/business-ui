import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

export function LabelStates() {
  return (
    <div className="flex items-center gap-2" data-disabled="true">
      <Checkbox disabled id="label-demo-disabled" />
      <Label htmlFor="label-demo-disabled">Disabled option</Label>
    </div>
  )
}
