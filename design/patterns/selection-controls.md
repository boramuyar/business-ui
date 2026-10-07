# Choosing a selection control

Two questions decide which control to use:

1. **Does the change apply immediately, or when a form is submitted?**
2. **How many options are there?**

## Decision table

| Control | Use when | Don't use when |
| --- | --- | --- |
| `switch` | One on or off setting that takes effect the moment it flips. | It sits in a form with a Save button. Use `checkbox`. |
| `checkbox` | On or off inside a form that is submitted later, or picking several items from a list. | The change should apply right away. Use `switch`. |
| `toggle` | A toolbar button that holds a state: bold, pin, show grid. | The setting has a text label. Use `switch`. |
| `toggle-group` | 2 to 5 short options that switch a view or mode, applied immediately: List or Board; Day, Week or Month. Also called a segmented control or button radio group. | Options need descriptions, or the choice is submitted with a form. Use `radio-group`. |
| `radio-group` | 2 to 5 options in a form, especially when each needs a description. | There are more than 5 options. Use `select`. |
| `select` | 6 to 15 options, or space is tight. | People need to search. Use `combobox`. |
| `combobox` | More than about 15 options, or a list people know by name: customers, countries. | There are fewer than 6 options. Show them as `radio-group` or `toggle-group`. |
| `native-select` | Mobile-first forms where the platform picker is better. | Desktop forms. Use `select` for consistency. |
| `slider` | An approximate number where feel matters: volume, zoom, a price range. | The value must be exact. Use `input` with `type="number"`. |

## Quick path

```
Is it on or off?
  Applies immediately?      → switch (in a toolbar, icon-only: toggle)
  Submitted with a form?    → checkbox
Is it one choice from a set?
  2 to 5, applies now, short labels  → toggle-group
  2 to 5, in a form or needs detail  → radio-group
  6 to 15                            → select
  more, or people search             → combobox
Is it several choices from a set?
  → checkboxes in a list, or toggle-group type="multiple" in a toolbar
```

## Rules

- Every control has a visible label through `field`. Placeholder text is not a label.
- Switches confirm with a toast when the effect is not visible on screen.
- Don't use a select for yes or no. Use a switch or checkbox.
- Don't use tabs to pick a value. Tabs switch between areas of content; `toggle-group` switches a mode.
