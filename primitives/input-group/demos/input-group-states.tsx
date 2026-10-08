import { SearchIcon } from "lucide-react"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"

export function InputGroupStates() {
  return (
    <FieldGroup className="max-w-sm">
      <InputGroup>
        <InputGroupAddon>
          <SearchIcon />
        </InputGroupAddon>
        <InputGroupInput aria-label="Search" disabled placeholder="Disabled" />
      </InputGroup>
      <Field data-invalid="true">
        <FieldLabel htmlFor="input-group-states-invalid">Domain</FieldLabel>
        <InputGroup>
          <InputGroupInput
            aria-invalid
            defaultValue="acme"
            id="input-group-states-invalid"
          />
        </InputGroup>
        <FieldError>Enter a full domain, such as acme.com.</FieldError>
      </Field>
    </FieldGroup>
  )
}
