# Select: research notes

Status: research only, no implementation yet. Scope: a **single-value** select (a button that opens a listbox). Multi-select comes up only as a note. Label, description and error text belong to the **Field** component; this doc covers only how Select plugs into Field.

Recommendations are marked **Rec:**. Everything else is sourced from the links in section 10.

---

## 1. Purpose, and when to use it

A Select lets the user pick **exactly one value from a known, finite, fairly short list**, without typing. In ARIA terms it is a "select-only combobox": a `role="combobox"` trigger that controls a `role="listbox"` popup (APG).

### Use Select when
- The list is closed and known ahead of time: status, priority, currency, role, timezone group, "rows per page".
- There are roughly **5 to 15 options**. Baymard found drop-downs work worst at both ends: below 5 options people open them "just to see what it contained" (55% did this on optional fields), and above about 10 options people lose the overview and run into scroll errors.
- Space is tight, which is common in business apps (table toolbars, filter bars, inline edit cells), so a radio group would take too much room.
- Each option is a short label you can scan. A small leading icon or colour dot is fine.

### Do not use Select when
| Situation | Use instead | Why |
|---|---|---|
| 2 to 4 options and there is room | **RadioGroup**, or a SegmentedControl / ToggleGroup in toolbars | You see every option without a click (Baymard, GOV.UK) |
| More than about 15 options, or users know the value already (country, user, project, tag) | **Combobox** (typing filters the list) | Typing is faster than scrolling (NN/g "avoid when typing is faster") |
| Options load from the server or are paginated | **Combobox** with async loading | A Select is expected to hold its whole list up front |
| User may enter a value that is not in the list | **Combobox** with free text, or an Input with suggestions | A Select cannot hold an arbitrary value |
| Picking several values | **Checkbox group** (short list) or a **multi-select Combobox** with chips | GOV.UK: `<select multiple>` has "a history of poor usability and AT support" |
| The control triggers an action ("Export as…", "Delete") | **Menu / DropdownMenu** | A Select holds a value, a Menu runs a command. Mixing them breaks the ARIA semantics |
| Navigation | Links, tabs, nav menu | Baymard: never use drop-downs for navigation, especially on mobile |
| Very familiar data such as date of birth | Text inputs | NN/g |

### Where the line between Select and Combobox sits
**Rec:** the test is **whether there is an editable text input**. A Select has no text input. It does support *typeahead*: printable keys jump to the first matching option, but they never filter the list or show the typed text. Once the popup contains a search box, or the trigger itself can be typed into, the component is a **Combobox** and should ship as a separate one (Base UI keeps `Select` and `Combobox` separate, and so does React Aria with `Select` vs `ComboBox`/`Autocomplete`). Do not add a `searchable` prop to Select. That flag is how shadcn-style libraries end up with a "god component" whose ARIA is wrong in one mode or the other. A "Select with search in the popup" is really a Combobox with a button-like trigger, and Base UI's Combobox supports that pattern.

Rough guide for docs: **≤4 → Radio, 5–15 → Select, >15 or known-by-name → Combobox.**

### Native `<select>` compared with a custom one
- A native `<select>` still wins on mobile: you get the OS picker wheel or sheet, with no positioning or scroll-lock bugs and autofill for free. Baymard counts **31%** of custom drop-downs on major sites with at least one basic defect (no Tab access, no focus ring, no typeahead, too short, always opens downward) that native solved years ago.
- **Customizable select** (`appearance: base-select`, `::picker(select)`, `<selectedcontent>`, `::checkmark`, `::picker-icon`, `:open`) lets you style the real element. MDN still lists it as **not Baseline**. It shipped in Chrome 135, and reports say Safari 27; Firefox is not there yet. MDN also warns that some frameworks break SSR hydration with the new parsing rules.
- **Rec:** ship two pieces. (a) `NativeSelect`: a styled `<select>` that shares the Select trigger's tokens and sizes, for mobile-heavy forms, very long or plain lists, and zero-JS cases. Opt into `base-select` as progressive enhancement, since older browsers simply fall back to the classic look. (b) The Base UI-backed `Select` for everything that needs rich items (icons, descriptions, groups), object values or exact visual control. Review the decision in about a year, once base-select is Baseline.

---

## 2. Anatomy

The parts follow Base UI's naming, which business-ui should mirror so there is no lock-in:

```
Field (business-ui)            ← label, description, error, invalid/disabled context
└─ Select.Root                 ← state, value, form wiring (renders hidden <input>)
   ├─ Select.Trigger           ← <button role="combobox">
   │  ├─ Select.Value          ← selected label or placeholder
   │  └─ Select.Icon           ← chevron (decorative, aria-hidden)
   └─ Select.Portal
      └─ Select.Positioner     ← floating positioning (side/align/offset/collision)
         ├─ Select.ScrollUpArrow
         ├─ Select.Popup       ← surface (bg, border, shadow, radius)
         │  └─ Select.List     ← role="listbox"
         │     ├─ Select.Group → Select.GroupLabel
         │     ├─ Select.Item  ← role="option"
         │     │  ├─ Select.ItemIndicator (check)
         │     │  └─ Select.ItemText (used for label + typeahead)
         │     └─ Select.Separator
         └─ Select.ScrollDownArrow
```

Base UI also has `Backdrop` and `Arrow`. **Rec:** do not style either by default. An arrow on a select looks like a tooltip and is rarely wanted.

Optional slots worth supporting on `Item`: a leading visual (icon, avatar, status dot) and a secondary description line. Keep the description *outside* `ItemText` so it stays out of the trigger label and out of typeahead matching. A trailing "meta" (shortcut, count) works the same way.

**Rec:** business-ui ships a pre-composed wrapper (`<Select items placeholder />`) built from these parts, and re-exports the parts for anyone who needs custom composition. That is the shadcn model with a fast path added.

---

## 3. Variants and sizes

**What is needed for business apps:**
- **Sizes `sm` / `md` / `lg`**, sharing height, padding and font with Input, Button and NativeSelect so a filter bar lines up. Dense admin UIs live at `sm` (about 28–32px) and `md` (about 36px). **Rec:** inherit the size from a Field or form-level context so a dense form does not need `size="sm"` on every control.
- **Trigger appearance**: `default` (bordered, matches Input) and `ghost`/`borderless` (for table cells, inline edit and toolbars, where the border appears only on hover and focus). These two cover more than 90% of uses.
- **Width**: by default the trigger fills its container in forms. Offer `w-auto`/`fit` for toolbars. The popup should be **at least the trigger width** (`min-width: var(--anchor-width)`) and allowed to grow wider for long labels, up to a max.
- **Item density** follows the size token.
- **Optional `clearable`.** Rec: only when the value is optional (filters). It renders a separate clear button *beside* the trigger, never nested inside the `<button>` (nesting interactive content is invalid). Alternatively, a "None"/"Any" option at the top of the list.

**Bloat to avoid (Rec):** colour variants such as primary/danger triggers, "filled" vs "outlined" vs "underlined" (Material-style), floating labels (Material 3 offers them; they hurt dense layouts and repeat Field's job), a loading-spinner trigger (if options load asynchronously, it is a Combobox), and per-item colour props (use the item slot).

---

## 4. States

This is where business-ui's token gap matters most. A select needs **two different "highlight" concepts in the popup at the same time**, and it needs pointer-hover kept separate from keyboard-active. shadcn uses `bg-accent` for both the hovered item and the focused item and shows selection only with a checkmark. That works, but only because one token is doing several jobs.

**Rec:** token roles (names are illustrative):

| State | Where | Look | Token |
|---|---|---|---|
| Closed / rest | Trigger | Input styling: `--field-bg`, `--field-border` | field tokens shared with Input |
| Hover | Trigger | Border darkens a little (bordered) or a subtle bg appears (ghost) | `--field-border-hover`, `--bg-subtle-hover` |
| Open | Trigger | Keeps a "pressed/active" look while open (`data-popup-open`) so it is clear what the popup belongs to; chevron may rotate | `--field-border-active` or ring |
| Focus-visible | Trigger | Focus ring (outline/box-shadow), **only for keyboard** (`:focus-visible`) and at least 3:1 contrast (WCAG 1.4.11, 2.4.7, 2.4.13) | `--ring` |
| Highlighted option | Item (`data-highlighted`) | Subtle filled background. This is the "virtual focus" (aria-activedescendant). Mouse hover and arrow keys **move the same highlight** (single source of truth, as in APG and Base UI) | `--bg-subtle-hover` / `--accent-subtle` |
| Pressed option | Item (`:active`) | Slightly stronger than highlighted, for touch feedback | `--bg-subtle-active` |
| Selected option | Item (`data-selected`, `aria-selected`) | **Checkmark indicator plus medium font weight**. It must still read as selected while it is also highlighted, so use the check and do not rely on colour alone (WCAG 1.4.1) | `--fg-accent` for check |
| Selected + highlighted | Item | Highlight bg plus check. Make sure the two do not cancel each other out | combination |
| Disabled (whole control) | Trigger | Lower opacity or muted bg, `cursor: not-allowed`, not focusable (Base UI renders a `disabled` button). Use `readOnly` instead when the value still needs to be readable and focusable | `--field-bg-disabled`, `--fg-disabled` |
| Disabled option | Item (`data-disabled`, `aria-disabled`) | Muted text, no hover highlight, skipped by arrow keys. **Keep it visible** rather than removing it (NN/g), and consider explaining why (tooltip or description line) | `--fg-disabled` |
| Invalid | Trigger (`aria-invalid`, `data-invalid` from Field) | Danger border plus danger focus ring. The message lives in Field and is linked with `aria-describedby` | `--border-danger`, `--ring-danger` |
| Placeholder / empty | Value (`data-placeholder`) | Muted fg (`--fg-muted`), must still pass 4.5:1 text contrast | `--fg-muted` |
| Read-only | Trigger | Looks like plain text or a muted field, focusable, does not open | field-readonly |

Notes:
- Do not show the focus ring on mouse click. Base UI exposes the needed data attributes, and `:focus-visible` handles it.
- **Rec:** do *not* auto-highlight on open with a filled bg when opened by mouse. Highlight the selected item (or the first item) so keyboard users have a starting point. This matches APG and Base UI.
- GOV.UK's user research found people confusing "focused" with "selected". That is a strong argument for a background tint for highlight and a check for selection, never a bg tint for both.

---

## 5. Behaviour and interaction

### Keyboard (APG select-only combobox, aligned with Base UI and Radix)
Closed, focus on the trigger:
- `Enter` / `Space` / `ArrowDown` / `ArrowUp`: open. APG: Down opens on the current option, Up opens and moves to the first. Base UI and Radix highlight the selected item on open, which is fine.
- `Home` / `End`: open and highlight the first or last option.
- **Printable characters: typeahead.** Rec: on a *closed* select, typing should **change the value directly** without opening, as native `<select>` does on Windows. Base UI and Radix both support this (Radix selects on the closed trigger). Treat this as a decision to make (see section 9), because on macOS native opens instead.

Open, focus stays in the popup (Base UI moves DOM focus into the list; APG uses `aria-activedescendant`):
- `ArrowDown/Up`: move the highlight, skipping disabled options. **Do not wrap** by default (APG). Rec: no loop.
- `Home/End`, `PageUp/PageDown` (jump about 10).
- `Enter` / `Space`: select and close. While a typeahead is in progress, `Space` is part of the search string (for example "New York"); the implementation must handle this.
- `Escape`: close **without changing the value**, and return focus to the trigger. Escape must not also close a surrounding Dialog (stop propagation). That is a classic nested-popup bug.
- `Tab`: APG selects the highlighted option, closes, and moves focus on. Radix and Base UI close without selecting. **Rec:** close without selecting, and let focus move on. Accidentally committing a value is worse in data entry.
- Typeahead: accumulate characters with a timeout of about 500–1000 ms; pressing the same letter repeatedly cycles through items starting with that letter; match against `ItemText` / `itemToStringLabel`, **not** against icons or descriptions.

### Pointer
- Mouse: open on `pointerdown` and allow drag-to-select (press, drag to an item, release). This is native desktop behaviour and Base UI and Radix both do it.
- Touch: **open on click/pointerup, not pointerdown.** Otherwise scrolling the page past a select opens it (Radix #1641; fixed in Radix PR #2939). Base UI handles touch separately.
- A selection made by click closes the popup. Hover moves the highlight but never selects.

### Positioning: item-aligned vs popper
- **Item-aligned** (macOS-native style, Base UI `alignItemWithTrigger` default `true`, Radix `position="item-aligned"` default): the popup overlaps the trigger so the selected item sits exactly on top of the trigger's text. Good for short lists in forms; it feels native on Mac.
- **Popper** (Base UI `alignItemWithTrigger={false}`, Radix `position="popper"`): the popup sits below or above the trigger, flips on collision and can use `side`/`align`/`offset`.
- Trade-offs: item-aligned hides the trigger and anything above it (the label may be covered, which goes against NN/g's "keep the label visible"), it needs enough room or falls back, it is turned off on touch by Base UI, and it has caused bugs with scroll arrows (Base UI #2516) and with growth feedback loops (Base UI #3789). Popper is predictable, keeps the label visible and is what Windows, Material, Carbon and Polaris users expect.
- **Rec:** default to **popper** (`alignItemWithTrigger={false}`), `side="bottom"`, `align="start"`, 4px offset, flip and shift on collision, `max-height: min(var(--available-height), ~20rem)`. Offer item-aligned as an opt-in. The reasons: dense admin screens, filter bars where the trigger must stay visible, and consistency with Combobox and DropdownMenu. WordPress/Gutenberg went back and forth on this exact default (PR #82043), so it is a real choice; record it as a decision.
- The popup must flip upward near the bottom of the viewport (Baymard pitfall #5) and must always render in a portal so `overflow:hidden` table and card ancestors cannot clip it.

### Scrolling
- The popup scrolls internally. Show about 6–10 items before scrolling, and make sure a partly visible item hints that there is more (GOV.UK: users did not notice they could scroll).
- Scroll the selected item into view on open.
- Scroll arrows (`ScrollUpArrow`/`ScrollDownArrow`) are a macOS idiom, are not rendered on touch, and are mostly needed in item-aligned mode. Rec: optional, off by default in popper mode.
- **Page scroll lock**: Radix's modal Select locks body scroll (react-remove-scroll) and sets `pointer-events: none` on the body. This causes layout shift when the scrollbar disappears and cannot be turned off (Radix #3276, themes #753, primitives #1925 and #3251). Base UI `modal` (default `true`) blocks outside interaction but **keeps the page scrollable** unless the popup fills nearly the whole viewport. **Rec:** keep Base UI's default and use `scrollbar-gutter: stable` at the app root.

### Mobile
- The custom popup is usable on touch if: no item-aligned mode, touch targets of at least 44px when `pointer: coarse` (WCAG 2.5.8 sets a 24px minimum; Apple and Google guidance say 44/48), and no opening while scrolling.
- **Rec:** for mobile-first forms, document `NativeSelect` as the better choice. Do not try to turn Select into a bottom sheet automatically; that is a separate Drawer + List pattern.

### Forms
- Base UI renders a hidden `<input>` with `name`, so native `<form>` submit, `FormData`, `reset` and `required` all work. React Aria renders a hidden `<select>`, which also helps browser autofill.
- Object values: Base UI's `itemToStringValue` serializes the value for submission and `itemToStringLabel` produces the label (added after issue #2586). Rec: require one of these whenever a value is not a primitive.
- `onValueChange` must fire *only* on user change, not on a controlled prop update. That keeps react-hook-form and TanStack Form integrations from looping.
- `form.reset()` must restore `defaultValue`. Test this explicitly; custom selects get it wrong often.
- WCAG 3.2.2: changing the selection must not navigate or submit on its own.

---

## 6. Accessibility requirements

- **Roles**: trigger `role="combobox"` (a `<button>` element), popup `role="listbox"`, items `role="option"`, groups `role="group"` with `aria-labelledby` pointing at the GroupLabel, separators `role="separator"`. (Radix and Base UI use the combobox role. Older patterns used `aria-haspopup="listbox"` on a plain button; both are accepted, but match the headless layer and do not override it.)
- **States on the trigger**: `aria-expanded`, `aria-controls` (popup id, at least while open), `aria-haspopup="listbox"`, `aria-labelledby` → the Field label **plus** the Value element, so the accessible name reads "Priority, High". Getting that composition right is the job of the Field integration. `aria-invalid`, `aria-required` (or `required` on the hidden input), `aria-describedby` → Field description and error.
- **Options**: `aria-selected="true"` on the selected item only; `aria-disabled` on disabled ones. When focus stays on the trigger, the highlighted item is exposed with `aria-activedescendant`; when DOM focus moves into the list, it is exposed by focus itself. Either is fine. Pick whichever the headless layer does and leave it alone.
- **Focus management**: on open, focus or highlight the selected item, otherwise the first enabled one. On close (select, Escape, outside click), **focus returns to the trigger**, except when the close came from Tab or from clicking another focusable element. The trigger must never be removed from the tab order. Focus must not end up hidden under sticky headers (WCAG 2.4.11).
- **Labelling**: always through Field / `<label>`. A Select with no visible label (for example in a table toolbar) needs `aria-label`. Rec: warn about this in dev mode. **The placeholder is not a label.**
- **Announcements**: screen readers announce the option name and position ("High, 2 of 4") from the listbox semantics. Do not add live regions for a single select. Selection inside a portal still works because of the id references.
- **Contrast**: trigger border and focus ring ≥3:1 (1.4.11), text and placeholder ≥4.5:1, selection shown with an icon and not only colour (1.4.1). Disabled controls are exempt, but keep them legible.
- **Target size**: items and trigger ≥24×24 CSS px (2.5.8); `sm` must still meet this.
- **Known AT gaps**: VoiceOver on iOS and some Android TalkBack combinations handle `aria-activedescendant` listboxes poorly. That is another reason to point mobile-heavy forms at `NativeSelect`.

---

## 7. API shape

### How the libraries compare
| | Base UI Select | Radix Select (shadcn classic) | React Aria Select | Ariakit (Select) |
|---|---|---|---|---|
| Composition | Parts: Root/Trigger/Value/Portal/Positioner/Popup/List/Item… | Parts: Root/Trigger/Value/Portal/Content/Viewport/Item/ItemText… | `Select` > `Label`, `Button`+`SelectValue`, `Popover` > `ListBox` > `ListBoxItem` | Store + components (`SelectProvider`, `Select`, `SelectPopover`, `SelectItem`) |
| Items | children **or** `items` prop (array or record) used for label lookup | children only | children **or** `items` + render fn (Collection API) | children |
| Value type | any (objects with `isItemEqualToValue`, `itemToStringLabel/Value`) | **string only**; `""` not allowed as an item value | `Key` (string/number id) | string (or string[]) |
| Controlled | `value`/`defaultValue`/`onValueChange` | `value`/`defaultValue`/`onValueChange` | `value`/`defaultValue`/`onChange` (newer: was `selectedKey`) | via store `value`/`setValue` |
| Multi | `multiple` | no | `selectionMode="multiple"` | yes (array value) |
| Form | hidden input, `name`, `required` | hidden native select | hidden `<select>`, `name`, validation + `FieldError` | `name` via form store |
| Positioning | `alignItemWithTrigger` (default true) + side/align | `position="item-aligned"` (default) or `"popper"` | Popover placement | popper |

A long-standing Radix pain point: values must be non-empty strings, so "None" options and number or object values need workarounds. The Base UI `items` prop solves a separate shadcn bug: `Select.Value` can show the label **before the popup has ever opened or mounted**. Radix only knows item labels once the items render, so SSR and first paint can show the raw value or an empty trigger.

### Recommendations for business-ui
1. **Generic value type.** Rec: `Select<TValue>` with `value?: TValue | null`, `defaultValue`, `onValueChange(value: TValue | null, details)`. Use `null` for "no selection", never `""`.
2. **Two ways in, one model.** The convenience component takes `items` as data:
   ```ts
   items: Array<{ value: TValue; label: string; disabled?: boolean; icon?: ReactNode; description?: string }>
     | Array<{ group: string; items: Item[] }>
   ```
   and passes them to Base UI's `items` so the label works on first paint. The composable parts take children for custom rendering. Rec: when using children with non-string labels, still pass `items` (or `itemToStringLabel`) so the trigger and typeahead have a string.
3. **Object values**: require `isItemEqualToValue` (or a `getKey`) plus `itemToStringValue` for form submission when `TValue` is an object. Document that `===` identity breaks after a refetch. This is the most common bug with object values.
4. **Field integration**: Select reads `id`, `invalid`, `disabled`, `required`, `size` and the describedby ids from Field context (Base UI's Field already does this for its own controls). Rec: no `label`/`error` props on Select itself, which keeps the separation clean. The convenience wrapper can accept `label` and render a Field around itself.
5. **Pass-through props**: `name`, `required`, `disabled`, `readOnly`, `open`/`defaultOpen`/`onOpenChange`, `placeholder`, `size`, `appearance`, positioning (`side`, `align`, `sideOffset`, `alignItemWithTrigger`), `className` on every part, `render`/`asChild`-style override per part (Base UI uses `render`).
6. **Placeholder**: Rec: `placeholder` prop on `Select.Value` (and on the wrapper). Text should be descriptive ("Select status"), not "--".
7. **Styling hooks**: expose state through `data-*` attributes (`data-popup-open`, `data-highlighted`, `data-selected`, `data-disabled`, `data-placeholder`, `data-invalid`) so Tailwind `data-[highlighted]:` variants map straight onto the hover, active and subtle tokens from section 4.
8. **Multi-select note**: Base UI's `multiple` exists. Rec: do **not** expose it on `Select` in v1; build multi-select as `MultiCombobox` with chips. If it is added later, the trigger summary ("3 selected") and the "close on select" behaviour need their own design.

---

## 8. Common pitfalls and bugs seen in the wild

1. **Body scroll lock and layout shift** when opening (Radix modal Select hides the scrollbar, cannot be disabled): radix-ui/primitives #3276, #1925, #3251; radix-ui/themes #753.
2. **`pointer-events: none` on body** while open in Radix. A click outside only closes the select and does not reach its target, so users must click twice. It has also left pages unclickable when unmount went wrong next to Dialogs.
3. **Opening on touch-scroll** because the trigger used `pointerdown` (Radix #1641; PR #2939).
4. **Item-aligned edge cases**: popup jumps when items are added after render (Radix #2440); scroll arrows missing when alignment is off (Base UI #2516); growth feedback loop (Base UI #3789); label hidden by the overlapping popup.
5. **Empty-string value** not allowed (Radix), so "None"/"Any" options need sentinel strings that then end up in form data.
6. **Label not shown until first open / SSR mismatch** with children-only APIs, because the trigger cannot know the label of an unmounted item. Fixed by the `items` prop.
7. **Object identity**: selected state is lost after data refetch when values are compared with `===`.
8. **Clipped popups** inside `overflow:hidden` containers or tables when they are not portaled; **z-index** fights with Dialog, Sheet and sticky headers. Rec: a single layering token scale.
9. **Shadow DOM / iframes**: popup not scrollable or mis-positioned in a shadow root (Radix #1980).
10. **Escape closes parent Dialog too** in nested-overlay setups.
11. **Form reset / RHF**: `reset()` does not update the custom trigger, or `onValueChange` fires on controlled updates and causes loops.
12. **Baymard's five custom drop-down failures**: no Tab access, no visible focus, no typeahead, list too short, always opens downward.
13. **Users try to type** into a select and cannot dismiss it (GOV.UK research). That is a signal the list should have been a Combobox.
14. **Native customizable select + SSR**: hydration failures in some frameworks because of the new parser rules (MDN).
15. **Long labels**: truncated in the trigger without a tooltip or title; the popup is forced to trigger width so options get cut off. Rec: `min-width: anchor-width`, allow wider, ellipsis plus `title` in the trigger.

---

## 9. Open questions for business-ui

1. **Default positioning**: popper (Rec) or item-aligned (Base UI and shadcn default)? Affects visual consistency with Combobox and Menu.
2. **Typeahead on a closed trigger**: change the value directly (Windows/Radix) or open the popup (macOS)? Rec: change directly, since it is faster for dense data entry. Decide and test with screen readers.
3. **Tab while open**: select the highlighted option (APG) or discard (Rec, Base UI)?
4. **NativeSelect as a peer component**: ship it in v1 (Rec yes), and do we turn on `appearance: base-select` progressively now or wait for Baseline?
5. **Value model**: allow objects in v1, or primitives only with a `getKey` lookup? Objects are convenient but add API surface (3 extra props).
6. **Clearable**: built-in clear button, a "None" item convention, or both?
7. **Size inheritance**: does `size` come from Field / form context, a `FormDensity` provider, or only per-control props?
8. **Items API**: allow the data `items` shape *and* children in the same component, or keep the wrapper data-only and the parts children-only (Rec: the latter, which is simpler to document)?
9. **Token naming** for the four interaction levels (rest / hover / active / subtle-selected) shared across Select, Menu, Combobox and Listbox. This needs to be decided at palette level, not per component.
10. **Mobile**: is a touch-optimized sheet presentation ever in scope, or is NativeSelect the official answer?
11. **Async options**: confirm that Select never loads asynchronously (Rec), and redirect to Combobox in the docs.

---

## 10. Sources

Patterns and standards
- WAI-ARIA APG, Select-Only Combobox example: https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-select-only/
- WAI-ARIA APG, Combobox pattern: https://www.w3.org/WAI/ARIA/apg/patterns/combobox/
- WAI-ARIA APG, Listbox pattern: https://www.w3.org/WAI/ARIA/apg/patterns/listbox/
- WCAG 2.2: https://www.w3.org/TR/WCAG22/ (1.4.1, 1.4.11, 2.4.7, 2.4.11, 2.4.13, 2.5.8, 3.2.2)
- MDN, Customizable select elements: https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Customizable_select
- MDN `<select>`: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select
- Customizable select support notes (Chrome 135, Safari 27): https://blakecrosley.com/blog/customizable-select-safari-27 and https://daily.dev/posts/customizable-select-is-enabled-on-chrome-135-q06ko0ono

Libraries
- Base UI Select: https://base-ui.com/react/components/select
- Base UI Combobox: https://base-ui.com/react/components/combobox
- Radix Select: https://www.radix-ui.com/primitives/docs/components/select
- React Aria Select: https://react-aria.adobe.com/Select
- Ariakit Select: https://ariakit.org/components/select
- shadcn/ui Select: https://ui.shadcn.com/docs/components/select
- Material 3 menus / exposed dropdown: https://m3.material.io/components/menus/overview
- Carbon Dropdown: https://carbondesignsystem.com/components/dropdown/usage/
- Atlassian Select: https://atlassian.design/components/select/
- Polaris Select: https://polaris.shopify.com/components/selection-and-input/select
- GOV.UK Select: https://design-system.service.gov.uk/components/select/

Usability research
- NN/g, Dropdowns: Design Guidelines: https://www.nngroup.com/articles/drop-down-menus/
- NN/g, Listboxes vs. Dropdown Lists: https://www.nngroup.com/articles/listbox-dropdown/
- Baymard, Drop-Down Usability: https://baymard.com/blog/drop-down-usability
- Baymard, 5 pitfalls of custom drop-downs: https://baymard.com/blog/custom-dropdowns-cause-issues
- Baymard, Never use native drop-downs for mobile navigation: https://baymard.com/blog/mobile-dropdown-navigation

Issues and pitfalls
- Radix #3276, scroll lock cannot be disabled: https://github.com/radix-ui/primitives/issues/3276
- Radix #1641, opens while scrolling on mobile: https://github.com/radix-ui/primitives/issues/1641
- Radix PR #2939, touch device fixes: https://github.com/radix-ui/primitives/pull/2939
- Radix #2440, adding items jumps scroll: https://github.com/radix-ui/primitives/issues/2440
- Radix #1925, layout shift on external monitor: https://github.com/radix-ui/primitives/issues/1925
- Radix #3251, shift with `scrollbar-gutter: stable`: https://github.com/radix-ui/primitives/issues/3251
- Radix #1980, not scrollable in shadow DOM: https://github.com/radix-ui/primitives/issues/1980
- Radix #1193, Select remaining tasks: https://github.com/radix-ui/primitives/issues/1193
- Radix Themes #753, scrollbar disappears: https://github.com/radix-ui/themes/issues/753
- Base UI #2586, object value support: https://github.com/mui/base-ui/issues/2586
- Base UI #2516, scroll arrows with alignItemWithTrigger=false: https://github.com/mui/base-ui/issues/2516
- Base UI #3789, popover growth feedback loop: https://github.com/mui/base-ui/issues/3789
- WordPress/Gutenberg PR #82043, alignItemWithTrigger default debate: https://github.com/WordPress/gutenberg/pull/82043
