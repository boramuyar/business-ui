import { ProgressStep, ProgressSteps } from "@/components/ui/progress-steps"

export function ProgressStepsFailed() {
  return (
    <ProgressSteps className="w-full max-w-xs">
      <ProgressStep status="done">Upload customers.csv</ProgressStep>
      <ProgressStep status="failed">Check the columns: the email column is missing</ProgressStep>
      <ProgressStep>Import customers</ProgressStep>
    </ProgressSteps>
  )
}
