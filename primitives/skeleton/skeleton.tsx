/**
 * @component Skeleton
 * @level primitive
 * @summary Placeholder shapes shown while content loads.
 * @use Loading content whose layout is known: table rows, cards, a detail
 *      page. Match the shape of the real content.
 * @avoid Actions in progress: use spinner in the button.
 * @avoid Nothing to show: use empty.
 * @related spinner, empty, progress
 * @guide https://ui.uyar.design/design/patterns/feedback.md
 */
import { cn } from "@/lib/utils"

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  )
}

export { Skeleton }
