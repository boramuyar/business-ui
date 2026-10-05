import { Calendar } from "@/components/ui/calendar"

export function CalendarWeekendsDisabled() {
  return <Calendar disabled={{ dayOfWeek: [0, 6] }} mode="single" />
}
