import { FormPage } from "@/components/shells/form-page"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

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
      className="py-0 md:py-0"
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
          <Select defaultValue="se">
            <SelectTrigger id="form-page-country">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="se">Sweden</SelectItem>
              <SelectItem value="no">Norway</SelectItem>
              <SelectItem value="dk">Denmark</SelectItem>
              <SelectItem value="fi">Finland</SelectItem>
              <SelectItem value="de">Germany</SelectItem>
              <SelectItem value="nl">Netherlands</SelectItem>
            </SelectContent>
          </Select>
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
