import { ZoomInIcon, ZoomOutIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"

export function ButtonGroupVariants() {
  return (
    <>
      <ButtonGroup>
        <Button aria-label="Zoom out" variant="outline">
          <ZoomOutIcon />
        </Button>
        <Button variant="outline">100%</Button>
        <Button aria-label="Zoom in" variant="outline">
          <ZoomInIcon />
        </Button>
      </ButtonGroup>
      <ButtonGroup orientation="vertical">
        <Button variant="outline">Top</Button>
        <Button variant="outline">Middle</Button>
        <Button variant="outline">Bottom</Button>
      </ButtonGroup>
    </>
  )
}
