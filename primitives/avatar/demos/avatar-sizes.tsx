import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export function AvatarSizes() {
  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <Avatar size="sm">
            <AvatarFallback>BU</AvatarFallback>
          </Avatar>
        </TooltipTrigger>
        <TooltipContent>Boram Uyar</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Avatar>
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </TooltipTrigger>
        <TooltipContent>Jane Doe</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Avatar size="lg">
            <AvatarFallback>MK</AvatarFallback>
          </Avatar>
        </TooltipTrigger>
        <TooltipContent>Mina Kim</TooltipContent>
      </Tooltip>
    </>
  )
}
