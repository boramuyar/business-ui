import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
} from "@/components/ui/field"
import { Switch } from "@/components/ui/switch"

export function SwitchComposition() {
  return (
    <Field className="max-w-sm" orientation="horizontal">
      <FieldContent>
        <FieldLabel htmlFor="switch-demo-2fa">
          Two-factor authentication
        </FieldLabel>
        <FieldDescription>
          Require a verification code at sign-in.
        </FieldDescription>
      </FieldContent>
      <Switch defaultChecked id="switch-demo-2fa" />
    </Field>
  )
}
