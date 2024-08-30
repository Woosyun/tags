import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { useEffect, useState } from "react";

export default function PaginationComponent({
  pageNumber,
  setPageNumber,
}: {
  pageNumber: number
  setPageNumber: (pageNumber: number) => void
  }) {
  const [pages, setPages] = useState<number[]>([1, 2, 3, 4, 5]);

  const handlePageClick = (e: any, page: number) => {
    e.preventDefault();
    setPageNumber(page);
  }
  
  useEffect(() => {
    const l = pageNumber - 2 < 1 ? 1 : pageNumber - 2;
    setPages([l, l + 1, l + 2, l + 3, l + 4]);
  }, [pageNumber]);
  
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem  className='cursor-pointer'>
          <PaginationPrevious onClick={(e) => handlePageClick(e, pageNumber-1)}/>
        </PaginationItem>
        {pages.map((page: number) => (
          <PaginationItem key={page} className='cursor-pointer'>
            <PaginationLink isActive={page === pageNumber} onClick={(e) => handlePageClick(e, page)}>
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}
        {/* <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem> */}
        <PaginationItem  className='cursor-pointer'>
          <PaginationNext onClick={(e) => handlePageClick(e, pageNumber+1)}/>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
