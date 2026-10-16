# Changelog

Entries are grouped by the day a change lands on `main`, newest first, one bullet per
registry item.

## 2026-10-17

- `pane`: buttons pinned to a pane's edges keep 12px around them. `PaneFooter` has a 12px inset and 12px gaps (it had 8px), and `PaneFloatingAction` sits 12px from the pane's edges and 12px above a footer (it was 16px). The body's room for a floating action shrinks to match.
- `select`: the trigger is flat again, as it was before 2026-10-16: transparent with an `input` border, no `shadow-control`, and no muted fill on hover or while the list is open. The layout guide again says text fields and selects stay flat.
- `multi-select`: the trigger is flat too, to match `select`.
- `drawer`: `DrawerFooter` has a 12px inset and 12px gaps between its buttons (it had 16px and 8px). `DrawerHeader` keeps its 16px inset, like a dialog's.

## 2026-10-16

- `multi-select`: new primitive for picking several values from a list. The trigger looks like a `select` and shows the placeholder or a summary such as "4 of 6 sheets". It opens a list over the page, so nothing around it grows: search, an optional Select all, and a checkbox row for each option. The picked values show as removable tags below the trigger, never inside it. Props: `options` (`value`, `label`, `disabled`), `value`, `onValueChange`, `placeholder`, `searchPlaceholder`, `selectAllLabel`, `emptyText`, `summary` and `removeLabel`. Every other prop goes to the trigger, so `useFieldControl()` spreads onto it.
- `drawer`: `DrawerHeader` is left-aligned in every direction. Top and bottom drawers centered the title and description, which put a centered heading over a left-aligned body, most visibly in a narrow pane such as a 380px task pane. Pass `className="text-center"` to center one again.
- `item`: new selected state. `data-selected` on an `Item` gives it the `bg-brand-subtle` selection fill, the same as a selected `TableRow` and the active sidebar item, in every variant including `divided`. The fill stays under the pointer (hover tints only unselected rows) and focus rings are unchanged. Mark the title with `aria-current` for screen readers.
- `badge`: new `xs` size for tags inside a dense row: 16px tall, with 4px side padding and a 2px radius. The text stays `text-xs` (12px) like the other sizes, because the type scale has no smaller step. `default` is still the default size.
- `select`: the trigger looks like a secondary button: card background, border and `shadow-control`, with a muted fill on hover and while the list is open. It used to be a flat, transparent field, which read as a different kind of control from the buttons and menu triggers beside it.
- `progress`: an empty `ProgressCircle` (value 0) draws no sliver at the top of the ring.
- `alert`, `alert-dialog`: descriptions wrap with `text-pretty` at every width. Below `md` they were balanced, which left short ragged lines in left-aligned text and made narrow alerts taller than needed.
- `sidebar`: `SidebarHeader` with one menu row is 40px with its rule, the height of `PaneHeader` beside it, so their bottom lines meet. It was 41px.
- `item`: new `ItemLoadingMore`, the centered spinner and label at the end of a list while its next page loads. `item` now depends on `spinner`.
- `select`: `SelectItem` takes a `description`, a muted line under the label in the list. The closed select still shows only the label.
- `progress`: new `ProgressResult`, what a `ProgressCircle` turns into when its task ends, at the same size: green with a check, amber with an exclamation mark, or red with a cross. `progress` now depends on `lucide-react`.
- `style`: new `success-foreground` token for text and icons on a solid `success` fill.
- `checkbox`, `radio-group`: no drop shadow. The bordered box reads as a control on its own, and the shadow made a column of checkboxes look heavy.
- `dialog`, `alert-dialog`: the width cap no longer depends on the `sm` breakpoint. It is the smaller of the size (24rem, or 20rem for a small alert dialog) and the viewport less 1rem each side, so an app that redefines `sm` (a task pane sets it to 360px) keeps the side margins instead of running edge to edge.
- `style`: new `warning-foreground` token for text and icons on a solid `warning` fill, dark in both themes, as `destructive-foreground` is light in both.
- `progress-steps`: new `warning` status for a step that finished without the result it aimed for, such as a solver that missed its goal. It has an amber marker with an exclamation mark, and the step reads in the strong warning color.
- `badge`: the `secondary` badge has a border in dark mode, like the other variants. Without a fill or a border there, it read as plain text.
- `alert`: an alert with only a description lines its text up with the icon tile: one line centers on it, and longer text starts level with it, as a titled alert does. One line used to sit 4px high, because the tile still spanned the two rows a title and description share. The composition demo now includes one.
- `pane`: `PaneFloatingAction` can now share a pane with a `PaneFooter`: it floats 16px above the footer instead of over it. The footer keeps the pane-wide actions, such as running every item, and the floating button still adds one.
- `popover`: `PopoverContent` no longer puts a 10px gap between its children. A header, a search field and a list divided by rules now sit flush against them instead of with 10px of space on each side of every line. Space parts that no rule divides with their own padding, as the composition demo does.

## 2026-10-15

- `toggle`, `toggle-group`: new `chip` variant for filter chips: rounded, 24px tall, brand when on. In a multiple toggle group with `spacing={1}`, each chip filters a list on its own, with no "All" chip.
- `pane`: new `PaneFloatingAction`, a round button at the bottom right of the pane for the one action that adds to the body, such as a new folder. Its `label` is its tooltip and accessible name, and the body keeps room under its last row for it. `Pane` is now `relative`, and `pane` depends on `button`.
- `progress-steps`: new primitive listing the steps of running work, each done, running (with a spinner), pending or failed. Pair it with `ProgressCircle` on a screen that waits for one task.
- `progress`: new `ProgressCircle`, the same value as a ring with room for a count in its center.
- `switch`: an off switch has a `muted-foreground` track and a shadowed thumb, so it no longer looks disabled. The old track matched the border color and the white thumb barely showed on it; the track now has 3:1 contrast against the page.
- `dropdown-menu`: the menu is as wide as its longest item (at least 8rem or the trigger's width) instead of exactly the trigger's width, and items never wrap. A menu opened from an icon button used to squeeze its labels onto two lines.
- `empty`: `EmptyTitle asChild` renders your own element, such as an `h2` when the empty state is the screen's main content.
- `pane`: `PaneBody` children keep their height and the body scrolls, instead of squeezing children that clip their overflow, such as cards.
- `item`: new `ItemGroupLabel` names the group that follows it, so a long list can be split into sections instead of tagging every row.
- `sheet`, `drawer`: the scrim no longer blurs the page, so people can still read what the panel acts on, such as a conversation behind an approval sheet. Pass `blurBackdrop` to the content to blur it again.
- `skeleton`: new `SkeletonText` for text placeholders. It goes inside the element that will hold the text, such as an `ItemTitle` or a table cell, and takes sample text that stays invisible, so a skeleton row is exactly as tall as a loaded one and wraps like it.
- `dialog`, `alert-dialog`: new `blurBackdrop` prop on the content, on by default. The overlay components take the same switch as `blur`.

## 2026-10-14

- `item`: new `divided` variant for edge-to-edge lists: square rows separated by a line, hover fills the row, and a group of divided items has no gaps. `ItemTitle asChild` makes the title's button or link the row's target. Its hit area covers the row, the row highlights on hover and shows the focus ring, and `ItemActions` stay clickable above it, so a row can open something and still have a menu.
- `pane`: new shell for narrow, fixed-height surfaces such as Office task panes, side panels and full-height sheets: `Pane`, `PaneHeader` (with `leading` and `actions`), `PaneTitle` (`asChild` for dialog and sheet titles), `PaneToolbar` (12px padding, so search lines up with list text), `PaneBody` (the only part that scrolls) and `PaneFooter`.
- `fonts`: new item. It holds the Inter and JetBrains Mono imports and their `@fontsource-variable` packages, which used to come with `style`. Apps that serve the fonts themselves skip it.
- All primitives, shells and `use-mobile`: no longer depend on `style`. Install `style` once per app; adding an item no longer re-merges the style into your global CSS.
- All primitives and shells: the usage header sits below the imports instead of at the top of the file. `shadcn add` dropped every comment above the first import, so installed files arrived without their header and failed the design check. Re-add items to get the header.
- `button`: the `outline` variant is now `secondary`, on a white (`bg-card`) fill, and the old grey `secondary` is gone. Replace `variant="outline"` with `variant="secondary"`. Buttons no longer use `bg-clip-padding`, which left a light ring between the fill and the shadow when zoomed in. New `tooltipSide` prop picks the side the `tooltip` opens on.
- `style`: light `warning-strong` mixes 50% warning with the foreground instead of 75%, so amber text on `warning-subtle` reaches 4.5:1; dark `destructive-strong` mixes 70% instead of 90%, so red text on dark `destructive-subtle` does too. No longer imports fonts; add `fonts` for them. Ends with `rgb()` fallbacks for engines without `oklch()`, `color-mix()` or relative color syntax, such as the WKWebView that Office for Mac uses for add-ins; they are computed from the shipped colors. Adds the `--breakpoint-sidebar` theme breakpoint (48rem), which drives the new `sidebar:` variant; override it in your own `@theme` block.
- `sidebar`: groups use the same 4px padding as the header and footer, so group items line up with footer items. `className` now reaches the mobile sheet too, so an offset below an app bar applies on narrow screens. Docks at the `sidebar:` breakpoint instead of `md:`, so a host can change where the sidebar docks without moving every `md:` layout. Saving the open state no longer throws where the Cookie Store API is missing (older webviews, jsdom), and the cookie now gets a real expiry date and `path=/`.
- `use-mobile`: follows `--breakpoint-sidebar` instead of `--breakpoint-md`, and reads rem values; it used to fall back to 768px whenever the breakpoint was in rem.
- `sonner`: follows the `.dark` class on `<html>` instead of `next-themes`, so the dependency is gone and no theme provider is needed.
- `field`: `Field` takes `invalid` and `required` and owns the ids. `FieldLabel` points at the control and shows an asterisk when required, `FieldDescription` and `FieldError` get ids the control is described by, and the new `FieldInput`, `FieldTextarea` and `useFieldControl()` wire the control. Now depends on `input` and `textarea`.
- `checkbox`: the check is drawn on a centered 12px grid instead of lucide's `CheckIcon` with a pixel nudge, so it stays centered at every zoom level. Indeterminate boxes are filled and show a dash. No longer depends on `lucide-react`. In dark mode a checked box keeps its `brand` fill; the dark input background now applies only while unchecked.
- `file-input`: new composite. A secondary button with a plus icon picks one file, or with `multiple` adds files to a list where each can be removed. The native input stays in the form.
- `input`: the native file picker button looks like a small secondary button. The usage header points to `file-input` for files.
- `scroll-area`: scrollbars are 6px instead of 10px.
- `style`: every scroll container gets the thin scrollbar, not only the page body.
- `alert`: destructive, warning, success and info tint the whole card (subtle fill, matching border, strong title, description and icon), so an error reads as an error at a glance; default is a neutral card with muted description text and the icon in a 28px tile. `AlertAction` sits 12px from the top-right corner, beside the tile. Title-only alerts center their icon. The root carries `data-variant`, like `button` and `badge`.
- `resizable`: handles read `data-panel-group-direction`, so handles in vertical groups run across the full width instead of sitting at the side.

## 2026-10-09

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
