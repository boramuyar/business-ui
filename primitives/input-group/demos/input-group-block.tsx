import {
  InputGroup,
  InputGroupAddon,
  InputGroupTextarea,
  InputGroupText,
} from "@/components/ui/input-group"

export function InputGroupBlock() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <InputGroup>
        <InputGroupAddon align="block-start">
          <InputGroupText>Commit message</InputGroupText>
        </InputGroupAddon>
        <InputGroupTextarea placeholder="Describe the change..." />
        <InputGroupAddon align="block-end">
          <InputGroupText>
            Max 72 characters in the subject line.
          </InputGroupText>
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}
