# Typography

Business UI is dense: most interface text is `text-xs` (12px). Larger steps are for titles and numbers. The theme stops at `text-3xl`, keeps three weights, and has two families. Anything else renders nothing or is flagged by the design check.

## The scale

| Class | Size | Use for |
| --- | --- | --- |
| `text-xs` | 12px | Default for controls, tables, menus, descriptions, labels. |
| `text-sm` | 14px | Page descriptions, section titles, reading text in panels. |
| `text-base` | 16px | Longer reading text such as help articles. Rare in app screens. |
| `text-lg` | 18px | Dialog and sheet titles when the component doesn't set them. |
| `text-xl` | 20px | Page titles. `PageHeader` sets this. |
| `text-2xl` | 24px | Numbers in stat cards. |
| `text-3xl` | 30px | One hero number per screen at most. |

Weights:

- `font-normal` for body text.
- `font-medium` for labels, table headers, active navigation and emphasis inside text.
- `font-semibold` for titles and headline numbers.

Families:

- `font-sans` (Inter) for everything.
- `font-mono` (JetBrains Mono) for codes, IDs, keys and values people copy.

## Rules

- Headings come from components: `PageHeader` renders the only `h1`, `PageSection` renders `h2`. Don't style a `div` to look like a heading.
- Numbers that line up in columns use `tabular-nums`. Right-align numeric table columns.
- Use sentence case. Don't use uppercase for emphasis; small labels may use `uppercase` with `tracking-wide`, sparingly.
- Don't make text bigger to make it important. Use position, weight and the primary button.
- No arbitrary sizes such as `text-[13px]`.
