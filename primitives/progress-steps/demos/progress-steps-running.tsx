import { ProgressCircle } from "@/components/ui/progress"
import { ProgressStep, ProgressSteps } from "@/components/ui/progress-steps"

export function ProgressStepsRunning() {
  return (
    <div className="flex w-full max-w-xs flex-col items-center gap-6">
      <ProgressCircle value={50} aria-label="Importing customers">
        <span className="text-lg font-medium">2 of 4</span>
      </ProgressCircle>
      <ProgressSteps className="self-stretch">
        <ProgressStep status="done">Upload customers.csv</ProgressStep>
        <ProgressStep status="done">Check the columns</ProgressStep>
        <ProgressStep status="running">Import 1,240 customers</ProgressStep>
        <ProgressStep>Send the summary email</ProgressStep>
      </ProgressSteps>
    </div>
  )
}
