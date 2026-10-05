import { Button } from "@/components/ui/button"
import { ButtonGroup, ButtonGroupText } from "@/components/ui/button-group"
import { Input } from "@/components/ui/input"

export function ButtonGroupComposition() {
  return (
    <ButtonGroup>
      <ButtonGroupText>https://</ButtonGroupText>
      <Input placeholder="example.com" />
      <Button variant="outline">Visit</Button>
    </ButtonGroup>
  )
}
