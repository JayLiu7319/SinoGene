"use client"

import { Filter, Search, SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Breadcrumb } from "@/components/breadcrumb"
import { useState } from "react"
import { ResearchersTab } from "./components/researchers-tab"
import { TeamsTab } from "./components/teams-tab"
import { InstitutionsTab } from "./components/institutions-tab"
import { DirectionsTab } from "./components/directions-tab"
import { PapersTab } from "./components/papers-tab"
import { JournalsTab } from "./components/journals-tab"

export default function RankingsPage() {
  // 状态管理
  const [activeTab, setActiveTab] = useState("researchers")

  return (
    <div className="container-content">
      <Breadcrumb segments={[{ name: "排行", href: "/rankings" }]} className="mb-6" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <h1 className="text-3xl font-bold">科研排行</h1>
        <div className="flex items-center gap-2">
          <div className="relative w-full md:w-auto">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="搜索排行..." className="pl-9 w-full md:w-[300px]" />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
            <span className="sr-only">筛选</span>
          </Button>
          <Button variant="outline" size="icon">
            <SlidersHorizontal className="h-4 w-4" />
            <span className="sr-only">高级筛选</span>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="researchers" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full justify-start mb-6 overflow-x-auto">
          <TabsTrigger value="researchers">学者排行</TabsTrigger>
          <TabsTrigger value="teams">团队排行</TabsTrigger>
          <TabsTrigger value="institutions">机构排行</TabsTrigger>
          <TabsTrigger value="directions">方向热度</TabsTrigger>
          <TabsTrigger value="papers">论文影响力</TabsTrigger>
          <TabsTrigger value="journals">期刊影响力</TabsTrigger>
        </TabsList>

        {/* 学者排行 */}
        <TabsContent value="researchers" className="space-y-6">
          <ResearchersTab />
        </TabsContent>

        {/* 团队排行 */}
        <TabsContent value="teams" className="space-y-6">
          <TeamsTab />
        </TabsContent>

        {/* 机构排行 */}
        <TabsContent value="institutions" className="space-y-6">
          <InstitutionsTab />
        </TabsContent>

        {/* 方向热度 */}
        <TabsContent value="directions" className="space-y-6">
          <DirectionsTab />
        </TabsContent>

        {/* 论文影响力 */}
        <TabsContent value="papers" className="space-y-6">
          <PapersTab />
        </TabsContent>

        {/* 期刊影响力 */}
        <TabsContent value="journals" className="space-y-6">
          <JournalsTab />
        </TabsContent>
      </Tabs>
    </div>
  )
}
