import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

export function PaginationText() {
  return (
    <Pagination>
      <PaginationContent className="w-full justify-between">
        <PaginationItem>
          <PaginationPrevious href="#variants" text="Badge" />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#variants" text="Button" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
