import { cn } from "@/lib/utils"

/**
 * @component Skeleton
 * @level primitive
 * @summary Placeholder shapes shown while content loads.
 * @use Any content that is loading. Build the skeleton from the real
 *      components (item, table, card) so it has the same rows, columns and
 *      spacing as the loaded screen.
 * @use Text placeholders: SkeletonText inside the element that will hold the
 *      text, so each line keeps its real height.
 * @avoid Actions in progress: use spinner in the button.
 * @avoid Nothing to show: use empty.
 * @related spinner, empty, progress
 * @guide https://ui.uyar.design/design/patterns/feedback.md
 */
function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  )
}

/**
 * Stands in for text inside the element that will hold it, such as an
 * ItemTitle or a table cell. The text is invisible but still sets the line,
 * so the skeleton is as tall as the loaded content and wraps like it. Pass
 * sample text about as long as the real text.
 */
function SkeletonText({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="skeleton-text"
      aria-hidden="true"
      className={cn(
        "animate-pulse rounded-sm bg-muted box-decoration-clone text-transparent select-none",
        className
      )}
      {...props}
    />
  )
}

export { Skeleton, SkeletonText }
