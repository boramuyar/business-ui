import designIndex from "../../DESIGN.md?raw"

export type DesignDoc = {
  /** Route below /design. Empty for the DESIGN.md overview. */
  slug: string
  /** Repository path, used to resolve relative links between guides. */
  path: string
  title: string
  group: "Overview" | "Foundations" | "Patterns" | "Reference"
  source: string
}

const guideModules = import.meta.glob<string>("../../design/**/*.md", {
  eager: true,
  import: "default",
  query: "?raw",
})

const order = [
  "",
  "foundations/color",
  "foundations/typography",
  "foundations/layout",
  "patterns/selection-controls",
  "patterns/overlays",
  "patterns/feedback",
  "shells",
  "components",
]

export const designDocs: DesignDoc[] = [
  toDoc("", "DESIGN.md", designIndex),
  ...Object.entries(guideModules).map(([modulePath, source]) => {
    const slug = modulePath.replace("../../design/", "").replace(/\.md$/, "")
    return toDoc(slug, `design/${slug}.md`, source)
  }),
].sort((left, right) => rank(left.slug) - rank(right.slug))

export function getDesignDoc(slug: string) {
  return designDocs.find((doc) => doc.slug === slug)
}

/** Public URL of the raw Markdown, which agents read. */
export function rawDesignUrl(doc: DesignDoc) {
  return doc.slug ? `/design/${doc.slug}.md` : "/design.md"
}

/**
 * Turns a relative link between guides (`../shells.md#adding-a-shell`) into a
 * showcase route (`/design/shells#adding-a-shell`). Returns undefined for
 * links that are not guides.
 */
export function resolveDesignLink(from: DesignDoc, href: string) {
  if (/^[a-z]+:/i.test(href) || href.startsWith("#")) return undefined
  const [target, hash] = href.split("#")
  if (!target.endsWith(".md")) return undefined

  const parts = from.path.split("/").slice(0, -1)
  for (const segment of target.split("/")) {
    if (segment === "..") parts.pop()
    else if (segment !== ".") parts.push(segment)
  }
  const path = parts.join("/")
  const doc = designDocs.find((entry) => entry.path === path)
  if (!doc) return undefined

  const route = doc.slug ? `/design/${doc.slug}` : "/design"
  return hash ? `${route}#${hash}` : route
}

function toDoc(slug: string, path: string, source: string): DesignDoc {
  const title = source.match(/^# (.+)$/m)?.[1] ?? slug
  const group = !slug
    ? "Overview"
    : slug.startsWith("foundations/")
      ? "Foundations"
      : slug.startsWith("patterns/")
        ? "Patterns"
        : "Reference"
  return { slug, path, title, group, source }
}

function rank(slug: string) {
  const index = order.indexOf(slug)
  return index === -1 ? order.length : index
}
