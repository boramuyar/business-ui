import { useState } from "react"

import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export function SwitchControlled() {
  const [enabled, setEnabled] = useState(true)

  return (
    <div className="flex items-center gap-2">
      <Switch
        checked={enabled}
        id="switch-demo-controlled"
        onCheckedChange={setEnabled}
      />
      <Label htmlFor="switch-demo-controlled">
        Notifications {enabled ? "on" : "off"}
      </Label>
    </div>
  )
}
