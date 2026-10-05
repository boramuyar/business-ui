import { Badge } from "@frontend/primitives/badge"

export function DependencyList({
  title,
  values,
}: {
  title: string
  values: string[]
}) {
  return (
    <div className="flex flex-col gap-2">
      <span className="font-medium text-foreground text-xs">{title}</span>
      {values.length ? (
        <div className="flex flex-wrap gap-1">
          {values.map((value) => (
            <Badge className="font-mono" key={value} variant="secondary">
              {value}
            </Badge>
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground text-xs">None</p>
      )}
    </div>
  )
}
