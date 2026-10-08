import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export function AvatarStates() {
  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <Avatar>
            <AvatarImage
              alt="Boram Uyar"
              src="https://github.com/boramuyar.png"
            />
            <AvatarFallback>BU</AvatarFallback>
          </Avatar>
        </TooltipTrigger>
        <TooltipContent>Boram Uyar</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Avatar>
            <AvatarImage alt="Jane Doe" src="/missing-avatar.png" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </TooltipTrigger>
        <TooltipContent>Jane Doe</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Avatar>
            <AvatarFallback>BU</AvatarFallback>
            <AvatarBadge aria-label="Online" className="bg-success" />
          </Avatar>
        </TooltipTrigger>
        <TooltipContent>Boram Uyar, online</TooltipContent>
      </Tooltip>
    </>
  )
}
