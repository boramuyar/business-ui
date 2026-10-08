import {
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@frontend/primitives/sidebar"
import { PageSection } from "@frontend/shells/page"
import { useEffect, useState } from "react"

type TocHeading = { id: string; text: string }

/** Hidden below lg, where the aside stacks under the content. */
export function TableOfContents({ contentId }: { contentId: string }) {
  const [headings, setHeadings] = useState<TocHeading[]>([])
  const [activeId, setActiveId] = useState<string>()

  useEffect(() => {
    const content = document.getElementById(contentId)
    const elements = Array.from(content?.querySelectorAll("h2") ?? []).filter(
      (heading) => heading.id
    )
    setHeadings(
      elements.map((heading) => ({
        id: heading.id,
        text: heading.textContent?.replace(/#$/, "") ?? "",
      }))
    )

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting)
        if (visible) setActiveId(visible.target.id)
      },
      { rootMargin: "-80px 0px -70% 0px" }
    )
    for (const element of elements) observer.observe(element)
    return () => observer.disconnect()
  }, [contentId])

  if (!headings.length) {
    return null
  }

  return (
    <nav aria-label="On this page" className="hidden lg:block">
      <PageSection title="On this page">
        <SidebarMenuSub>
          {headings.map((heading) => (
            <SidebarMenuSubItem key={heading.id}>
              <SidebarMenuSubButton
                asChild
                isActive={heading.id === activeId}
                size="sm"
              >
                <a href={`#${heading.id}`}>{heading.text}</a>
              </SidebarMenuSubButton>
            </SidebarMenuSubItem>
          ))}
        </SidebarMenuSub>
      </PageSection>
    </nav>
  )
}
