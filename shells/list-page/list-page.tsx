/**
 * @shell ListPage
 * @level shell
 * @summary A screen that shows many records of one kind: header, optional summary, toolbar, then a table or card grid.
 * @closest page
 * @why Most business screens are collections. Fixing where search, filters, the create action and the table go makes every list in an app work the same way.
 * @reuses Page, PageHeader, PageToolbar, PageBody
 * @use Customers, invoices, orders, users: any screen whose job is to find and act on records.
 * @avoid One record's details: use detail-page.
 * @avoid A dashboard of numbers and charts: use overview-page.
 * @related table, empty, pagination, input-group, dropdown-menu, toggle-group
 * @guide https://ui.uyar.design/design/shells.md
 *
 * Slots:
 * - actions: one primary "New …" button, plus outline buttons for import or export.
 * - filters: search first (input-group), then filter popovers or selects.
 * - view: right side of the toolbar. A toggle-group for list/board, or column settings.
 * - summary: up to four stat cards, only when the numbers change what people do next.
 * - children: a table, or a card grid when records are visual. Show empty when there are no rows.
 */
import type * as React from "react"
import {
  Page,
  PageBody,
  PageHeader,
  PageToolbar,
  type PageWidth,
} from "@/components/shells/page"

function ListPage({
  title,
  description,
  actions,
  breadcrumb,
  tabs,
  summary,
  filters,
  view,
  width = "default",
  className,
  children,
}: {
  title: React.ReactNode
  description?: React.ReactNode
  actions?: React.ReactNode
  breadcrumb?: React.ReactNode
  tabs?: React.ReactNode
  summary?: React.ReactNode
  filters?: React.ReactNode
  view?: React.ReactNode
  width?: PageWidth
  className?: string
  children: React.ReactNode
}) {
  return (
    <Page className={className} data-shell="list-page" width={width}>
      <PageHeader
        actions={actions}
        breadcrumb={breadcrumb}
        description={description}
        title={title}
      >
        {tabs}
      </PageHeader>
      {summary ? (
        <div
          data-slot="list-page-summary"
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {summary}
        </div>
      ) : null}
      {filters || view ? <PageToolbar end={view}>{filters}</PageToolbar> : null}
      <PageBody>{children}</PageBody>
    </Page>
  )
}

export { ListPage }
