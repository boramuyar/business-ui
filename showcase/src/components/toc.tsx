import { cn } from "@frontend/utilities/cn"
import { useEffect, useState } from "react"

type TocHeading = { id: string; text: string }

export function TableOfContents({ contentId }: { contentId: string }) {
  const [headings, setHeadings] = useState<TocHeading[]>([])
  const [activeId, setActiveId] = useState<string>()

  useEffect(() => {
    const content = document.getElementById(contentId)
    // Demos can render their own h2s (page shells do); only list doc headings.
    const elements = Array.from(content?.querySelectorAll("h2") ?? []).filter(
      (heading) => heading.id && !heading.closest("[data-slot=preview]")
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
    <nav aria-label="On this page" className="flex flex-col gap-2">
      <span className="font-medium text-xs">On this page</span>
      <div className="flex flex-col border-l">
        {headings.map((heading) => (
          <a
            className={cn(
              "-ml-px border-l border-transparent py-1 pl-3 text-muted-foreground text-xs transition-colors hover:text-foreground",
              heading.id === activeId && "border-brand text-foreground"
            )}
            href={`#${heading.id}`}
            key={heading.id}
          >
            {heading.text}
          </a>
        ))}
      </div>
    </nav>
  )
}
