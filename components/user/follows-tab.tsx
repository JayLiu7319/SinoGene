"use client"

import * as React from "react"
import { Heart, Trash2 } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { CardResearcher } from "@/components/card-researcher"
import { CardTeam } from "@/components/card-team"
import { CardDirection } from "@/components/card-direction"
import { toast } from "@/components/ui/use-toast"

// 模拟数据
const followedResearchers = [
  {
    id: "researcher1",
    name: "张伟",
    title: "教授",
    institution: "北京大学",
    department: "生命科学学院",
    researchAreas: ["基因组学", "表观遗传学", "生物信息学"],
    hIndex: 45,
    citations: 12500,
    papers: 120,
  },
  {
    id: "researcher2",
    name: "李明",
    title: "研究员",
    institution: "中国科学院",
    department: "遗传与发育生物学研究所",
    researchAreas: ["发育生物学", "干细胞", "再生医学"],
    hIndex: 38,
    citations: 9800,
    papers: 95,
  },
]

const followedTeams = [
  {
    id: "team1",
    name: "基因组学与精准医学团队",
    institution: "北京大学",
    leader: {
      id: "researcher1",
      name: "张伟",
    },
    researchAreas: ["基因组学", "精准医学", "生物信息学"],
    memberCount: 25,
    papers: 215,
    citations: 18500,
  },
]

const followedDirections = [
  {
    id: "direction1",
    name: "空间转录组学",
    description:
      "空间转录组学是一种新兴的技术，可以在保留空间信息的同时分析组织中基因表达的空间分布，为理解复杂组织的功能和疾病机制提供了新的视角。",
    parentDirection: {
      id: "parent1",
      name: "单细胞生物学",
    },
    papers: 450,
    researchers: 120,
    teams: 35,
    trend: "up",
    trendPercentage: 45,
    hotness: 9,
  },
]

export function FollowsTab() {
  const [selectedResearchers, setSelectedResearchers] = React.useState<string[]>([])
  const [selectedTeams, setSelectedTeams] = React.useState<string[]>([])
  const [selectedDirections, setSelectedDirections] = React.useState<string[]>([])

  const handleSelectResearcher = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedResearchers([...selectedResearchers, id])
    } else {
      setSelectedResearchers(selectedResearchers.filter((researcherId) => researcherId !== id))
    }
  }

  const handleSelectTeam = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedTeams([...selectedTeams, id])
    } else {
      setSelectedTeams(selectedTeams.filter((teamId) => teamId !== id))
    }
  }

  const handleSelectDirection = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedDirections([...selectedDirections, id])
    } else {
      setSelectedDirections(selectedDirections.filter((directionId) => directionId !== id))
    }
  }

  const handleBatchUnfollow = (type: string) => {
    let message = ""
    switch (type) {
      case "researchers":
        message = `已取消关注 ${selectedResearchers.length} 位学者`
        setSelectedResearchers([])
        break
      case "teams":
        message = `已取消关注 ${selectedTeams.length} 个团队`
        setSelectedTeams([])
        break
      case "directions":
        message = `已取消关注 ${selectedDirections.length} 个研究方向`
        setSelectedDirections([])
        break
    }

    toast({
      title: "操作成功",
      description: message,
    })
  }

  return (
    <Tabs defaultValue="researchers">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="researchers">学者</TabsTrigger>
        <TabsTrigger value="teams">团队</TabsTrigger>
        <TabsTrigger value="directions">方向</TabsTrigger>
      </TabsList>

      <TabsContent value="researchers" className="space-y-4">
        {selectedResearchers.length > 0 && (
          <div className="flex justify-between items-center p-2 bg-muted rounded-lg">
            <div className="text-sm">已选择 {selectedResearchers.length} 项</div>
            <Button
              variant="outline"
              size="sm"
              className="gap-1 text-destructive hover:text-destructive"
              onClick={() => handleBatchUnfollow("researchers")}
            >
              <Trash2 className="h-4 w-4" />
              批量取消关注
            </Button>
          </div>
        )}

        {followedResearchers.length > 0 ? (
          <div className="grid gap-4">
            {followedResearchers.map((researcher) => (
              <div key={researcher.id} className="relative">
                <div className="absolute left-2 top-2 z-10">
                  <Checkbox
                    checked={selectedResearchers.includes(researcher.id)}
                    onCheckedChange={(checked) => handleSelectResearcher(researcher.id, checked as boolean)}
                  />
                </div>
                <CardResearcher researcher={researcher} />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Heart className="h-12 w-12 text-muted-foreground/50" />
            <h3 className="mt-4 text-lg font-semibold">您还没有关注任何学者</h3>
            <p className="mt-2 text-sm text-muted-foreground">关注学者可以及时获取他们的最新研究动态</p>
            <Button className="mt-4" variant="outline">
              浏览学者
            </Button>
          </div>
        )}
      </TabsContent>

      <TabsContent value="teams" className="space-y-4">
        {selectedTeams.length > 0 && (
          <div className="flex justify-between items-center p-2 bg-muted rounded-lg">
            <div className="text-sm">已选择 {selectedTeams.length} 项</div>
            <Button
              variant="outline"
              size="sm"
              className="gap-1 text-destructive hover:text-destructive"
              onClick={() => handleBatchUnfollow("teams")}
            >
              <Trash2 className="h-4 w-4" />
              批量取消关注
            </Button>
          </div>
        )}

        {followedTeams.length > 0 ? (
          <div className="grid gap-4">
            {followedTeams.map((team) => (
              <div key={team.id} className="relative">
                <div className="absolute left-2 top-2 z-10">
                  <Checkbox
                    checked={selectedTeams.includes(team.id)}
                    onCheckedChange={(checked) => handleSelectTeam(team.id, checked as boolean)}
                  />
                </div>
                <CardTeam team={team} />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Heart className="h-12 w-12 text-muted-foreground/50" />
            <h3 className="mt-4 text-lg font-semibold">您还没有关注任何团队</h3>
            <p className="mt-2 text-sm text-muted-foreground">关注团队可以及时获取他们的最新研究动态</p>
            <Button className="mt-4" variant="outline">
              浏览团队
            </Button>
          </div>
        )}
      </TabsContent>

      <TabsContent value="directions" className="space-y-4">
        {selectedDirections.length > 0 && (
          <div className="flex justify-between items-center p-2 bg-muted rounded-lg">
            <div className="text-sm">已选择 {selectedDirections.length} 项</div>
            <Button
              variant="outline"
              size="sm"
              className="gap-1 text-destructive hover:text-destructive"
              onClick={() => handleBatchUnfollow("directions")}
            >
              <Trash2 className="h-4 w-4" />
              批量取消关注
            </Button>
          </div>
        )}

        {followedDirections.length > 0 ? (
          <div className="grid gap-4">
            {followedDirections.map((direction) => (
              <div key={direction.id} className="relative">
                <div className="absolute left-2 top-2 z-10">
                  <Checkbox
                    checked={selectedDirections.includes(direction.id)}
                    onCheckedChange={(checked) => handleSelectDirection(direction.id, checked as boolean)}
                  />
                </div>
                <CardDirection direction={direction} />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Heart className="h-12 w-12 text-muted-foreground/50" />
            <h3 className="mt-4 text-lg font-semibold">您还没有关注任何研究方向</h3>
            <p className="mt-2 text-sm text-muted-foreground">关注研究方向可以及时获取该领域的最新研究动态</p>
            <Button className="mt-4" variant="outline">
              浏览研究方向
            </Button>
          </div>
        )}
      </TabsContent>
    </Tabs>
  )
}
