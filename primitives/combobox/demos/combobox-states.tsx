import { Combobox } from "@/components/ui/combobox"

const noop = () => {}

export function ComboboxStates() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <Combobox options={[]} value={null} onValueChange={noop} placeholder="Nothing picked yet" />
      <Combobox
        options={[{ value: "pricing", label: "Pricing" }]}
        value="pricing"
        onValueChange={noop}
        disabled
      />
      <Combobox options={[]} value={null} onValueChange={noop} placeholder="Required" aria-invalid />
    </div>
  )
}
