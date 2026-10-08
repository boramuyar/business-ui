/**
 * @component Sonner
 * @level surface
 * @summary Toasts: brief, non-blocking messages about the result of an
 *          action.
 * @use Confirming what just happened: "Invoice sent". Offer Undo for
 *      reversible actions instead of asking first.
 * @avoid Errors people must fix before continuing: use alert or field errors.
 * @avoid Questions or choices: use dialog or alert-dialog.
 * @avoid Persistent page state: use alert.
 * @related alert, alert-dialog
 * @guide https://ui.uyar.design/design/patterns/feedback.md
 */
import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react"
import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      icons={{
        success: <CircleCheckIcon className="size-4" />,
        info: <InfoIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4" />,
        error: <OctagonXIcon className="size-4" />,
        loading: <Loader2Icon className="size-4 animate-spin" />,
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "var(--radius)",
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast: "cn-toast shadow-overlay!",
          success:
            "border-success-border! bg-success-subtle! text-success-strong!",
          info: "border-info-border! bg-info-subtle! text-info-strong!",
          warning:
            "border-warning-border! bg-warning-subtle! text-warning-strong!",
          error:
            "border-destructive-border! bg-destructive-subtle! text-destructive-strong!",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
