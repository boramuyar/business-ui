import { FormPage } from "@/components/shells/form-page"
import { Button } from "@/components/ui/button"
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox"
import {
  Field,
  FieldDescription,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const countries = [
  "Australia",
  "Austria",
  "Belgium",
  "Brazil",
  "Canada",
  "Czechia",
  "Denmark",
  "Estonia",
  "Finland",
  "France",
  "Germany",
  "Greece",
  "Iceland",
  "India",
  "Ireland",
  "Italy",
  "Japan",
  "Latvia",
  "Lithuania",
  "Luxembourg",
  "Mexico",
  "Netherlands",
  "New Zealand",
  "Norway",
  "Poland",
  "Portugal",
  "Singapore",
  "Spain",
  "Sweden",
  "Switzerland",
  "United Kingdom",
  "United States",
]

export function FormPageCustomer() {
  return (
    <FormPage
      actions={
        <>
          <Button type="button" variant="outline">
            Cancel
          </Button>
          <Button type="submit">Create customer</Button>
        </>
      }
      description="Customers can be invoiced once they have a billing email."
      onSubmit={(event) => event.preventDefault()}
      title="New customer"
    >
      <FieldSet>
        <FieldLegend>Company</FieldLegend>
        <Field>
          <FieldLabel htmlFor="form-page-name">Name</FieldLabel>
          <Input id="form-page-name" placeholder="Fabrikam AB" />
        </Field>
        <Field>
          <FieldLabel htmlFor="form-page-country">Country</FieldLabel>
          <Combobox defaultValue="Sweden" items={countries}>
            <ComboboxInput
              id="form-page-country"
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
      </FieldSet>
      <FieldSet>
        <FieldLegend>Billing</FieldLegend>
        <Field>
          <FieldLabel htmlFor="form-page-email">Billing email</FieldLabel>
          <Input
            id="form-page-email"
            placeholder="ap@fabrikam.se"
            type="email"
          />
          <FieldDescription>Invoices and reminders go here.</FieldDescription>
        </Field>
        <Field>
          <FieldLabel htmlFor="form-page-notes">Notes</FieldLabel>
          <Textarea
            id="form-page-notes"
            placeholder="Payment terms, PO numbers..."
          />
        </Field>
      </FieldSet>
    </FormPage>
  )
}
