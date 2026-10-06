import { Button } from "@frontend/primitives/button"
import { Label } from "@frontend/primitives/label"
import { Switch } from "@frontend/primitives/switch"
import { Textarea } from "@frontend/primitives/textarea"
import { cn } from "@frontend/utilities"
import {
  ArrowDownIcon,
  ArrowUpIcon,
  CopyIcon,
  EyeIcon,
  EyeOffIcon,
  PlusIcon,
  Trash2Icon,
} from "lucide-react"
import { useEffect, useState } from "react"
import { ColorControl, NumberControl } from "./controls"
import {
  type Layer,
  layerToCss,
  newId,
  parseShadow,
  shadowToCss,
} from "./lab-state"

export function ShadowEditor({
  layers,
  intensity,
  onChange,
}: {
  layers: Layer[]
  intensity: number
  onChange: (layers: Layer[]) => void
}) {
  const update = (id: string, patch: Partial<Layer>) =>
    onChange(
      layers.map((layer) => (layer.id === id ? { ...layer, ...patch } : layer))
    )
  const move = (index: number, delta: number) => {
    const next = [...layers]
    const [item] = next.splice(index, 1)
    next.splice(index + delta, 0, item)
    onChange(next)
  }

  return (
    <div className="flex flex-col gap-3">
      {layers.length === 0 ? (
        <p className="rounded-md border border-dashed p-3 text-center text-muted-foreground text-xs">
          No layers. This elevation renders without a shadow.
        </p>
      ) : null}
      {layers.map((layer, index) => (
        <div
          className={cn(
            "flex flex-col gap-2 rounded-md border bg-card p-2.5",
            !layer.enabled && "opacity-60"
          )}
          key={layer.id}
        >
          <div className="flex items-center gap-1">
            <span
              aria-hidden
              className="mr-1 size-4 shrink-0 rounded-sm border bg-background"
              style={{ boxShadow: layerToCss(layer, intensity) }}
            />
            <span className="font-medium text-xs">Layer {index + 1}</span>
            <Switch
              aria-label={`Layer ${index + 1} inset`}
              checked={layer.inset}
              className="ml-2"
              onCheckedChange={(inset) => update(layer.id, { inset })}
              size="sm"
            />
            <span className="text-muted-foreground text-xs">Inset</span>
            <div className="ml-auto flex items-center">
              <Button
                aria-label={layer.enabled ? "Hide layer" : "Show layer"}
                onClick={() => update(layer.id, { enabled: !layer.enabled })}
                size="icon-xs"
                variant="ghost"
              >
                {layer.enabled ? <EyeIcon /> : <EyeOffIcon />}
              </Button>
              <Button
                aria-label="Move layer up"
                disabled={index === 0}
                onClick={() => move(index, -1)}
                size="icon-xs"
                variant="ghost"
              >
                <ArrowUpIcon />
              </Button>
              <Button
                aria-label="Move layer down"
                disabled={index === layers.length - 1}
                onClick={() => move(index, 1)}
                size="icon-xs"
                variant="ghost"
              >
                <ArrowDownIcon />
              </Button>
              <Button
                aria-label="Duplicate layer"
                onClick={() => {
                  const next = [...layers]
                  next.splice(index + 1, 0, { ...layer, id: newId() })
                  onChange(next)
                }}
                size="icon-xs"
                variant="ghost"
              >
                <CopyIcon />
              </Button>
              <Button
                aria-label="Delete layer"
                onClick={() =>
                  onChange(layers.filter((l) => l.id !== layer.id))
                }
                size="icon-xs"
                variant="ghost"
              >
                <Trash2Icon />
              </Button>
            </div>
          </div>
          <NumberControl
            label="X"
            max={60}
            min={-60}
            onChange={(x) => update(layer.id, { x })}
            value={layer.x}
          />
          <NumberControl
            label="Y"
            max={120}
            min={-60}
            onChange={(y) => update(layer.id, { y })}
            value={layer.y}
          />
          <NumberControl
            label="Blur"
            max={200}
            min={0}
            onChange={(blur) => update(layer.id, { blur: Math.max(0, blur) })}
            value={layer.blur}
          />
          <NumberControl
            label="Spread"
            max={60}
            min={-100}
            onChange={(spread) => update(layer.id, { spread })}
            value={layer.spread}
          />
          <NumberControl
            label="Opacity"
            max={1}
            min={0}
            onChange={(alpha) =>
              update(layer.id, { alpha: Math.min(1, Math.max(0, alpha)) })
            }
            step={0.01}
            unit=""
            value={layer.alpha}
          />
          <div className="grid grid-cols-[3.5rem_1fr] items-center gap-2">
            <Label className="text-muted-foreground text-xs">Color</Label>
            <ColorControl
              onChange={(value) => {
                if (/^#[\da-f]{6}$/i.test(value))
                  update(layer.id, { color: value })
              }}
              value={layer.color}
            />
          </div>
        </div>
      ))}
      <Button
        className="self-start"
        onClick={() =>
          onChange([
            ...layers,
            {
              id: newId(),
              x: 0,
              y: 4,
              blur: 12,
              spread: 0,
              color: "#000000",
              alpha: 0.08,
              inset: false,
              enabled: true,
            },
          ])
        }
        size="sm"
        variant="outline"
      >
        <PlusIcon data-icon="inline-start" />
        Add layer
      </Button>
      <RawShadowField
        intensity={intensity}
        layers={layers}
        onChange={onChange}
      />
    </div>
  )
}

/** Edit the whole stack as CSS, e.g. to paste a shadow from another product. */
function RawShadowField({
  layers,
  intensity,
  onChange,
}: {
  layers: Layer[]
  intensity: number
  onChange: (layers: Layer[]) => void
}) {
  const css = shadowToCss(layers, intensity)
  const [draft, setDraft] = useState(css)
  const [focused, setFocused] = useState(false)

  useEffect(() => {
    if (!focused) setDraft(css)
  }, [css, focused])

  return (
    <div className="flex flex-col gap-1.5">
      <Label className="text-muted-foreground text-xs">
        CSS (paste any box-shadow, applied on blur)
      </Label>
      <Textarea
        className="min-h-20 font-mono text-[11px]"
        onBlur={() => {
          setFocused(false)
          if (draft.trim() === css) return
          // The field shows alphas after intensity, so undo it before storing.
          onChange(
            parseShadow(draft.trim()).map((layer) => ({
              ...layer,
              alpha:
                intensity > 0
                  ? Math.min(1, layer.alpha / intensity)
                  : layer.alpha,
            }))
          )
        }}
        onChange={(event) => setDraft(event.target.value)}
        onFocus={() => setFocused(true)}
        spellCheck={false}
        value={draft}
      />
    </div>
  )
}
