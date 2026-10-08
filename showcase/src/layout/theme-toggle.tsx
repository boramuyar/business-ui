import { Kbd } from "@frontend/primitives/kbd"
import { ToggleGroup, ToggleGroupItem } from "@frontend/primitives/toggle-group"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@frontend/primitives/tooltip"
import { MonitorIcon, MoonIcon, SunIcon } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

function isShortcutBlocked(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) {
    return false
  }

  return (
    target.isContentEditable ||
    target instanceof HTMLInputElement ||
    target instanceof HTMLTextAreaElement ||
    target instanceof HTMLSelectElement ||
    target.closest('[role="menu"]') !== null
  )
}

const themes = [
  { value: "light", label: "Light", Icon: SunIcon },
  { value: "dark", label: "Dark", Icon: MoonIcon },
  { value: "system", label: "System", Icon: MonitorIcon },
] as const

export function ThemeToggle() {
  const { theme, resolvedTheme, setTheme } = useTheme()
  // The stored theme is only known after mount.
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== "d" || event.metaKey || event.ctrlKey || event.altKey) {
        return
      }
      if (isShortcutBlocked(event.target)) {
        return
      }
      setTheme(resolvedTheme === "dark" ? "light" : "dark")
    }

    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [resolvedTheme, setTheme])

  return (
    <ToggleGroup
      aria-label="Theme"
      onValueChange={(value) => {
        if (value) setTheme(value)
      }}
      size="sm"
      type="single"
      value={mounted ? theme : undefined}
    >
      {themes.map(({ value, label, Icon }) => (
        <Tooltip key={value}>
          <TooltipTrigger asChild>
            <ToggleGroupItem aria-label={label} value={value}>
              <Icon />
            </ToggleGroupItem>
          </TooltipTrigger>
          <TooltipContent>
            {label}
            {value === "dark" ? <Kbd>D</Kbd> : null}
          </TooltipContent>
        </Tooltip>
      ))}
    </ToggleGroup>
  )
}
