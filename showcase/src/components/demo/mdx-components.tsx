import type { MDXProvider } from "@mdx-js/react"
import type { ComponentProps, ReactNode } from "react"
import { Preview, useIsInsidePreview } from "./preview"

type MdxComponents = ComponentProps<typeof MDXProvider>["components"]

function slugify(children: ReactNode) {
  return String(children)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

function AnchoredHeading({
  level,
  children,
}: {
  level: "h2" | "h3"
  children?: ReactNode
}) {
  const HeadingTag = level
  const id = slugify(children)

  return (
    <HeadingTag
      className={
        level === "h2"
          ? "group/heading mt-6 scroll-mt-24 font-semibold text-lg tracking-tight first:mt-0"
          : "group/heading mt-2 scroll-mt-24 font-medium text-base"
      }
      id={id}
    >
      <a className="inline-flex items-center gap-2" href={`#${id}`}>
        {children}
        <span
          aria-hidden
          className="text-muted-foreground opacity-0 transition-opacity group-hover/heading:opacity-100"
        >
          #
        </span>
      </a>
    </HeadingTag>
  )
}

export const mdxComponents: MdxComponents = {
  h2: ({ children }) => (
    <AnchoredHeading level="h2">{children}</AnchoredHeading>
  ),
  h3: ({ children }) => (
    <AnchoredHeading level="h3">{children}</AnchoredHeading>
  ),
  // Outside previews, use a span so docs prose cannot nest <p> tags inside
  // primitives such as DialogDescription. Inside previews, unwrap MDX paragraph
  // blocks so component examples receive plain children.
  p: ({ children }) => {
    const isInsidePreview = useIsInsidePreview()

    if (isInsidePreview) {
      return <>{children}</>
    }

    return (
      <span className="block max-w-2xl text-muted-foreground text-sm leading-relaxed">
        {children}
      </span>
    )
  },
  code: ({ children }) => (
    <code className="rounded-sm bg-muted px-1 py-0.5 font-mono text-foreground text-xs">
      {children}
    </code>
  ),
  Preview,
}
