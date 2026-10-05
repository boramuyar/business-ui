import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function SelectDisabled() {
  return (
    <Select>
      <SelectTrigger className="w-44">
        <SelectValue placeholder="Pick a plan" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="starter">Starter</SelectItem>
        <SelectItem value="growth">Growth</SelectItem>
        <SelectItem disabled value="enterprise">
          Enterprise (contact us)
        </SelectItem>
      </SelectContent>
    </Select>
  )
}
