# Shells

A shell is a page-level layout: where the title, actions, filters and content of a screen go. Shells install into `components/shells/` and build on the base `page` shell.

Reuse a shell before composing a screen yourself. A consistent frame is what makes separate screens feel like one product; the body of the shell is where each screen gets its own design.

## Starter shells

| Shell | Use for | Install |
| --- | --- | --- |
| `page` | The base frame: `Page`, `PageHeader`, `PageToolbar`, `PageBody`, `PageSection`. Compose it yourself when no archetype fits. | `boramuyar/business-ui/page` |
| `list-page` | Finding and acting on many records: customers, invoices, orders. | `boramuyar/business-ui/list-page` |
| `detail-page` | One record, with a main column and an aside for key facts. | `boramuyar/business-ui/detail-page` |
| `form-page` | Creating or editing a record with more than about five fields. | `boramuyar/business-ui/form-page` |
| `settings-page` | Grouped settings with section navigation. | `boramuyar/business-ui/settings-page` |
| `overview-page` | Dashboards: key numbers, then charts and panels. | `boramuyar/business-ui/overview-page` |

Each shell's header comment lists its slots and rules. The [component catalog](components.md#shells) collects them.

## Rules every shell keeps

- One `PageHeader` per screen. Its title is the only `h1`.
- Actions sit to the right of the title. At most one primary button; others are `outline` or live in a `dropdown-menu`.
- Search, filters and view switches go in the toolbar, never in the header.
- Width is `narrow`, `default` or `full`.

## Adding a shell

Climb these steps and stop at the first that works:

1. Use an existing shell as it is.
2. Use its slots and props differently.
3. Compose `Page` parts and components inside a screen.
4. Create a new shell.

A new shell goes in `components/shells/<name>.tsx`, builds on `page`, and starts with a header the design check verifies:

```tsx
/**
 * @shell RecordInbox
 * @level shell
 * @summary A persistent list of records beside the selected record.
 * @closest detail-page
 * @why Needs a keyboard-navigable list next to the record. detail-page has no list region and list-page has no record pane.
 * @reuses Page, PageHeader, Resizable, Item, ScrollArea
 * @use Support queues, approval inboxes, review flows.
 * @avoid Browsing records without a selected one: use list-page.
 */
```

- `@closest` names the existing shell you compared against.
- `@why` says what that shell can't do. "Looks nicer" is not a reason.
- `@reuses` lists the shell parts and components it is built from.
- `@use` and `@avoid` tell the next agent when to pick it.

If a new shell would help other apps too, propose it for the registry.
