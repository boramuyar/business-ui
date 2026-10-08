import { useState } from "react"
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"
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
  { value: "sydney", label: "Sydney" },
  { value: "virginia", label: "Virginia" },
  { value: "oregon", label: "Oregon" },
]

export function SelectControlled() {
  const [region, setRegion] = useState("frankfurt")

  return (
    <Field className="w-44">
      <FieldLabel htmlFor="select-controlled-region">Region</FieldLabel>
      <Select onValueChange={setRegion} value={region}>
        <SelectTrigger id="select-controlled-region">
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
      <FieldDescription>Selected: {region}</FieldDescription>
    </Field>
  )
}
