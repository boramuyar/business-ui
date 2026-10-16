import { CreditCardIcon, OctagonXIcon, TriangleAlertIcon } from "lucide-react"
import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { Button } from "@/components/ui/button"

export function AlertComposition() {
  return (
    <>
      <Alert variant="warning">
        <TriangleAlertIcon />
        <AlertTitle>Unsaved changes</AlertTitle>
        <AlertDescription>Your edits are local only.</AlertDescription>
        <AlertAction>
          <Button size="xs" variant="secondary">
            Save now
          </Button>
        </AlertAction>
      </Alert>
      <Alert variant="destructive">
        <OctagonXIcon />
        <AlertTitle>Bank sync failed</AlertTitle>
        <AlertDescription>
          Transactions after 12 Oct are missing.
        </AlertDescription>
        <AlertAction>
          <Button size="xs" variant="secondary">
            Retry
          </Button>
        </AlertAction>
      </Alert>
      <Alert>
        <CreditCardIcon />
        <AlertTitle>Card expires next month</AlertTitle>
        <AlertDescription>Update it to keep payouts running.</AlertDescription>
        <AlertAction>
          <Button size="xs">Update card</Button>
        </AlertAction>
      </Alert>
      <Alert variant="warning">
        <TriangleAlertIcon />
        <AlertDescription>The goal was not reached after 6 tries.</AlertDescription>
      </Alert>
    </>
  )
}
