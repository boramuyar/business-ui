import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function CardVariants() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Monthly active users</CardTitle>
        <CardDescription>Compared to the previous month.</CardDescription>
        <CardAction>
          <Badge variant="success">+12%</Badge>
        </CardAction>
      </CardHeader>
      <CardContent>
        <span className="font-semibold text-3xl tracking-tight">24,810</span>
      </CardContent>
      <CardFooter>
        <Button size="sm" variant="outline">
          View report
        </Button>
      </CardFooter>
    </Card>
  )
}
