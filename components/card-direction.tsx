import type React from "react"
import Link from "next/link"
import { ArrowUpRight, Heart, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface CardDirectionProps extends React.ComponentPropsWithoutRef<typeof Card> {
  direction: {
    id: string
    name: string
    description: string
    parentDirection?: {
      id: string
      name: string
    }
    papers: number
    researchers: number
    teams: number
    trend: "up" | "down" | "stable"
    trendPercentage?: number
    hotness: number // 1-10
    tags?: Array<{
      type: "new" | "hot" | "emerging" | "interdisciplinary" | "trending" | string
      label: string
    }>
  }
}

export function CardDirection({ direction, className, ...props }: CardDirectionProps) {
  return (
    <Card className={cn("card-hover", className)} {...props}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            {direction.tags && direction.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-1.5">
                {direction.tags.map((tag, index) => {
                  const getTagColor = (type: string) => {
                    switch (type) {
                      case "new":
                        return "bg-blue-50 text-blue-700 border-blue-200"
                      case "hot":
                        return "bg-orange-50 text-orange-700 border-orange-200"
                      case "emerging":
                        return "bg-green-50 text-green-700 border-green-200"
                      case "interdisciplinary":
                        return "bg-purple-50 text-purple-700 border-purple-200"
                      case "trending":
                        return "bg-pink-50 text-pink-700 border-pink-200"
                      default:
                        return "bg-gray-50 text-gray-700 border-gray-200"
                    }
                  }
                  return (
                    <span
                      key={index}
                      className={`inline-flex px-2 py-0.5 text-xs font-medium rounded-full border ${getTagColor(tag.type)}`}
                    >
                      {tag.label}
                    </span>
                  )
                })}
              </div>
            )}
            <CardTitle className="text-lg">
              <Link href={`/directions/${direction.id}`} className="hover:text-primary transition-colors">
                {direction.name}
              </Link>
            </CardTitle>
            {direction.parentDirection && (
              <div className="text-sm text-muted-foreground">
                <Link
                  href={`/directions/${direction.parentDirection.id}`}
                  className="hover:text-primary transition-colors"
                >
                  {direction.parentDirection.name}
                </Link>
              </div>
            )}
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Heart className="h-4 w-4" />
            <span className="sr-only">关注</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-sm line-clamp-2 text-muted-foreground mb-3">{direction.description}</p>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5">
            <Badge variant="outline" className="font-normal">
              {direction.papers} 论文
            </Badge>
            <Badge variant="outline" className="font-normal">
              {direction.researchers} 学者
            </Badge>
            <Badge variant="outline" className="font-normal">
              {direction.teams} 团队
            </Badge>
          </div>
          {direction.trend !== "stable" && direction.trendPercentage && (
            <div
              className={cn(
                "flex items-center gap-1 text-sm font-medium",
                direction.trend === "up" ? "text-success" : "text-destructive",
              )}
            >
              <TrendingUp className={cn("h-4 w-4", direction.trend === "down" && "rotate-180")} />
              <span>{direction.trendPercentage}%</span>
            </div>
          )}
        </div>
        <div className="w-full bg-muted rounded-full h-1.5">
          <div className="bg-primary h-1.5 rounded-full" style={{ width: `${direction.hotness * 10}%` }}></div>
        </div>
        <div className="mt-1 text-xs text-right text-muted-foreground">热度指数</div>
      </CardContent>
      <CardFooter className="pt-2">
        <Button variant="outline" size="sm" className="w-full gap-1">
          查看详情
          <ArrowUpRight className="h-3.5 w-3.5" />
        </Button>
      </CardFooter>
    </Card>
  )
}
