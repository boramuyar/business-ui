export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string
  title: string
  description: string
}) {
  return (
    <header className="mb-8 flex flex-col gap-2.5">
      {eyebrow ? (
        <span className="text-muted-foreground text-sm">{eyebrow}</span>
      ) : null}
      <h1 className="text-balance font-semibold text-3xl tracking-tight">
        {title}
      </h1>
      <p className="max-w-2xl text-base text-muted-foreground leading-relaxed">
        {description}
      </p>
    </header>
  )
}
