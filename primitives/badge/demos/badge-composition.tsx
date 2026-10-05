import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export function BadgeComposition() {
  return (
    <Button variant="outline">
      Inbox
      <Badge variant="secondary">12</Badge>
    </Button>
  )
}
