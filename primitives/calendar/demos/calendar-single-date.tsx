import { useState } from "react"

import { Calendar } from "@/components/ui/calendar"

export function CalendarSingleDate() {
  const [date, setDate] = useState<Date | undefined>(new Date(2026, 5, 9))

  return (
    <div className="flex flex-col items-center gap-2">
      <Calendar
        mode="single"
        onSelect={setDate}
        required={false}
        selected={date}
      />
      <span className="text-muted-foreground text-xs">
        {date ? date.toDateString() : "Pick a date"}
      </span>
    </div>
  )
}
