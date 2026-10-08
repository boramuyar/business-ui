import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

const items = [
  "accordion",
  "alert",
  "avatar",
  "badge",
  "button",
  "calendar",
  "card",
  "checkbox",
  "combobox",
  "command",
  "dialog",
  "drawer",
]

export function ScrollAreaVertical() {
  return (
    <ScrollArea className="h-48 w-56 border rounded-md">
      <div className="p-3">
        <p className="mb-2 font-medium text-foreground text-xs">Primitives</p>
        {items.map((name) => (
          <div key={name}>
            <span className="font-mono text-muted-foreground text-xs">
              {name}
            </span>
            <Separator className="my-2" />
          </div>
        ))}
      </div>
    </ScrollArea>
  )
}
