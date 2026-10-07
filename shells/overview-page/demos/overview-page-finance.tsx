import { OverviewPage } from "@/components/shells/overview-page"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const stats = [
  { label: "Outstanding", value: "€48,210", change: "+12% vs last month" },
  { label: "Overdue", value: "€6,940", change: "3 invoices" },
  { label: "Paid this month", value: "€31,500", change: "+4% vs last month" },
  { label: "Avg. days to pay", value: "18", change: "−2 days" },
]

export function OverviewPageFinance() {
  return (
    <OverviewPage
      actions={<Button variant="outline">Last 30 days</Button>}
      className="py-0 md:py-0"
      description="Cash position across all customers."
      stats={stats.map((stat) => (
        <Card key={stat.label} size="sm">
          <CardHeader>
            <CardDescription>{stat.label}</CardDescription>
            <CardTitle className="font-semibold text-2xl tabular-nums">
              {stat.value}
            </CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground text-xs">
            {stat.change}
          </CardContent>
        </Card>
      ))}
      title="Overview"
    >
      <Card data-span="full">
        <CardHeader>
          <CardTitle>Revenue</CardTitle>
          <CardDescription>Invoiced and paid, by month.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-32 rounded-md bg-brand-subtle" />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Top customers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-24 rounded-md bg-muted" />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Overdue</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-24 rounded-md bg-muted" />
        </CardContent>
      </Card>
    </OverviewPage>
  )
}
