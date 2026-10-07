# Changelog

Entries are grouped by the day a change lands on `main`, newest first, one bullet per
registry item.

## 2026-10-07

- `style`: removes Tailwind's default color palette (`blue-500`, `white`, `black` and the rest), so only role tokens exist. Adds `--scrim` for overlay backdrops and `--destructive-foreground`. Removes `text-4xl` to `text-9xl`, the thin, extralight, light, bold, extrabold and black weights, and `font-serif`. Apps that used any of these need to switch to tokens; the design check lists every use.
- `dialog`, `alert-dialog`, `sheet`, `drawer`: the backdrop uses `bg-scrim` instead of `bg-black/10`. In dark mode it is darker.
- `button`: the destructive variant uses `text-destructive-foreground`.
- `slider`: the thumb uses `bg-background` instead of `bg-white`.
- `calendar`: weekday and week-number labels use `text-xs` instead of `text-[0.8rem]`.
- All primitives: each file starts with a usage header saying when to use it, when not to, and what to use instead.
- `page`, `list-page`, `detail-page`, `form-page`, `settings-page`, `overview-page`: new page shells, installed to `components/shells/`.
- Design rules: published at https://ui.uyar.design/design.md, with `llms.txt` for agents. Nothing is installed into apps; point the app's agent instructions at the site.
- Design check: run it with `curl -fsSL https://ui.uyar.design/design-check.mjs | node --input-type=module - src`. It flags palette and arbitrary colors, made-up type sizes, inline style colors, components without a usage header, and shells without a justification.
- `@business-ui` namespace: item JSON moves to `https://ui.uyar.design/r/{name}.json`. Update `components.json` if you used the GitHub Pages address.
- `style`: `--chart-1` to `--chart-5` are now computed from `--brand` (same hue, fixed lightness steps from light to dark), so overriding `--brand` recolors charts too. Needs a browser with CSS relative color syntax (Chrome 119, Safari 18, Firefox 128).
- `style`: adds an indigo accent as `--brand` with `-foreground`, `-subtle`, `-border`, `-strong`, and `-emphasis`, in light and dark. `--ring` and `--sidebar-ring` now point at it, so focus rings are indigo. Override `--brand` to change the hue, or set it to `var(--primary)` to turn it off.
- `checkbox`, `radio-group`, `switch`: checked state uses `brand`.
- `progress`, `slider`: fill uses `brand`.
- `tabs`: the line variant's active indicator uses `brand`.
- `calendar`: selected days and ranges use `brand`.
- `table`: selected rows use `bg-brand-subtle`.
- `field`: checked choice cards use the `brand` subtle surface and border; description links hover to `brand`.
- `button`: the `link` variant uses `text-brand-emphasis`.
- `empty`, `item`: description links hover to `brand`.

## 2026-10-06

- `style`: renamed from `business-style`, so the address is now `boramuyar/business-ui/style`. All items are also served as static JSON on GitHub Pages for the optional `@business-ui` namespace.
- `business-style`: switches to the Graphite palette in light and dark (near-black primary on pure grays, blue charts; status colors unchanged) and Stripe-style elevation shadows, with a hairline ring on `shadow-overlay`.
- `business-style`: sets `--radius` to 6px with an additive radius scale, and adds layered `shadow-control`, `shadow-raised`, `shadow-overlay`, and `shadow-modal` utilities backed by light and dark `--elevation-*` tokens.
- `button`, `input`, `textarea`, `native-select`, `select`, `combobox`, `input-group`, `input-otp`, `checkbox`: 6px corners and `shadow-control`; ghost and link buttons stay flat.
- `radio-group`, `switch`, `slider`, `progress`, `avatar`, `scroll-area`, `resizable`: fully round.
- `card`, `sidebar`: 6px corners and `shadow-raised` (sidebar on its floating and inset variants).
- `popover`, `hover-card`, `tooltip`, `dropdown-menu`, `context-menu`, `menubar`, `navigation-menu`, `chart`, `sonner`: 6px corners and `shadow-overlay`, with 4px menu items.
- `dialog`, `alert-dialog`, `sheet`, `drawer`: `shadow-modal`, with 6px corners on dialogs and on a drawer's inner edge.
- `accordion`, `alert`, `badge`, `button-group`, `calendar`, `command`, `empty`, `field`, `item`, `kbd`, `skeleton`, `tabs`, `toggle`, `toggle-group`: rounded to the new scale.

## 2026-10-05

- Started the registry: `business-style`, `use-mobile`, and 54 primitives.
