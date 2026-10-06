# Changelog

Entries are grouped by the day a change lands on `main`, newest first, one bullet per
registry item.

## 2026-10-06

- `style`: renamed from `business-style`, so the address is now `boramuyar/business-ui/style`. All items are also served as static JSON on GitHub Pages for the optional `@business-ui` namespace.
- `business-style`: switches to the Graphite palette in light and dark (near-black primary on pure grays, blue charts; status colors unchanged) and Stripe-style elevation shadows, adding a hairline ring to `shadow-control` and `shadow-overlay`.
- `business-style`: sets `--radius` to 6px with an additive radius scale, and adds layered `shadow-control`, `shadow-raised`, `shadow-overlay`, and `shadow-modal` utilities backed by light and dark `--elevation-*` tokens.
- `button`, `input`, `textarea`, `native-select`, `select`, `combobox`, `input-group`, `input-otp`, `checkbox`: 6px corners and `shadow-control`; ghost and link buttons stay flat.
- `radio-group`, `switch`, `slider`, `progress`, `avatar`, `scroll-area`, `resizable`: fully round.
- `card`, `sidebar`: 6px corners and `shadow-raised` (sidebar on its floating and inset variants).
- `popover`, `hover-card`, `tooltip`, `dropdown-menu`, `context-menu`, `menubar`, `navigation-menu`, `chart`, `sonner`: 6px corners and `shadow-overlay`, with 4px menu items.
- `dialog`, `alert-dialog`, `sheet`, `drawer`: `shadow-modal`, with 6px corners on dialogs and on a drawer's inner edge.
- `accordion`, `alert`, `badge`, `button-group`, `calendar`, `command`, `empty`, `field`, `item`, `kbd`, `skeleton`, `tabs`, `toggle`, `toggle-group`: rounded to the new scale.

## 2026-10-05

- Started the registry: `business-style`, `use-mobile`, and 54 primitives.
