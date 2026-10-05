# Maintaining the Business UI Registry

This guide is for agents editing this repository.

## Repository map

- `style/` - Tailwind v4 style source JSON files plus generated `globals.css` and `registry.json`.
- `utilities/` - showcase-local utilities; consumers use the `cn` helper created by `shadcn init`.
- `hooks/` - shared hooks used by primitives.
- `primitives/` - low-level UI primitives. Each primitive has its own `registry.json`.
- `showcase/` - Vite app for previewing primitives, style, utilities, and co-located MDX demos.
- `registry.json` - source registry entrypoint read directly from the public GitHub repository.

## Commands

Use pnpm only.

```bash
pnpm install
pnpm dev
pnpm style:build
pnpm registry:validate
pnpm check
```

- `pnpm dev` starts the showcase.
- `pnpm style:build` regenerates `style/globals.css` and `style/registry.json` from style source JSON files.
- `pnpm registry:validate` regenerates style files, then validates the source registry.
- `pnpm check` runs type checks, registry validation, and the showcase build.

## Git hooks

Install repo hooks once per clone:

```bash
pnpm setup:githooks
```

The hooks do this:

- `pre-commit` regenerates and stages `style/globals.css` and `style/registry.json` when staged style sources change. It refuses to mix unstaged style source changes into those files.
- `pre-push` validates the source registry and blocks the push if validation changes generated style files.

Consumers read `registry.json` and its included source registries directly through shadcn's GitHub registry support. Do not generate or commit a separate registry payload directory.

## Changelog

`CHANGELOG.md` is grouped by the day a change lands on `main`, newest first: a `## YYYY-MM-DD` heading, then one bullet per registry item, naming the item first.

```markdown
## 2026-09-11

- `button`: adds a `loading` prop that renders a spinner and disables the control.
```

Add the bullet in the same change that alters what a consumer installs or sees: item props, behavior, styling, variants, dependencies, new or removed items, or style tokens. Showcase-only, test-only, and doc-only changes get no bullet. If today's heading does not exist yet, add it above the previous one. If a registry change adds no bullet, state why before finishing.

## Add a primitive

1. Create `primitives/<name>/<name>.tsx`.
2. Create `primitives/<name>/index.ts` that exports the component file.
3. Create `primitives/<name>/registry.json`.
4. Add `primitives/<name>/registry.json` to `primitives/registry.json`.
5. Optionally create `primitives/<name>/showcase.mdx` for the routed showcase page.
6. Use registry targets like `@ui/<name>.tsx`.
7. Use full same-repository dependency addresses, for example `boramuyar/business-ui/business-style` and `boramuyar/business-ui/button`.

Primitive source should use shadcn-compatible imports:

```ts
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
```

The showcase resolves those aliases to local workspace source.

Primitive showcase pages are generated from `primitives/*/registry.json`. A co-located `primitives/<name>/showcase.mdx` file customizes `/primitives/<name>`. The MDX frontmatter supports:

```mdx
---
title: Button
description: Use buttons for actions in forms, dialogs, and toolbars.
status: stable
---
```

Supported `status` values are `draft`, `experimental`, and `stable`.

## Add a utility or hook

- Consumers get `@lib/utils.ts` from `shadcn init`; add a utility registry item only when it provides behavior beyond that standard helper.
- Hooks install through `boramuyar/business-ui/<name>` and target `@hooks/<name>.ts`.
- If a primitive uses another item, add its full GitHub address to `registryDependencies`.

## Change style

Do not edit `style/globals.css` or `style/registry.json` directly. They are generated.

Edit these source files instead:

- `style/colors.json` - light and dark semantic color values. Color theme variables such as `--color-background` and `--color-sidebar` are derived from these color names.
- `style/tokens.json` - other light and dark design tokens, such as `radius`.
- `style/theme.json` - non-derived Tailwind v4 `@theme inline` variables, such as fonts and radius scale.
- `style/css.json` - style dependencies, imports, plugins, base rules, and custom utilities.

The showcase Vite config runs a local style generator plugin. When `style/colors.json`, `style/tokens.json`, `style/theme.json`, or `style/css.json` changes during `pnpm dev`, the plugin regenerates `style/globals.css` and `style/registry.json`, then reloads the page.

When changing style:

1. Update `style/colors.json`, `style/tokens.json`, `style/theme.json`, or `style/css.json`.
2. Run `pnpm dev` to preview automatic regeneration.
3. Run `pnpm style:build` if you are not running Vite.
4. Run `pnpm registry:validate` before finishing so generated style files and the source registry are current.
