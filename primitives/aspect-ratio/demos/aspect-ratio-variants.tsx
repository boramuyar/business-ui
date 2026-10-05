import { AspectRatio } from "@/components/ui/aspect-ratio"

export function AspectRatioVariants() {
  return (
    <>
      <div className="w-48">
        <AspectRatio ratio={16 / 9}>
          <div className="flex size-full items-center justify-center border bg-muted font-mono text-xs">
            16 : 9
          </div>
        </AspectRatio>
      </div>
      <div className="w-32">
        <AspectRatio ratio={1}>
          <div className="flex size-full items-center justify-center border bg-muted font-mono text-xs">
            1 : 1
          </div>
        </AspectRatio>
      </div>
      <div className="w-32">
        <AspectRatio ratio={3 / 4}>
          <div className="flex size-full items-center justify-center border bg-muted font-mono text-xs">
            3 : 4
          </div>
        </AspectRatio>
      </div>
    </>
  )
}
