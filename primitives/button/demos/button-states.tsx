import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"

export function ButtonStates() {
  return (
    <>
      <Button disabled>Disabled</Button>
      <Button disabled variant="outline">
        <Spinner />
        Saving...
      </Button>
      <Button asChild variant="outline">
        <a href="#states">Anchor button</a>
      </Button>
    </>
  )
}
