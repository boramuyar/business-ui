import { useState } from "react"
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"

export function InputOtpComposition() {
  const [value, setValue] = useState("")

  return (
    <Field className="w-auto">
      <FieldLabel htmlFor="input-otp-composition-code">
        Verification code
      </FieldLabel>
      <InputOTP
        id="input-otp-composition-code"
        maxLength={6}
        onChange={setValue}
        value={value}
      >
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
      <FieldDescription>
        {value ? `Entered: ${value}` : "Enter your code"}
      </FieldDescription>
    </Field>
  )
}
