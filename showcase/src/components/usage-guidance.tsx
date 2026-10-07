import { Card, CardContent } from "@frontend/primitives/card"
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemTitle,
} from "@frontend/primitives/item"
import { cn } from "@frontend/utilities/cn"
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
    <Card>
      <CardContent className="grid gap-x-10 gap-y-6 md:grid-cols-2">
        <GuidanceList items={usage.use} tone="use" />
        <GuidanceList items={usage.avoid} tone="avoid" />
      </CardContent>
    </Card>
  )
}

function GuidanceList({
  items,
  tone,
}: {
  items: string[]
  tone: "use" | "avoid"
}) {
  if (!items.length) {
    return null
  }

  const Icon = tone === "use" ? CheckIcon : XIcon

  return (
    <div className="flex flex-col gap-3">
      <h2 className="flex items-center gap-2 font-medium text-sm">
        <span
          className={cn(
            "flex size-5 items-center justify-center rounded-full",
            tone === "use"
              ? "bg-success-subtle text-success-emphasis"
              : "bg-destructive-subtle text-destructive-emphasis"
          )}
        >
          <Icon className="size-3" strokeWidth={2.5} />
        </span>
        {tone === "use" ? "Use when" : "Avoid"}
      </h2>
      <ul className="flex flex-col gap-2.5 pl-7 text-muted-foreground text-sm leading-relaxed">
        {items.map((item) => (
          <li key={item}>
            <GuidanceText text={item} />
          </li>
        ))}
      </ul>
    </div>
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
    <section className="flex flex-col gap-3">
      <h2
        className="mt-6 scroll-mt-24 font-semibold text-lg tracking-tight"
        id="related"
      >
        Related
      </h2>
      <ItemGroup className="grid gap-2 sm:grid-cols-2">
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
    </section>
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
