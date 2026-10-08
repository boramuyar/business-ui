import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export function InputComposition() {
  return (
    <FieldGroup className="max-w-sm">
      <Field>
        <FieldLabel htmlFor="input-demo-email">Email</FieldLabel>
        <Input
          id="input-demo-email"
          placeholder="you@example.com"
          type="email"
        />
      </Field>
      <Field>
        <FieldLabel htmlFor="input-demo-name">Display name</FieldLabel>
        <Input id="input-demo-name" placeholder="Boram Uyar" />
        <FieldDescription>Shown next to your comments.</FieldDescription>
      </Field>
      <div className="flex w-full gap-2">
        <Input
          aria-label="Search primitives"
          placeholder="Search primitives..."
        />
        <Button>Search</Button>
      </div>
    </FieldGroup>
  )
}
