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
    <>
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant="outline">Bottom (default)</Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Bottom drawer</DrawerTitle>
            <DrawerDescription>Drag down to dismiss.</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <Button>Confirm</Button>
            <DrawerClose asChild>
              <Button variant="ghost">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant="outline">Full width</Button>
        </DrawerTrigger>
        <DrawerContent size="full">
          <DrawerHeader>
            <DrawerTitle>Full-width drawer</DrawerTitle>
            <DrawerDescription>
              Spans the whole screen, for wide content such as a table.
            </DrawerDescription>
          </DrawerHeader>
        </DrawerContent>
      </Drawer>
      <Drawer direction="right">
        <DrawerTrigger asChild>
          <Button variant="outline">Right</Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Right drawer</DrawerTitle>
            <DrawerDescription>Desktop side panel feel.</DrawerDescription>
          </DrawerHeader>
        </DrawerContent>
      </Drawer>
    </>
  )
}
