import { Slot } from "radix-ui"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

/**
 * @shell Pane
 * @level shell
 * @summary A dense, fixed-height frame for narrow surfaces: a compact header, an optional toolbar, one scrolling body and a pinned footer.
 * @closest page
 * @why page flows with the document, with an xl title and wide gutters. A pane fills a container it does not control (a task pane, side panel or sheet), keeps its header and footer in view, and scrolls only its body.
 * @reuses Button, Item, Empty, ScrollArea, Tooltip
 * @use Office task panes, browser extension popups, side panels and docked inspectors.
 * @use The content of a full-height sheet or dialog: put PaneTitle asChild around DialogTitle or SheetTitle.
 * @avoid Full-width screens in an app window: use page or a page archetype.
 * @avoid Short confirmations: use dialog or alert-dialog.
 * @related page, sheet, sidebar
 * @guide https://ui.uyar.design/design/shells.md
 *
 * Rules the parts enforce:
 * - One PaneHeader per pane. Its title is the pane's heading; it truncates instead of wrapping.
 * - Icon actions sit on the right of the header; a back button goes in leading.
 * - Search and filters go in PaneToolbar, never in the header.
 * - PaneFooter holds the pane's actions, one or two equal-width buttons with the primary last.
 * - PaneFloatingAction is the one action that adds to the body, such as a new folder. The body keeps room
 *   under its last row for it. With a PaneFooter it floats 16px above the footer, so the footer keeps the
 *   pane's actions (such as Run all) and the floating button keeps adding.
 */
function Pane({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="pane"
      className={cn(
        "relative flex h-full min-h-0 w-full min-w-0 flex-col bg-background has-data-[slot=pane-floating-action]:[&_[data-slot=pane-body]]:pb-18",
        // A footer is its 1px rule, p-2 and an h-8 button: --spacing(12) + 1px. The floating action keeps its
        // usual 16px gap above it.
        "has-data-[slot=pane-footer]:[&>[data-slot=pane-floating-action]]:bottom-[calc(--spacing(16)+1px)]",
        className
      )}
      {...props}
    />
  )
}

function PaneHeader({
  className,
  leading,
  actions,
  children,
  ...props
}: React.ComponentProps<"header"> & {
  /** Before the title, such as a back or menu button. */
  leading?: React.ReactNode
  /** Icon buttons on the right. */
  actions?: React.ReactNode
}) {
  return (
    <header
      data-slot="pane-header"
      className={cn(
        "flex h-10 shrink-0 items-center gap-1 border-b px-2",
        className
      )}
      {...props}
    >
      {leading}
      <div className="flex min-w-0 flex-1 items-center gap-1">{children}</div>
      {actions ? (
        <div
          data-slot="pane-actions"
          className="flex shrink-0 items-center gap-0.5"
        >
          {actions}
        </div>
      ) : null}
    </header>
  )
}

function PaneTitle({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<"h1"> & {
  /** Render the child (a DialogTitle or SheetTitle) with the title style. */
  asChild?: boolean
}) {
  const Comp = asChild ? Slot.Root : "h1"

  return (
    <Comp
      data-slot="pane-title"
      className={cn("min-w-0 truncate px-1 font-semibold text-sm", className)}
      {...props}
    />
  )
}

function PaneToolbar({
  className,
  children,
  end,
  ...props
}: React.ComponentProps<"div"> & {
  /** Right-aligned controls, such as a filter or sort menu. */
  end?: React.ReactNode
}) {
  return (
    <div
      data-slot="pane-toolbar"
      className={cn("flex shrink-0 items-center gap-2 p-3", className)}
      {...props}
    >
      {children}
      {end ? (
        <div className="ms-auto flex items-center gap-1">{end}</div>
      ) : null}
    </div>
  )
}

function PaneBody({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="pane-body"
      className={cn("flex min-h-0 flex-1 flex-col overflow-y-auto *:shrink-0", className)}
      {...props}
    />
  )
}

function PaneFooter({ className, ...props }: React.ComponentProps<"footer">) {
  return (
    <footer
      data-slot="pane-footer"
      className={cn(
        "grid shrink-0 auto-cols-fr grid-flow-col gap-2 border-t p-2",
        className
      )}
      {...props}
    />
  )
}

/**
 * A round button floating over the body's bottom-right corner. `label` names it for screen readers and shows
 * as its tooltip, so the button needs only an icon.
 */
function PaneFloatingAction({
  className,
  label,
  ...props
}: Omit<
  React.ComponentProps<typeof Button>,
  "size" | "variant" | "tooltip" | "aria-label"
> & {
  label: string
}) {
  return (
    <Button
      data-slot="pane-floating-action"
      size="icon-lg"
      tooltip={label}
      tooltipSide="left"
      aria-label={label}
      className={cn(
        "absolute right-4 bottom-4 z-10 size-11 rounded-full shadow-overlay [&_svg:not([class*='size-'])]:size-5",
        className
      )}
      {...props}
    />
  )
}

export {
  Pane,
  PaneBody,
  PaneFloatingAction,
  PaneFooter,
  PaneHeader,
  PaneTitle,
  PaneToolbar,
}
