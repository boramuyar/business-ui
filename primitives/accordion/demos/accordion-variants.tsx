import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export function AccordionVariants() {
  return (
    <Accordion className="w-full" collapsible type="single">
      <AccordionItem value="install">
        <AccordionTrigger>How do I install a primitive?</AccordionTrigger>
        <AccordionContent>
          Run the shadcn add command with the `boramuyar/business-ui` GitHub
          address.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="theme">
        <AccordionTrigger>Where do theme tokens live?</AccordionTrigger>
        <AccordionContent>
          In `style/colors.json` and `style/tokens.json`; the CSS is generated.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
