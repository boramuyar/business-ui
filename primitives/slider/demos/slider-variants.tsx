import { Slider } from "@/components/ui/slider"

export function SliderVariants() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-6">
      <Slider defaultValue={[50]} />
      <Slider defaultValue={[20, 80]} />
      <Slider defaultValue={[40]} max={100} step={20} />
    </div>
  )
}
