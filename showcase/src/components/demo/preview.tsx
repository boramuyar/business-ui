import { Alert, AlertDescription, AlertTitle } from "@frontend/primitives/alert"
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
import { CodeBlock } from "../code-block"
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
      <Alert variant="destructive">
        <AlertTitle>Demo not found</AlertTitle>
        <AlertDescription>
          Add {name}.tsx to the item's demos folder.
        </AlertDescription>
      </Alert>
    )
  }

  const { Component, source, isShell } = demo
  const code = source.trim()

  return (
    <Tabs className="gap-3" defaultValue="preview">
      <div className="flex items-center justify-between gap-2">
        <TabsList>
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="code">Code</TabsTrigger>
        </TabsList>
        <Button
          aria-label="Copy code"
          onClick={() => copyText(code)}
          size="icon-sm"
          tooltip="Copy code"
          variant="ghost"
        >
          <CopyIcon />
        </Button>
      </div>
      <TabsContent value="preview">
        {isShell ? (
          <iframe
            className="h-[40rem] w-full rounded-md bg-background ring-1 ring-border"
            src={`${import.meta.env.BASE_URL}demo/${name}`}
            title={`${name} demo`}
          />
        ) : (
          <PreviewFrame className={className} tall={tall}>
            <Component />
          </PreviewFrame>
        )}
      </TabsContent>
      <TabsContent value="code">
        <CodeBlock className="max-h-96 overflow-auto" code={code} />
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
        "flex min-h-40 flex-wrap items-center justify-center gap-4 rounded-md bg-background p-6 ring-1 ring-border",
        tall && "min-h-72",
        className
      )}
      data-slot="preview"
    >
      <PreviewContext.Provider value={true}>{children}</PreviewContext.Provider>
    </div>
  )
}
