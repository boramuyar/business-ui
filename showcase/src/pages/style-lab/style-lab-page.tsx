import { Page, PageBody, PageHeader, PageSection } from "@frontend/shells/page"
import { ComponentPreview } from "./component-preview"

// Class names are written out so Tailwind generates them.
const ELEVATIONS = [
  {
    name: "control",
    className: "shadow-control",
    label: "Control",
    usage: "Buttons, inputs, select triggers, checkboxes, radios",
  },
  {
    name: "raised",
    className: "shadow-raised",
    label: "Raised",
    usage: "Cards, floating and inset sidebars",
  },
  {
    name: "overlay",
    className: "shadow-overlay",
    label: "Overlay",
    usage: "Menus, popovers, select lists, tooltips, toasts",
  },
  {
    name: "modal",
    className: "shadow-modal",
    label: "Modal",
    usage: "Dialogs, sheets, drawers",
  },
] as const

export function StyleLabPage() {
  return (
    <Page>
      <PageHeader
        description="The shipped style on real components: Graphite colors, 6px corners, and layered Stripe-style shadows. Press D to compare light and dark."
        title="Style lab"
      />
      <PageBody>
        <PageSection
          description="Four shadow steps, from controls to modals."
          title="Elevations"
        >
          <div className="flex flex-wrap gap-6">
            {ELEVATIONS.map((e) => (
              <div
                className={`flex h-28 w-44 flex-col justify-end gap-1 rounded-md bg-card p-3 text-card-foreground ${e.className}`}
                key={e.name}
              >
                <span className="font-medium text-xs">{e.label}</span>
                <span className="font-mono text-muted-foreground text-xs">
                  {e.className}
                </span>
                <span className="text-muted-foreground text-xs">{e.usage}</span>
              </div>
            ))}
          </div>
        </PageSection>
        <ComponentPreview />
      </PageBody>
    </Page>
  )
}
