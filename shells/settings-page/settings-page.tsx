/**
 * @shell SettingsPage
 * @level shell
 * @summary Grouped settings: section navigation on the left, sections of controls on the right.
 * @closest form-page
 * @why Settings are many small, independent choices that usually apply immediately. They need navigation between groups and no single submit button, which form-page does not have.
 * @reuses Page, PageHeader, PageBody, PageSection
 * @use Account, workspace, notification and billing settings.
 * @avoid A single form with one Save: use form-page.
 * @related switch, select, radio-group, field, separator
 * @guide design/shells.md
 *
 * Rules:
 * - Settings that apply immediately use switch, select or toggle-group and confirm with a toast.
 * - A section that needs a Save button puts it at the end of that section only.
 * - Destructive settings (delete workspace) go last, in their own section, behind alert-dialog.
 */
import type * as React from "react"
import {
  Page,
  PageBody,
  PageHeader,
  PageSection,
} from "@/components/shells/page"
import { cn } from "@/lib/utils"

function SettingsPage({
  title,
  description,
  nav,
  className,
  children,
}: {
  title: React.ReactNode
  description?: React.ReactNode
  /** SettingsNavItem links, one per section. */
  nav?: React.ReactNode
  className?: string
  children: React.ReactNode
}) {
  return (
    <Page className={className} data-shell="settings-page">
      <PageHeader description={description} title={title} />
      <div className="grid items-start gap-6 md:grid-cols-[11rem_minmax(0,1fr)]">
        {nav ? (
          <nav
            aria-label="Settings sections"
            data-slot="settings-page-nav"
            className="flex gap-1 overflow-x-auto md:sticky md:top-6 md:flex-col"
          >
            {nav}
          </nav>
        ) : null}
        <PageBody className="gap-0 divide-y [&>*]:py-6 [&>*:first-child]:pt-0">
          {children}
        </PageBody>
      </div>
    </Page>
  )
}

function SettingsNavItem({
  className,
  active = false,
  ...props
}: React.ComponentProps<"a"> & { active?: boolean }) {
  return (
    <a
      data-slot="settings-nav-item"
      data-active={active || undefined}
      aria-current={active ? "page" : undefined}
      className={cn(
        "flex h-7 shrink-0 items-center rounded-md px-2 text-muted-foreground text-xs outline-hidden transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring data-active:bg-muted data-active:font-medium data-active:text-foreground",
        className
      )}
      {...props}
    />
  )
}

const SettingsSection = PageSection

export { SettingsNavItem, SettingsPage, SettingsSection }
