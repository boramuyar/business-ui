/**
 * @component Progress
 * @level primitive
 * @summary A bar showing how far a task or quota has come.
 * @use Uploads, imports and multi-step work with a known end; quota usage.
 * @avoid Unknown duration: use spinner or skeleton.
 * @related spinner, skeleton
 * @guide design/patterns/feedback.md
 */
import { Progress as ProgressPrimitive } from "radix-ui"
import type * as React from "react"
import { cn } from "@/lib/utils"

function Progress({
  className,
  value,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root>) {
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(
        "relative flex h-1 w-full items-center overflow-x-hidden rounded-full bg-muted",
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className="size-full flex-1 bg-brand transition-all"
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  )
}

export { Progress }
