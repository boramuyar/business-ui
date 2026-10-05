import {
  Field,
  FieldContent,
  FieldDescription,
  FieldTitle,
} from "@/components/ui/field"
import { Switch } from "@/components/ui/switch"

export function SwitchComposition() {
  return (
    <Field className="max-w-sm" orientation="horizontal">
      <FieldContent>
        <FieldTitle>Two-factor authentication</FieldTitle>
        <FieldDescription>
          Require a verification code at sign-in.
        </FieldDescription>
      </FieldContent>
      <Switch defaultChecked id="switch-demo-2fa" />
    </Field>
  )
}
