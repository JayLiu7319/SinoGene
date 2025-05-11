"use client"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"

interface SearchResultsTabsProps {
  type: string
  counts?: Record<string, number>
  onTypeChange: (type: string) => void
  isLoading: boolean
}

export function SearchResultsTabs({ type, counts = {}, onTypeChange, isLoading }: SearchResultsTabsProps) {
  // Provide default values for counts if they're missing
  const defaultCounts = {
    all: 0,
    papers: 0,
    researchers: 0,
    teams: 0,
    directions: 0,
    ...counts,
  }

  const tabs = [
    { id: "all", label: "全部", count: defaultCounts.all },
    { id: "papers", label: "论文", count: defaultCounts.papers },
    { id: "researchers", label: "学者", count: defaultCounts.researchers },
    { id: "teams", label: "团队", count: defaultCounts.teams },
    { id: "directions", label: "方向", count: defaultCounts.directions },
  ]

  return (
    <div className="mb-6">
      {isLoading ? (
        <div className="flex gap-2">
          {tabs.map((tab) => (
            <Skeleton key={tab.id} className="h-10 w-24" />
          ))}
        </div>
      ) : (
        <Tabs value={type} onValueChange={onTypeChange} className="w-full">
          <TabsList className="w-full justify-start">
            {tabs.map((tab) => (
              <TabsTrigger key={tab.id} value={tab.id} className="flex gap-1.5">
                <span>{tab.label}</span>
                <span className="text-xs rounded-full bg-muted px-2 py-0.5">{tab.count.toLocaleString()}</span>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      )}
    </div>
  )
}
