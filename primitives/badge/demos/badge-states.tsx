import { Badge } from "@/components/ui/badge"

export function BadgeStates() {
  return (
    <>
      <Badge asChild>
        <a href="#states">Default</a>
      </Badge>
      <Badge variant="secondary" asChild>
        <a href="#states">Secondary</a>
      </Badge>
      <Badge variant="outline" asChild>
        <a href="#states">Outline</a>
      </Badge>
      <Badge variant="destructive" asChild>
        <a href="#states">Destructive</a>
      </Badge>
      <Badge variant="success" asChild>
        <a href="#states">Success</a>
      </Badge>
      <Badge variant="warning" asChild>
        <a href="#states">Warning</a>
      </Badge>
      <Badge variant="info" asChild>
        <a href="#states">Info</a>
      </Badge>
    </>
  )
}
