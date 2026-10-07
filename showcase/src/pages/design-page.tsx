import { Button } from "@frontend/primitives/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@frontend/primitives/table"
import { ClipboardCopyIcon, FileTextIcon } from "lucide-react"
import type { ComponentProps, ReactNode } from "react"
import ReactMarkdown, { type Components } from "react-markdown"
import { Link, Navigate, useParams } from "react-router-dom"
import remarkGfm from "remark-gfm"
import { CodeBlock } from "../components/code-block"
import { PageHeader } from "../components/page-header"
import { TableOfContents } from "../components/toc"
import {
  type DesignDoc,
  getDesignDoc,
  rawDesignUrl,
  resolveDesignLink,
} from "../design-docs"
import { copyText } from "../lib/copy-text"

export function DesignPage() {
  const params = useParams()
  const slug = params["*"] ?? ""
  const doc = getDesignDoc(slug)

  if (!doc) {
    return <Navigate replace to="/design" />
  }

  const { title, description, body } = splitDoc(doc.source)

  return (
    <div key={doc.slug}>
      <PageHeader
        actions={
          <>
            <Button asChild variant="ghost">
              <a href={rawDesignUrl(doc)}>
                <FileTextIcon data-icon="inline-start" />
                Raw
              </a>
            </Button>
            <Button onClick={() => copyText(doc.source)} variant="outline">
              <ClipboardCopyIcon data-icon="inline-start" />
              Copy as Markdown
            </Button>
          </>
        }
        description={description}
        eyebrow={doc.group}
        title={title}
      />
      <div className="grid gap-x-14 gap-y-10 xl:grid-cols-[minmax(0,1fr)_14rem]">
        <article
          className="flex min-w-0 max-w-3xl flex-col gap-4"
          id="design-doc"
        >
          <ReactMarkdown
            components={markdownComponents(doc)}
            remarkPlugins={[remarkGfm]}
          >
            {body}
          </ReactMarkdown>
        </article>
        <aside className="hidden xl:sticky xl:top-24 xl:block xl:self-start">
          <TableOfContents contentId="design-doc" key={doc.slug} />
        </aside>
      </div>
    </div>
  )
}

/** The first heading becomes the page title and the first paragraph its description. */
function splitDoc(source: string) {
  const lines = source.split("\n")
  const titleIndex = lines.findIndex((line) => line.startsWith("# "))
  const title = lines[titleIndex]?.slice(2) ?? ""
  let index = titleIndex + 1
  while (lines[index]?.trim() === "") index += 1
  const paragraph: string[] = []
  while (lines[index]?.trim() && !/^[#|`-]/.test(lines[index])) {
    paragraph.push(lines[index])
    index += 1
  }
  return {
    title,
    description: paragraph.join(" ").replace(/`/g, ""),
    body: lines.slice(index).join("\n"),
  }
}

function slugify(children: ReactNode) {
  return String(children)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

function markdownComponents(doc: DesignDoc): Components {
  return {
    h2: ({ children }) => (
      <h2
        className="mt-8 scroll-mt-24 font-semibold text-lg tracking-tight first:mt-0"
        id={slugify(children)}
      >
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3
        className="mt-3 scroll-mt-24 font-medium text-base"
        id={slugify(children)}
      >
        {children}
      </h3>
    ),
    p: ({ children }) => (
      <p className="text-muted-foreground text-sm/relaxed">{children}</p>
    ),
    ul: ({ children }) => (
      <ul className="flex list-disc flex-col gap-1 pl-5 text-muted-foreground text-sm/relaxed">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="flex list-decimal flex-col gap-1 pl-5 text-muted-foreground text-sm/relaxed">
        {children}
      </ol>
    ),
    strong: ({ children }) => (
      <strong className="font-medium text-foreground">{children}</strong>
    ),
    a: ({ href = "", children }) => (
      <MarkdownLink doc={doc} href={href}>
        {children}
      </MarkdownLink>
    ),
    code: ({ children }) => (
      <code className="rounded-sm bg-muted px-1 py-0.5 font-mono text-foreground text-xs">
        {children}
      </code>
    ),
    pre: ({ node }) => {
      const code = node?.children[0]
      const text =
        code && "children" in code
          ? code.children
              .map((child) => ("value" in child ? child.value : ""))
              .join("")
          : ""
      return <CodeBlock code={text.trimEnd()} />
    },
    table: ({ children }) => (
      <div className="overflow-x-auto rounded-lg ring-1 ring-border">
        <Table>{children}</Table>
      </div>
    ),
    thead: ({ children }) => <TableHeader>{children}</TableHeader>,
    tbody: ({ children }) => <TableBody>{children}</TableBody>,
    tr: ({ children }) => <TableRow>{children}</TableRow>,
    th: ({ children }) => <TableHead>{children}</TableHead>,
    td: ({ children }) => (
      <TableCell className="whitespace-normal align-top">{children}</TableCell>
    ),
  }
}

function MarkdownLink({
  doc,
  href,
  children,
}: {
  doc: DesignDoc
  href: string
  children: ComponentProps<"a">["children"]
}) {
  const className = "text-brand-emphasis underline-offset-4 hover:underline"
  const route = resolveDesignLink(doc, href)

  if (route) {
    return (
      <Link className={className} to={route}>
        {children}
      </Link>
    )
  }

  const external = /^https?:/.test(href)
  return (
    <a
      className={className}
      href={href}
      rel={external ? "noreferrer" : undefined}
      target={external ? "_blank" : undefined}
    >
      {children}
    </a>
  )
}
