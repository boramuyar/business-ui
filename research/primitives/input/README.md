# Input (and Textarea): research

Scope: the single-line text control (`text`, `email`, `password`, `search`, `tel`, `url`, numeric entry), its adornments (icons, units, prefix text, clear/reveal buttons), and `Textarea` as a sibling. Labels, descriptions and error text belong to **Field**; this doc only covers how Input plugs into it. NumberField (stepper), Combobox, DatePicker and OTP inputs are separate primitives and only mentioned where they set boundaries.

Notation: **Rec:** marks an opinion or recommendation for business-ui. Everything else is a summary of sources (section 10).

---

## 1. Purpose, when to use, when not to use

An Input lets the user enter or edit a short, free-form value on one line. In business apps it is the most common control: filters, search, record editing, settings, inline table edits.

**Use it when**
- The value is free text or a format the user knows better than we can list (name, SKU, email, invoice no.).
- The answer fits on one line. GOV.UK and Carbon both say to size the field to the expected answer length; the width is a hint about what to type.
- You need a numeric value with no meaningful "increment" (IDs, account numbers, postcodes): use a text input with `inputMode="numeric"`, not `type="number"` (section 5).

**Don't use it when**
- The answer is several sentences: use **Textarea**.
- There is a small, known set of options: use Select / RadioGroup / SegmentedControl.
- The value comes from a large known set: use **Combobox** (Input + listbox). Don't bolt a suggestion list onto Input.
- The value is a quantity the user nudges up and down (seats, percentages, prices with steps): use **NumberField** (Base UI has one with locale formatting, steppers, Shift/Alt step sizes and scrubbing).
- Dates and times: use a DatePicker or segmented date field, not `type="date"`; native styling and behavior differ too much between browsers.
- Short codes made of separate segments (OTP): use a dedicated OTP input with `autocomplete="one-time-code"`.
- The value only needs to be displayed: show text, not a read-only input (see section 4, read-only; Adrian Roselli, "Avoid read-only controls").

---

## 2. Anatomy

```
Field.Root
├─ Field.Label                      (Field component)
├─ InputGroup  (optional frame; owns border, bg, focus ring)
│   ├─ InputGroup.Addon  [start]    icon | "$" | "https://" | Select  (decorative or interactive)
│   ├─ Input                        native <input>  (the only thing that receives text)
│   └─ InputGroup.Addon  [end]      unit "kg" | spinner | clear button | reveal-password button | kbd hint
├─ Field.Description                (Field component)
└─ Field.Error                      (Field component)
```

Parts:
1. **Container / frame**: the visible box. With no adornments this is the `<input>` itself. With adornments it is a wrapper (`InputGroup`) that draws the border and focus ring, and the inner `<input>` is borderless. (shadcn `InputGroup`, Atlassian `elemBeforeInput`/`elemAfterInput`, Polaris `prefix`/`suffix`, React Aria `Group`.)
2. **Native input**: always a real `<input>` / `<textarea>`, so autofill, IME, spellcheck, password managers and form submission work.
3. **Leading adornment**: search icon, currency symbol, protocol prefix, or a compact Select (country code, unit picker).
4. **Trailing adornment**: unit suffix, status icon, loading spinner, clear button, password reveal, keyboard hint (`⌘K`), character counter.
5. **Placeholder**: optional example text, never the label.
6. **Textarea extras**: resize handle, optional character counter, optional auto-grow.

**Rec:** the frame is the click target. A click anywhere on the frame that isn't an interactive addon should focus the input (shadcn's InputGroup does this; a `<label>` wrapper also works). Without it, clicking the "$" or icon does nothing, which feels broken.

---

## 3. Variants and sizes

### What's actually needed

| Axis | Rec for business-ui | Why |
|---|---|---|
| **Size** | `sm` (28px), `md` (32px, default), `lg` (36–40px) | Dense admin UIs need 28–32px. Carbon ships 24/32/40/48 with 40 as default, but that default is roomy for data apps. Heights must match Button, Select and Combobox at the same size so they line up in toolbars. |
| **Appearance** | `default` (bordered) and `ghost`/`subtle` (no border until hover/focus) | Atlassian ships `standard \| subtle \| none`. "Subtle" is what you want for inline table editing and editable titles. A filled variant (Material) is not needed. |
| **Width** | No variant. Leave width to layout and offer a small `htmlSize`/char-width helper, or doc examples with `w-[12ch]`. | GOV.UK's fixed widths (2/3/4/5/10/20 chars) are good guidance, but a width utility is enough with Tailwind. |
| **Monospace** | `className="font-mono"` or a `mono` boolean | Atlassian has `isMonospaced`. Useful for IDs, API keys and code. A prop is cheap; a separate variant isn't needed. |
| **Text align** | Leave to `className` (`text-right` for amounts) | Polaris has `align`. Tailwind already covers it. |

### Bloat to avoid
- Color variants (`primary`, `secondary`): an input has one neutral look plus validation states.
- Floating labels (Material): they shrink the label, behave oddly with autofill, and take extra height. Field puts the label above.
- "Underline only" fields: weak affordance, fail non-text contrast more easily, and look like static text in dense UIs.
- A `warning` state as a first-class variant (Carbon has one). **Rec:** let Field handle warnings as description text with an icon. Keep Input's states binary: valid or invalid.
- Separate `SearchInput`, `PasswordInput`, `UrlInput` components with their own styling. **Rec:** offer them as thin *recipes* (Input + addons) in docs or registry, not new primitives. PasswordInput is the one worth shipping prebuilt because the reveal button has a11y details people get wrong.

### Font size and iOS zoom
iOS Safari zooms the page when a focused input's computed font size is below 16px. Dense UIs want 13–14px text. Options:
- **Rec:** `text-base` (16px) below the `sm`/`md` breakpoint and `md:text-sm` above it. shadcn does this (`text-base md:text-sm`). It's simple and avoids the zoom.
- Don't set `maximum-scale=1` on the viewport to stop the zoom; that blocks pinch zoom for everyone (WCAG 1.4.4).

---

## 4. States

State styling should come from data attributes exposed by the headless layer (Base UI Input gives `data-disabled`, `data-invalid`, `data-valid`, `data-dirty`, `data-touched`, `data-filled`, `data-focused`; React Aria gives `data-hovered`, `data-focus-visible`, `data-invalid`, `data-disabled`, `data-readonly`) plus native pseudo-classes where they work.

| State | Look | Behavior | Token(s) (Rec) |
|---|---|---|---|
| **Default (empty)** | Border at ≥3:1 against the background; bg `--input-bg` (usually same as surface or a step darker) | Placeholder, if any, at 4.5:1 | `--border-input`, `--bg-input` |
| **Hover** | Border one step stronger. Subtle variant: border or bg appears. | Pointer devices only (`@media (hover:hover)`) | `--border-input-hover` |
| **Focus (any)** | Caret visible. **Rec:** show the ring on *any* focus, not only focus-visible. Unlike buttons, text inputs always show focus in browsers because the user is about to type, and `:focus-visible` matches inputs on mouse click anyway. | | |
| **Focus ring** | 2px ring outside the border in `--ring` with ≥3:1 contrast against both the input bg and the page; border may change to `--border-focus` | Must not be clipped by `overflow:hidden` parents (common in tables and cards). Use `outline` or an outer `box-shadow` plus `outline: 2px solid transparent` for Windows forced-colors mode. | `--ring`, `--border-focus` |
| **Filled** | Same as default; optional `data-filled` lets a clear button appear | Clear button only shows when filled | n/a |
| **Invalid** | Border `--border-danger`, ring `--ring-danger` when focused; optional trailing error icon | `aria-invalid="true"`; message comes from Field. Don't rely on color alone (WCAG 1.4.1): the text message is the primary cue, the icon is secondary. | `--border-danger`, `--border-danger-hover`, `--ring-danger` |
| **Invalid + hover** | Danger border one step stronger | | `--border-danger-hover` |
| **Disabled** | Reduced contrast (bg `--bg-disabled`, text `--fg-disabled`), `cursor: not-allowed`, addons dimmed too | Not focusable, not submitted with the form, skipped by most screen-reader tab navigation. WCAG exempts disabled controls from contrast rules, but keep the value readable. | `--bg-disabled`, `--fg-disabled`, `--border-disabled` |
| **Read-only** | **Rec:** visually distinct from editable *and* disabled: no hover change, muted bg (`--bg-subtle`), normal text contrast, no focus ring change on hover | Focusable, selectable, copyable, **submitted** with the form, announced as read-only. Hide the clear button. | `--bg-readonly` (alias of `--bg-subtle`) |
| **Autofilled** | Browsers force their own bg (yellow/blue) through `:-webkit-autofill` / `:autofill`. **Rec:** override with `box-shadow: inset 0 0 0 1000px var(--bg-input)` and `-webkit-text-fill-color: var(--fg)`, or at least test in dark mode. | | |
| **Loading / pending** | Trailing spinner in addon; input stays editable | Use `aria-busy` on a related region if results update, not on the input | n/a |

### Why distinct hover/active tokens matter here
shadcn's palette has one `--input` (border) and one `--ring` token, so hover gets hand-rolled per component, or skipped entirely; shadcn's Input has no hover style at all. For inputs you need at least:

- `--border-input` → `--border-input-hover` → `--border-focus` (three steps that still read as the same element)
- the same three steps for `danger` (an invalid field that's hovered must still look invalid)
- `--bg-subtle` / `--bg-subtle-hover` for the ghost variant used in table cells, where hover adds a background rather than a border
- a separate `--bg-readonly` so read-only can't be confused with disabled

**Rec:** define these as semantic tokens shared with Select, Combobox, Textarea and NumberField, so every "field-like" control has the same frame. Name them `--field-*` rather than `--input-*` to make the sharing obvious.

### Read-only: use it sparingly
Adrian Roselli argues read-only controls are confusing: they look editable and screen reader support for "read-only" varies. Carbon keeps them because they stay focusable and readable by screen readers, unlike disabled. **Rec:** support `readOnly` (forms need it, for example a computed field that must be submitted), but document "prefer plain text for display-only values" and make read-only look clearly non-editable.

---

## 5. Behavior and interaction

### Keyboard
Native `<input>` behavior must be preserved untouched: arrows, Home/End, selection, Ctrl/⌘+A, undo, IME composition. The component should add nothing except:
- **Search**: `Escape` clears the value (React Aria `SearchField` does this; native `type=search` does too in Chromium). A second Escape should be left to bubble (closing a popover or dialog). **Rec:** only clear on Escape if there is a value, otherwise let the event propagate.
- **Enter** submits the enclosing form (native). Don't intercept it on a plain Input. For Textarea, Enter inserts a newline; if a "send" pattern needs ⌘/Ctrl+Enter, that's a recipe.
- **IME**: if Enter triggers an action (search, inline edit commit), check `event.nativeEvent.isComposing` (or keyCode 229) first, or Japanese/Chinese/Korean users will submit mid-composition.
- **Adornment buttons** (clear, reveal) are real `<button type="button">` elements. **Rec:** keep them *out* of tab order (`tabIndex={-1}`) only if the same action has a keyboard shortcut (Escape for clear); otherwise keep them tabbable. The reveal-password button must be tabbable.
- After clicking clear, return focus to the input.

### Mobile keyboards: `type`, `inputMode`, `enterKeyHint`
| Data | Attributes |
|---|---|
| Email | `type="email" autoComplete="email" autoCapitalize="none" spellCheck={false}` |
| Phone | `type="tel" autoComplete="tel"` |
| URL | `type="url"` (or `text` + `inputMode="url"` if you allow `example.com` without a protocol, since `type=url` fails validation without one) |
| Integer codes (IDs, postcodes, card) | `type="text" inputMode="numeric" pattern="[0-9]*"` (GOV.UK) |
| Decimal amounts | `type="text" inputMode="decimal"`, parse with locale awareness |
| Search | `type="search" enterKeyHint="search"` and wrap in a `role="search"` form if it is the main page search |
| Username / codes / SKUs | `autoCapitalize="none" autoCorrect="off" spellCheck={false}` |

`enterKeyHint` (`enter`, `done`, `go`, `next`, `search`, `send`) changes the label of the virtual keyboard's return key (MDN).

### `autocomplete` attributes
- WCAG 1.3.5 (AA, "Identify Input Purpose") requires the right `autocomplete` token on fields that collect the user's own data (`name`, `email`, `tel`, `street-address`, `postal-code`, `cc-number`, `organization`, ...).
- Passwords: `current-password` on sign-in, `new-password` on sign-up and change. Password managers rely on this.
- Polaris *requires* the `autoComplete` prop for this reason, and its docs note autofill speeds up form completion considerably.
- `autocomplete="off"` is ignored by Chrome for address and credential fields. For fields that are wrongly autofilled (a "Name" column filter in an admin table), use a non-standard token or, for password managers, the vendor opt-outs `data-1p-ignore` (1Password) and `data-lpignore="true"` (LastPass). **Rec:** document this; don't build it in.
- **Rec:** don't force `autoComplete` as required like Polaris does. Business apps are full of filter and search fields where it's meaningless. Document it strongly and add a dev-mode lint hint for `type="email"`/`"tel"`/`"password"` without it.

### Number input pitfalls (why not `type="number"`)
GOV.UK switched away from `type="number"` because of:
- Mouse wheel / trackpad scroll changes the value while the field is focused, which silently corrupts data. This is especially bad in long forms and modals.
- Chrome accepts `e`, `+`, `-`, `.` anywhere and silently drops other letters with no feedback; `input.value` returns `""` for invalid content, so you can't show a helpful error.
- Leading zeros are lost (`007` → `7`); big IDs lose precision.
- Dragon NaturallySpeaking can't dictate into it, and NVDA exposes the unlabeled spin buttons.
- Spinner arrows appear in desktop browsers and need CSS to remove.
- Locale decimal separators (`1,5`) are handled inconsistently.

**Rec:** Input never uses `type="number"`. For "just digits", use a text input with `inputMode`. For real quantities, use NumberField (Base UI `NumberField` with `format` via `Intl.NumberFormat`, `min`/`max`/`step`, Shift for large step, Alt for small step). Note that Base UI's `allowWheelScrub` is opt-in, which is the right default.

### Formatting and masking
- Masks that rewrite the value on every keystroke (`(555) 123-…`) break caret position in controlled React inputs, break paste, and confuse screen readers. Baymard finds auto-formatting helps for card numbers and phones *only when* it is tolerant: it accepts spaces and dashes, and never blocks a keystroke.
- **Rec:** no mask prop in Input. Recommend: accept loose input, normalize on blur, show the expected format in the description (Field). If masking is needed, use a dedicated library in a recipe.

### Clear button
- Show only when filled, not disabled, not read-only.
- `<button type="button" aria-label="Clear">` with a hit area of at least 24×24 CSS px (WCAG 2.5.8 Target Size, AA). A 12px "×" icon inside a 24px button is fine.
- Clearing must fire the same change path as typing (`onValueChange("")`), so controlled state and form libraries see it, then refocus the input.
- Native `type=search` adds its own WebKit cancel button. **Rec:** hide it (`::-webkit-search-cancel-button { appearance: none }`) when the library provides one, so there are never two.

### Password reveal
- Toggle `type` between `password` and `text`; button `aria-label="Show password"` / `"Hide password"` (or `aria-pressed` with a stable label). Carbon and GOV.UK both ship this.
- Never block paste. WCAG 2.2 SC 3.3.8 (Accessible Authentication) counts paste and password managers as the accepted way around memorization.
- Reset to hidden on form submit so the browser doesn't save the text type in history or autofill weirdly.

### Textarea
- `rows` default ~3–4; vertical resize only (`resize-y`). Horizontal resize breaks layouts.
- Auto-grow: CSS `field-sizing: content` works in Chromium, but Safari and Firefox support is still incomplete as of 2026. **Rec:** use `field-sizing: content` with a `min-h`/`max-h`, and keep a small JS fallback recipe for apps that need it everywhere.
- Character count: GOV.UK lets users exceed the limit and shows an error with the count, rather than hard-blocking with `maxLength`. Carbon blocks. **Rec:** GOV.UK's approach. Hard truncation of pasted text silently loses data. Announce the count politely (`aria-live="polite"`, debounced), not on every keystroke.

---

## 6. Accessibility requirements

1. **Accessible name, always.** Visible `<label for>` via Field.Label is the default. Icon-only search fields in toolbars may use `aria-label`, but the visible icon is not a label. Placeholder is not a label (WCAG 3.3.2, 4.1.2). Field should wire `id`/`htmlFor` automatically; Input must accept an `id` from context.
2. **Placeholder misuse.** NN/g lists seven problems with placeholders as labels (disappears while typing, strains memory, looks pre-filled, makes empty fields less visible, harder error correction). GOV.UK says don't use them. **Rec:** allow placeholders for short examples ("e.g. INV-2024-001") or in search fields that also have an `aria-label`. If used, placeholder color must meet 4.5:1 (it's text).
3. **Description and error association.** Field sets `aria-describedby` to the description and error IDs, and `aria-invalid="true"` on the input when invalid. Error text must say what's wrong and how to fix it (WCAG 3.3.1, 3.3.3). `aria-errormessage` is still unevenly supported by screen readers; `aria-describedby` is the safe choice.
4. **Required.** Use native `required` (or `aria-required` if you do your own validation and don't want native bubbles). Visual "required" or "optional" marking is Field's job.
5. **Non-text contrast (WCAG 1.4.11).** The input's boundary (border or bg vs page) needs ≥3:1 so people can find the field. shadcn's default `--input` border (~zinc-200 on white) is about 1.3:1, which fails. **Rec:** this is the most important palette fix for Input.
6. **Focus.** Visible focus indicator (2.4.7), not obscured by sticky headers or footers (2.4.11, new in 2.2), and ideally meeting 2.4.13 Focus Appearance (2px, 3:1 change). Test the ring in forced-colors mode.
7. **Adornments.** Decorative icons get `aria-hidden`. Units and prefixes ("kg", "$") that matter for meaning must be in the accessible name or description. GOV.UK hides prefix and suffix from screen readers, so the label itself must say "Weight, in kilograms". **Rec:** follow GOV.UK: addon text `aria-hidden`, and document that the label carries the unit.
8. **Disabled vs. `aria-disabled`.** Native `disabled` removes the field from tab order, so screen-reader users may never learn it exists. For "you can't edit this yet because X", consider read-only plus description, or `aria-disabled="true"` with blocked input. Keep native `disabled` as the default.
9. **Target size.** Clear and reveal buttons need a 24×24 px target (2.5.8). Small sizes (`sm` 28px) still fit this.
10. **Redundant entry (3.3.7).** Not Input's job, but autocomplete and keeping values on validation errors help. Never clear a field because it failed validation.

---

## 7. API shape recommendations

### How libraries do it

| | Base UI | shadcn/ui | React Aria Components | Polaris / Atlassian |
|---|---|---|---|---|
| Primitive | `Input` = native input, one part, integrates with `Field.Root` | `Input` = styled `<input>`, no logic | `Input` inside `TextField` (context provides label, description, error) | `TextField` all-in-one with `label`, `helpText`, `error` props |
| Value | `value` / `defaultValue` / `onValueChange(value, details)` | native `value`/`onChange` | `value`/`defaultValue`/`onChange(value: string)` | `value`/`onChange(value)` (Polaris is controlled-only) |
| Adornments | Not in Input; you compose. NumberField has its own `Group`. | `InputGroup` + `InputGroupAddon align="inline-start\|inline-end\|block-start\|block-end"`, `InputGroupButton`, `InputGroupText`, `InputGroupInput`, `InputGroupTextarea` | `Group` wrapping Input + Buttons; `SearchField` with built-in clear | Polaris `prefix`, `suffix`, `clearButton`, `connectedLeft/Right`; Atlassian `elemBeforeInput`, `elemAfterInput` |
| State styling | `data-*` attributes + `className` as function of state | Tailwind `aria-invalid:` / `disabled:` selectors | `data-*` + render props | internal |
| Variants | none (headless) | none | none | Atlassian `appearance: standard\|subtle\|none`, `isCompact`, `isMonospaced` |

Observations:
- All-in-one props (Polaris `prefix`/`suffix`) are easy to start with but run out fast: a Select as prefix, two buttons on the end, a tooltip on an icon.
- Pure composition (shadcn InputGroup) is flexible but verbose, and has a DOM-order gotcha: shadcn requires the addon to come *after* the input in the DOM, and uses CSS `order` to place it visually. That's because the frame uses `has-[…:focus-visible]` and sibling selectors. Screen-reader reading order then differs from visual order.

### Recommended shape for business-ui (Rec)

```tsx
// 1. Plain: Input is the frame
<Field.Root invalid={!!err}>
  <Field.Label>Email</Field.Label>
  <Input type="email" autoComplete="email" size="md" />
  <Field.Error>{err}</Field.Error>
</Field.Root>

// 2. With adornments: InputGroup is the frame, Input becomes borderless automatically
<InputGroup size="sm">
  <InputGroup.Addon><SearchIcon /></InputGroup.Addon>
  <Input type="search" aria-label="Search orders" />
  <InputGroup.Addon><Kbd>⌘K</Kbd></InputGroup.Addon>
  <InputGroup.Clear />            {/* reads value from context, hides when empty */}
</InputGroup>

// 3. Prebuilt recipe (small, still built from the parts)
<PasswordInput autoComplete="current-password" />
```

Decisions behind this:
- **Input wraps Base UI `Input`** to get Field integration and `data-*` states for free; forward `ref` (React 19: `ref` as prop) and spread all native props.
- **`size` and `variant` (`default | ghost`) via a class-variance helper**, matching Button and Select names and heights exactly.
- **InputGroup uses context, not DOM-order tricks.** Group provides `size`, `disabled`, `invalid`, `readOnly` to children; Input inside a group drops its own border and ring; the group draws them using `:focus-within` (or `has-[input:focus-visible]`). Addons can then sit before the input in DOM order, which matches visual and reading order.
- **Addons are flexible:** text (`$`, `kg`, `https://`), icon, `<Button size="icon-xs" variant="ghost">`, or an embedded `<Select variant="ghost">` for unit/country pickers. Addon text defaults to `aria-hidden`.
- **Controlled and uncontrolled both supported**, like Base UI: `value` + `onValueChange` (string), or `defaultValue`. Keep native `onChange` working too, since react-hook-form's `register()` depends on it and uses uncontrolled inputs with refs. **Rec:** test against react-hook-form, TanStack Form and plain `<form action>`/FormData.
- **No `label`, `error`, `helperText` props on Input.** That's Field's job; mixing them in leads to Polaris-style all-in-one props.
- **No `mask`, `prefix`/`suffix` string props, or `clearable` boolean on Input.** Keep Input a thin native wrapper, put features in InputGroup parts. (A `clearable` shortcut could live on a `SearchInput` recipe.)
- **Textarea** shares the same tokens, sizes (padding and text size only; height from `rows`), states and Field integration. Supports `autoResize` (or `field-sizing`) and a block-end addon for counters or toolbars, as shadcn's `block-end` does.

---

## 8. Common pitfalls and bugs seen in the wild

1. **Low-contrast borders.** Fails WCAG 1.4.11 in many shadcn themes; inputs disappear on light-grey cards.
2. **iOS zoom on focus** from 14px text (dozens of GitHub issues: Bluesky, GitLab MR, Tauri apps). Fix: 16px on small screens.
3. **`type="number"` wheel scroll** silently changes values; `e` accepted; `value === ""` for invalid entry; leading zeros lost (GOV.UK).
4. **Autofill styling** ignores the theme: white/yellow boxes in dark mode (Tailwind discussion #14031, MudBlazor issues). Fix with `:autofill` overrides and test in both themes.
5. **Controlled input caret jump.** Changing the value during render (formatting, uppercasing) or async state updates moves the caret to the end. Fix: format on blur, or use uncontrolled with an `onValueChange` side channel.
6. **IME composition** submits on Enter mid-word (search boxes, chat inputs). Check `isComposing`.
7. **Placeholder used as label**, especially in filter bars and login forms (NN/g).
8. **Two clear buttons** on `type=search` in Chromium (native + custom).
9. **Focus ring clipped** by `overflow: hidden` on table cells, cards and scroll containers. Use an inset ring for the ghost/in-cell variant.
10. **Adornments not clickable to focus.** Clicking the icon or "$" doesn't focus the input.
11. **Addon buttons submit the form** because `type="button"` was forgotten.
12. **Password managers** inject icons over the trailing addon area (1Password, LastPass). Leave padding or use their ignore attributes on non-credential fields.
13. **Chrome ignores `autocomplete="off"`** and autofills admin filter fields with the user's own name/email.
14. **`maxLength` truncation on paste** cuts data silently (GOV.UK character count guidance).
15. **Read-only looks identical to editable**, so users try to type and think the app is broken. Or read-only looks identical to disabled.
16. **`type="email"` quirks.** It trims whitespace in `.value`; `setSelectionRange` throws on email/number in Chrome, which breaks "select all on focus" helpers.
17. **Disabled inputs in a fieldset** not reflected in the custom group frame styling (frame looks enabled, input is disabled). Drive frame styles from context or `:has(:disabled)`.
18. **Hover styles on touch devices** stick after tap. Guard with `@media (hover:hover)`.

---

## 9. Open questions and decisions for business-ui

1. **Default size and density scale.** 32px `md` default for admin density, or 36px with a `density` context? Must be one decision across Button, Select, Input. (Rec: 32px default, `sm` 28, `lg` 36–40.)
2. **Token names.** `--field-border`, `--field-border-hover`, `--field-bg`, `--field-bg-readonly`, `--field-ring`, plus `-danger` variants. Do these live in the core palette or a "form" token layer?
3. **Focus ring on mouse focus.** Always show on inputs (Rec), even though Buttons use `:focus-visible`-only?
4. **InputGroup DOM order.** Use context and `:focus-within` so addons can come first in DOM (Rec), or copy shadcn's after-input rule for easier CSS?
5. **Clear button in tab order?** Rec: not tabbable when Escape clears, tabbable otherwise. Needs a decision and a screen reader test.
6. **Ship PasswordInput and SearchInput as packages or as docs recipes?** Rec: PasswordInput prebuilt; Search as recipe.
7. **Textarea auto-grow:** CSS `field-sizing` only (progressive) or a JS fallback?
8. **Warning state:** Field-level description only (Rec) or an Input `data-warning` style like Carbon?
9. **NumberField scope:** is it part of the Input package or its own package wrapping Base UI NumberField? (Rec: its own package; Input docs link to it.)
10. **Dev-mode warnings:** missing accessible name, `type="number"` used, missing `autoComplete` on email/tel/password. Worth the bundle bytes in dev builds?
11. **Inline/table editing:** is the `ghost` variant enough, or does business-ui need an `EditableText` primitive (view/edit toggle, commit on Enter/blur, cancel on Escape)?

---

## 10. Sources

- Base UI Input: https://base-ui.com/react/components/input
- Base UI Field: https://base-ui.com/react/components/field
- Base UI Number Field: https://base-ui.com/react/components/number-field
- shadcn/ui Input: https://ui.shadcn.com/docs/components/input
- shadcn/ui Input Group: https://ui.shadcn.com/docs/components/input-group
- React Aria TextField: https://react-aria.adobe.com/TextField
- React Aria SearchField: https://react-spectrum.adobe.com/react-aria/SearchField.html
- Atlassian Textfield: https://atlassian.design/components/textfield/code
- Shopify Polaris Text field: https://polaris-react.shopify.com/components/selection-and-input/text-field
- Carbon Text input usage: https://carbondesignsystem.com/components/text-input/usage/
- GOV.UK Text input: https://design-system.service.gov.uk/components/text-input/
- GOV.UK Character count: https://design-system.service.gov.uk/components/character-count/
- GOV.UK: why we changed the input type for numbers: https://technology.blog.gov.uk/2020/02/24/why-the-gov-uk-design-system-team-changed-the-input-type-for-numbers/
- NN/g, Placeholders in form fields are harmful: https://www.nngroup.com/articles/form-design-placeholders/
- Adrian Roselli, Avoid read-only controls: https://adrianroselli.com/2024/11/avoid-read-only-controls.html
- Adrian Roselli, Brief note on aria-readonly support: https://adrianroselli.com/2022/11/brief-note-on-aria-readonly-support-html.html
- MDN `aria-readonly`: https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-readonly
- MDN `inputmode`: https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/inputmode
- MDN `enterkeyhint`: https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/enterkeyhint
- MDN `autocomplete`: https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete
- MDN `field-sizing`: https://developer.mozilla.org/en-US/docs/Web/CSS/field-sizing
- WCAG 2.2 (1.3.5, 1.4.11, 2.4.7, 2.4.11, 2.4.13, 2.5.8, 3.3.1–3.3.3, 3.3.7, 3.3.8): https://www.w3.org/TR/WCAG22/
- WAI Forms tutorial, labeling controls: https://www.w3.org/WAI/tutorials/forms/labels/
- Defensive CSS, input zoom on iOS Safari: https://defensivecss.dev/tip/input-zoom-safari/
- Bluesky issue, input font-size causes zoom on iOS: https://github.com/bluesky-social/social-app/issues/8494
- GitLab MR, fix iOS input zoom: https://gitlab.com/gitlab-org/gitlab/-/merge_requests/220666
- Tailwind discussion, autofill styling with shadcn and dark mode: https://github.com/tailwindlabs/tailwindcss/discussions/14031
- MudBlazor issue, dark mode breaks on autofill: https://github.com/MudBlazor/ThemeManager/issues/19
- Rick Strahl, Making HTML input controls truly read-only: https://weblog.west-wind.com/posts/2025/Mar/14/Making-Html-Input-Controls-Truly-ReadOnly
- Baymard, form field input formatting / masking research: https://baymard.com/blog/input-masking-form-field
