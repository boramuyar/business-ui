import { Item, ItemActions, ItemContent, ItemMedia } from "@/components/ui/item"
import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonComposition() {
  return (
    <Item className="max-w-sm" variant="outline">
      <ItemMedia>
        <Skeleton className="size-8 rounded-full" />
      </ItemMedia>
      <ItemContent>
        <Skeleton className="h-3 w-1/2" />
        <Skeleton className="h-3 w-3/4" />
      </ItemContent>
      <ItemActions>
        <Skeleton className="h-6 w-14" />
      </ItemActions>
    </Item>
  )
}
