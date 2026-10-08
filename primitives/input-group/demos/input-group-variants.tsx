import { MailIcon, SearchIcon } from "lucide-react"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group"

export function InputGroupVariants() {
  return (
    <FieldGroup className="max-w-sm">
      <InputGroup>
        <InputGroupAddon>
          <SearchIcon />
        </InputGroupAddon>
        <InputGroupInput aria-label="Search" placeholder="Search..." />
      </InputGroup>
      <Field>
        <FieldLabel htmlFor="input-group-variants-email">
          Email address
        </FieldLabel>
        <InputGroup>
          <InputGroupInput
            id="input-group-variants-email"
            placeholder="you@example.com"
          />
          <InputGroupAddon align="inline-end">
            <MailIcon />
          </InputGroupAddon>
        </InputGroup>
      </Field>
      <Field>
        <FieldLabel htmlFor="input-group-variants-website">Website</FieldLabel>
        <InputGroup>
          <InputGroupAddon>
            <InputGroupText>https://</InputGroupText>
          </InputGroupAddon>
          <InputGroupInput
            id="input-group-variants-website"
            placeholder="example.com"
          />
        </InputGroup>
      </Field>
    </FieldGroup>
  )
}
