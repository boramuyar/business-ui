import { Item, ItemContent, ItemTitle } from "@/components/ui/item"

export function ItemSizes() {
  return (
    <>
      <Item size="xs" variant="outline">
        <ItemContent>
          <ItemTitle>Extra small</ItemTitle>
        </ItemContent>
      </Item>
      <Item size="sm" variant="outline">
        <ItemContent>
          <ItemTitle>Small</ItemTitle>
        </ItemContent>
      </Item>
      <Item variant="outline">
        <ItemContent>
          <ItemTitle>Default</ItemTitle>
        </ItemContent>
      </Item>
    </>
  )
}
