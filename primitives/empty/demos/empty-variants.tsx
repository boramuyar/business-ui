import { InboxIcon, UsersIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"

export function EmptyVariants() {
  return (
    <>
      <Empty className="border border-dashed">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <InboxIcon />
          </EmptyMedia>
          <EmptyTitle>No notifications</EmptyTitle>
          <EmptyDescription>
            You are all caught up. New activity lands here.
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
      <Empty className="border border-dashed">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <UsersIcon />
          </EmptyMedia>
          <EmptyTitle>No teammates yet</EmptyTitle>
          <EmptyDescription>Invite people to collaborate.</EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button size="sm">Invite teammates</Button>
        </EmptyContent>
      </Empty>
    </>
  )
}
