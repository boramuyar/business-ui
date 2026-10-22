import { useState } from "react"
import { Combobox, type ComboboxOption } from "@/components/ui/combobox"
import { Field, FieldLabel, useFieldControl } from "@/components/ui/field"

const folders: ComboboxOption[] = [
  "Annuities",
  "Critical illness",
  "Experience studies",
  "Group life",
  "Health",
  "Investment-linked",
  "Pricing",
  "Reinsurance",
  "Reserving",
  "Term life",
  "Universal life",
  "Whole life",
].map((name) => ({ value: name.toLowerCase().replaceAll(" ", "-"), label: name }))

export function ComboboxBasic() {
  const [folder, setFolder] = useState<string | null>("pricing")
  return (
    <Field className="w-full max-w-sm">
      <FieldLabel>Folder</FieldLabel>
      <FolderCombobox value={folder} onValueChange={setFolder} />
    </Field>
  )
}

function FolderCombobox(props: { value: string | null; onValueChange: (value: string) => void }) {
  return (
    <Combobox
      {...useFieldControl()}
      {...props}
      options={folders}
      placeholder="Pick a folder"
      searchPlaceholder="Search folders"
      emptyText="No folder by that name"
    />
  )
}
