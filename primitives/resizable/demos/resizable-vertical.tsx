import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"

export function ResizableVertical() {
  return (
    <ResizablePanelGroup
      className="min-h-48 border rounded-md"
      direction="vertical"
    >
      <ResizablePanel defaultSize={30}>
        <div className="flex h-full items-center justify-center text-xs">
          Header
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={70}>
        <div className="flex h-full items-center justify-center text-xs">
          Body
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
