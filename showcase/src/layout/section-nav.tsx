import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@frontend/primitives/sidebar"
import { cn } from "@frontend/utilities/cn"
import { Link, useLocation } from "react-router-dom"
import type { NavSection } from "./site-nav"

export function SectionNav({ section }: { section: NavSection }) {
  const { pathname } = useLocation()

  return section.groups.map((group) => (
    <SidebarGroup key={group.label}>
      <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {group.links.map((link) => (
            <SidebarMenuItem key={link.to}>
              <SidebarMenuButton asChild isActive={pathname === link.to}>
                <Link to={link.to}>{link.label}</Link>
              </SidebarMenuButton>
              {link.status && link.status !== "stable" ? (
                <SidebarMenuBadge title={link.status}>
                  <span
                    className={cn(
                      "size-1.5 rounded-full",
                      link.status === "experimental"
                        ? "bg-warning"
                        : "bg-muted-foreground"
                    )}
                  />
                </SidebarMenuBadge>
              ) : null}
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  ))
}
