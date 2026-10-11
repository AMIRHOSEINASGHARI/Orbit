"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/icons";
import { TableFooter, TableRow, TableCell } from "@/components/ui/table";

export function TaskTablePagination({ totalTasks, selectedCount, page, pageSize, onPageChange }: {
  totalTasks: number;
  selectedCount: number;
  page: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}) {
  const pageCount = Math.max(1, Math.ceil(totalTasks / pageSize));
  const firstPage = Math.min(Math.max(page - 1, 0), Math.max(pageCount - 3, 0));
  const pages = Array.from({ length: Math.min(pageCount, 3) }, (_, index) => firstPage + index);

  return (
    <TableFooter>
      <TableRow className="h-12 hover:bg-transparent">
        <TableCell colSpan={9} className="px-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span aria-live="polite" className="text-ui-caption text-muted-foreground">
              Showing {totalTasks ? page * pageSize + 1 : 0}–
              {Math.min((page + 1) * pageSize, totalTasks)} of{" "}
              {totalTasks} tasks
              {selectedCount > 0 && ` · ${selectedCount} selected`}
            </span>
            <nav aria-label="Task pages" className="flex items-center gap-[5px]">
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                aria-label="Previous page"
                disabled={page === 0}
                className="size-[34px] rounded-lg"
                onClick={() => onPageChange(Math.max(0, page - 1))}
              >
                <ChevronLeftIcon />
              </Button>
              {firstPage > 0 && (
                <span aria-hidden="true" className="px-0.5 text-xs text-muted-foreground">…</span>
              )}
              {pages.map((pageIndex) => (
                <Button
                  key={pageIndex}
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  aria-label={`Page ${pageIndex + 1}`}
                  aria-current={pageIndex === page ? "page" : undefined}
                  className={pageIndex === page
                    ? "size-[30px] rounded-md bg-[#eeecff] text-[#635bff] hover:bg-[#eeecff] hover:text-[#635bff]"
                    : "size-[30px] rounded-md text-muted-foreground"}
                  onClick={() => onPageChange(pageIndex)}
                >
                  {pageIndex + 1}
                </Button>
              ))}
              {pageCount > 3 && firstPage + 3 < pageCount && (
                <span aria-hidden="true" className="px-0.5 text-xs text-muted-foreground">…</span>
              )}
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                aria-label="Next page"
                disabled={page + 1 >= pageCount}
                className="size-[34px] rounded-lg"
                onClick={() => onPageChange(page + 1)}
              >
                <ChevronRightIcon />
              </Button>
            </nav>
          </div>
        </TableCell>
      </TableRow>
    </TableFooter>
  );
}
