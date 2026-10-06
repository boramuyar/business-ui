import { PageHeader } from "../../components/page-header"
import { ComponentPreview } from "./component-preview"

const ELEVATIONS = [
  {
    name: "control",
    label: "Control",
    usage: "Buttons, inputs, select triggers, checkboxes, radios",
  },
  {
    name: "raised",
    label: "Raised",
    usage: "Cards, floating and inset sidebars",
  },
  {
    name: "overlay",
    label: "Overlay",
    usage: "Menus, popovers, select lists, tooltips, toasts",
  },
  { name: "modal", label: "Modal", usage: "Dialogs, sheets, drawers" },
] as const

export function StyleLabPage() {
  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        description="The shipped style on real components: Graphite colors, 6px corners, and layered Stripe-style shadows. Press D to compare light and dark."
        title="Style lab"
      />

      <section className="flex flex-col gap-3">
        <h3 className="font-semibold text-sm">Elevations</h3>
        <div className="flex flex-wrap gap-8 rounded-md border bg-muted p-8">
          {ELEVATIONS.map((e) => (
            <div
              className="flex h-28 w-44 flex-col justify-end rounded-md bg-card p-3 text-card-foreground"
              key={e.name}
              style={{ boxShadow: `var(--elevation-${e.name})` }}
            >
              <span className="font-medium text-xs">{e.label}</span>
              <span className="font-mono text-[10px] text-muted-foreground">
                shadow-{e.name}
              </span>
              <span className="text-[10px] text-muted-foreground">
                {e.usage}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-md border p-6">
        <ComponentPreview />
      </section>
    </div>
  )
}
