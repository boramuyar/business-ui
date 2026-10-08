import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

export function SheetVariants() {
  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">Right</Button>
        </SheetTrigger>
        <SheetContent side="right">
          <SheetHeader>
            <SheetTitle>Right sheet</SheetTitle>
            <SheetDescription>The default side.</SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">Left</Button>
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle>Left sheet</SheetTitle>
            <SheetDescription>
              Filters or a secondary record panel.
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">Top</Button>
        </SheetTrigger>
        <SheetContent side="top">
          <SheetHeader>
            <SheetTitle>Top sheet</SheetTitle>
            <SheetDescription>Banners and quick pickers.</SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">Bottom</Button>
        </SheetTrigger>
        <SheetContent side="bottom">
          <SheetHeader>
            <SheetTitle>Bottom sheet</SheetTitle>
            <SheetDescription>Use a drawer on touch screens.</SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </>
  )
}
