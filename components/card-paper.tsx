import type React from "react"
import Link from "next/link"
import { Bookmark, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import Image from "next/image"

interface CardPaperProps extends React.ComponentPropsWithoutRef<typeof Card> {
  paper: {
    id: string
    title: string
    authors: Array<{
      id: string
      name: string
    }>
    journal: string
    year: number
    abstract: string
    keywords: string[]
    doi?: string
    citations: number
    coverImage?: string
    tags?: Array<{
      type: "new" | "hot" | "top" | "featured" | string
      label: string
    }>
  }
}

export function CardPaper({ paper, className, ...props }: CardPaperProps) {
  return (
    <Card className={cn("card-hover overflow-hidden", className)} {...props}>
      <div className="flex h-full">
        <div className="flex-1 flex flex-col">
          <CardHeader className="pb-2">
            {paper.tags && paper.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-1.5">
                {paper.tags.map((tag, index) => {
                  const getTagColor = (type: string) => {
                    switch (type) {
                      case "new":
                        return "bg-blue-50 text-blue-700 border-blue-200"
                      case "hot":
                        return "bg-orange-50 text-orange-700 border-orange-200"
                      case "top":
                        return "bg-purple-50 text-purple-700 border-purple-200"
                      case "featured":
                        return "bg-green-50 text-green-700 border-green-200"
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
            <CardTitle className="text-lg font-bold leading-tight">
              <Link href={`/papers/${paper.id}`} className="hover:text-primary transition-colors">
                {paper.title}
              </Link>
            </CardTitle>
            <div className="flex flex-wrap gap-x-2 text-sm text-muted-foreground">
              <span>
                {paper.authors.map((author, index) => (
                  <span key={author.id}>
                    <Link href={`/researchers/${author.id}`} className="hover:text-primary transition-colors">
                      {author.name}
                    </Link>
                    {index < paper.authors.length - 1 ? ", " : ""}
                  </span>
                ))}
              </span>
              <span>
                · {paper.journal} · {paper.year}
              </span>
            </div>
          </CardHeader>

          <CardContent className="pb-2 flex-grow">
            <p className="text-sm line-clamp-3 text-muted-foreground">{paper.abstract}</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {paper.keywords.slice(0, 3).map((keyword, index) => (
                <Badge key={index} variant="secondary" className="font-normal">
                  {keyword}
                </Badge>
              ))}
            </div>
          </CardContent>

          <CardFooter className="pt-2 flex justify-between mt-auto">
            <div className="text-sm text-muted-foreground">
              引用: <span className="font-medium">{paper.citations}</span>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" className="h-7 gap-1">
                <Bookmark className="h-3.5 w-3.5" />
                <span className="sr-only">收藏</span>
              </Button>
              {paper.doi && (
                <Button variant="ghost" size="sm" className="h-7 gap-1">
                  <ExternalLink className="h-3.5 w-3.5" />
                  DOI
                </Button>
              )}
              <Button variant="outline" size="sm" className="h-7">
                查看详情
              </Button>
            </div>
          </CardFooter>
        </div>

        {paper.coverImage && (
          <div className="w-80 shrink-0 flex">
            <div className="relative w-full h-full">
              <Image src={paper.coverImage || "/placeholder.svg"} alt={paper.title} fill className="object-cover" />
            </div>
          </div>
        )}
      </div>
    </Card>
  )
}
