import { Button } from "@/components/ui/button"
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function InputComposition() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-6">
      <div className="grid gap-2">
        <Label htmlFor="input-demo-email">Email</Label>
        <Input
          id="input-demo-email"
          placeholder="you@example.com"
          type="email"
        />
      </div>
      <Field>
        <FieldLabel htmlFor="input-demo-name">Display name</FieldLabel>
        <Input id="input-demo-name" placeholder="Boram Uyar" />
        <FieldDescription>Shown next to your comments.</FieldDescription>
      </Field>
      <div className="flex w-full gap-2">
        <Input placeholder="Search primitives..." />
        <Button>Search</Button>
      </div>
    </div>
  )
}
