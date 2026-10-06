import { Button } from "@frontend/primitives/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@frontend/primitives/table"
import { ClipboardCopyIcon } from "lucide-react"
import type { ReactNode } from "react"
import usageMarkdown from "../../../USAGE.md?raw"
import { CodeBlock } from "../components/code-block"
import { PageHeader } from "../components/page-header"
import { copyText } from "../lib/copy-text"

const installCommand = `pnpm dlx shadcn@latest add boramuyar/business-ui/<item>`

const exampleCommands = `pnpm dlx shadcn@latest add boramuyar/business-ui/style
pnpm dlx shadcn@latest add boramuyar/business-ui/button`

const namespaceConfig = `{
  "registries": {
    "@business-ui": "https://boramuyar.github.io/business-ui/r/{name}.json"
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
    <div>
      <div className="flex items-start justify-between gap-4">
        <PageHeader
          eyebrow="Guide"
          title="Installation"
          description="Consume the registry directly from GitHub with the shadcn CLI."
        />
        <Button
          className="mt-1 shrink-0"
          onClick={() => copyText(usageMarkdown)}
          variant="outline"
        >
          <ClipboardCopyIcon data-icon="inline-start" />
          Copy as Markdown
        </Button>
      </div>

      <div className="flex flex-col gap-4">
        <GuideSection
          description="Address the GitHub repository directly. No auth or registry namespace is needed."
          step="01"
          title="Install items"
        >
          <CodeBlock code={installCommand} />
          <span className="text-muted-foreground text-xs">Examples</span>
          <CodeBlock code={exampleCommands} />
        </GuideSection>

        <GuideSection
          description="Optional: add the @business-ui namespace to components.json once for shorter addresses. Both forms install the same files."
          step="02"
          title="Shorter addresses"
        >
          <CodeBlock code={namespaceConfig} />
          <CodeBlock code={namespaceCommand} />
        </GuideSection>

        <GuideSection
          description="Install the style item before any primitives when setting up a new app — it ships the theme every component depends on."
          step="03"
          title="Common items"
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
        </GuideSection>

        <GuideSection
          description="Use the full GitHub or @business-ui address — bare names such as button refer to the public shadcn registry. Preview any item before installing:"
          step="04"
          title="Notes"
        >
          <CodeBlock code={previewCommand} />
        </GuideSection>
      </div>
    </div>
  )
}

function GuideSection({
  step,
  title,
  description,
  children,
}: {
  step: string
  title: string
  description: string
  children: ReactNode
}) {
  return (
    <section className="grid gap-x-5 gap-y-3 border p-5 sm:grid-cols-[auto_1fr]">
      <span className="font-mono text-primary-emphasis text-sm">{step}</span>
      <div className="flex max-w-3xl flex-col gap-3">
        <div className="flex flex-col gap-1">
          <h2 className="font-medium text-sm">{title}</h2>
          <p className="text-muted-foreground text-sm">{description}</p>
        </div>
        {children}
      </div>
    </section>
  )
}
