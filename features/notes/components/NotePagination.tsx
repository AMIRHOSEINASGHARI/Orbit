"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";

export function NotePagination({ total, page, pageSize, onPageChange }: {
  total: number;
  page: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}) {
  const pageCount = Math.max(1, Math.ceil(total / pageSize));
  const first = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const last = Math.min(page * pageSize, total);

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
      <span aria-live="polite" className="text-ui-caption text-muted-foreground">Showing {first}–{last} of {total} notes</span>
      <nav aria-label="Notes pages" className="flex items-center gap-2">
        <Button type="button" variant="outline" size="sm" disabled={page <= 1} onClick={() => onPageChange(page - 1)}><ChevronLeftIcon aria-hidden="true" />Previous</Button>
        <span aria-current="page" className="px-2 text-sm text-muted-foreground">Page {page} of {pageCount}</span>
        <Button type="button" variant="outline" size="sm" disabled={page >= pageCount} onClick={() => onPageChange(page + 1)}>Next<ChevronRightIcon aria-hidden="true" /></Button>
      </nav>
    </div>
  );
}
