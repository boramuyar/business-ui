import { CartesianGrid, Line, LineChart, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const monthlyData = [
  { month: "Jan", desktop: 186, mobile: 80 },
  { month: "Feb", desktop: 305, mobile: 200 },
  { month: "Mar", desktop: 237, mobile: 120 },
  { month: "Apr", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "Jun", desktop: 214, mobile: 140 },
]

const chartConfig = {
  desktop: { label: "Desktop", color: "var(--chart-1)" },
  mobile: { label: "Mobile", color: "var(--chart-2)" },
}

export function ChartLine() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Visitors by device</CardTitle>
        <CardDescription>
          Desktop and mobile sessions, January to June.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer className="h-64 w-full" config={chartConfig}>
          <LineChart accessibilityLayer data={monthlyData}>
            <CartesianGrid vertical={false} />
            <XAxis
              axisLine={false}
              dataKey="month"
              tickLine={false}
              tickMargin={8}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Line
              dataKey="desktop"
              dot={false}
              stroke="var(--color-desktop)"
              strokeWidth={2}
              type="monotone"
            />
            <Line
              dataKey="mobile"
              dot={false}
              stroke="var(--color-mobile)"
              strokeWidth={2}
              type="monotone"
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
