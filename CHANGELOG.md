# Changelog

Entries are grouped by the day a change lands on `main`, newest first, one bullet per
registry item.

## 2026-10-06

- `business-style`: sets `--radius` to 6px with an additive radius scale, and adds layered `shadow-control`, `shadow-raised`, `shadow-overlay`, and `shadow-modal` utilities backed by light and dark `--elevation-*` tokens.
- `button`, `input`, `textarea`, `native-select`, `select`, `combobox`, `input-group`, `input-otp`, `checkbox`: 6px corners and `shadow-control`; ghost and link buttons stay flat.
- `radio-group`, `switch`, `slider`, `progress`, `avatar`, `scroll-area`, `resizable`: fully round.
- `card`, `sidebar`: 6px corners and `shadow-raised` (sidebar on its floating and inset variants).
- `popover`, `hover-card`, `tooltip`, `dropdown-menu`, `context-menu`, `menubar`, `navigation-menu`, `chart`, `sonner`: 6px corners and `shadow-overlay`, with 4px menu items.
- `dialog`, `alert-dialog`, `sheet`, `drawer`: `shadow-modal`, with 6px corners on dialogs and on a drawer's inner edge.
- `accordion`, `alert`, `badge`, `button-group`, `calendar`, `command`, `empty`, `field`, `item`, `kbd`, `skeleton`, `tabs`, `toggle`, `toggle-group`: rounded to the new scale.

## 2026-10-05

- Started the registry: `business-style`, `use-mobile`, and 54 primitives.
