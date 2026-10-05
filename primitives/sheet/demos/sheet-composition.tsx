import { Button } from "@/components/ui/button"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

export function SheetComposition() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>Edit profile</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>Changes apply after you save.</SheetDescription>
        </SheetHeader>
        <FieldGroup className="px-3">
          <Field>
            <FieldLabel htmlFor="sheet-demo-name">Name</FieldLabel>
            <Input defaultValue="Boram Uyar" id="sheet-demo-name" />
          </Field>
          <Field>
            <FieldLabel htmlFor="sheet-demo-role">Role</FieldLabel>
            <Input defaultValue="Design engineer" id="sheet-demo-role" />
          </Field>
        </FieldGroup>
        <SheetFooter>
          <SheetClose asChild>
            <Button variant="ghost">Cancel</Button>
          </SheetClose>
          <Button>Save changes</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
