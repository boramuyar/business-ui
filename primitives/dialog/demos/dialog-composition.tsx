import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export function DialogComposition() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Rename</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Rename project</DialogTitle>
        </DialogHeader>
        <Field>
          <FieldLabel htmlFor="dialog-demo-project-name">
            Project name
          </FieldLabel>
          <Input defaultValue="Business UI" id="dialog-demo-project-name" />
        </Field>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost">Cancel</Button>
          </DialogClose>
          <Button>Rename project</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
