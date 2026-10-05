# Dialog

Research for business-ui's Dialog primitive: the modal dialog, the alert/confirm variant, and short notes on drawer/sheet and non-modal dialogs. No code. Statements marked **Recommendation** are opinions for business-ui; everything else is sourced (see section 10).

---

## 1. Purpose and when to use / when not to use

A modal dialog takes over the user's attention for a short, self-contained task, then gives control back exactly where they left off. In a business app it does three jobs:

1. **Short forms in context**: "Rename project", "Invite member", "Edit address". The user should still feel they are on the page they came from.
2. **Confirmations of consequential actions**: "Delete 14 invoices?", "Revoke API key?" This is the alert dialog.
3. **Blocking information that needs a decision**: session about to expire, unsaved changes, a conflict ("Someone else edited this record").

NN/g's rule of thumb: interrupt only when it is worth the cost. Good uses are preventing errors with irreversible consequences, collecting information that is critical to continue, and breaking a task into steps. Bad uses are non-essential content (promos, newsletter sign-ups), interrupting high-stakes flows such as checkout, and decisions that need information the modal itself hides.

**Do not use a dialog when:**

- The task is long or complex (multi-section forms, anything that needs reference to the page behind it). Polaris says the same: no complex forms or large information displays in modals. Use a page or a side panel.
- The message is non-blocking feedback ("Saved"). Use a toast or inline notice (Carbon).
- You want a small contextual overlay anchored to a control. Use Popover.
- The content should persist while the user keeps working (filters, inspector panel). Use a non-modal panel or drawer.
- The action is easily undone. Prefer doing it and offering Undo over a "Are you sure?" dialog. Confirmation fatigue trains people to click through.

GOV.UK has kept modal dialogues out of its design system for years. Their backlog thread records real evidence: users losing a typed message by hitting a close button placed near submit, people needing to see existing data behind the modal for context, and mobile screen readers historically ignoring `aria-modal`. Business apps cannot avoid modals, but these are good reasons to keep them small.

**Recommendation:** document a short decision table in the business-ui docs: Dialog vs AlertDialog vs Drawer/Sheet vs Popover vs Toast vs full page.

---

## 2. Anatomy (parts)

Base UI, Radix and shadcn have settled on the same set of parts:

| Part | Role | Notes |
| --- | --- | --- |
| `Root` | State and context, renders nothing | Owns `open`, `modal`, dismissal rules |
| `Trigger` | Button that opens the dialog | Optional. Dialogs are often opened from a menu item or table row action |
| `Portal` | Moves the popup to `document.body` (or a container) | Escapes `overflow: hidden` and stacking contexts |
| `Backdrop` (Overlay) | Dimmed layer behind the popup | Visual only. Click-outside is detected on the popup, not on this element |
| `Viewport` | Full-screen positioning container | Base UI-specific. Holds centering, and can be the scroll container for tall dialogs |
| `Popup` (Content) | The `role="dialog"` element | Holds focus trap, initial/final focus |
| `Title` | Heading, wired to `aria-labelledby` | Required (visually hidden if need be) |
| `Description` | Wired to `aria-describedby` | Optional for Dialog, required for AlertDialog |
| `Close` | Any button that closes | The header X and the footer Cancel are both Close |

Styled layout parts that shadcn adds and business-ui should keep (they are pure layout, no behavior):

- `DialogHeader`: title, optional description, close X.
- `DialogBody`: the scrollable region.
- `DialogFooter`: actions, right-aligned on desktop, stacked full-width on narrow screens.

**Recommendation:** ship `Header`, `Body` and `Footer` as first-class parts, because the scroll-body-with-sticky-header-and-footer layout is the one people get wrong by hand (see 5.8). Use the Stack layout helper inside them rather than one-off flex classes.

---

## 3. Variants and sizes

### What a business app actually needs

| Variant | Need | Notes |
| --- | --- | --- |
| **Dialog** (default, form or content) | Must have | Esc, X and Cancel close it. Click-outside configurable (see 5.3) |
| **AlertDialog** (confirm) | Must have | `role="alertdialog"`, no click-outside dismissal, requires a description, explicit Cancel |
| **Destructive confirm** | Must have, but as a *styling* of AlertDialog, not a separate component | Danger-tone confirm button, verb-labelled ("Delete 14 invoices"), focus starts on Cancel |
| **Sheet / side panel** | Should have (phase 2) | Same behavior as Dialog, positioned to an edge. Good for record detail and longer edit forms |
| **Drawer** (bottom sheet with swipe) | Nice to have | Only if mobile matters. Base UI ships a separate `Drawer` that extends Dialog with gestures and snap points |
| **Full-screen on mobile** | Should have, as a responsive behavior, not a variant | Material uses full-screen dialogs on mobile for complex tasks |
| Non-modal dialog | Rare | See 5.10 |

Carbon's taxonomy (passive, transactional, danger, acknowledgment, progress) is a useful content checklist, but those are compositions of one Dialog plus buttons, not separate components.

### Bloat to avoid

- Separate `ConfirmDialog`, `DangerDialog`, `InfoDialog` and `SuccessDialog` components. One AlertDialog plus a `tone` on the confirm button covers all of them.
- Icon-in-a-circle headers as a built-in prop. Let people compose them.
- Built-in multi-step wizard. Compose with Tabs or step state. NN/g only asks for a visible progress indicator.
- Draggable or resizable dialogs. These belong in a window manager, not a primitive.

### Sizes

Carbon has xs/sm/md/lg, Polaris small/default/large, and Atlassian a few fixed widths. Business apps need only:

| Size | Max width (suggested) | Typical use |
| --- | --- | --- |
| `sm` | ~400px (25rem) | AlertDialog, single-input prompts |
| `md` (default) | ~560px (35rem) | Most forms |
| `lg` | ~800px (50rem) | Two-column forms, small tables, previews |
| `full` | viewport minus margin | Rare: complex editors, or automatically on small screens |

**Recommendation:** use width tokens (`--dialog-width-sm|md|lg`), not Tailwind `max-w-*` literals, so a team can retune them in one place. Max height is `calc(100dvh - 2 * margin)`. The body scrolls; header and footer never do. At widths up to ~`sm` breakpoint, `md` and `lg` dialogs go edge-to-edge (full width, anchored to the bottom or full screen). AlertDialog stays a centered `sm` card.

---

## 4. States and transitions

### States

| State | Base UI attribute | Meaning |
| --- | --- | --- |
| closed | `data-closed` (or unmounted) | Not rendered unless kept mounted |
| opening | `data-starting-style` | First frame: style the "from" values |
| open | `data-open` | Interactive, focus inside |
| closing | `data-ending-style` | Exit animation running; still mounted, should not take input |
| nested parent | `data-nested-dialog-open` on the parent | A child dialog is open above this one |
| nested child | `data-nested` | This dialog is inside another; `--nested-dialogs` is the depth |

React Aria uses `data-entering`/`data-exiting`, and Radix uses `data-state="open|closed"`. In each case the library delays unmount until the CSS animation ends. Base UI also exposes `onOpenChangeComplete`, which fires after the animation finishes. Use it for cleanup such as resetting a form, so the content does not visibly reset while it fades out.

### Animation guidance

- **Keep it short:** 150–200ms in, 100–150ms out (exit faster than enter). Opacity plus a small scale (0.96→1) or 8px translate. Avoid big zooms or bounces: business users open dialogs hundreds of times a day.
- **Backdrop:** fade only.
- **Sheet:** slide from its edge. Drawer: follows the finger, then springs.
- **`prefers-reduced-motion`:** drop the transform and keep a short opacity fade (or none).
- **Nested:** Base UI's `--nested-dialogs` lets the parent scale down or dim slightly (e.g. `scale(calc(1 - 0.03 * var(--nested-dialogs)))`). This is a cheap and clear cue that you are one level deeper.
- **Native `<dialog>`:** if business-ui ever goes native, exit animation needs `@starting-style` plus `transition-behavior: allow-discrete` on `display` and `overlay` (MDN).
- **Recommendation:** never animate `height`. Content changes inside an open dialog (validation errors appearing) should not cause the whole dialog to re-center with a jump. Anchor it to the top at a fixed offset (e.g. 10vh) rather than vertical centering for form dialogs, so growth goes downward.

---

## 5. Behavior and interaction

### 5.1 Opening

- From a `Trigger` (a real `<button>`), or programmatically (`open` state, Base UI `createHandle()` / detached triggers, or a menu item).
- Base UI's detached triggers (`Dialog.createHandle()`, `<Dialog.Trigger handle payload>`) let one dialog instance serve many triggers, such as a "Delete" button on each table row with the row as payload. That pattern is very common in admin tables, and it keeps focus return correct per row.
- Opening from a dropdown menu item is the classic bug source (see section 8). Menu closes, dialog opens, and two layers fight over focus and body styles.

### 5.2 Closing: the three channels

| Channel | Dialog | AlertDialog |
| --- | --- | --- |
| Esc key | Closes (APG) | Closes, which counts as Cancel (APG keyboard pattern applies) |
| Close button (X / Cancel) | Closes | Cancel closes. **Recommendation:** no X in AlertDialog; the Cancel button is the explicit choice |
| Click/tap outside (backdrop) | Configurable | Disabled |

Atlassian requires a header close button in "virtually all cases". Polaris says to close on X, Cancel, Esc and outside click. Carbon allows outside click only on passive modals.

### 5.3 Outside-click policy for form dialogs

This is the main judgment call. Outside click is convenient for read-only dialogs, but in forms it causes data loss: a user drags a text selection out of an input and releases over the backdrop, or misses the dialog edge.

**Recommendation:**
- Default `dismissOnOutsidePress`: `true` for content dialogs. Form dialogs should set it to `false` or use the dirty guard (5.6). Base UI exposes `disablePointerDismissal`; Radix uses `onPointerDownOutside={e => e.preventDefault()}`; React Aria uses `isDismissable` (default `false`!).
- Measure outside-press on **pointerdown and pointerup both outside**. A drag that started inside must not close the dialog. Radix and Base UI handle this; check it anyway in a test.

### 5.4 Focus trap

- Tab and Shift+Tab cycle within the dialog (APG). Background content must be unreachable by keyboard *and* by screen-reader virtual cursor, so the rest of the page must be inert or `aria-hidden`.
- Elements portaled *out* of the dialog (a Select's listbox, a date picker, a toast) must be treated as part of the dialog, or they become unclickable. Base UI and Radix do this for their own popups; third-party portaled widgets need an escape hatch (Ariakit's `getPersistentElements`).
- Base UI's `modal="trap-focus"` traps focus without scroll lock or blocking outside pointer events. It fits sheets that sit next to content you still want to scroll.

### 5.5 Initial focus

From the APG (in priority order):

1. **Form dialog:** the first field. Use `autoFocus` or `initialFocus` (Base UI), `onOpenAutoFocus` (Radix) or `initialFocus` (Ariakit).
2. **Destructive or irreversible confirm:** the **least destructive** action (Cancel).
3. **Information plus "OK":** the most-used button.
4. **Long or structured content** where focusing the first control would scroll it away: focus the title or a static element with `tabindex="-1"`.

**Recommendation:** AlertDialog with a danger confirm focuses Cancel by default. Normal Dialog focuses the first tabbable element in the Body, not the header X. Library defaults usually pick the X first because it comes first in DOM order, and then Enter closes the dialog. Atlassian's documented focus order (close → content → secondary → primary) is reading order, not initial focus.

### 5.6 Focus return

- On close, focus returns to the invoking element (APG). Base UI uses `finalFocus`, Radix `onCloseAutoFocus`, and Ariakit `finalFocus`/`autoFocusOnHide`.
- Exceptions (APG): the trigger no longer exists (you deleted the row whose kebab menu opened the dialog), or the workflow suggests a better target (the newly created item).
- **Recommendation:** when the trigger is gone, fall back to a sensible container (the table, the list heading) rather than `<body>`. Expose `finalFocus` as a ref or function. Document the "delete row" case explicitly; it is the most common one in admin UIs.

### 5.7 Unsaved-changes guard

Not built into any of the libraries researched. Each gives you a cancellable close:

- Base UI: `onOpenChange(open, eventDetails)`, where `eventDetails` carries the reason (escape key, outside press, close button…) and can cancel the change.
- Radix: `onEscapeKeyDown`, `onPointerDownOutside` and `onInteractOutside`, each with `preventDefault()`.
- Ariakit: `hideOnEscape` and `hideOnInteractOutside` accept functions.
- Native: the `cancel` event is cancellable; `requestClose()` fires it.

**Recommendation:** business-ui should add a small, opt-in `onBeforeClose(reason) => boolean | Promise<boolean>`, or a `dirty` prop on Root that, when true, intercepts Esc, outside press and X and opens a nested AlertDialog ("Discard changes?" with Keep editing / Discard). This is the single most valuable addition over shadcn for form-heavy apps. Never guard the explicit submit path. Also warn the browser via `beforeunload` only if the app opts in.

### 5.8 Long content and scrolling

Two layouts exist:

- **Body scroll (recommended for forms):** popup max-height is the viewport minus margin; header and footer stay fixed; `Body` has `overflow-y: auto`. Actions are always visible. Carbon does this and adds fade edges to hint at overflow. shadcn's docs show the same "header stays in view" example.
- **Viewport scroll (for long documents):** the whole dialog scrolls inside a full-screen scroll container (Radix example: Content inside Overlay with `overflow-y: auto`; Base UI: `Viewport` as the scroller). Base UI has an open docs issue for scrollable examples.

**Recommendation:** Body-scroll by default. Add a subtle top/bottom divider or shadow on Header/Footer only when the body is actually scrolled (scroll-driven or IntersectionObserver), and avoid horizontal scrolling entirely (Atlassian, Carbon). Make the scrollable body focusable (`tabindex="0"`) when it has no focusable children, so keyboard users can scroll it. Note that a non-scrollable ScrollArea broke Base UI's focus trap in one reported issue, so test both ways.

### 5.9 Scroll lock

- Modal dialogs lock page scroll. Naively setting `overflow: hidden` on `<body>` removes the scrollbar and shifts the layout sideways by its width; libraries compensate with padding-right or `scrollbar-gutter: stable`.
- iOS Safari ignores `overflow: hidden` on body for touch scrolling. Libraries use `position: fixed` body plus scroll restoration, or touch-move prevention. Base UI has iOS-specific issues filed (collapsed navbar, iOS 26 backdrop needing `body { position: relative }`).
- Base UI's lock skips locking when `<html>` already has `overflow: hidden`, which breaks app shells where `<body>` is the scroller (issue #5720), and a configurable lock target has been requested (#5732).
- **Recommendation:** the app shell layout helper business-ui ships should scroll the document (`html`), not an inner `div`, so the stock scroll lock works. Document that choice. Add `scrollbar-gutter: stable` to the base stylesheet.

### 5.10 Non-modal dialogs

- `modal={false}` (Base UI, Radix) or `show()` on native `<dialog>`: no trap, no inert background, no scroll lock, and `aria-modal` absent or false.
- Real uses in business apps: a floating "inspector" or a find/replace panel. Most of the time a Popover or a non-modal Sheet is the better fit.
- **Recommendation:** support `modal={false}` (it comes free from Base UI), but give it no prominence in the docs, and recommend Popover for anchored content.

### 5.11 Nested dialogs

- Supported by Base UI (with depth attributes), Radix, React Aria and Ariakit. Esc and outside click close only the topmost layer. Focus returns to the parent dialog, not the page.
- **Recommendation:** allow exactly one realistic nesting case: a confirm (AlertDialog) over a form dialog. Discourage dialog→dialog navigation chains in the docs. Render only one backdrop (Base UI's Backdrop does not render for nested dialogs unless `forceRender`), and dim or scale the parent instead.

### 5.12 Async actions

- Confirm button shows a pending state. The dialog stays open until the promise resolves, and errors render inline inside the dialog, not as a toast behind it (Carbon: validation errors keep the modal open).
- While pending, Esc and outside click should be ignored or should cancel the request knowingly. Do not close and leave an orphaned request.
- Radix documents "close after async form submission" via controlled `open`.

---

## 6. Accessibility requirements

| Requirement | Source | How |
| --- | --- | --- |
| `role="dialog"` or `role="alertdialog"` on the popup | APG | Library-provided |
| `aria-modal="true"` for modal | APG | Only when behavior is actually modal; APG warns that a false `aria-modal` has "severe negative ramifications" |
| Accessible name | APG | `aria-labelledby` → `Title`. Missing title = bug. Radix warns in dev; business-ui should too |
| Description | APG | `aria-describedby` → `Description`. **Required** for alertdialog; optional for dialog, and APG says to omit it when the content is structured (lists, tables) |
| Background inert | APG, MDN | `inert` / `aria-hidden` on siblings, or native `showModal()` which makes the rest inert automatically |
| Keyboard: Tab cycles, Esc closes | APG | Escape keeps 2.1.2 No Keyboard Trap satisfied, since the user can always leave |
| Focus moves in on open, returns on close | APG, WCAG 2.4.3 Focus Order | See 5.5, 5.6 |
| Focus visible and not hidden under sticky footer | WCAG 2.2 SC 2.4.11 Focus Not Obscured (AA) | Use `scroll-padding` on the scrollable Body equal to the footer/header height |
| Reflow at 320px / 400% zoom | WCAG 1.4.10 | Full-width dialog with body scroll on narrow screens; never horizontal scroll |
| Target size of close X ≥ 24×24 CSS px | WCAG 2.2 SC 2.5.8 | Icon button with adequate hit area |
| Close X has a label | WCAG 4.1.2 | `aria-label="Close"`, localizable |
| Contrast of backdrop-separated popup edges | WCAG 1.4.11 | Border or shadow token that still meets contrast in dark mode |
| Reduced motion | WCAG 2.3.3 (AAA), good practice | See section 4 |

Notes:

- Mobile screen readers: GOV.UK found VoiceOver iOS and TalkBack historically did not honor `aria-modal`, so swipe navigation escaped the modal. Hiding siblings with `inert`/`aria-hidden` (as Base UI, Radix and Ariakit do) or using native `showModal()` addresses this. Do not rely on `aria-modal` alone.
- Heading level: Ariakit resets heading levels inside modals. **Recommendation:** render `Title` as `h2` by default, overridable with `render`/`asChild`.
- Do not put `tabindex` on the dialog element itself as a focus target unless it is the deliberate initial-focus fallback (MDN warns against `tabindex` on `<dialog>`).
- Button labels: use verbs ("Delete invoice", "Discard changes"), not "Yes/No/OK" (NN/g, Material, Carbon). Cancel on the left, primary on the right (Atlassian). Polaris: at most two buttons.

---

## 7. API shape recommendations

### 7.1 Comparison

| Concern | Base UI | Radix | React Aria | Ariakit |
| --- | --- | --- | --- | --- |
| Parts | Root, Trigger, Portal, Backdrop, Viewport, Popup, Title, Description, Close | Root, Trigger, Portal, Overlay, Content, Title, Description, Close | DialogTrigger, ModalOverlay, Modal, Dialog, Heading | Dialog, DialogHeading, DialogDescription, DialogDismiss, DialogDisclosure, store |
| Alert variant | Separate `AlertDialog` (no outside dismissal) | Separate `AlertDialog` (Action/Cancel parts) | `role="alertdialog"` on `Dialog` | `role` prop |
| Controlled | `open`, `onOpenChange(open, details)`, `defaultOpen` | `open`, `onOpenChange`, `defaultOpen` | `isOpen`, `onOpenChange`, `defaultOpen` | store `open`/`setOpen` |
| Dismiss control | `disablePointerDismissal`, cancel via `onOpenChange` details | `onEscapeKeyDown`, `onPointerDownOutside`, `onInteractOutside` | `isDismissable`, `isKeyboardDismissDisabled`, `shouldCloseOnInteractOutside` | `hideOnEscape`, `hideOnInteractOutside` (bool or fn) |
| Modal modes | `true`, `false`, `'trap-focus'` | `true`, `false` | always modal (Popover for non-modal) | `modal` bool |
| Initial / final focus | `initialFocus`, `finalFocus` on Popup | `onOpenAutoFocus`, `onCloseAutoFocus` | autoFocus in content | `initialFocus`, `finalFocus`, `autoFocusOnShow/Hide` |
| Animation hooks | `data-starting-style`, `data-ending-style`, `onOpenChangeComplete` | `data-state`, `forceMount` | `data-entering`, `data-exiting` | `data-enter`, `data-leave`, `unmountOnHide` |
| Imperative | `actionsRef` (`close`, `unmount`), `createHandle()` (`open`, `openWithPayload`, `close`) | none | close render-prop function | store methods |
| Many triggers / payload | Detached triggers + `payload` | no | no | shared store |
| Mobile | iOS scroll lock specifics | — | `--visual-viewport-height` CSS var for software keyboards | — |

### 7.2 Recommended business-ui API

**Recommendation:** wrap Base UI one-to-one (shadcn-style, copyable), keeping Base UI's part names where they exist, and add four things: styled layout parts, size tokens, a dirty guard, and a `confirm()` helper.

```tsx
<Dialog.Root open={open} onOpenChange={setOpen} dirty={form.isDirty}>
  <Dialog.Trigger render={<Button>Invite member</Button>} />
  <Dialog.Content size="md" dismissOnOutsidePress={false}>
    {/* Content = Portal + Backdrop + Viewport + Popup, the common case */}
    <Dialog.Header>
      <Dialog.Title>Invite member</Dialog.Title>
      <Dialog.Description>They will get an email invite.</Dialog.Description>
    </Dialog.Header>
    <Dialog.Body>{/* fields */}</Dialog.Body>
    <Dialog.Footer>
      <Dialog.Close render={<Button variant="secondary">Cancel</Button>} />
      <Button type="submit" form="invite" loading={pending}>Send invite</Button>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>
```

Prop decisions:

- **Controlled and uncontrolled both:** `open`/`defaultOpen`/`onOpenChange`. Pass Base UI's event details (reason, cancel) through unchanged.
- **`Content` convenience part:** bundles Portal, Backdrop, Viewport and Popup, with a `showCloseButton` (default `true` for Dialog, absent for AlertDialog) like shadcn. Keep the raw parts exported for people who need a custom layout.
- **`size`**: `sm | md | lg | full`. Tokens, not classes.
- **`dirty` / `onBeforeClose`**: see 5.7. Also needs a configurable discard copy for i18n.
- **Forms:** recommend `<form id>` in Body plus `form=` on the submit button in Footer, or wrap Body and Footer in one `<form>`. Enter submits naturally. Do not add custom Enter-key handling.
- **Portal container:** `container` prop for shadow DOM or micro-frontends. Default `document.body`.
- **Polymorphism:** Base UI's `render` prop, consistent with the rest of business-ui.

### 7.3 Imperative confirm helper

Business apps have many "Are you sure?" call sites. Declaring an AlertDialog component and state for each is noisy, so several libraries and many apps grow an imperative helper.

**Recommendation:** ship `confirm()` as a separate small package (`@business-ui/confirm`) built on AlertDialog with a single `<ConfirmProvider />` mounted once:

```ts
const ok = await confirm({
  title: "Delete 14 invoices?",
  description: "This cannot be undone.",
  confirmLabel: "Delete invoices",
  tone: "danger",           // danger button, initial focus on Cancel
  onConfirm: async () => api.delete(ids), // optional: keeps dialog open + pending until resolved; errors shown inline
});
```

Rules: resolves `false` on Esc/Cancel; returns focus to `document.activeElement` captured at call time (with fallback, 5.6); queues rather than stacking if called twice. Base UI's `createHandle()` plus `actionsRef` is enough to build this without global state hacks. Keep the declarative AlertDialog as the primary documented path, and present `confirm()` as the shortcut.

---

## 8. Common pitfalls and bugs seen in the wild

1. **Body stuck with `pointer-events: none` after closing** (Radix #1241, #3317, #3445, shadcn discussion #6908). Opening a Dialog from a DropdownMenu item, or unmounting a dialog with an open popover inside, leaves body frozen. Root causes are duplicated `DismissableLayer` copies from mismatched package versions, and cleanup ordering. Workarounds: dedupe, `setTimeout` open, `modal={false}` on the menu. *Lesson for business-ui:* per-component packages must share **one** copy of the behavior layer. Make `@base-ui/react` a **peer dependency** of every business-ui package, never a regular dependency.
2. **Menu → dialog focus return:** the menu item that opened the dialog no longer exists after the menu closes, so focus lands on `<body>`. Return to the menu's trigger button instead (Base UI handles this with detached triggers and `finalFocus`).
3. **Scroll lock layout shift:** the scrollbar disappears and content jumps sideways. Fixed headers jump too, because padding compensation does not apply to `position: fixed` elements. Use `scrollbar-gutter: stable`, and watch its interplay with react-remove-scroll and Tailwind layers.
4. **iOS Safari:** body still scrolls behind the dialog, the backdrop scrolls with the viewport (Base UI #3386, needs `body { position: relative }`), collapsed toolbar breaks the lock (#1893), and the virtual keyboard covers the footer. Use `dvh` units, and the visual viewport height (React Aria exposes `--visual-viewport-height`).
5. **App shells with an inner scroller:** the scroll lock locks the wrong element (Base UI #5720).
6. **Third-party portaled widgets inside a dialog** (date pickers, rich text toolbars, Google Places autocomplete) become unclickable or close the dialog on click, because they render outside the popup and count as an "outside" press. Needs an allowlist hook (`getPersistentElements`-style) or `onInteractOutside` filtering.
7. **Drag-select out of an input closes the dialog**, losing form data. Check pointerdown origin.
8. **Missing Title:** the dialog gets no accessible name. Radix logs a console error; teams add visually hidden titles to silence it. Keep the warning.
9. **Fixed-position toasts behind the inert background** are not readable or clickable while a dialog is open. Toast region must live outside the inert scope or be a persistent element.
10. **Shadow DOM / micro-frontends:** focus trap and scrolling break inside shadow roots (Radix #3353). Expose `container`.
11. **`closedby` / native assumptions:** `<dialog closedby>` is Chrome 134+ and Firefox 141+ but **not in Safari (macOS or iOS)** as of October 2026, so it cannot be relied on for light dismiss without a polyfill.
12. **Form reset flashes** while the exit animation runs, because state resets on `open=false`. Reset in `onOpenChangeComplete`.
13. **Stale content during exit** for dialogs driven by "selected row" state: the row is cleared, the dialog renders empty while fading out. Keep the payload until close completes (Base UI's handle `payload` helps).
14. **Double scrollbars / clipped focus rings** in Body: use `overflow-y: auto` and padding inside the scroller rather than on the popup.

---

## 9. Open questions and decisions for business-ui

1. **Outside-press default.** On for Dialog with opt-out (shadcn/Radix/Base UI/Polaris), or off by default (React Aria)? *Lean:* on by default, but automatically off when `dirty` is true.
2. **Ship `dirty` / `onBeforeClose` in v1?** It is the biggest differentiator from shadcn for form-heavy apps, but it needs i18n copy and a nested AlertDialog. *Lean:* yes.
3. **`confirm()` helper in v1 or later?** It needs a provider, so it is slightly against "no lock-in". *Lean:* a separate optional package, after Dialog and AlertDialog are stable.
4. **Vertical placement:** centered (shadcn) vs top-anchored at ~10vh (reduces jumping when content grows). *Lean:* top-anchored for `md`/`lg`, centered for AlertDialog.
5. **Sheet now or later?** Same behavior with a different position. It could be a `placement="right"` prop on Content rather than a new package. *Lean:* `placement` prop in phase 2. Wrap Base UI `Drawer` separately only if mobile is a target.
6. **Native `<dialog>`?** Top layer and free inertness are attractive, but `closedby` lacks Safari support and React integration (state sync, animations, portals for nested popups) is awkward. *Lean:* stay on Base UI and revisit in 2027.
7. **Mobile presentation:** should `md`/`lg` become bottom sheets or full screen below the `sm` breakpoint by default? Needs a decision with the Layout helpers.
8. **App shell scroll model:** must agree with the Stack/layout research so scroll lock works (document scroller vs inner scroller).
9. **Close X in the header:** default on (Atlassian: "always, except in extremely rare circumstances")? Is it hidden in AlertDialog?
10. **Footer button order on mobile:** stack with primary on top or at the bottom? Pick one and use it everywhere.
11. **Peer-dependency policy** for `@base-ui/react` across all business-ui packages (pitfall 1). This applies to every component, not just Dialog.

---

## 10. Sources

Patterns and specs
- WAI-ARIA APG, Dialog (Modal) pattern: https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/
- WAI-ARIA APG, Alert Dialog pattern: https://www.w3.org/WAI/ARIA/apg/patterns/alertdialog/
- MDN, `<dialog>` element (showModal, closedby, ::backdrop, requestClose, animation): https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog
- `<dialog closedby>` support (web-features explorer): https://web-platform-dx.github.io/web-features-explorer/features/dialog-closedby/
- caniuse, dialog closedby: https://caniuse.com/mdn-html_elements_dialog_closedby
- WCAG 2.2 (2.4.11 Focus Not Obscured, 2.5.8 Target Size, 1.4.10 Reflow): https://www.w3.org/TR/WCAG22/

Libraries
- Base UI Dialog: https://base-ui.com/react/components/dialog
- Base UI Alert Dialog: https://base-ui.com/react/components/alert-dialog
- Base UI Drawer: https://base-ui.com/react/components/drawer
- Radix Dialog: https://www.radix-ui.com/primitives/docs/components/dialog
- React Aria Modal: https://react-aria.adobe.com/Modal
- Ariakit Dialog: https://ariakit.com/reference/dialog
- shadcn/ui Dialog: https://ui.shadcn.com/docs/components/dialog

Design systems and usability
- Nielsen Norman Group, Modal & Nonmodal Dialogs: https://www.nngroup.com/articles/modal-nonmodal-dialog/
- Carbon Modal usage: https://carbondesignsystem.com/components/modal/usage/
- Atlassian Modal dialog usage: https://atlassian.design/components/modal-dialog/usage
- Shopify Polaris Modal (deprecated, guidance still useful): https://polaris-react.shopify.com/components/deprecated/modal
- Material 3 Dialogs: https://m3.material.io/components/dialogs/guidelines
- GOV.UK Design System backlog, Modal dialogue: https://github.com/alphagov/govuk-design-system-backlog/issues/30
- GOV.UK modal accessibility criteria (gist): https://gist.github.com/hannalaakso/2641fc16d2158e60d551cd9da960b5da
- MoJ Design Patterns, Modal dialog: https://design-patterns.service.justice.gov.uk/components/modal-dialog

Issues and pitfalls
- Radix #1241, body pointer-events none remains after closing: https://github.com/radix-ui/primitives/issues/1241
- Radix #3317, Dialog from DropdownMenu item freezes UI: https://github.com/radix-ui/primitives/issues/3317
- Radix #3445, pointer-events not cleaned up when unmounting dialog with open popover: https://github.com/radix-ui/primitives/issues/3445
- shadcn discussion #6908, Dialog and DropdownMenu pointer-events: https://github.com/shadcn-ui/ui/discussions/6908
- Radix #3353, focus trap and scrolling in Shadow DOM: https://github.com/radix-ui/primitives/issues/3353
- Base UI #1893, lock scroll on iOS with collapsed navbar: https://github.com/mui/base-ui/issues/1893
- Base UI #3386, iOS 26 Safari backdrop progressive enhancement: https://github.com/mui/base-ui/issues/3386
- Base UI #5720, scroll lock skipped when body is the scroller: https://github.com/mui/base-ui/issues/5720
- Base UI #5732, configurable scroll lock target: https://github.com/mui/base-ui/issues/5732
- Base UI #4205, non-scrollable ScrollArea breaks dialog focus trap: https://github.com/mui/base-ui/issues/4205
- Base UI #2800, scrollable dialog examples: https://github.com/mui/base-ui/issues/2800
- scrollbar-gutter traps with react-remove-scroll and Tailwind layers: https://gist.github.com/a-effort/eaeae3788d723c2244e569dc7c0841ad
