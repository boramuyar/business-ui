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
