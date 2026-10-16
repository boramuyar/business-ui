import { useState } from "react"
import {
  Field,
  FieldDescription,
  FieldLabel,
  useFieldControl,
} from "@/components/ui/field"
import {
  MultiSelect,
  type MultiSelectOption,
} from "@/components/ui/multi-select"

const sheets: MultiSelectOption[] = [
  { value: "instructions", label: "Instructions" },
  { value: "pricing", label: "Pricing" },
  { value: "rates", label: "Rate tables" },
  { value: "calc", label: "Premium calc" },
  { value: "summary", label: "Summary" },
  { value: "audit", label: "Audit log", disabled: true },
]

export function MultiSelectField() {
  const [value, setValue] = useState(["pricing", "rates", "summary", "audit"])

  return (
    <Field className="w-full max-w-sm">
      <FieldLabel>Sheets shown</FieldLabel>
      <SheetsSelect value={value} onValueChange={setValue} />
      <FieldDescription>
        Inputs sit on Pricing and Rate tables. Audit log is always shown.
      </FieldDescription>
    </Field>
  )
}

function SheetsSelect({
  value,
  onValueChange,
}: {
  value: string[]
  onValueChange: (value: string[]) => void
}) {
  return (
    <MultiSelect
      {...useFieldControl()}
      options={sheets}
      value={value}
      onValueChange={onValueChange}
      placeholder="Choose sheets"
      summary={(picked, total) => `${picked} of ${total} sheets`}
      searchPlaceholder="Search sheets"
      selectAllLabel="Select all"
      emptyText="No sheets found"
    />
  )
}
