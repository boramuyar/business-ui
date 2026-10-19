import { LayoutGridIcon, PlusIcon } from "lucide-react"
import {
  Pane,
  PaneAppBar,
  PaneAppBarButton,
  PaneBody,
  PaneFooter,
  PaneHeader,
  PaneTitle,
} from "@/components/shells/pane"
import { Button } from "@/components/ui/button"
import { Item, ItemContent, ItemDescription, ItemGroup, ItemTitle } from "@/components/ui/item"

const solvers = [
  { name: "Level premium", target: "Pricing!C12 · 1,250" },
  { name: "Breakeven lapse", target: "Lapse!D8 · 0.04" },
  { name: "Reserve", target: "Reserve!F40 · 0" },
]

export function PaneAppBarDemo() {
  return (
    <div className="flex h-96 w-full max-w-sm flex-col overflow-hidden rounded-lg border">
      <PaneAppBar
        leading={
          <PaneAppBarButton label="All apps">
            <LayoutGridIcon />
          </PaneAppBarButton>
        }
      >
        Solver
      </PaneAppBar>
      <Pane className="min-h-0 flex-1">
        <PaneHeader
          actions={
            <Button variant="ghost" size="icon-sm" tooltip="Create solver" aria-label="Create solver">
              <PlusIcon />
            </Button>
          }
        >
          <PaneTitle>Solvers</PaneTitle>
        </PaneHeader>
        <PaneBody>
          <ItemGroup>
            {solvers.map((solver) => (
              <Item key={solver.name} variant="divided" size="sm">
                <ItemContent>
                  <ItemTitle>{solver.name}</ItemTitle>
                  <ItemDescription>{solver.target}</ItemDescription>
                </ItemContent>
              </Item>
            ))}
          </ItemGroup>
        </PaneBody>
        <PaneFooter>
          <Button>Execute solvers</Button>
        </PaneFooter>
      </Pane>
    </div>
  )
}
