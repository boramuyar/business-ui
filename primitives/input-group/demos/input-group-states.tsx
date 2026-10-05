import { SearchIcon } from "lucide-react"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"

export function InputGroupStates() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <InputGroup>
        <InputGroupAddon>
          <SearchIcon />
        </InputGroupAddon>
        <InputGroupInput disabled placeholder="Disabled" />
      </InputGroup>
      <InputGroup>
        <InputGroupInput aria-invalid defaultValue="Invalid value" />
      </InputGroup>
    </div>
  )
}
