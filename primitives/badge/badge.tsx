import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"
import type * as React from "react"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "group/badge font-mono text-xs inline-flex h-6 w-fit dark:bg-transparent shrink-0 items-center [a]:cursor-pointer justify-center gap-1 overflow-hidden rounded-none border border-transparent font-medium whitespace-nowrap transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-3!",
  {
    variants: {
      variant: {
        default:
          "bg-primary-subtle text-primary-emphasis dark:border-primary-border [a]:hover:border-primary dark:[a]:hover:border-primary-strong",
        secondary:
          "bg-secondary text-secondary-foreground [a]:hover:border-foreground/50",
        destructive:
          "bg-destructive-subtle dark:border-destructive-border text-destructive [a]:hover:border-destructive",
        success:
          "bg-success-subtle dark:border-success-border text-success-strong [a]:hover:border-success",
        warning:
          "bg-warning-subtle dark:border-warning-border text-warning-strong [a]:hover:border-warning",
        info: "bg-info-subtle dark:border-info-border text-info-strong [a]:hover:border-info",
        outline:
          "border-border text-foreground [a]:hover:border-foreground/50 ",
      },
      size: {
        default: "h-6 px-2 ",
        sm: "h-5 px-1.5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Badge({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentPropsWithoutRef<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "span"

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
