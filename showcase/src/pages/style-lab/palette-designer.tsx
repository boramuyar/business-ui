import { Badge } from "@frontend/primitives/badge"
import { Button } from "@frontend/primitives/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@frontend/primitives/collapsible"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@frontend/primitives/dialog"
import { Input } from "@frontend/primitives/input"
import { Label } from "@frontend/primitives/label"
import { Slider } from "@frontend/primitives/slider"
import { Switch } from "@frontend/primitives/switch"
import { Textarea } from "@frontend/primitives/textarea"
import { cn } from "@frontend/utilities"
import {
  ChevronRightIcon,
  CopyIcon,
  ImportIcon,
  SaveIcon,
  Trash2Icon,
  WandSparklesIcon,
  XIcon,
} from "lucide-react"
import { type ReactNode, useEffect, useId, useState } from "react"
import {
  contrast,
  formatOklch,
  hexToOklch,
  inGamut,
  type Oklch,
  oklchToHex,
  parseOklch,
  toRgb,
} from "./color"
import { ColorControl } from "./controls"
import type { Mode } from "./lab-state"
import {
  buildColors,
  chartRamp,
  chartSpread,
  cloneSpec,
  EDITABLE_KEYS,
  generatedColors,
  type Intent,
  type Palette,
  type PaletteSpec,
  PRESET_PALETTES,
  STATUS_INTENTS,
} from "./palettes"

/* ------------------------------------------------------------ saved list */

const SAVED_KEY = "business-ui:style-lab:palettes:v1"

export function loadSavedPalettes(): Palette[] {
  try {
    const raw = window.localStorage.getItem(SAVED_KEY)
    if (raw) return JSON.parse(raw) as Palette[]
  } catch {
    // Storage can be unavailable; saved palettes just won't persist.
  }
  return []
}

function storeSavedPalettes(palettes: Palette[]) {
  try {
    window.localStorage.setItem(SAVED_KEY, JSON.stringify(palettes))
  } catch {
    // Ignore: saving still works for this visit.
  }
}

function toOklch(css: string): Oklch {
  const parsed = parseOklch(css)
  if (parsed) return parsed
  const [r, g, b] = toRgb(css)
  return hexToOklch(
    `#${[r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("")}`
  )
}

/** Accepts `{ spec }` or a bare spec, fills anything missing from Violet. */
function parsePaletteJson(text: string): PaletteSpec | null {
  try {
    const raw = JSON.parse(text)
    const source =
      raw && typeof raw === "object" && "spec" in raw ? raw.spec : raw
    if (!source || typeof source !== "object" || !("primary" in source))
      return null
    const base = cloneSpec(PRESET_PALETTES[0].spec)
    return {
      ...base,
      ...source,
      overrides: { light: {}, dark: {}, ...source.overrides },
    }
  } catch {
    return null
  }
}

/* -------------------------------------------------------------- controls */

function Group({
  title,
  action,
  children,
}: {
  title: string
  action?: ReactNode
  children: ReactNode
}) {
  return (
    <div className="flex flex-col gap-2.5 rounded-md border p-2.5">
      <div className="flex min-h-6 items-center justify-between gap-2">
        <Label className="text-xs">{title}</Label>
        {action}
      </div>
      {children}
    </div>
  )
}

function SliderRow({
  label,
  value,
  min,
  max,
  step,
  digits,
  track,
  onChange,
}: {
  label: string
  value: number
  min: number
  max: number
  step: number
  digits: number
  track?: string
  onChange: (value: number) => void
}) {
  return (
    <div className="grid grid-cols-[1rem_1fr_3rem] items-center gap-2">
      <span className="font-mono text-[10px] text-muted-foreground">
        {label}
      </span>
      <div className="relative">
        {track ? (
          <div
            className="pointer-events-none absolute inset-x-0 top-1/2 h-1.5 -translate-y-1/2 rounded-full"
            style={{ background: track }}
          />
        ) : null}
        <Slider
          className={
            track
              ? "[&_[data-slot=slider-track]]:bg-transparent [&_[data-slot=slider-range]]:bg-transparent"
              : undefined
          }
          max={max}
          min={min}
          onValueChange={([next]) => onChange(next)}
          step={step}
          value={[Math.min(max, Math.max(min, value))]}
        />
      </div>
      <span className="text-right font-mono text-[10px] tabular-nums">
        {value.toFixed(digits)}
      </span>
    </div>
  )
}

function gradient(stops: Oklch[]) {
  return `linear-gradient(to right, ${stops.map(oklchToHex).join(", ")})`
}

/** Swatch, text field and, on demand, OKLCH lightness/chroma/hue sliders. */
function OklchControl({
  label,
  value,
  onChange,
  defaultOpen = false,
  hint,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  defaultOpen?: boolean
  hint?: ReactNode
}) {
  const [open, setOpen] = useState(defaultOpen)
  const color = toOklch(value)
  const set = (patch: Partial<Oklch>) =>
    onChange(formatOklch({ ...color, ...patch }))
  const steps = (fn: (t: number) => Oklch) =>
    gradient([0, 0.25, 0.5, 0.75, 1].map(fn))
  return (
    <Collapsible onOpenChange={setOpen} open={open}>
      <div className="grid grid-cols-[5.5rem_1fr_auto] items-center gap-2">
        <Label className="truncate text-muted-foreground text-xs">
          {label}
        </Label>
        <ColorControl onChange={onChange} value={value} />
        <CollapsibleTrigger asChild>
          <Button
            aria-label={`${open ? "Hide" : "Show"} ${label} sliders`}
            size="icon-xs"
            variant="ghost"
          >
            <ChevronRightIcon
              className={cn("transition-transform", open && "rotate-90")}
            />
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="flex flex-col gap-1.5 pt-2 pl-[6rem]">
        <SliderRow
          digits={3}
          label="L"
          max={1}
          min={0}
          onChange={(l) => set({ l })}
          step={0.005}
          track={steps((t) => ({ ...color, l: t }))}
          value={color.l}
        />
        <SliderRow
          digits={3}
          label="C"
          max={0.37}
          min={0}
          onChange={(c) => set({ c })}
          step={0.002}
          track={steps((t) => ({ ...color, c: t * 0.37 }))}
          value={color.c}
        />
        <SliderRow
          digits={0}
          label="H"
          max={360}
          min={0}
          onChange={(h) => set({ h })}
          step={1}
          track={gradient(
            [0, 60, 120, 180, 240, 300, 360].map((h) => ({
              l: color.l,
              c: Math.max(color.c, 0.08),
              h,
            }))
          )}
          value={color.h}
        />
        {inGamut(color) ? null : (
          <p className="text-[11px] text-warning-strong">
            Outside sRGB: most screens will clip this color.
          </p>
        )}
      </CollapsibleContent>
      {hint ? <div className="pt-1 pl-[6rem]">{hint}</div> : null}
    </Collapsible>
  )
}

/* -------------------------------------------------------------- contrast */

type Check = { label: string; fg: string; bg: string; large?: boolean }

const CHECKS: Check[] = [
  { label: "Text on background", fg: "foreground", bg: "background" },
  { label: "Muted text", fg: "muted-foreground", bg: "background" },
  { label: "Muted text on muted", fg: "muted-foreground", bg: "muted" },
  { label: "Text on card", fg: "card-foreground", bg: "card" },
  { label: "Text on primary", fg: "primary-foreground", bg: "primary" },
  { label: "Link", fg: "primary-emphasis", bg: "background" },
  {
    label: "Text on sidebar primary",
    fg: "sidebar-primary-foreground",
    bg: "sidebar-primary",
  },
  { label: "Destructive button", fg: "#ffffff", bg: "destructive" },
  { label: "Destructive badge", fg: "destructive", bg: "destructive-subtle" },
  ...["destructive", "success", "warning", "info"].map((intent) => ({
    label: `${intent[0].toUpperCase()}${intent.slice(1)} alert`,
    fg: `${intent}-strong`,
    bg: `${intent}-subtle`,
  })),
]

/** Resolves a token to sRGB as the page paints it, color-mix included. */
function resolveToken(probe: HTMLElement, token: string) {
  probe.style.color = token.startsWith("#") ? token : `var(--${token})`
  return toRgb(getComputedStyle(probe).color)
}

function useContrast(deps: unknown[]) {
  const [results, setResults] = useState<(Check & { ratio: number })[]>([])
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const probe = document.createElement("span")
      probe.style.display = "none"
      document.body.append(probe)
      setResults(
        CHECKS.map((check) => ({
          ...check,
          ratio: contrast(
            resolveToken(probe, check.fg),
            resolveToken(probe, check.bg)
          ),
        }))
      )
      probe.remove()
    })
    return () => cancelAnimationFrame(frame)
  }, deps)
  return results
}

function ContrastBadge({ ratio }: { ratio: number }) {
  const variant =
    ratio >= 4.5 ? "success" : ratio >= 3 ? "warning" : "destructive"
  return (
    <Badge size="sm" variant={variant}>
      {ratio.toFixed(1)}
      {ratio >= 4.5 ? " AA" : ratio >= 3 ? " large" : " fail"}
    </Badge>
  )
}

/** Picks whichever of near-white or near-black reads better on `bg`. */
function autoForeground(bg: string, hue: number) {
  const light = formatOklch({ l: 0.985, c: 0.012, h: hue })
  const dark = formatOklch({ l: 0.2, c: 0.03, h: hue })
  const base = toRgb(bg)
  return contrast(toRgb(light), base) >= contrast(toRgb(dark), base)
    ? light
    : dark
}

/* -------------------------------------------------------------- designer */

export function PaletteDesigner({
  mode,
  name,
  spec,
  onChange,
}: {
  mode: Mode
  name: string
  spec: PaletteSpec
  onChange: (next: { name: string; spec: PaletteSpec }) => void
}) {
  const [saved, setSaved] = useState<Palette[]>(loadSavedPalettes)
  const other: Mode = mode === "light" ? "dark" : "light"
  const checks = useContrast([spec, mode])
  const library = [...PRESET_PALETTES, ...saved]
  const source = library.find((p) => p.name === name)
  const modified =
    !source || JSON.stringify(source.spec) !== JSON.stringify(spec)
  const isSaved = saved.some((p) => p.name === name)

  const update = (patch: Partial<PaletteSpec>) =>
    onChange({ name, spec: { ...spec, ...patch } })
  const setIntent = (key: keyof PaletteSpec, value: string) =>
    update({ [key]: { ...(spec[key] as Intent), [mode]: value } })
  const copyIntentToOther = (keys: (keyof PaletteSpec)[]) =>
    update(
      Object.fromEntries(
        keys.map((key) => [
          key,
          { ...(spec[key] as Intent), [other]: (spec[key] as Intent)[mode] },
        ])
      )
    )

  const persist = (next: Palette[]) => {
    setSaved(next)
    storeSavedPalettes(next)
  }
  const save = (paletteName: string) => {
    const entry: Palette = {
      name: paletteName,
      description: "Saved in this browser.",
      spec: cloneSpec(spec),
      custom: true,
    }
    persist([...saved.filter((p) => p.name !== paletteName), entry])
    onChange({ name: paletteName, spec })
  }

  const primary = toOklch(spec.primary[mode])
  const sidebarSame =
    spec.sidebarPrimary.light === spec.primary.light &&
    spec.sidebarPrimary.dark === spec.primary.dark
  const built = buildColors(spec, mode)
  const generated = generatedColors(spec, mode)
  const overrides = spec.overrides[mode]
  const failing = checks.filter((c) => c.ratio < 4.5).length

  return (
    <div className="flex flex-col gap-4">
      <Group
        action={
          <div className="flex items-center gap-1">
            <ImportDialog
              onImport={(imported) =>
                onChange({ name: "Imported", spec: imported })
              }
            />
            <SaveDialog
              defaultName={isSaved ? name : `${name} copy`}
              onSave={save}
            />
          </div>
        }
        title="Palettes"
      >
        <div className="grid grid-cols-2 gap-1.5">
          {library.map((p) => (
            <PaletteCard
              active={p.name === name}
              key={`${p.custom ? "saved" : "preset"}-${p.name}`}
              mode={mode}
              onDelete={
                p.custom
                  ? () => persist(saved.filter((s) => s.name !== p.name))
                  : undefined
              }
              onSelect={() =>
                onChange({ name: p.name, spec: cloneSpec(p.spec) })
              }
              palette={p}
            />
          ))}
        </div>
        <p className="text-[11px] text-muted-foreground">
          {modified ? (
            <>
              Editing a copy of <strong>{name}</strong>. Save it to keep it in
              this browser, or export it.{" "}
              {source ? (
                <button
                  className="underline underline-offset-2"
                  onClick={() =>
                    onChange({ name, spec: cloneSpec(source.spec) })
                  }
                  type="button"
                >
                  Revert
                </button>
              ) : null}
            </>
          ) : (
            (source?.description ?? "")
          )}
        </p>
      </Group>

      <Group
        action={
          <Button
            onClick={() =>
              copyIntentToOther([
                "primary",
                "primaryForeground",
                "sidebarPrimary",
              ])
            }
            size="xs"
            variant="ghost"
          >
            <CopyIcon data-icon="inline-start" />
            Copy to {other}
          </Button>
        }
        title={`Brand, ${mode} mode`}
      >
        <OklchControl
          defaultOpen
          label="Primary"
          onChange={(value) => {
            if (sidebarSame) {
              update({
                primary: { ...spec.primary, [mode]: value },
                sidebarPrimary: { ...spec.sidebarPrimary, [mode]: value },
              })
            } else setIntent("primary", value)
          }}
          value={spec.primary[mode]}
        />
        <div className="grid grid-cols-[5.5rem_1fr_auto] items-center gap-2">
          <Label className="text-muted-foreground text-xs">On primary</Label>
          <ColorControl
            onChange={(value) => setIntent("primaryForeground", value)}
            value={spec.primaryForeground[mode]}
          />
          <Button
            aria-label="Pick the most readable text color"
            onClick={() =>
              setIntent(
                "primaryForeground",
                autoForeground(spec.primary[mode], primary.h)
              )
            }
            size="icon-xs"
            tooltip="Pick the most readable text color"
            variant="ghost"
          >
            <WandSparklesIcon />
          </Button>
        </div>
        <Label className="flex items-center gap-2 text-muted-foreground text-xs">
          <Switch
            checked={sidebarSame}
            onCheckedChange={(checked) =>
              update({
                sidebarPrimary: checked
                  ? { ...spec.primary }
                  : { ...spec.sidebarPrimary },
              })
            }
            size="sm"
          />
          Sidebar uses the primary color
        </Label>
        {sidebarSame ? null : (
          <OklchControl
            label="Sidebar"
            onChange={(value) => setIntent("sidebarPrimary", value)}
            value={spec.sidebarPrimary[mode]}
          />
        )}
      </Group>

      <Group title="Neutrals, both modes">
        <SliderRow
          digits={0}
          label="H"
          max={360}
          min={0}
          onChange={(hue) => update({ neutral: { ...spec.neutral, hue } })}
          step={1}
          track={gradient(
            [0, 60, 120, 180, 240, 300, 360].map((h) => ({
              l: 0.75,
              c: 0.06,
              h,
            }))
          )}
          value={spec.neutral.hue}
        />
        <SliderRow
          digits={1}
          label="T"
          max={5}
          min={0}
          onChange={(tint) => update({ neutral: { ...spec.neutral, tint } })}
          step={0.1}
          value={spec.neutral.tint}
        />
        <p className="text-[11px] text-muted-foreground">
          H is the hue of every gray. T is how much of it shows: 0 is pure gray,
          1 is zinc, 3 is slate-like.
        </p>
        <div className="flex h-6 overflow-hidden rounded-sm border">
          {[
            "background",
            "sidebar",
            "muted",
            "border",
            "ring",
            "muted-foreground",
            "secondary-foreground",
            "foreground",
          ].map((key) => (
            <span
              className="flex-1"
              key={key}
              style={{ background: built[key] }}
              title={key}
            />
          ))}
        </div>
      </Group>

      <Group
        action={
          <Button
            onClick={() => copyIntentToOther([...STATUS_INTENTS])}
            size="xs"
            variant="ghost"
          >
            <CopyIcon data-icon="inline-start" />
            Copy to {other}
          </Button>
        }
        title={`Status, ${mode} mode`}
      >
        {STATUS_INTENTS.map((intent) => (
          <OklchControl
            key={intent}
            label={intent[0].toUpperCase() + intent.slice(1)}
            onChange={(value) => setIntent(intent, value)}
            value={spec[intent][mode]}
          />
        ))}
        <p className="text-[11px] text-muted-foreground">
          Subtle, border, strong and emphasis shades are mixed from these
          automatically.
        </p>
      </Group>

      <Group
        action={
          <div className="flex gap-1">
            <Button
              onClick={() =>
                update({
                  chart: chartRamp(primary.h, Math.max(primary.c, 0.08)),
                })
              }
              size="xs"
              variant="ghost"
            >
              Ramp
            </Button>
            <Button
              onClick={() =>
                update({
                  chart: chartSpread(primary.h, Math.max(primary.c, 0.12)),
                })
              }
              size="xs"
              variant="ghost"
            >
              Spread
            </Button>
          </div>
        }
        title="Charts, both modes"
      >
        {spec.chart.map((value, index) => (
          <ColorControl
            key={index}
            label={`chart-${index + 1}`}
            onChange={(next) =>
              update({
                chart: spec.chart.map((c, i) => (i === index ? next : c)),
              })
            }
            value={value}
          />
        ))}
        <p className="text-[11px] text-muted-foreground">
          Ramp builds five shades of the primary hue. Spread builds five hues
          around the color wheel, starting from primary.
        </p>
      </Group>

      <Group
        action={
          failing ? (
            <Badge size="sm" variant="warning">
              {failing} below AA
            </Badge>
          ) : (
            <Badge size="sm" variant="success">
              All AA
            </Badge>
          )
        }
        title={`Contrast, ${mode} mode`}
      >
        <ul className="flex flex-col gap-1">
          {checks.map((check) => (
            <li
              className="flex items-center justify-between gap-2 text-xs"
              key={check.label}
            >
              <span className="flex min-w-0 items-center gap-2">
                <span
                  className="flex size-5 shrink-0 items-center justify-center rounded-sm border font-semibold text-[10px]"
                  style={{
                    background: `var(--${check.bg})`,
                    color: check.fg.startsWith("#")
                      ? check.fg
                      : `var(--${check.fg})`,
                  }}
                >
                  Aa
                </span>
                <span className="truncate">{check.label}</span>
              </span>
              <ContrastBadge ratio={check.ratio} />
            </li>
          ))}
        </ul>
        <p className="text-[11px] text-muted-foreground">
          WCAG 2 ratios. AA needs 4.5 for body text, 3 for large text and icons.
        </p>
      </Group>

      <Collapsible>
        <Group
          action={
            <CollapsibleTrigger asChild>
              <Button size="xs" variant="ghost">
                Show
                <ChevronRightIcon data-icon="inline-end" />
              </Button>
            </CollapsibleTrigger>
          }
          title={`Every token, ${mode} mode`}
        >
          <CollapsibleContent className="flex flex-col gap-2">
            <p className="text-[11px] text-muted-foreground">
              Pin any single token by hand. Pinned tokens ignore the controls
              above until you clear them.
            </p>
            {EDITABLE_KEYS.map((key) => (
              <div className="flex items-center gap-1" key={key}>
                <ColorControl
                  className="flex-1"
                  label={key}
                  onChange={(value) =>
                    update({
                      overrides: {
                        ...spec.overrides,
                        [mode]: { ...overrides, [key]: value },
                      },
                    })
                  }
                  value={built[key] ?? ""}
                />
                {key in overrides ? (
                  <Button
                    aria-label={`Clear ${key}`}
                    onClick={() => {
                      const { [key]: _removed, ...rest } = overrides
                      update({
                        overrides: { ...spec.overrides, [mode]: rest },
                      })
                    }}
                    size="icon-xs"
                    tooltip={`Back to ${generated[key] ? "the generated" : "the shipped"} value`}
                    variant="ghost"
                  >
                    <XIcon />
                  </Button>
                ) : (
                  <span className="size-6" />
                )}
              </div>
            ))}
          </CollapsibleContent>
        </Group>
      </Collapsible>
    </div>
  )
}

function PaletteCard({
  palette,
  mode,
  active,
  onSelect,
  onDelete,
}: {
  palette: Palette
  mode: Mode
  active: boolean
  onSelect: () => void
  onDelete?: () => void
}) {
  const colors = buildColors(palette.spec, mode)
  return (
    <div className="group/card relative">
      <button
        aria-pressed={active}
        className={cn(
          "flex w-full flex-col gap-1.5 rounded-md border px-2 py-1.5 text-left text-xs transition-colors",
          active
            ? "border-primary bg-primary-subtle text-primary-emphasis"
            : "hover:bg-muted"
        )}
        onClick={onSelect}
        type="button"
      >
        <span className="truncate pr-5 font-medium">{palette.name}</span>
        <span
          className="flex h-5 overflow-hidden rounded-sm border"
          style={{ background: colors.background }}
        >
          {[
            "primary",
            "secondary",
            "success",
            "warning",
            "destructive",
            "info",
          ].map((key) => (
            <span
              className="flex-1"
              key={key}
              style={{ background: colors[key] }}
            />
          ))}
        </span>
      </button>
      {onDelete ? (
        <Button
          aria-label={`Delete ${palette.name}`}
          className="absolute top-1 right-1 opacity-0 group-hover/card:opacity-100 focus-visible:opacity-100"
          onClick={onDelete}
          size="icon-xs"
          variant="ghost"
        >
          <Trash2Icon />
        </Button>
      ) : null}
    </div>
  )
}

function SaveDialog({
  defaultName,
  onSave,
}: {
  defaultName: string
  onSave: (name: string) => void
}) {
  const id = useId()
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState(defaultName)
  const taken = PRESET_PALETTES.some((p) => p.name === value.trim())
  return (
    <Dialog
      onOpenChange={(next) => {
        setOpen(next)
        if (next) setValue(defaultName)
      }}
      open={open}
    >
      <DialogTrigger asChild>
        <Button size="xs" variant="outline">
          <SaveIcon data-icon="inline-start" />
          Save
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Save palette</DialogTitle>
          <DialogDescription>
            Saved palettes live in this browser. Use Export to share one or to
            put it in style/colors.json.
          </DialogDescription>
        </DialogHeader>
        <form
          className="flex flex-col gap-2"
          onSubmit={(event) => {
            event.preventDefault()
            if (!value.trim() || taken) return
            onSave(value.trim())
            setOpen(false)
          }}
        >
          <Label htmlFor={id}>Name</Label>
          <Input
            autoFocus
            id={id}
            onChange={(event) => setValue(event.target.value)}
            value={value}
          />
          {taken ? (
            <p className="text-destructive text-xs">
              That name belongs to a preset. Pick another.
            </p>
          ) : null}
          <DialogFooter>
            <Button disabled={!value.trim() || taken} type="submit">
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

function ImportDialog({ onImport }: { onImport: (spec: PaletteSpec) => void }) {
  const [open, setOpen] = useState(false)
  const [text, setText] = useState("")
  const parsed = text.trim() ? parsePaletteJson(text) : null
  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
        <Button size="xs" variant="ghost">
          <ImportIcon data-icon="inline-start" />
          Import
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Import palette</DialogTitle>
          <DialogDescription>
            Paste a palette.json from the Export dialog.
          </DialogDescription>
        </DialogHeader>
        <Textarea
          className="min-h-48 font-mono text-[11px]"
          onChange={(event) => setText(event.target.value)}
          placeholder='{ "neutral": { "hue": 286, "tint": 1 }, "primary": { ... } }'
          spellCheck={false}
          value={text}
        />
        {text.trim() && !parsed ? (
          <p className="text-destructive text-xs">
            That doesn't look like a palette.json.
          </p>
        ) : null}
        <DialogFooter>
          <Button
            disabled={!parsed}
            onClick={() => {
              if (!parsed) return
              onImport(parsed)
              setText("")
              setOpen(false)
            }}
          >
            Import
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
