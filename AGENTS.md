# Business UI Registry

This repository is a public GitHub-hosted shadcn registry that extends shadcn/ui with its own style and primitives. It is designed for LLM agents to consume and maintain.

## Choose the right guide

- Read `USAGE.md` when installing registry items into another app.
- Read `MAINTAINER.md` when editing this repository.
- Read `DESIGN.md` when building or changing UI: which component, shell, color and type step to use.

## Essential facts

- GitHub registry address: `boramuyar/business-ui`
- Source registry entrypoint: `registry.json`
- Same-repository dependencies use full `boramuyar/business-ui/<item>` addresses.
- Page shells: `shells/`, installed to `components/shells/` in consuming apps.
- Every primitive and shell starts with a usage header; `design/components.md` is generated from them.
- Showcase app: `showcase/`
- Changelog: `CHANGELOG.md`, one dated entry per registry change (rule in `MAINTAINER.md`).

## Most common consumer command

```bash
pnpm dlx shadcn@latest add boramuyar/business-ui/<item>
```

## Most common maintainer commands

```bash
pnpm dev
pnpm registry:validate
pnpm design:check
pnpm check
```
