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
    <section aria-label="Usage" className="grid gap-4 md:grid-cols-2">
      <GuidanceList
        className="border-t-success bg-success-subtle/60"
        items={usage.use}
        title="Use when"
      />
      <GuidanceList
        className="border-t-destructive bg-destructive-subtle/60"
        items={usage.avoid}
        title="Avoid"
      />
    </section>
  )
}

function GuidanceList({
  title,
  items,
  className,
}: {
  title: string
  items: string[]
  className: string
}) {
  if (!items.length) {
    return null
  }

  return (
    <div className={`flex flex-col gap-2 border-t-2 px-4 py-3.5 ${className}`}>
      <h2 className="font-semibold text-sm">{title}</h2>
      <ul className="flex flex-col gap-1.5 text-sm leading-relaxed">
        {items.map((item) => (
          <li key={item}>
            <InlineCode text={item} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export function RelatedComponents({ names }: { names: string[] }) {
  const links = names.flatMap((name) => {
    const shell = getShellRoute(name)
    const primitive = getPrimitiveRoute(name)
    if (primitive)
      return [
        {
          to: `/primitives/${name}`,
          label: primitive.title,
          summary: primitive.usage.summary,
        },
      ]
    if (shell)
      return [
        {
          to: `/shells/${name}`,
          label: shell.title,
          summary: shell.usage.summary,
        },
      ]
    return []
  })

  if (!links.length) {
    return null
  }

  return (
    <section className="flex flex-col gap-3">
      <h2 className="font-semibold text-xl tracking-tight" id="related">
        Related
      </h2>
      <div className="grid gap-2 sm:grid-cols-2">
        {links.map((link) => (
          <Link
            className="flex flex-col gap-0.5 rounded-md border px-3 py-2.5 transition-colors hover:bg-muted"
            key={link.to}
            to={link.to}
          >
            <span className="font-medium text-sm">{link.label}</span>
            <span className="text-muted-foreground text-xs">
              {link.summary}
            </span>
          </Link>
        ))}
      </div>
    </section>
  )
}

function InlineCode({ text }: { text: string }) {
  return text.split(/(`[^`]+`)/).map((part, index) =>
    part.startsWith("`") ? (
      <code
        className="rounded bg-background/70 px-1 font-mono text-xs"
        key={index}
      >
        {part.slice(1, -1)}
      </code>
    ) : (
      part
    )
  )
}
