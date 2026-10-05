import { Input } from "@/components/ui/input"

export function InputStates() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <Input disabled placeholder="Disabled" />
      <Input aria-invalid defaultValue="Invalid value" />
      <Input placeholder="Read only" readOnly value="Read-only value" />
    </div>
  )
}
