import { useState } from "react"

import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

const itemsSeed = [
  { id: "checkbox-demo-0", checked: true, label: 1 },
  { id: "checkbox-demo-1", checked: false, label: 2 },
]

export function CheckboxIndeterminate() {
  const [items, setItems] = useState(itemsSeed)
  const allChecked = items.every((item) => item.checked)
  const someChecked = items.some((item) => item.checked)

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <Checkbox
          checked={allChecked ? true : someChecked ? "indeterminate" : false}
          id="checkbox-demo-all"
          onCheckedChange={(checked) =>
            setItems(
              items.map((item) => ({
                ...item,
                checked: checked === true,
              }))
            )
          }
        />
        <Label htmlFor="checkbox-demo-all">Select all</Label>
      </div>
      {items.map((item) => (
        <div className="flex items-center gap-2 pl-6" key={item.id}>
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
          <Label htmlFor={item.id}>Item {item.label}</Label>
        </div>
      ))}
    </div>
  )
}
