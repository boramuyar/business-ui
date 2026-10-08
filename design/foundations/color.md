# Color

Pick a color by what it means, never by how it looks. The theme only contains role tokens: Tailwind's built-in palette (`blue-500`, `white`, `black` and the rest) is removed, so those classes render nothing and the design check flags them.

## Which token

| Meaning | Classes | Notes |
| --- | --- | --- |
| Page and text | `bg-background`, `text-foreground` | The default. Most UI needs nothing else. |
| Quiet text and fills | `text-muted-foreground`, `bg-muted` | Descriptions, placeholders, secondary values, empty areas. |
| Raised surfaces | `bg-card`, `bg-popover` | Cards and overlays set these themselves. |
| Main action | `bg-primary`, `text-primary-foreground` | The primary button and default badge. Near black in light mode. |
| State and accent | `bg-brand`, `bg-brand-subtle`, `border-brand-border`, `text-brand-emphasis` | Checked, selected, active, progress, focus, links. Never for actions. |
| Hover fill | `bg-accent`, `text-accent-foreground` | Gray hover on menu items and ghost buttons. Not the brand accent. |
| Error, destructive | `destructive` family | Errors, failed states, delete buttons. |
| Success | `success` family | Paid, done, healthy. |
| Warning | `warning` family | Needs attention soon: overdue, expiring, near a limit. |
| Info | `info` family | Neutral notices and in-progress states: sent, processing. |
| Lines | `border-border`, `border-input` | Dividers and control outlines. |
| Focus | `ring-ring` | Follows `brand`. Components set it already. |
| Overlay backdrop | `bg-scrim` | Behind dialogs, sheets and drawers. |
| Charts | `chart-1` to `chart-5` | Computed from `brand`. Use them in order. |

The status families (`destructive`, `success`, `warning`, `info`, plus `primary` and `brand`) each have the same steps:

- `bg-<role>`: solid fill, for small marks such as dots and progress.
- `bg-<role>-subtle`: tinted background, for badges, alerts and selected rows.
- `border-<role>-border`: outline on a subtle fill.
- `text-<role>-strong`: readable text on a subtle fill.
- `text-<role>-emphasis`: the role color as text, such as links and error messages.

## Rules

- Status always has a label. A colored dot or row tint alone is not enough; pair it with text such as a badge.
- Use one status color per element. A badge is either warning or destructive, never both.
- Don't use `brand` to make something look important. Importance comes from position, size and the primary button.
- Don't recreate a token with an arbitrary value. If you need a shade that doesn't exist, mix existing tokens: `bg-[color-mix(in_oklch,var(--brand),var(--background)_80%)]`. If you need it often, it belongs in the theme.
- Never set colors through `style={{ color }}`. Use classes, or `var(--token)` if a style prop is unavoidable.

## Dark mode

Every token has a dark value, so tokens alone usually look right in both themes. When something still looks wrong in dark mode, fix the token in your app: override it under `.dark` in your `globals.css`. Use a `dark:` class only for a one-off fix on a single element. If the same fix keeps coming back, open an issue at https://github.com/boramuyar/business-ui so the token can change for everyone.
