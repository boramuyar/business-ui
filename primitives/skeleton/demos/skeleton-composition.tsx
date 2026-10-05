import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonComposition() {
  return (
    <div className="flex w-full max-w-sm items-center gap-3 border p-3">
      <Skeleton className="size-8 shrink-0 rounded-full" />
      <div className="flex flex-1 flex-col gap-2">
        <Skeleton className="h-3 w-1/2" />
        <Skeleton className="h-3 w-3/4" />
      </div>
      <Skeleton className="h-6 w-14" />
    </div>
  )
}
