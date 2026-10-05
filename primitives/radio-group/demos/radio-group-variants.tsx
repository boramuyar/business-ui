import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export function RadioGroupVariants() {
  return (
    <RadioGroup defaultValue="weekly">
      <div className="flex items-center gap-2">
        <RadioGroupItem id="radio-demo-daily" value="daily" />
        <Label htmlFor="radio-demo-daily">Daily digest</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem id="radio-demo-weekly" value="weekly" />
        <Label htmlFor="radio-demo-weekly">Weekly digest</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem id="radio-demo-never" value="never" />
        <Label htmlFor="radio-demo-never">Never</Label>
      </div>
    </RadioGroup>
  )
}
