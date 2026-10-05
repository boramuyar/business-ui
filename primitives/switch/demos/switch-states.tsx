import { Switch } from "@/components/ui/switch"

export function SwitchStates() {
  return (
    <>
      <Switch aria-label="Unchecked" />
      <Switch aria-label="Checked" defaultChecked />
      <Switch aria-label="Disabled" disabled />
      <Switch aria-label="Disabled checked" defaultChecked disabled />
    </>
  )
}
