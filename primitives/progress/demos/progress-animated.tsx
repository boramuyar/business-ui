import { useEffect, useState } from "react"

import { Field, FieldLabel } from "@/components/ui/field"
import { Progress } from "@/components/ui/progress"

export function ProgressAnimated() {
  const [value, setValue] = useState(10)

  useEffect(() => {
    const timer = setInterval(() => {
      setValue((current) => (current >= 100 ? 10 : current + 15))
    }, 900)

    return () => clearInterval(timer)
  }, [])

  return (
    <Field className="w-full max-w-sm">
      <FieldLabel>Uploading... {value}%</FieldLabel>
      <Progress value={value} />
    </Field>
  )
}
