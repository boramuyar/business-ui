import { FileSpreadsheetIcon } from "lucide-react"
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemLoadingMore,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"

const files = [
  { name: "Term life pricing.xlsx", folder: "Pricing" },
  { name: "Reserve model.xlsx", folder: "Reserving" },
  { name: "Lapse study.xlsx", folder: "Experience" },
]

export function ItemLoadingMoreDemo() {
  return (
    <ItemGroup className="w-full max-w-sm rounded-md border">
      {files.map((file) => (
        <Item key={file.name} variant="divided" size="sm">
          <ItemMedia>
            <FileSpreadsheetIcon className="size-4 text-muted-foreground" />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>{file.name}</ItemTitle>
            <ItemDescription>{file.folder}</ItemDescription>
          </ItemContent>
        </Item>
      ))}
      <ItemLoadingMore>Loading more…</ItemLoadingMore>
    </ItemGroup>
  )
}
