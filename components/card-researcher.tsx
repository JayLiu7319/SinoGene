import type React from "react"
import Link from "next/link"
import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface CardResearcherProps extends React.ComponentPropsWithoutRef<typeof Card> {
  researcher: {
    id: string
    name: string
    avatar?: string
    title: string
    institution: string
    department?: string
    researchAreas: string[]
    hIndex: number
    citations: number
    papers: number
    tags?: Array<{
      type: "top" | "rising" | "new" | "active" | "cited" | string
      label: string
    }>
  }
}

export function CardResearcher({ researcher, className, ...props }: CardResearcherProps) {
  return (
    <Card className={cn("card-hover", className)} {...props}>
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        <Avatar className="h-16 w-16 border">
          <AvatarImage src={researcher.avatar || "/placeholder.svg"} alt={researcher.name} />
          <AvatarFallback className="text-lg">{researcher.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              {researcher.tags && researcher.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-1.5">
                  {researcher.tags.map((tag, index) => {
                    const getTagColor = (type: string) => {
                      switch (type) {
                        case "top":
                          return "bg-purple-50 text-purple-700 border-purple-200"
                        case "rising":
                          return "bg-green-50 text-green-700 border-green-200"
                        case "new":
                          return "bg-blue-50 text-blue-700 border-blue-200"
                        case "active":
                          return "bg-orange-50 text-orange-700 border-orange-200"
                        case "cited":
                          return "bg-red-50 text-red-700 border-red-200"
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
              <Link
                href={`/researchers/${researcher.id}`}
                className="text-lg font-bold hover:text-primary transition-colors"
              >
                {researcher.name}
              </Link>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Heart className="h-4 w-4" />
              <span className="sr-only">关注</span>
            </Button>
          </div>
          <div className="text-sm text-muted-foreground">{researcher.title}</div>
          <div className="text-sm text-muted-foreground">
            {researcher.institution}
            {researcher.department && ` · ${researcher.department}`}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex flex-wrap gap-1.5 mb-3">
          {researcher.researchAreas.slice(0, 3).map((area, index) => (
            <Badge key={index} variant="secondary" className="font-normal">
              {area}
            </Badge>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="rounded-md bg-muted p-2">
            <div className="text-lg font-semibold">{researcher.hIndex}</div>
            <div className="text-xs text-muted-foreground">H-index</div>
          </div>
          <div className="rounded-md bg-muted p-2">
            <div className="text-lg font-semibold">{researcher.citations}</div>
            <div className="text-xs text-muted-foreground">引用</div>
          </div>
          <div className="rounded-md bg-muted p-2">
            <div className="text-lg font-semibold">{researcher.papers}</div>
            <div className="text-xs text-muted-foreground">论文</div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-2">
        <Button variant="outline" size="sm" className="w-full">
          查看详情
        </Button>
      </CardFooter>
    </Card>
  )
}
