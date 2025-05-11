"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"

interface SearchFiltersProps {
  type: string
  filters: Record<string, string | string[]>
  onFilterChange: (key: string, value: string | string[]) => void
  onFilterRemove: (key: string) => void
  onClearAllFilters: () => void
  isLoading: boolean
}

export function SearchFilters({
  type,
  filters,
  onFilterChange,
  onFilterRemove,
  onClearAllFilters,
  isLoading,
}: SearchFiltersProps) {
  const [yearRange, setYearRange] = useState<[number, number]>([2018, 2023])

  // Helper to check if a checkbox should be checked
  const isChecked = (key: string, value: string) => {
    const filterValue = filters[key]
    if (Array.isArray(filterValue)) {
      return filterValue.includes(value)
    }
    return filterValue === value
  }

  // Handle checkbox change
  const handleCheckboxChange = (key: string, value: string, checked: boolean) => {
    const currentValues = filters[key]
    let newValues: string[]

    if (Array.isArray(currentValues)) {
      if (checked) {
        newValues = [...currentValues, value]
      } else {
        newValues = currentValues.filter((v) => v !== value)
      }
    } else {
      if (checked) {
        newValues = currentValues ? [currentValues, value] : [value]
      } else {
        newValues = currentValues === value ? [] : currentValues ? [currentValues] : []
      }
    }

    onFilterChange(key, newValues.length ? newValues : [])
  }

  // Handle year range change
  const handleYearRangeChange = (value: number[]) => {
    setYearRange([value[0], value[1]])
    onFilterChange("year_range", `${value[0]}-${value[1]}`)
  }

  // Get active filters for display
  const activeFilters = Object.entries(filters).filter(
    ([key]) => key !== "q" && key !== "type" && key !== "page" && key !== "sort",
  )

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-full" />
        <div className="space-y-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-6 w-full" />
          ))}
        </div>
        <Skeleton className="h-40 w-full" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="font-medium text-lg">筛选</div>

      {/* Active filters */}
      {activeFilters.length > 0 && (
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">已选筛选条件</span>
            <Button variant="ghost" size="sm" onClick={onClearAllFilters}>
              清除全部
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {activeFilters.map(([key, value]) => (
              <Badge key={key} variant="outline" className="flex items-center gap-1">
                {getFilterLabel(key, value)}
                <Button variant="ghost" size="icon" className="h-4 w-4 p-0" onClick={() => onFilterRemove(key)}>
                  <X className="h-3 w-3" />
                  <span className="sr-only">移除筛选条件</span>
                </Button>
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Filter accordions */}
      <Accordion type="multiple" defaultValue={["year", "journal", "institution"]}>
        {/* Papers filters */}
        {(type === "all" || type === "papers") && (
          <>
            <AccordionItem value="year">
              <AccordionTrigger>发表年份</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span>{yearRange[0]}</span>
                    <span>{yearRange[1]}</span>
                  </div>
                  <Slider
                    defaultValue={[2018, 2023]}
                    min={2000}
                    max={2023}
                    step={1}
                    value={yearRange}
                    onValueChange={handleYearRangeChange}
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleYearRangeChange([2022, 2023])}>
                      近一年
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleYearRangeChange([2020, 2023])}>
                      近三年
                    </Button>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="journal">
              <AccordionTrigger>期刊</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <Input placeholder="输入期刊名称..." />
                  <div className="space-y-2">
                    {["Nature", "Science", "Cell", "NEJM", "Lancet"].map((journal) => (
                      <div key={journal} className="flex items-center space-x-2">
                        <Checkbox
                          id={`journal-${journal}`}
                          checked={isChecked("journal", journal)}
                          onCheckedChange={(checked) => handleCheckboxChange("journal", journal, checked as boolean)}
                        />
                        <Label htmlFor={`journal-${journal}`}>{journal}</Label>
                      </div>
                    ))}
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="esi">
              <AccordionTrigger>ESI高被引</AccordionTrigger>
              <AccordionContent>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="esi-yes"
                    checked={isChecked("esi", "yes")}
                    onCheckedChange={(checked) => onFilterChange("esi", checked ? "yes" : "")}
                  />
                  <Label htmlFor="esi-yes">是</Label>
                </div>
              </AccordionContent>
            </AccordionItem>
          </>
        )}

        {/* Researchers filters */}
        {(type === "all" || type === "researchers") && (
          <>
            <AccordionItem value="institution">
              <AccordionTrigger>所属机构</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <Input placeholder="输入机构名称..." />
                  <div className="space-y-2">
                    {["北京大学", "清华大学", "中国科学院", "复旦大学", "上海交通大学"].map((institution) => (
                      <div key={institution} className="flex items-center space-x-2">
                        <Checkbox
                          id={`institution-${institution}`}
                          checked={isChecked("institution", institution)}
                          onCheckedChange={(checked) =>
                            handleCheckboxChange("institution", institution, checked as boolean)
                          }
                        />
                        <Label htmlFor={`institution-${institution}`}>{institution}</Label>
                      </div>
                    ))}
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="title">
              <AccordionTrigger>职称</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  {["教授", "副教授", "研究员", "助理教授", "讲师"].map((title) => (
                    <div key={title} className="flex items-center space-x-2">
                      <Checkbox
                        id={`title-${title}`}
                        checked={isChecked("title", title)}
                        onCheckedChange={(checked) => handleCheckboxChange("title", title, checked as boolean)}
                      />
                      <Label htmlFor={`title-${title}`}>{title}</Label>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </>
        )}

        {/* Research areas filter (for all types) */}
        <AccordionItem value="research_area">
          <AccordionTrigger>研究领域</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {["基因组学", "表观遗传学", "生物信息学", "单细胞测序", "CRISPR", "空间转录组学"].map((area) => (
                <div key={area} className="flex items-center space-x-2">
                  <Checkbox
                    id={`area-${area}`}
                    checked={isChecked("research_area", area)}
                    onCheckedChange={(checked) => handleCheckboxChange("research_area", area, checked as boolean)}
                  />
                  <Label htmlFor={`area-${area}`}>{area}</Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

// Helper function to get human-readable filter labels
function getFilterLabel(key: string, value: string | string[]): string {
  const valueStr = Array.isArray(value) ? value.join(", ") : value

  switch (key) {
    case "year_range":
      return `年份: ${valueStr}`
    case "journal":
      return `期刊: ${valueStr}`
    case "esi":
      return "ESI高被引"
    case "institution":
      return `机构: ${valueStr}`
    case "title":
      return `职称: ${valueStr}`
    case "research_area":
      return `研究领域: ${valueStr}`
    default:
      return `${key}: ${valueStr}`
  }
}
