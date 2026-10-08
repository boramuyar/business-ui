import { Button } from "@frontend/primitives/button"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemTitle,
} from "@frontend/primitives/item"
import { Page, PageBody, PageHeader, PageSection } from "@frontend/shells/page"
import { ArrowRightIcon, ChevronRightIcon } from "lucide-react"
import { Link } from "react-router-dom"
import { CodeBlock } from "../components/code-block"
import { navSections } from "../layout/site-nav"
import { primitiveRoutes, shellRoutes } from "../primitives-data"

const quickInstallCommand = `pnpm dlx shadcn@latest add boramuyar/business-ui/style`

const sectionCopy: Record<string, string> = {
  foundations:
    "Color roles, type steps and layout rules, plus the tokens behind them.",
  components: `${primitiveRoutes.length} components with usage rules, live demos and install commands.`,
  shells: `${shellRoutes.length} page layouts to start a screen from before composing your own.`,
  patterns:
    "Which dialog, toggle or feedback to pick, and the generated component catalog.",
}

export function HomePage() {
  return (
    <Page width="narrow">
      <PageHeader
        description="A shadcn registry with its own style and primitives, and the rules for using them. People read this handbook here; agents read the same rules from /llms.txt."
        title="Business UI handbook"
      />
      <PageBody>
        <PageSection
          description="shadcn reads the registry from GitHub. Add the style first, then the components you need."
          title="Install"
        >
          <CodeBlock code={quickInstallCommand} />
          <Button asChild className="w-fit" variant="outline">
            <Link to="/installation">
              Installation guide
              <ArrowRightIcon data-icon="inline-end" />
            </Link>
          </Button>
        </PageSection>

        <PageSection title="Find your way around">
          <ItemGroup>
            {navSections
              .filter((section) => sectionCopy[section.id])
              .map((section) => (
                <Item asChild key={section.id} variant="outline">
                  <Link to={section.to}>
                    <ItemContent>
                      <ItemTitle>{section.label}</ItemTitle>
                      <ItemDescription>
                        {sectionCopy[section.id]}
                      </ItemDescription>
                    </ItemContent>
                    <ItemActions>
                      <ChevronRightIcon className="size-4 text-muted-foreground" />
                    </ItemActions>
                  </Link>
                </Item>
              ))}
          </ItemGroup>
        </PageSection>
      </PageBody>
    </Page>
  )
}
