import {
  Page,
  PageBody,
  PageHeader,
  PageSection,
  PageToolbar,
} from "@/components/shells/page"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function PageBasic() {
  return (
    <Page className="py-0 md:py-0" width="full">
      <PageHeader
        actions={
          <>
            <Button variant="outline">Export</Button>
            <Button>New report</Button>
          </>
        }
        description="Saved reports for finance and operations."
        title="Reports"
      />
      <PageToolbar end={<Button variant="ghost">Columns</Button>}>
        <Input className="max-w-xs" placeholder="Search reports..." />
      </PageToolbar>
      <PageBody>
        <PageSection
          description="Shared with everyone in the workspace."
          title="Shared reports"
        >
          <div className="rounded-md border border-dashed p-6 text-center text-muted-foreground text-xs">
            Body content goes here
          </div>
        </PageSection>
      </PageBody>
    </Page>
  )
}
