import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@frontend/primitives/breadcrumb"
import { Fragment } from "react"
import { Link } from "react-router-dom"

/** Where a page sits in the handbook; the last entry is plain text. */
export function EyebrowTrail({
  items,
}: {
  items: { label: string; to?: string }[]
}) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {items.map((item, index) => (
          <Fragment key={item.label}>
            {index > 0 ? <BreadcrumbSeparator /> : null}
            <BreadcrumbItem>
              {item.to ? (
                <BreadcrumbLink asChild>
                  <Link to={item.to}>{item.label}</Link>
                </BreadcrumbLink>
              ) : (
                <BreadcrumbPage className="text-muted-foreground">
                  {item.label}
                </BreadcrumbPage>
              )}
            </BreadcrumbItem>
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
