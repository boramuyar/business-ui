import { CopyIcon } from "lucide-react"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"

export function InputGroupSizes() {
  return (
    <FieldGroup className="max-w-sm">
      <Field>
        <FieldLabel htmlFor="input-group-sizes-command">
          Install command
        </FieldLabel>
        <InputGroup>
          <InputGroupInput
            id="input-group-sizes-command"
            readOnly
            value="pnpm dlx shadcn@latest add boramuyar/business-ui/button"
          />
          <InputGroupAddon align="inline-end">
            <InputGroupButton aria-label="Copy" size="icon-xs">
              <CopyIcon />
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </Field>
      <Field>
        <FieldLabel htmlFor="input-group-sizes-invite">
          Invite by email
        </FieldLabel>
        <InputGroup>
          <InputGroupInput
            id="input-group-sizes-invite"
            placeholder="name@example.com"
          />
          <InputGroupAddon align="inline-end">
            <InputGroupButton size="xs" variant="secondary">
              Send invite
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </Field>
    </FieldGroup>
  )
}
