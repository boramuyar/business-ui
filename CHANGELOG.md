# Changelog

Entries are grouped by the day a change lands on `main`, newest first, one bullet per
registry item.

## 2026-10-08

- `dropdown-menu`, `context-menu`, `menubar`, `select`, `combobox`, `command`: menus have 4px of padding around their items, so the rounded hover sits inside the surface instead of touching its edges. Items and labels are shorter (`py-1.5`) and separators get `my-1`. The command input no longer has a grey fill.
- `sidebar`: groups have `p-2`, so menu items no longer run edge to edge. Items are 2px apart and the active item uses `brand-subtle` with `brand-emphasis` text, so it no longer looks like the hovered one.
- `pagination`: the active page uses `brand-subtle` with `brand-emphasis` text instead of an outlined, raised button.
- `input`, `textarea`, `input-group`, `native-select`, `select`, `combobox`, `input-otp`: text fields and select triggers are flat (no `shadow-control`).
- `tabs`: orientation styles read the trigger's own orientation, so tabs nested inside other tabs no longer pick up the outer layout. This fixes the vertical line variant, which showed a small square instead of its indicator.
- `calendar`: rows have no gaps; the space between them is part of each day button, so every click lands on a day while the highlight stays smaller. Range selection no longer shows colored corners behind the rounded ends, and today's background sits on the button.
- `alert-dialog`: laid out like `dialog` (one padded surface, no section dividers). The media is a small circle beside the title instead of a large tile above it.
- `drawer`: top and bottom drawers are `max-w-lg` wide and centered by default. Pass `size="full"` to `DrawerContent` for the old full-width panel.
- `sonner`: success, info, warning and error toasts use their status colors.
- `item`: the icon media variant is a 32px muted tile, media centers vertically, title and description sit closer, and an `ItemGroup` with separators has no extra gaps.
- `navigation-menu`: links stack their title and description instead of putting them side by side.
- `avatar`: initials are `text-xs` and medium weight (`text-sm` on `lg`). `AvatarGroup` overlaps its members by default and `AvatarGroupCount` is round.
- `button`: when a badge is the last child, the right padding shrinks to match the badge.
- `input-otp`: the active slot shows its outline on all four sides.
- `slider`: the clickable area extends 12px above and below the rail.
- `label`: shows a pointer cursor when it belongs to an enabled checkbox, radio or switch, matching the control.
- `checkbox`: the check mark is nudged left to look centered.
- `switch`: the thumb has no shadow, so it looks centered in the track.

## 2026-10-07

- `tabs`: the default list is a segmented control (muted track, raised active trigger, rounded corners) instead of the boxed bar with dividers. `variant="line"` is unchanged.
- `badge`: uses the sans font instead of mono.
- Showcase: ui.uyar.design is laid out as a handbook and built from the registry's own components (navigation-menu, sidebar, breadcrumb, card, item, tabs, badge). Section tabs (Get started, Foundations, Components, Shells, Patterns) replace the app sidebar, components are grouped by level, and each component page opens with the Use when and Avoid rules from its usage header. Routes are unchanged.
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
