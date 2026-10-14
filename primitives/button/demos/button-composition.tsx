import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"

export function ButtonComposition() {
  return (
    <>
      <Button variant="secondary">
        Inbox
        <Badge variant="secondary">12</Badge>
      </Button>
      <ButtonGroup>
        <Button variant="secondary">Save</Button>
        <Button variant="secondary">Discard</Button>
      </ButtonGroup>
    </>
  )
}
