import { Badge } from "@frontend/primitives/badge"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  useSidebar,
} from "@frontend/primitives/sidebar"
import { Link, useLocation } from "react-router-dom"
import { statusBadge, statusLabel } from "../primitives-data"
import { type NavSection, navSections } from "./site-nav"

export function SectionNav({ section }: { section: NavSection }) {
  const { pathname } = useLocation()
  const { isMobile } = useSidebar()

  return (
    <>
      {isMobile ? (
        <>
          <SidebarGroup>
            <SidebarGroupLabel>Sections</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {navSections.map((entry) => (
                  <SidebarMenuItem key={entry.id}>
                    <SidebarMenuButton
                      asChild
                      isActive={entry.id === section.id}
                    >
                      <Link to={entry.to}>{entry.label}</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarSeparator />
        </>
      ) : null}
      {section.groups.map((group) => (
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
                    <SidebarMenuBadge>
                      <Badge size="sm" variant={statusBadge[link.status]}>
                        {statusLabel[link.status]}
                      </Badge>
                    </SidebarMenuBadge>
                  ) : null}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      ))}
    </>
  )
}
