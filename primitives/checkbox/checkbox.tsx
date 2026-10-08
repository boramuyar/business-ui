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
import { CheckIcon } from "lucide-react"
import { Checkbox as CheckboxPrimitive } from "radix-ui"
import type * as React from "react"
import { cn } from "@/lib/utils"

function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "peer relative flex size-4 shrink-0 items-center justify-center rounded-sm shadow-control border border-input transition-colors outline-none group-has-disabled/field:opacity-50 after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-1 aria-invalid:ring-destructive/20 aria-invalid:aria-checked:border-brand dark:bg-input/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 data-checked:border-brand data-checked:bg-brand data-checked:text-brand-foreground",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="grid place-content-center text-current transition-none [&>svg]:size-3 pt-px pr-px"
      >
        <CheckIcon strokeWidth={4} />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
