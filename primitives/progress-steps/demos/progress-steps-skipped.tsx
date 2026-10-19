import { ProgressStep, ProgressSteps } from "@/components/ui/progress-steps"

export function ProgressStepsSkipped() {
  return (
    <ProgressSteps className="w-full max-w-xs">
      <ProgressStep status="done">Level premium</ProgressStep>
      <ProgressStep status="skipped">Discount rate: its Run if is FALSE</ProgressStep>
      <ProgressStep status="running">Breakeven lapse</ProgressStep>
    </ProgressSteps>
  )
}
