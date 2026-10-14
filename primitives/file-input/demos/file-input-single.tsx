import { FileInput } from "@/components/ui/file-input"

export function FileInputSingle() {
  return <FileInput accept=".pdf,image/*" name="receipt" />
}
