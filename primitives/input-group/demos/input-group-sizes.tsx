import { CopyIcon } from "lucide-react"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"

export function InputGroupSizes() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <InputGroup>
        <InputGroupInput
          readOnly
          value="pnpm dlx shadcn@latest add boramuyar/business-ui/button"
        />
        <InputGroupAddon align="inline-end">
          <InputGroupButton aria-label="Copy" size="icon-xs">
            <CopyIcon />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupInput placeholder="Invite by email" />
        <InputGroupAddon align="inline-end">
          <InputGroupButton size="xs" variant="secondary">
            Send invite
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}
