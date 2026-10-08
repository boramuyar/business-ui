import { Button } from "@/components/ui/button"
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Textarea } from "@/components/ui/textarea"

const countries = [
  "Austria",
  "Belgium",
  "Denmark",
  "Finland",
  "France",
  "Germany",
  "Ireland",
  "Italy",
  "Netherlands",
  "Norway",
  "Poland",
  "Portugal",
  "Spain",
  "Sweden",
  "Switzerland",
  "United Kingdom",
]

const paymentTerms = [
  { value: "receipt", label: "Due on receipt" },
  { value: "net-7", label: "Net 7" },
  { value: "net-14", label: "Net 14" },
  { value: "net-30", label: "Net 30" },
  { value: "net-45", label: "Net 45" },
  { value: "net-60", label: "Net 60" },
]

export function SheetComposition() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>Edit customer</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit customer</SheetTitle>
          <SheetDescription>The customer list stays visible.</SheetDescription>
        </SheetHeader>
        <FieldGroup className="overflow-y-auto px-3">
          <Field>
            <FieldLabel htmlFor="sheet-demo-name">Name</FieldLabel>
            <Input defaultValue="Acme GmbH" id="sheet-demo-name" />
          </Field>
          <Field>
            <FieldLabel htmlFor="sheet-demo-email">Billing email</FieldLabel>
            <Input
              defaultValue="billing@acme.example"
              id="sheet-demo-email"
              type="email"
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="sheet-demo-country">Country</FieldLabel>
            <Combobox defaultValue="Germany" items={countries}>
              <ComboboxInput
                id="sheet-demo-country"
                placeholder="Search countries"
              />
              <ComboboxContent>
                <ComboboxEmpty>No country found.</ComboboxEmpty>
                <ComboboxList>
                  {(item) => (
                    <ComboboxItem key={item} value={item}>
                      {item}
                    </ComboboxItem>
                  )}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
          </Field>
          <Field>
            <FieldLabel htmlFor="sheet-demo-terms">Payment terms</FieldLabel>
            <Select defaultValue="net-30">
              <SelectTrigger id="sheet-demo-terms">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {paymentTerms.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
          <Field>
            <FieldLabel htmlFor="sheet-demo-notes">Notes</FieldLabel>
            <Textarea id="sheet-demo-notes" />
          </Field>
        </FieldGroup>
        <SheetFooter>
          <SheetClose asChild>
            <Button variant="outline">Cancel</Button>
          </SheetClose>
          <Button>Save customer</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
