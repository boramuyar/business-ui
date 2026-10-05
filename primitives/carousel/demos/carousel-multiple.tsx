import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export function CarouselMultiple() {
  return (
    <Carousel className="w-full max-w-sm">
      <CarouselContent>
        {[1, 2, 3, 4, 5, 6].map((slide) => (
          <CarouselItem className="basis-1/3" key={slide}>
            <div className="flex h-20 items-center justify-center border bg-muted/50 text-sm">
              {slide}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
