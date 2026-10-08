import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select"

export function NativeSelectStates() {
  return (
    <>
      <Field className="w-40" data-disabled="true">
        <FieldLabel htmlFor="native-select-states-disabled">
          Currency
        </FieldLabel>
        <NativeSelect disabled id="native-select-states-disabled">
          <NativeSelectOption value="eur">EUR</NativeSelectOption>
        </NativeSelect>
      </Field>
      <Field className="w-40" data-invalid="true">
        <FieldLabel htmlFor="native-select-states-invalid">
          Payment terms
        </FieldLabel>
        <NativeSelect
          aria-invalid
          defaultValue=""
          id="native-select-states-invalid"
        >
          <NativeSelectOption value="">Choose terms</NativeSelectOption>
          <NativeSelectOption value="net-14">Net 14</NativeSelectOption>
          <NativeSelectOption value="net-30">Net 30</NativeSelectOption>
        </NativeSelect>
        <FieldError>Choose payment terms.</FieldError>
      </Field>
    </>
  )
}
