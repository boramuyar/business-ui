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
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty"
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

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

const lineItems = [
  {
    description: "Consulting, August",
    quantity: "12 h",
    price: "€85.00",
    amount: "€1,020.00",
  },
  {
    description: "Travel to Malmö",
    quantity: "1",
    price: "€160.50",
    amount: "€160.50",
  },
]

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
      description="Consulting hours for August."
      title="INV-1043"
    >
      <PageSection title="Line items">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Description</TableHead>
              <TableHead className="text-right">Quantity</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {lineItems.map((item) => (
              <TableRow key={item.description}>
                <TableCell>{item.description}</TableCell>
                <TableCell className="text-right tabular-nums">
                  {item.quantity}
                </TableCell>
                <TableCell className="text-right tabular-nums">
                  {item.price}
                </TableCell>
                <TableCell className="text-right tabular-nums">
                  {item.amount}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total</TableCell>
              <TableCell className="text-right tabular-nums">
                €1,180.50
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </PageSection>
      <PageSection title="Activity">
        <Empty className="border">
          <EmptyHeader>
            <EmptyTitle>No activity yet</EmptyTitle>
            <EmptyDescription>
              Reminders, payments and comments appear here.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      </PageSection>
    </DetailPage>
  )
}
