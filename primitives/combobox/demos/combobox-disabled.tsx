import {
  Combobox,
  ComboboxContent,
  ComboboxItem,
  ComboboxInput,
  ComboboxList,
} from "@/components/ui/combobox"

const frameworks = ["Astro", "Next.js", "Remix", "SvelteKit", "Vite"]

export function ComboboxDisabled() {
  return (
    <Combobox items={frameworks}>
      <ComboboxInput className="w-56" disabled placeholder="Disabled" />
      <ComboboxContent>
        <ComboboxList>
          {(item) => (
            <ComboboxItem key={item} value={item}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}
