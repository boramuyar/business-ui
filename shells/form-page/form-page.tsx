/**
 * @shell FormPage
 * @level shell
 * @summary A full-screen form: narrow column, fields grouped in order, actions at the end.
 * @closest page
 * @why Long forms read best in one narrow column with the submit action where the eye ends up. Putting Save in the header splits attention.
 * @reuses Page, PageHeader, PageBody, FieldGroup
 * @use Creating or editing a record with more than about five fields, or with sections.
 * @avoid Three or fewer fields: use dialog.
 * @avoid Editing while the list stays visible: use sheet.
 * @avoid Settings that save as they change: use settings-page with switches.
 * @related field, input, select, radio-group, checkbox, textarea, button
 * @guide design/shells.md
 *
 * Rules:
 * - One column. Labels above inputs (field), never beside them.
 * - Group related fields with FieldSet and FieldLegend instead of cards.
 * - actions: Cancel (variant="outline") then the submit button named for the result ("Create invoice", not "Submit").
 */
import type * as React from "react"
import { Page, PageBody, PageHeader } from "@/components/shells/page"
import { FieldGroup } from "@/components/ui/field"

function FormPage({
  title,
  description,
  breadcrumb,
  actions,
  className,
  children,
  ...props
}: Omit<React.ComponentProps<"form">, "title"> & {
  title: React.ReactNode
  description?: React.ReactNode
  breadcrumb?: React.ReactNode
  /** Footer buttons: Cancel, then the submit button. */
  actions: React.ReactNode
}) {
  return (
    <Page className={className} data-shell="form-page" width="narrow">
      <PageHeader
        breadcrumb={breadcrumb}
        description={description}
        title={title}
      />
      <PageBody>
        <form className="flex flex-col gap-6" {...props}>
          <FieldGroup>{children}</FieldGroup>
          <div
            data-slot="form-page-actions"
            className="flex flex-wrap items-center justify-end gap-2 border-t pt-4"
          >
            {actions}
          </div>
        </form>
      </PageBody>
    </Page>
  )
}

export { FormPage }
