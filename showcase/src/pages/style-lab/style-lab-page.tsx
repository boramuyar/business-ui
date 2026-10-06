import { Badge } from "@frontend/primitives/badge"
import { Button } from "@frontend/primitives/button"
import { ButtonGroup } from "@frontend/primitives/button-group"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@frontend/primitives/dialog"
import { Label } from "@frontend/primitives/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@frontend/primitives/select"
import { Switch } from "@frontend/primitives/switch"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@frontend/primitives/tabs"
import { ToggleGroup, ToggleGroupItem } from "@frontend/primitives/toggle-group"
import { cn } from "@frontend/utilities"
import { DownloadIcon, MoonIcon, RotateCcwIcon, SunIcon } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useMemo, useState } from "react"
import { CodeBlock } from "../../components/code-block"
import { PageHeader } from "../../components/page-header"
import {
  ComponentPreview,
  PREVIEW_SECTIONS,
  type PreviewSectionId,
} from "./component-preview"
import { ColorControl, NumberControl } from "./controls"
import {
  COLOR_KEYS,
  createDefaultState,
  defaultColorsFor,
  ELEVATION_INFO,
  ELEVATIONS,
  type Elevation,
  exportColorsJson,
  exportCss,
  exportTokensJson,
  type LabState,
  layerToCss,
  type Mode,
  PRESETS,
  parseShadow,
  shadowToCss,
} from "./lab-state"
import { ShadowEditor } from "./shadow-editor"

const STORAGE_KEY = "business-ui:style-lab:v1"

function loadState(): LabState {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw) as LabState
  } catch {
    // Storage can be unavailable (private mode); fall back to the shipped style.
  }
  return createDefaultState()
}

function saveState(state: LabState) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // Ignore: the lab still works, it just won't remember edits.
  }
}

/** Every custom property the lab writes onto <html>, so they can be cleared. */
const OVERRIDDEN_VARS = [
  "--radius",
  ...COLOR_KEYS.map((key) => `--${key}`),
  ...ELEVATIONS.map((e) => `--elevation-${e}`),
]

function useApplyOverrides(state: LabState, mode: Mode, enabled: boolean) {
  useEffect(() => {
    const root = document.documentElement.style
    if (enabled) {
      root.setProperty("--radius", `${state.radius}px`)
      for (const key of COLOR_KEYS) {
        const value = state[mode].colors[key]
        if (value) root.setProperty(`--${key}`, value)
        else root.removeProperty(`--${key}`)
      }
      for (const e of ELEVATIONS) {
        root.setProperty(
          `--elevation-${e}`,
          shadowToCss(state[mode].elevations[e], state[mode].intensity)
        )
      }
    } else {
      for (const name of OVERRIDDEN_VARS) root.removeProperty(name)
    }
  }, [state, mode, enabled])

  useEffect(
    () => () => {
      for (const name of OVERRIDDEN_VARS)
        document.documentElement.style.removeProperty(name)
    },
    []
  )
}

const STAGE_BACKGROUNDS = [
  { value: "background", label: "Background", css: "var(--background)" },
  { value: "muted", label: "Muted", css: "var(--muted)" },
  { value: "sidebar", label: "Sidebar", css: "var(--sidebar)" },
] as const

export function StyleLabPage() {
  const { resolvedTheme, setTheme } = useTheme()
  const mode: Mode = resolvedTheme === "dark" ? "dark" : "light"
  const [state, setState] = useState<LabState>(loadState)
  const [elevation, setElevation] = useState<Elevation>("overlay")
  const [presetName, setPresetName] = useState(PRESETS[1].name)
  const [showShipped, setShowShipped] = useState(false)
  const [stage, setStage] = useState<string>("background")
  const [sections, setSections] = useState<PreviewSectionId[]>(
    PREVIEW_SECTIONS.map((s) => s.id)
  )

  useEffect(() => saveState(state), [state])
  useApplyOverrides(state, mode, !showShipped)

  const modeState = state[mode]
  const preset = PRESETS.find((p) => p.name === presetName) ?? PRESETS[0]
  const stageCss =
    STAGE_BACKGROUNDS.find((b) => b.value === stage)?.css ?? "var(--background)"

  const updateMode = (patch: Partial<LabState[Mode]>) =>
    setState((prev) => ({ ...prev, [mode]: { ...prev[mode], ...patch } }))
  const setLayers = (
    e: Elevation,
    layers: LabState[Mode]["elevations"][Elevation]
  ) =>
    setState((prev) => ({
      ...prev,
      [mode]: {
        ...prev[mode],
        elevations: { ...prev[mode].elevations, [e]: layers },
      },
    }))

  const applyPreset = (targets: readonly Elevation[], bothModes: boolean) =>
    setState((prev) => {
      const next = { ...prev }
      for (const m of bothModes ? (["light", "dark"] as const) : [mode]) {
        const elevations = { ...prev[m].elevations }
        for (const e of targets) elevations[e] = parseShadow(preset[m][e])
        next[m] = { ...prev[m], elevations }
      }
      return next
    })

  return (
    <div className="flex flex-col">
      <PageHeader
        description="Tune the radius, colors and layered shadows, and see every component update live. Edits stay in this browser; export them to style/tokens.json when they look right."
        eyebrow="Tool"
        title="Style lab"
      />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[380px_minmax(0,1fr)]">
        {/* Editor */}
        <aside className="flex flex-col gap-4 xl:sticky xl:top-16 xl:max-h-[calc(100svh-5rem)] xl:self-start xl:overflow-y-auto xl:pr-2">
          <div className="flex items-center gap-2">
            <ButtonGroup>
              {(["light", "dark"] as const).map((m) => (
                <Button
                  aria-pressed={mode === m}
                  key={m}
                  onClick={() => setTheme(m)}
                  size="sm"
                  variant={mode === m ? "secondary" : "outline"}
                >
                  {m === "light" ? (
                    <SunIcon data-icon="inline-start" />
                  ) : (
                    <MoonIcon data-icon="inline-start" />
                  )}
                  {m === "light" ? "Light" : "Dark"}
                </Button>
              ))}
            </ButtonGroup>
            <ExportDialog state={state} />
            <Button
              aria-label="Reset everything to the shipped style"
              onClick={() => setState(createDefaultState())}
              size="icon"
              tooltip="Reset to shipped style"
              variant="ghost"
            >
              <RotateCcwIcon />
            </Button>
          </div>
          <Label className="flex items-center gap-2 text-xs">
            <Switch
              checked={showShipped}
              onCheckedChange={setShowShipped}
              size="sm"
            />
            Compare: show the shipped style instead
          </Label>

          <Tabs defaultValue="shadows">
            <TabsList>
              <TabsTrigger value="shadows">Shadows</TabsTrigger>
              <TabsTrigger value="shape">Radius & color</TabsTrigger>
            </TabsList>

            <TabsContent className="flex flex-col gap-4 pt-3" value="shadows">
              <div className="grid grid-cols-4 gap-1.5">
                {ELEVATIONS.map((e) => (
                  <button
                    className={cn(
                      "rounded-md border px-2 py-1.5 text-left text-xs transition-colors",
                      e === elevation
                        ? "border-primary bg-primary-subtle text-primary-emphasis"
                        : "hover:bg-muted"
                    )}
                    key={e}
                    onClick={() => setElevation(e)}
                    type="button"
                  >
                    <span className="block font-medium">
                      {ELEVATION_INFO[e].label}
                    </span>
                    <span className="block text-[10px] text-muted-foreground">
                      {modeState.elevations[e].filter((l) => l.enabled).length}{" "}
                      layers
                    </span>
                  </button>
                ))}
              </div>
              <p className="text-muted-foreground text-xs">
                <code className="font-mono">shadow-{elevation}</code>:{" "}
                {ELEVATION_INFO[elevation].usage}.
              </p>

              <div className="flex flex-col gap-2 rounded-md border p-2.5">
                <Label className="text-xs">Preset</Label>
                <Select onValueChange={setPresetName} value={presetName}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {PRESETS.map((p) => (
                      <SelectItem key={p.name} value={p.name}>
                        {p.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-[11px] text-muted-foreground">
                  {preset.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  <Button
                    onClick={() => applyPreset([elevation], false)}
                    size="xs"
                    variant="outline"
                  >
                    Apply to {ELEVATION_INFO[elevation].label.toLowerCase()}
                  </Button>
                  <Button
                    onClick={() => applyPreset(ELEVATIONS, false)}
                    size="xs"
                    variant="outline"
                  >
                    All levels, {mode}
                  </Button>
                  <Button
                    onClick={() => applyPreset(ELEVATIONS, true)}
                    size="xs"
                    variant="outline"
                  >
                    All levels, both modes
                  </Button>
                </div>
              </div>

              <div className="flex flex-col gap-2 rounded-md border p-2.5">
                <NumberControl
                  label="Intensity"
                  max={3}
                  min={0}
                  onChange={(intensity) =>
                    updateMode({ intensity: Math.max(0, intensity) })
                  }
                  step={0.05}
                  unit="×"
                  value={modeState.intensity}
                />
                <p className="text-[11px] text-muted-foreground">
                  Multiplies every layer's opacity in {mode} mode.
                </p>
                <div className="grid grid-cols-[3.5rem_1fr] items-center gap-2">
                  <Label className="text-muted-foreground text-xs">Tint</Label>
                  <ColorControl
                    onChange={(value) => {
                      if (!/^#[\da-f]{6}$/i.test(value)) return
                      setLayers(
                        elevation,
                        modeState.elevations[elevation].map((l) => ({
                          ...l,
                          color: value,
                        }))
                      )
                    }}
                    value={
                      modeState.elevations[elevation][0]?.color ?? "#000000"
                    }
                  />
                </div>
                <p className="text-[11px] text-muted-foreground">
                  Sets the color of every layer in this level at once.
                </p>
              </div>

              <ShadowEditor
                intensity={modeState.intensity}
                layers={modeState.elevations[elevation]}
                onChange={(layers) => setLayers(elevation, layers)}
              />
            </TabsContent>

            <TabsContent className="flex flex-col gap-4 pt-3" value="shape">
              <div className="flex flex-col gap-2 rounded-md border p-2.5">
                <NumberControl
                  label="Radius"
                  max={24}
                  min={0}
                  onChange={(radius) =>
                    setState((prev) => ({
                      ...prev,
                      radius: Math.max(0, radius),
                    }))
                  }
                  step={0.5}
                  value={state.radius}
                />
                <p className="text-[11px] text-muted-foreground">
                  rounded-md = {state.radius}px, rounded-sm ={" "}
                  {Math.max(0, state.radius - 2)}px, rounded-lg ={" "}
                  {state.radius + 2}px. Shared by both modes.
                </p>
              </div>
              <div className="flex flex-col gap-2 rounded-md border p-2.5">
                <div className="flex items-center justify-between">
                  <Label className="text-xs">Colors, {mode} mode</Label>
                  <Button
                    onClick={() =>
                      updateMode({ colors: defaultColorsFor(mode) })
                    }
                    size="xs"
                    variant="ghost"
                  >
                    Reset colors
                  </Button>
                </div>
                {COLOR_KEYS.map((key) => (
                  <ColorControl
                    key={key}
                    label={key}
                    onChange={(value) =>
                      updateMode({
                        colors: { ...modeState.colors, [key]: value },
                      })
                    }
                    value={modeState.colors[key]}
                  />
                ))}
                <p className="text-[11px] text-muted-foreground">
                  Any CSS color works in the text field, including oklch() and
                  color-mix().
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </aside>

        {/* Preview */}
        <div className="flex min-w-0 flex-col gap-8">
          <section className="flex flex-col gap-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h3 className="font-semibold text-sm">Elevations</h3>
                <p className="text-muted-foreground text-xs">
                  Click a level to edit it. The row below shows each layer of
                  the selected level on its own.
                </p>
              </div>
              <ToggleGroup
                onValueChange={(value) => value && setStage(value)}
                size="sm"
                type="single"
                value={stage}
                variant="outline"
              >
                {STAGE_BACKGROUNDS.map((b) => (
                  <ToggleGroupItem key={b.value} value={b.value}>
                    {b.label}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </div>
            <div
              className="flex flex-col gap-8 rounded-md border p-8"
              style={{ background: stageCss }}
            >
              <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
                {ELEVATIONS.map((e) => (
                  <button
                    className={cn(
                      "flex aspect-[4/3] flex-col justify-end rounded-md bg-card p-3 text-left text-card-foreground outline-offset-4 transition-shadow",
                      e === elevation &&
                        "outline-2 outline-primary outline-dashed"
                    )}
                    key={e}
                    onClick={() => setElevation(e)}
                    style={{ boxShadow: `var(--elevation-${e})` }}
                    type="button"
                  >
                    <span className="font-medium text-xs">
                      {ELEVATION_INFO[e].label}
                    </span>
                    <span className="font-mono text-[10px] text-muted-foreground">
                      shadow-{e}
                    </span>
                  </button>
                ))}
              </div>
              <div className="flex flex-wrap gap-6">
                {modeState.elevations[elevation].length === 0 ? (
                  <span className="text-muted-foreground text-xs">
                    No layers.
                  </span>
                ) : (
                  modeState.elevations[elevation].map((layer, index) => (
                    <div
                      className="flex flex-col items-center gap-2"
                      key={layer.id}
                    >
                      <div
                        className={cn(
                          "size-16 rounded-md bg-card",
                          !layer.enabled && "opacity-40"
                        )}
                        style={{
                          boxShadow: layerToCss(layer, modeState.intensity),
                        }}
                      />
                      <Badge variant="outline">Layer {index + 1}</Badge>
                    </div>
                  ))
                )}
              </div>
            </div>
          </section>

          <section className="flex flex-col gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-muted-foreground text-xs">Show</span>
              <ToggleGroup
                onValueChange={(value: string[]) =>
                  setSections(value as PreviewSectionId[])
                }
                size="sm"
                type="multiple"
                value={sections}
                variant="outline"
              >
                {PREVIEW_SECTIONS.map((s) => (
                  <ToggleGroupItem key={s.id} value={s.id}>
                    {s.label}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </div>
            <div
              className="rounded-md border p-6"
              style={{ background: stageCss }}
            >
              <ComponentPreview sections={sections} />
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

function ExportDialog({ state }: { state: LabState }) {
  const tokensJson = useMemo(() => exportTokensJson(state), [state])
  const colorsJson = useMemo(() => exportColorsJson(state), [state])
  const css = useMemo(() => exportCss(state), [state])
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="ml-auto" size="sm" variant="outline">
          <DownloadIcon data-icon="inline-start" />
          Export
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[85svh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Export</DialogTitle>
          <DialogDescription>
            Paste the tokens into style/tokens.json (and changed colors into
            style/colors.json), then run pnpm style:build. The CSS works as a
            quick override in any app using business-style.
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="tokens">
          <TabsList>
            <TabsTrigger value="tokens">tokens.json</TabsTrigger>
            {colorsJson ? (
              <TabsTrigger value="colors">colors.json</TabsTrigger>
            ) : null}
            <TabsTrigger value="css">CSS</TabsTrigger>
          </TabsList>
          <TabsContent className="pt-3" value="tokens">
            <CodeBlock code={tokensJson} />
          </TabsContent>
          {colorsJson ? (
            <TabsContent className="pt-3" value="colors">
              <CodeBlock code={colorsJson} />
            </TabsContent>
          ) : null}
          <TabsContent className="pt-3" value="css">
            <CodeBlock code={css} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
