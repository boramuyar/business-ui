import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"

export function ButtonStates() {
  return (
    <>
      <Button disabled>Disabled</Button>
      <Button disabled variant="secondary">
        <Spinner />
        Saving...
      </Button>
      <Button asChild variant="secondary">
        <a href="#states">Anchor button</a>
      </Button>
    </>
  )
}
