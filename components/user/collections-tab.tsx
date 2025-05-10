"use client"

import * as React from "react"
import { Bookmark, Trash2 } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { CardPaper } from "@/components/card-paper"
import { CardResearcher } from "@/components/card-researcher"
import { CardTeam } from "@/components/card-team"
import { CardDirection } from "@/components/card-direction"
import { toast } from "@/components/ui/use-toast"

// 模拟数据
const collectedPapers = [
  {
    id: "paper1",
    title: "单细胞RNA测序揭示人类胚胎发育中的细胞命运决定机制",
    authors: [
      { id: "author1", name: "张伟" },
      { id: "author2", name: "李明" },
      { id: "author3", name: "王芳" },
    ],
    journal: "Nature",
    year: 2023,
    abstract:
      "本研究利用单细胞RNA测序技术，对人类早期胚胎发育过程中的细胞转录组进行了系统分析，揭示了细胞命运决定的分子机制，为理解人类发育提供了新的见解。",
    keywords: ["单细胞测序", "胚胎发育", "细胞命运"],
    doi: "10.1038/s41586-023-12345-6",
    citations: 87,
    coverImage: "https://www.aksomics.com/uploads/2022/02/211636501326.png",
    tags: [
      { type: "top", label: "顶刊" },
      { type: "hot", label: "热门" },
    ],
  },
  {
    id: "paper2",
    title: "CRISPR-Cas9介导的基因编辑在治疗遗传性疾病中的应用进展",
    authors: [
      { id: "author4", name: "陈静" },
      { id: "author5", name: "刘强" },
    ],
    journal: "Cell",
    year: 2023,
    abstract:
      "本综述总结了CRISPR-Cas9基因编辑技术在治疗遗传性疾病中的最新进展，讨论了临床应用面临的挑战和未来发展方向，为基因治疗提供了新的思路。",
    keywords: ["CRISPR-Cas9", "基因编辑", "遗传病"],
    doi: "10.1016/j.cell.2023.54321",
    citations: 65,
    coverImage: "https://iotasciences.com/wp-content/uploads/2024/06/CRISPR-Cas9_mechanism.jpg",
    tags: [
      { type: "top", label: "顶刊" },
      { type: "new", label: "最新" },
    ],
  },
]

const collectedResearchers = [
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

const collectedTeams = [
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

const collectedDirections = [
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

export function CollectionsTab() {
  const [selectedPapers, setSelectedPapers] = React.useState<string[]>([])
  const [selectedResearchers, setSelectedResearchers] = React.useState<string[]>([])
  const [selectedTeams, setSelectedTeams] = React.useState<string[]>([])
  const [selectedDirections, setSelectedDirections] = React.useState<string[]>([])

  const handleSelectPaper = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedPapers([...selectedPapers, id])
    } else {
      setSelectedPapers(selectedPapers.filter((paperId) => paperId !== id))
    }
  }

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

  const handleBatchRemove = (type: string) => {
    let message = ""
    switch (type) {
      case "papers":
        message = `已取消收藏 ${selectedPapers.length} 篇论文`
        setSelectedPapers([])
        break
      case "researchers":
        message = `已取消收藏 ${selectedResearchers.length} 位学者`
        setSelectedResearchers([])
        break
      case "teams":
        message = `已取消收藏 ${selectedTeams.length} 个团队`
        setSelectedTeams([])
        break
      case "directions":
        message = `已取消收藏 ${selectedDirections.length} 个研究方向`
        setSelectedDirections([])
        break
    }

    toast({
      title: "操作成功",
      description: message,
    })
  }

  return (
    <Tabs defaultValue="papers">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="papers">论文</TabsTrigger>
        <TabsTrigger value="researchers">学者</TabsTrigger>
        <TabsTrigger value="teams">团队</TabsTrigger>
        <TabsTrigger value="directions">方向</TabsTrigger>
      </TabsList>

      <TabsContent value="papers" className="space-y-4">
        {selectedPapers.length > 0 && (
          <div className="flex justify-between items-center p-2 bg-muted rounded-lg">
            <div className="text-sm">已选择 {selectedPapers.length} 项</div>
            <Button
              variant="outline"
              size="sm"
              className="gap-1 text-destructive hover:text-destructive"
              onClick={() => handleBatchRemove("papers")}
            >
              <Trash2 className="h-4 w-4" />
              批量取消收藏
            </Button>
          </div>
        )}

        {collectedPapers.length > 0 ? (
          <div className="grid gap-4">
            {collectedPapers.map((paper) => (
              <div key={paper.id} className="relative">
                <div className="absolute left-2 top-2 z-10">
                  <Checkbox
                    checked={selectedPapers.includes(paper.id)}
                    onCheckedChange={(checked) => handleSelectPaper(paper.id, checked as boolean)}
                  />
                </div>
                <CardPaper paper={paper} />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Bookmark className="h-12 w-12 text-muted-foreground/50" />
            <h3 className="mt-4 text-lg font-semibold">您还没有收藏任何论文</h3>
            <p className="mt-2 text-sm text-muted-foreground">浏览论文时，点击收藏按钮将论文添加到您的收藏列表</p>
            <Button className="mt-4" variant="outline">
              浏览论文
            </Button>
          </div>
        )}
      </TabsContent>

      <TabsContent value="researchers" className="space-y-4">
        {selectedResearchers.length > 0 && (
          <div className="flex justify-between items-center p-2 bg-muted rounded-lg">
            <div className="text-sm">已选择 {selectedResearchers.length} 项</div>
            <Button
              variant="outline"
              size="sm"
              className="gap-1 text-destructive hover:text-destructive"
              onClick={() => handleBatchRemove("researchers")}
            >
              <Trash2 className="h-4 w-4" />
              批量取消收藏
            </Button>
          </div>
        )}

        {collectedResearchers.length > 0 ? (
          <div className="grid gap-4">
            {collectedResearchers.map((researcher) => (
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
            <Bookmark className="h-12 w-12 text-muted-foreground/50" />
            <h3 className="mt-4 text-lg font-semibold">您还没有收藏任何学者</h3>
            <p className="mt-2 text-sm text-muted-foreground">浏览学者时，点击收藏按钮将学者添加到您的收藏列表</p>
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
              onClick={() => handleBatchRemove("teams")}
            >
              <Trash2 className="h-4 w-4" />
              批量取消收藏
            </Button>
          </div>
        )}

        {collectedTeams.length > 0 ? (
          <div className="grid gap-4">
            {collectedTeams.map((team) => (
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
            <Bookmark className="h-12 w-12 text-muted-foreground/50" />
            <h3 className="mt-4 text-lg font-semibold">您还没有收藏任何团队</h3>
            <p className="mt-2 text-sm text-muted-foreground">浏览团队时，点击收藏按钮将团队添加到您的收藏列表</p>
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
              onClick={() => handleBatchRemove("directions")}
            >
              <Trash2 className="h-4 w-4" />
              批量取消收藏
            </Button>
          </div>
        )}

        {collectedDirections.length > 0 ? (
          <div className="grid gap-4">
            {collectedDirections.map((direction) => (
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
            <Bookmark className="h-12 w-12 text-muted-foreground/50" />
            <h3 className="mt-4 text-lg font-semibold">您还没有收藏任何研究方向</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              浏览研究方向时，点击收藏按钮将研究方向添加到您的收藏列表
            </p>
            <Button className="mt-4" variant="outline">
              浏览研究方向
            </Button>
          </div>
        )}
      </TabsContent>
    </Tabs>
  )
}
