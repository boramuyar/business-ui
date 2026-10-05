import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { InboxIcon } from "lucide-react"

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
          <EmptyMedia>
            <Avatar size="lg">
              <AvatarFallback>BU</AvatarFallback>
            </Avatar>
          </EmptyMedia>
          <EmptyTitle>No teammates yet</EmptyTitle>
          <EmptyDescription>Invite people to collaborate.</EmptyDescription>
        </EmptyHeader>
      </Empty>
    </>
  )
}
