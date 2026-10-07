# Business UI design rules

Read this before building UI with Business UI. It says which component, shell, color and type step to use, and what the system will reject. Every rule has one answer, so two agents building the same screen produce the same shape.

The rules live in two places:

- **Next to the code.** Every component and shell starts with a usage header (`@use`, `@avoid`, `@related`). Read it before you use the file.
- **Here and in `design/`.** Foundations and cross-component guides that don't belong to one file.

## Build a screen in this order

Stop at the first step that works.

1. **Pick a shell.** List, detail, form, settings or overview covers most screens ([design/shells.md](design/shells.md)).
2. **Fill it with existing components**, using their variants and props. Check the usage header or the [component catalog](design/components.md) to pick the right one.
3. **Compose** existing components inside the shell's body. This is where each screen gets its own design.
4. **Create a new shell** only when none fits. It goes in `components/shells/` and needs a justification header ([design/shells.md](design/shells.md#adding-a-shell)).

Don't create new primitives or restyle existing ones through `className` to get a different look. If a component is missing a variant you need, that is a change to the registry, not to the app.

## Hard rules

These are enforced. Run the check before finishing:

```bash
node scripts/design-check.mjs
```

| Rule | Enforced by |
| --- | --- |
| Colors come from role tokens only. Tailwind's palette (`bg-blue-500`, `text-white`) is removed from the theme. | Theme, check |
| No arbitrary colors (`text-[#333]`, `bg-[oklch(...)]`) and no inline style colors. Mixing tokens with `color-mix(... var(--token) ...)` is fine. | Check |
| Type sizes are `text-xs` to `text-3xl`. Weights are normal, medium and semibold. No arbitrary sizes. | Theme, check |
| Every component file in `components/ui/` has a usage header. | Check |
| Every file in `components/shells/` has `@shell`, `@closest`, `@why` and `@reuses`. | Check |
| One `h1` per screen, from `PageHeader`. At most one primary button in a header, dialog or form. | Shells, review |

To allow one line on purpose, put `// design-check-ignore: <reason>` on the line above it.

## Guides

Foundations:

- [Color](design/foundations/color.md): which token for which meaning.
- [Typography](design/foundations/typography.md): the type scale and when to use each step.
- [Layout](design/foundations/layout.md): spacing, widths, radius and elevation.

Patterns:

- [Choosing a selection control](design/patterns/selection-controls.md): switch, checkbox, toggle, toggle group, radio group, select, combobox.
- [Choosing an overlay](design/patterns/overlays.md): tooltip, hover card, popover, dropdown menu, dialog, alert dialog, sheet, drawer, toast.
- [Feedback and states](design/patterns/feedback.md): alerts, toasts, empty, loading and error states.

Reference:

- [Shells](design/shells.md): the starter shells and how to justify a new one.
- [Component catalog](design/components.md): every component with when to use it, generated from the usage headers.

## Writing in the UI

- Name buttons for what they do: "Create invoice", "Send reminder". Never "Submit" or "OK".
- Destructive buttons name the thing: "Delete workspace".
- Errors say what went wrong and how to fix it.
- Use sentence case everywhere: "New invoice", not "New Invoice".
