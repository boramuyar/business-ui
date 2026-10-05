import { Field, FieldLabel } from "@/components/ui/field"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function SelectComposition() {
  return (
    <Field>
      <FieldLabel>Deployment region</FieldLabel>
      <Select defaultValue="frankfurt">
        <SelectTrigger className="w-56">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Europe</SelectLabel>
            <SelectItem value="frankfurt">Frankfurt</SelectItem>
            <SelectItem value="london">London</SelectItem>
          </SelectGroup>
          <SelectSeparator />
          <SelectGroup>
            <SelectLabel>Asia</SelectLabel>
            <SelectItem value="singapore">Singapore</SelectItem>
            <SelectItem value="tokyo">Tokyo</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </Field>
  )
}
