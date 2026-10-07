/**
 * @shell DetailPage
 * @level shell
 * @summary One record on its own screen: header with record actions, a main column, and an optional fixed-width aside.
 * @closest page
 * @why Records need a stable place for their key facts and actions. A fixed aside keeps status, owner and dates in the same spot on every record type.
 * @reuses Page, PageHeader, PageBody
 * @use An invoice, a customer, an order: anything opened from a list-page row.
 * @avoid Quick edits that keep the list in view: use sheet from the list-page instead.
 * @avoid Editing the record as a form: use form-page.
 * @related breadcrumb, tabs, card, item, badge, sheet
 * @guide https://ui.uyar.design/design/shells.md
 *
 * Slots:
 * - breadcrumb: the path back to the list.
 * - actions: one primary action for the next step (Send, Approve), outline buttons, and a dropdown-menu for the rest.
 * - tabs: when the record has several areas (Overview, Activity, Files).
 * - aside: key facts as label and value pairs: status badge, owner, dates, totals.
 * - children: the main content, grouped with PageSection or card.
 */
import type * as React from "react"
import { Page, PageBody, PageHeader } from "@/components/shells/page"

function DetailPage({
  title,
  description,
  actions,
  breadcrumb,
  tabs,
  aside,
  className,
  children,
}: {
  title: React.ReactNode
  description?: React.ReactNode
  actions?: React.ReactNode
  breadcrumb?: React.ReactNode
  tabs?: React.ReactNode
  aside?: React.ReactNode
  className?: string
  children: React.ReactNode
}) {
  return (
    <Page className={className} data-shell="detail-page">
      <PageHeader
        actions={actions}
        breadcrumb={breadcrumb}
        description={description}
        title={title}
      >
        {tabs}
      </PageHeader>
      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_18rem]">
        <PageBody>{children}</PageBody>
        {aside ? (
          <aside
            data-slot="detail-page-aside"
            className="flex min-w-0 flex-col gap-4 lg:sticky lg:top-6"
          >
            {aside}
          </aside>
        ) : null}
      </div>
    </Page>
  )
}

export { DetailPage }
