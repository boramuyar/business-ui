import {
  CircleCheckIcon,
  InfoIcon,
  OctagonXIcon,
  TerminalIcon,
  TriangleAlertIcon,
} from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export function AlertVariants() {
  return (
    <>
      <Alert>
        <TerminalIcon />
        <AlertTitle>Heads up</AlertTitle>
        <AlertDescription>
          Default alerts carry neutral information.
        </AlertDescription>
      </Alert>
      <Alert variant="success">
        <CircleCheckIcon />
        <AlertTitle>Registry built</AlertTitle>
        <AlertDescription>
          All 54 items generated successfully.
        </AlertDescription>
      </Alert>
      <Alert variant="warning">
        <TriangleAlertIcon />
        <AlertTitle>Token expiring</AlertTitle>
        <AlertDescription>
          Your GitHub token expires in 3 days.
        </AlertDescription>
      </Alert>
      <Alert variant="info">
        <InfoIcon />
        <AlertTitle>New primitives available</AlertTitle>
        <AlertDescription>Run the add command to update.</AlertDescription>
      </Alert>
      <Alert variant="destructive">
        <OctagonXIcon />
        <AlertTitle>Build failed</AlertTitle>
        <AlertDescription>
          The registry validation found errors.
        </AlertDescription>
      </Alert>
    </>
  )
}
