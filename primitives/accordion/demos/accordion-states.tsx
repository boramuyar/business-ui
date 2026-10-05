import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export function AccordionStates() {
  return (
    <Accordion className="w-full" collapsible type="single">
      <AccordionItem value="enabled">
        <AccordionTrigger>Enabled section</AccordionTrigger>
        <AccordionContent>Normal behavior.</AccordionContent>
      </AccordionItem>
      <AccordionItem disabled value="disabled">
        <AccordionTrigger>Disabled section</AccordionTrigger>
        <AccordionContent>Cannot be opened.</AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
