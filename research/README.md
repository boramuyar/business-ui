# Primitives research

Research only, no code. Each folder holds one primitive's findings on how it should behave: states, keyboard and pointer interaction, accessibility, API shape, and pitfalls seen in other libraries.

## Why these seven

We start with the smallest set that can build a real business screen: a form inside a dialog, laid out cleanly, with a submit action.

| Primitive | Why it is in the first set |
| --- | --- |
| [Button](./button/README.md) | Every action. Also the first place distinct hover/active/subtle tokens show up. |
| [Input](./input/README.md) | Text entry, with adornments (icons, units, clear) instead of a bare `<input>`. |
| [Field](./field/README.md) | Label, hint, error and grouping for any control. This is the "full field system". |
| [Checkbox](./checkbox/README.md) | Booleans and multi-select, including indeterminate for table row selection. |
| [Select](./select/README.md) | Picking one value from a list. Sets the line between Select and Combobox. |
| [Dialog](./dialog/README.md) | Modal forms and destructive confirmations. Owns focus trap and scroll lock. |
| [Stack](./stack/README.md) | The core layout helper, with notes on Grid, Container and Inline. |

## Deliberately left for later

Radio group, Switch, Textarea (covered as an Input sibling), Combobox, Tooltip, Popover, Menu, Tabs, Table, Toast. Most of them reuse behavior researched here (Field wiring, popup positioning from Select, focus management from Dialog).

## Shared assumptions

- Tailwind + clsx + CSS variables, one npm package per component, no lock-in.
- Base UI as the likely headless behavior layer.
- Audience is business and product apps: dense forms, dashboards, admin tools.

## How each file is organised

Purpose, anatomy, variants, states, behavior, accessibility, API shape (compared across libraries), pitfalls, open questions, sources.

## Cross-cutting decisions the research surfaced

These came up in more than one file and should be settled once, before any component is built.

- **Control heights.** Button proposes xs/sm/md/lg at 24/32/36/40px; Input proposes sm/md/lg at 28/32/36-40px. Button, Input and Select should read one shared `--control-h-*` scale.
- **State tokens.** Every interactive primitive asks for separate default, hover, pressed and subtle tokens per tone (Button, Checkbox, Select options), and field-like controls want their own `--field-*` border steps that reach 3:1 contrast.
- **Read-only is not disabled.** Input, Field and Checkbox all recommend read-only as its own state: focusable, normal contrast, still submitted.
- **Composition style.** Base UI's `render` prop vs Radix-style `asChild`. Button and Stack both need this answered the same way.
- **Base UI as a peer dependency** in every package, so the shared layer is never duplicated (Dialog notes Radix bugs caused by duplicate copies).
- **Field owns labels and errors.** Input, Checkbox and Select take label, invalid, required, disabled and size from Field context rather than their own props.
