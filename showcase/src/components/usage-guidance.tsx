import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@frontend/primitives/card"
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@frontend/primitives/item"
import { PageSection } from "@frontend/shells/page"
import { CheckIcon, XIcon } from "lucide-react"
import { Link } from "react-router-dom"
import {
  getPrimitiveRoute,
  getShellRoute,
  type UsageHeader,
} from "../primitives-data"

/** "Use when" and "Avoid" from the component's usage header, shown before the demos. */
export function UsageGuidance({ usage }: { usage: UsageHeader }) {
  if (!usage.use.length && !usage.avoid.length) {
    return null
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <GuidanceCard items={usage.use} tone="use" />
      <GuidanceCard items={usage.avoid} tone="avoid" />
    </div>
  )
}

function GuidanceCard({
  items,
  tone,
}: {
  items: string[]
  tone: "use" | "avoid"
}) {
  if (!items.length) {
    return null
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{tone === "use" ? "Use when" : "Avoid"}</CardTitle>
      </CardHeader>
      <CardContent>
        <ItemGroup>
          {items.map((item) => (
            <Item key={item} size="xs">
              <ItemMedia variant="icon">
                {tone === "use" ? (
                  <CheckIcon className="text-success-emphasis" />
                ) : (
                  <XIcon className="text-destructive-emphasis" />
                )}
              </ItemMedia>
              <ItemContent>
                {/* Header lines are full sentences; show them whole. */}
                <ItemDescription className="line-clamp-none">
                  <GuidanceText text={item} />
                </ItemDescription>
              </ItemContent>
            </Item>
          ))}
        </ItemGroup>
      </CardContent>
    </Card>
  )
}

/**
 * Headers often lead a sentence with the variant or case it describes
 * ("outline: other actions…"); set those leads in the foreground color.
 */
function GuidanceText({ text }: { text: string }) {
  const parts = text.split(/(?:^|(?<=\. ))([\w-]+(?: \([\w ]+\))?): /)

  return parts.map((part, index) =>
    index % 2 === 1 ? (
      <span className="font-medium text-foreground" key={`${index}-${part}`}>
        {part}:{" "}
      </span>
    ) : (
      <InlineCode key={`${index}-${part}`} text={part} />
    )
  )
}

export function RelatedComponents({ names }: { names: string[] }) {
  const links = names.flatMap((name) => {
    const route = getPrimitiveRoute(name) ?? getShellRoute(name)
    if (!route) return []
    const base = getPrimitiveRoute(name) ? "/primitives" : "/shells"
    return [
      {
        to: `${base}/${name}`,
        label: route.title,
        summary: route.usage.summary,
      },
    ]
  })

  if (!links.length) {
    return null
  }

  return (
    <PageSection id="related" title="Related">
      <ItemGroup>
        {links.map((link) => (
          <Item asChild key={link.to} variant="outline">
            <Link to={link.to}>
              <ItemContent>
                <ItemTitle>{link.label}</ItemTitle>
                <ItemDescription>{link.summary}</ItemDescription>
              </ItemContent>
            </Link>
          </Item>
        ))}
      </ItemGroup>
    </PageSection>
  )
}

function InlineCode({ text }: { text: string }) {
  return text.split(/(`[^`]+`)/).map((part, index) =>
    part.startsWith("`") ? (
      <code
        className="rounded-sm bg-muted px-1 py-0.5 font-mono text-foreground text-xs"
        key={`${index}-${part}`}
      >
        {part.slice(1, -1)}
      </code>
    ) : (
      part
    )
  )
}
