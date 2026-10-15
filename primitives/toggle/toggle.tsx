import { cva, type VariantProps } from "class-variance-authority"
import { Toggle as TogglePrimitive } from "radix-ui"
import type * as React from "react"
import { cn } from "@/lib/utils"

/**
 * @component Toggle
 * @level primitive
 * @summary A button that holds an on or off state.
 * @use Toolbar states: bold, pin, show grid, mute. Usually icon-only with a
 *      tooltip.
 * @use variant="chip" in a toggle-group with type="multiple": filter chips
 *      that narrow a list by category, each switched on and off on its own.
 * @avoid Settings with a text label: use switch.
 * @avoid One of several options: use toggle-group.
 * @avoid Actions without state: use button.
 * @related toggle-group, switch, button, tooltip
 * @guide https://ui.uyar.design/design/patterns/selection-controls.md
 */
const toggleVariants = cva(
  "group/toggle inline-flex items-center justify-center gap-1 rounded-md text-xs font-medium whitespace-nowrap transition-all outline-none hover:bg-muted hover:text-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 aria-pressed:bg-muted data-[state=on]:bg-muted dark:aria-invalid:ring-destructive/40 has-[>svg:only-child:not([data-icon])]:aspect-square [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline: "border border-input bg-transparent hover:bg-muted",
        chip: "rounded-full border border-border bg-transparent hover:bg-muted aria-pressed:border-brand-border aria-pressed:bg-brand-subtle aria-pressed:text-brand-emphasis data-[state=on]:border-brand-border data-[state=on]:bg-brand-subtle data-[state=on]:text-brand-emphasis",
      },
      size: {
        default:
          "h-8 min-w-8 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        sm: "h-7 min-w-7 px-2.5 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5",
        lg: "h-9 min-w-9 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
      },
    },
    compoundVariants: [
      // A chip is shorter than a button at every size, so a row of them reads as filters, not actions.
      { variant: "chip", className: "h-6 min-w-6 px-2.5" },
    ],
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Toggle({
  className,
  variant = "default",
  size = "default",
  ...props
}: React.ComponentProps<typeof TogglePrimitive.Root> &
  VariantProps<typeof toggleVariants>) {
  return (
    <TogglePrimitive.Root
      data-slot="toggle"
      className={cn(toggleVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Toggle, toggleVariants }
