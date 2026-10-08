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
        onClick={() =>
          toast.warning("Invoice sent without attachment", {
            description: "The PDF was larger than 10 MB.",
          })
        }
        variant="outline"
      >
        Warning
      </Button>
      <Button
        onClick={() =>
          toast.error("Could not send invoice", {
            description: "The mail server did not respond.",
            action: { label: "Retry", onClick: () => {} },
          })
        }
        variant="outline"
      >
        Error
      </Button>
    </>
  )
}
