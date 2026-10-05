import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export function RadioGroupComposition() {
  return (
    <RadioGroup className="max-w-sm" defaultValue="standard">
      <FieldLabel htmlFor="radio-demo-standard">
        <Field orientation="horizontal">
          <RadioGroupItem id="radio-demo-standard" value="standard" />
          <FieldContent>
            <FieldTitle>Standard shipping</FieldTitle>
            <FieldDescription>4-6 business days, free.</FieldDescription>
          </FieldContent>
        </Field>
      </FieldLabel>
      <FieldLabel htmlFor="radio-demo-express">
        <Field orientation="horizontal">
          <RadioGroupItem id="radio-demo-express" value="express" />
          <FieldContent>
            <FieldTitle>Express shipping</FieldTitle>
            <FieldDescription>1-2 business days.</FieldDescription>
          </FieldContent>
        </Field>
      </FieldLabel>
    </RadioGroup>
  )
}
