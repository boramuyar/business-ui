import { AspectRatio } from "@/components/ui/aspect-ratio"

const logoUrl = `${import.meta.env.BASE_URL}logo.svg`

export function AspectRatioComposition() {
  return (
    <div className="w-56">
      <AspectRatio
        className="overflow-hidden border rounded-md bg-muted"
        ratio={16 / 9}
      >
        <img
          alt="Business UI logo"
          className="size-full object-contain p-6"
          src={logoUrl}
        />
      </AspectRatio>
    </div>
  )
}
