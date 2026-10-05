import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

const logoUrl = `${import.meta.env.BASE_URL}logo.svg`

export function HoverCardComposition() {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link">Boram Uyar</Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-72">
        <div className="flex gap-3">
          <Avatar>
            <AvatarImage alt="Boram Uyar" src={logoUrl} />
            <AvatarFallback>BU</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-1">
            <span className="flex items-center gap-2 font-medium text-foreground text-xs">
              Boram Uyar
              <Badge variant="secondary">Design</Badge>
            </span>
            <span className="text-muted-foreground text-xs">
              Maintains the Business UI registry.
            </span>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}
