import { DetailPage } from "@/components/shells/detail-page"
import { PageSection } from "@/components/shells/page"
import { Badge } from "@/components/ui/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const facts = [
  [
    "Status",
    <Badge key="status" variant="destructive">
      Overdue
    </Badge>,
  ],
  ["Customer", "Fabrikam AB"],
  ["Issued", "12 Sep 2026"],
  ["Due", "26 Sep 2026"],
  ["Total", "€1,180.50"],
] as const

export function DetailPageInvoice() {
  return (
    <DetailPage
      actions={
        <>
          <Button variant="outline">Download PDF</Button>
          <Button>Send reminder</Button>
        </>
      }
      aside={
        <Card size="sm">
          <CardHeader>
            <CardTitle>Details</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-xs">
              {facts.map(([label, value]) => (
                <div className="contents" key={label}>
                  <dt className="text-muted-foreground">{label}</dt>
                  <dd className="text-right tabular-nums">{value}</dd>
                </div>
              ))}
            </dl>
          </CardContent>
        </Card>
      }
      breadcrumb={
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Invoices</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>INV-1043</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      }
      className="py-0 md:py-0"
      description="Consulting hours for August."
      title="INV-1043"
    >
      <PageSection title="Line items">
        <div className="rounded-md border border-dashed p-6 text-center text-muted-foreground text-xs">
          Line items table
        </div>
      </PageSection>
      <PageSection title="Activity">
        <div className="rounded-md border border-dashed p-6 text-center text-muted-foreground text-xs">
          Activity feed
        </div>
      </PageSection>
    </DetailPage>
  )
}
