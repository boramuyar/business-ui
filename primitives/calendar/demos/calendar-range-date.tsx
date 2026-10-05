import { type DateRange } from "react-day-picker"
import { useState } from "react"

import { Calendar } from "@/components/ui/calendar"

export function CalendarRangeDate() {
  const [range, setRange] = useState<DateRange | undefined>({
    from: new Date(2026, 5, 9),
    to: new Date(2026, 5, 16),
  })

  return (
    <Calendar
      mode="range"
      onSelect={setRange}
      required={false}
      selected={range}
    />
  )
}
