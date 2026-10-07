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

Examples:

```bash
pnpm dlx shadcn@latest add boramuyar/business-ui/style
pnpm dlx shadcn@latest add boramuyar/business-ui/button
```

### Optional: the `@business-ui` namespace

The same items are also published as static JSON at
`https://boramuyar.github.io/business-ui/r/<item>.json`. Add the namespace to the
app's `components.json` once:

```json
{
  "registries": {
    "@business-ui": "https://boramuyar.github.io/business-ui/r/{name}.json"
  }
}
```

Then install with the shorter address:

```bash
pnpm dlx shadcn@latest add @business-ui/style @business-ui/button
```

Both forms install the same files. Item dependencies always use the GitHub
address, so they resolve with or without the namespace.

## Common items

- `boramuyar/business-ui/style` - theme, tokens, fonts, base styles, and custom utilities.
- `boramuyar/business-ui/button` - button primitive.
- `boramuyar/business-ui/use-mobile` - mobile viewport hook used by sidebar.
- `boramuyar/business-ui/design-guide` - `DESIGN.md` and the `design/` guides for agents.
- `boramuyar/business-ui/design-check` - `scripts/design-check.mjs`, which flags rule violations.
- `boramuyar/business-ui/list-page` (and `page`, `detail-page`, `form-page`, `settings-page`, `overview-page`) - page shells, installed to `components/shells/`.

## Design rules

Business UI is a design system, not only a component set. Before building screens, install the guide and the check:

```bash
pnpm dlx shadcn@latest add boramuyar/business-ui/design-guide boramuyar/business-ui/design-check
```

This adds `DESIGN.md` at the project root, the `design/` folder, and `scripts/design-check.mjs`. Point the app's agent instructions (AGENTS.md or CLAUDE.md) at `DESIGN.md`, and run the check before finishing UI work:

```bash
node scripts/design-check.mjs src
```

Every installed component and shell also starts with a usage header (`@use`, `@avoid`, `@related`), so the rules are in the file you are about to use. The short version:

- Start every screen from a shell. Create a new one in `components/shells/` only with a `@closest`, `@why` and `@reuses` header.
- Colors are role tokens only. The style removes Tailwind's palette, so `bg-blue-500` and `text-white` render nothing.
- Type stops at `text-3xl`, with normal, medium and semibold weights.
- Pick controls and overlays with the guides in `design/patterns/`.

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

## Notes for consuming agents

- Install `style` before primitives when setting up a new app.
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
