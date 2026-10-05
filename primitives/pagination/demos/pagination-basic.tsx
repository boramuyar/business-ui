import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

export function PaginationBasic() {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#variants" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#variants">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#variants" isActive>
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#variants">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#variants" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
