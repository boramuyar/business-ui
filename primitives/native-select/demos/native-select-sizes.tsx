import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select"

export function NativeSelectSizes() {
  return (
    <>
      <NativeSelect defaultValue="default">
        <NativeSelectOption value="default">Default size</NativeSelectOption>
        <NativeSelectOption value="other">Another option</NativeSelectOption>
      </NativeSelect>
      <NativeSelect defaultValue="sm" size="sm">
        <NativeSelectOption value="sm">Small size</NativeSelectOption>
        <NativeSelectOption value="other">Another option</NativeSelectOption>
      </NativeSelect>
    </>
  )
}
