import { Field, FieldLabel } from "@/components/ui/field"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function SelectDisabled() {
  return (
    <Field className="w-56">
      <FieldLabel htmlFor="select-disabled-plan">Plan</FieldLabel>
      <Select>
        <SelectTrigger id="select-disabled-plan">
          <SelectValue placeholder="Pick a plan" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="free">Free</SelectItem>
          <SelectItem value="starter">Starter</SelectItem>
          <SelectItem value="team">Team</SelectItem>
          <SelectItem value="growth">Growth</SelectItem>
          <SelectItem value="business">Business</SelectItem>
          <SelectItem value="scale">Scale</SelectItem>
          <SelectItem disabled value="enterprise">
            Enterprise (contact us)
          </SelectItem>
        </SelectContent>
      </Select>
    </Field>
  )
}
