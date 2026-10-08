import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

export function DrawerVariants() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Bottom (default)</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Filter invoices</DrawerTitle>
          <DrawerDescription>Drag down to dismiss.</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <Button>Apply filters</Button>
          <DrawerClose asChild>
            <Button variant="ghost">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
