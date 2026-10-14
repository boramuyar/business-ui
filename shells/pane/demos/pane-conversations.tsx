import { ArrowLeftIcon, ChevronRightIcon, SearchIcon } from "lucide-react"
import {
  Pane,
  PaneBody,
  PaneFooter,
  PaneHeader,
  PaneTitle,
  PaneToolbar,
} from "@/components/shells/pane"
import { Button } from "@/components/ui/button"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemTitle,
} from "@/components/ui/item"

const conversations = [
  { id: "q3", title: "Q3 budget review", updated: "Today, 10:42" },
  { id: "fx", title: "FX exposure by region", updated: "Yesterday, 16:05" },
  { id: "close", title: "Month-end close checklist", updated: "Oct 9, 09:12" },
  { id: "hire", title: "Hiring plan assumptions", updated: "Oct 2, 14:30" },
]

export function PaneConversations() {
  return (
    <div className="h-[480px] w-[360px] overflow-hidden rounded-md border">
      <Pane>
        <PaneHeader
          leading={
            <Button variant="ghost" size="icon-sm" aria-label="Back">
              <ArrowLeftIcon />
            </Button>
          }
        >
          <PaneTitle>Chats</PaneTitle>
        </PaneHeader>
        <PaneToolbar>
          <InputGroup>
            <InputGroupAddon>
              <SearchIcon />
            </InputGroupAddon>
            <InputGroupInput placeholder="Search chats" aria-label="Search chats" />
          </InputGroup>
        </PaneToolbar>
        <PaneBody>
          <ItemGroup className="gap-0">
            {conversations.map((conversation) => (
              <Item key={conversation.id} size="sm" asChild>
                <a href={`#${conversation.id}`}>
                  <ItemContent>
                    <ItemTitle>{conversation.title}</ItemTitle>
                    <ItemDescription>{conversation.updated}</ItemDescription>
                  </ItemContent>
                  <ItemActions>
                    <ChevronRightIcon className="text-muted-foreground" />
                  </ItemActions>
                </a>
              </Item>
            ))}
          </ItemGroup>
        </PaneBody>
        <PaneFooter>
          <Button variant="secondary">Import</Button>
          <Button>New chat</Button>
        </PaneFooter>
      </Pane>
    </div>
  )
}
