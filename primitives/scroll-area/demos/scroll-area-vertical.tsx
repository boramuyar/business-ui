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
    <ScrollArea className="h-48 w-56 border">
      <div className="flex flex-col gap-2 p-3">
        <p className="font-medium text-foreground text-xs">Primitives</p>
        {items.map((name) => (
          <div className="flex flex-col gap-2" key={name}>
            <span className="font-mono text-muted-foreground text-xs">
              {name}
            </span>
            <Separator />
          </div>
        ))}
      </div>
    </ScrollArea>
  )
}
