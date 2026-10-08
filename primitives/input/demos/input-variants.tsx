import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export function InputVariants() {
  return (
    <FieldGroup className="max-w-sm">
      <Field>
        <FieldLabel htmlFor="input-variants-name">Name</FieldLabel>
        <Input id="input-variants-name" type="text" />
      </Field>
      <Field>
        <FieldLabel htmlFor="input-variants-email">Email</FieldLabel>
        <Input
          id="input-variants-email"
          placeholder="you@example.com"
          type="email"
        />
      </Field>
      <Field>
        <FieldLabel htmlFor="input-variants-password">Password</FieldLabel>
        <Input id="input-variants-password" type="password" />
      </Field>
      <Field>
        <FieldLabel htmlFor="input-variants-quantity">Quantity</FieldLabel>
        <Input id="input-variants-quantity" type="number" />
      </Field>
      <Field>
        <FieldLabel htmlFor="input-variants-attachment">Attachment</FieldLabel>
        <Input id="input-variants-attachment" type="file" />
      </Field>
    </FieldGroup>
  )
}
