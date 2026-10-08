import { ChevronsUpDownIcon } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Item, ItemContent, ItemTitle } from "@/components/ui/item"

export function CollapsibleControlled() {
  const [open, setOpen] = useState(false)

  return (
    <Collapsible
      className="flex w-full max-w-sm flex-col gap-2"
      onOpenChange={setOpen}
      open={open}
    >
      <div className="flex items-center justify-between">
        <span className="font-medium text-xs">
          @boramuyar starred 3 repositories
        </span>
        <CollapsibleTrigger asChild>
          <Button aria-label="Toggle list" size="icon-sm" variant="ghost">
            <ChevronsUpDownIcon />
          </Button>
        </CollapsibleTrigger>
      </div>
      <Item size="sm" variant="outline">
        <ItemContent>
          <ItemTitle className="font-mono">boramuyar/business-ui</ItemTitle>
        </ItemContent>
      </Item>
      <CollapsibleContent className="flex flex-col gap-2">
        <Item size="sm" variant="outline">
          <ItemContent>
            <ItemTitle className="font-mono">shadcn-ui/ui</ItemTitle>
          </ItemContent>
        </Item>
        <Item size="sm" variant="outline">
          <ItemContent>
            <ItemTitle className="font-mono">vercel/next.js</ItemTitle>
          </ItemContent>
        </Item>
      </CollapsibleContent>
    </Collapsible>
  )
}
