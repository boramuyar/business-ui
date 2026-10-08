import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox"
import { Field, FieldLabel } from "@/components/ui/field"

const countries = [
  "Austria",
  "Belgium",
  "Denmark",
  "Finland",
  "France",
  "Germany",
  "Ireland",
  "Italy",
  "Netherlands",
  "Norway",
  "Poland",
  "Portugal",
  "Spain",
  "Sweden",
  "Switzerland",
  "United Kingdom",
]

export function ComboboxClearable() {
  return (
    <Field className="w-56">
      <FieldLabel htmlFor="combobox-clearable-country">Country</FieldLabel>
      <Combobox defaultValue="Sweden" items={countries}>
        <ComboboxInput
          id="combobox-clearable-country"
          placeholder="Search countries"
          showClear
        />
        <ComboboxContent>
          <ComboboxEmpty>No country found.</ComboboxEmpty>
          <ComboboxList>
            {(item) => (
              <ComboboxItem key={item} value={item}>
                {item}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </Field>
  )
}
