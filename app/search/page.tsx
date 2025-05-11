import { Suspense } from "react"
import { Breadcrumb } from "@/components/breadcrumb"
import { SearchResults } from "@/components/search/search-results"
import { SearchSkeleton } from "@/components/search/search-skeleton"

interface SearchPageProps {
  searchParams: {
    q?: string
    type?: string
    page?: string
    sort?: string
    [key: string]: string | string[] | undefined
  }
}

export default function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q || ""
  const type = searchParams.type || "all"
  const page = Number.parseInt(searchParams.page || "1", 10)
  const sort = searchParams.sort || "relevance"

  // Extract other filter params
  const filters: Record<string, string | string[]> = {}
  Object.entries(searchParams).forEach(([key, value]) => {
    if (!["q", "type", "page", "sort"].includes(key) && value) {
      filters[key] = value
    }
  })

  return (
    <div className="container py-6 md:py-8">
      <Breadcrumb
        segments={[
          { name: "首页", href: "/" },
          { name: "搜索结果", href: `/search?q=${encodeURIComponent(query)}` },
        ]}
      />

      <div className="mt-4 mb-8">
        <h1 className="text-2xl font-bold mb-2">搜索结果</h1>
        {query && (
          <p className="text-muted-foreground">
            找到与 "<span className="font-medium text-foreground">{query}</span>" 相关的结果
          </p>
        )}
      </div>

      <Suspense fallback={<SearchSkeleton />}>
        <SearchResults query={query} type={type} page={page} sort={sort} filters={filters} />
      </Suspense>
    </div>
  )
}
