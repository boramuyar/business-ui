import {
  Combobox,
  ComboboxContent,
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

export function ComboboxDisabled() {
  return (
    <Field className="w-56" data-disabled="true">
      <FieldLabel htmlFor="combobox-disabled-country">Country</FieldLabel>
      <Combobox items={countries}>
        <ComboboxInput
          disabled
          id="combobox-disabled-country"
          placeholder="Search countries"
        />
        <ComboboxContent>
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
