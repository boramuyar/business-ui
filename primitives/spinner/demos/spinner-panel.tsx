import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Spinner } from "@/components/ui/spinner"

export function SpinnerPanel() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Open invoices</CardTitle>
        <CardDescription>Updated a minute ago</CardDescription>
        <CardAction>
          <Button
            aria-label="Refreshing"
            disabled
            size="icon-sm"
            variant="ghost"
          >
            <Spinner />
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className="font-semibold text-2xl tabular-nums">
        €12,480
      </CardContent>
    </Card>
  )
}
