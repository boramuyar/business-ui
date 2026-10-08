import { Badge } from "@frontend/primitives/badge"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemTitle,
} from "@frontend/primitives/item"
import { Kbd } from "@frontend/primitives/kbd"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@frontend/primitives/table"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@frontend/primitives/tabs"
import { Page, PageHeader } from "@frontend/shells/page"
import { Fragment } from "react"
import colors from "../../../style/colors.json"
import theme from "../../../style/theme.json"
import tokens from "../../../style/tokens.json"

const ROLE_COLORS = [
  "primary",
  "brand",
  "destructive",
  "success",
  "warning",
  "info",
] as const
const COLOR_ROLES = ["subtle", "border", "strong", "emphasis"] as const

const roleGuide = [
  {
    role: "subtle",
    purpose: "Tinted surface behind selected, checked, and active states.",
    example: "bg-primary-subtle",
  },
  {
    role: "border",
    purpose: "Border that pairs with a subtle surface.",
    example: "border-info-border",
  },
  {
    role: "strong",
    purpose:
      "Color pushed toward the foreground — solid hover states and checked controls.",
    example: "hover:bg-primary-strong",
  },
  {
    role: "emphasis",
    purpose: "Readable colored text that adapts per theme.",
    example: "text-success-emphasis",
  },
]

const roleTokenNames = new Set(
  ROLE_COLORS.flatMap((color) => COLOR_ROLES.map((role) => `${color}-${role}`))
)
const baseColorNames = Object.keys(colors.light).filter(
  (name) => !roleTokenNames.has(name)
)
const lightTokens: Record<string, string> = tokens.light
const darkTokens: Record<string, string> = tokens.dark
const themeTokens: Record<string, string> = theme

export function StylePage() {
  return (
    <Page>
      <PageHeader
        title="Style & utilities"
        description="Theme colors, color role tokens, design tokens, and the shared cn helper."
      />

      <Tabs defaultValue="colors">
        <TabsList>
          <TabsTrigger value="colors">Colors</TabsTrigger>
          <TabsTrigger value="roles">Color roles</TabsTrigger>
          <TabsTrigger value="tokens">Tokens</TabsTrigger>
          <TabsTrigger value="utilities">Utilities</TabsTrigger>
        </TabsList>

        <TabsContent className="pt-6" value="colors">
          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {baseColorNames.map((colorName) => (
              <div className="grid gap-1" key={colorName}>
                <Swatch className="h-14" name={colorName} />
                <span className="font-mono text-muted-foreground text-xs">
                  {colorName}
                </span>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent className="flex flex-col gap-6 pt-6" value="roles">
          <p className="max-w-3xl text-muted-foreground text-sm">
            Each semantic color ships four role tokens with stable, theme-tuned
            levels mixed from the base color. Components never hand-tune
            opacities — they pick a role, and the light/dark values live inside
            the token. Press <Kbd>D</Kbd> and watch the swatches adapt.
          </p>

          <ItemGroup>
            {roleGuide.map((entry) => (
              <Item key={entry.role} variant="outline">
                <ItemContent>
                  <ItemTitle className="font-mono">*-{entry.role}</ItemTitle>
                  <ItemDescription>{entry.purpose}</ItemDescription>
                </ItemContent>
                <ItemActions>
                  <code className="rounded-sm bg-muted px-1 py-0.5 font-mono text-xs">
                    {entry.example}
                  </code>
                </ItemActions>
              </Item>
            ))}
          </ItemGroup>

          <div className="grid grid-cols-[5.5rem_repeat(5,minmax(0,1fr))] gap-1">
            <span />
            {["base", ...COLOR_ROLES].map((label) => (
              <span
                className="font-mono text-muted-foreground text-xs"
                key={label}
              >
                {label}
              </span>
            ))}
            {ROLE_COLORS.map((color) => (
              <Fragment key={color}>
                <span className="self-center font-mono text-muted-foreground text-xs">
                  {color}
                </span>
                <Swatch name={color} />
                {COLOR_ROLES.map((role) => (
                  <Swatch key={role} name={`${color}-${role}`} />
                ))}
              </Fragment>
            ))}
          </div>

          <div className="flex flex-col gap-2">
            <span className="font-medium text-sm">
              Composed: subtle + border + strong
            </span>
            <div className="flex flex-wrap gap-2">
              <Badge>Primary</Badge>
              <Badge variant="destructive">Destructive</Badge>
              <Badge variant="success">Success</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="info">Info</Badge>
            </div>
          </div>
        </TabsContent>

        <TabsContent className="flex flex-col gap-6 pt-6" value="tokens">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Token</TableHead>
                <TableHead>Light</TableHead>
                <TableHead>Dark</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Object.keys(lightTokens).map((tokenName) => (
                <TableRow key={tokenName}>
                  <TableCell className="font-mono text-xs">
                    --{tokenName}
                  </TableCell>
                  <TableCell className="font-mono text-xs">
                    {lightTokens[tokenName]}
                  </TableCell>
                  <TableCell className="font-mono text-xs">
                    {darkTokens[tokenName] ?? "—"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Theme token</TableHead>
                <TableHead>Value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Object.entries(themeTokens).map(([tokenName, value]) => (
                <TableRow key={tokenName}>
                  <TableCell className="font-mono text-xs">
                    --{tokenName}
                  </TableCell>
                  <TableCell className="font-mono text-xs">{value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>

        <TabsContent className="flex flex-col gap-6 pt-6" value="utilities">
          <div className="flex flex-col gap-2">
            <span className="font-medium font-mono text-sm">.small-caps</span>
            <p className="max-w-3xl text-muted-foreground text-sm">
              Renders text in all small caps via `font-variant`.
            </p>
            <p className="small-caps text-sm">Quarterly Portfolio Review</p>
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-medium font-mono text-sm">cn()</span>
            <p className="max-w-3xl text-muted-foreground text-sm">
              The shared `cn` helper created by `shadcn init` composes `clsx`
              with `tailwind-merge`: `cn("p-2", condition && "bg-muted")`.
              Registry color tokens — including the role tokens — merge
              correctly with tailwind-merge defaults, no custom configuration
              required.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </Page>
  )
}

function Swatch({
  name,
  className = "h-10",
}: {
  name: string
  className?: string
}) {
  return (
    <div
      className={`${className} rounded-md ring-1 ring-border ring-inset`}
      style={{ backgroundColor: `var(--${name})` }}
      title={`--${name}`}
    />
  )
}
