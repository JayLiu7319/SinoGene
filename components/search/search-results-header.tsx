"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"

interface SearchResultsHeaderProps {
  count?: number
  sort: string
  onSortChange: (sort: string) => void
  isLoading: boolean
}

export function SearchResultsHeader({ count = 0, sort, onSortChange, isLoading }: SearchResultsHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-4">
      {isLoading ? (
        <>
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-10 w-32" />
        </>
      ) : (
        <>
          <div className="text-sm text-muted-foreground">
            共 <span className="font-medium text-foreground">{count.toLocaleString()}</span> 条结果
          </div>
          <Select value={sort} onValueChange={onSortChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="排序方式" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevance">相关度</SelectItem>
              <SelectItem value="date_desc">发表日期 (最新)</SelectItem>
              <SelectItem value="date_asc">发表日期 (最早)</SelectItem>
              <SelectItem value="citations_desc">引用次数 (降序)</SelectItem>
              <SelectItem value="impact_desc">影响因子 (降序)</SelectItem>
            </SelectContent>
          </Select>
        </>
      )}
    </div>
  )
}
