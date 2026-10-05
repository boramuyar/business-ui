import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { InboxIcon } from "lucide-react"

export function EmptyComposition() {
  return (
    <Card className="w-full">
      <CardContent>
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <InboxIcon />
            </EmptyMedia>
            <EmptyTitle>No blocks yet</EmptyTitle>
            <EmptyDescription>
              Blocks are composed patterns built from primitives.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button size="sm">Create the first block</Button>
          </EmptyContent>
        </Empty>
      </CardContent>
    </Card>
  )
}
