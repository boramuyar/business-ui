"use client"

import type { VariantProps } from "class-variance-authority"
import { ToggleGroup as ToggleGroupPrimitive } from "radix-ui"
import * as React from "react"
import { toggleVariants } from "@/components/ui/toggle"
import { cn } from "@/lib/utils"

/**
 * @component Toggle Group
 * @level primitive
 * @summary A row of buttons where one (or several) can be active; also called
 *          a segmented control or button radio group.
 * @use 2 to 5 short options that switch a view or mode and apply immediately:
 *      List or Board, Day, Week or Month.
 * @use type="multiple" for toolbar formatting groups.
 * @use variant="chip" type="multiple" spacing={1}: category filters on a list.
 *      Leave out an "All" chip: with none on, the list shows everything.
 * @use variant="segmented" type="single": a segmented control that fills its
 *      cell, such as Dynamic or Text in a settings row. It always keeps one
 *      mode on.
 * @avoid Options need descriptions, or the choice is submitted with a form:
 *        use radio-group.
 * @avoid More than 5 options: use select.
 * @avoid Switching between areas of content: use tabs.
 * @related radio-group, tabs, toggle, select
 * @guide https://ui.uyar.design/design/patterns/selection-controls.md
 */
const ToggleGroupContext = React.createContext<
  VariantProps<typeof toggleVariants> & {
    spacing?: number
    orientation?: "horizontal" | "vertical"
  }
>({
  size: "default",
  variant: "default",
  spacing: 0,
  orientation: "horizontal",
})

function ToggleGroup({
  className,
  variant,
  size,
  spacing = 0,
  orientation = "horizontal",
  children,
  ...props
}: React.ComponentProps<typeof ToggleGroupPrimitive.Root> &
  VariantProps<typeof toggleVariants> & {
    spacing?: number
    orientation?: "horizontal" | "vertical"
  }) {
  // Segments are separate raised buttons 2px apart on the track, never joined.
  const gap = variant === "segmented" ? 0.5 : spacing
  // A segmented control always keeps one mode on: clicking the picked one again changes nothing.
  const rootProps =
    variant === "segmented" && props.type === "single"
      ? {
          ...props,
          onValueChange: (next: string) => {
            if (next) props.onValueChange?.(next)
          },
        }
      : props

  return (
    <ToggleGroupPrimitive.Root
      data-slot="toggle-group"
      data-variant={variant}
      data-size={size}
      data-spacing={gap}
      data-orientation={orientation}
      style={{ "--gap": gap } as React.CSSProperties}
      className={cn(
        "group/toggle-group flex w-fit flex-row items-center gap-[--spacing(var(--gap))] rounded-md data-vertical:flex-col data-vertical:items-stretch data-[variant=segmented]:h-8 data-[variant=segmented]:w-full data-[variant=segmented]:min-w-0 data-[variant=segmented]:bg-muted data-[variant=segmented]:p-0.5 data-[variant=segmented]:data-[size=sm]:h-7",
        className
      )}
      {...rootProps}
    >
      <ToggleGroupContext.Provider
        value={{ variant, size, spacing: gap, orientation }}
      >
        {children}
      </ToggleGroupContext.Provider>
    </ToggleGroupPrimitive.Root>
  )
}

function ToggleGroupItem({
  className,
  children,
  variant = "default",
  size = "default",
  ...props
}: React.ComponentProps<typeof ToggleGroupPrimitive.Item> &
  VariantProps<typeof toggleVariants>) {
  const context = React.useContext(ToggleGroupContext)

  return (
    <ToggleGroupPrimitive.Item
      data-slot="toggle-group-item"
      data-variant={context.variant || variant}
      data-size={context.size || size}
      data-spacing={context.spacing}
      className={cn(
        "shrink-0 group-data-[spacing=0]/toggle-group:rounded-none group-data-[spacing=0]/toggle-group:px-2 focus:z-10 focus-visible:z-10 group-data-[spacing=0]/toggle-group:has-data-[icon=inline-end]:pr-1.5 group-data-[spacing=0]/toggle-group:has-data-[icon=inline-start]:pl-1.5 group-data-horizontal/toggle-group:data-[spacing=0]:first:rounded-l-md group-data-vertical/toggle-group:data-[spacing=0]:first:rounded-t-md group-data-horizontal/toggle-group:data-[spacing=0]:last:rounded-r-md group-data-vertical/toggle-group:data-[spacing=0]:last:rounded-b-md group-data-horizontal/toggle-group:data-[spacing=0]:data-[variant=outline]:border-l-0 group-data-vertical/toggle-group:data-[spacing=0]:data-[variant=outline]:border-t-0 group-data-horizontal/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-l group-data-vertical/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-t",
        toggleVariants({
          variant: context.variant || variant,
          size: context.size || size,
        }),
        className
      )}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  )
}

export { ToggleGroup, ToggleGroupItem }
