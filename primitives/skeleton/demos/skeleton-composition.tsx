import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"
import { Skeleton, SkeletonText } from "@/components/ui/skeleton"

const rows = [
  { title: "Northwind Traders", description: "Invoice INV-2041, due in 14 days" },
  { title: "Acme Corporation", description: "Invoice INV-2038, paid on Oct 2" },
  { title: "Globex", description: "Invoice INV-2035, overdue by 3 days" },
]

export function SkeletonComposition() {
  return (
    <ItemGroup className="w-full max-w-sm">
      {rows.map((row) => (
        <Item key={row.title} variant="divided" size="sm">
          <ItemMedia>
            <Skeleton className="size-8 rounded-full" />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>
              <SkeletonText>{row.title}</SkeletonText>
            </ItemTitle>
            <ItemDescription>
              <SkeletonText>{row.description}</SkeletonText>
            </ItemDescription>
          </ItemContent>
        </Item>
      ))}
    </ItemGroup>
  )
}
