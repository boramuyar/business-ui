/**
 * @component Spinner
 * @level primitive
 * @summary An animated indicator for work of unknown length.
 * @use Inside a button while its action runs, or a small area that is
 *      refreshing.
 * @avoid Loading a whole page or list: use skeleton.
 * @avoid Work with a known end: use progress.
 * @related skeleton, progress, button
 * @guide https://ui.uyar.design/design/patterns/feedback.md
 */
import type * as React from "react"
import { Loader2Icon } from "lucide-react"
import { cn } from "@/lib/utils"

function Spinner({ className, ...props }: React.ComponentPropsWithoutRef<"svg">) {
  return (
    <Loader2Icon
      role="status"
      aria-label="Loading"
      className={cn("size-3.5 animate-spin", className)}
      {...props}
    />
  )
}

export { Spinner }
