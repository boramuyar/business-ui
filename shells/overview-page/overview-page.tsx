/**
 * @shell OverviewPage
 * @level shell
 * @summary A dashboard: header, a row of key numbers, then charts and panels.
 * @closest list-page
 * @why An overview leads with numbers and trends instead of records, so it needs a stat row and a free panel grid that list-page does not offer.
 * @reuses Page, PageHeader, PageBody
 * @use Home screens, account health, reporting summaries.
 * @avoid Finding and acting on records: use list-page, with a small summary if needed.
 * @related card, chart, table, badge, tabs
 * @guide design/shells.md
 *
 * Rules:
 * - stats: two to four cards, each one number with a label and, if useful, the change since last period.
 * - children: panels in a grid. Charts take full width or half width, never thirds.
 * - Use chart colors only through the chart-* tokens.
 */
import type * as React from "react"
import { Page, PageBody, PageHeader } from "@/components/shells/page"

function OverviewPage({
  title,
  description,
  actions,
  tabs,
  stats,
  className,
  children,
}: {
  title: React.ReactNode
  description?: React.ReactNode
  actions?: React.ReactNode
  tabs?: React.ReactNode
  stats?: React.ReactNode
  className?: string
  children: React.ReactNode
}) {
  return (
    <Page className={className} data-shell="overview-page">
      <PageHeader actions={actions} description={description} title={title}>
        {tabs}
      </PageHeader>
      {stats ? (
        <div
          data-slot="overview-page-stats"
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {stats}
        </div>
      ) : null}
      <PageBody className="grid gap-4 lg:grid-cols-2 lg:[&>[data-span=full]]:col-span-2">
        {children}
      </PageBody>
    </Page>
  )
}

export { OverviewPage }
