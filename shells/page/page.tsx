/**
 * @shell Page
 * @level shell
 * @summary The base frame of every screen: width, padding, header, toolbar and body.
 * @closest none. This is the base every other shell builds on.
 * @why Every screen needs the same width, gutters, title placement and action placement, or apps stop feeling like one product.
 * @reuses none. Layout only, so the shells built on it share one frame.
 * @use Building a screen that no archetype shell fits. Compose Page, PageHeader, PageToolbar and PageBody yourself.
 * @use Building a new shell. Start from these parts instead of a bare div.
 * @avoid A list, detail, form, settings or overview screen: use list-page, detail-page, form-page, settings-page or overview-page.
 * @avoid Sections inside a card or dialog: use field or card. Page parts are for the screen level only.
 * @related list-page, detail-page, form-page, settings-page, overview-page
 * @guide https://ui.uyar.design/design/shells.md
 *
 * Rules the parts enforce:
 * - One PageHeader per screen. The title is the only h1.
 * - Actions sit on the right of the title. At most one default (primary) button there; the rest use variant="outline" or go in a dropdown-menu.
 * - Search, filters and view switches go in PageToolbar, never in the header.
 * - Width is narrow (forms), default, or full (wide tables and boards). Nothing else.
 */
import type * as React from "react"
import { cn } from "@/lib/utils"

const pageWidths = {
  narrow: "max-w-2xl",
  default: "max-w-6xl",
  full: "max-w-none",
} as const

type PageWidth = keyof typeof pageWidths

function Page({
  className,
  width = "default",
  ...props
}: React.ComponentProps<"div"> & { width?: PageWidth }) {
  return (
    <div
      data-slot="page"
      data-width={width}
      className={cn(
        "mx-auto flex w-full min-w-0 flex-col gap-6 px-4 py-6 md:px-6 md:py-8",
        pageWidths[width],
        className
      )}
      {...props}
    />
  )
}

function PageHeader({
  className,
  title,
  description,
  actions,
  breadcrumb,
  children,
  ...props
}: Omit<React.ComponentProps<"header">, "title"> & {
  /** The screen's name. Rendered as the only h1. */
  title: React.ReactNode
  /** One sentence on what the screen is for. */
  description?: React.ReactNode
  /** Buttons on the right. At most one primary button. */
  actions?: React.ReactNode
  /** A breadcrumb above the title, for screens below the top level. */
  breadcrumb?: React.ReactNode
  /** Below the title row. Use it for tabs that switch the whole screen. */
  children?: React.ReactNode
}) {
  return (
    <header
      data-slot="page-header"
      className={cn("flex flex-col gap-3", className)}
      {...props}
    >
      {breadcrumb}
      <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-3">
        <div className="flex min-w-0 flex-col gap-1">
          <h1 className="font-semibold text-xl tracking-tight">{title}</h1>
          {description ? (
            <p className="max-w-prose text-muted-foreground text-sm">
              {description}
            </p>
          ) : null}
        </div>
        {actions ? (
          <div
            data-slot="page-actions"
            className="flex shrink-0 flex-wrap items-center gap-2"
          >
            {actions}
          </div>
        ) : null}
      </div>
      {children}
    </header>
  )
}

function PageToolbar({
  className,
  children,
  end,
  ...props
}: React.ComponentProps<"div"> & {
  /** Right-aligned controls, such as a view switch or column settings. */
  end?: React.ReactNode
}) {
  return (
    <div
      data-slot="page-toolbar"
      className={cn("flex flex-wrap items-center gap-2", className)}
      {...props}
    >
      {children}
      {end ? (
        <div className="ms-auto flex flex-wrap items-center gap-2">{end}</div>
      ) : null}
    </div>
  )
}

function PageBody({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="page-body"
      className={cn("flex min-w-0 flex-col gap-6", className)}
      {...props}
    />
  )
}

function PageSection({
  className,
  title,
  description,
  actions,
  children,
  ...props
}: Omit<React.ComponentProps<"section">, "title"> & {
  title: React.ReactNode
  description?: React.ReactNode
  actions?: React.ReactNode
}) {
  return (
    <section
      data-slot="page-section"
      className={cn("flex min-w-0 flex-col gap-3", className)}
      {...props}
    >
      <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
        <div className="flex min-w-0 flex-col gap-0.5">
          <h2 className="font-semibold text-sm">{title}</h2>
          {description ? (
            <p className="text-muted-foreground text-xs/relaxed">
              {description}
            </p>
          ) : null}
        </div>
        {actions ? (
          <div className="flex shrink-0 items-center gap-2">{actions}</div>
        ) : null}
      </div>
      {children}
    </section>
  )
}

export type { PageWidth }
export { Page, PageBody, PageHeader, PageSection, PageToolbar }
