import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemTitle,
} from "@/components/ui/item"

const skills = [
  ["Reconcile", "Matches two ranges and lists what differs."],
  ["Summarize", "Writes a short summary of the selected sheet."],
  ["Trace inputs", "Follows a cell back to the inputs it depends on."],
  ["Explain formula", "Says in words what a formula calculates."],
  ["Find outliers", "Marks values far from the rest of a column."],
  ["Tidy names", "Suggests clearer names for named ranges."],
]

export function DialogPane() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">Browse skills</Button>
      </DialogTrigger>
      <DialogContent size="pane">
        <DialogHeader className="shrink-0 border-b py-3 pr-12 pl-3">
          <DialogTitle>Skills</DialogTitle>
          <DialogDescription>
            Skills the assistant can use in this workbook.
          </DialogDescription>
        </DialogHeader>
        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto p-3">
          <ItemGroup className="rounded-md border">
            {skills.map(([name, description]) => (
              <Item key={name} variant="divided" className="last:border-b-0">
                <ItemContent>
                  <ItemTitle>{name}</ItemTitle>
                  <ItemDescription>{description}</ItemDescription>
                </ItemContent>
              </Item>
            ))}
          </ItemGroup>
        </div>
      </DialogContent>
    </Dialog>
  )
}
