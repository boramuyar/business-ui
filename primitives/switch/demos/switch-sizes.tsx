import { Switch } from "@/components/ui/switch"

export function SwitchSizes() {
  return (
    <>
      <Switch aria-label="Default size" defaultChecked />
      <Switch aria-label="Small size" defaultChecked size="sm" />
    </>
  )
}
