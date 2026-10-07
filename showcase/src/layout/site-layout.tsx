import type { ReactNode } from "react"
import { useLocation } from "react-router-dom"
import { SectionNav } from "./section-nav"
import { SiteHeader } from "./site-header"
import { getNavSection } from "./site-nav"

export function SiteLayout({ children }: { children: ReactNode }) {
  const { pathname } = useLocation()
  const section = getNavSection(pathname)

  return (
    <div className="flex min-h-svh flex-col">
      <SiteHeader section={section} />
      <div className="flex flex-1">
        <aside className="sticky top-14 hidden h-[calc(100svh-3.5rem)] w-64 shrink-0 overflow-y-auto border-r px-4 py-6 lg:block">
          <SectionNav section={section} />
        </aside>
        <main className="min-w-0 flex-1 px-4 py-8 sm:px-8 lg:px-12 lg:py-10">
          {children}
        </main>
      </div>
    </div>
  )
}
