import { Button } from "@/components/ui/button"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

export function HoverCardVariants() {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link">@boramuyar</Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-64">
        <p className="font-medium text-foreground text-xs">@boramuyar</p>
        <p className="text-muted-foreground text-xs">
          Private shadcn registry with primitives, blocks, style, and utilities.
        </p>
      </HoverCardContent>
    </HoverCard>
  )
}
