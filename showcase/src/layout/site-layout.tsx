import {
  Sidebar,
  SidebarContent,
  SidebarProvider,
} from "@frontend/primitives/sidebar"
import type { ReactNode } from "react"
import { useLocation } from "react-router-dom"
import { SectionNav } from "./section-nav"
import { SiteHeader } from "./site-header"
import { getNavSection } from "./site-nav"

export function SiteLayout({ children }: { children: ReactNode }) {
  const { pathname } = useLocation()
  const section = getNavSection(pathname)

  return (
    <SidebarProvider className="flex-col">
      <SiteHeader section={section} />
      <div className="flex flex-1">
        <Sidebar
          className="sticky top-14 hidden h-[calc(100svh-3.5rem)] border-r bg-background py-2 lg:flex"
          collapsible="none"
        >
          <SidebarContent>
            <SectionNav section={section} />
          </SidebarContent>
        </Sidebar>
        <main className="min-w-0 flex-1 px-4 pt-10 pb-24 sm:px-8 lg:px-14">
          <div className="mx-auto w-full max-w-6xl">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  )
}
