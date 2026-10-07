/**
 * @component Separator
 * @level layout
 * @summary A thin line between groups.
 * @use Separating groups inside menus, toolbars and dense panels where
 *      spacing alone is not enough.
 * @avoid Between page sections: use spacing (PageSection and PageBody gaps).
 * @avoid Between form groups: use FieldSet or FieldSeparator.
 * @related field, page
 * @guide design/foundations/layout.md
 */
import { Separator as SeparatorPrimitive } from "radix-ui"
import type * as React from "react"
import { cn } from "@/lib/utils"

function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}: React.ComponentProps<typeof SeparatorPrimitive.Root>) {
  return (
    <SeparatorPrimitive.Root
      data-slot="separator"
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "shrink-0 bg-border data-horizontal:h-px data-horizontal:w-full data-vertical:w-px data-vertical:self-stretch",
        className
      )}
      {...props}
    />
  )
}

export { Separator }
