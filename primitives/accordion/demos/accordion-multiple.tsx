import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export function AccordionMultiple() {
  return (
    <Accordion className="w-full" defaultValue={["a", "b"]} type="multiple">
      <AccordionItem value="a">
        <AccordionTrigger>Open by default</AccordionTrigger>
        <AccordionContent>Both sections start expanded.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="b">
        <AccordionTrigger>Also open</AccordionTrigger>
        <AccordionContent>Close them independently.</AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
