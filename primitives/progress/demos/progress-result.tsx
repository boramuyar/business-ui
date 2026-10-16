import { ProgressResult } from "@/components/ui/progress"

export function ProgressResultDemo() {
  return (
    <div className="flex flex-wrap items-start justify-center gap-8">
      {(
        [
          ["success", "All goals reached"],
          ["warning", "Some goals were not reached"],
          ["failed", "Aborted"],
        ] as const
      ).map(([status, heading]) => (
        <div key={status} className="flex w-40 flex-col items-center gap-3 text-center">
          <ProgressResult status={status} />
          <p className="font-semibold text-lg">{heading}</p>
        </div>
      ))}
    </div>
  )
}
