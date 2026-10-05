import { CopyIcon, PlusIcon, SettingsIcon, TrashIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ButtonIconSizes() {
  return (
    <>
      <Button aria-label="Add" size="icon-xs" variant="outline">
        <PlusIcon />
      </Button>
      <Button aria-label="Copy" size="icon-sm" variant="outline">
        <CopyIcon />
      </Button>
      <Button aria-label="Settings" size="icon" variant="outline">
        <SettingsIcon />
      </Button>
      <Button aria-label="Delete" size="icon-lg" variant="destructive">
        <TrashIcon />
      </Button>
    </>
  )
}
