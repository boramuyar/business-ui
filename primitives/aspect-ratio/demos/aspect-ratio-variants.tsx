import { AspectRatio } from "@/components/ui/aspect-ratio"

export function AspectRatioVariants() {
  return (
    <>
      <div className="w-48">
        <AspectRatio ratio={16 / 9}>
          <div className="flex size-full items-center justify-center border bg-muted text-xs tabular-nums">
            16 : 9
          </div>
        </AspectRatio>
      </div>
      <div className="w-32">
        <AspectRatio ratio={1}>
          <div className="flex size-full items-center justify-center border bg-muted text-xs tabular-nums">
            1 : 1
          </div>
        </AspectRatio>
      </div>
      <div className="w-32">
        <AspectRatio ratio={3 / 4}>
          <div className="flex size-full items-center justify-center border bg-muted text-xs tabular-nums">
            3 : 4
          </div>
        </AspectRatio>
      </div>
    </>
  )
}
