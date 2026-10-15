import { CheckIcon, XIcon } from "lucide-react"
import type * as React from "react"
import { Spinner } from "@/components/ui/spinner"
import { cn } from "@/lib/utils"

/**
 * @component Progress Steps
 * @level primitive
 * @summary The steps of running work, each done, running, pending or failed.
 * @use A task made of a few named steps that people wait for: comparing
 *      files, importing data, setting up an account. Pair it with a
 *      ProgressCircle for the share of steps done.
 * @avoid Steps people move through themselves: use a stepper pattern or tabs.
 * @avoid A single task with no named steps: use spinner or progress.
 * @related progress, spinner
 * @guide https://ui.uyar.design/design/patterns/feedback.md
 */
function ProgressSteps({ className, ...props }: React.ComponentProps<"ol">) {
  return (
    <ol
      data-slot="progress-steps"
      className={cn("flex flex-col gap-2.5", className)}
      {...props}
    />
  )
}

type ProgressStepStatus = "done" | "running" | "pending" | "failed"

const DEFAULT_STATUS_LABELS: Record<ProgressStepStatus, string> = {
  done: "Done",
  running: "In progress",
  pending: "Not started",
  failed: "Failed",
}

function ProgressStep({
  className,
  status = "pending",
  statusLabel = DEFAULT_STATUS_LABELS[status],
  children,
  ...props
}: React.ComponentProps<"li"> & {
  status?: ProgressStepStatus
  /** Read to screen readers after the step; defaults to English. */
  statusLabel?: string
}) {
  return (
    <li
      data-slot="progress-step"
      data-status={status}
      aria-current={status === "running" ? "step" : undefined}
      className={cn(
        "flex items-start gap-2 text-xs text-muted-foreground data-[status=done]:text-foreground data-[status=failed]:text-destructive-strong data-[status=running]:font-medium data-[status=running]:text-foreground",
        className
      )}
      {...props}
    >
      <ProgressStepMarker status={status} />
      <span className="min-w-0 flex-1">
        {children}
        <span className="sr-only">, {statusLabel}</span>
      </span>
    </li>
  )
}

const MARKER = "grid size-4 shrink-0 place-items-center rounded-full"

function ProgressStepMarker({ status }: { status: ProgressStepStatus }) {
  if (status === "done")
    return (
      <span aria-hidden="true" className={cn(MARKER, "bg-brand text-brand-foreground")}>
        <CheckIcon className="size-2.5" strokeWidth={3.5} />
      </span>
    )
  if (status === "failed")
    return (
      <span
        aria-hidden="true"
        className={cn(MARKER, "bg-destructive text-destructive-foreground")}
      >
        <XIcon className="size-2.5" strokeWidth={3.5} />
      </span>
    )
  if (status === "running")
    return (
      <span aria-hidden="true" className={MARKER}>
        <Spinner role="presentation" aria-label={undefined} className="size-4 text-brand" />
      </span>
    )
  return (
    <span aria-hidden="true" className={MARKER}>
      <span className="size-3 rounded-full border-[1.5px] border-foreground/25" />
    </span>
  )
}

export { ProgressStep, ProgressSteps, type ProgressStepStatus }
