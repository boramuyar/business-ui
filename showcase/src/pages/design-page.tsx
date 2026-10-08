import { Button } from "@frontend/primitives/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@frontend/primitives/table"
import { DetailPage } from "@frontend/shells/detail-page"
import { ClipboardCopyIcon, FileTextIcon } from "lucide-react"
import type { ComponentProps, ReactNode } from "react"
import ReactMarkdown, { type Components } from "react-markdown"
import { Link, Navigate, useParams } from "react-router-dom"
import remarkGfm from "remark-gfm"
import { CodeBlock } from "../components/code-block"
import { TableOfContents } from "../components/toc"
import {
  type DesignDoc,
  getDesignDoc,
  rawDesignUrl,
  resolveDesignLink,
} from "../design-docs"
import { copyText } from "../lib/copy-text"
import { rehypeSections } from "../lib/rehype-sections"

export function DesignPage() {
  const params = useParams()
  const slug = params["*"] ?? ""
  const doc = getDesignDoc(slug)

  if (!doc) {
    return <Navigate replace to="/design" />
  }

  const { title, description, body } = splitDoc(doc.source)

  return (
    <DetailPage
      actions={
        <>
          <Button asChild variant="ghost">
            <a href={rawDesignUrl(doc)}>
              <FileTextIcon data-icon="inline-start" />
              View raw Markdown
            </a>
          </Button>
          <Button onClick={() => copyText(doc.source)} variant="outline">
            <ClipboardCopyIcon data-icon="inline-start" />
            Copy as Markdown
          </Button>
        </>
      }
      aside={<TableOfContents contentId="design-doc" key={doc.slug} />}
      description={description}
      key={doc.slug}
      title={title}
    >
      <article className="flex min-w-0 flex-col gap-6" id="design-doc">
        <ReactMarkdown
          components={markdownComponents(doc)}
          rehypePlugins={[rehypeSections]}
          remarkPlugins={[remarkGfm]}
        >
          {body}
        </ReactMarkdown>
      </article>
    </DetailPage>
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
    section: ({ children }) => (
      <section className="flex min-w-0 flex-col gap-3">{children}</section>
    ),
    h2: ({ children }) => (
      <h2 className="scroll-mt-6 font-semibold text-sm" id={slugify(children)}>
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="scroll-mt-6 font-medium text-xs" id={slugify(children)}>
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
    table: ({ children }) => <Table>{children}</Table>,
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
  const route = resolveDesignLink(doc, href)
  const external = /^https?:/.test(href)

  return (
    <Button asChild size="inline" variant="link">
      {route ? (
        <Link to={route}>{children}</Link>
      ) : (
        <a
          href={href}
          rel={external ? "noreferrer" : undefined}
          target={external ? "_blank" : undefined}
        >
          {children}
        </a>
      )}
    </Button>
  )
}
