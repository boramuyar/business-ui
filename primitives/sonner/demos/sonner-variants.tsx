import { toast } from "sonner"

import { Button } from "@/components/ui/button"

export function SonnerVariants() {
  return (
    <>
      <Button onClick={() => toast("A plain message")} variant="secondary">
        Default
      </Button>
      <Button onClick={() => toast.success("Registry built")} variant="secondary">
        Success
      </Button>
      <Button
        onClick={() => toast.info("New primitives available")}
        variant="secondary"
      >
        Info
      </Button>
      <Button
        onClick={() => toast.warning("Token expires soon")}
        variant="secondary"
      >
        Warning
      </Button>
      <Button
        onClick={() => toast.error("Validation failed")}
        variant="secondary"
      >
        Error
      </Button>
    </>
  )
}
