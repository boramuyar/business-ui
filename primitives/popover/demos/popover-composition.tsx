import { Button } from "@/components/ui/button"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"

export function PopoverComposition() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Dimensions</Button>
      </PopoverTrigger>
      <PopoverContent className="w-64">
        <PopoverHeader>
          <PopoverTitle>Dimensions</PopoverTitle>
          <PopoverDescription>Set the layer size.</PopoverDescription>
        </PopoverHeader>
        <FieldGroup className="grid grid-cols-2 gap-3 p-3 pt-0">
          <Field>
            <FieldLabel htmlFor="popover-demo-width">Width</FieldLabel>
            <Input defaultValue="100%" id="popover-demo-width" />
          </Field>
          <Field>
            <FieldLabel htmlFor="popover-demo-height">Height</FieldLabel>
            <Input defaultValue="25px" id="popover-demo-height" />
          </Field>
        </FieldGroup>
      </PopoverContent>
    </Popover>
  )
}
