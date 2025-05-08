import { Button } from "@/components/ui/button"

interface PaginationProps {
  currentPage: number
  totalPages: number
  totalItems: number
  itemsPerPage: number
}

export function Pagination({ currentPage, totalPages, totalItems, itemsPerPage }: PaginationProps) {
  const startItem = (currentPage - 1) * itemsPerPage + 1
  const endItem = Math.min(currentPage * itemsPerPage, totalItems)

  return (
    <div className="flex items-center justify-between pt-4">
      <div className="text-sm text-muted-foreground">
        显示{" "}
        <span className="font-medium">
          {startItem}-{endItem}
        </span>{" "}
        共 <span className="font-medium">{totalItems}</span> 条结果
      </div>
      <div className="flex items-center gap-1">
        <Button variant="outline" size="sm" disabled={currentPage === 1}>
          上一页
        </Button>
        {Array.from({ length: Math.min(3, totalPages) }, (_, i) => (
          <Button key={i} variant="outline" size="sm" className="w-9 px-0">
            {i + 1}
          </Button>
        ))}
        {totalPages > 3 && <span className="mx-1">...</span>}
        {totalPages > 3 && (
          <Button variant="outline" size="sm" className="w-9 px-0">
            {totalPages}
          </Button>
        )}
        <Button variant="outline" size="sm" disabled={currentPage === totalPages}>
          下一页
        </Button>
      </div>
    </div>
  )
}
