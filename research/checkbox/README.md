# Checkbox

Research only, no code. Scope: a single checkbox, the indeterminate (mixed) state, checkbox groups, and when Switch or Radio fits better. Labels, hints and error text belong to [Field](../field/README.md). This file only covers how Checkbox plugs into Field.

Statements marked **Recommendation** are opinions for business-ui. Everything else comes from the cited sources.

---

## 1. Purpose, and when to use it

A checkbox is a binary control that lives inside a form: the user ticks it, and nothing happens until the form is submitted. A group of checkboxes is how you pick zero or more items from a list.

**Use it for:**

- **A standalone yes/no that is submitted with a form.** For example "Send invoice by email", "I agree to the Terms of Service" ([Polaris](https://polaris-react.shopify.com/components/selection-and-input/checkbox)), or a "Remember me" option.
- **Picking several options from a short list.** Each option is independent of the others ([NN/g](https://www.nngroup.com/articles/checkboxes-vs-radio-buttons/), [GOV.UK](https://design-system.service.gov.uk/components/checkboxes/)).
- **Bulk selection.** Row selection in data tables, with a "select all" header checkbox that can show a mixed state ([Carbon](https://carbondesignsystem.com/components/checkbox/usage/), [APG mixed example](https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/examples/checkbox-mixed/)). This is the most important use for business-ui.
- **Filter panels.** Multi-select facets such as Status: Open / Pending / Closed ([Carbon](https://carbondesignsystem.com/components/checkbox/usage/)).
- **Parent and child option trees.** An installer-style list or a permissions matrix ([APG](https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/)).

**Do not use it, and use something else instead:**

| Situation | Use | Why |
| --- | --- | --- |
| Exactly one choice from mutually exclusive options | **Radio group**, or Select when there are more than about 5 options | "Do not use the checkboxes component if users can only choose one option" ([GOV.UK](https://design-system.service.gov.uk/components/checkboxes/), [NN/g](https://www.nngroup.com/articles/checkboxes-vs-radio-buttons/)) |
| An on/off setting that takes effect immediately, with no Save button | **Switch** | "Toggle switches should take immediate effect and should not require the user to click Save or Submit" ([NN/g toggle guidelines](https://www.nngroup.com/articles/toggle-switch-guidelines/)) |
| A binary choice where both options need a name (for example "Monthly / Yearly") | **Radio group** or a segmented control | A checkbox only names one side. Unticking "Monthly" does not say "Yearly". |
| Triggering an action | **Button** | A checkbox describes state. It does not perform an action. |
| A toolbar toggle such as Bold, or a view toggle | **Toggle button** (`aria-pressed`) | Different semantics. Not a form value. |

**Recommendation, as a rule of thumb for docs:** "If the change only counts after the user clicks Save, use a Checkbox. If it applies the moment the user flips it, use a Switch." Never put Switches inside a form that has a submit button. NN/g warns that this mix "confuses users because they can't be sure whether their toggle choice will take immediate effect" ([NN/g](https://www.nngroup.com/articles/toggle-switch-guidelines/)).

Content guidelines worth putting in the docs:

- **Word labels positively.** Write "Send me updates", not "Don't send me emails" ([NN/g](https://www.nngroup.com/articles/checkboxes-vs-radio-buttons/), [Polaris](https://polaris-react.shopify.com/components/selection-and-input/checkbox)).
- **Stack options vertically, one per line** ([NN/g](https://www.nngroup.com/articles/checkboxes-vs-radio-buttons/)).
- **Put the box on the left and the label on the right.** GOV.UK says this is easier to find for users of screen magnifiers ([GOV.UK](https://design-system.service.gov.uk/components/checkboxes/), [Carbon](https://carbondesignsystem.com/components/checkbox/usage/)).
- **Do not pre-select options in questions.** GOV.UK found that pre-selection causes missed questions ([GOV.UK](https://design-system.service.gov.uk/components/checkboxes/)). Settings forms that reflect the current saved state are fine.
- **Offer an explicit "None" when no selection is a valid answer.** Make it exclusive: ticking it clears the others ([GOV.UK](https://design-system.service.gov.uk/components/checkboxes/)).

---

## 2. Anatomy

```
CheckboxGroup (role=group, labelled by Field/Fieldset legend)
├─ [Parent checkbox]  "Select all"          ← optional, may be mixed
└─ Item × n
   ├─ Root (the control: role=checkbox, focusable, the "box")
   │  └─ Indicator (check icon | minus icon)
   ├─ hidden native <input type="checkbox"> (form value, validation)
   └─ Label (+ optional description)  ← provided by Field
```

| Part | Notes |
| --- | --- |
| **Root** | The focusable control. Base UI renders a `<span>` with `role="checkbox"` and a hidden `<input>` next to it ([Base UI](https://base-ui.com/react/components/checkbox)). Radix renders a `<button>` plus a "BubbleInput" ([Radix](https://www.radix-ui.com/primitives/docs/components/checkbox)). React Aria and Ariakit use a real `<input type="checkbox">` ([React Aria](https://react-aria.adobe.com/Checkbox), [Ariakit](https://ariakit.com/components/checkbox)). |
| **Indicator** | Holds the check or minus glyph. It must render **different glyphs** for checked and indeterminate. See pitfall 8.1. |
| **Hidden input** | Carries `name`, `value`, `required`, `form` and native validation. It is invisible but must stay in the DOM. |
| **Label** | Comes from Field (`Field.Label`), or from a wrapping `<label>`. The whole label must be clickable. |
| **Description** | Optional secondary line under the label, for example "Applies to all workspaces". Comes from Field (`Field.Description`) and is wired with `aria-describedby`. |
| **Group** | `role="group"` (a `fieldset`) with a legend. The legend, group-level hint and group-level error all come from Field/Fieldset. |

---

## 3. Variants and sizes

**Recommendation: keep the variant surface minimal.** A checkbox is not a place for brand expression. In business UIs, consistency and density matter more than options.

| Axis | Recommendation | Reasoning |
| --- | --- | --- |
| **Size** | Two sizes: `sm` (box 14px, for dense tables and toolbars) and `md` (box 16px, the default). Skip `lg`. | shadcn ships a single `size-4` (16px) box ([shadcn source](https://github.com/shadcn-ui/ui/blob/main/apps/v4/registry/new-york-v4/ui/checkbox.tsx)). Atlassian and Carbon document no size variants. Dense data grids are where `sm` helps. Either way, the **hit area** has to grow even when the box does not (see §6). |
| **Color / tone** | One accent, the `primary` token. No `color` prop. | Polaris has only a niche `tone="magic"`. Color variants mostly add bloat. Invalid styling is a **state**, not a variant. |
| **Shape** | Rounded square with a small radius (`--radius-checkbox`, about 3–4px). Never a circle. | A circle reads as a radio button. |
| **Label position** | Label on the right only, and LTR/RTL-aware. No left-label variant. | [GOV.UK](https://design-system.service.gov.uk/components/checkboxes/), [Carbon](https://carbondesignsystem.com/components/checkbox/usage/), [Atlassian](https://atlassian.design/components/checkbox/usage). |
| **"Card" / tile checkbox** (a whole bordered tile is selectable) | Optional and later, as a recipe built from Root plus a styled label. Not a variant. | Useful for plan or feature pickers. It can be built from the primitives and needs no separate API. |
| **Group orientation** | `vertical` (default) and `horizontal`. | Horizontal only for 2–3 short options. NN/g prefers vertical. |
| **Bloat to avoid** | Custom icon prop, animation variants, outline vs filled styles, "warning" state | Carbon has a warning state, but for business-ui an invalid state plus Field text is enough. |

---

## 4. States

| State | Visual (recommendation) | Behavior / attributes |
| --- | --- | --- |
| **Unchecked** | `--surface` fill, `--border-strong` 1px border. The border needs **≥3:1 contrast** against the background ([WCAG 1.4.11](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html)). | `aria-checked="false"`, `data-unchecked` |
| **Checked** | `--primary` fill and border, with the check glyph in `--primary-fg`. The glyph also needs ≥3:1 against the fill. | `aria-checked="true"`, `data-checked` |
| **Indeterminate** | Same fill as checked, with a **minus** glyph instead of the check. | `aria-checked="mixed"`, `data-indeterminate`. The native `input.indeterminate` is JS-only and does not change the submitted value ([MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/checkbox)). |
| **Hover** | Unchecked: border becomes `--border-hover` and the background a subtle `--primary-subtle`. Checked or mixed: fill becomes `--primary-hover`. **Hovering the label also triggers the box's hover style** (via `group-hover` or a `peer` selector). | `data-hovered` (React Aria). With Base UI, use the CSS `:hover` on the root or label. |
| **Active / pressed** | Unchecked: `--primary-subtle-active` background. Checked: `--primary-active` fill. Optionally a 0.5px inset or scale(0.95). | React Aria exposes `data-pressed`. Otherwise use CSS `:active`. |
| **Focus-visible** | 2px ring in `--ring` with a 2px offset, shown **for keyboard focus only**. The ring needs ≥3:1 contrast against its surroundings ([WCAG 1.4.11](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html)). | `:focus-visible` or `data-focus-visible`. Base UI's `data-focused` also matches mouse focus, so do not use it for the ring. |
| **Disabled** | 50% opacity on the box **and** label, `cursor: not-allowed`. Exempt from contrast rules ([WCAG 1.4.11](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html)). | Not focusable, and the value is **not submitted**. See the note below. |
| **Read-only** | Box keeps its checked or unchecked look, with a muted fill (`--muted`) and no hover or active response. **Do not** dim it like disabled. | Focusable, announced, and **submitted** ([Base UI](https://base-ui.com/react/components/checkbox): "remaining focusable and submittable"). Use it for "view mode" forms and audit screens. |
| **Invalid** | `--danger` border. When checked, the fill stays primary but the border or ring turns danger. The message comes from Field. | `aria-invalid="true"`, `data-invalid`. Only set after interaction or submit, never on first render. |

**Why distinct hover and active tokens matter here.** shadcn's checkbox has **no hover style and no pressed style at all**. Its classes cover only focus-visible, disabled, `aria-invalid` and `data-[state=checked]` ([shadcn source](https://github.com/shadcn-ui/ui/blob/main/apps/v4/registry/new-york-v4/ui/checkbox.tsx)). In dense tables, users sweep down a column of row checkboxes, so hover feedback tells them which row they are about to hit. **Recommendation:** Checkbox should use the same token set as Button: `--primary`, `--primary-hover`, `--primary-active` for filled states, and `--primary-subtle`, `--primary-subtle-hover` for the unchecked hover wash. It should not invent its own.

**Note on disabled versus "unavailable".** Atlassian advises against disabling a checkbox when users need to understand why it is unavailable. Use validation instead, so screen reader users can still reach the control ([Atlassian](https://atlassian.design/components/checkbox/usage)). Ariakit supports `accessibleWhenDisabled`, which sets `aria-disabled` and keeps the control focusable ([Ariakit](https://ariakit.com/components/checkbox)). **Recommendation:** support a `focusableWhenDisabled` option for table rows that cannot be selected, for example "row locked by another user", paired with a tooltip that explains why.

**Forced colors (Windows High Contrast).** Custom checkboxes drawn only with background colors can vanish. **Recommendation:** draw the box with a real `border`, and render the check glyph as an SVG whose stroke is `currentColor`. Test with `@media (forced-colors: active)`.

---

## 5. Behavior and interaction

### Keyboard
- **Tab / Shift+Tab** moves focus between checkboxes. Every checkbox is its own tab stop. That is unlike a radio group, which uses roving tabindex ([APG](https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/)).
- **Space** toggles the checkbox. That is the only required key ([APG](https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/)).
- **Enter** does **not** toggle. In a native form, Enter on a checkbox submits the form (implicit submission). A custom `<button>`-based root must make sure Enter neither toggles nor swallows that behavior. **Recommendation:** match native behavior.

### Pointer and click target
- **The label is part of the click target.** NN/g cites Fitts's Law ([NN/g](https://www.nngroup.com/articles/checkboxes-vs-radio-buttons/)). Use a native `<label htmlFor>` or Field's label wiring.
- **Recommendation:** in table rows, make the whole cell clickable, not just the 16px box. Better still, toggle selection on a row click that does not land on an interactive element, but only when rows have no other primary click action.
- **Shift+click range selection** is an expected power-user pattern in admin tables, as in Gmail. It is not part of the checkbox primitive. **Recommendation:** document it as a Table/selection recipe.

### Form submission and values
- Native semantics: when checked, the input submits `name=value`. `value` defaults to `"on"`. When unchecked, **nothing is submitted** ([MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/checkbox)).
- Base UI adds `uncheckedValue` to submit something when unchecked, `form` to associate a checkbox rendered outside its `<form>`, and `inputRef` for access to the hidden input ([Base UI](https://base-ui.com/react/components/checkbox)).
- Indeterminate state is **not** a value. It never changes what gets submitted ([MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/checkbox)).
- `required` on a single checkbox means "must be checked" (`valueMissing`). That fits terms acceptance. "At least one in a group" is **not** native and must be validated at group or Field level.
- Disabled checkboxes are not submitted. Read-only ones are.
- A form reset (`<button type="reset">`) should restore `defaultChecked`. Custom implementations often miss this. Base UI has had related reset bugs in Field ([base-ui#5765](https://github.com/mui/base-ui/issues/5765)). **Recommendation:** add it to the test matrix.

### Select-all and parent checkbox patterns
- **Parent state is derived:** all children checked → checked; some → mixed; none → unchecked ([APG](https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/)).
- **Activating a parent that is mixed** has two common designs:
  1. **Mixed → all checked → none**, so it skips mixed when clicked. This is what Base UI's `parent` checkbox does via `allValues` ([Base UI CheckboxGroup](https://base-ui.com/react/components/checkbox-group)) and what most table libraries do.
  2. **Unchecked → mixed (restore the previous partial selection) → checked**. This is the APG reference example ([APG mixed example](https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/examples/checkbox-mixed/)).

  **Recommendation:** use (1) for tables and filters, because users expect a predictable "select all". Expose (2) only on request.
- **Table select-all scope.** "Select all" usually means "all on this page". Business apps need an explicit banner: "All 50 on this page are selected. Select all 1,284 matching rows?" That logic belongs to the Table component, but Checkbox must support being **controlled** with `indeterminate` driven externally, without fighting internal state.
- **Disabled children.** "Select all" should skip disabled rows. The parent should count as fully checked when every *selectable* child is checked.
- **Exclusive "None" option.** Ticking "None" clears the others, and ticking any other option clears "None" ([GOV.UK](https://design-system.service.gov.uk/components/checkboxes/)). This is a group-level behavior, and a recipe is enough.

---

## 6. Accessibility requirements

| Requirement | Detail |
| --- | --- |
| **Role** | `role="checkbox"`, either native `<input type=checkbox>` or ARIA on a span or button ([APG](https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/)). |
| **State** | `aria-checked="true" \| "false" \| "mixed"`. A native input with `.indeterminate = true` is exposed as mixed automatically. |
| **Accessible name** | From a visible `<label>`, `aria-labelledby`, or `aria-label`. **Row checkboxes in tables need a name.** Example: `aria-label="Select row: Invoice #1042"`, and "Select all rows" for the header, not just "Select". **Recommendation:** make the name required in TypeScript when no children or Field label exist, or warn in dev. |
| **Description** | Hint text via `aria-describedby`, which Field wires up. |
| **Group** | `role="group"` (or `<fieldset>` and `<legend>`) labelled by the group label ([APG](https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/), [GOV.UK](https://design-system.service.gov.uk/components/checkboxes/)). A group-level error must be referenced by the group, not only by the individual boxes. |
| **Parent → children relationship** | Optional `aria-controls` listing the child IDs ([APG mixed example](https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/examples/checkbox-mixed/)). It has little AT support, but it is harmless. |
| **Focus** | Visible focus indicator with ≥3:1 contrast ([WCAG 1.4.11](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html)). Never `outline: none` without a replacement. |
| **Contrast** | Unchecked border ≥3:1 against the background. The check glyph ≥3:1 against the fill. Invalid state must not rely on color alone; Field supplies the error text. |
| **Target size** | WCAG 2.2 SC 2.5.8 requires 24×24 CSS px, **or** spacing such that a 24px circle centered on the target overlaps no other target ([WCAG 2.5.8](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html)). A 16px box alone fails unless spaced. **Recommendation:** give the root an invisible hit area of at least 24×24 (a pseudo-element with `inset: -4px`), and make the label clickable. For stacked lists, keep row gap ≥8px at `md`. |
| **Disabled** | Native `disabled` removes the control from tab order. Use `aria-disabled` when it must stay discoverable. |
| **Read-only** | `aria-readonly` is valid on `role="checkbox"`. The HTML `readonly` attribute does nothing on a native checkbox ([MDN aria-readonly](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-readonly)). However, screen readers barely support it: in Adrian Roselli's tests, only NVDA with Firefox announced it ([Roselli 2022](https://adrianroselli.com/2022/11/brief-note-on-aria-readonly-support-html.html)). **Recommendation:** set `aria-readonly`, but also convey read-only through Field description text when it matters. |

---

## 7. API shape: recommendations and comparison

### How libraries model it

| | **Base UI** | **Radix** | **React Aria (RAC)** | **Ariakit** |
| --- | --- | --- | --- | --- |
| Element | `<span role=checkbox>` + hidden input. `nativeButton` option. | `<button role=checkbox>` + BubbleInput | Native `<input>`, visually hidden, inside a `<label>` | Native `<input>` by default |
| Checked prop | `checked` / `defaultChecked` (boolean) | `checked` / `defaultChecked`: `boolean \| 'indeterminate'` | `isSelected` / `defaultSelected` | Store `value`: `boolean \| 'mixed' \| string[]` |
| Indeterminate | Separate `indeterminate` boolean | Folded into `checked` | Separate `isIndeterminate`, "presentational only" | `'mixed'` value |
| Change handler | `onCheckedChange(checked, eventDetails)` | `onCheckedChange(checked)`. No DOM event ([radix#3356](https://github.com/radix-ui/primitives/issues/3356)) | `onChange(isSelected)` | store `setValue` |
| Group | `CheckboxGroup` with `value: string[]`, `allValues`, and a `parent` checkbox | **None** | `CheckboxGroup` with `value: string[]` and group-level validation | `CheckboxProvider` with an array value |
| Form extras | `name`, `value`, `uncheckedValue`, `form`, `required`, `readOnly`, `inputRef` | `name`, `value`, `required`; `form` was historically broken ([radix#2530](https://github.com/radix-ui/primitives/issues/2530)) | `name`, `value`, `isRequired`, `isReadOnly`, `isInvalid`, `validationBehavior` | Native attrs |
| Styling hooks | `data-checked`, `data-unchecked`, `data-indeterminate`, `data-disabled`, `data-readonly`, `data-invalid`, `data-dirty`, `data-touched`, `data-focused` | `data-state=checked\|unchecked\|indeterminate`, `data-disabled` | `data-selected`, `data-indeterminate`, `data-hovered`, `data-pressed`, `data-focus-visible`, `data-invalid`, `data-readonly` | `aria-checked`, `aria-disabled` selectors |

Sources: [Base UI Checkbox](https://base-ui.com/react/components/checkbox), [Base UI CheckboxGroup](https://base-ui.com/react/components/checkbox-group), [Radix](https://www.radix-ui.com/primitives/docs/components/checkbox), [React Aria](https://react-aria.adobe.com/Checkbox), [Ariakit](https://ariakit.com/components/checkbox).

### Recommended business-ui API (on top of Base UI)

**Recommendation:** keep Base UI's prop names (`checked`, `onCheckedChange`, `indeterminate`). Keep `indeterminate` as a separate boolean rather than folding it into `checked`. This keeps `checked` a plain boolean for form libraries, and a derived `indeterminate` from table state passes straight through. Ship a single convenience component and expose the parts for anyone who needs to restyle.

```tsx
// Simple (90% case): box + label in one, Field-aware
<Checkbox name="notify" defaultChecked>Email me when invoices are paid</Checkbox>

// Props
type CheckboxProps = {
  checked?: boolean; defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean, details: { event: Event }) => void;
  indeterminate?: boolean;
  name?: string; value?: string; uncheckedValue?: string; form?: string;
  required?: boolean; disabled?: boolean; readOnly?: boolean;
  invalid?: boolean;                // usually inherited from Field
  size?: 'sm' | 'md';               // default 'md'
  children?: ReactNode;             // label; omit when used inside Field.Label
  description?: ReactNode;          // shortcut for Field.Description
  className?: string;               // root (box)
} & Omit<BaseCheckbox.Root.Props, ...>;

// Group
<CheckboxGroup
  value={roles} onValueChange={setRoles}  // string[]
  allValues={['read','write','admin']}    // enables <Checkbox parent />
  orientation="vertical"
>
  <Checkbox parent>All permissions</Checkbox>
  <Checkbox value="read">Read</Checkbox>
  ...
</CheckboxGroup>
```

Further recommendations:

- **Support both controlled and uncontrolled modes** (`checked` / `defaultChecked`, `value` / `defaultValue`). Uncontrolled plus a native `name` must work with plain `<form>` and `FormData`, with no form library required. That is the "no lock-in" goal.
- **Pass the event, or event details, through to `onCheckedChange`.** Radix users cannot call `e.currentTarget.form.requestSubmit()` because Radix gives only a boolean ([radix#3356](https://github.com/radix-ui/primitives/issues/3356)). Base UI passes `eventDetails`.
- **Document react-hook-form usage with `Controller`** (`field.value` → `checked`, `field.onChange` → `onCheckedChange`). `register()` does not work with non-native roots. Also document a TanStack Form recipe.
- **Plug into Field.** Inside `<Field>`, Checkbox reads `id`, `invalid`, `disabled` and `required` from context, and `Field.Label` targets it. For groups, `<Fieldset render={<CheckboxGroup/>}>` with `Fieldset.Legend` labels the group, which is Base UI's documented composition ([Base UI CheckboxGroup](https://base-ui.com/react/components/checkbox-group)). Field owns the layout: box, then label, then description stacked under the label and aligned to the label's text edge, not the box.
- **Styling hooks:** use Base UI's `data-*` attributes as Tailwind variants (`data-checked:`, `data-indeterminate:`, `data-invalid:`). Mirror a `data-slot="checkbox"` like shadcn, so parents can target it.
- **Do not wrap the box and label in a single `<label>` around a `<button>`.** See pitfall 8.4. Use sibling elements with `htmlFor`, or Base UI's documented label pattern.

---

## 8. Common pitfalls and bugs seen in the wild

1. **Indeterminate looks identical to checked.** shadcn's Base UI port rendered a check icon for both states, because `Indicator` renders in both and only `data-checked` was styled ([shadcn#9357](https://github.com/shadcn-ui/ui/issues/9357)). **Fix:** switch the glyph on `data-indeterminate` and test both states visually.
2. **No hover or pressed styles.** shadcn's checkbox has neither ([source](https://github.com/shadcn-ui/ui/blob/main/apps/v4/registry/new-york-v4/ui/checkbox.tsx)), which feels dead in dense tables.
3. **The hidden input is not rendered or not associated.** Radix only rendered its BubbleInput when it found an ancestor `<form>`, so the `form="id"` attribute was ignored and `FormData` missed the value ([radix#2530](https://github.com/radix-ui/primitives/issues/2530)). Base UI supports `form` explicitly. Test checkboxes rendered in portals and in dialogs whose footer sits outside the `<form>`.
4. **Double toggle or double click events.** A `<button>` (or any custom root) nested inside a `<label>` makes the click fire twice. Users see "nothing happens", or parent `onClick` runs twice ([zenn: label+button](https://zenn.dev/uhyo/articles/label-button-onclick-twice?locale=en), [chakra#2854](https://github.com/chakra-ui/chakra-ui/issues/2854), [Semantic UI#3433](https://github.com/Semantic-Org/Semantic-UI-React/issues/3433)). Base UI warns that `nativeButton` needs the `render` pattern to stay valid inside labels ([Base UI](https://base-ui.com/react/components/checkbox)).
5. **Form libraries cannot `register()` it.** There is no native `onChange` event, only `onCheckedChange(boolean)` ([radix#3356](https://github.com/radix-ui/primitives/issues/3356), [radix#1851](https://github.com/radix-ui/primitives/issues/1851)). This needs docs and a `Controller` recipe.
6. **Unchecked boxes are missing from the payload.** This is native behavior ([MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/checkbox)), but it surprises people with PATCH-style "settings" forms that need an explicit `false`. Use `uncheckedValue`, or make the server treat absence as false.
7. **Clicking a mixed checkbox clears the indeterminate flag.** On a native input, the browser drops `indeterminate` on click. If the app does not re-derive it from data, the UI drifts. **Fix:** always derive `indeterminate` from data, never store it.
8. **Disabled checkboxes vanish from submissions and keyboard order.** Teams use `disabled` for "view mode" when they meant `readOnly`.
9. **Tiny hit area.** A 16px box with no padding and an unclickable label in a table cell fails WCAG 2.5.8 ([WCAG 2.5.8](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html)) and slows users down.
10. **Unlabelled row checkboxes.** A screen reader announces "checkbox, not checked" fifty times with no row context. Each row checkbox needs an `aria-label` that names the row.
11. **Select-all semantics are ambiguous.** It is unclear whether "all" means this page or the whole dataset, and whether "all" includes disabled rows. This should be decided in the Table spec (see §5).
12. **Form reset does not restore state** for custom controls, and `data-filled`/dirty flags go stale ([base-ui#5765](https://github.com/mui/base-ui/issues/5765)).
13. **Mixing Switches into submit forms**, or using a Checkbox for an instant setting, leaves users unsure whether the change has been saved ([NN/g](https://www.nngroup.com/articles/toggle-switch-guidelines/)).
14. **Gaps in Base UI's indeterminate support elsewhere.** For example, `Menu.CheckboxItem` had no indeterminate support for a while ([base-ui#1983](https://github.com/mui/base-ui/issues/1983)). If business-ui needs mixed states in menus or column pickers, check the version first.

---

## 9. Open questions and decisions for business-ui

1. **What is the root element?** Base UI's `<span role=checkbox>` plus hidden input (the default), `nativeButton`, or a real `<input>` as in React Aria and Ariakit. **Lean:** take Base UI's default to stay consistent with the other components, and cover pitfalls 3, 4 and 12 with tests.
2. **Indeterminate: separate boolean or `checked: 'indeterminate'`?** **Lean:** a separate boolean, following Base UI and React Aria. This differs from Radix, so shadcn migrants will hit a breaking change, which needs a migration note.
3. **What does a click on a mixed parent do?** Go to all-checked (Base UI) or follow the APG three-state cycle? **Lean:** go to all-checked by default.
4. **Sizes:** only `sm` and `md`, or one size plus a density context from Table or Field? A density context would let a `<Table density="compact">` shrink every control at once.
5. **Hit-area strategy:** a pseudo-element on the root, or padding on the label row? Either way, both must meet 24×24 without breaking dense table alignment.
6. **Does `Checkbox` render its label from `children`,** or must labels always come from `Field`? **Lean:** accept `children` for the 90% case, and use Field when there is hint or error text.
7. **Do we ship `focusableWhenDisabled`** for locked table rows?
8. **Where does select-all scope logic live?** Probably in a `useRowSelection` helper in the Table package, not in Checkbox.
9. **Do we ship an exclusive "None" option or a card/tile checkbox** as recipes in v1, or defer them?
10. **Token names:** confirm that Checkbox reuses the Button tokens (`--primary-hover`, `--primary-active`, `--primary-subtle*`, `--border-strong`, `--ring`, `--danger`). This needs to be agreed with the palette work.
11. **Read-only styling:** muted fill, or identical to enabled with only the cursor changed? This needs a design decision. Given how weakly screen readers support `aria-readonly`, also consider whether read-only checkboxes in "view mode" should simply render as text, for example "Yes / No".

---

## 10. Sources

- WAI-ARIA APG, Checkbox pattern: https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/
- WAI-ARIA APG, Mixed checkbox example: https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/examples/checkbox-mixed/
- MDN, `<input type="checkbox">`: https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/checkbox
- MDN, aria-readonly: https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-readonly
- Adrian Roselli, Brief Note on aria-readonly Support: https://adrianroselli.com/2022/11/brief-note-on-aria-readonly-support-html.html
- WCAG 2.2 Understanding 2.5.8 Target Size (Minimum): https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html
- WCAG 2.2 Understanding 1.4.11 Non-text Contrast: https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html
- Base UI Checkbox: https://base-ui.com/react/components/checkbox
- Base UI Checkbox Group: https://base-ui.com/react/components/checkbox-group
- Radix Primitives Checkbox: https://www.radix-ui.com/primitives/docs/components/checkbox
- React Aria Checkbox: https://react-aria.adobe.com/Checkbox
- Ariakit Checkbox: https://ariakit.com/components/checkbox
- shadcn/ui Checkbox docs: https://ui.shadcn.com/docs/components/checkbox
- shadcn/ui Checkbox source (new-york-v4): https://github.com/shadcn-ui/ui/blob/main/apps/v4/registry/new-york-v4/ui/checkbox.tsx
- Carbon Checkbox usage: https://carbondesignsystem.com/components/checkbox/usage/
- Atlassian Checkbox usage: https://atlassian.design/components/checkbox/usage
- Shopify Polaris Checkbox: https://polaris-react.shopify.com/components/selection-and-input/checkbox
- GOV.UK Design System Checkboxes: https://design-system.service.gov.uk/components/checkboxes/
- NN/g, Checkboxes vs. Radio Buttons: https://www.nngroup.com/articles/checkboxes-vs-radio-buttons/
- NN/g, Toggle-Switch Guidelines: https://www.nngroup.com/articles/toggle-switch-guidelines/
- shadcn-ui#9357, no indeterminate state in Base UI checkbox: https://github.com/shadcn-ui/ui/issues/9357
- radix-ui/primitives#3356, onChange with synthetic event: https://github.com/radix-ui/primitives/issues/3356
- radix-ui/primitives#1851, event handler for form control: https://github.com/radix-ui/primitives/issues/1851
- radix-ui/primitives#2530, hidden input ignores `form` attribute: https://github.com/radix-ui/primitives/issues/2530
- mui/base-ui#5765, Field reset does not clear data-filled: https://github.com/mui/base-ui/issues/5765
- mui/base-ui#1983, indeterminate Menu.CheckboxItem: https://github.com/mui/base-ui/issues/1983
- Click fires twice when a button is wrapped in a label (uhyo): https://zenn.dev/uhyo/articles/label-button-onclick-twice?locale=en
- chakra-ui#2854, checkbox bubbles onClick twice: https://github.com/chakra-ui/chakra-ui/issues/2854
- Semantic-UI-React#3433, onClick fires parent twice: https://github.com/Semantic-Org/Semantic-UI-React/issues/3433
