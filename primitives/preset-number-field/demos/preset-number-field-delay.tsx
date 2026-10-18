import { TimerIcon } from "lucide-react"
import { useState } from "react"
import { PresetNumberField } from "@/components/ui/preset-number-field"

const presets = [0, 1, 5, 10, 60].map((value) => ({
  value,
  label: value === 0 ? "No delay" : `${value}s`,
}))

export function PresetNumberFieldDelay() {
  const [delay, setDelay] = useState(0)
  const [saved, setSaved] = useState(15)

  return (
    <div className="grid w-full max-w-sm grid-cols-2 gap-2">
      <PresetNumberField
        label="Delay"
        glyph={<TimerIcon />}
        unit="s"
        spec={{ min: 0, max: 3600, step: 1, decimals: 0 }}
        value={delay}
        presets={presets}
        customLabel="Custom…"
        onValueChange={setDelay}
      />
      <PresetNumberField
        label="Saved delay"
        glyph={<TimerIcon />}
        unit="s"
        spec={{ min: 0, max: 3600, step: 1, decimals: 0 }}
        value={saved}
        presets={presets}
        customLabel="Custom…"
        onValueChange={setSaved}
      />
    </div>
  )
}
