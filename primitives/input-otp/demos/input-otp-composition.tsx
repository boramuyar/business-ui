import { useState } from "react"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"

export function InputOtpComposition() {
  const [value, setValue] = useState("")

  return (
    <div className="flex flex-col items-center gap-2">
      <InputOTP maxLength={6} onChange={setValue} value={value}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
      <span className="text-muted-foreground text-xs">
        {value ? `Entered: ${value}` : "Enter your code"}
      </span>
    </div>
  )
}
