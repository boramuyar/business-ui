import {
  Page,
  PageBody,
  PageHeader,
  PageSection,
  PageToolbar,
} from "@/components/shells/page"
import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty"
import { Input } from "@/components/ui/input"

export function PageBasic() {
  return (
    <Page width="full">
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
          <Empty className="border">
            <EmptyHeader>
              <EmptyTitle>No shared reports yet</EmptyTitle>
              <EmptyDescription>
                Reports you share with the workspace appear here.
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <Button size="sm" variant="outline">
                Share a report
              </Button>
            </EmptyContent>
          </Empty>
        </PageSection>
      </PageBody>
    </Page>
  )
}
