import { Field, FieldLabel } from "@/components/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group"

export function InputGroupBlock() {
  return (
    <Field className="max-w-sm">
      <FieldLabel htmlFor="input-group-block-message">
        Commit message
      </FieldLabel>
      <InputGroup>
        <InputGroupTextarea
          id="input-group-block-message"
          placeholder="Describe the change..."
        />
        <InputGroupAddon align="block-end">
          <InputGroupText>
            Max 72 characters in the subject line.
          </InputGroupText>
        </InputGroupAddon>
      </InputGroup>
    </Field>
  )
}
