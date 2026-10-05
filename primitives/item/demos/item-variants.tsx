import {
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item"

export function ItemVariants() {
  return (
    <>
      <Item>
        <ItemContent>
          <ItemTitle>Default item</ItemTitle>
          <ItemDescription>Borderless row.</ItemDescription>
        </ItemContent>
      </Item>
      <Item variant="outline">
        <ItemContent>
          <ItemTitle>Outline item</ItemTitle>
          <ItemDescription>Visible border.</ItemDescription>
        </ItemContent>
      </Item>
      <Item variant="muted">
        <ItemContent>
          <ItemTitle>Muted item</ItemTitle>
          <ItemDescription>Subtle background.</ItemDescription>
        </ItemContent>
      </Item>
    </>
  )
}
