import {
  Sidebar,
  SidebarContent,
  SidebarProvider,
  useSidebar,
} from "@frontend/primitives/sidebar"
import { type ReactNode, useEffect, useRef } from "react"
import { useLocation } from "react-router-dom"
import { SectionNav } from "./section-nav"
import { SiteHeader } from "./site-header"
import { getNavSection } from "./site-nav"

/** Closes the mobile navigation sheet after navigating. */
function CloseMobileNav({ pathname }: { pathname: string }) {
  const { setOpenMobile } = useSidebar()

  useEffect(() => {
    if (pathname) setOpenMobile(false)
  }, [pathname, setOpenMobile])

  return null
}

export function SiteLayout({ children }: { children: ReactNode }) {
  const { pathname } = useLocation()
  const section = getNavSection(pathname)
  const mainRef = useRef<HTMLElement>(null)

  // main scrolls on its own, below the header, so the detail-page aside can
  // stick to its top. Start each page at the top.
  useEffect(() => {
    if (pathname) mainRef.current?.scrollTo(0, 0)
  }, [pathname])

  return (
    <SidebarProvider className="flex-col">
      <CloseMobileNav pathname={pathname} />
      <SiteHeader section={section} />
      <div className="flex flex-1">
        <Sidebar className="top-14 h-[calc(100svh-3.5rem)]">
          <SidebarContent>
            <SectionNav section={section} />
          </SidebarContent>
        </Sidebar>
        <main
          className="h-[calc(100svh-3.5rem)] min-w-0 flex-1 overflow-y-auto"
          ref={mainRef}
        >
          {children}
        </main>
      </div>
    </SidebarProvider>
  )
}
