import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"

export function ResizableHorizontal() {
  return (
    <ResizablePanelGroup className="h-40 border" direction="horizontal">
      <ResizablePanel defaultSize={40}>
        <div className="flex h-full items-center justify-center text-xs">
          Sidebar
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={60}>
        <div className="flex h-full items-center justify-center text-xs">
          Content
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
