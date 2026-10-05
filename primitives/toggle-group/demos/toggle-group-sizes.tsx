import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

export function ToggleGroupSizes() {
  return (
    <>
      <ToggleGroup defaultValue="b" size="sm" type="single" variant="outline">
        <ToggleGroupItem value="a">S</ToggleGroupItem>
        <ToggleGroupItem value="b">G</ToggleGroupItem>
      </ToggleGroup>
      <ToggleGroup defaultValue="b" size="lg" type="single" variant="outline">
        <ToggleGroupItem value="a">L</ToggleGroupItem>
        <ToggleGroupItem value="b">G</ToggleGroupItem>
      </ToggleGroup>
    </>
  )
}
