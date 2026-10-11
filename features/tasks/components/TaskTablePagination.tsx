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

  return (
    <TableFooter>
      <TableRow className="h-12 hover:bg-transparent">
        <TableCell colSpan={9} className="px-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="text-ui-caption text-muted-foreground">
              Showing {totalTasks ? page * pageSize + 1 : 0}–
              {Math.min((page + 1) * pageSize, totalTasks)} of{" "}
              {totalTasks} tasks
              {selectedCount > 0 && ` · ${selectedCount} selected`}
            </span>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="icon-sm"
                aria-label="Previous page"
                disabled={page === 0}
                onClick={() => onPageChange(page - 1)}
              >
                <ChevronLeftIcon />
              </Button>
              <span
                aria-live="polite"
                className="min-w-16 text-center text-ui-caption text-muted-foreground"
              >
                Page {page + 1} of {pageCount}
              </span>
              <Button
                type="button"
                variant="outline"
                size="icon-sm"
                aria-label="Next page"
                disabled={page + 1 >= pageCount}
                onClick={() => onPageChange(page + 1)}
              >
                <ChevronRightIcon />
              </Button>
            </div>
          </div>
        </TableCell>
      </TableRow>
    </TableFooter>
  );
}
