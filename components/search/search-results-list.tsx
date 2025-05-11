"use client"

import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { CardPaper } from "@/components/card-paper"
import { CardResearcher } from "@/components/card-researcher"
import { CardTeam } from "@/components/card-team"
import { CardDirection } from "@/components/card-direction"
import { SearchEmptyState } from "@/components/search/search-empty-state"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

// Mock data for search results
import { mockPapers, mockResearchers, mockTeams, mockDirections } from "@/app/search/mock-data"

interface SearchResultsListProps {
  query: string
  type: string
  page: number
  sort: string
  filters: Record<string, string | string[]>
  isLoading: boolean
  onPageChange: (page: number) => void
  totalPages: number
}

export function SearchResultsList({
  query,
  type,
  page,
  sort,
  filters,
  isLoading,
  onPageChange,
  totalPages,
}: SearchResultsListProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  if (isLoading) {
    return (
      <div className="space-y-6">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-40 w-full" />
        ))}
      </div>
    )
  }

  // Function to create URL with updated page parameter
  const createPageUrl = (page: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("page", page.toString())
    return `/search?${params.toString()}`
  }

  // Generate pagination items
  const renderPaginationItems = () => {
    const items = []
    const maxVisiblePages = 5

    // Always show first page
    items.push(
      <PaginationItem key="page-1">
        <PaginationLink href={createPageUrl(1)} isActive={page === 1}>
          1
        </PaginationLink>
      </PaginationItem>,
    )

    // Calculate range of pages to show
    const startPage = Math.max(2, page - Math.floor(maxVisiblePages / 2))
    const endPage = Math.min(totalPages - 1, startPage + maxVisiblePages - 3)

    // Adjust if we're near the beginning
    if (startPage > 2) {
      items.push(
        <PaginationItem key="ellipsis-1">
          <PaginationEllipsis />
        </PaginationItem>,
      )
    }

    // Add middle pages
    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <PaginationItem key={`page-${i}`}>
          <PaginationLink href={createPageUrl(i)} isActive={page === i}>
            {i}
          </PaginationLink>
        </PaginationItem>,
      )
    }

    // Add ellipsis if needed
    if (endPage < totalPages - 1) {
      items.push(
        <PaginationItem key="ellipsis-2">
          <PaginationEllipsis />
        </PaginationItem>,
      )
    }

    // Always show last page if there is more than one page
    if (totalPages > 1) {
      items.push(
        <PaginationItem key={`page-${totalPages}`}>
          <PaginationLink href={createPageUrl(totalPages)} isActive={page === totalPages}>
            {totalPages}
          </PaginationLink>
        </PaginationItem>,
      )
    }

    return items
  }

  // Determine which results to show based on type
  let results: any[] = []

  if (type === "all") {
    // For "all" tab, show a mix of all types
    results = [
      ...mockPapers.slice(0, 2).map((paper) => ({ ...paper, type: "paper" })),
      ...mockResearchers.slice(0, 1).map((researcher) => ({ ...researcher, type: "researcher" })),
      ...mockTeams.slice(0, 1).map((team) => ({ ...team, type: "team" })),
      ...mockDirections.slice(0, 1).map((direction) => ({ ...direction, type: "direction" })),
    ]
  } else if (type === "papers") {
    results = mockPapers
  } else if (type === "researchers") {
    results = mockResearchers
  } else if (type === "teams") {
    results = mockTeams
  } else if (type === "directions") {
    results = mockDirections
  }

  // Check if we have any results
  if (results.length === 0) {
    return <SearchEmptyState query={query} />
  }

  return (
    <div className="space-y-6">
      {type === "all" ? (
        <div className="space-y-6">
          {/* Papers section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">相关论文</h3>
              <Link
                href={`/search?q=${encodeURIComponent(query)}&type=papers`}
                className="text-sm text-primary hover:underline"
              >
                查看更多论文
              </Link>
            </div>
            <div className="space-y-4">
              {mockPapers.slice(0, 2).map((paper) => (
                <CardPaper key={paper.id} paper={paper} />
              ))}
            </div>
          </div>

          {/* Researchers section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">相关学者</h3>
              <Link
                href={`/search?q=${encodeURIComponent(query)}&type=researchers`}
                className="text-sm text-primary hover:underline"
              >
                查看更多学者
              </Link>
            </div>
            <div className="space-y-4">
              {mockResearchers.slice(0, 1).map((researcher) => (
                <CardResearcher key={researcher.id} researcher={researcher} />
              ))}
            </div>
          </div>

          {/* Teams section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">相关团队</h3>
              <Link
                href={`/search?q=${encodeURIComponent(query)}&type=teams`}
                className="text-sm text-primary hover:underline"
              >
                查看更多团队
              </Link>
            </div>
            <div className="space-y-4">
              {mockTeams.slice(0, 1).map((team) => (
                <CardTeam key={team.id} team={team} />
              ))}
            </div>
          </div>

          {/* Directions section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">相关研究方向</h3>
              <Link
                href={`/search?q=${encodeURIComponent(query)}&type=directions`}
                className="text-sm text-primary hover:underline"
              >
                查看更多研究方向
              </Link>
            </div>
            <div className="space-y-4">
              {mockDirections.slice(0, 1).map((direction) => (
                <CardDirection key={direction.id} direction={direction} />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {results.map((result) => {
            if (type === "papers") {
              return <CardPaper key={result.id} paper={result} />
            } else if (type === "researchers") {
              return <CardResearcher key={result.id} researcher={result} />
            } else if (type === "teams") {
              return <CardTeam key={result.id} team={result} />
            } else if (type === "directions") {
              return <CardDirection key={result.id} direction={result} />
            }
            return null
          })}
        </div>
      )}

      {/* Pagination */}
      {type !== "all" && totalPages > 1 && (
        <div className="mt-8">
          <Pagination>
            <PaginationContent>
              {page > 1 && (
                <PaginationItem>
                  <PaginationPrevious href={createPageUrl(page - 1)} />
                </PaginationItem>
              )}

              {renderPaginationItems()}

              {page < totalPages && (
                <PaginationItem>
                  <PaginationNext href={createPageUrl(page + 1)} />
                </PaginationItem>
              )}
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  )
}
