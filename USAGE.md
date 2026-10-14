# Consuming the Business UI Registry

This guide is for agents installing registry items into another app.

## Prerequisites: a shadcn-ready project

The shadcn CLI needs two things in the consuming app:

1. A `components.json` at the project root.
2. An import alias the CLI can resolve **from the root `tsconfig.json`**.
   If the project uses a solution-style root tsconfig (`"files": []` with
   `references`), the alias `paths` must still be declared in the ROOT file —
   the CLI does not read referenced tsconfigs. Without it, installs silently
   land in a literal `@/` directory.

```json
// tsconfig.json (root)
{
  "compilerOptions": {
    "paths": { "@/*": ["./src/*"] }
  }
}
```

For a brand-new project, let the CLI scaffold everything:

```bash
pnpm dlx shadcn@latest init --yes --template vite --base radix --preset nova --no-monorepo --name my-app
```

For an existing app without shadcn, run `pnpm dlx shadcn@latest init` in the
project root and review what it writes, or create `components.json` by hand
(see the shadcn docs) with `aliases` matching the repo layout. Non-default
layouts work — point the aliases wherever components should land, e.g.
`"components": "@/shared/components"`.

## Install items

Use the GitHub registry address directly:

```bash
pnpm dlx shadcn@latest add boramuyar/business-ui/<item>
```

Set up the app once with the style and the fonts, then add items as you
need them:

```bash
pnpm dlx shadcn@latest add boramuyar/business-ui/style boramuyar/business-ui/fonts
pnpm dlx shadcn@latest add boramuyar/business-ui/button
```

Items do not depend on `style`, so adding or re-adding one never touches
your global CSS. Re-run the `style` add to pick up token changes.

### Fonts

The style names Inter Variable and JetBrains Mono Variable in `--font-sans`
and `--font-mono`. The `fonts` item imports them from the
`@fontsource-variable` npm packages. Skip it when the app serves the fonts
itself, for example under a Content Security Policy that blocks the
`data:` URIs a bundler inlines small font files as: declare `@font-face`
rules for the same two family names instead.

### Optional: the `@business-ui` namespace

The same items are also published as static JSON at
`https://ui.uyar.design/r/<item>.json`. Add the namespace to the
app's `components.json` once:

```json
{
  "registries": {
    "@business-ui": "https://ui.uyar.design/r/{name}.json"
  }
}
```

Then install with the shorter address:

```bash
pnpm dlx shadcn@latest add @business-ui/style @business-ui/fonts @business-ui/button
```

Both forms install the same files. Item dependencies always use the GitHub
address, so they resolve with or without the namespace.

## Common items

- `boramuyar/business-ui/style` - theme, tokens, base styles, and custom utilities. Install once.
- `boramuyar/business-ui/fonts` - Inter and JetBrains Mono from npm. Skip it if the app hosts them.
- `boramuyar/business-ui/button` - button primitive.
- `boramuyar/business-ui/use-mobile` - mobile viewport hook used by sidebar.
- `boramuyar/business-ui/list-page` (and `page`, `detail-page`, `form-page`, `settings-page`, `overview-page`) - page shells, installed to `components/shells/`.

## Design rules

Business UI is a design system, not only a component set. The rules are published at https://ui.uyar.design/design.md, with an index for agents at https://ui.uyar.design/llms.txt. Read them from there; nothing is copied into the app, so they never go stale.

Add one line to the app's agent instructions (AGENTS.md or CLAUDE.md):

```markdown
Before building or changing UI, read https://ui.uyar.design/llms.txt and follow the Business UI design rules. Run the design check before finishing.
```

Run the check straight from the site, which always serves the current version:

```bash
curl -fsSL https://ui.uyar.design/design-check.mjs | node --input-type=module - src
```

Every installed component and shell also carries a usage header (`@use`, `@avoid`, `@related`) below its imports, so the rules travel with the code and update when you re-pull an item. The short version:

- Start every screen from a shell. Create a new one in `components/shells/` only with a `@closest`, `@why` and `@reuses` header.
- Colors are role tokens only. The style removes Tailwind's palette, so `bg-blue-500` and `text-white` render nothing.
- Type stops at `text-3xl`, with normal, medium and semibold weights.
- Pick controls and overlays with the pattern guides on the site.

## Accent color

The style ships an indigo accent as `--brand`, with the same `-subtle`,
`-border`, `-strong`, and `-emphasis` scale as the other colors. Primary
buttons stay near-black. The accent marks state: checked checkboxes, radios
and switches, the active line tab, progress and slider fills, selected
calendar days and table rows, link buttons, and every focus ring (`--ring`
points at `--brand`). The five chart colors are a lightness ramp computed
from `--brand` with OKLCH relative color syntax, so they follow it too.

Change the hue by overriding two variables in your global CSS:

```css
:root { --brand: oklch(0.55 0.19 252); }
.dark { --brand: oklch(0.64 0.17 252); }
```

Set `--brand-foreground` too if the new color needs dark text. To turn the
accent off and go back to plain Graphite, point it at primary:

```css
:root, .dark {
  --brand: var(--primary);
  --brand-foreground: var(--primary-foreground);
}
```

## Older webviews

Every color is written in OKLCH, the tints use `color-mix()`, and the chart
ramp uses relative color syntax. Engines that predate those features, such as
the system WKWebView that Office for Mac uses for add-ins, drop those
declarations. The style therefore ends with three `@supports not` blocks that
restate the affected tokens as precomputed `rgb()` values; modern browsers
never apply them.

The precomputed values come from the shipped colors. If you override
`--brand` (or any other color) and support those webviews, restate your
override and the tints derived from it, as `rgb()`, inside the matching block:

```css
@supports not (color: oklch(0 0 0)) {
  :root { --brand: rgb(…); }
}
@supports not (color: color-mix(in oklab, red, white)) {
  :root { --brand-subtle: rgb(…); --brand-border: rgb(…); --brand-strong: rgb(…); }
}
```

## Notes for consuming agents

- Install `style` (and `fonts`, unless the app hosts them) once when setting up an app; items do not pull it in.
- Use the full GitHub or `@business-ui` address. Bare names such as `button` refer to the public
  shadcn registry.
- React 18 and 19 are both supported (typecheck-verified across all items).
- `cn` comes from `shadcn init` (the standard `lib/utils.ts`); registry
  components import it via the consumer's `utils` alias. The design system
  currently needs no tailwind-merge configuration.
- Never pass `--overwrite` unless you intend to reset those files to the
  registry version. Without it the CLI prompts per existing file (default:
  keep yours), so installing new items never silently destroys local changes.
- Ownership of installed copies:
  - Primitives (`ui/**`): treat as registry-managed. Local modification is
    highly discouraged (not enforced) - improve the component in this repo
    via PR instead, then re-pull.

Inspect an item before installing it:

```bash
pnpm dlx shadcn@latest view boramuyar/business-ui/button
pnpm dlx shadcn@latest add boramuyar/business-ui/button --dry-run
```

Discover available items:

```bash
pnpm dlx shadcn@latest list boramuyar/business-ui
pnpm dlx shadcn@latest search boramuyar/business-ui --query button
```
