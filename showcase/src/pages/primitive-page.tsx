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
import type { MouseEvent } from "react"
import { Navigate, useNavigate, useParams } from "react-router-dom"
import { mdxComponents } from "../components/demo/mdx-components"
import { DependencyList } from "../components/dependency-list"
import { InstallCommand } from "../components/install-command"
import { PageHeader } from "../components/page-header"
import { TableOfContents } from "../components/toc"
import { getAdjacentPrimitives, getPrimitiveRoute } from "../primitives-data"

export function PrimitivePage() {
  const { name } = useParams()
  const navigate = useNavigate()
  const route = name ? getPrimitiveRoute(name) : undefined

  if (!route) {
    return <Navigate replace to="/primitives" />
  }

  const { Doc } = route
  const { previous, next } = getAdjacentPrimitives(route.name)

  function navigateTo(path: string) {
    return (event: MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault()
      navigate(path)
    }
  }

  return (
    <div key={route.name}>
      <div className="flex items-start justify-between gap-4">
        <PageHeader
          description={route.description}
          eyebrow="Primitive"
          title={route.title}
        />
        <Badge className="mt-1" variant="outline">
          {route.status}
        </Badge>
      </div>

      <div className="grid gap-8 xl:grid-cols-[1fr_16rem]">
        <article className="flex min-w-0 flex-col gap-6" id="primitive-doc">
          <MDXProvider components={mdxComponents}>
            {Doc ? <Doc /> : <MissingDocNotice name={route.name} />}
          </MDXProvider>

          <Separator />

          <Pagination>
            <PaginationContent className="w-full justify-between">
              <PaginationItem>
                {previous ? (
                  <PaginationPrevious
                    href={`/primitives/${previous.name}`}
                    onClick={navigateTo(`/primitives/${previous.name}`)}
                    text={previous.title}
                  />
                ) : null}
              </PaginationItem>
              <PaginationItem>
                {next ? (
                  <PaginationNext
                    href={`/primitives/${next.name}`}
                    onClick={navigateTo(`/primitives/${next.name}`)}
                    text={next.title}
                  />
                ) : null}
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </article>

        <aside className="flex flex-col gap-6 xl:sticky xl:top-6 xl:self-start">
          <div className="flex flex-col gap-2">
            <span className="font-medium text-foreground text-xs">Install</span>
            <InstallCommand item={route.name} />
          </div>
          <DependencyList title="Dependencies" values={route.dependencies} />
          <DependencyList
            title="Registry dependencies"
            values={route.registryDependencies}
          />
          <TableOfContents contentId="primitive-doc" key={route.name} />
        </aside>
      </div>
    </div>
  )
}

function MissingDocNotice({ name }: { name: string }) {
  return (
    <div className="border border-dashed p-6 text-muted-foreground text-sm">
      No MDX reference exists yet. Add `primitives/{name}/showcase.mdx` to
      document this primitive.
    </div>
  )
}
