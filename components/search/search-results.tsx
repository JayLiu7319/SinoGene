"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { SearchFilters } from "@/components/search/search-filters"
import { SearchResultsList } from "@/components/search/search-results-list"
import { SearchResultsTabs } from "@/components/search/search-results-tabs"
import { SearchResultsHeader } from "@/components/search/search-results-header"

// Mock data for search results counts
const resultCounts = {
  all: 145,
  papers: 120,
  researchers: 15,
  teams: 8,
  directions: 5,
}

interface SearchResultsProps {
  query: string
  type: string
  page: number
  sort: string
  filters: Record<string, string | string[]>
}

export function SearchResults({ query, type, page, sort, filters }: SearchResultsProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(true)

  // Simulate loading state
  useEffect(() => {
    setIsLoading(true)
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [query, type, page, sort, filters])

  const handleTypeChange = (newType: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("type", newType)
    params.set("page", "1") // Reset to first page when changing type
    router.push(`/search?${params.toString()}`)
  }

  const handleSortChange = (newSort: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("sort", newSort)
    router.push(`/search?${params.toString()}`)
  }

  const handleFilterChange = (filterKey: string, filterValue: string | string[]) => {
    const params = new URLSearchParams(searchParams.toString())

    if (Array.isArray(filterValue)) {
      // Remove existing values for this key
      params.delete(filterKey)
      // Add each value
      filterValue.forEach((value) => {
        params.append(filterKey, value)
      })
    } else {
      params.set(filterKey, filterValue)
    }

    params.set("page", "1") // Reset to first page when changing filters
    router.push(`/search?${params.toString()}`)
  }

  const handleFilterRemove = (filterKey: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.delete(filterKey)
    params.set("page", "1") // Reset to first page when removing filters
    router.push(`/search?${params.toString()}`)
  }

  const handleClearAllFilters = () => {
    const params = new URLSearchParams()
    params.set("q", query)
    params.set("type", type)
    params.set("sort", sort)
    params.set("page", "1")
    router.push(`/search?${params.toString()}`)
  }

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("page", newPage.toString())
    router.push(`/search?${params.toString()}`)
  }

  // Get the count for the current type
  const count = resultCounts[type as keyof typeof resultCounts] || 0

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div className="md:col-span-1">
        <SearchFilters
          type={type}
          filters={filters}
          onFilterChange={handleFilterChange}
          onFilterRemove={handleFilterRemove}
          onClearAllFilters={handleClearAllFilters}
          isLoading={isLoading}
        />
      </div>

      <div className="md:col-span-3">
        <SearchResultsTabs type={type} counts={resultCounts} onTypeChange={handleTypeChange} isLoading={isLoading} />

        <SearchResultsHeader count={count} sort={sort} onSortChange={handleSortChange} isLoading={isLoading} />

        <SearchResultsList
          query={query}
          type={type}
          page={page}
          sort={sort}
          filters={filters}
          isLoading={isLoading}
          onPageChange={handlePageChange}
          totalPages={Math.ceil((resultCounts[type as keyof typeof resultCounts] || 0) / 10)}
        />
      </div>
    </div>
  )
}
