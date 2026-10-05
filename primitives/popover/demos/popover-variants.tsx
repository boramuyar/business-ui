import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"

export function PopoverVariants() {
  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Bottom (default)</Button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverHeader>
            <PopoverTitle>Anchored panel</PopoverTitle>
            <PopoverDescription>Opens below the trigger.</PopoverDescription>
          </PopoverHeader>
        </PopoverContent>
      </Popover>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Top, start-aligned</Button>
        </PopoverTrigger>
        <PopoverContent align="start" side="top">
          <PopoverHeader>
            <PopoverTitle>Placement</PopoverTitle>
            <PopoverDescription>
              `side="top"` with `align="start"`.
            </PopoverDescription>
          </PopoverHeader>
        </PopoverContent>
      </Popover>
    </>
  )
}
