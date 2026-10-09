import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"

export function ResizableNested() {
  return (
    <ResizablePanelGroup
      className="min-h-56 border rounded-md"
      direction="horizontal"
    >
      <ResizablePanel defaultSize={30} minSize={20}>
        <div className="flex h-full items-center justify-center text-xs">
          Explorer
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={70}>
        <ResizablePanelGroup direction="vertical">
          <ResizablePanel defaultSize={70}>
            <div className="flex h-full items-center justify-center text-xs">
              Editor
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={30} minSize={15}>
            <div className="flex h-full items-center justify-center text-xs">
              Terminal
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
