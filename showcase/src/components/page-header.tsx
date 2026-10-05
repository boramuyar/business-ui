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
    <header className="mb-6 flex flex-col gap-2 border-b pb-6">
      {eyebrow ? (
        <span className="font-mono text-muted-foreground text-xs uppercase tracking-wide">
          {eyebrow}
        </span>
      ) : null}
      <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
      <p className="max-w-3xl text-muted-foreground text-sm">{description}</p>
    </header>
  )
}
