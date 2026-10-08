/**
 * @component Label
 * @level primitive
 * @summary The text label for a form control.
 * @use Inside field (FieldLabel builds on it). Every control needs one,
 *      linked with htmlFor.
 * @avoid Section headings: use FieldLegend or PageSection.
 * @related field
 */
import { Label as LabelPrimitive } from "radix-ui"
import type * as React from "react"
import { cn } from "@/lib/utils"

function Label({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        "flex items-center gap-2 text-xs leading-none select-none peer-enabled:cursor-pointer has-[button:enabled]:cursor-pointer group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

export { Label }
