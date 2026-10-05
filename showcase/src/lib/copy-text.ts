import { toast } from "sonner"

export async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text)
    toast.success("Copied to clipboard")
  } catch {
    toast.error("Could not copy to clipboard")
  }
}
