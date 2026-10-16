import { PlayIcon, PlusIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Pane, PaneBody, PaneFloatingAction, PaneFooter } from "@/components/shells/pane"
import { Item, ItemContent, ItemDescription, ItemGroup, ItemTitle } from "@/components/ui/item"

const solvers = [
  { name: "Level premium", goal: "Pricing!F14 → 0" },
  { name: "Breakeven lapse", goal: "Lapse!D9 → 0" },
  { name: "Discount rate", goal: "ALM!C22 → 0.9612" },
  { name: "Reserve floor", goal: "Reserve!H4 → 0" },
  { name: "Capital target", goal: "Capital!B12 → 1.5" },
  { name: "Margin", goal: "Pricing!F30 → 0.05" },
]

export function PaneFloatingActionFooterDemo() {
  return (
    <div className="h-80 w-full max-w-sm overflow-hidden rounded-lg border">
      <Pane>
        <PaneBody>
          <ItemGroup>
            {solvers.map((solver) => (
              <Item key={solver.name} variant="divided" size="sm">
                <ItemContent>
                  <ItemTitle>{solver.name}</ItemTitle>
                  <ItemDescription className="font-mono">{solver.goal}</ItemDescription>
                </ItemContent>
              </Item>
            ))}
          </ItemGroup>
        </PaneBody>
        <PaneFloatingAction label="New solver">
          <PlusIcon />
        </PaneFloatingAction>
        <PaneFooter>
          <Button>
            <PlayIcon data-icon="inline-start" />
            Run all
          </Button>
        </PaneFooter>
      </Pane>
    </div>
  )
}
