import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
} from "@/components/ui/avatar"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const members = [
  { name: "Boram Uyar", initials: "BU" },
  { name: "Jane Doe", initials: "JD" },
  { name: "Mina Kim", initials: "MK" },
]

export function AvatarComposition() {
  return (
    <AvatarGroup>
      {members.map((member) => (
        <Tooltip key={member.name}>
          <TooltipTrigger asChild>
            <Avatar>
              <AvatarFallback>{member.initials}</AvatarFallback>
            </Avatar>
          </TooltipTrigger>
          <TooltipContent>{member.name}</TooltipContent>
        </Tooltip>
      ))}
      <AvatarGroupCount>+3</AvatarGroupCount>
    </AvatarGroup>
  )
}
