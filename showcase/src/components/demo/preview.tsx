import { Button } from "@frontend/primitives/button"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@frontend/primitives/tabs"
import { cn } from "@frontend/utilities"
import { CopyIcon } from "lucide-react"
import { createContext, type ReactNode, useContext } from "react"
import { copyText } from "../../lib/copy-text"
import { getDemo } from "./demo-registry"

const PreviewContext = createContext(false)

export function useIsInsidePreview() {
  return useContext(PreviewContext)
}

export function Preview({
  children,
  tall = false,
  className,
  name,
}: {
  children?: ReactNode
  tall?: boolean
  className?: string
  name?: string
}) {
  if (!name) {
    return (
      <PreviewFrame className={className} tall={tall}>
        {children}
      </PreviewFrame>
    )
  }

  const demo = getDemo(name)

  if (!demo) {
    return (
      <div className="rounded-lg border border-dashed p-6 text-muted-foreground text-sm">
        Demo `{name}` was not found.
      </div>
    )
  }

  const { Component, source } = demo

  return (
    <Tabs
      className="gap-0 overflow-hidden rounded-lg ring-1 ring-border"
      defaultValue="preview"
    >
      <div className="flex items-center justify-between border-b px-3">
        <TabsList variant="line">
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="code">Code</TabsTrigger>
        </TabsList>
        <Button
          aria-label="Copy code"
          className="text-muted-foreground"
          onClick={() => copyText(source.trim())}
          size="icon-sm"
          variant="ghost"
        >
          <CopyIcon />
        </Button>
      </div>
      <TabsContent value="preview">
        <PreviewFrame
          className={cn("rounded-none ring-0", className)}
          tall={tall}
        >
          <Component />
        </PreviewFrame>
      </TabsContent>
      <TabsContent value="code">
        <pre
          className="max-h-96 overflow-auto bg-muted/40 px-4 py-3 text-left font-mono text-xs leading-relaxed"
          data-slot="code"
        >
          <code>{source.trim()}</code>
        </pre>
      </TabsContent>
    </Tabs>
  )
}

function PreviewFrame({
  children,
  tall = false,
  className,
}: {
  children?: ReactNode
  tall?: boolean
  className?: string
}) {
  return (
    <div
      className={cn(
        "flex min-h-40 flex-wrap items-center justify-center gap-4 rounded-lg bg-background p-10 ring-1 ring-border",
        tall && "min-h-72",
        className
      )}
      data-slot="preview"
    >
      <PreviewContext.Provider value={true}>{children}</PreviewContext.Provider>
    </div>
  )
}
