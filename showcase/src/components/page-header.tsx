import type { ReactNode } from "react"

export function PageHeader({
  eyebrow,
  title,
  description,
  badge,
  actions,
}: {
  eyebrow?: ReactNode
  title: string
  description: string
  /** Sits next to the title, such as a status badge. */
  badge?: ReactNode
  actions?: ReactNode
}) {
  return (
    <header className="mb-10 flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
      <div className="flex max-w-2xl flex-col gap-3">
        {eyebrow ? (
          <div className="text-muted-foreground text-sm">{eyebrow}</div>
        ) : null}
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-balance font-semibold text-3xl tracking-tight">
            {title}
          </h1>
          {badge}
        </div>
        <p className="text-base text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>
      {actions ? <div className="flex shrink-0 gap-2">{actions}</div> : null}
    </header>
  )
}
