import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface FilterOption {
  label: string
  value: string
  options: { label: string; value: string }[]
}

interface FilterSidebarProps {
  filters: FilterOption[]
}

export function FilterSidebar({ filters }: FilterSidebarProps) {
  return (
    <div className="md:w-64 space-y-4">
      {filters.map((filter) => (
        <div key={filter.value}>
          <h3 className="font-medium mb-2">{filter.label}</h3>
          <Select defaultValue={filter.options[0].value}>
            <SelectTrigger>
              <SelectValue placeholder={`选择${filter.label}`} />
            </SelectTrigger>
            <SelectContent>
              {filter.options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      ))}
      <Button className="w-full">应用筛选</Button>
    </div>
  )
}
