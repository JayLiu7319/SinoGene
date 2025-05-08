"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import BarChart from "@/components/charts/bar-chart"
import { FilterSidebar } from "./filter-sidebar"
import { Pagination } from "./pagination"
import { paperCitationData, paperRankingData } from "../data"
import { Link2, Info } from "lucide-react"

const paperFilters = [
  {
    label: "排行类型",
    value: "ranking-type",
    options: [
      { label: "引用排行", value: "citations" },
      { label: "Altmetric排行", value: "altmetric" },
      { label: "下载排行", value: "downloads" },
      { label: "最新发表", value: "recent" },
    ],
  },
  {
    label: "研究领域",
    value: "research-field",
    options: [
      { label: "全部领域", value: "all" },
      { label: "基因组学", value: "genomics" },
      { label: "蛋白质组学", value: "proteomics" },
      { label: "免疫学", value: "immunology" },
      { label: "神经科学", value: "neuroscience" },
      { label: "生物信息学", value: "bioinformatics" },
    ],
  },
  {
    label: "期刊",
    value: "journal",
    options: [
      { label: "全部期刊", value: "all" },
      { label: "Nature", value: "nature" },
      { label: "Science", value: "science" },
      { label: "Cell", value: "cell" },
      { label: "Nature Genetics", value: "nature_genetics" },
      { label: "Nature Methods", value: "nature_methods" },
    ],
  },
  {
    label: "时间范围",
    value: "time-range",
    options: [
      { label: "全部时间", value: "all-time" },
      { label: "2023年", value: "2023" },
      { label: "2022年", value: "2022" },
      { label: "近5年", value: "last-5" },
      { label: "近10年", value: "last-10" },
    ],
  },
]

export function PapersTab() {
  return (
    <div className="flex flex-col md:flex-row gap-6">
      <FilterSidebar filters={paperFilters} />

      <div className="flex-1">
        <div className="bg-muted/30 p-4 rounded-lg mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">论文引用排行榜</h2>
            <Badge variant="outline">全部时间</Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            论文引用排行基于论文被引用次数，反映了论文在学术界的影响力和认可度。以下排名展示了生物基因领域被引用次数最多的论文。
          </p>
        </div>

        {/* 论文引用分布图 */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>论文引用分布</CardTitle>
            <CardDescription>生物基因领域论文引用次数分布</CardDescription>
          </CardHeader>
          <CardContent>
            <BarChart
              data={paperCitationData}
              xField="range"
              yField="count"
              height={300}
              config={{
                color: "#1677ff",
                label: {
                  position: "top",
                  style: {
                    fill: "#aaa",
                  },
                },
              }}
            />
          </CardContent>
        </Card>

        <div className="space-y-4">
          {/* 排名列表 */}
          <div className="bg-card rounded-lg border">
            {paperRankingData.map((item) => (
              <div key={item.rank} className="p-4 border-b hover:bg-muted/20 transition-colors">
                <div className="flex items-start gap-3">
                  <div className="bg-primary/10 text-primary rounded-full w-8 h-8 flex items-center justify-center font-bold shrink-0 mt-1">
                    {item.rank}
                  </div>
                  <div>
                    <h4 className="font-medium">
                      <Link href="#" className="hover:text-primary transition-colors">
                        {item.title}
                      </Link>
                    </h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      {item.authors}. {item.journal}, {item.year}
                    </p>
                    <div className="flex flex-wrap gap-4 mt-2">
                      <div className="flex items-center gap-1">
                        <Link2 className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium">引用: {item.citations}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Info className="h-4 w-4 text-primary" />
                        <span className="text-sm">Altmetric: {item.altmetric}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 分页 */}
          <Pagination currentPage={1} totalPages={20} totalItems={100} itemsPerPage={5} />
        </div>
      </div>
    </div>
  )
}
