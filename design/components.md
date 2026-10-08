# Component catalog

Generated from the usage header at the top of each component and shell. Do not edit by hand: change the header in the source file, then run `pnpm design:build`.

Each entry says when to use the item and what to use instead. Install names match the headings: `pnpm dlx shadcn@latest add boramuyar/business-ui/<name>`.

## Shells

### detail-page

One record on its own screen: header with record actions, a main column, and an optional fixed-width aside.

- Use: An invoice, a customer, an order: anything opened from a list-page row.
- Avoid: Quick edits that keep the list in view: use sheet from the list-page instead.
- Avoid: Editing the record as a form: use form-page.
- Related: breadcrumb, tabs, card, item, badge, sheet
- Guide: [shells.md](shells.md)
- File: `components/shells/detail-page.tsx`

### form-page

A full-screen form: narrow column, fields grouped in order, actions at the end.

- Use: Creating or editing a record with more than about five fields, or with sections.
- Avoid: Three or fewer fields: use dialog.
- Avoid: Editing while the list stays visible: use sheet.
- Avoid: Settings that save as they change: use settings-page with switches.
- Related: field, input, select, radio-group, checkbox, textarea, button
- Guide: [shells.md](shells.md)
- File: `components/shells/form-page.tsx`

### list-page

A screen that shows many records of one kind: header, optional summary, toolbar, then a table or card grid.

- Use: Customers, invoices, orders, users: any screen whose job is to find and act on records.
- Avoid: One record's details: use detail-page.
- Avoid: A dashboard of numbers and charts: use overview-page.
- Related: table, empty, pagination, input-group, dropdown-menu, toggle-group
- Guide: [shells.md](shells.md)
- File: `components/shells/list-page.tsx`

### overview-page

A dashboard: header, a row of key numbers, then charts and panels.

- Use: Home screens, account health, reporting summaries.
- Avoid: Finding and acting on records: use list-page, with a small summary if needed.
- Related: card, chart, table, badge, tabs
- Guide: [shells.md](shells.md)
- File: `components/shells/overview-page.tsx`

### page

The base frame of every screen: width, padding, header, toolbar and body.

- Use: Building a screen that no archetype shell fits. Compose Page, PageHeader, PageToolbar and PageBody yourself.
- Use: Building a new shell. Start from these parts instead of a bare div.
- Avoid: A list, detail, form, settings or overview screen: use list-page, detail-page, form-page, settings-page or overview-page.
- Avoid: Sections inside a card or dialog: use field or card. Page parts are for the screen level only.
- Related: list-page, detail-page, form-page, settings-page, overview-page
- Guide: [shells.md](shells.md)
- File: `components/shells/page.tsx`

### settings-page

Grouped settings: section navigation on the left, sections of controls on the right.

- Use: Account, workspace, notification and billing settings.
- Avoid: A single form with one Save: use form-page.
- Related: switch, select, radio-group, field, separator
- Guide: [shells.md](shells.md)
- File: `components/shells/settings-page.tsx`

## Surfaces

### alert-dialog

A blocking confirmation for destructive or irreversible actions.

- Use: Confirming an action that deletes data, sends something, or cannot be undone.
- Use: Two buttons: Cancel, and the destructive action named for what it does ("Delete invoice", never "OK").
- Avoid: The action can be undone: do it and offer Undo in a toast (sonner).
- Avoid: Collecting input: use dialog.
- Avoid: Purely informational messages: use alert.
- Related: dialog, sonner, button
- Guide: [patterns/overlays.md](patterns/overlays.md)
- File: `components/ui/alert-dialog.tsx`

### context-menu

Actions for an item, opened with right click or long press.

- Use: Power-user shortcuts on rows, cards or canvas items. Every action must also be reachable another way.
- Avoid: The only way to reach an action: add a visible dropdown-menu trigger.
- Avoid: Choosing values: use select.
- Related: dropdown-menu, menubar
- Guide: [patterns/overlays.md](patterns/overlays.md)
- File: `components/ui/context-menu.tsx`

### dialog

A modal window for a short, focused task that blocks the page.

- Use: Short tasks with up to about three fields: rename, invite a member, add a note.
- Use: Footer: Cancel (outline) then the primary action named for the result.
- Avoid: Destructive confirmations: use alert-dialog.
- Avoid: Long forms, or when people need to see the page: use sheet or form-page.
- Avoid: Mobile bottom panels: use drawer.
- Avoid: Small anchored panels such as filters: use popover.
- Related: alert-dialog, sheet, drawer, popover, form-page
- Guide: [patterns/overlays.md](patterns/overlays.md)
- File: `components/ui/dialog.tsx`

### drawer

A panel that slides up from the bottom, for touch screens.

- Use: The mobile version of a dialog or sheet. Switch with use-mobile.
- Avoid: Desktop layouts: use dialog or sheet.
- Related: dialog, sheet
- Guide: [patterns/overlays.md](patterns/overlays.md)
- File: `components/ui/drawer.tsx`

### dropdown-menu

A list of actions or links opened from a button.

- Use: Secondary actions for a record (the row's more menu), account menus, "More" in a header.
- Avoid: Picking a value for a form: use select.
- Avoid: One or two actions: show them as buttons.
- Avoid: Small forms or filters: use popover.
- Related: button, context-menu, select, popover
- Guide: [patterns/overlays.md](patterns/overlays.md)
- File: `components/ui/dropdown-menu.tsx`

### hover-card

A preview of a linked record that appears on hover.

- Use: Previewing a person, customer or document from a link without leaving the page.
- Avoid: Information people need on touch screens: it never opens there.
- Avoid: Interactive content: use popover.
- Avoid: Short labels: use tooltip.
- Related: tooltip, popover, avatar
- Guide: [patterns/overlays.md](patterns/overlays.md)
- File: `components/ui/hover-card.tsx`

### popover

A small interactive panel anchored to a trigger.

- Use: Filters, a date picker, quick edits of one or two values, color or column settings.
- Avoid: Lists of actions: use dropdown-menu.
- Avoid: Read-only hints: use tooltip.
- Avoid: Tasks that need focus or several fields: use dialog.
- Related: dropdown-menu, tooltip, dialog, calendar
- Guide: [patterns/overlays.md](patterns/overlays.md)
- File: `components/ui/popover.tsx`

### sheet

A panel that slides in from the side of the screen.

- Use: Viewing or editing a record while the list stays visible.
- Use: Long forms and filters that need more room than a popover.
- Avoid: Short tasks: use dialog.
- Avoid: Confirmations: use alert-dialog.
- Avoid: Mobile: use drawer.
- Related: dialog, drawer, list-page
- Guide: [patterns/overlays.md](patterns/overlays.md)
- File: `components/ui/sheet.tsx`

### sonner

Toasts: brief, non-blocking messages about the result of an action.

- Use: Confirming what just happened: "Invoice sent". Offer Undo for reversible actions instead of asking first.
- Avoid: Errors people must fix before continuing: use alert or field errors.
- Avoid: Questions or choices: use dialog or alert-dialog.
- Avoid: Persistent page state: use alert.
- Related: alert, alert-dialog
- Guide: [patterns/feedback.md](patterns/feedback.md)
- File: `components/ui/sonner.tsx`

### tooltip

A short label that appears on hover or focus.

- Use: Naming icon-only buttons, showing a full value that is truncated, showing a shortcut with kbd.
- Avoid: Anything people must read to use the screen: put it on the page.
- Avoid: Links or controls: use popover.
- Avoid: Previews of records: use hover-card.
- Related: popover, hover-card, kbd, toggle
- Guide: [patterns/overlays.md](patterns/overlays.md)
- File: `components/ui/tooltip.tsx`

## Composites

### accordion

Stacked sections that expand one at a time to show their content.

- Use: Long, skimmable content where people need only one part at a time: FAQs, help text, grouped details.
- Avoid: Showing or hiding a single region: use collapsible.
- Avoid: Switching between views of equal weight: use tabs.
- Avoid: Primary navigation: use sidebar or navigation-menu.
- Related: collapsible, tabs
- File: `components/ui/accordion.tsx`

### breadcrumb

The path from the top of the app to the current screen.

- Use: Screens two or more levels deep, such as a record opened from a list. Put it in the PageHeader breadcrumb slot.
- Avoid: Top-level screens: the sidebar already shows where people are.
- Avoid: Steps in a process: use a stepper pattern or tabs.
- Related: sidebar, page
- Guide: [foundations/layout.md](foundations/layout.md)
- File: `components/ui/breadcrumb.tsx`

### button-group

Joins related buttons into one visual unit.

- Use: Actions that belong together: a split button (Save plus a menu of save options), pagination arrows, zoom in and out.
- Avoid: Picking one option from a set: use toggle-group.
- Avoid: Unrelated actions: space separate buttons with gap-2.
- Related: button, toggle-group, dropdown-menu
- File: `components/ui/button-group.tsx`

### card

A raised container that groups related content as one object.

- Use: Peers that sit side by side: stat cards, panels on an overview, items in a grid.
- Use: Key facts in a detail-page aside.
- Avoid: Wrapping a whole page or form: use page parts and FieldSet instead.
- Avoid: Nesting a card inside a card.
- Avoid: Rows of a list: use table or item.
- Related: item, table, overview-page
- Guide: [foundations/layout.md](foundations/layout.md)
- File: `components/ui/card.tsx`

### carousel

Horizontally scrolling slides with previous and next controls.

- Use: Browsing a small set of visual items where only one or a few fit: product images, onboarding steps.
- Avoid: Important content people must not miss: show it all in a grid.
- Avoid: Data: use table.
- Related: card, aspect-ratio
- File: `components/ui/carousel.tsx`

### chart

Recharts wrappers styled with the chart-* tokens.

- Use: Trends over time (line), comparisons between categories (bar). Use chart-1 to chart-5 in order, so a brand override recolors charts.
- Use: Give every chart a title and a short description of what it shows.
- Avoid: A single number: use a stat card.
- Avoid: Exact values people look up: use table.
- Avoid: Pie charts with more than three slices: use a bar chart.
- Related: card, overview-page, table
- Guide: [foundations/color.md](foundations/color.md)
- File: `components/ui/chart.tsx`

### collapsible

Shows or hides one region behind a trigger.

- Use: Optional detail most people don't need: advanced options, a long description, nested sidebar groups.
- Avoid: Several sections where one opens at a time: use accordion.
- Avoid: Required fields: never hide them.
- Related: accordion, sidebar
- File: `components/ui/collapsible.tsx`

### command

A searchable list of commands or destinations, usually in a dialog.

- Use: A Cmd+K palette for jumping to records or running actions.
- Use: The list inside a combobox.
- Avoid: Choosing a form value: use combobox or select.
- Avoid: Primary navigation: use sidebar.
- Related: combobox, dialog, kbd
- File: `components/ui/command.tsx`

### empty

The placeholder shown when a list or area has nothing in it yet.

- Use: An empty table, a search with no results, a new workspace. Say what will appear here and offer the action that adds the first item.
- Avoid: Errors: use alert.
- Avoid: Loading: use skeleton.
- Related: alert, skeleton, list-page
- Guide: [patterns/feedback.md](patterns/feedback.md)
- File: `components/ui/empty.tsx`

### field

Label, control, description and error laid out as one form field.

- Use: Every form control: input, select, textarea, checkbox, switch. Labels go above the control (orientation vertical) except for checkbox and switch rows.
- Use: Group related fields with FieldSet and FieldLegend.
- Avoid: Bare inputs with a placeholder instead of a label.
- Avoid: Wrapping groups of fields in cards: use FieldSet.
- Related: input, label, form-page
- File: `components/ui/field.tsx`

### input-group

An input with attached icons, text or buttons.

- Use: Search fields with an icon, amounts with a currency, URLs with a prefix, inputs with an inline action.
- Avoid: Plain text fields: use input.
- Related: input, field, button
- File: `components/ui/input-group.tsx`

### item

A row with media, title, description and actions.

- Use: Lists of people, files, integrations or settings rows where each entry has a title and a few details.
- Avoid: Data people compare across columns: use table.
- Avoid: Peers shown as tiles in a grid: use card.
- Related: table, card, avatar
- File: `components/ui/item.tsx`

### menubar

A desktop-style row of menus: File, Edit, View.

- Use: Editor-like apps with many commands grouped by menu.
- Avoid: Typical business screens: put actions in the PageHeader and a dropdown-menu.
- Avoid: Navigation between screens: use sidebar or navigation-menu.
- Related: dropdown-menu, navigation-menu
- Guide: [patterns/overlays.md](patterns/overlays.md)
- File: `components/ui/menubar.tsx`

### navigation-menu

Top-level site navigation with optional dropdown panels.

- Use: Marketing sites and public pages with a horizontal top navigation.
- Use: variant="muted" on NavigationMenuLink for text-only section tabs in a site header; the active link turns foreground.
- Avoid: App navigation between screens: use sidebar.
- Avoid: Actions: use dropdown-menu.
- Related: sidebar, menubar
- File: `components/ui/navigation-menu.tsx`

### pagination

Moves between pages of a long list.

- Use: Tables with more rows than fit, when people need to know where they are. Place it below the table, aligned right.
- Avoid: Feeds where people only scroll: load more as they reach the end.
- Avoid: Short lists: show them all.
- Related: table, list-page
- File: `components/ui/pagination.tsx`

### sidebar

The app's main navigation column.

- Use: Navigation between the main screens of an app. Group items by area; mark the current screen as active.
- Avoid: Navigation inside one screen: use tabs.
- Avoid: Settings sections: use SettingsNavItem in settings-page.
- Related: breadcrumb, tabs, settings-page
- Guide: [foundations/layout.md](foundations/layout.md)
- File: `components/ui/sidebar.tsx`

### table

Rows and columns of records.

- Use: Records people scan and compare: invoices, customers, transactions. Right-align numbers and use tabular-nums.
- Avoid: A few rich entries: use item.
- Avoid: Visual records: use a card grid.
- Avoid: Layout: never use a table to place things on a page.
- Related: list-page, pagination, item, empty
- File: `components/ui/table.tsx`

### tabs

Switches between views of the same subject.

- Use: Areas of one record or screen: Overview, Activity, Files. In a shell, pass them to the header's tabs slot.
- Avoid: Navigating between different screens: use sidebar.
- Avoid: Picking a value in a form or a view mode in a toolbar: use toggle-group.
- Avoid: Sequential steps: use a stepper pattern.
- Related: toggle-group, sidebar, detail-page
- File: `components/ui/tabs.tsx`

## Primitives

### alert

An inline message about the state of the page or a section, styled by severity.

- Use: A persistent message people must see while they work: a failed sync, a missing setting, a read-only notice.
- Use: Pick the variant by meaning: destructive for errors, warning, info, success.
- Avoid: Reporting the result of an action the user just took: use sonner (toast).
- Avoid: Asking the user to confirm something: use alert-dialog.
- Avoid: Field-level errors: use FieldError in field.
- Related: sonner, alert-dialog, field, empty
- Guide: [patterns/feedback.md](patterns/feedback.md)
- File: `components/ui/alert.tsx`

### avatar

A person's or organization's picture, with initials as fallback.

- Use: Identifying the owner, assignee or author of a record.
- Use: Always pair it with the name nearby or in a tooltip; the picture alone is not enough.
- Avoid: Status or category markers: use badge.
- Avoid: Decorative icons: use a lucide icon.
- Related: badge, item, hover-card
- File: `components/ui/avatar.tsx`

### badge

A small label for status, category or count.

- Use: Showing a record's status in a table or header. Pick the variant by meaning: success, warning, destructive, info, secondary.
- Use: Short labels only: one or two words.
- Avoid: Anything clickable that performs an action: use button.
- Avoid: Filters people toggle on and off: use toggle or toggle-group.
- Avoid: Long messages: use alert.
- Related: button, alert, table
- Guide: [foundations/color.md](foundations/color.md)
- File: `components/ui/badge.tsx`

### button

Triggers an action.

- Use: default (primary): the one main action of a screen or dialog. At most one per header, dialog or form.
- Use: outline: other actions next to the primary one. secondary: quiet actions in dense areas. ghost: toolbar and icon actions. destructive: deletes, only inside alert-dialog or a danger section. link: inline navigation in text, with size="inline" inside running text.
- Use: Label with a verb that names the result: "Create invoice", not "Submit".
- Avoid: Going to another page: use a link (or Button asChild with an anchor).
- Avoid: Holding an on or off state: use toggle.
- Avoid: Choosing one of several modes: use toggle-group.
- Related: button-group, toggle, dropdown-menu, alert-dialog
- File: `components/ui/button.tsx`

### calendar

A month grid for picking a date or a date range.

- Use: Inside a popover as a date picker, or inline when the date is the main input of a screen.
- Avoid: Dates people know by heart, such as a birth date: use input with a date format.
- Avoid: Scheduling views: build a dedicated layout.
- Related: popover, input, field
- File: `components/ui/calendar.tsx`

### checkbox

Marks one option on or off, or several items in a list.

- Use: On or off choices in a form that is submitted later ("I agree", "Send copy to me").
- Use: Selecting several items from a list or table rows.
- Avoid: A setting that applies immediately: use switch.
- Avoid: Exactly one choice from a set: use radio-group.
- Avoid: Toolbar states such as bold: use toggle.
- Related: switch, radio-group, field
- Guide: [patterns/selection-controls.md](patterns/selection-controls.md)
- File: `components/ui/checkbox.tsx`

### combobox

A searchable select: type to filter, then pick a value.

- Use: More than about 15 options, or options people know by name: customers, countries, accounts.
- Avoid: Fewer than 6 options: use radio-group or toggle-group.
- Avoid: 6 to 15 options people scan rather than search: use select.
- Avoid: Running commands: use command.
- Related: select, command, field
- Guide: [patterns/selection-controls.md](patterns/selection-controls.md)
- File: `components/ui/combobox.tsx`

### input

A single-line text field.

- Use: Short free text: names, emails, amounts, search. Always inside a field with a label, except a toolbar search.
- Avoid: Multi-line text: use textarea.
- Avoid: Choosing from known values: use select or combobox.
- Avoid: Icons, prefixes or buttons inside the field: use input-group.
- Related: field, input-group, textarea
- File: `components/ui/input.tsx`

### input-otp

Separate boxes for one-time codes.

- Use: Verification codes sent by email or SMS.
- Avoid: Passwords or any other text: use input.
- Related: input, field
- File: `components/ui/input-otp.tsx`

### kbd

Shows a keyboard key or shortcut.

- Use: Next to the action a shortcut triggers, in menus, tooltips and the command palette.
- Avoid: Code or values: use font-mono text.
- Related: command, tooltip, dropdown-menu
- File: `components/ui/kbd.tsx`

### label

The text label for a form control.

- Use: Inside field (FieldLabel builds on it). Every control needs one, linked with htmlFor.
- Avoid: Section headings: use FieldLegend or PageSection.
- Related: field
- File: `components/ui/label.tsx`

### native-select

The browser's own select element, styled.

- Use: Mobile-first forms, or very long simple lists where native scrolling and accessibility matter most.
- Avoid: Most desktop forms: use select for consistency.
- Avoid: Searchable lists: use combobox.
- Related: select, combobox
- Guide: [patterns/selection-controls.md](patterns/selection-controls.md)
- File: `components/ui/native-select.tsx`

### progress

A bar showing how far a task or quota has come.

- Use: Uploads, imports and multi-step work with a known end; quota usage.
- Avoid: Unknown duration: use spinner or skeleton.
- Related: spinner, skeleton
- Guide: [patterns/feedback.md](patterns/feedback.md)
- File: `components/ui/progress.tsx`

### radio-group

Picks exactly one option from a small set, shown all at once.

- Use: 2 to 5 options in a form that is submitted later, especially when each option needs a description (plans, billing periods).
- Avoid: Applied immediately, short labels: use toggle-group.
- Avoid: More than 5 options: use select.
- Avoid: On or off: use checkbox or switch.
- Related: toggle-group, select, checkbox, field
- Guide: [patterns/selection-controls.md](patterns/selection-controls.md)
- File: `components/ui/radio-group.tsx`

### select

Picks one value from a list in a dropdown.

- Use: 6 to 15 options, or when space is tight. Always inside a field with a label.
- Avoid: Fewer than 6 options: use radio-group or toggle-group.
- Avoid: More than about 15 options, or people know the name: use combobox.
- Avoid: A list of actions: use dropdown-menu.
- Related: combobox, radio-group, native-select, field
- Guide: [patterns/selection-controls.md](patterns/selection-controls.md)
- File: `components/ui/select.tsx`

### skeleton

Placeholder shapes shown while content loads.

- Use: Loading content whose layout is known: table rows, cards, a detail page. Match the shape of the real content.
- Avoid: Actions in progress: use spinner in the button.
- Avoid: Nothing to show: use empty.
- Related: spinner, empty, progress
- Guide: [patterns/feedback.md](patterns/feedback.md)
- File: `components/ui/skeleton.tsx`

### slider

Picks a number or range by dragging.

- Use: Approximate values where feel matters more than precision: volume, zoom, a price range filter.
- Avoid: Exact numbers: use input with type number.
- Avoid: A few fixed steps: use toggle-group or radio-group.
- Related: input, toggle-group
- Guide: [patterns/selection-controls.md](patterns/selection-controls.md)
- File: `components/ui/slider.tsx`

### spinner

An animated indicator for work of unknown length.

- Use: Inside a button while its action runs, or a small area that is refreshing.
- Avoid: Loading a whole page or list: use skeleton.
- Avoid: Work with a known end: use progress.
- Related: skeleton, progress, button
- Guide: [patterns/feedback.md](patterns/feedback.md)
- File: `components/ui/spinner.tsx`

### switch

Turns one setting on or off, effective immediately.

- Use: A setting that applies the moment it flips: notifications, auto-renew, a feature toggle. Confirm with a toast if the effect is not visible.
- Avoid: Inside a form with a Save button: use checkbox.
- Avoid: Choosing between named modes: use toggle-group.
- Avoid: Toolbar states such as bold: use toggle.
- Related: checkbox, toggle, toggle-group, settings-page
- Guide: [patterns/selection-controls.md](patterns/selection-controls.md)
- File: `components/ui/switch.tsx`

### textarea

A multi-line text field.

- Use: Notes, descriptions, messages: anything that may run past one line. Always inside a field with a label.
- Avoid: Single-line values: use input.
- Related: input, field
- File: `components/ui/textarea.tsx`

### toggle

A button that holds an on or off state.

- Use: Toolbar states: bold, pin, show grid, mute. Usually icon-only with a tooltip.
- Avoid: Settings with a text label: use switch.
- Avoid: One of several options: use toggle-group.
- Avoid: Actions without state: use button.
- Related: toggle-group, switch, button, tooltip
- Guide: [patterns/selection-controls.md](patterns/selection-controls.md)
- File: `components/ui/toggle.tsx`

### toggle-group

A row of buttons where one (or several) can be active; also called a segmented control or button radio group.

- Use: 2 to 5 short options that switch a view or mode and apply immediately: List or Board, Day, Week or Month.
- Use: type="multiple" for toolbar formatting groups.
- Avoid: Options need descriptions, or the choice is submitted with a form: use radio-group.
- Avoid: More than 5 options: use select.
- Avoid: Switching between areas of content: use tabs.
- Related: radio-group, tabs, toggle, select
- Guide: [patterns/selection-controls.md](patterns/selection-controls.md)
- File: `components/ui/toggle-group.tsx`

## Layout

### aspect-ratio

Keeps media at a fixed width-to-height ratio as it resizes.

- Use: Images, video, maps and previews that must not distort or jump while loading.
- Avoid: Text containers: let content set the height.
- Related: card, skeleton
- File: `components/ui/aspect-ratio.tsx`

### resizable

Panels people can resize by dragging a handle.

- Use: Split views where people adjust space: a list beside a record, an editor beside a preview.
- Avoid: Fixed page layouts: use the shells.
- Avoid: Mobile: stack the panels instead.
- Related: detail-page, scroll-area
- Guide: [foundations/layout.md](foundations/layout.md)
- File: `components/ui/resizable.tsx`

### scroll-area

A scroll container with styled scrollbars.

- Use: Fixed-height regions inside a page: a long menu, a side panel, a code block.
- Avoid: The page itself: let the window scroll.
- Related: resizable, sidebar
- File: `components/ui/scroll-area.tsx`

### separator

A thin line between groups.

- Use: Separating groups inside menus, toolbars and dense panels where spacing alone is not enough.
- Avoid: Between page sections: use spacing (PageSection and PageBody gaps).
- Avoid: Between form groups: use FieldSet or FieldSeparator.
- Related: field, page
- Guide: [foundations/layout.md](foundations/layout.md)
- File: `components/ui/separator.tsx`
