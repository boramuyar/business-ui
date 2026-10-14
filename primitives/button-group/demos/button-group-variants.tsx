import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"

export function ButtonGroupVariants() {
  return (
    <>
      <ButtonGroup>
        <Button variant="secondary">Day</Button>
        <Button variant="secondary">Week</Button>
        <Button variant="secondary">Month</Button>
      </ButtonGroup>
      <ButtonGroup orientation="vertical">
        <Button variant="secondary">Top</Button>
        <Button variant="secondary">Middle</Button>
        <Button variant="secondary">Bottom</Button>
      </ButtonGroup>
    </>
  )
}
