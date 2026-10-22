import { FileSpreadsheetIcon } from "lucide-react"
import { Fragment } from "react"
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from "@/components/ui/item"

const files = [
  { name: "Term life pricing.xlsx", folder: "Pricing" },
  { name: "Reserve model.xlsx", folder: "Reserving" },
  { name: "Lapse study.xlsx", folder: "Experience" },
]

export function ItemSeparated() {
  return (
    <ItemGroup className="w-full max-w-sm">
      {files.map((file, index) => (
        <Fragment key={file.name}>
          {index > 0 && <ItemSeparator inset />}
          <Item size="sm">
            <ItemMedia>
              <FileSpreadsheetIcon className="size-4 text-muted-foreground" />
            </ItemMedia>
            <ItemContent>
              <ItemTitle asChild>
                <a href="#item-separated">{file.name}</a>
              </ItemTitle>
              <ItemDescription>{file.folder}</ItemDescription>
            </ItemContent>
          </Item>
        </Fragment>
      ))}
    </ItemGroup>
  )
}
