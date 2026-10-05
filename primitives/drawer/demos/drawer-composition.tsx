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

export function DrawerComposition() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button>Release notes</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>What changed</DrawerTitle>
          <DrawerDescription>Scroll for the full list.</DrawerDescription>
        </DrawerHeader>
        <div className="max-h-48 overflow-y-auto px-4 text-muted-foreground text-xs">
          <ul className="flex list-disc flex-col gap-2 pl-4 pb-4">
            <li>Showcase redesigned around the registry primitives.</li>
            <li>Exhaustive MDX references for every primitive.</li>
            <li>Command palette with Ctrl+K.</li>
            <li>Dark mode via next-themes.</li>
            <li>Copy-to-clipboard install commands with toasts.</li>
            <li>Status filters on the primitives index.</li>
          </ul>
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
