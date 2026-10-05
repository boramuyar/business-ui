import {
  NativeSelect,
  NativeSelectOptGroup,
  NativeSelectOption,
} from "@/components/ui/native-select"

export function NativeSelectComposition() {
  return (
    <NativeSelect defaultValue="frankfurt">
      <NativeSelectOptGroup label="Europe">
        <NativeSelectOption value="frankfurt">Frankfurt</NativeSelectOption>
        <NativeSelectOption value="london">London</NativeSelectOption>
      </NativeSelectOptGroup>
      <NativeSelectOptGroup label="Asia">
        <NativeSelectOption value="singapore">Singapore</NativeSelectOption>
        <NativeSelectOption value="tokyo">Tokyo</NativeSelectOption>
      </NativeSelectOptGroup>
    </NativeSelect>
  )
}
