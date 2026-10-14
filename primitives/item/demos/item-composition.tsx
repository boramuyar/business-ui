import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from "@/components/ui/item"
import { FileTextIcon, FolderIcon, MoreHorizontalIcon } from "lucide-react"

export function ItemComposition() {
  return (
    <ItemGroup className="rounded-md border">
      <Item>
        <ItemMedia variant="icon">
          <FolderIcon />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>primitives/</ItemTitle>
          <ItemDescription>54 registry items</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Badge size="sm" variant="outline">
            folder
          </Badge>
        </ItemActions>
      </Item>
      <ItemSeparator />
      <Item>
        <ItemMedia>
          <Avatar>
            <AvatarFallback>BU</AvatarFallback>
          </Avatar>
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Boram Uyar</ItemTitle>
          <ItemDescription>Updated the style tokens</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button size="xs" variant="secondary">
            View
          </Button>
        </ItemActions>
      </Item>
      <ItemSeparator />
      <Item>
        <ItemContent>
          <ItemTitle asChild>
            <button type="button">Q3 budget review</button>
          </ItemTitle>
          <ItemDescription>
            The title opens the row; the menu stays separate.
          </ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button size="icon-sm" variant="ghost" aria-label="Actions">
            <MoreHorizontalIcon />
          </Button>
        </ItemActions>
      </Item>
      <ItemSeparator />
      <Item asChild>
        <a href="#composition">
          <ItemMedia variant="icon">
            <FileTextIcon />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Link item</ItemTitle>
            <ItemDescription>The whole row is an anchor.</ItemDescription>
          </ItemContent>
        </a>
      </Item>
    </ItemGroup>
  )
}
