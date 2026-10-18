import { LayersIcon } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function SelectGlyph() {
  return (
    <Select defaultValue="50">
      <SelectTrigger
        aria-label="Batch size"
        glyph={<LayersIcon />}
        className="w-40"
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent checkPosition="start">
        {[1, 10, 25, 50, 100].map((size) => (
          <SelectItem key={size} value={String(size)}>
            {size}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
