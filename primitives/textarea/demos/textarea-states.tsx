import { Textarea } from "@/components/ui/textarea"

export function TextareaStates() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <Textarea disabled placeholder="Disabled" />
      <Textarea aria-invalid defaultValue="Invalid content" />
    </div>
  )
}
