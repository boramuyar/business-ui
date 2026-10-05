import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronsUpDownIcon } from "lucide-react"

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
      <div className="border px-3 py-2 font-mono text-xs">
        boramuyar/business-ui
      </div>
      <CollapsibleContent className="flex flex-col gap-2">
        <div className="border px-3 py-2 font-mono text-xs">shadcn-ui/ui</div>
        <div className="border px-3 py-2 font-mono text-xs">vercel/next.js</div>
      </CollapsibleContent>
    </Collapsible>
  )
}
