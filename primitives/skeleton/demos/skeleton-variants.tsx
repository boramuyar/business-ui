import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonVariants() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <Skeleton className="h-4 w-2/3" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="size-10 rounded-full" />
      <Skeleton className="h-24 w-full" />
    </div>
  )
}
