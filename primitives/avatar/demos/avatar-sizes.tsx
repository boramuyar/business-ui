import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export function AvatarSizes() {
  return (
    <>
      <Avatar size="sm">
        <AvatarFallback>SM</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>MD</AvatarFallback>
      </Avatar>
      <Avatar size="lg">
        <AvatarFallback>LG</AvatarFallback>
      </Avatar>
    </>
  )
}
