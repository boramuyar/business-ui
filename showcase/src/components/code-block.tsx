import { Button } from "@frontend/primitives/button"
import { cn } from "@frontend/utilities/cn"
import { CopyIcon } from "lucide-react"
import { copyText } from "../lib/copy-text"

export function CodeBlock({
  code,
  className,
  wrap = false,
}: {
  code: string
  className?: string
  /** Wrap long lines instead of scrolling, for narrow columns. */
  wrap?: boolean
}) {
  return (
    <div
      className={cn(
        "relative rounded-lg bg-muted/60 ring-1 ring-border/70 ring-inset",
        className
      )}
    >
      <pre
        className={cn(
          "py-3 font-mono text-xs leading-relaxed",
          wrap
            ? "pr-9 pl-3 break-words whitespace-pre-wrap"
            : "overflow-x-auto pr-11 pl-4"
        )}
      >
        <code>{code}</code>
      </pre>
      <Button
        aria-label="Copy code"
        className="absolute top-1.5 right-1.5 bg-muted text-muted-foreground"
        onClick={() => copyText(code)}
        size="icon-sm"
        variant="ghost"
      >
        <CopyIcon />
      </Button>
    </div>
  )
}
