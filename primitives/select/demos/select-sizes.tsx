import { Field, FieldLabel } from "@/components/ui/field"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const regions = [
  { value: "frankfurt", label: "Frankfurt" },
  { value: "london", label: "London" },
  { value: "paris", label: "Paris" },
  { value: "stockholm", label: "Stockholm" },
  { value: "singapore", label: "Singapore" },
  { value: "tokyo", label: "Tokyo" },
]

export function SelectSizes() {
  return (
    <>
      <Field className="w-40">
        <FieldLabel htmlFor="select-sizes-default">Region</FieldLabel>
        <Select defaultValue="frankfurt">
          <SelectTrigger id="select-sizes-default">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {regions.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Field>
      <Field className="w-40">
        <FieldLabel htmlFor="select-sizes-sm">Backup region</FieldLabel>
        <Select defaultValue="london">
          <SelectTrigger id="select-sizes-sm" size="sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {regions.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Field>
    </>
  )
}
