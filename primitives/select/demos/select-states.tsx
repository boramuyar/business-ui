import { Field, FieldError, FieldLabel } from "@/components/ui/field"
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

export function SelectStates() {
  return (
    <>
      <Field className="w-40" data-disabled="true">
        <FieldLabel htmlFor="select-states-disabled">Region</FieldLabel>
        <Select disabled>
          <SelectTrigger id="select-states-disabled">
            <SelectValue placeholder="Pick a region" />
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
      <Field className="w-40" data-invalid="true">
        <FieldLabel htmlFor="select-states-invalid">Backup region</FieldLabel>
        <Select>
          <SelectTrigger aria-invalid id="select-states-invalid">
            <SelectValue placeholder="Pick a region" />
          </SelectTrigger>
          <SelectContent>
            {regions.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <FieldError>Choose a backup region.</FieldError>
      </Field>
    </>
  )
}
