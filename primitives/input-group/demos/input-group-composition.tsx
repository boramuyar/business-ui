import { SearchIcon } from "lucide-react"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { Kbd } from "@/components/ui/kbd"

export function InputGroupComposition() {
  return (
    <InputGroup className="max-w-sm">
      <InputGroupAddon>
        <SearchIcon />
      </InputGroupAddon>
      <InputGroupInput placeholder="Search pages and primitives..." />
      <InputGroupAddon align="inline-end">
        <Kbd>Ctrl</Kbd>
        <Kbd>K</Kbd>
      </InputGroupAddon>
    </InputGroup>
  )
}
