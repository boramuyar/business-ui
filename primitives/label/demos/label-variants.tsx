import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export function LabelVariants() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <div className="grid gap-2">
        <Label htmlFor="label-demo-input">Project name</Label>
        <Input id="label-demo-input" placeholder="Business UI" />
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="label-demo-checkbox" />
        <Label htmlFor="label-demo-checkbox">Accept terms</Label>
      </div>
      <div className="flex items-center gap-2">
        <Switch id="label-demo-switch" />
        <Label htmlFor="label-demo-switch">Email notifications</Label>
      </div>
    </div>
  )
}
