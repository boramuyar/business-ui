import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function SelectStates() {
  return (
    <>
      <Select disabled>
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Disabled" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="one">One</SelectItem>
        </SelectContent>
      </Select>
      <Select>
        <SelectTrigger aria-invalid className="w-40">
          <SelectValue placeholder="Invalid" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="one">One</SelectItem>
        </SelectContent>
      </Select>
    </>
  )
}
