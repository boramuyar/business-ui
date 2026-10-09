import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

export function ScrollAreaHorizontal() {
  return (
    <ScrollArea className="w-full max-w-sm border rounded-md whitespace-nowrap">
      <div className="flex gap-3 p-3">
        {["One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight"].map(
          (label) => (
            <div
              className="flex h-20 w-32 shrink-0 items-center justify-center border rounded-md bg-muted/50 text-xs"
              key={label}
            >
              {label}
            </div>
          )
        )}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  )
}
