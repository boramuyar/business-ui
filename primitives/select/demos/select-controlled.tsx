import { useState } from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function SelectControlled() {
  const [region, setRegion] = useState("frankfurt")

  return (
    <div className="flex flex-col items-center gap-2">
      <Select onValueChange={setRegion} value={region}>
        <SelectTrigger className="w-44">
          <SelectValue placeholder="Pick a region" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="frankfurt">Frankfurt</SelectItem>
          <SelectItem value="london">London</SelectItem>
          <SelectItem value="singapore">Singapore</SelectItem>
        </SelectContent>
      </Select>
      <span className="text-muted-foreground text-xs">Selected: {region}</span>
    </div>
  )
}
