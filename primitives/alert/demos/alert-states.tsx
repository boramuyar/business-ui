import { InfoIcon } from "lucide-react"
import { Alert, AlertTitle } from "@/components/ui/alert"

export function AlertStates() {
  return (
    <>
      <Alert>
        <AlertTitle>Title-only alert without an icon</AlertTitle>
      </Alert>
      <Alert variant="info">
        <InfoIcon />
        <AlertTitle>Icon and title only</AlertTitle>
      </Alert>
    </>
  )
}
