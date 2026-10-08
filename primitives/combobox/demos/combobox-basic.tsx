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

export function ComboboxBasic() {
  return (
    <Field className="w-56">
      <FieldLabel htmlFor="combobox-basic-country">Country</FieldLabel>
      <Combobox items={countries}>
        <ComboboxInput
          id="combobox-basic-country"
          placeholder="Search countries"
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
