import { Button } from "@frontend/primitives/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@frontend/primitives/table"
import { Page, PageBody, PageHeader, PageSection } from "@frontend/shells/page"
import { ClipboardCopyIcon } from "lucide-react"
import usageMarkdown from "../../../USAGE.md?raw"
import { CodeBlock } from "../components/code-block"
import { copyText } from "../lib/copy-text"

const installCommand = `pnpm dlx shadcn@latest add boramuyar/business-ui/<item>`

const exampleCommands = `pnpm dlx shadcn@latest add boramuyar/business-ui/style
pnpm dlx shadcn@latest add boramuyar/business-ui/button`

const namespaceConfig = `{
  "registries": {
    "@business-ui": "https://ui.uyar.design/r/{name}.json"
  }
}`

const namespaceCommand = `pnpm dlx shadcn@latest add @business-ui/style @business-ui/button`

const previewCommand = `pnpm dlx shadcn@latest view boramuyar/business-ui/button`

const commonItems = [
  {
    name: "boramuyar/business-ui/style",
    description: "Theme, tokens, fonts, base styles, and custom utilities.",
  },
  {
    name: "boramuyar/business-ui/button",
    description: "Button primitive.",
  },
  {
    name: "boramuyar/business-ui/use-mobile",
    description: "Mobile viewport hook used by sidebar.",
  },
]

export function InstallationPage() {
  return (
    <Page width="narrow">
      <PageHeader
        actions={
          <Button onClick={() => copyText(usageMarkdown)} variant="outline">
            <ClipboardCopyIcon data-icon="inline-start" />
            Copy as Markdown
          </Button>
        }
        description="Install items straight from GitHub with the shadcn CLI."
        title="Installation"
      />

      <PageBody>
        <PageSection
          description="Address the GitHub repository directly. No auth or registry namespace is needed."
          title="1. Install items"
        >
          <CodeBlock code={installCommand} />
          <span className="text-muted-foreground text-xs">Examples</span>
          <CodeBlock code={exampleCommands} />
        </PageSection>

        <PageSection
          description="Optional: add the @business-ui namespace to components.json once for shorter addresses. Both forms install the same files."
          title="2. Shorter addresses"
        >
          <CodeBlock code={namespaceConfig} />
          <CodeBlock code={namespaceCommand} />
        </PageSection>

        <PageSection
          description="Install the style item before any primitives when setting up a new app. It ships the theme every component depends on."
          title="3. Common items"
        >
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item</TableHead>
                <TableHead>Contents</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {commonItems.map((item) => (
                <TableRow key={item.name}>
                  <TableCell className="font-mono text-xs">
                    {item.name}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {item.description}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </PageSection>

        <PageSection
          description="Use the full GitHub or @business-ui address. Bare names such as button refer to the public shadcn registry. Preview any item before installing:"
          title="4. Notes"
        >
          <CodeBlock code={previewCommand} />
        </PageSection>
      </PageBody>
    </Page>
  )
}
