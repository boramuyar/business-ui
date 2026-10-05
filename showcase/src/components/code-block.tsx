import { Button } from "@frontend/primitives/button"
import { CopyIcon } from "lucide-react"
import { copyText } from "../lib/copy-text"

export function CodeBlock({ code }: { code: string }) {
  return (
    <div className="group/code-block relative border bg-muted/40">
      <pre className="overflow-x-auto p-3 pr-10 font-mono text-xs leading-relaxed">
        <code>{code}</code>
      </pre>
      <Button
        aria-label="Copy code"
        className="absolute top-1 right-1 opacity-0 transition-opacity focus-visible:opacity-100 group-hover/code-block:opacity-100"
        onClick={() => copyText(code)}
        size="icon-xs"
        variant="ghost"
      >
        <CopyIcon />
      </Button>
    </div>
  )
}
