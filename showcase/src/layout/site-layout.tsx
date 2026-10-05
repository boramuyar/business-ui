import { SidebarInset } from "@frontend/primitives/sidebar"
import type { ReactNode } from "react"
import { AppSidebar } from "./app-sidebar"
import { SiteHeader } from "./site-header"

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <AppSidebar />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col gap-4 p-4 lg:p-6">{children}</div>
      </SidebarInset>
    </>
  )
}
