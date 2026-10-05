import { Kbd, KbdGroup } from "@/components/ui/kbd"

export function KbdVariants() {
  return (
    <>
      <Kbd>Esc</Kbd>
      <Kbd>Enter</Kbd>
      <KbdGroup>
        <Kbd>Ctrl</Kbd>
        <Kbd>Shift</Kbd>
        <Kbd>P</Kbd>
      </KbdGroup>
    </>
  )
}
