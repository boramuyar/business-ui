import { Button } from "@frontend/primitives/button"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemTitle,
} from "@frontend/primitives/item"
import { ArrowRightIcon, ChevronRightIcon } from "lucide-react"
import { Link } from "react-router-dom"
import { CodeBlock } from "../components/code-block"
import { PageHeader } from "../components/page-header"
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
    <div className="max-w-4xl">
      <PageHeader
        description="A shadcn registry with its own style and primitives, and the rules for using them. People read this handbook here; agents read the same rules from /llms.txt."
        eyebrow="Get started"
        title="Business UI handbook"
      />
      <div className="flex flex-col gap-12">
        <section className="flex flex-col gap-3">
          <h2 className="font-semibold text-lg tracking-tight">Install</h2>
          <p className="max-w-2xl text-muted-foreground text-sm">
            shadcn reads the registry from GitHub. Add the style first, then the
            components you need.
          </p>
          <CodeBlock code={quickInstallCommand} />
          <Button asChild className="w-fit" variant="outline">
            <Link to="/installation">
              Installation guide
              <ArrowRightIcon data-icon="inline-end" />
            </Link>
          </Button>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="font-semibold text-lg tracking-tight">
            Find your way around
          </h2>
          <ItemGroup className="grid gap-3 sm:grid-cols-2">
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
        </section>
      </div>
    </div>
  )
}
