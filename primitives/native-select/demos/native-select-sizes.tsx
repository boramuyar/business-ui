import { Field, FieldLabel } from "@/components/ui/field"
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select"

export function NativeSelectSizes() {
  return (
    <>
      <Field className="w-40">
        <FieldLabel htmlFor="native-select-sizes-default">
          Default size
        </FieldLabel>
        <NativeSelect defaultValue="monthly" id="native-select-sizes-default">
          <NativeSelectOption value="monthly">Monthly</NativeSelectOption>
          <NativeSelectOption value="yearly">Yearly</NativeSelectOption>
        </NativeSelect>
      </Field>
      <Field className="w-40">
        <FieldLabel htmlFor="native-select-sizes-sm">Small size</FieldLabel>
        <NativeSelect
          defaultValue="monthly"
          id="native-select-sizes-sm"
          size="sm"
        >
          <NativeSelectOption value="monthly">Monthly</NativeSelectOption>
          <NativeSelectOption value="yearly">Yearly</NativeSelectOption>
        </NativeSelect>
      </Field>
    </>
  )
}
