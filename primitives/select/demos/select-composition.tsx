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
    <Field className="w-56">
      <FieldLabel htmlFor="select-composition-region">
        Deployment region
      </FieldLabel>
      <Select defaultValue="frankfurt">
        <SelectTrigger id="select-composition-region">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Europe</SelectLabel>
            <SelectItem value="frankfurt">Frankfurt</SelectItem>
            <SelectItem value="london">London</SelectItem>
            <SelectItem value="paris">Paris</SelectItem>
            <SelectItem value="stockholm">Stockholm</SelectItem>
          </SelectGroup>
          <SelectSeparator />
          <SelectGroup>
            <SelectLabel>Asia-Pacific</SelectLabel>
            <SelectItem value="singapore">Singapore</SelectItem>
            <SelectItem value="tokyo">Tokyo</SelectItem>
            <SelectItem value="sydney">Sydney</SelectItem>
          </SelectGroup>
          <SelectSeparator />
          <SelectGroup>
            <SelectLabel>North America</SelectLabel>
            <SelectItem value="virginia">Virginia</SelectItem>
            <SelectItem value="oregon">Oregon</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </Field>
  )
}
