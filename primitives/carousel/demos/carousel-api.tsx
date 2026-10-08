import type { UseEmblaCarouselType } from "embla-carousel-react"
import { useEffect, useState } from "react"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

type CarouselApi = UseEmblaCarouselType[1]

export function CarouselApi() {
  const [api, setApi] = useState<CarouselApi | null>(null)
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)
    api.on("select", () => setCurrent(api.selectedScrollSnap() + 1))
  }, [api])

  return (
    <div className="flex flex-col items-center gap-2">
      <Carousel className="w-full max-w-48" setApi={setApi}>
        <CarouselContent>
          {[1, 2, 3, 4, 5].map((slide) => (
            <CarouselItem key={slide}>
              <div className="flex h-32 items-center justify-center border bg-muted/50 font-semibold text-2xl">
                {slide}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <span className="text-muted-foreground text-xs">
        Slide {current} of {count}
      </span>
    </div>
  )
}
