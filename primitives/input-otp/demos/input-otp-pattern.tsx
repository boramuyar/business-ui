import { Field, FieldLabel } from "@/components/ui/field"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"

export function InputOtpPattern() {
  return (
    <Field className="w-auto">
      <FieldLabel htmlFor="input-otp-pattern-pin">PIN</FieldLabel>
      <InputOTP id="input-otp-pattern-pin" maxLength={4} pattern="[0-9]*">
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
