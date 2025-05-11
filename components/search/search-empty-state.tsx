import { Search } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface SearchEmptyStateProps {
  query: string
}

export function SearchEmptyState({ query }: SearchEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="bg-muted rounded-full p-4 mb-4">
        <Search className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="text-xl font-semibold mb-2">未找到相关结果</h3>
      <p className="text-muted-foreground mb-6 max-w-md">
        抱歉，未能找到与 "{query}" 相关的结果。请尝试使用不同的关键词或减少筛选条件。
      </p>
      <div className="space-y-4 max-w-md">
        <div className="text-sm text-muted-foreground">
          <h4 className="font-medium text-foreground mb-1">建议：</h4>
          <ul className="list-disc list-inside space-y-1">
            <li>检查您的拼写是否正确</li>
            <li>尝试使用更宽泛或不同的关键词</li>
            <li>尝试减少筛选条件</li>
          </ul>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild variant="outline">
            <Link href="/">返回首页</Link>
          </Button>
          <Button asChild>
            <Link href="/search/advanced">高级搜索</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
