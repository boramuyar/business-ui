# Stack: research notes

> Scope: the core one-dimensional layout primitive for business-ui (vertical/horizontal stacking with a consistent gap), plus how it relates to Grid, Container, Inline/Cluster and Box.
> Status: research only. Statements marked **Recommendation** are opinions for business-ui to accept or reject. Everything else is a summary of what other systems do, with sources in section 11.

---

## 1. Purpose, and when to use it (vs. plain Tailwind flex classes)

A Stack puts its **direct children** in a single line (a column by default) and **owns the space between them**. Children carry no outer margin. This is the "layout components own white space" rule from Braid: "components should not provide surrounding white space. Instead, spacing between elements is owned entirely by layout components." Every Layout presents the same idea through the "owl" selector (`> * + *`): spacing belongs to the *relationship* between siblings, not to either sibling.

In a Tailwind codebase, `<Stack gap="4">` almost always compiles to `flex flex-col gap-4`. So the honest question is what a component gives you over the class string:

| What Stack gives you | Plain `flex flex-col gap-4` |
|---|---|
| A gap scale limited to design tokens (no `gap-[13px]`, no `gap-3.5` drift) | Any value goes |
| A readable intent ("this is a vertical rhythm") in JSX and in the React devtools tree | A `div` with classes |
| Dividers between children with no extra markup | Manual `<Separator/>` between items, or `divide-y` (which has selector caveats, see section 9) |
| Polymorphic element (`ul`, `fieldset`, `section`) with the same layout | Same, but you write the tag yourself |
| A responsive direction shortcut (`direction={{ base: "col", md: "row" }}`) | `flex-col md:flex-row` |
| `min-w-0` / `min-h-0` defaults that prevent a known overflow bug (section 9) | Easy to forget |

**When to use it** (recommendation):
- Vertical rhythm in forms, cards, settings pages, sidebars and dialog bodies: the 80% case in dashboards and admin tools.
- Horizontal toolbars, button rows and label + value pairs (`direction="row"`).
- Any time you would otherwise put `mt-*` or `mb-*` on a child to space it from its sibling.

**When not to use it:**
- **Two-dimensional layouts** (cards in rows and columns, form columns that must align across rows). Use Grid.
- **Wrapping chip/tag/button groups** where row and column gap differ and items should flow. Use Inline/Cluster, or Stack with `wrap` (section 8).
- **One-off flex tweaks** inside a leaf component (an icon + label inside a Button). Plain Tailwind is fine there. Wrapping every `flex` in a component adds noise and gains nothing. shadcn's own components should keep using raw classes internally.
- **Page-width constraints.** Use Container.
- **Prose** (Markdown/CMS output). Use a `prose`-style typographic stack. Gap-based flex removes margin collapsing and changes inline content behaviour.

---

## 2. Anatomy

```
<Stack as="div" direction="col" gap="4" align="stretch" justify="start" wrap={false} divider>
  ├─ child 1      (direct child = flex item; no outer margin of its own)
  ├─ [divider]    (optional; generated, aria-hidden or role="separator")
  ├─ child 2
  ├─ [divider]
  └─ child 3
</Stack>
```

Parts:
1. **Root**: one element, `display:flex`, a `flex-direction`, a `gap`. That is the whole component. No wrapper div and no inner `ul`.
2. **Children**: the stack never wraps or clones children (except when dividers are on, see section 3). That keeps the DOM flat and the children's own semantics intact.
3. **Divider (optional)**: either a generated element between children, or a CSS border on the children.
4. **Stack.Item (optional, probably skip)**: Primer has `Stack.Item` with `grow`/`shrink`. In Tailwind, `className="flex-1"` or `grow` on the child does the same job. **Recommendation:** don't ship an Item part. Document the `flex-1 min-w-0` pattern instead.

---

## 3. Variants: what's necessary vs. bloat

| Prop | Verdict | Notes |
|---|---|---|
| `gap` | **Required** | Token scale only (section 5). Default to a sensible middle value (e.g. `4` = 1rem), not 0. MUI/Chakra default to 0/8px, and forgetting `gap` is a common "why is my stack cramped" moment. |
| `direction` | **Required** | `"col" \| "row"` (plus the reverse values, see below). Mantine and Atlassian split vertical/horizontal into separate components (Stack/Group, Stack/Inline). Chakra ships both `Stack` and `HStack`/`VStack`. **Recommendation:** one `Stack` with `direction`, plus optional `HStack`/`VStack` aliases only if the team wants them. Responsive direction (column on mobile, row on desktop) needs a single component anyway. |
| `align` (cross axis) | **Required** | `start \| center \| end \| stretch \| baseline`. Default `stretch` for columns (form fields fill the width). For rows, `center` is what people want 90% of the time, so consider a direction-dependent default (Mantine's Group defaults to `align="center"`). |
| `justify` (main axis) | **Useful** | `start \| center \| end \| between`. `between` is the main real-world need (toolbar: title left, actions right). `around`/`evenly` are rarely used in business UIs. Include them only because the cost is near zero. Atlassian narrows this to a single `spread="space-between"`. |
| `wrap` | **Useful for rows** | Boolean. Meaningless for columns in practice. If Stack supports `wrap`, it overlaps with Cluster/Inline (section 8). |
| `divider` | **Useful but costly** | Business UIs use divided lists everywhere (settings rows, detail panels). See the implementation trade-offs below. |
| `reverse` / `col-reverse` | **Bloat, and an a11y hazard** | Visual order then differs from DOM and focus order (section 6). Polaris has `reverseOrder`. **Recommendation:** omit it. Users can add `flex-col-reverse` via `className` if they really must. |
| `gapX` / `gapY` | **Only if wrap is supported** | A wrapped row needs a different row gap (Radix `gapX`/`gapY`, Atlassian Inline `rowSpace`). |
| `inline` (`inline-flex`) | **Nice-to-have** | Radix supports `display="inline-flex"`. Rare. Use `className="inline-flex"`. |
| `grow`/`fill` (Atlassian `grow="fill"`) | **Skip** | `className="w-full"` or `flex-1` does it. |
| Padding, background, border, width props (Radix/Mantine "style props") | **Bloat for business-ui** | Tailwind classes already do all of this. Style props duplicate Tailwind and fight it (two ways to set padding, and a merge-order puzzle). Use `className`. |

### Divider implementation options
1. **Generated elements** (Chakra `separator`, MUI `divider`): map over `Children.toArray(children)` and interleave a `<Separator/>`. Pros: works with any child and can be a real `role="separator"` element. Cons: `Children.toArray` drops `null`/`false` but **cannot see through fragments or components that render `null`**, so you get double or leading dividers. It also breaks `ul > li` validity, because a `<div>` divider inside a `<ul>` is invalid HTML.
2. **CSS borders on children** (`divide-y`-like: `[&>*:not(:last-child)]:border-b` plus padding on each child). Pros: no DOM changes, valid inside lists, cheap. Cons: the divider sits *inside* the child's box, so gap and divider spacing interact (you need padding instead of gap, or `gap` on both sides of a border via `pb`/`pt`). Hidden children (`hidden` attribute or `display:none`) still count for `:last-child` (Tailwind v4 changed `divide-*` to `:not(:last-child)` for this reason, see section 9).
3. **Pseudo-elements**: limited, because a flex gap can't contain content.

**Recommendation:** support `divider` as a boolean that uses option 2 (CSS, with gap converted to padding on each side of the border via a CSS variable), and document "render `<Separator />` yourself" for custom dividers. Avoid `Children` manipulation. React's docs list `Children` as a legacy API and it's fragile with fragments and conditional rendering.

---

## 4. Responsive behaviour

Three approaches exist:

**A. Responsive prop objects** (Braid, Radix Themes, MUI, Chakra, Primer, Polaris):
```tsx
<Stack direction={{ initial: "col", md: "row" }} gap={{ initial: "2", md: "4" }} />
```
- Pros: discoverable and type-checked. Every library above supports it.
- Cons with Tailwind: the component must map every `(breakpoint × value)` pair to a **complete static class string**, because Tailwind cannot see dynamically built classes ("Don't construct class names dynamically… Map props to static class names"). For 5 breakpoints × ~12 gap values × gap/gapX/gapY that's a 180+ entry lookup table per prop, all of which ends up in the CSS (or needs `@source inline()` safelisting). Radix Themes avoids this by shipping its own precompiled CSS, which is exactly the lock-in business-ui wants to avoid.
- An alternative is setting CSS variables per breakpoint (`style={{ "--gap-md": "1rem" }}` plus one static class set that reads `md:gap-(--gap-md)`). That keeps the CSS small, but the API reads well and the generated markup doesn't.

**B. Breakpoint classes via `className`** (shadcn-style):
```tsx
<Stack gap="2" className="md:flex-row md:gap-4" />
```
- Pros: zero runtime, zero lookup table, every Tailwind user already knows it, and `tailwind-merge` resolves conflicts.
- Cons: escapes the token guardrail (`md:gap-[13px]` is possible), and responsive changes are split between props and classes.

**C. Container queries** (`@container` plus `@md:flex-row`, built into Tailwind v4):
- Very relevant for dashboards: a card in a narrow sidebar column and the same card in a wide main column should lay out differently regardless of viewport. Every Layout's Switcher (`flex-basis: calc((threshold - 100%) * 999)`) is the intrinsic, no-query version of this.
- Requires an ancestor with `container-type` (`@container` class).

**Recommendation:**
- **v1: approach B.** Static props (`direction`, `gap`, `align`, `justify`, `wrap`) take scalar values only. Responsive changes go through `className` with Tailwind variants, including container variants (`@md:flex-row`). This fits "Tailwind looseness, no lock-in" and keeps each package tiny.
- Make sure `className` wins over prop-generated classes by merging with `tailwind-merge` (`cn()`), with props first and className last.
- Revisit responsive object props only if real usage shows `direction` flipping is common and noisy. If added, support **`direction` only** (the 80% case), backed by a small static map.
- Document a "collapse to column under a container width" recipe (`@container` on the parent, `flex-col @lg:flex-row` on the stack) instead of building a Switcher component in v1.

---

## 5. Spacing scale and tokens

Tailwind v4 derives every spacing utility from one variable: `--spacing: 0.25rem`, with `gap-4 = calc(var(--spacing) * 4)`. All theme variables are exposed as real CSS custom properties on `:root`.

How other systems name the gap scale:

| System | Gap scale |
|---|---|
| Tailwind | numeric multiples of `--spacing` (0, 0.5, 1, 1.5, 2… 96) |
| Radix Themes | `"0"`–`"9"` mapped to `--space-1…9` (4, 8, 12, 16, 24, 32, 40, 48, 64px) |
| Atlassian | `space.0`, `space.025` … `space.1000` (the number is a fraction of 8px) |
| Polaris | `"0"`, `"025"`, `"050"`, `"100"` … `"3200"` (similar to Atlassian) |
| Braid | `none, xxsmall … xxxlarge`, plus a semantic `gutter` |
| Primer | `none, condensed, normal, spacious` (and `tight`, `cozy` in newer versions) |
| Mantine | `xs, sm, md, lg, xl` mapped to `--mantine-spacing-*` |

Observations:
- **T-shirt / semantic names** (Primer, Braid) make inconsistent spacing impossible, but feel foreign next to Tailwind's `gap-4` and need a mental mapping.
- **Numeric names that match Tailwind** cost no translation: `gap="4"` equals `gap-4`, and people can move between prop and class freely.
- A full 30-step scale is too much freedom for a "consistent rhythm" component.

**Recommendation:**
1. Use **Tailwind's numeric names** for the `gap` prop, but restrict them to a curated subset: `0, 1, 2, 3, 4, 6, 8, 10, 12, 16` (0–64px). The type is a string-literal union so autocomplete shows only the curated steps.
2. Map each value to a static class (`"4" → "gap-4"`) so the CSS goes through the user's Tailwind theme. Overriding `--spacing` (density modes, e.g. a compact admin table view) then rescales every Stack automatically, with no business-ui-specific variable to learn.
3. Optionally define **semantic aliases** as CSS variables in the business-ui theme file: `--space-stack-tight`, `--space-stack-default`, `--space-section`, pointing at `calc(var(--spacing) * n)`. Expose them as Tailwind utilities via `@theme` (e.g. `gap-section`). This gives a "density" lever without inventing a new scale. Treat it as optional and decide in section 10.
4. Do **not** use `rem` literals inside the component. Always go through the theme so user customisation works.

---

## 6. Accessibility considerations

Stack is presentational, so most a11y risk comes from the element it renders and from order mismatches.

1. **Default element `div`, and nothing implicit.** Don't add `role`. A layout container is not a landmark or a group.
2. **List semantics via `as`.** When children are a collection (settings rows, activity feed, nav links), render `as="ul"` with `<li>` children. Screen readers then announce "list, 5 items", which helps navigation. Polaris limits `as` to `div | span | ul | ol | li | fieldset`, and Braid's Stack can render list markup too.
   - **Pitfall:** Safari/VoiceOver drops list semantics when `list-style: none` is applied (Tailwind preflight sets `list-style: none` on `ul, ol`). Fix: add `role="list"` when `as` is `ul`/`ol`. **Recommendation:** Stack adds `role="list"` automatically for `ul`/`ol` unless the user overrides it.
   - If Stack generates divider *elements*, they must not end up as direct children of a `ul` (invalid HTML, and AT miscounts items). That's another reason for the CSS-border divider (section 3).
3. **`fieldset` for grouped form controls.** Radio groups and checkbox groups laid out with Stack should be `as="fieldset"` with a `<legend>`. Note that `fieldset` has historic flexbox bugs: older Chrome/Firefox couldn't make `fieldset` a flex container. That's fixed in current engines, but the rendered `legend` sits *inside* the flex flow. Document it.
4. **Visual order must match DOM order (WCAG 1.3.2 Meaningful Sequence, 2.4.3 Focus Order).** `flex-direction: row-reverse`/`column-reverse` and `order` change only the visual order, so keyboard and screen-reader users get a different sequence. This is why section 3 recommends no `reverse` prop. The responsive case matters too: `flex-col md:flex-row` is fine (same order), but a "put the sidebar first on mobile" trick via `order-first` is not. The CSS `reading-flow` property (shipping in Chromium) will eventually let order follow the visual layout, but don't rely on it yet.
5. **Dividers are decorative.** A CSS border needs nothing. A generated `<hr>`/`Separator` between purely visual groups should be `aria-hidden` or `role="none"`, unless it really separates content sections (then `role="separator"` is fine). Radix Separator has a `decorative` prop for exactly this.
6. **Spacing and target size.** WCAG 2.2 2.5.8 Target Size (Minimum) counts spacing around small targets. A row of icon buttons with `gap="1"` (4px) and 20px icons can fail. Recommend `gap="2"` or more for icon-button toolbars in the docs.
7. **Text spacing / zoom (1.4.12, 1.4.10).** Gap in `rem` (via `--spacing`) scales with user font size. Avoid `px` gaps. Rows that don't wrap overflow at 400% zoom, which is another reason to make `wrap` easy for horizontal stacks of buttons and badges.

---

## 7. API shape recommendations

### How 4 libraries do it

| | Radix Themes `Flex` | Mantine `Stack`/`Group` | MUI `Stack` | Atlassian `Stack`/`Inline` |
|---|---|---|---|---|
| Split by direction | No (`direction`) | Yes (Stack = col, Group = row) | No (`direction`) | Yes (Stack/Inline) |
| Gap prop | `gap`, `gapX`, `gapY` = `"0"`–`"9"` | `gap` = `xs`–`xl` or number | `spacing` = theme multiplier | `space` = `space.*` token |
| Spacing mechanism | `gap` | `gap` | **Child margins by default**; `useFlexGap` opts into `gap` | `gap` |
| Dividers | none | none | `divider` (element interleaved) | Inline: `separator` (string) |
| Element switch | `as="div\|span"` + `asChild` | `component` (polymorphic) | `component` | `as` (limited list) |
| Responsive | object `{ initial, sm, md… }` | via style props / `hiddenFrom` | object `{ xs, sm, md… }` | no (use media queries) |
| Style props | yes (p, m, width…) | yes | yes (system props, deprecated in v6+) | no (`xcss` only) |

Takeaways:
- MUI's margin-based default caused years of bugs (ignored child margins, broken wrap, RTL issues), and they added `useFlexGap` to escape it. **Use `gap` from day one.** Flexbox `gap` has been supported in all evergreen browsers since 2021.
- Atlassian deliberately limits `as` to a small list of layout-safe elements. That keeps typing simple and stops people building buttons out of Stacks.
- Style props are the main thing business-ui should *not* copy. Tailwind classes are the style-prop system.

### Recommended API (sketch, not implementation)

```tsx
type Gap = "0" | "1" | "2" | "3" | "4" | "6" | "8" | "10" | "12" | "16";

interface StackProps extends React.HTMLAttributes<HTMLElement> {
  as?: "div" | "section" | "ul" | "ol" | "li" | "nav" | "fieldset" | "form" | "span";
  asChild?: boolean;               // OR `render` — pick ONE library-wide (see section 10)
  direction?: "col" | "row";       // default "col"
  gap?: Gap;                       // default "4"
  align?: "start" | "center" | "end" | "stretch" | "baseline";   // default: col→stretch, row→center
  justify?: "start" | "center" | "end" | "between";
  wrap?: boolean;                  // row only; default false
  divider?: boolean;               // CSS-border divider using the theme border color
}
```

Principles (recommendations):
1. **Props compile to static Tailwind classes** through a `cva`-style variant map. The component outputs `className={cn(stackVariants({ direction, gap, align, justify, wrap }), className)}`. With `tailwind-merge`, a user's `className="gap-8"` overrides `gap="4"` predictably.
2. **Restricted `as` union instead of a fully generic polymorphic type.** Fully generic `as` typing (`<C extends ElementType>(props: PolymorphicProps<C>)`) is notoriously slow for the TS checker, interacts badly with `forwardRef` generics, and produces unreadable errors. A closed union of ~9 tags means `HTMLAttributes<HTMLElement>` plus `ref: Ref<HTMLElement>` is good enough. For anything else (Next `Link`, a router element) use `asChild`/`render`.
3. **`asChild` vs `render`:** shadcn uses Radix `Slot` (`asChild`). Base UI (which shadcn now also supports) uses `render={<a />}` or `render={(props) => …}`. **Recommendation:** match whatever business-ui picks for Button and other primitives. Consistency across packages matters more than which one wins. If business-ui is Radix-based, use `asChild`.
4. **React 19 ref as prop.** Accept `ref` as a normal prop (no `forwardRef`) if the minimum React version is 19, otherwise `forwardRef`.
5. **Add `min-w-0` to the root of row stacks** (or document it). See the flex min-size pitfall in section 9.
6. **No `Children` manipulation.** Stack should be a dumb element. That makes it server-component safe (no hooks, no `'use client'`), which is a real advantage in Next.js app-router admin apps.
7. **Expose the variant function** (`stackVariants`) from the package so people can apply Stack styling to an element they don't control, without a wrapper.

How it should feel with Tailwind:
```tsx
<Stack gap="6">
  <PageHeader />
  <Stack direction="row" justify="between" className="flex-col sm:flex-row" >
    <Filters />
    <Stack direction="row" gap="2"><Button>Export</Button><Button>New</Button></Stack>
  </Stack>
  <Stack as="ul" divider gap="0" className="rounded-lg border">…</Stack>
</Stack>
```

---

## 8. Related layout primitives: recommended minimal set

| Primitive | What it does | Prior art | Recommendation |
|---|---|---|---|
| **Stack** | 1-D flex with token gap, direction, align, justify, wrap, divider | Every system | **Ship (core).** |
| **Inline / Cluster / Group** | Horizontal, wrapping, usually `align-items:center`, separate row/col gap | Every Layout Cluster, Braid Inline, Atlassian Inline, Mantine Group | **Fold into Stack** via `direction="row" wrap` (+ `gapY` if needed). A separate component mostly duplicates Stack. Re-export `Inline = (p) => <Stack direction="row" wrap align="center" {...p}/>` only if teams ask for it. |
| **Grid** | 2-D: fixed column count or auto-fit columns | Radix Grid, Braid Tiles, Mantine SimpleGrid, Every Layout Grid | **Ship as a separate, small package.** Real value: `columns="1|2|3|4|6|12"` and, most useful for dashboards, an **auto-fit mode** (`minItemWidth="16rem"` → `grid-template-columns: repeat(auto-fill, minmax(min(16rem,100%),1fr))`), which gives responsive card grids with no breakpoints. Uses the same `gap` scale. |
| **Container** | Max width, centred, horizontal gutters | Radix Container (448/688/880/1136px), Braid ContentBlock/PageBlock | **Ship (tiny).** `size="sm\|md\|lg\|xl\|full"` mapped to Tailwind `max-w-*`, `mx-auto`, a padding-inline token. Business apps use it for settings/forms pages (narrow) vs. dashboards (full). Optionally a `Section` for vertical page padding, but `className="py-8"` covers it. |
| **Box** | Generic div with padding/bg/border props | Braid Box, Radix Box, Atlassian Box | **Don't ship.** In Tailwind, `<div className>` *is* Box. Box exists in other systems to carry style props, which business-ui shouldn't have. |
| **Sidebar / Switcher** (Every Layout) | Intrinsic two-pane layout / auto-collapse row↔column | Every Layout, Braid `Columns collapseBelow` | **Recipes, not components** for v1. Document the CSS (or container-query classes) in the docs. A collapse-below behaviour for `Stack direction="row"` is the most-requested variant. Consider it after v1. |
| **Spacer** | Empty flex-grow element | Chakra Spacer | **Skip.** `justify="between"` or `ml-auto` on a child does it. |
| **Columns** (Braid) | Row with explicit width fractions | Braid | **Skip.** Grid plus `col-span-*` or Stack plus `basis-*`/`flex-1` covers it. |

**Minimal set: `Stack`, `Grid`, `Container`.** That matches the stated project goals and covers forms, toolbars, card grids and page shells. Everything else is either `className` or a docs recipe.

---

## 9. Common pitfalls and bugs seen in the wild

1. **Margin-based spacing breaks.** Owl/`space-y` approaches add margins to children, so child margins conflict, `wrap` creates misaligned rows, and the first item of a wrapped row has a stray margin. MUI documents "Customizing the margin on the children is not supported by default" and added `useFlexGap` to fix it. Every Layout's owl-based Stack is elegant in plain CSS but loses to `gap` in a component library where children aren't controlled.
2. **Tailwind `space-y-*` / `divide-*` changed selectors in v4.** These moved from `> :not([hidden]) ~ :not([hidden])` (margin-top) to `> :not(:last-child)` (margin-bottom) for a "~2000x" perf win. That broke inline children, user-added margins on children (tailwind #16395, #16748) and reverse layouts (discussion #18719). The upgrade guide's official advice: "use flex or grid layouts with `gap`". **Don't build Stack on `space-y`.**
3. **Hidden and conditional children.** With `gap`, a `display:none` child takes no space (good), but a child that renders an empty `<div>` still gets a gap on both sides, which looks like double spacing. Common with components that render an empty wrapper when they have no data. Make conditional children return `null`. CSS-border dividers and `:last-child` selectors miscount when the last child is `hidden`.
4. **Flex min-size overflow.** Flex items default to `min-width: auto`, so a long unbreakable string or a `truncate`/`white-space: nowrap` child in a row stack won't shrink, and it overflows the card or table cell. MUI lists this as a known limitation. The fix is `min-w-0` on the growing child (and on nested stacks). Also `min-h-0` for column stacks inside fixed-height scroll panels, otherwise `overflow-auto` children never scroll. Very common in dashboard sidebars.
5. **Default `align-items: stretch` surprises.** In a column, buttons and badges stretch to full width. In a row, children stretch to the tallest sibling (inputs and buttons look mismatched). That's why section 3 recommends `align` defaults that depend on direction, or per-child `self-start`.
6. **Dynamic Tailwind class construction.** Implementations that do `` `gap-${gap}` `` work in dev (classes happen to exist elsewhere) and break in production builds. Use a static map. Tailwind's docs call this out explicitly.
7. **Polymorphic typing cost.** Generic `as` typing with `forwardRef` slows down TS in large codebases and gives poor errors. Many libraries (Chakra v2 → v3, Stitches, Radix) moved toward `asChild`. Use a closed `as` union (section 7).
8. **`Children.map` dividers and fragments.** Chakra/MUI-style interleaving counts a `<>...</>` fragment as a single child and doesn't see components that render `null`. Result: missing or doubled dividers. It also needs `key` juggling and forces a client component in some setups.
9. **Reversed order and a11y.** `flex-direction: *-reverse` (Polaris `reverseOrder`) produces focus order that doesn't match the visual order (WCAG 2.4.3).
10. **List semantics lost in Safari** when `list-style:none` is applied (Tailwind preflight). Add `role="list"`.
11. **Over-componentising.** Teams wrap every flex container in Stack/HStack/Box and end up with deep component trees, prop-vs-class confusion ("is the padding on the Stack prop or the class?") and debugging overhead. Keep Stack for *rhythm*, not every flex.
12. **Gap between a percentage-width child and the container.** `gap` plus `w-1/2` children overflow (50% + 50% + gap > 100%). Use `flex-1` / `basis-0 grow` or Grid instead of percentage widths inside a gapped row.

---

## 10. Open questions and decisions for business-ui

1. **`asChild` (Radix Slot) or `render` (Base UI)?** It must match the rest of the library. Decide once, globally.
2. **Single `Stack` with `direction`, or also export `HStack`/`VStack` (Chakra) or `Inline` (Braid/Atlassian)?** Recommendation: single Stack. Add aliases later if needed.
3. **Responsive prop objects at all?** Recommendation: no for v1 (className variants). Possible later: `direction` only.
4. **Gap scale:** curated Tailwind numerics (recommended), or semantic names (`tight/default/loose/section`) for stricter consistency? Or both, with semantic tokens defined as CSS vars and surfaced as extra Tailwind utilities?
5. **Divider implementation:** CSS border (recommended) vs. interleaved `Separator` element. What spacing model does the divider use (gap on each side, or padding)?
6. **Direction-dependent `align` default** (`stretch` for col, `center` for row)? It's convenient, but "magic" defaults can surprise. Needs a call.
7. **Default `gap`:** `"4"` (16px) or `"0"`? Recommendation: `"4"`, since a Stack with zero gap is usually a mistake.
8. **Should row stacks get `min-w-0` on the root by default?** It's harmless in almost all cases and prevents bug #4 when stacks nest.
9. **Ship `stackVariants()` (cva) publicly** so it can be applied without the component?
10. **Container query recipes:** should business-ui's theme add `@container` to common shells (Card, Panel) so `@md:flex-row` works out of the box inside them?
11. **Grid auto-fit API naming:** `minItemWidth` vs `minChildWidth` (Chakra's old SimpleGrid name) vs Every Layout's `--minimum`.
12. **Container size names:** align with Tailwind `max-w-*` names (`sm/md/lg/xl/2xl…/screen`) or a smaller custom set (`narrow/default/wide/full`)?

---

## 11. Sources

Concepts and layout philosophy
- Every Layout, The Stack: https://every-layout.dev/layouts/stack/
- Every Layout, The Cluster: https://every-layout.dev/layouts/cluster/
- Every Layout, The Switcher: https://every-layout.dev/layouts/switcher/
- Every Layout, The Sidebar: https://every-layout.dev/layouts/sidebar/
- Heydon Pickering, "Axiomatic CSS and Lobotomized Owls" (A List Apart): https://alistapart.com/article/axiomatic-css-and-lobotomized-owls
- Braid, Layout foundation: https://seek-oss.github.io/braid-design-system/foundations/layout/
- "Essential Layout Components For Your Design System" (DEV): https://dev.to/nayaabkhan/essential-layout-components-for-your-design-system-26p
- Josh Cusick, "Design system primitives": https://joshcusick.substack.com/p/design-system-primitives

Library docs
- Braid Stack: https://seek-oss.github.io/braid-design-system/components/Stack
- Braid Inline: https://seek-oss.github.io/braid-design-system/components/Inline/
- Braid Columns: https://seek-oss.github.io/braid-design-system/components/Columns/
- Braid Tiles: https://seek-oss.github.io/braid-design-system/components/Tiles/
- Atlassian Stack primitive: https://atlassian.design/components/primitives/stack
- Atlassian Inline primitive: https://atlassian.design/components/primitives/inline
- Atlassian primitives overview: https://atlassian.design/components/primitives/overview
- Atlassian Forge Stack (prop values): https://developer.atlassian.com/platform/forge/ui-kit/components/stack/
- Atlassian Forge Inline: https://developer.atlassian.com/platform/forge/ui-kit/components/inline/
- Polaris BlockStack: https://polaris-react.shopify.com/components/layout-and-structure/block-stack
- Polaris InlineStack: https://polaris-react.shopify.com/components/layout-and-structure/inline-stack
- Primer Stack: https://primer.style/product/components/stack/
- Radix Themes Flex: https://www.radix-ui.com/themes/docs/components/flex
- Radix Themes Grid: https://www.radix-ui.com/themes/docs/components/grid
- Radix Themes Box: https://www.radix-ui.com/themes/docs/components/box
- Radix Themes Container: https://www.radix-ui.com/themes/docs/components/container
- Mantine Stack: https://mantine.dev/core/stack/
- Mantine Group: https://mantine.dev/core/group/
- Mantine Flex: https://mantine.dev/core/flex/
- Chakra UI Stack: https://chakra-ui.com/docs/components/stack
- MUI Stack (limitations, useFlexGap, divider): https://mui.com/material-ui/react-stack/
- Base UI composition (`render` prop): https://base-ui.com/react/handbook/composition

Tailwind and CSS
- Tailwind v4 upgrade guide (space-between and divide selector changes): https://tailwindcss.com/docs/upgrade-guide
- Tailwind PR #13459, "Don't accommodate hidden elements in space/divide": https://github.com/tailwindlabs/tailwindcss/pull/13459
- Tailwind issue #16395, space-y and labels in v4: https://github.com/tailwindlabs/tailwindcss/issues/16395
- Tailwind issue #16748, space-y with negative margins in v4: https://github.com/tailwindlabs/tailwindcss/issues/16748
- Tailwind discussion #18719, space-y with reverse: https://github.com/tailwindlabs/tailwindcss/discussions/18719
- Tailwind discussion #13445, space-* performance: https://github.com/tailwindlabs/tailwindcss/discussions/13445
- Tailwind, detecting classes / dynamic class names / `@source inline()`: https://tailwindcss.com/docs/detecting-classes-in-source-files
- Tailwind, theme variables and `--spacing`: https://tailwindcss.com/docs/theme
- Tailwind, responsive design and container queries: https://tailwindcss.com/docs/responsive-design
- MDN, `gap`: https://developer.mozilla.org/en-US/docs/Web/CSS/gap
- MDN, flexbox ordering and accessibility: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_flexible_box_layout/Ordering_flex_items
- MDN, `reading-flow`: https://developer.mozilla.org/en-US/docs/Web/CSS/reading-flow

Accessibility
- WCAG 2.2 Understanding 1.3.2 Meaningful Sequence: https://www.w3.org/WAI/WCAG22/Understanding/meaningful-sequence
- WCAG 2.2 Understanding 2.4.3 Focus Order: https://www.w3.org/WAI/WCAG22/Understanding/focus-order
- WCAG 2.2 Understanding 2.5.8 Target Size (Minimum): https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum
- Scott O'Hara, "'Fixing' Lists" (Safari/VoiceOver list-style:none): https://www.scottohara.me/blog/2019/01/12/lists-and-safari.html

Polymorphism / API typing
- components.build, Polymorphism (`as` vs `asChild`): https://www.components.build/polymorphism
- MakerX, "Polymorphic, typesafe UI components with React (and Tailwind and Radix Slot)": https://blog.makerx.com.au/polymorphic-typesafe-react-components/
- Stitches issue #1073, "Use @radix-ui/react-slot for polymorphism": https://github.com/stitchesjs/stitches/issues/1073
- Workday Canvas Kit discussion #1835, Polymorphic components: https://github.com/Workday/canvas-kit/discussions/1835
- "Creating fast type-safe polymorphic components using render props" (DEV): https://dev.to/nasheomirro/creating-fast-type-safe-polymorphic-components-3f6p
- LogRocket, "Build strongly typed polymorphic components with React and TypeScript": https://blog.logrocket.com/build-strongly-typed-polymorphic-components-react-typescript/
