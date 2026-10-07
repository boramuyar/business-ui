import {
  SettingsNavItem,
  SettingsPage,
  SettingsSection,
} from "@/components/shells/settings-page"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"

export function SettingsPageWorkspace() {
  return (
    <SettingsPage
      className="py-0 md:py-0"
      description="Settings that apply to everyone in this workspace."
      nav={
        <>
          <SettingsNavItem active href="#general">
            General
          </SettingsNavItem>
          <SettingsNavItem href="#notifications">Notifications</SettingsNavItem>
          <SettingsNavItem href="#danger">Delete workspace</SettingsNavItem>
        </>
      }
      title="Workspace settings"
    >
      <SettingsSection
        description="Shown on invoices and emails."
        id="general"
        title="General"
      >
        <Field className="max-w-sm">
          <FieldLabel htmlFor="settings-name">Workspace name</FieldLabel>
          <Input defaultValue="Acme Finance" id="settings-name" />
        </Field>
        <Button className="self-start" variant="outline">
          Save name
        </Button>
      </SettingsSection>
      <SettingsSection
        description="These apply as soon as you switch them."
        id="notifications"
        title="Notifications"
      >
        <Field orientation="horizontal">
          <FieldContent>
            <FieldTitle>Overdue invoices</FieldTitle>
            <FieldDescription>
              Email the owner when an invoice is overdue.
            </FieldDescription>
          </FieldContent>
          <Switch defaultChecked />
        </Field>
        <Field orientation="horizontal">
          <FieldContent>
            <FieldTitle>Weekly summary</FieldTitle>
            <FieldDescription>
              A Monday email with last week's totals.
            </FieldDescription>
          </FieldContent>
          <Switch />
        </Field>
      </SettingsSection>
      <SettingsSection
        description="Removes all invoices, customers and members. This cannot be undone."
        id="danger"
        title="Delete workspace"
      >
        <Button className="self-start" variant="destructive">
          Delete workspace
        </Button>
      </SettingsSection>
    </SettingsPage>
  )
}
