import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export function DialogControlled() {
  const [open, setOpen] = useState(false)

  return (
    <div className="flex flex-col items-center gap-2">
      <Dialog onOpenChange={setOpen} open={open}>
        <DialogTrigger asChild>
          <Button variant="outline">Controlled dialog</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Controlled open state</DialogTitle>
            <DialogDescription>
              The open state lives in React state, so surrounding UI can react
              to it.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setOpen(false)}>Done</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <span className="text-muted-foreground text-xs">
        Dialog is {open ? "open" : "closed"}
      </span>
    </div>
  )
}
