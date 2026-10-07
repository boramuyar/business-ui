import { useEffect, useState } from "react"

type TocHeading = { id: string; text: string }

export function TableOfContents({ contentId }: { contentId: string }) {
  const [headings, setHeadings] = useState<TocHeading[]>([])

  useEffect(() => {
    const content = document.getElementById(contentId)
    // Demos can render their own h2s (page shells do); only list doc headings.
    const found = Array.from(content?.querySelectorAll("h2") ?? [])
      .filter(
        (heading) => heading.id && !heading.closest("[data-slot=preview]")
      )
      .map((heading) => ({ id: heading.id, text: heading.textContent ?? "" }))

    setHeadings(found)
  }, [contentId])

  if (!headings.length) {
    return null
  }

  return (
    <nav aria-label="On this page" className="flex flex-col gap-1">
      <span className="font-medium text-foreground text-xs">On this page</span>
      {headings.map((heading) => (
        <a
          className="text-muted-foreground text-xs hover:text-foreground"
          href={`#${heading.id}`}
          key={heading.id}
        >
          {heading.text}
        </a>
      ))}
    </nav>
  )
}
