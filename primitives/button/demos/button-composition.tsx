import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"

export function ButtonComposition() {
  return (
    <>
      <Button variant="outline">
        Inbox
        <Badge variant="secondary">12</Badge>
      </Button>
      <ButtonGroup>
        <Button variant="outline">Save draft</Button>
        <Button variant="outline">Discard draft</Button>
      </ButtonGroup>
    </>
  )
}
