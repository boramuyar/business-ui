import { toast } from "sonner"

import { Button } from "@/components/ui/button"

export function SonnerVariants() {
  return (
    <>
      <Button onClick={() => toast("A plain message")} variant="outline">
        Default
      </Button>
      <Button onClick={() => toast.success("Registry built")} variant="outline">
        Success
      </Button>
      <Button
        onClick={() => toast.info("New primitives available")}
        variant="outline"
      >
        Info
      </Button>
      <Button
        onClick={() => toast.warning("Token expires soon")}
        variant="outline"
      >
        Warning
      </Button>
      <Button
        onClick={() => toast.error("Validation failed")}
        variant="outline"
      >
        Error
      </Button>
    </>
  )
}
