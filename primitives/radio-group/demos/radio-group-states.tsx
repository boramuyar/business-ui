import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export function RadioGroupStates() {
  return (
    <RadioGroup defaultValue="starter">
      <div className="flex items-center gap-2">
        <RadioGroupItem id="radio-demo-starter" value="starter" />
        <Label htmlFor="radio-demo-starter">Starter</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem
          disabled
          id="radio-demo-enterprise"
          value="enterprise"
        />
        <Label htmlFor="radio-demo-enterprise">Enterprise (contact us)</Label>
      </div>
    </RadioGroup>
  )
}
