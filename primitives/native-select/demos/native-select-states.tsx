import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select"

export function NativeSelectStates() {
  return (
    <>
      <NativeSelect disabled>
        <NativeSelectOption>Disabled</NativeSelectOption>
      </NativeSelect>
      <NativeSelect aria-invalid defaultValue="invalid">
        <NativeSelectOption value="invalid">Invalid</NativeSelectOption>
      </NativeSelect>
    </>
  )
}
