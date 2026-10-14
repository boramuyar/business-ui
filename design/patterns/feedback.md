# Feedback and states

Every screen that loads or changes data has to show what is happening. Pick by how long the state lasts and whether the user must act.

| Situation | Use | Notes |
| --- | --- | --- |
| An action finished | `sonner` toast | "Invoice sent". Add Undo when the action is reversible. |
| An action failed and can be retried | `sonner` toast with the error | Say what failed and offer Retry. |
| The page or a section is in a lasting state | `alert` | A failed sync, read-only mode, a missing setting. Pick the variant by meaning. |
| A form field is invalid | `FieldError` in `field` | Next to the field, saying how to fix it. |
| Content is loading | `skeleton` | Replicate the real layout: the same rows, columns and cards. |
| An action or step is running | `spinner` on the button or step doing the work | Disable a button while its action runs. Remove the spinner when the work stops. |
| Work with a known end | `progress` | Uploads, imports, quotas. |
| A list or area has nothing in it | `empty` | Say what will appear and offer the action that adds the first item. |
| A search or filter has no results | `empty` | Say nothing matched and offer to clear filters. |
| A destructive action needs confirming | `alert-dialog` | See [overlays](overlays.md). |

## Rules

- Don't show a toast for something the user can already see happen, such as a row appearing in the table.
- Don't stand in for content with a spinner. Content loads as a skeleton; spinners only mark work that is running right now.
- Error text says what went wrong and what to do next. No apologies, no error codes alone.
- Success needs no color fanfare. A short toast is enough.
