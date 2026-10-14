import { FileInput } from "@/components/ui/file-input"

export function FileInputMultiple() {
  return (
    <div className="w-full max-w-sm">
      <FileInput multiple name="documents" />
    </div>
  )
}
