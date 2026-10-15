import { Progress as ProgressPrimitive } from "radix-ui"
import type * as React from "react"
import { cn } from "@/lib/utils"

/**
 * @component Progress
 * @level primitive
 * @summary A bar showing how far a task or quota has come.
 * @use Uploads, imports and multi-step work with a known end; quota usage.
 * @use ProgressCircle: the main indicator of a screen given over to one
 *      task, such as a comparison or an import, with its steps listed below.
 * @avoid Unknown duration: use spinner or skeleton.
 * @related spinner, skeleton, progress-steps
 * @guide https://ui.uyar.design/design/patterns/feedback.md
 */
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

/** A ring that fills clockwise; `children` sit in its center, such as "2 of 4". */
function ProgressCircle({
  className,
  value,
  children,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root>) {
  const filled = Math.min(100, Math.max(0, value ?? 0))
  return (
    <ProgressPrimitive.Root
      data-slot="progress-circle"
      value={value}
      className={cn(
        "relative inline-grid size-24 shrink-0 place-items-center",
        className
      )}
      {...props}
    >
      <svg
        viewBox="0 0 36 36"
        aria-hidden="true"
        className="absolute inset-0 size-full -rotate-90"
      >
        <circle
          cx="18"
          cy="18"
          r="16"
          fill="none"
          strokeWidth="2.5"
          className="stroke-muted"
        />
        <ProgressPrimitive.Indicator asChild>
          <circle
            data-slot="progress-circle-indicator"
            cx="18"
            cy="18"
            r="16"
            fill="none"
            strokeWidth="2.5"
            // A round cap on an empty ring would still draw a dot.
            strokeLinecap={filled > 0 ? "round" : "butt"}
            pathLength={100}
            strokeDasharray={100}
            strokeDashoffset={100 - filled}
            className="stroke-brand transition-[stroke-dashoffset] duration-500"
          />
        </ProgressPrimitive.Indicator>
      </svg>
      {children}
    </ProgressPrimitive.Root>
  )
}

export { Progress, ProgressCircle }
