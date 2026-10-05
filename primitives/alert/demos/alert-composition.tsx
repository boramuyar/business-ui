import { TriangleAlertIcon } from "lucide-react"
import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { Button } from "@/components/ui/button"

export function AlertComposition() {
  return (
    <Alert variant="warning">
      <TriangleAlertIcon />
      <AlertTitle>Unsaved changes</AlertTitle>
      <AlertDescription>Your edits are local only.</AlertDescription>
      <AlertAction>
        <Button size="xs" variant="outline">
          Save now
        </Button>
      </AlertAction>
    </Alert>
  )
}
