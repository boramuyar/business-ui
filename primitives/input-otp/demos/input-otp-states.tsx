import { Field, FieldLabel } from "@/components/ui/field"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"

export function InputOtpStates() {
  return (
    <Field className="w-auto" data-disabled="true">
      <FieldLabel htmlFor="input-otp-states-code">Verification code</FieldLabel>
      <InputOTP disabled id="input-otp-states-code" maxLength={4}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
        </InputOTPGroup>
      </InputOTP>
    </Field>
  )
}
