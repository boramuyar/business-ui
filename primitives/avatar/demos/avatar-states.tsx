import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

export function AvatarStates() {
  return (
    <>
      <Avatar>
        <AvatarImage alt="Boram Uyar" src="https://github.com/boramuyar.png" />
        <AvatarFallback>CO</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage alt="Broken image" src="/missing-avatar.png" />
        <AvatarFallback>BU</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>ON</AvatarFallback>
        <AvatarBadge className="bg-success" />
      </Avatar>
    </>
  )
}
