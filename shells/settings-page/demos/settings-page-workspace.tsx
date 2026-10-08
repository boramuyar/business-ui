import {
  SettingsNavItem,
  SettingsPage,
  SettingsSection,
} from "@/components/shells/settings-page"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"

export function SettingsPageWorkspace() {
  return (
    <SettingsPage
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
            <FieldLabel htmlFor="settings-overdue">Overdue invoices</FieldLabel>
            <FieldDescription>
              Email the owner when an invoice is overdue.
            </FieldDescription>
          </FieldContent>
          <Switch defaultChecked id="settings-overdue" />
        </Field>
        <Field orientation="horizontal">
          <FieldContent>
            <FieldLabel htmlFor="settings-weekly">Weekly summary</FieldLabel>
            <FieldDescription>
              A Monday email with last week's totals.
            </FieldDescription>
          </FieldContent>
          <Switch id="settings-weekly" />
        </Field>
      </SettingsSection>
      <SettingsSection
        description="Removes all invoices, customers and members. This cannot be undone."
        id="danger"
        title="Delete workspace"
      >
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button className="self-start" variant="destructive">
              Delete workspace
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete this workspace?</AlertDialogTitle>
              <AlertDialogDescription>
                All invoices, customers and members are removed. This cannot be
                undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction variant="destructive">
                Delete workspace
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </SettingsSection>
    </SettingsPage>
  )
}
