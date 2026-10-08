import { toast } from "sonner"

import { Button } from "@/components/ui/button"

export function SonnerComposition() {
  return (
    <>
      <Button
        onClick={() =>
          toast("Primitive added", {
            description: "badge installed into components/ui.",
            action: { label: "Undo", onClick: () => toast("Removed again") },
          })
        }
        variant="outline"
      >
        With description and action
      </Button>
      <Button
        onClick={() =>
          toast.promise(new Promise((resolve) => setTimeout(resolve, 1500)), {
            loading: "Building registry...",
            success: "54 items generated",
            error:
              "Registry build failed. Check the validation log and try again.",
          })
        }
        variant="outline"
      >
        Promise toast
      </Button>
    </>
  )
}
