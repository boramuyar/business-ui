import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export function BreadcrumbVariantsSeparator() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="#variants">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>{"\\"}</BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbPage>Style</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}
