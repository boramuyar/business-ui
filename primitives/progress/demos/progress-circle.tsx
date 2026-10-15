import { ProgressCircle } from "@/components/ui/progress"

export function ProgressCircleDemo() {
  return (
    <div className="flex items-center gap-6">
      <ProgressCircle value={0} aria-label="Not started" />
      <ProgressCircle value={33} aria-label="One of three steps done">
        <span className="text-sm font-medium">1 of 3</span>
      </ProgressCircle>
      <ProgressCircle value={100} className="size-12" aria-label="Done" />
    </div>
  )
}
