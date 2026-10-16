import { cva, type VariantProps } from "class-variance-authority"
import type * as React from "react"
import { cn } from "@/lib/utils"

/**
 * @component Alert
 * @level primitive
 * @summary An inline message about the state of the page or a section, styled
 *          by severity.
 * @use A persistent message people must see while they work: a failed sync, a
 *      missing setting, a read-only notice.
 * @use Pick the variant by meaning: destructive for errors, warning, info,
 *      success. A status variant tints the whole card, border and text, so
 *      its meaning reads at a glance; default stays a neutral card. Always
 *      pass an icon.
 * @avoid Reporting the result of an action the user just took: use sonner
 *        (toast).
 * @avoid Asking the user to confirm something: use alert-dialog.
 * @avoid Field-level errors: use FieldError in field.
 * @related sonner, alert-dialog, field, empty
 * @guide https://ui.uyar.design/design/patterns/feedback.md
 */
const alertVariants = cva(
  "group/alert relative grid w-full gap-0.5 rounded-md border border-border bg-card px-3 py-2.5 text-left text-xs text-card-foreground has-data-[slot=alert-action]:relative has-data-[slot=alert-action]:pr-24 has-[>svg]:grid-cols-[auto_1fr] has-[>svg]:gap-x-2.5 not-has-data-[slot=alert-description]:items-center not-has-data-[slot=alert-title]:*:data-[slot=alert-description]:min-h-7 not-has-data-[slot=alert-title]:*:data-[slot=alert-description]:content-center has-data-[slot=alert-title]:has-data-[slot=alert-description]:*:[svg]:row-span-2 *:[svg]:box-border *:[svg]:size-7 *:[svg]:rounded-md *:[svg]:p-1.5",
  {
    variants: {
      variant: {
        default: "*:[svg]:bg-muted *:[svg]:text-foreground",
        destructive:
          "border-destructive-border bg-destructive-subtle text-destructive-strong *:data-[slot=alert-description]:text-destructive-strong *:[svg]:text-destructive-strong",
        success:
          "border-success-border bg-success-subtle text-success-strong *:data-[slot=alert-description]:text-success-strong *:[svg]:text-success-strong",
        warning:
          "border-warning-border bg-warning-subtle text-warning-strong *:data-[slot=alert-description]:text-warning-strong *:[svg]:text-warning-strong",
        info: "border-info-border bg-info-subtle text-info-strong *:data-[slot=alert-description]:text-info-strong *:[svg]:text-info-strong",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Alert({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>) {
  return (
    <div
      data-slot="alert"
      data-variant={variant}
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  )
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-title"
      className={cn(
        "font-medium [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground",
        className
      )}
      {...props}
    />
  )
}

function AlertDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        "text-xs/relaxed text-balance text-muted-foreground md:text-pretty [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground [&_p:not(:last-child)]:mb-2",
        className
      )}
      {...props}
    />
  )
}

function AlertAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-action"
      className={cn("absolute top-3 right-3", className)}
      {...props}
    />
  )
}

export { Alert, AlertAction, AlertDescription, AlertTitle }
