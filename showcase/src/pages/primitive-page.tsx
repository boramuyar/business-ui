import { Badge } from "@frontend/primitives/badge"
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@frontend/primitives/empty"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@frontend/primitives/pagination"
import { DetailPage } from "@frontend/shells/detail-page"
import { PageSection } from "@frontend/shells/page"
import { MDXProvider } from "@mdx-js/react"
import type { MouseEvent } from "react"
import { Navigate, useNavigate, useParams } from "react-router-dom"
import { CodeBlock } from "../components/code-block"
import { mdxComponents } from "../components/demo/mdx-components"
import { PageBreadcrumb } from "../components/page-breadcrumb"
import { TableOfContents } from "../components/toc"
import { RelatedComponents, UsageGuidance } from "../components/usage-guidance"
import {
  type CatalogSection,
  getAdjacentRoutes,
  primitiveSection,
  statusBadge,
  statusLabel,
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

  const dependencies = [
    ...route.registryDependencies
      .map((name) => name.replace("boramuyar/business-ui/", ""))
      .filter((name) => name !== "style"),
    ...route.dependencies,
  ]

  return (
    <DetailPage
      aside={
        <>
          {route.status === "stable" ? null : (
            <PageSection title="Status">
              <Badge className="self-start" variant={statusBadge[route.status]}>
                {statusLabel[route.status]}
              </Badge>
            </PageSection>
          )}
          <PageSection title="Depends on">
            <DependencyNames names={dependencies} />
          </PageSection>
          <TableOfContents contentId="primitive-doc" key={route.name} />
        </>
      }
      breadcrumb={<PageBreadcrumb items={trail} />}
      description={route.usage.summary || route.description}
      key={route.name}
      title={route.title}
    >
      <article className="flex min-w-0 flex-col gap-6" id="primitive-doc">
        <CodeBlock
          code={`pnpm dlx shadcn@latest add boramuyar/business-ui/${route.name}`}
        />
        <UsageGuidance usage={route.usage} />

        <MDXProvider components={mdxComponents}>
          {Doc ? <Doc /> : <MissingDocNotice name={route.name} />}
        </MDXProvider>

        <RelatedComponents names={route.usage.related} />

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
    </DetailPage>
  )
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

function MissingDocNotice({ name }: { name: string }) {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyTitle>No reference yet</EmptyTitle>
        <EmptyDescription>
          Add showcase.mdx next to {name} to document it.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  )
}
