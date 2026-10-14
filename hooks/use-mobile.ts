import * as React from "react"

const MOBILE_BREAKPOINT = "48rem"
const MOBILE_BREAKPOINT_VAR = "--breakpoint-sidebar"

/** Reads the theme's sidebar breakpoint, so the sidebar switches to its sheet
 * at the same width where its `sidebar:` classes stop docking it. Hosts with a
 * narrow viewport (e.g. an Office task pane) override `--breakpoint-sidebar`
 * in a plain `@theme` block; Tailwind exposes those as variables, while the
 * style's `@theme inline` default is not, hence the fallback. */
function getBreakpoint(): string {
  if (typeof window === "undefined") return MOBILE_BREAKPOINT
  const value = getComputedStyle(document.documentElement)
    .getPropertyValue(MOBILE_BREAKPOINT_VAR)
    .trim()
  return value || MOBILE_BREAKPOINT
}

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    // The inverse of Tailwind's `sidebar:` variant, `(width >= breakpoint)`,
    // so both agree for px and rem values alike.
    const mediaQuery = window.matchMedia(`not all and (min-width: ${getBreakpoint()})`)
    const onChange = () => setIsMobile(mediaQuery.matches)

    mediaQuery.addEventListener("change", onChange)
    setIsMobile(mediaQuery.matches)

    return () => mediaQuery.removeEventListener("change", onChange)
  }, [])

  return Boolean(isMobile)
}
