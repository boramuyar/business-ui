# Field

Research notes for the business-ui **Field** system: label, required/optional marker, description (hint), error message, and grouping with fieldset/legend. Field is the layer that wires ids and ARIA to any control (Input, Textarea, Checkbox, Select, Combobox, NumberField) and decides when errors appear.

This file is research only. Lines marked **Recommendation** are opinions for business-ui. Everything else is a summary of the sources in section 10.

---

## 1. Purpose & when to use / when not to use

Field exists so that every control in the library gets these for free and the same way:

- an accessible name (a visible `<label>` tied to the control),
- an accessible description (hint text plus error text, via `aria-describedby`),
- an invalid state (`aria-invalid` plus `data-invalid` for styling),
- required, disabled and read-only state passed down from one place,
- consistent spacing and layout (vertical, horizontal, dense).

shadcn's original `Form` tied all of this to react-hook-form. Its newer `Field` drops that tie but also drops the automatic id wiring: you write `htmlFor`/`id` and `aria-invalid` by hand. business-ui should keep the library-agnostic part and bring the automatic wiring back.

**Use Field when**
- a control has a visible label, a hint, or can show a validation error, which covers almost every form control;
- several controls answer one question (radio group, checkbox list, date split into parts, address block). Use **Fieldset + Legend** for these.

**Do not use Field when**
- the control is labelled by its context and never validates: a table-toolbar search box, a "rows per page" select in a pagination bar, a row-selection checkbox in a data table. Pass `aria-label` on the control directly. **Recommendation:** every control must work without Field. Field adds behavior; it is not required to render a control.
- you need a standalone message that is not about one field (form-level server error, "session expired"). Use an Alert or the error summary (section 5).
- the label is a heading for a whole section. Use a heading or Fieldset, not a Field label.

---

## 2. Anatomy (parts)

```
Fieldset                          <fieldset>  (optional; for groups)
├─ FieldsetLegend                 <legend>
├─ (FieldsetDescription)          <p>, referenced by aria-describedby on <fieldset>
└─ Field                          <div role="group"?> (no role by default; see §6)
   ├─ FieldLabel                  <label for=controlId>
   │   └─ FieldIndicator          "*" or "(optional)", aria-hidden when `required` is set on the control
   ├─ FieldDescription            <p id=descId>        hint / helper text
   ├─ <control>                   Input / Select / Checkbox ... receives id, aria-describedby, aria-invalid, required, disabled
   ├─ FieldError                  <p id=errorId>       shown only when invalid AND it is time to show (§5)
   └─ (FieldCounter / FieldMeta)  optional, e.g. "120 / 500"; part of the description id list
```

Parts compared to the reference libraries:

| Part | Base UI | React Aria | Radix Form | shadcn Field (new) | shadcn Form (old) |
| --- | --- | --- | --- | --- | --- |
| Wrapper with context | `Field.Root` | built into `TextField`, `Select`... | `Form.Field` | `Field` (layout only) | `FormItem` + `FormField` |
| Label | `Field.Label` | `Label` (slot) | `Form.Label` | `FieldLabel` (manual `htmlFor`) | `FormLabel` |
| Control | `Field.Control` or any Base UI input | the component | `Form.Control` | none, you pass the control | `FormControl` (Slot) |
| Hint | `Field.Description` | `Text slot="description"` | none | `FieldDescription` | `FormDescription` |
| Error | `Field.Error` (`match`) | `FieldError` | `Form.Message` (`match`) | `FieldError` (`errors` array) | `FormMessage` |
| Validity render prop | `Field.Validity` | render prop on `FieldError` | `Form.ValidityState` | none | none |
| Group | `Fieldset.Root/Legend`, `Field.Item` | `CheckboxGroup`/`RadioGroup` | none | `FieldSet`, `FieldLegend`, `FieldGroup` | none |
| Layout helpers | none | none | none | `FieldGroup`, `FieldSeparator`, `FieldContent`, `FieldTitle` | none |

**Recommendation:** ship `Field`, `FieldLabel`, `FieldDescription`, `FieldError`, `Fieldset`, `FieldsetLegend`. Build on Base UI `Field.*`/`Fieldset.*` for wiring and validity. Add one layout part, `FieldGroup` (a vertical stack with the field gap token), and keep separators and section titles in the Stack/layout package. `FieldContent` and `FieldTitle` exist in shadcn mainly for the "card-like choice" checkbox layout. That layout is a Checkbox/Radio concern, so leave both out of Field v1.

---

## 3. Variants & layouts

### Necessary for business apps

1. **Vertical (default).** Label above the control, hint under the label or under the control, error under the control. This is the best choice for scanning and for long labels. GOV.UK, Carbon, Polaris and Atlassian all default to it.
2. **Horizontal (label column).** Label in a fixed-width left column, control and messages on the right. Settings pages and dense admin "record detail" forms use it all the time. It must collapse to vertical at narrow widths. shadcn's `orientation="responsive"` does this with a container query on `FieldGroup`, which is the right mechanism. Label column width should be a CSS variable (`--field-label-width`) set on `FieldGroup`, so all rows in one form line up.
3. **Inline control-first (checkbox/switch/radio).** The control comes first, then the label, with the description indented under the label. This is required for Checkbox, Switch and Radio. It is the same Field with a different slot order, not a new component. Base UI uses `Field.Item` for each option in a group.
4. **Dense size.** Smaller vertical gap between parts (e.g. 4px instead of 6–8px), smaller label type, and control height from the Input `size`. **Recommendation:** density comes from a `size` (`sm | md`) on `Field`/`FieldGroup` that sets CSS variables. It should not be a separate "dense variant", and child controls read the size from context so a dense form is a single prop.

### Bloat (leave out, or leave to the consumer)

- **Floating labels** (Material "filled/outlined" labels that move into the border). They are harder to read in dense UIs, the placeholder and label compete, and autofill styling breaks them. Carbon calls its version "fluid" and keeps it for special cases. Leave out.
- **Labels inside the field / placeholder-as-label.** These are an accessibility anti-pattern because the label disappears on input. Leave out.
- **Tooltip-only help** (an info icon that hides the hint). NN/g warns against hiding critical information behind hover. Allow an icon button in the label row as an escape hatch, but do not build a variant around it.
- **A "success" variant that shows a green tick on every field.** See §4 "valid".
- **Right-aligned labels.** These exist in older enterprise systems and scan poorly. Leave out.

---

## 4. States

States live on the `Field` root as `data-*` attributes so Tailwind can style any descendant (`group-data-[invalid]:...`). Base UI already exposes `data-disabled`, `data-valid`, `data-invalid`, `data-dirty`, `data-touched`, `data-filled` and `data-focused` on every Field part. **Recommendation:** use these names as they are. Do not invent new ones.

| State | Source of truth | Look | Behavior |
| --- | --- | --- | --- |
| **Default** | — | label `--fg`, hint `--fg-muted`, control border `--border` | — |
| **Focused-within** | `data-focused` / `:focus-within` | The control shows the focus ring. Optionally darken the label a little. **Do not** recolor the whole field block. | Only the control should have the ring. Field must not take focus. |
| **Hover** | control's own hover | control border `--border-hover` (one of the hover tokens the palette is missing today) | — |
| **Disabled** | `disabled` on Field, or a disabled Fieldset ancestor | lower opacity or `--fg-disabled` on the label, hint and control. Do not show the error. | Native `disabled` on the control means it is not focusable and not submitted. Clicking the label does nothing. Carbon notes that disabled styling is exempt from WCAG contrast, but keep labels readable anyway because users still need to know what the field is. |
| **Read-only** | `readOnly` on Field | Looks like normal text: no border or a subtle one, normal contrast, no "disabled grey". | Still focusable, selectable and announced, and **still submitted**. This is different from disabled. Carbon: read-only stays "focusable, accessible by screen readers, and passes visual contrast". This is very common in admin "view/edit" screens. Native `readonly` only works on text-like inputs, so Select, Checkbox and others need `aria-readonly` plus blocked interaction. Base UI components support `readOnly` themselves. |
| **Invalid** | `invalid` prop, or native validity plus the "time to show" rule | control border `--danger`, error text `--danger-fg` with an icon (not color alone, WCAG 1.4.1). Label color does **not** need to change. | `aria-invalid="true"` on the control. The error id is added to `aria-describedby`. The error text replaces the hint or sits below it (see open question 3). Never clear the user's value (GOV.UK). |
| **Valid** | `data-valid` | **Recommendation:** no visual change by default. | Baymard found that positive inline validation helps confidence. NN/g limits success messages to fields with meaningful criteria, such as password rules or a username being available. Offer an opt-in `FieldSuccess`/description slot, not automatic green ticks on every field, which add noise in dense forms. |
| **Required** | `required` on Field (passed to the control) | an indicator in the label (see below) | Native `required` gives `aria-required` implicitly. Native `required` also triggers browser validation unless the form has `noValidate`. |
| **Warning** (optional) | `warning` message | `--warning` color and icon | Carbon has this for "exception, not error" (for example "this exceeds the usual amount"). It does not block submit and does not set `aria-invalid`. Useful in business apps. Open question 5. |

### Required vs optional indicator

- Carbon: if most fields are required, mark only the optional ones with "(optional)". If most are optional, mark the required ones with "(required)". GOV.UK marks only optional fields. Material, Atlassian and Polaris use an asterisk with a legend.
- A lone `*` needs an explanation ("Fields marked * are required"), and if it is read out it is noise ("star"). With native `required` on the control, screen readers already say "required", so make the asterisk `aria-hidden="true"`.
- **Recommendation:** `FieldLabel` renders an indicator chosen by `necessityIndicator: "asterisk" | "text" | "none"`, set per Field or once on a provider/form. Default to `"asterisk"`, because business forms are mixed and often mostly required. When the field is required the asterisk is `aria-hidden`. When it is optional the "(optional)" text is real text. React Aria has the same prop name (`necessityIndicator`).

---

## 5. Behavior & interaction

### Validation timing

What the research says:

- **GOV.UK** validates on submit only: "Do not validate when the user moves away from a field." It shows an error summary and moves focus to it. GOV.UK serves a very wide audience that includes slow typists and assistive-technology users.
- **Baymard** found that 31% of sites have no inline validation. Validate on blur, or once input reaches a complete length (postcode, card number). Never validate an empty field just because it got focus. **Remove errors immediately** once the user corrects the input.
- **NN/g**: "avoid showing an error until the user has finished with the field and moved to the next field."
- **"Reward early, punish late"** (Smashing, Smart Interface Design Patterns): show an error late (on blur or submit), and clear it early (on change once the error is visible).
- **React Aria** (default `validationBehavior="native"`): errors show after the value is committed (blur) or on submit. Server errors from `Form validationErrors` clear as soon as the user edits that field.
- **Base UI** `validationMode`: `onSubmit` (then re-validates on change), `onBlur`, `onChange` with `validationDebounceTime`.
- **react-hook-form** `mode`: `onSubmit` (default), `onBlur`, `onChange`, `onTouched`, `all`. `reValidateMode` defaults to `onChange`. `shouldFocusError` defaults to true.

**Recommendation (default policy, "reward early, punish late"):**

1. A field does not show an error until it is **touched and blurred**, or until the form is **submitted**.
2. Once an error is visible, re-validate **on change**, so the error disappears as soon as the input is fixed. This matches RHF `mode: "onTouched"` and Base UI `onBlur` with re-validation.
3. Async checks (username taken) run on blur or debounced change (300–500 ms), and show a pending state in the description, not as an error.
4. Keep "on submit only" as a one-prop switch (`validationMode="onSubmit"`) for long, public-facing or high-stakes forms where GOV.UK's reasoning applies.
5. Never validate on focus, and never show "required" errors on a pristine form.

### On submit

1. Prevent submit if anything is invalid. Do **not** disable the submit button to stand in for validation: a disabled button cannot explain itself and cannot be focused. (GOV.UK, and widely repeated.)
2. Show every field error.
3. **Focus management:**
   - short forms (roughly fewer than 8 fields, such as most dialogs): focus the **first invalid control**. Radix Form, react-hook-form (`shouldFocusError`) and native constraint validation all do this.
   - long or multi-section forms: render an **error summary** at the top (role `alert` or a focused region with a heading). It lists each error as a link to its control, uses the same text as the inline message, and receives focus. GOV.UK also prefixes the page `<title>` with "Error: ".
   - **Recommendation:** Field provides the data (a registry of `{ name, controlId, message }` in form context). An `ErrorSummary` component (later, separate package) renders it. The default behavior is to focus the first invalid control.
4. Server errors: accept a `errors: Record<name, string | string[]>` map at form level (Base UI `Form errors`, React Aria `validationErrors`), or `invalid` + children per Field. A server error clears when the user edits that field (React Aria, Radix `onClearServerErrors`).

### Other interactions

- Clicking the label focuses the control, or toggles it for a checkbox. You get this for free with a native `<label for>`. For non-native controls such as a Base UI Select trigger, the label must focus the trigger. Base UI handles this with `nativeLabel={false}` / `aria-labelledby`.
- The error and hint appear without layout jump where possible. **Recommendation:** no reserved empty space by default, because it wastes space in dense forms. Allow an opt-in `reserveMessageSpace` for grids where rows must stay aligned.
- Character counters announce politely and only near the limit. Do not announce on every keystroke.

---

## 6. Accessibility requirements

Relevant WCAG 2.2 criteria: 1.3.1 Info and Relationships, 1.4.1 Use of Color, 1.4.11 Non-text Contrast (control borders at 3:1), 2.4.6 Headings and Labels, 2.5.3 Label in Name, 3.3.1 Error Identification, 3.3.2 Labels or Instructions, 3.3.3 Error Suggestion, 3.3.7 Redundant Entry, 4.1.2 Name Role Value, 4.1.3 Status Messages.

**Label association**
- Use a native `<label for={controlId}>` for native inputs. APG prefers native labels because clicking them activates the control.
- For non-labelable elements (a `button` used as a Select trigger, a `div role="combobox"`), use `aria-labelledby={labelId}` and keep the label clickable.
- Ids come from `React.useId()` in Field context. A consumer-supplied `id` on the control **wins**, and Field adopts it. Base UI and the old shadcn Form both behave this way.

**Description and error**
- `aria-describedby="{descriptionId} {errorId}"`: only include ids of elements that are **currently rendered**, and put the description before the error. Merge with any `aria-describedby` the consumer passes; do not overwrite it.
- `aria-invalid="true"` only when the error is *shown*, not merely when the value fails a constraint. Otherwise screen readers announce "invalid" on first focus of an empty required field (Roselli, about native validation).
- `aria-errormessage`: support has improved, but as of mid-2024 TalkBack had no support and iOS VoiceOver had bugs (Cerovac). React Spectrum has an open issue (#7425) about switching to it. **Recommendation:** use `aria-describedby` for the error. Optionally also set `aria-errormessage`, which does no harm when paired with `aria-invalid`. Do not rely on `aria-errormessage` alone.
- Error text starts with a visually hidden "Error:" prefix (GOV.UK), which can be translated. The visual icon is `aria-hidden`.

**Live announcements**
- Errors that appear on blur can be announced with `aria-live="polite"` on a **container that is always in the DOM** (live regions that mount together with their content are often not announced). Base UI's `Field.Error` is unmounted when hidden, so wrap it or add a persistent region.
- On submit, do not make every error a live region, because ten errors would be read at once. Move focus instead (first invalid field or the summary). Only the summary uses `role="alert"`, if it is not focused.
- Do not announce on every keystroke during on-change re-validation. Make announcements when an error is added, not when its text changes.

**Required**
- Put native `required` (or `aria-required="true"` on non-native controls) on the control itself, not on the wrapper.
- The visual indicator is `aria-hidden` when it repeats the semantic required state. If the form uses `noValidate`, keep `aria-required` so the "required" announcement stays.

**Fieldset / legend**
- Use a native `<fieldset>` + `<legend>` for radio groups, checkbox groups, and multi-part inputs (date as day/month/year, address). The legend is the group name, and screen readers read it when entering the group.
- `<fieldset disabled>` disables every descendant control natively. Field context must read this so custom controls disable too (Base UI Fieldset passes `disabled` down).
- Base UI `Fieldset.Legend` renders a `<div>` with `aria-labelledby` wiring. This avoids the long-standing styling problems with `<legend>` (it cannot easily be a flex child). Accept this choice.
- A group-level error (e.g. "Select at least one") goes on the fieldset. Add it to the fieldset's `aria-describedby`, and set `aria-invalid` on the group role element (radiogroup) if one exists.
- Do not nest fieldsets more than one level deep. Do not wrap a single control in a fieldset.

---

## 7. API shape recommendations

### How other libraries do it

**Base UI** (`Field.Root` + parts, `Form`, `Fieldset`)
- Field.Root holds `name`, `disabled`, `invalid`, `dirty`, `touched`, `validate(value) => string | string[] | null | Promise`, `validationMode`, `validationDebounceTime`, and `actionsRef.validate()`.
- `Field.Error match="valueMissing" | true` shows a message per ValidityState key, or always when `true` (for form libraries).
- Every Base UI input (Input, Select, Checkbox, NumberField...) reads Field context automatically.
- Form libraries are integrated by forwarding RHF `fieldState.invalid/isTouched/isDirty` and `ref`. The handbook documents both RHF and TanStack Form.
- Strengths: wiring, native validity, data attributes. Weaknesses: no layout, no required indicator, Error unmounts (which matters for live regions).

**React Aria Components** (`TextField` + `Label` + `Input` + `Text slot="description"` + `FieldError`)
- Field-ness is built into each composite component through slots. Props include `isRequired`, `isInvalid`, `validate`, `validationBehavior: "native" | "aria"`, and `necessityIndicator` (in Spectrum).
- `Form validationErrors` handles server errors, which auto-clear when the field is edited.
- Strengths: the most thorough a11y and i18n. Weaknesses: verbose, and its own naming (`isX`) does not fit Tailwind/shadcn conventions.

**Radix Form** (`Form.Field name` + `Label` + `Control asChild` + `Message match`)
- Built on native constraint validation. `serverInvalid` + `forceMatch` for server errors. Focuses the first invalid control on submit.
- Strengths: simple. Weaknesses: little development since 2023, only works with native inputs, no description part.

**shadcn**
- *Old `Form`*: `FormField` (wraps RHF `Controller`) → `FormItem` (provides `useId`) → `FormControl` (Slot that injects `id`, `aria-describedby`, `aria-invalid`). It wired everything automatically but **required react-hook-form**.
- *New `Field`* (2025): library-agnostic and has layout (`orientation`, `FieldGroup`, `FieldSet`, `FieldLegend variant`), but **no auto wiring**. You write `htmlFor`, `id`, `aria-invalid` and `data-invalid` by hand on every field. `FieldError errors={[...]}` accepts arrays from Zod/RHF/TanStack.

### Recommended business-ui shape

**Recommendation:** shadcn's new Field layout and naming, Base UI's context wiring, and React Aria's server-error and necessity ideas.

```tsx
<Form onSubmit={...} errors={serverErrors} validationMode="onBlur">   // optional; Field works without Form
  <FieldGroup orientation="responsive" size="sm">
    <Field name="email" required>
      <FieldLabel>Email</FieldLabel>
      <FieldDescription>We send invoices here.</FieldDescription>
      <Input type="email" />                        {/* id, aria-*, required, disabled come from context */}
      <FieldError />                                {/* native validity message, or children/errors */}
    </Field>

    <Fieldset>
      <FieldsetLegend>Notify me about</FieldsetLegend>
      <Field><Checkbox /><FieldLabel>Invoices</FieldLabel></Field>
      <Field><Checkbox /><FieldLabel>Payouts</FieldLabel></Field>
      <FieldError>Choose at least one.</FieldError>
    </Fieldset>
  </FieldGroup>
</Form>
```

`Field` props (proposed):

| Prop | Type | Notes |
| --- | --- | --- |
| `name` | `string` | Used for form submission, the server-error lookup, and the summary registry |
| `required` / `disabled` / `readOnly` | `boolean` | Passed to the control through context. A disabled Fieldset ancestor wins. |
| `invalid` | `boolean` | Controlled; overrides internal validity (this is how form libraries connect) |
| `touched`, `dirty` | `boolean` | Controlled, forwarded from RHF/TanStack |
| `validate` | `(value) => string \| string[] \| null \| Promise<...>` | From Base UI |
| `validationMode` | `"onSubmit" \| "onBlur" \| "onChange"` | Default comes from Form, otherwise `"onBlur"` (§5) |
| `orientation` | `"vertical" \| "horizontal" \| "responsive"` | Usually set on FieldGroup instead |
| `size` | `"sm" \| "md"` | Density, inherited by the controls |
| `necessityIndicator` | `"asterisk" \| "text" \| "none"` | Also settable on Form/FieldGroup |

`FieldError`:
- with no children, it shows the native `validationMessage` or the first message from `validate`;
- `children` holds custom text; `match="valueMissing"` gives a message per constraint (Base UI);
- `errors={Array<{message?: string} | string | undefined>}` takes RHF/Zod/TanStack output directly (shadcn). It de-duplicates and renders a list if there is more than one.

**Form-library agnostic adapters.** Do not depend on RHF. Document a ~10-line pattern for RHF `Controller` (`invalid={fieldState.invalid} touched={fieldState.isTouched}` + forwarding `ref`) and for TanStack Form. Optionally publish a tiny `@business-ui/field-rhf` helper later. **Important:** every control must forward `ref` to the real focusable element, otherwise RHF `shouldFocusError` silently does nothing (Base UI handbook).

**Context contract** (how controls read Field) as a hook, so third-party controls can join:

```ts
useFieldControl(props) => {
  id, name, required, disabled, readOnly,
  "aria-describedby", "aria-invalid", "aria-labelledby"?,  // merged with props
  onBlur, onChange // for touched/dirty tracking
}
```

---

## 8. Common pitfalls & bugs seen in the wild

1. **Manual id wiring drifts.** In shadcn's new Field you hand-write `htmlFor="email"` and `id="email"`. Copy-pasting a field gives duplicate ids, labels point at the wrong input, and two forms on one page collide. Use `useId` by default.
2. **`aria-describedby` points at ids that are not in the DOM**, or overwrites the consumer's own value. Build the list from the parts that are mounted, and merge it with the consumer's value.
3. **`aria-invalid` on pristine fields.** It is set from raw validity, so screen readers say "invalid entry" when the user first tabs into an empty required field.
4. **Errors announced twice or not at all.** The live region mounts together with its text (not announced), or the error is both `role="alert"` and focused (announced twice).
5. **Color is the only signal.** A red border with no text or icon fails WCAG 1.4.1 and 3.3.1. A red border at too low contrast fails 1.4.11.
6. **Placeholder used as the label.** The label disappears on input, contrast is low, and translation tools miss it.
7. **The native validation bubble shows up next to the custom error.** A form without `noValidate` that uses `required` shows the browser tooltip too. Roselli: the bubbles do not zoom, disappear, and are poorly announced. **Recommendation:** `Form` sets `noValidate` and keeps the Constraint Validation API (`validity`, `validationMessage`) for logic only. This is how Base UI and React Aria (`native` mode) behave.
8. **Disabled submit button as validation.** The user cannot find out why. It also cannot be focused, so its tooltip cannot be read.
9. **Read-only built as disabled.** The value is not submitted, cannot be copied, is greyed below contrast, and is skipped by the keyboard. This is common in admin "view mode".
10. **Ref not forwarded through wrapper components**, so `shouldFocusError` / focus-first-invalid has nothing to focus.
11. **Clearing the field on error** (common with password and card inputs). GOV.UK: keep both the passing and the failing answers.
12. **A legend that cannot be styled.** Teams swap `<legend>` for a `<div>` and lose the group name. Either keep the native element and style it as `float: left; width: 100%`, or use Base UI's labelled `div`. Never use an unlabelled div.
13. **Checkbox label placement.** Wrapping the input inside `<label>` and also setting `for` is harmless, but putting the description inside the `<label>` makes the accessible name very long. The description belongs in `aria-describedby`, not inside the label.
14. **Server errors that never clear.** The user fixes the value and the old server error stays until the next submit.
15. **Error text replacing the hint and moving the layout,** which makes the control jump while the user is clicking the next field (on-blur validation plus mouse). Mitigate it with `reserveMessageSpace` or by placing the error below the control.

---

## 9. Open questions / decisions for business-ui

1. **Base UI dependency depth.** Wrap `Field.Root`/`Fieldset.Root` directly (gets validity, data attributes and form integration, but locks us into Base UI controls), or write a thin own context and only use Base UI controls through `useFieldControl`? Lean: wrap Base UI, and expose `useFieldControl` for third-party controls.
2. **Default validation mode.** `onBlur` with re-validate on change (Baymard/NN/g), or `onSubmit` (GOV.UK)? Lean: `onBlur` for business apps, documented as a choice.
3. **Hint and error together, or error replacing hint?** Carbon replaces the hint. GOV.UK shows both, with the hint above the control and the error above it too. Lean: keep both, hint under the label and error under the control, because the hint often explains how to fix the error.
4. **Description position.** Under the label (GOV.UK) or under the control (Material, Carbon, shadcn)? Under the label is read before the control is reached, visually and in DOM order. Pick one default and allow overriding it by slot order.
5. **Warning state.** Add a non-blocking `FieldWarning` now (useful for finance and limits), or wait?
6. **Error summary** as part of the Field package, or a separate `ErrorSummary` package that reads the Form registry?
7. **Necessity indicator default:** asterisk or "(optional)"? It depends on whether target forms are mostly required. Ask users and look at real admin forms.
8. **Horizontal label width:** a fixed token, or measured "auto" (CSS grid `max-content` on FieldGroup with `subgrid`)? Subgrid is now widely supported and gives auto-aligned label columns without a magic number.
9. **i18n of the "Error:" prefix and "(optional)" text.** These need a locale provider or props. Decide on the library-wide approach once.
10. **Field inside table cells (inline edit).** It needs a "label is the column header" mode (`aria-labelledby` to the header, error in a tooltip or popover). Probably a later "InlineField".

---

## 10. Sources

- Base UI – Field: https://base-ui.com/react/components/field
- Base UI – Fieldset: https://base-ui.com/react/components/fieldset
- Base UI – Forms handbook (RHF / TanStack integration): https://base-ui.com/react/handbook/forms
- shadcn/ui – Field: https://ui.shadcn.com/docs/components/field
- shadcn/ui – Form (react-hook-form): https://ui.shadcn.com/docs/components/form
- Radix Primitives – Form: https://www.radix-ui.com/primitives/docs/components/form
- React Aria – Forms: https://react-aria.adobe.com/forms
- React Spectrum issue #7425, "Prefer aria-errormessage over aria-describedby": https://github.com/adobe/react-spectrum/issues/7425
- Ark UI issue #4150, aria-errormessage support: https://github.com/chakra-ui/ark/issues/4150
- react-hook-form – useForm (mode, reValidateMode, shouldFocusError): https://react-hook-form.com/docs/useform
- WAI-ARIA APG – Providing Accessible Names and Descriptions: https://www.w3.org/WAI/ARIA/apg/practices/names-and-descriptions/
- a11ysupport.io – aria-errormessage: https://a11ysupport.io/tech/aria/aria-errormessage_attribute
- Cerovac – Support for aria-errormessage is getting better, but still not there yet (2024): https://cerovac.com/a11y/2024/06/support-for-aria-errormessage-is-getting-better-but-still-not-there-yet/
- Adrian Roselli – Avoid Default Field Validation: https://adrianroselli.com/2019/02/avoid-default-field-validation.html
- MDN – Client-side form validation: https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Form_validation
- MDN – `<fieldset>`: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/fieldset
- WCAG 2.2 – 3.3.1 Error Identification: https://www.w3.org/WAI/WCAG22/Understanding/error-identification.html
- WCAG 2.2 – 3.3.2 Labels or Instructions: https://www.w3.org/WAI/WCAG22/Understanding/labels-or-instructions.html
- WCAG 2.2 – 4.1.3 Status Messages: https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html
- GOV.UK Design System – Error message: https://design-system.service.gov.uk/components/error-message/
- GOV.UK Design System – Validation pattern: https://design-system.service.gov.uk/patterns/validation/
- GOV.UK Design System – Error summary: https://design-system.service.gov.uk/components/error-summary/
- Carbon – Form usage: https://carbondesignsystem.com/components/form/usage/
- Baymard – Inline form validation: https://baymard.com/blog/inline-form-validation
- Nielsen Norman Group – 10 Design Guidelines for Reporting Errors in Forms: https://www.nngroup.com/articles/errors-forms-design-guidelines/
- Smashing Magazine – A Complete Guide To Live Validation UX: https://www.smashingmagazine.com/2022/09/inline-validation-web-forms-ux/
- Smart Interface Design Patterns – Inline Validation UX: https://smart-interface-design-patterns.com/articles/inline-validation-ux/
