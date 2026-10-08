import { useState } from "react"

import { Checkbox } from "@/components/ui/checkbox"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"

const itemsSeed = [
  { id: "checkbox-indeterminate-0", checked: true, label: 1 },
  { id: "checkbox-indeterminate-1", checked: false, label: 2 },
]

export function CheckboxIndeterminate() {
  const [items, setItems] = useState(itemsSeed)
  const allChecked = items.every((item) => item.checked)
  const someChecked = items.some((item) => item.checked)

  return (
    <FieldGroup className="w-auto gap-3">
      <Field orientation="horizontal">
        <Checkbox
          checked={allChecked ? true : someChecked ? "indeterminate" : false}
          id="checkbox-indeterminate-all"
          onCheckedChange={(checked) =>
            setItems(
              items.map((item) => ({
                ...item,
                checked: checked === true,
              }))
            )
          }
        />
        <FieldLabel htmlFor="checkbox-indeterminate-all">Select all</FieldLabel>
      </Field>
      {items.map((item) => (
        <Field className="pl-6" key={item.id} orientation="horizontal">
          <Checkbox
            checked={item.checked}
            id={item.id}
            onCheckedChange={(next) =>
              setItems(
                items.map((entry) =>
                  entry.id === item.id ? { ...entry, checked: !!next } : entry
                )
              )
            }
          />
          <FieldLabel htmlFor={item.id}>Item {item.label}</FieldLabel>
        </Field>
      ))}
    </FieldGroup>
  )
}
