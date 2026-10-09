# Layout

Shells decide the page frame: width, gutters, where the title and actions go. This page covers the spacing inside a screen, plus radius and elevation.

## Widths

Set on `Page` (or a shell's `width` prop). There are three:

- `narrow` (672px): forms and single-column reading.
- `default` (1152px): most screens.
- `full`: wide tables, boards and dashboards that use the whole window.

## Spacing

Use `gap` on a flex or grid parent. Don't put margins on children, and don't use `space-y-*`.

| Gap | Use between |
| --- | --- |
| `gap-1` (4px) | An icon and its label, items in a badge row. |
| `gap-2` (8px) | Buttons in a toolbar or header, controls that act together. |
| `gap-3` (12px) | Fields in a form, rows inside a card, a section title and its content. |
| `gap-4` (16px) | Cards in a grid, panels on an overview. |
| `gap-6` (24px) | Sections of a page. `Page` and `PageBody` set this. |

Stick to these five. If two things need more separation than `gap-6`, they probably belong in different sections or tabs.

## Grids

- Use 1 to 4 columns and collapse to one column on small screens: `grid gap-4 sm:grid-cols-2 lg:grid-cols-4`.
- Charts and wide panels take a full or half row, never thirds.
- Give children that hold text `min-w-0` so long values wrap instead of stretching the grid.

## Grouping

- Group fields with `FieldSet` and `FieldLegend`, not cards.
- Group page content with `PageSection`. Use a `Card` only for peers that sit side by side, and never nest cards.
- Use `Separator` inside dense menus and toolbars only. Between sections, spacing is enough.

## Radius

`--radius` is 6px. Components set their own radius; app code rarely needs one.

- `rounded-md` (6px): controls and surfaces.
- `rounded-sm` (4px): items inside a padded surface, such as menu items and badges.
- `rounded-full`: avatars, switches, radios, progress bars.

## Elevation

Use the layered shadows, never Tailwind's `shadow-sm` or `shadow-lg`:

- `shadow-control`: buttons with a fill or border, checkboxes, radios and slider thumbs. Text fields and selects stay flat.
- `shadow-raised`: cards and floating panels.
- `shadow-overlay`: popovers, menus, tooltips, toasts.
- `shadow-modal`: dialogs, sheets, drawers.

Components already carry the right one. Add a shadow in app code only to a custom panel, and pick by what the element is, not how prominent it should look.
