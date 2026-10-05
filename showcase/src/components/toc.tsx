import { useEffect, useState } from "react"

type TocHeading = { id: string; text: string }

export function TableOfContents({ contentId }: { contentId: string }) {
  const [headings, setHeadings] = useState<TocHeading[]>([])

  useEffect(() => {
    const content = document.getElementById(contentId)
    const found = Array.from(content?.querySelectorAll("h2") ?? []).map(
      (heading) => ({ id: heading.id, text: heading.textContent ?? "" })
    )

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
