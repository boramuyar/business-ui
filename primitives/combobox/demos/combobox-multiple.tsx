import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor,
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

export function ComboboxMultiple() {
  const anchor = useComboboxAnchor()

  return (
    <Field className="w-72">
      <FieldLabel htmlFor="combobox-multiple-countries">
        Shipping countries
      </FieldLabel>
      <Combobox defaultValue={["Sweden"]} items={countries} multiple>
        <ComboboxChips ref={anchor}>
          <ComboboxValue>
            {(value: string[]) => (
              <>
                {value.map((item: string) => (
                  <ComboboxChip key={item}>{item}</ComboboxChip>
                ))}
                <ComboboxChipsInput
                  id="combobox-multiple-countries"
                  placeholder="Add country..."
                />
              </>
            )}
          </ComboboxValue>
        </ComboboxChips>
        <ComboboxContent anchor={anchor}>
          <ComboboxEmpty>No country found.</ComboboxEmpty>
          <ComboboxList>
            {(item: string) => (
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
