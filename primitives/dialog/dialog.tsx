import { XIcon } from "lucide-react"
import { Dialog as DialogPrimitive } from "radix-ui"
import type * as React from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

/**
 * @component Dialog
 * @level surface
 * @summary A modal window for a short, focused task that blocks the page.
 * @use Short tasks with up to about three fields: rename, invite a member,
 *      add a note.
 * @use Footer: Cancel (secondary) then the primary action named for the result.
 * @use size="pane" for a whole view in a narrow host such as a task pane
 *      (a skills browser, a prompt editor): on small screens it fills the
 *      screen just below the host's bar, with the scrim over the bar, and
 *      from sm up it is a large centered dialog. Compose it with the pane
 *      shell's PaneHeader and PaneBody. The host sets --overlay-top-inset to
 *      the height of its own bar, and any menu it draws over the corner.
 * @avoid Destructive confirmations: use alert-dialog.
 * @avoid Long forms, or when people need to see the page: use sheet or
 *        form-page.
 * @avoid Mobile bottom panels: use drawer.
 * @avoid Small anchored panels such as filters: use popover.
 * @related alert-dialog, sheet, drawer, popover, form-page
 * @guide https://ui.uyar.design/design/patterns/overlays.md
 */
function Dialog({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />
}

function DialogTrigger({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />
}

function DialogPortal({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />
}

function DialogClose({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Close>) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />
}

function DialogOverlay({
  className,
  blur = true,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay> & {
  /** Blurs the page behind the scrim. Off keeps the page readable. */
  blur?: boolean
}) {
  return (
    <DialogPrimitive.Overlay
      data-slot="dialog-overlay"
      className={cn(
        "fixed inset-0 isolate z-50 bg-scrim duration-100 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0",
        blur && "supports-backdrop-filter:backdrop-blur-xs",
        className
      )}
      {...props}
    />
  )
}

function DialogContent({
  className,
  blurBackdrop = true,
  children,
  showCloseButton = true,
  size = "default",
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content> & {
  /** Blurs the page behind the scrim. */
  blurBackdrop?: boolean
  showCloseButton?: boolean
  /**
   * `pane` holds a whole view: below sm it fills the screen from just under
   * the host's bar (`--overlay-top-inset`) to the bottom, and from sm up it is
   * a large centered dialog. Its content lays itself out, as a pane does.
   */
  size?: "default" | "pane"
}) {
  return (
    <DialogPortal>
      <DialogOverlay blur={blurBackdrop} />
      <DialogPrimitive.Content
        data-slot="dialog-content"
        data-size={size}
        className={cn(
          "fixed top-1/2 left-1/2 z-50 grid w-full max-w-[min(var(--container-sm),calc(100%-2rem))] -translate-x-1/2 -translate-y-1/2 gap-4 rounded-md bg-popover p-4 text-xs/relaxed text-popover-foreground shadow-modal ring-1 ring-foreground/10 duration-100 outline-none data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
          size === "pane" &&
            "flex flex-col gap-0 overflow-hidden p-0 max-sm:top-[calc(var(--overlay-top-inset,0px)+0.5rem)] max-sm:bottom-0 max-sm:left-0 max-sm:max-w-none max-sm:translate-x-0 max-sm:translate-y-0 max-sm:rounded-b-none max-sm:data-[state=closed]:zoom-out-100 max-sm:data-[state=open]:zoom-in-100 sm:h-[min(42rem,calc(100dvh-4rem))] sm:max-w-[min(var(--container-2xl),calc(100%-4rem))]",
          className
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <DialogPrimitive.Close data-slot="dialog-close" asChild>
            <Button
              variant="ghost"
              className="absolute top-2 right-2"
              size="icon-sm"
            >
              <XIcon />
              <span className="sr-only">Close</span>
            </Button>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DialogPortal>
  )
}

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-header"
      className={cn("flex flex-col gap-1 text-left", className)}
      {...props}
    />
  )
}

function DialogFooter({
  className,
  showCloseButton = false,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  showCloseButton?: boolean
}) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className
      )}
      {...props}
    >
      {children}
      {showCloseButton && (
        <DialogPrimitive.Close asChild>
          <Button variant="secondary">Close</Button>
        </DialogPrimitive.Close>
      )}
    </div>
  )
}

function DialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn("font-heading text-sm font-medium", className)}
      {...props}
    />
  )
}

function DialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn(
        "text-xs/relaxed text-muted-foreground *:[a]:underline *:[a]:underline-offset-3 *:[a]:hover:text-foreground",
        className
      )}
      {...props}
    />
  )
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
}
