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
        <Button variant="secondary">Dimensions</Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-0">
        <PopoverHeader className="border-b p-2.5">
          <PopoverTitle>Dimensions</PopoverTitle>
          <PopoverDescription>Set the layer size.</PopoverDescription>
        </PopoverHeader>
        <FieldGroup className="gap-3 p-2.5">
          <Field orientation="horizontal">
            <FieldLabel htmlFor="popover-demo-width">Width</FieldLabel>
            <Input
              className="w-20"
              defaultValue="100%"
              id="popover-demo-width"
            />
          </Field>
          <Field orientation="horizontal">
            <FieldLabel htmlFor="popover-demo-height">Height</FieldLabel>
            <Input
              className="w-20"
              defaultValue="25px"
              id="popover-demo-height"
            />
          </Field>
        </FieldGroup>
      </PopoverContent>
    </Popover>
  )
}
