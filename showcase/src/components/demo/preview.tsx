import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@frontend/primitives/tabs"
import { cn } from "@frontend/utilities"
import { createContext, type ReactNode, useContext } from "react"
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
      <div className="border border-dashed p-6 text-muted-foreground text-sm">
        Demo `{name}` was not found.
      </div>
    )
  }

  const { Component, source } = demo

  return (
    <Tabs className="overflow-hidden border" defaultValue="preview">
      <TabsList className="border-x-0 border-t-0">
        <TabsTrigger value="preview">Preview</TabsTrigger>
        <TabsTrigger value="code">Code</TabsTrigger>
      </TabsList>
      <TabsContent value="preview">
        <PreviewFrame className={cn("border-0", className)} tall={tall}>
          <Component />
        </PreviewFrame>
      </TabsContent>
      <TabsContent value="code">
        <pre
          className="max-h-96 overflow-auto bg-muted p-4 text-left font-mono text-xs leading-relaxed"
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
        "flex min-h-32 flex-wrap items-center justify-center gap-4 border bg-background p-8",
        tall && "min-h-72",
        className
      )}
      data-slot="preview"
    >
      <PreviewContext.Provider value={true}>{children}</PreviewContext.Provider>
    </div>
  )
}
