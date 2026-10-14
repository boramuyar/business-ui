import { FileInput } from "@/components/ui/file-input"

export function FileInputStates() {
  return (
    <div className="flex flex-col gap-3">
      <FileInput disabled />
      <FileInput aria-invalid />
    </div>
  )
}
