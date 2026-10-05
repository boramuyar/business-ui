import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@frontend/primitives/input-group"
import { CopyIcon } from "lucide-react"
import { copyText } from "../lib/copy-text"

export function InstallCommand({ item }: { item: string }) {
  const command = `pnpm dlx shadcn@latest add boramuyar/business-ui/${item}`

  return (
    <InputGroup>
      <InputGroupInput className="font-mono text-xs" readOnly value={command} />
      <InputGroupAddon align="inline-end">
        <InputGroupButton
          aria-label="Copy install command"
          onClick={() => copyText(command)}
          size="icon-xs"
        >
          <CopyIcon />
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  )
}
