# Button

Research for the business-ui Button: text buttons, icon-only buttons, the loading state, and buttons that look like buttons but navigate (links). No code here. Statements marked **Recommendation** are our opinion. Everything else is backed by a source in section 10.

---

## 1. Purpose & when to use / when not to use

A button starts an action on the current page or in the current flow: save, submit, delete, open a dialog, toggle a panel, run a filter. Its semantic contract is simple. It has `role="button"`, Enter and Space activate it, and it never changes the URL by itself ([APG Button pattern](https://www.w3.org/WAI/ARIA/apg/patterns/button/), [MDN `<button>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button)).

**Use a Button when**
- The control does something: it submits, mutates data, opens or closes UI, or starts a process.
- It opens a dialog, menu or popover. Menu triggers get `aria-haspopup` (see section 6).
- It toggles a state (bold on/off, "pin column"). This is a *toggle button* with `aria-pressed`. **Recommendation:** give toggles their own `Toggle` component rather than a Button prop, as Base UI and Radix do.

**Do not use a Button when**
- The control navigates to a URL, even when the design wants it to look like a button ("Create invoice" going to `/invoices/new`). Use an `<a href>` with button *styling*. Base UI, React Aria and shadcn all say this explicitly: style the link, don't force button semantics onto it ([Base UI Button](https://base-ui.com/react/components/button), [React Aria Button](https://react-aria.adobe.com/Button), [shadcn Button](https://ui.shadcn.com/docs/components/button)). Real links keep middle-click, cmd-click, "copy link address", the status-bar preview and the screen reader announcement "link".
- The action is a row of mutually exclusive choices. Use a segmented control, radio group or toggle group.
- The text is inline inside a sentence. Use a link.
- The action would be clearer as a menu item inside an overflow ("…") menu. In dense business UIs, more than about 3 visible actions per group is a smell (Carbon caps groups at 3 buttons ([Carbon](https://carbondesignsystem.com/components/button/usage/))).

**Hierarchy rule (Recommendation):** at most one `primary` button per region (page header, dialog footer, form). Carbon states this as a hard rule. GOV.UK and Polaris imply it. Everything else is `secondary`, `ghost` or `link`.

---

## 2. Anatomy (parts)

```
┌──────────────────────────────────────────┐
│ [start icon]  Label text  [end icon/kbd] │   ← container (bg, border, radius)
└──────────────────────────────────────────┘
      ↑ focus ring drawn outside (outline + offset), never clipped
```

| Part | Required | Notes |
| --- | --- | --- |
| Container | yes | Native `<button>` (default) or `<a>` for link-buttons. Carries bg, border and radius. |
| Label | yes, unless icon-only | Sentence case, verb first: "Save changes", "Delete account" ([GOV.UK](https://design-system.service.gov.uk/components/button/)). |
| Start icon | optional | Decorative, so `aria-hidden="true"`. Reinforces the label and does not replace it. |
| End icon | optional | Chevron for menu triggers, arrow for "next", external-link glyph. |
| Spinner | loading only | Replaces the start icon (or overlays the label). See section 4. |
| Keyboard hint (`<kbd>`) | optional | Useful in power-user tools ("Save ⌘S"). Expose it with `aria-keyshortcuts` instead of reading it as part of the name. |
| Badge/count | rare | "Filters · 3". Keep it in the accessible name ("Filters, 3 applied"). |
| Icon-only container | variant | Square, same height as the text button, with `aria-label` **and** a tooltip. |

**Recommendation:** use shadcn's newer `data-icon="inline-start" | "inline-end"` convention on child icons ([shadcn](https://ui.shadcn.com/docs/components/button)). Padding can then tighten on the icon side with CSS (`has-[>[data-icon=inline-start]]:ps-2.5`), with no `startIcon`/`endIcon` props needed. This keeps composition open: users drop any SVG in.

---

## 3. Variants & sizes

### Variants: what is necessary

| Variant | Keep? | Use |
| --- | --- | --- |
| `primary` (solid brand) | **yes** | The one main action of a region. |
| `secondary` (neutral, subtle fill or outline) | **yes** | Cancel, Back, and the second action in a pair. This is the workhorse in admin UIs. |
| `outline` | **merge** | Visually close to secondary. **Recommendation:** ship *one* neutral variant (bordered, subtle bg) as `secondary`. shadcn's separate `outline` and `secondary` confuse users about which to pick. |
| `ghost` (no bg until hover) | **yes** | Toolbars, table rows, card headers, icon-only buttons. Dense UIs depend on it. |
| `link` (looks like text link) | **maybe** | Only for actions inside text-heavy areas. If it navigates, it must be an `<a>`. |
| `danger` / `destructive` | **yes, as a tone** | Delete, Revoke. Carbon offers danger at primary, tertiary and ghost emphasis ([Carbon](https://carbondesignsystem.com/components/button/usage/)). |

**Recommendation: split *emphasis* from *tone*.** Use `variant: "solid" | "subtle" | "outline" | "ghost" | "link"` × `tone: "neutral" | "brand" | "danger"` (optionally `success`/`warning` later). This is the main palette fix over shadcn. Each tone needs a full ramp: `bg`, `bg-hover`, `bg-active`, `subtle-bg`, `subtle-bg-hover`, `subtle-bg-active`, `fg`, `border`. Then "ghost danger" (a red trash icon in a table row) is free and doesn't need a custom className. Not every combination needs design attention. Document the 6–8 combinations people should actually use.

**Bloat to skip:** gradient, "shadow"/elevated, pill vs. rounded as props (put it in theme tokens), `fullWidth` (use `w-full` or a layout helper), separate `IconButton` *styling* (it is a size, see below), FAB, "start button" green CTA (GOV.UK-specific).

### Sizes

Business apps need control heights that **match inputs and selects**, so a button sits in a row of form controls with no misalignment. Carbon ties button sizes to field heights for this reason ([Carbon](https://carbondesignsystem.com/components/button/usage/)).

| Size | Height | Font | Use |
| --- | --- | --- | --- |
| `xs` | 24px | 12px | Table rows, inline chips, dense toolbars. Meets the WCAG 2.5.8 floor exactly. |
| `sm` | 32px | 13–14px | **Default for dense admin screens** (recommendation), filter bars. |
| `md` | 36px | 14px | Default for forms and dialogs. |
| `lg` | 40px | 14–16px | Marketing-ish surfaces, onboarding, touch-first views. |

**Recommendation:** pull heights from a shared `--control-h-{size}` token that Input, Select and Button all read. Icon-only is **not a separate size scale**. Use a boolean `iconOnly` (or detect a single child icon), which makes the button square at the current size. shadcn's `icon`, `icon-xs`, `icon-sm` and `icon-lg` sizes double the size enum for no reason.

On touch (`@media (pointer: coarse)`), consider bumping `xs`/`sm` up a step or adding an invisible hit-area pseudo-element (see section 6).

---

## 4. States

Every state below needs its **own token**. Today shadcn derives hover with `hover:bg-primary/90`. That is an opacity hack: it changes perceived hue on colored backgrounds, it fails on subtle and ghost variants, and it gives no separate pressed state. This is exactly the palette gap business-ui wants to close.

| State | Trigger | Visual | Behavior |
| --- | --- | --- | --- |
| **Default** | — | `--btn-{tone}-bg`, `fg`, `border` | — |
| **Hover** | pointer over, *mouse only* | `bg-hover`: one step darker (light mode) or lighter (dark mode) on the tone ramp. Ghost goes from transparent to `subtle-bg`. | Apply only under `@media (hover: hover)` or via `data-hovered`, so taps on touch don't leave a "stuck" hover ([React Aria usePress/useHover rationale](https://react-spectrum.adobe.com/blog/building-a-button-part-2.html)). |
| **Active / pressed** | pointer down, or Space held | `bg-active`: two steps from default. Optionally `translate-y-px` or `scale-[.98]`. | Must be *visibly distinct from hover*, because it confirms the press registered. Material 3 uses separate state-layer opacities (about 8% hover, about 10% pressed and focus) ([M3 state layers](https://m3.material.io/foundations/interaction/states/state-layers)). |
| **Focus-visible** | keyboard focus (`:focus-visible`) | 2px `outline` in `--focus-ring`, 2px offset, drawn **outside** the border. Not shown on mouse click. | Use `outline` rather than `box-shadow` so Windows High Contrast / forced-colors keeps it. Must meet 3:1 against adjacent colors (WCAG 1.4.11, 2.4.7; 2.4.13 AAA for size). |
| **Selected / pressed toggle** | `aria-pressed="true"` | `subtle-bg-active` plus a stronger fg/border | Belongs to Toggle. Listed so tokens exist. |
| **Disabled** | `disabled` | Reduced contrast (M3: content at 38% and container at 12% of on-surface), `cursor: not-allowed` | Not focusable, no events. WCAG exempts disabled controls from contrast, but users still have to *read* them. **Recommendation:** use muted tokens rather than `opacity-50` on everything. |
| **Soft-disabled / unavailable** | `aria-disabled="true"` (`focusableWhenDisabled`) | Same look as disabled | Stays focusable and in tab order, so it can carry a tooltip explaining *why*. Click is a no-op ([Base UI](https://base-ui.com/react/components/button), [Ariakit `accessibleWhenDisabled`](https://ariakit.com/components/button)). |
| **Loading / pending** | `loading` prop | Spinner replaces the start icon (or overlays a hidden label, keeping width stable). Colors stay at default, *not* disabled grey. | Ignores presses, **stays focused**, sets `aria-busy` / announces "busy". See below. |

### Loading in detail

- **Keep width stable.** Swapping "Save" for a spinner changes width and shifts layout. Keep the label in place with `opacity: 0` (or `visibility: hidden`) and overlay the spinner absolutely, or prepend the spinner and keep the label visible. **Recommendation:** for actions that complete in under ~2s, prepend the spinner and keep the label ("Saving…" is better still, if the consumer passes `loadingText`).
- **Keep focus.** Using native `disabled` during loading makes the browser drop focus to `<body>`, so keyboard and screen reader users lose their place ([Smashing](https://www.smashingmagazine.com/2021/08/frustrating-design-patterns-disabled-buttons/)). Use `aria-disabled` plus click suppression instead. React Aria's `isPending` does this, and Base UI recommends `focusableWhenDisabled` for loading ([React Aria Button](https://react-aria.adobe.com/Button), [Base UI](https://base-ui.com/react/components/button)).
- **Announce it.** React Aria keeps a progress element in the accessibility tree and announces the pending state. It hides the visual with `opacity: 0`, not `display:none` or `visibility:hidden`, which would remove it from the accessibility tree ([React Aria](https://react-aria.adobe.com/Button)). **Recommendation:** set `aria-busy="true"` on the button and render a visually hidden live region ("Saving", then "Saved") once per press, not per render.
- **Delay the spinner** about 150–300ms so fast requests don't flash. The button still blocks re-presses immediately.
- **Double-submit protection** is the real job of loading. GOV.UK offers `data-prevent-double-click` but warns that the server must still deduplicate ([GOV.UK](https://design-system.service.gov.uk/components/button/)).

---

## 5. Behavior & interaction

**Keyboard** ([APG](https://www.w3.org/WAI/ARIA/apg/patterns/button/))
- `Tab` / `Shift+Tab`: focus moves in DOM order. Never use positive `tabIndex`.
- `Enter`: activates on keydown (native behavior).
- `Space`: activates on **keyup**. Pressing Space and moving focus or pressing Escape before release cancels it. Native `<button>` handles all of this. A `div`-based button has to reimplement it (Ariakit's `clickOnEnter` and `clickOnSpace` exist for that reason ([Ariakit](https://ariakit.com/components/button))).
- After activation, focus follows APG rules. It stays on the button unless the action opens a dialog (focus moves inside) or removes the button (move focus somewhere sensible, never to `<body>`).

**Pointer & touch**
- Activate on pointer *up* inside the element. Dragging off cancels. This is native for `<button>`.
- On iOS and Android, `:hover` sticks after a tap. Gate hover styles with `@media (hover: hover)` or with JS hover detection that ignores emulated mouse events (React Aria's `useHover`).
- `touch-action: manipulation` removes double-tap-zoom delay on older mobile browsers.
- Safari on macOS does **not focus a button on click** ([MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button)). Don't rely on `document.activeElement` or `onBlur` after a click. Popovers that close "on blur of trigger" break in Safari.
- `onPress` vs `onClick`: React Aria normalizes press across mouse, touch, keyboard and screen readers ([React Aria](https://react-aria.adobe.com/Button)). **Recommendation:** keep the standard `onClick` (Base UI does), so the component stays a drop-in for HTML and shadcn users. Rely on native `<button>` semantics, which already fire `click` for Enter and Space.

**Forms**
- **Default `type="button"`** (Recommendation). A native `<button>` without a type is `submit` inside a form. This is the most common button bug ([MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button)). Base UI tells you to set `type="submit"` explicitly ([Base UI](https://base-ui.com/react/components/button)). Defaulting to `button` turns accidental submits into a "nothing happens" bug, which is safer and easy to spot.
- Pass through `form`, `formAction`, `formMethod`, `formNoValidate`, `name` and `value`. They matter for multi-action forms ("Save draft" vs "Publish") and for React 19 server actions.
- React 19 / Next: a `SubmitButton` that reads `useFormStatus().pending` and feeds `loading` covers the most common loading case. **Recommendation:** document this pattern and don't ship it as a component.
- Enter in a text field submits the form via the *first* submit button in DOM order. Put the primary submit first in the DOM, and use CSS `order` / `flex-row-reverse` if the visual order differs.

**Destructive actions:** red alone is not enough. Pair them with clear wording and, for irreversible actions, a confirmation step ([GOV.UK](https://design-system.service.gov.uk/components/button/)).

---

## 6. Accessibility requirements

| Requirement | Detail | Ref |
| --- | --- | --- |
| Role | Native `<button>` (implicit `role=button`). Link-buttons stay `<a href>` with role link. **Do not** add `role="button"` to links (GOV.UK's start button does, but that is a legacy choice). | APG, MDN |
| Accessible name | Visible text. Icon-only buttons **must** have `aria-label` (or visually hidden text). Icons inside are `aria-hidden`. | [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button), WCAG 4.1.2 |
| Label in name | When `aria-label` is used on a button that also has visible text, the visible text must be part of the name (WCAG 2.5.3). | WCAG 2.5.3 |
| Toggle | `aria-pressed`. The label must **not** change with state. | [APG](https://www.w3.org/WAI/ARIA/apg/patterns/button/) |
| Menu trigger | `aria-haspopup="menu"` + `aria-expanded`. Usually set by the Menu primitive. | APG |
| Disabled | `disabled` (removed from tab order) **or** `aria-disabled="true"` (focusable, explainable). Offer both. | Base UI, Ariakit |
| Busy | `aria-busy="true"` while loading, plus a polite announcement. | React Aria |
| Description | `aria-describedby` for "why disabled" hints or consequences. | APG |
| Shortcut | `aria-keyshortcuts="Meta+S"` if a `<kbd>` hint is shown. | ARIA 1.2 |
| Focus visible | Always visible on keyboard focus. Never `outline: none` without a replacement. It must not be hidden by sticky headers or footers (WCAG 2.4.11). | WCAG 2.4.7, 2.4.11 |
| Contrast | Label text 4.5:1 (3:1 if ≥ 18.66px bold). Button boundary or fill vs. page 3:1 if the shape is needed to identify it (1.4.11). Ghost buttons are recognised only by context or icon, so keep their *text* contrast high. | WCAG 1.4.3, 1.4.11 |
| Target size | ≥ 24×24 CSS px, or spacing so a 24px circle around each target doesn't overlap a neighbour (2.5.8 AA). 44×44 is AAA (2.5.5) and is a good goal for touch. | [WCAG 2.5.8](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html) |
| Forced colors | Borders must survive `forced-colors: active`. Give solid buttons a `1px solid transparent` border so a border appears in high contrast mode. | — |
| Icon-only tooltip | Icon-only buttons need a visible label on hover/focus. Carbon makes tooltips mandatory and forbids icon-only danger buttons ([Carbon](https://carbondesignsystem.com/components/button/usage/)). | Carbon |

**Recommendation for icon-only:** make `aria-label` *required by type* when `iconOnly` is set (a discriminated union), and log a dev-time console warning if the button has no accessible name. Also reuse that same label for the tooltip, so `<IconButton label="Delete row" />` gives you both, and pick one source of truth.

---

## 7. API shape recommendations

### How 4 libraries do it

| | **Base UI** | **React Aria** | **Ariakit** | **shadcn/ui** |
| --- | --- | --- | --- | --- |
| Element swap | `render={<a/>}` or `render={(props, state) => …}` + `nativeButton={false}` | No swap. Separate `Link` component | `render={<a/>}` | `asChild` (Radix Slot) |
| Disabled but focusable | `focusableWhenDisabled` | `isPending` (focusable) | `accessibleWhenDisabled` | No |
| Loading | No (compose) | `isPending` built in | No | Put `<Spinner/>` inside |
| Events | `onClick` | `onPress` (+ Start/End/Change) | `onClick` | `onClick` |
| State styling | `data-disabled`; `className(state)` fn | `data-hovered/pressed/focus-visible/pending/disabled` | `data-active`, `data-focus-visible`, `aria-disabled` | Tailwind pseudo-classes |
| Variants | Unstyled | Unstyled | Unstyled | `cva` `variant` × `size`, exports `buttonVariants` |

Sources: [Base UI](https://base-ui.com/react/components/button), [React Aria](https://react-aria.adobe.com/Button), [Ariakit](https://ariakit.com/components/button), [shadcn](https://ui.shadcn.com/docs/components/button).

### Recommended business-ui API

```tsx
<Button
  variant="solid" | "subtle" | "outline" | "ghost" | "link"   // emphasis
  tone="neutral" | "brand" | "danger"                          // color ramp
  size="xs" | "sm" | "md" | "lg"                               // reads --control-h-*
  iconOnly?: boolean                                           // square; requires aria-label
  loading?: boolean                                            // aria-busy, focus kept, presses ignored
  loadingText?: string                                         // optional label swap + announcement
  disabled?: boolean                                           // native disabled
  focusableWhenDisabled?: boolean                              // passes through to Base UI
  type?: "button" | "submit" | "reset"                         // default "button"
  render?: ReactElement | (props, state) => ReactElement       // Base UI style
  className?: string                                           // merged with tailwind-merge
  ...ButtonHTMLAttributes
/>
```

Recommendations:
1. **Build on Base UI `Button`** for `focusableWhenDisabled`, `render` and the state-aware `className`. Add our own `loading` on top, since Base UI does not ship one.
2. **Polymorphism uses `render`, not `asChild`.** Base UI's `render` is the direction the shadcn ecosystem is moving with its Base UI flavour. It avoids Slot's single-child constraint (see section 8) and gives typed state. For links, export a separate **`buttonStyles()`** class function (like shadcn's `buttonVariants`) and a thin **`LinkButton`** that renders a real `<a>` or any router `Link`. Inside, `LinkButton` handles `nativeButton={false}`, so users never see that flag. Don't silently turn `<Button href>` into an anchor. Being explicit avoids the "button announced as link, or link announced as button" class of bugs.
3. **Uncontrolled by nature.** A button has no value. The only "controlled" bits are `loading` and `disabled`, which are plain props. Toggle buttons (`pressed`/`defaultPressed`/`onPressedChange`) belong in a separate `Toggle`.
4. **Expose state as data attributes** (`data-loading`, `data-disabled`, `data-pressed`, `data-icon-only`), so consumers can restyle with Tailwind `data-[loading]:` without forking.
5. **`ButtonGroup`** (attached/segmented look plus consistent gaps) is worth a small separate export. Visual grouping is common in toolbars. Behavioral grouping (roving focus) belongs to `Toolbar`.
6. **Ship the styles as copy-pasteable source as well as a package**, so the no-lock-in promise holds. Tokens live in CSS variables, so retheming never needs JS.

---

## 8. Common pitfalls & bugs seen in the wild

1. **Accidental form submit.** `<button>` inside `<form>` defaults to `submit`. Icon buttons in a form row ("clear", "show password") submit the form ([MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button)). We fix this by defaulting `type="button"`.
2. **`asChild` + multiple children.** Radix Slot needs exactly one child. Adding a spinner or icon next to `{children}` while `asChild` is set throws `React.Children.only expected to receive a single React element child` ([shadcn #6406](https://github.com/shadcn-ui/ui/issues/6406), [#4985](https://github.com/shadcn-ui/ui/issues/4985), [dev.to write-up](https://dev.to/weamadel/fixing-shadcn-slot-issues-with-multiple-children-n2)). Slot also had trouble with Server Components ([radix #3542](https://github.com/radix-ui/primitives/issues/3542)).
3. **No built-in loading in shadcn.** It has long been requested ([shadcn #3117](https://github.com/shadcn-ui/ui/issues/3117), [PR #541](https://github.com/shadcn-ui/ui/pull/541)), and the community fills the gap with copies like [`loading-button`](https://github.com/hsuanyi-chou/shadcn-ui-expansions/blob/main/components/ui/loading-button.tsx), each slightly different (most use native `disabled` and lose focus).
4. **Tooltips on disabled buttons don't show.** Disabled elements fire no pointer events, so the "why is this disabled?" tooltip never appears ([Medium write-up](https://medium.com/fredwong-it/disabled-button-doesnt-show-radix-ui-tooltip-8cbd727bfeaf), [radix #3476](https://github.com/radix-ui/primitives/issues/3476)). Fix it with `focusableWhenDisabled` / `aria-disabled`, or wrap the button in a `<span>`.
5. **Disabled submit buttons used as validation.** Users can't tell what is missing. Validate on submit and point to the errors ([Smashing](https://www.smashingmagazine.com/2021/08/frustrating-design-patterns-disabled-buttons/), [Adrian Roselli](https://adrianroselli.com/2024/02/dont-disable-form-controls.html), [GOV.UK](https://design-system.service.gov.uk/components/button/)). **Recommendation:** say this in the docs. Don't block disabling, but make `aria-disabled` + explanation the documented path.
6. **Base UI `nativeButton` warnings** when `render` targets an `<a>` or Next `Link` and the flag is forgotten. Many projects ship "silence nativeButton warnings" PRs ([example PR](https://github.com/actea-tech/requisition/pull/54), [error-message issue](https://github.com/mui/base-ui/issues/3779)). Some "fix" it by keeping button semantics on a link, which is the wrong fix ([example a11y fix](https://github.com/alethialabs-io/alethialabs/pull/5448)). `LinkButton` hides this.
7. **Opacity-based hover/disabled.** `bg-primary/90` and `opacity-50` look muddy on colored or dark surfaces and stack badly in nested elements. Use tokens instead.
8. **Cursor regression.** Tailwind v4 reset `button { cursor: default }`, and shadcn users suddenly lost the pointer cursor ([shadcn](https://ui.shadcn.com/docs/components/button)). **Recommendation:** choose a policy and document it. We suggest `cursor: pointer` for buttons in business apps, since users expect it.
9. **Sticky hover on touch** when hover styles aren't gated by `(hover: hover)`.
10. **Focus ring clipped** by `overflow: hidden` parents (table cells, scroll areas) when the ring uses `box-shadow` or a negative offset. Prefer `outline` with an offset and check against table/card containers. Do the same for `ring` in forced-colors mode.
11. **Layout shift on loading** when the label is replaced by a smaller spinner.
12. **Safari doesn't focus on click**, which breaks "close on trigger blur" logic ([MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button)).
13. **Icon-only buttons with no name.** This is the most common automated a11y failure on buttons (axe `button-name`).

---

## 9. Open questions / decisions for business-ui

1. **Variant model:** `variant × tone` (recommended), or shadcn's flat list (`default | secondary | outline | ghost | link | destructive`) for drop-in migration? Option: support both, with the flat names as aliases.
2. **Default size:** `sm` (32px, dense) or `md` (36px)? This depends on the Input default and should be decided together with Input/Field.
3. **`render` vs `asChild`:** going all-in on Base UI `render` breaks copy-paste from shadcn docs. Do we offer an `asChild` shim?
4. **Loading visual:** spinner *replaces* the start icon, *prepends* to the label, or *overlays* a hidden label? Pick one default, and possibly allow `loadingPlacement`.
5. **Should `loading` imply `aria-disabled` or `disabled`?** We recommend `aria-disabled` (focus kept). Confirm screen reader behavior in VoiceOver, NVDA and JAWS.
6. **Built-in tooltip for icon-only?** It couples Button to Tooltip (a later primitive). The alternative is to document `<Tooltip><Button iconOnly aria-label/></Tooltip>` and lint for it.
7. **`cursor: pointer`** or platform-default `default`?
8. **Touch hit-area expansion:** automatic invisible `::after` padding on `xs`/`sm` under `pointer: coarse`, or leave it to consumers?
9. **Token naming** for the state ramps (`--btn-brand-bg-hover` vs a generic `--brand-3/4/5` scale à la Radix Colors). This is shared with every other component and should be decided at the palette level.
10. **`ButtonGroup` attached style:** ship it in v1 or wait for `Toolbar`?

---

## 10. Sources

Specs & references
- WAI-ARIA APG, Button pattern: https://www.w3.org/WAI/ARIA/apg/patterns/button/
- MDN, `<button>` element: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button
- WCAG 2.2 Understanding 2.5.8 Target Size (Minimum): https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html
- WCAG 2.2 Understanding 1.4.11 Non-text Contrast: https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html
- WCAG 2.2 Understanding 2.4.11 Focus Not Obscured: https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html

Libraries & design systems
- Base UI, Button: https://base-ui.com/react/components/button
- React Aria, Button: https://react-aria.adobe.com/Button
- React Aria blog, Building a Button (parts 1–3): https://react-spectrum.adobe.com/blog/building-a-button-part-1.html
- Ariakit, Button: https://ariakit.com/components/button
- shadcn/ui, Button: https://ui.shadcn.com/docs/components/button
- Material 3, State layers: https://m3.material.io/foundations/interaction/states/state-layers
- Carbon, Button usage: https://carbondesignsystem.com/components/button/usage/
- GOV.UK Design System, Button: https://design-system.service.gov.uk/components/button/

Articles
- Smashing Magazine, Usability Pitfalls of Disabled Buttons: https://www.smashingmagazine.com/2021/08/frustrating-design-patterns-disabled-buttons/
- Smashing Magazine, Hidden vs. Disabled in UX: https://www.smashingmagazine.com/2024/05/hidden-vs-disabled-ux/
- Adrian Roselli, Don't Disable Form Controls: https://adrianroselli.com/2024/02/dont-disable-form-controls.html
- CSS-Tricks, Making Disabled Buttons More Inclusive: https://css-tricks.com/making-disabled-buttons-more-inclusive/
- Disabled button doesn't show Radix tooltip: https://medium.com/fredwong-it/disabled-button-doesnt-show-radix-ui-tooltip-8cbd727bfeaf
- Fixing shadcn Slot issues with multiple children: https://dev.to/weamadel/fixing-shadcn-slot-issues-with-multiple-children-n2

GitHub issues & PRs
- shadcn #3117, Adding a loading prop: https://github.com/shadcn-ui/ui/issues/3117
- shadcn PR #541, Button with loader: https://github.com/shadcn-ui/ui/pull/541
- shadcn #6406, React.Children.only error: https://github.com/shadcn-ui/ui/issues/6406
- shadcn #4985, NavigationMenuTrigger Children.only: https://github.com/shadcn-ui/ui/issues/4985
- radix-ui/primitives #3542, Slot in Server Components: https://github.com/radix-ui/primitives/issues/3542
- radix-ui/primitives #3476, disabled Tooltip trigger with asChild: https://github.com/radix-ui/primitives/issues/3476
- mui/base-ui #3779, improve `render` prop error message: https://github.com/mui/base-ui/issues/3779
- Example "nativeButton warnings on Link-rendered buttons" fix: https://github.com/actea-tech/requisition/pull/54
- Example "Button rendering href announced as link" a11y fix: https://github.com/alethialabs-io/alethialabs/pull/5448
- shadcn-ui-expansions loading-button: https://github.com/hsuanyi-chou/shadcn-ui-expansions/blob/main/components/ui/loading-button.tsx
