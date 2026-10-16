import { useState } from "react"
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemTitle,
} from "@/components/ui/item"

const models = [
  { name: "Term life pricing", folder: "Pricing" },
  { name: "Reserve model", folder: "Reserving" },
  { name: "Lapse study", folder: "Experience" },
]

export function ItemSelected() {
  const [selected, setSelected] = useState("Reserve model")

  return (
    <ItemGroup className="w-full max-w-sm rounded-md border">
      {models.map((model) => {
        const isSelected = model.name === selected
        return (
          <Item
            key={model.name}
            variant="divided"
            size="sm"
            role="listitem"
            data-selected={isSelected}
          >
            <ItemContent>
              <ItemTitle asChild>
                <button
                  type="button"
                  aria-current={isSelected || undefined}
                  onClick={() => setSelected(model.name)}
                >
                  {model.name}
                </button>
              </ItemTitle>
              <ItemDescription>{model.folder}</ItemDescription>
            </ItemContent>
          </Item>
        )
      })}
    </ItemGroup>
  )
}
