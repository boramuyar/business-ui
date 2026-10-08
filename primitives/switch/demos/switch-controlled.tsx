import { useState } from "react"

import { Field, FieldLabel } from "@/components/ui/field"
import { Switch } from "@/components/ui/switch"

export function SwitchControlled() {
  const [enabled, setEnabled] = useState(true)

  return (
    <Field className="w-auto" orientation="horizontal">
      <Switch
        checked={enabled}
        id="switch-demo-controlled"
        onCheckedChange={setEnabled}
      />
      <FieldLabel htmlFor="switch-demo-controlled">
        Notifications {enabled ? "on" : "off"}
      </FieldLabel>
    </Field>
  )
}
