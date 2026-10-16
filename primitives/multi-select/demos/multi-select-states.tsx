import { useState } from "react"
import {
  Field,
  FieldError,
  FieldLabel,
  useFieldControl,
} from "@/components/ui/field"
import {
  MultiSelect,
  type MultiSelectOption,
} from "@/components/ui/multi-select"

const regions: MultiSelectOption[] = [
  { value: "frankfurt", label: "Frankfurt" },
  { value: "london", label: "London" },
  { value: "singapore", label: "Singapore" },
  { value: "virginia", label: "Virginia" },
]

export function MultiSelectStates() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <Field>
        <FieldLabel>Regions</FieldLabel>
        <RegionsSelect initialValue={[]} />
      </Field>
      <Field invalid required>
        <FieldLabel>Backup regions</FieldLabel>
        <RegionsSelect initialValue={[]} />
        <FieldError errors={[{ message: "Pick at least one region." }]} />
      </Field>
      <Field data-disabled="true">
        <FieldLabel>Archive regions</FieldLabel>
        <RegionsSelect initialValue={["london", "virginia"]} disabled />
      </Field>
    </div>
  )
}

function RegionsSelect({
  initialValue,
  disabled = false,
}: {
  initialValue: string[]
  disabled?: boolean
}) {
  const [value, setValue] = useState(initialValue)

  return (
    <MultiSelect
      {...useFieldControl()}
      options={regions}
      value={value}
      onValueChange={setValue}
      disabled={disabled}
      placeholder="Choose regions"
      searchPlaceholder="Search regions"
    />
  )
}
