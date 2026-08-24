"use client"

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

import { create } from "zustand"

interface PaginationState {
  page: number
  hasNext: boolean
  nextPage: () => void
  prevPage: () => void
  setPage: (page: number) => void
  setHasNext: (val: boolean) => void
  reset: () => void
}

export const usePaginationStore = create<PaginationState>((set) => ({
  page: 1,
  hasNext: true,
  nextPage: () => set((state) => ({ page: state.page + 1 })),
  prevPage: () => set((state) => ({ page: Math.max(1, state.page - 1) })),
  setPage: (page) => set({ page: Math.max(1, page) }),
  setHasNext: (val) => set({ hasNext: val }),
  reset: () => set({ page: 1, hasNext: true }),
}))
const WINDOW_SIZE = 5

function getVisiblePages(page: number, windowSize: number): number[] {
  const half = Math.floor(windowSize / 2)
  const start = Math.max(page - half, 1)
  return Array.from({ length: windowSize }, (_, i) => start + i)
}

export function InfinitePagination() {
  const { page, nextPage, prevPage, hasNext, setPage } = usePaginationStore()

  const visiblePages = getVisiblePages(page, WINDOW_SIZE)
  const showLeftEllipsis = visiblePages[0] > 1
  const lastVisible = visiblePages[visiblePages.length - 1]
  const showRightEllipsis = hasNext || lastVisible > page

  return (
    <Pagination>
      <PaginationContent className="w-full justify-between">
        <PaginationItem>
          <PaginationPrevious
            aria-disabled={page === 1}
            className={page === 1 ? "pointer-events-none opacity-50" : ""}
            onClick={() => page > 1 && prevPage()}
          />
        </PaginationItem>

        <div className="flex items-center gap-1">
          {showLeftEllipsis && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}

          {visiblePages.map((p) => (
            <PaginationItem key={p}>
              <PaginationLink isActive={p === page} onClick={() => setPage(p)}>
                {p}
              </PaginationLink>
            </PaginationItem>
          ))}

          {showRightEllipsis && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}
        </div>

        <PaginationItem>
          <PaginationNext
            aria-disabled={!hasNext}
            className={!hasNext ? "pointer-events-none opacity-50" : ""}
            onClick={() => hasNext && nextPage()}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
