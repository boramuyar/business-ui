"use client"

import { XIcon } from "lucide-react"
import { useState } from "react"
import { InputGroupButton } from "@/components/ui/input-group"
import {
  NumberField,
  type NumberFieldProps,
} from "@/components/ui/number-field"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

/**
 * @component Preset Number Field
 * @level composite
 * @summary A dropdown of usual numbers whose last item turns it into a
 *          number field for any other value; the field's X turns it back.
 * @use A setting with a few usual values and the odd custom one, such as a
 *      delay or a count.
 * @use A saved value that isn't a preset opens as the field, so it shows.
 * @avoid Only the presets are allowed: use select.
 * @avoid Any value is as likely as another: use number-field.
 * @related number-field, select
 */

interface NumberPreset {
  value: number
  label: string
}

const CUSTOM = "custom"

interface PresetNumberFieldProps
  extends Omit<NumberFieldProps, "trailing" | "autoFocus"> {
  presets: NumberPreset[]
  /** The last item, which turns the dropdown into a field for any other value, such as "Custom…". */
  customLabel: string
  /** The X's accessible name, such as "Back to delay presets". */
  backLabel?: string
}

function PresetNumberField({
  presets,
  customLabel,
  backLabel,
  ...field
}: Readonly<PresetNumberFieldProps>) {
  const isPreset = (value: number) =>
    presets.some((preset) => preset.value === value)
  const [custom, setCustom] = useState(() => !isPreset(field.value))
  const [justChose, setJustChose] = useState(false)
  const [presetBeforeCustom, setPresetBeforeCustom] = useState(() =>
    isPreset(field.value) ? field.value : nearestPreset(presets, field.value)
  )

  if (custom) {
    return (
      <NumberField
        {...field}
        autoFocus={justChose}
        trailing={
          <InputGroupButton
            size="icon-xs"
            aria-label={backLabel ?? `Back to ${field.label} presets`}
            title="Back to presets"
            className="text-muted-foreground"
            disabled={field.disabled}
            onClick={() => {
              setCustom(false)
              if (!isPreset(field.value)) {
                field.onValueChange(presetBeforeCustom)
              }
            }}
          >
            <XIcon />
          </InputGroupButton>
        }
      />
    )
  }

  return (
    <Select
      value={String(field.value)}
      disabled={field.disabled}
      onValueChange={(next) => {
        if (next !== CUSTOM) {
          field.onValueChange(Number(next))
          return
        }
        setPresetBeforeCustom(field.value)
        setJustChose(true)
        setCustom(true)
      }}
    >
      <SelectTrigger
        aria-label={field.label}
        title={field.label}
        glyph={field.glyph}
        className={cn("w-full min-w-0", field.className)}
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent checkPosition="start">
        {presets.map((preset) => (
          <SelectItem
            key={preset.value}
            value={String(preset.value)}
            className="tabular-nums"
          >
            {preset.label}
          </SelectItem>
        ))}
        <SelectItem value={CUSTOM}>{customLabel}</SelectItem>
      </SelectContent>
    </Select>
  )
}

function nearestPreset(presets: NumberPreset[], value: number): number {
  return presets.reduce(
    (best, preset) =>
      Math.abs(preset.value - value) < Math.abs(best - value)
        ? preset.value
        : best,
    presets[0].value
  )
}

export type { NumberPreset, PresetNumberFieldProps }
export { PresetNumberField }
