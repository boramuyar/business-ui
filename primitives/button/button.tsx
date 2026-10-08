/**
 * @component Button
 * @level primitive
 * @summary Triggers an action.
 * @use default (primary): the one main action of a screen or dialog. At most
 *      one per header, dialog or form.
 * @use outline: other actions next to the primary one. secondary: quiet
 *      actions in dense areas. ghost: toolbar and icon actions. destructive:
 *      deletes, only inside alert-dialog or a danger section. link: inline
 *      navigation in text, with size="inline" inside running text.
 * @use Label with a verb that names the result: "Create invoice", not
 *      "Submit".
 * @avoid Going to another page: use a link (or Button asChild with an
 *        anchor).
 * @avoid Holding an on or off state: use toggle.
 * @avoid Choosing one of several modes: use toggle-group.
 * @related button-group, toggle, dropdown-menu, alert-dialog
 */
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"
import * as React from "react"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-md border border-transparent bg-clip-padding text-xs font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-1 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-control hover:bg-primary-strong",
        outline:
          "border-border bg-background shadow-control hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-transparent dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground shadow-control hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)] aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
        ghost:
          "hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50",
        destructive:
          "bg-destructive text-destructive-foreground shadow-control hover:bg-destructive-strong",
        link: "text-brand-emphasis underline-offset-4 hover:underline",
      },
      size: {
        default:
          "h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        xs: "h-6 gap-1 rounded-sm px-2 text-xs has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-7 gap-1 px-2.5 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-9 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        icon: "size-8",
        "icon-xs": "size-6 rounded-sm [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-7",
        "icon-lg": "size-9",
        inline:
          "inline h-auto border-0 p-0 align-baseline text-[length:inherit] whitespace-normal",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Button = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<"button"> &
    VariantProps<typeof buttonVariants> & {
      asChild?: boolean
      tooltip?: React.ReactNode
    }
  // forwardRef (not ref-as-prop) so consumer refs are delivered on React 18 as
  // well as 19; it remains supported on 19, merely soft-deprecated.
>(function Button(
  {
    className,
    variant = "default",
    size = "default",
    asChild = false,
    tooltip,
    ...props
  },
  ref
) {
  const Comp = asChild ? Slot.Root : "button"

  const button = (
    <Comp
      ref={ref}
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )

  if (!tooltip) return button

  return (
    <Tooltip>
      <TooltipTrigger asChild>{button}</TooltipTrigger>
      <TooltipContent>{tooltip}</TooltipContent>
    </Tooltip>
  )
})

export { Button, buttonVariants }
