import { Field, FieldLabel } from "@/components/ui/field"
import {
  NativeSelect,
  NativeSelectOptGroup,
  NativeSelectOption,
} from "@/components/ui/native-select"

export function NativeSelectComposition() {
  return (
    <Field className="w-48">
      <FieldLabel htmlFor="native-select-composition-region">Region</FieldLabel>
      <NativeSelect
        defaultValue="frankfurt"
        id="native-select-composition-region"
      >
        <NativeSelectOptGroup label="Europe">
          <NativeSelectOption value="frankfurt">Frankfurt</NativeSelectOption>
          <NativeSelectOption value="london">London</NativeSelectOption>
        </NativeSelectOptGroup>
        <NativeSelectOptGroup label="Asia">
          <NativeSelectOption value="singapore">Singapore</NativeSelectOption>
          <NativeSelectOption value="tokyo">Tokyo</NativeSelectOption>
        </NativeSelectOptGroup>
      </NativeSelect>
    </Field>
  )
}
