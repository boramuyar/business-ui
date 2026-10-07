import { Badge } from "@frontend/primitives/badge"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@frontend/primitives/collapsible"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@frontend/primitives/sidebar"
import { cn } from "@frontend/utilities/cn"
import { ChevronRightIcon } from "lucide-react"
import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { designDocs } from "../design-docs"
import {
  type PrimitiveFrontmatter,
  primitiveRoutes,
  shellRoutes,
} from "../primitives-data"

type Status = PrimitiveFrontmatter["status"]

const logoUrl = `${import.meta.env.BASE_URL}logo.svg`

type SubmenuEntry = {
  to: string
  label: string
  status?: Status
  children?: SubmenuEntry[]
}

function useSectionOpen(to: string) {
  const { pathname } = useLocation()
  const inSection = pathname === to || pathname.startsWith(`${to}/`)
  const [open, setOpen] = useState(inSection)

  useEffect(() => {
    if (inSection) {
      setOpen(true)
    }
  }, [inSection])

  return [open, setOpen] as const
}

function StatusIndicator({ status }: { status?: Status }) {
  if (!status || status === "stable") {
    return null
  }

  return (
    // biome-ignore lint/a11y/useAriaPropsSupportedByRole: visual indicator
    <span
      aria-label={status}
      title={status}
      className={cn(
        "pointer-events-auto absolute top-1/2 rounded-full right-3.5 size-1.5 -translate-y-1/2",
        { "bg-warning": status === "experimental" },
        { "bg-muted-foreground": status === "draft" }
      )}
    />
  )
}

function SidebarLink({ to, label }: { to: string; label: string }) {
  const { pathname } = useLocation()

  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild isActive={pathname === to}>
        <Link to={to}>{label}</Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}

function SidebarSubmenuEntry({ entry }: { entry: SubmenuEntry }) {
  const { pathname } = useLocation()
  const [open, setOpen] = useSectionOpen(entry.to)

  if (!entry.children || entry.children.length === 0) {
    return (
      <SidebarMenuSubItem>
        <SidebarMenuSubButton asChild isActive={pathname === entry.to}>
          <Link to={entry.to}>{entry.label}</Link>
        </SidebarMenuSubButton>
        <StatusIndicator status={entry.status} />
      </SidebarMenuSubItem>
    )
  }

  return (
    <Collapsible asChild onOpenChange={setOpen} open={open}>
      <SidebarMenuSubItem>
        <SidebarMenuSubButton asChild isActive={pathname === entry.to}>
          <Link to={entry.to}>{entry.label}</Link>
        </SidebarMenuSubButton>
        <CollapsibleTrigger asChild>
          <SidebarMenuAction
            aria-label={`Toggle ${entry.label.toLowerCase()}`}
            className="top-1 data-[state=open]:rotate-90"
          >
            <ChevronRightIcon />
          </SidebarMenuAction>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub>
            {entry.children.map((child) => (
              <SidebarSubmenuEntry entry={child} key={child.to} />
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuSubItem>
    </Collapsible>
  )
}

function SidebarSubmenu({
  label,
  to,
  entries,
}: {
  label: string
  to: string
  entries: SubmenuEntry[]
}) {
  const { pathname } = useLocation()
  const [open, setOpen] = useSectionOpen(to)

  if (entries.length === 0) {
    return <SidebarLink label={label} to={to} />
  }

  return (
    <Collapsible asChild onOpenChange={setOpen} open={open}>
      <SidebarMenuItem>
        <SidebarMenuButton asChild isActive={pathname === to}>
          <Link to={to}>{label}</Link>
        </SidebarMenuButton>
        <CollapsibleTrigger asChild>
          <SidebarMenuAction
            aria-label={`Toggle ${label.toLowerCase()}`}
            className="data-[state=open]:rotate-90"
          >
            <ChevronRightIcon />
          </SidebarMenuAction>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub>
            {entries.map((entry) => (
              <SidebarSubmenuEntry entry={entry} key={entry.to} />
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  )
}

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="h-12 shrink-0 flex-row items-center px-3 py-0">
        <Link className="flex items-center gap-2" to="/">
          <img alt="Business UI" className="size-4" src={logoUrl} />
          <span className="font-semibold text-sm">Business UI</span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Overview</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarLink label="Home" to="/" />
              <SidebarLink label="Installation" to="/installation" />
              <SidebarSubmenu
                entries={designDocs
                  .filter((doc) => doc.slug)
                  .map((doc) => ({
                    to: `/design/${doc.slug}`,
                    label: doc.title,
                  }))}
                label="Design"
                to="/design"
              />
              <SidebarSubmenu
                entries={primitiveRoutes.map((route) => ({
                  to: `/primitives/${route.name}`,
                  label: route.title,
                  status: route.status,
                }))}
                label="Primitives"
                to="/primitives"
              />
              <SidebarSubmenu
                entries={shellRoutes.map((route) => ({
                  to: `/shells/${route.name}`,
                  label: route.title,
                  status: route.status,
                }))}
                label="Shells"
                to="/shells"
              />
              <SidebarLink label="Style & Utilities" to="/style" />
              <SidebarLink label="Style Lab" to="/style-lab" />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <p className="flex items-center gap-2 px-2 text-muted-foreground text-xs">
          <Badge variant="outline">GitHub</Badge>
          {primitiveRoutes.length} primitives
        </p>
      </SidebarFooter>
    </Sidebar>
  )
}
