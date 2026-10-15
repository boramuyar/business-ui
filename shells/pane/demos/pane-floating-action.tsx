import { FolderIcon, FolderPlusIcon } from "lucide-react"
import { Pane, PaneBody, PaneFloatingAction } from "@/components/shells/pane"
import { Item, ItemContent, ItemGroup, ItemMedia, ItemTitle } from "@/components/ui/item"

const folders = ["Pricing", "Underwriting", "Claims", "Reserving", "Treasury", "Capital model", "Reinsurance"]

export function PaneFloatingActionDemo() {
  return (
    <div className="h-80 w-full max-w-sm overflow-hidden rounded-lg border">
      <Pane>
        <PaneBody>
          <ItemGroup>
            {folders.map((folder) => (
              <Item key={folder} variant="divided" size="sm">
                <ItemMedia>
                  <FolderIcon className="size-4 text-muted-foreground" />
                </ItemMedia>
                <ItemContent>
                  <ItemTitle>{folder}</ItemTitle>
                </ItemContent>
              </Item>
            ))}
          </ItemGroup>
        </PaneBody>
        <PaneFloatingAction label="New folder">
          <FolderPlusIcon />
        </PaneFloatingAction>
      </Pane>
    </div>
  )
}
