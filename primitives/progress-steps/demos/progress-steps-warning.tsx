import { ProgressStep, ProgressSteps } from "@/components/ui/progress-steps"

export function ProgressStepsWarning() {
  return (
    <ProgressSteps className="w-full max-w-xs">
      <ProgressStep status="done">Level premium</ProgressStep>
      <ProgressStep status="warning">Discount rate: the goal was not reached</ProgressStep>
      <ProgressStep status="done">Breakeven lapse</ProgressStep>
    </ProgressSteps>
  )
}
