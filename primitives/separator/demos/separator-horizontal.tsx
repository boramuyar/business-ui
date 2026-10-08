import { Separator } from "@/components/ui/separator"

export function SeparatorHorizontal() {
  return (
    <div className="flex flex-col gap-3">
      <p className="font-medium text-foreground text-xs">Business UI</p>
      <Separator />
      <p className="text-muted-foreground text-xs">
        Primitives, shells, style and utilities.
      </p>
    </div>
  )
}
