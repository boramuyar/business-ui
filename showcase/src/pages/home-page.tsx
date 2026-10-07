import { Button } from "@frontend/primitives/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@frontend/primitives/card"
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemTitle,
} from "@frontend/primitives/item"
import { Kbd, KbdGroup } from "@frontend/primitives/kbd"
import { ArrowRightIcon } from "lucide-react"
import { Link } from "react-router-dom"
import { CodeBlock } from "../components/code-block"
import { countPrimitivesByStatus, primitiveRoutes } from "../primitives-data"

const SPECTRUM_COLORS = [
  "primary",
  "brand",
  "info",
  "success",
  "warning",
  "destructive",
]
const SPECTRUM_ROLES = ["subtle", "border", "emphasis", "strong"]

const quickInstallCommand = `pnpm dlx shadcn@latest add boramuyar/business-ui/style`

export function HomePage() {
  const statusCounts = countPrimitivesByStatus()

  return (
    <div className="flex flex-col gap-10">
      <section className="overflow-hidden border">
        <div className="flex flex-col gap-5 p-8 lg:p-12">
          <span className="font-mono text-muted-foreground text-xs uppercase tracking-wide">
            boramuyar/business-ui · shadcn registry
          </span>
          <h1 className="max-w-2xl text-balance font-semibold text-3xl tracking-tight">
            Every interface, from one source tree.
          </h1>
          <p className="max-w-xl text-muted-foreground text-sm">
            Primitives, hooks, and a token-driven theme — previewed live
            from the exact files the registry serves.
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <Button asChild>
              <Link to="/primitives">
                Browse {primitiveRoutes.length} primitives
                <ArrowRightIcon data-icon="inline-end" />
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/installation">Installation</Link>
            </Button>
          </div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-muted-foreground text-xs">
            <span className="flex items-center gap-1.5">
              <KbdGroup>
                <Kbd>Ctrl</Kbd>
                <Kbd>K</Kbd>
              </KbdGroup>
              Search
            </span>
            <span className="flex items-center gap-1.5">
              <Kbd>D</Kbd>
              Toggle theme
            </span>
            <span className="flex items-center gap-1.5">
              <KbdGroup>
                <Kbd>Ctrl</Kbd>
                <Kbd>B</Kbd>
              </KbdGroup>
              Sidebar
            </span>
          </div>
        </div>
        <div aria-hidden className="flex h-2">
          {SPECTRUM_COLORS.flatMap((color) =>
            SPECTRUM_ROLES.map((role) => (
              <div
                className="flex-1"
                key={`${color}-${role}`}
                style={{ backgroundColor: `var(--${color}-${role})` }}
              />
            ))
          )}
        </div>
      </section>

      <ItemGroup className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        <StatItem count={primitiveRoutes.length} label="Primitives" />
        <StatItem count={statusCounts.stable} label="Stable" />
        <StatItem count={statusCounts.experimental} label="Experimental" />
        <StatItem count={statusCounts.draft} label="Draft" />
      </ItemGroup>

      <section className="flex flex-col gap-3" id="installation">
        <div className="flex flex-col gap-1">
          <h2 className="font-semibold text-xl tracking-tight">Installation</h2>
          <p className="max-w-2xl text-muted-foreground text-sm">
            shadcn reads the registry directly from GitHub. Start with the
            style, then add primitives:
          </p>
        </div>
        <CodeBlock code={quickInstallCommand} />
        <Button asChild className="w-fit" variant="outline">
          <Link to="/installation">
            Full installation guide
            <ArrowRightIcon data-icon="inline-end" />
          </Link>
        </Button>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <SummaryCard
          description="Low-level components documented with live demos, install commands, and dependency lists."
          href="/primitives"
          title="Primitives"
        />
        <SummaryCard
          description="Color roles, theme tokens, fonts, and the shared cn helper."
          href="/style"
          title="Style & Utilities"
        />
      </section>
    </div>
  )
}

function StatItem({ count, label }: { count: number; label: string }) {
  return (
    <Item variant="outline">
      <ItemContent>
        <ItemTitle className="font-mono text-xl">{count}</ItemTitle>
        <ItemDescription>{label}</ItemDescription>
      </ItemContent>
    </Item>
  )
}

function SummaryCard({
  title,
  description,
  href,
}: {
  title: string
  description: string
  href: string
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Button asChild variant="outline">
          <Link to={href}>
            Open
            <ArrowRightIcon data-icon="inline-end" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}
