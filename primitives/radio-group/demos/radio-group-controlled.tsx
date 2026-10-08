import { useState } from "react"

import {
  Field,
  FieldDescription,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export function RadioGroupControlled() {
  const [period, setPeriod] = useState("monthly")

  return (
    <FieldSet>
      <FieldLegend variant="label">Billing period</FieldLegend>
      <RadioGroup onValueChange={setPeriod} value={period}>
        <Field orientation="horizontal">
          <RadioGroupItem id="radio-group-controlled-monthly" value="monthly" />
          <FieldLabel htmlFor="radio-group-controlled-monthly">
            Monthly
          </FieldLabel>
        </Field>
        <Field orientation="horizontal">
          <RadioGroupItem id="radio-group-controlled-yearly" value="yearly" />
          <FieldLabel htmlFor="radio-group-controlled-yearly">
            Yearly
          </FieldLabel>
        </Field>
      </RadioGroup>
      <FieldDescription>Billing period: {period}</FieldDescription>
    </FieldSet>
  )
}
