import type React from "react"
import Link from "next/link"
import { Heart, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface CardTeamProps extends React.ComponentPropsWithoutRef<typeof Card> {
  team: {
    id: string
    name: string
    institution: string
    leader: {
      id: string
      name: string
      avatar?: string
    }
    researchAreas: string[]
    memberCount: number
    papers: number
    citations: number
    tags?: Array<{
      type: "top" | "productive" | "collaborative" | "innovative" | "emerging" | string
      label: string
    }>
  }
}

export function CardTeam({ team, className, ...props }: CardTeamProps) {
  return (
    <Card className={cn("card-hover", className)} {...props}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            {team.tags && team.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-1.5">
                {team.tags.map((tag, index) => {
                  const getTagColor = (type: string) => {
                    switch (type) {
                      case "top":
                        return "bg-purple-50 text-purple-700 border-purple-200"
                      case "productive":
                        return "bg-green-50 text-green-700 border-green-200"
                      case "collaborative":
                        return "bg-blue-50 text-blue-700 border-blue-200"
                      case "innovative":
                        return "bg-orange-50 text-orange-700 border-orange-200"
                      case "emerging":
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
              <Link href={`/teams/${team.id}`} className="hover:text-primary transition-colors">
                {team.name}
              </Link>
            </CardTitle>
            <div className="text-sm text-muted-foreground">{team.institution}</div>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Heart className="h-4 w-4" />
            <span className="sr-only">关注</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex items-center gap-3 mb-3">
          <Avatar className="h-10 w-10 border">
            <AvatarImage src={team.leader.avatar || "/placeholder.svg"} alt={team.leader.name} />
            <AvatarFallback>{team.leader.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <div className="text-sm font-medium">
              <Link href={`/researchers/${team.leader.id}`} className="hover:text-primary transition-colors">
                {team.leader.name}
              </Link>
            </div>
            <div className="text-xs text-muted-foreground">团队负责人</div>
          </div>
        </div>
        <div className="flex flex-wrap gap-1.5 mb-3">
          {team.researchAreas.slice(0, 3).map((area, index) => (
            <Badge key={index} variant="secondary" className="font-normal">
              {area}
            </Badge>
          ))}
        </div>
        <div className="flex items-center text-sm text-muted-foreground gap-4">
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>{team.memberCount} 成员</span>
          </div>
          <div>
            {team.papers} 论文 · {team.citations} 引用
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
