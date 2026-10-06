import { Input } from "@frontend/primitives/input"
import { Label } from "@frontend/primitives/label"
import { Slider } from "@frontend/primitives/slider"
import { cn } from "@frontend/utilities"
import { useId } from "react"
import { resolveColor } from "./lab-state"

export function NumberControl({
  label,
  value,
  min,
  max,
  step = 1,
  unit = "px",
  onChange,
}: {
  label: string
  value: number
  min: number
  max: number
  step?: number
  unit?: string
  onChange: (value: number) => void
}) {
  const id = useId()
  return (
    <div className="grid grid-cols-[3.5rem_1fr_5rem] items-center gap-2">
      <Label className="text-muted-foreground text-xs" htmlFor={id}>
        {label}
      </Label>
      <Slider
        max={max}
        min={min}
        onValueChange={([next]) => onChange(next)}
        step={step}
        value={[Math.min(max, Math.max(min, value))]}
      />
      <div className="relative">
        <Input
          className={cn(
            "h-7 text-right font-mono tabular-nums",
            unit && "pr-6"
          )}
          id={id}
          onChange={(event) => {
            const next = Number(event.target.value)
            if (!Number.isNaN(next)) onChange(next)
          }}
          step={step}
          type="number"
          value={value}
        />
        {unit ? (
          <span className="pointer-events-none absolute top-1/2 right-2 -translate-y-1/2 text-[10px] text-muted-foreground">
            {unit}
          </span>
        ) : null}
      </div>
    </div>
  )
}

/** Native color picker plus a free-text field that accepts any CSS color. */
export function ColorControl({
  label,
  value,
  onChange,
  className,
}: {
  label?: string
  value: string
  onChange: (value: string) => void
  className?: string
}) {
  const id = useId()
  const swatch = resolveColor(value).hex
  return (
    <div
      className={cn(
        label ? "grid grid-cols-[5.5rem_1fr] items-center gap-2" : "",
        className
      )}
    >
      {label ? (
        <Label className="text-muted-foreground text-xs" htmlFor={id}>
          {label}
        </Label>
      ) : null}
      <div className="flex min-w-0 items-center gap-1.5">
        <label
          className="relative size-7 shrink-0 cursor-pointer overflow-hidden rounded-sm border shadow-control"
          style={{ background: value }}
        >
          <span className="sr-only">Pick {label ?? "color"}</span>
          <input
            className="absolute inset-0 cursor-pointer opacity-0"
            onChange={(event) => onChange(event.target.value)}
            type="color"
            value={swatch}
          />
        </label>
        <Input
          className="h-7 min-w-0 font-mono text-[11px]"
          id={id}
          onChange={(event) => onChange(event.target.value)}
          spellCheck={false}
          value={value}
        />
      </div>
    </div>
  )
}
