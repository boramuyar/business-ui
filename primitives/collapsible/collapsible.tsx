/**
 * @component Collapsible
 * @level composite
 * @summary Shows or hides one region behind a trigger.
 * @use Optional detail most people don't need: advanced options, a long
 *      description, nested sidebar groups.
 * @avoid Several sections where one opens at a time: use accordion.
 * @avoid Required fields: never hide them.
 * @related accordion, sidebar
 */
import { Collapsible as CollapsiblePrimitive } from "radix-ui"

function Collapsible({
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.Root>) {
  return <CollapsiblePrimitive.Root data-slot="collapsible" {...props} />
}

function CollapsibleTrigger({
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleTrigger>) {
  return (
    <CollapsiblePrimitive.CollapsibleTrigger
      data-slot="collapsible-trigger"
      {...props}
    />
  )
}

function CollapsibleContent({
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleContent>) {
  return (
    <CollapsiblePrimitive.CollapsibleContent
      data-slot="collapsible-content"
      {...props}
    />
  )
}

export { Collapsible, CollapsibleContent, CollapsibleTrigger }
