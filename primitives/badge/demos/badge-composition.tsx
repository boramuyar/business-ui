import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export function BadgeComposition() {
  return (
    <Button variant="secondary">
      Inbox
      <Badge variant="secondary" size="sm">
        12
      </Badge>
    </Button>
  )
}
