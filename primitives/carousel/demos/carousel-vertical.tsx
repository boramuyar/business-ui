import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export function CarouselVertical() {
  return (
    <Carousel className="w-full max-w-48" orientation="vertical">
      <CarouselContent className="h-40">
        {["A", "B", "C"].map((label) => (
          <CarouselItem key={label}>
            <div className="flex h-32 items-center justify-center border bg-muted/50 text-sm">
              {label}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
