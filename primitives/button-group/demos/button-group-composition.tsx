import { Button } from "@/components/ui/button"
import { ButtonGroup, ButtonGroupText } from "@/components/ui/button-group"
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export function ButtonGroupComposition() {
  return (
    <Field className="max-w-sm">
      <FieldLabel htmlFor="button-group-composition-website">
        Website
      </FieldLabel>
      <ButtonGroup>
        <ButtonGroupText>https://</ButtonGroupText>
        <Input
          id="button-group-composition-website"
          placeholder="example.com"
        />
        <Button variant="outline">Visit</Button>
      </ButtonGroup>
    </Field>
  )
}
