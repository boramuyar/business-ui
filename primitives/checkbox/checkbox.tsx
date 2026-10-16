import { Checkbox as CheckboxPrimitive } from "radix-ui"
import type * as React from "react"
import { cn } from "@/lib/utils"

/**
 * @component Checkbox
 * @level primitive
 * @summary Marks one option on or off, or several items in a list.
 * @use On or off choices in a form that is submitted later ("I agree", "Send
 *      copy to me").
 * @use Selecting several items from a list or table rows.
 * @avoid A setting that applies immediately: use switch.
 * @avoid Exactly one choice from a set: use radio-group.
 * @avoid Toolbar states such as bold: use toggle.
 * @related switch, radio-group, field
 * @guide https://ui.uyar.design/design/patterns/selection-controls.md
 */
function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "peer relative flex size-4 shrink-0 items-center justify-center rounded-sm border border-input transition-colors outline-none group-has-disabled/field:opacity-50 after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-1 aria-invalid:ring-destructive/20 aria-invalid:aria-checked:border-brand dark:data-unchecked:bg-input/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 data-checked:border-brand data-checked:bg-brand data-checked:text-brand-foreground data-[state=indeterminate]:border-brand data-[state=indeterminate]:bg-brand data-[state=indeterminate]:text-brand-foreground",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="group/indicator absolute inset-0 flex items-center justify-center text-current transition-none"
      >
        {/* Drawn on a 12px grid centered in the box, so the mark stays put at
            every zoom level (lucide's check sits off-center in its 24px box). */}
        <svg
          aria-hidden="true"
          className="size-3 group-data-[state=indeterminate]/indicator:hidden"
          fill="none"
          viewBox="0 0 12 12"
        >
          <path
            d="M2.5 6.25 4.75 8.5 9.5 3.5"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.75"
          />
        </svg>
        <svg
          aria-hidden="true"
          className="hidden size-3 group-data-[state=indeterminate]/indicator:block"
          fill="none"
          viewBox="0 0 12 12"
        >
          <path
            d="M3 6h6"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.75"
          />
        </svg>
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
