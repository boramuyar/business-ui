# Choosing an overlay

Overlays are ordered from lightest to heaviest. Pick the lightest one that can hold the content.

| Overlay | Use when | Don't use when |
| --- | --- | --- |
| `tooltip` | Naming an icon-only button, showing a truncated value in full, showing a shortcut. | The content has links or controls. Use `popover`. |
| `hover-card` | Previewing a linked record, such as a person or invoice, without leaving the page. | People on touch screens need it. It never opens there. |
| `popover` | A small interactive panel tied to a control: filters, a date picker, a quick edit. | It is a list of actions. Use `dropdown-menu`. |
| `dropdown-menu` | A list of actions or links from one trigger, like a row's "more" menu. | The user is picking a value. Use `select`. |
| `context-menu` | Right-click shortcuts on rows or canvas items. | It is the only way to reach an action. Add a visible menu too. |
| `dialog` | A short, focused task that blocks the page: rename, invite, a form of up to three fields. | The form is long, or people need to see the page. Use `sheet`. |
| `alert-dialog` | Confirming something destructive or irreversible. | The action can be undone. Do it and offer Undo in a toast. |
| `sheet` | Viewing or editing a record while the list stays visible. Long forms and filter panels. | The task deserves its own URL. Use a route with `form-page` or `detail-page`. |
| `drawer` | The mobile version of a sheet or dialog. | On desktop. Use `sheet` or `dialog`. |
| `sonner` (toast) | Reporting the outcome of an action without interrupting: "Invoice sent", with Undo. | The user must act on it. Use `alert` or a dialog. |

## Rules

- One overlay at a time. Don't open a dialog from a dialog; if a task needs two steps, make it a sheet or a page.
- Dialog footers: Cancel (`variant="outline"`) first, then the primary action named for its result. One primary button.
- Alert dialogs name the action: "Delete invoice", not "OK" or "Yes".
- Prefer undo over confirmation. Archive, remove from list and mark as paid can all be undone from a toast.
- On small screens, swap `dialog` and `sheet` for `drawer` using the `use-mobile` hook.
