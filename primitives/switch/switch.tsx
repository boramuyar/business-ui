/**
 * @component Switch
 * @level primitive
 * @summary Turns one setting on or off, effective immediately.
 * @use A setting that applies the moment it flips: notifications, auto-renew,
 *      a feature toggle. Confirm with a toast if the effect is not visible.
 * @avoid Inside a form with a Save button: use checkbox.
 * @avoid Choosing between named modes: use toggle-group.
 * @avoid Toolbar states such as bold: use toggle.
 * @related checkbox, toggle, toggle-group, settings-page
 * @guide design/patterns/selection-controls.md
 */
import { Switch as SwitchPrimitive } from "radix-ui"
import type * as React from "react"
import { cn } from "@/lib/utils"

function Switch({
  className,
  size = "default",
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root> & {
  size?: "sm" | "default"
}) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      data-size={size}
      className={cn(
        "peer group/switch relative inline-flex rounded-full shrink-0 items-center transition-all outline-none after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-1 aria-invalid:ring-destructive/20 data-[size=default]:h-4.5 data-[size=default]:w-8 data-[size=sm]:h-3.5 data-[size=sm]:w-6 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 data-checked:bg-brand data-unchecked:bg-input dark:data-unchecked:bg-input/80 data-disabled:cursor-not-allowed data-disabled:opacity-50",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className="pointer-events-none block rounded-full bg-background shadow-control ring-0 transition-transform group-data-[size=default]/switch:size-3 group-data-[size=sm]/switch:size-2.5 group-data-[size=default]/switch:data-checked:translate-x-[calc(100%+5px)] group-data-[size=sm]/switch:data-checked:translate-x-[calc(100%+2px)] dark:data-checked:bg-brand-foreground group-data-[size=default]/switch:data-unchecked:translate-x-[3px] group-data-[size=sm]/switch:data-unchecked:translate-x-0.5 dark:data-unchecked:bg-foreground"
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
