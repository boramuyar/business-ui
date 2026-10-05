import * as React from "react"

const MOBILE_BREAKPOINT = 768
const MOBILE_BREAKPOINT_VAR = "--breakpoint-md"

/** Reads the theme's md breakpoint so hosts with custom breakpoints (e.g. a
 * narrow Office taskpane) get the right mobile threshold. Falls back to 768px. */
function getBreakpointPx(variableName: string, fallback: number): number {
  if (typeof window === "undefined") return fallback
  const value = getComputedStyle(document.documentElement)
    .getPropertyValue(variableName)
    .trim()
  const match = value.match(/^(\d+)(px)?$/)
  if (!match) return fallback
  const parsed = Number(match[1])
  return Number.isFinite(parsed) ? parsed : fallback
}

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const breakpoint = getBreakpointPx(MOBILE_BREAKPOINT_VAR, MOBILE_BREAKPOINT)
    const mediaQuery = window.matchMedia(`(max-width: ${breakpoint - 1}px)`)
    const onChange = () => setIsMobile(mediaQuery.matches)

    mediaQuery.addEventListener("change", onChange)
    setIsMobile(mediaQuery.matches)

    return () => mediaQuery.removeEventListener("change", onChange)
  }, [])

  return Boolean(isMobile)
}
