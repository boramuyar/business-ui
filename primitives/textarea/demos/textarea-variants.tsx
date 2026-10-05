import { Textarea } from "@/components/ui/textarea"

export function TextareaVariants() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <Textarea placeholder="Type your message here." />
    </div>
  )
}
