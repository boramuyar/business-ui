import { Badge } from "@frontend/primitives/badge"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@frontend/primitives/pagination"
import { Separator } from "@frontend/primitives/separator"
import { MDXProvider } from "@mdx-js/react"
import type { ComponentProps, MouseEvent, ReactNode } from "react"
import { Navigate, useNavigate, useParams } from "react-router-dom"
import { CodeBlock } from "../components/code-block"
import { mdxComponents } from "../components/demo/mdx-components"
import { EyebrowTrail } from "../components/eyebrow-trail"
import { PageHeader } from "../components/page-header"
import { TableOfContents } from "../components/toc"
import { RelatedComponents, UsageGuidance } from "../components/usage-guidance"
import {
  type CatalogSection,
  getAdjacentRoutes,
  primitiveSection,
  usageLevels,
} from "../primitives-data"

export function PrimitivePage({
  section = primitiveSection,
}: {
  section?: CatalogSection
}) {
  const { name } = useParams()
  const navigate = useNavigate()
  const route = section.routes.find((entry) => entry.name === name)

  if (!route) {
    return <Navigate replace to={section.basePath} />
  }

  const { Doc } = route
  const { previous, next } = getAdjacentRoutes(section.routes, route.name)
  const levelLabel = usageLevels.find(
    (entry) => entry.level === route.usage.level
  )?.label
  const trail =
    section === primitiveSection
      ? [
          { label: "Components", to: "/primitives" },
          { label: levelLabel ?? section.label },
        ]
      : [{ label: "Shells", to: "/shells" }]

  function navigateTo(path: string) {
    return (event: MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault()
      navigate(path)
    }
  }

  return (
    <div key={route.name}>
      <PageHeader
        badge={
          route.status === "stable" ? null : (
            <Badge variant={statusBadge[route.status]}>{route.status}</Badge>
          )
        }
        description={route.usage.summary || route.description}
        eyebrow={<EyebrowTrail items={trail} />}
        title={route.title}
      />

      <div className="grid gap-x-14 gap-y-10 xl:grid-cols-[minmax(0,1fr)_13rem]">
        <article className="flex min-w-0 flex-col gap-5" id="primitive-doc">
          <CodeBlock
            code={`pnpm dlx shadcn@latest add boramuyar/business-ui/${route.name}`}
          />
          <UsageGuidance usage={route.usage} />

          <MDXProvider components={mdxComponents}>
            {Doc ? <Doc /> : <MissingDocNotice name={route.name} />}
          </MDXProvider>

          <RelatedComponents names={route.usage.related} />

          <Separator className="mt-10" />

          <Pagination>
            <PaginationContent className="w-full justify-between">
              <PaginationItem>
                {previous ? (
                  <PaginationPrevious
                    href={`${section.basePath}/${previous.name}`}
                    onClick={navigateTo(`${section.basePath}/${previous.name}`)}
                    text={previous.title}
                  />
                ) : null}
              </PaginationItem>
              <PaginationItem>
                {next ? (
                  <PaginationNext
                    href={`${section.basePath}/${next.name}`}
                    onClick={navigateTo(`${section.basePath}/${next.name}`)}
                    text={next.title}
                  />
                ) : null}
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </article>

        <aside className="flex flex-col gap-8 xl:sticky xl:top-24 xl:self-start">
          <RailSection title="Depends on">
            <DependencyNames
              names={[
                ...route.registryDependencies
                  .map((name) => name.replace("boramuyar/business-ui/", ""))
                  .filter((name) => name !== "style"),
                ...route.dependencies,
              ]}
            />
          </RailSection>
          <TableOfContents contentId="primitive-doc" key={route.name} />
        </aside>
      </div>
    </div>
  )
}

const statusBadge: Record<string, ComponentProps<typeof Badge>["variant"]> = {
  experimental: "warning",
  draft: "secondary",
}

function DependencyNames({ names }: { names: string[] }) {
  if (!names.length) {
    return <p className="text-muted-foreground text-xs">Only the style.</p>
  }

  return (
    <ul className="flex flex-col gap-1 font-mono text-muted-foreground text-xs">
      {names.map((name) => (
        <li key={name}>{name}</li>
      ))}
    </ul>
  )
}

function RailSection({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  return (
    <section className="flex flex-col gap-2">
      <h2 className="font-medium text-xs">{title}</h2>
      {children}
    </section>
  )
}

function MissingDocNotice({ name }: { name: string }) {
  return (
    <div className="rounded-lg border border-dashed p-6 text-muted-foreground text-sm">
      No MDX reference exists yet. Add a showcase.mdx next to `{name}` to
      document it.
    </div>
  )
}
