"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import BarChart from "@/components/charts/bar-chart"
import PieChart from "@/components/charts/pie-chart"
import { FilterSidebar } from "./filter-sidebar"
import { Pagination } from "./pagination"
import { TrendIcon } from "./trend-icon"
import { journalImpactData, journalTypeData, journalRankingData } from "../data"

const journalFilters = [
  {
    label: "排行类型",
    value: "ranking-type",
    options: [
      { label: "影响因子排行", value: "impact-factor" },
      { label: "H-index排行", value: "h-index" },
      { label: "总引用排行", value: "citations" },
      { label: "论文数排行", value: "papers" },
    ],
  },
  {
    label: "期刊类型",
    value: "journal-type",
    options: [
      { label: "全部类型", value: "all" },
      { label: "综合性期刊", value: "comprehensive" },
      { label: "专业性期刊", value: "specialized" },
      { label: "开放获取期刊", value: "open-access" },
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
]

export function JournalsTab() {
  return (
    <div className="flex flex-col md:flex-row gap-6">
      <FilterSidebar filters={journalFilters} />

      <div className="flex-1">
        <div className="bg-muted/30 p-4 rounded-lg mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">期刊影响因子排行榜</h2>
            <Badge variant="outline">2023年度</Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            期刊影响因子是衡量期刊学术影响力的重要指标，反映了期刊在学术界的地位和认可度。以下排名展示了生物基因领域影响因子最高的期刊。
          </p>
        </div>

        {/* 期刊影响因子对比图 */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>期刊影响因子对比</CardTitle>
            <CardDescription>生物基因领域顶尖期刊影响因子对比</CardDescription>
          </CardHeader>
          <CardContent>
            <BarChart
              data={journalImpactData}
              xField="journal"
              yField="impactFactor"
              height={300}
              isHorizontal={true}
              config={{
                color: "#1677ff",
                label: {
                  position: "right",
                  formatter: (text) => {
                    const num = Number.parseFloat(text)
                    return !isNaN(num) ? num.toFixed(2) : text
                  },
                },
              }}
            />
          </CardContent>
        </Card>

        {/* 期刊类型分布图 */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>期刊类型分布</CardTitle>
            <CardDescription>生物基因领域期刊类型分布</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <PieChart
                data={journalTypeData}
                angleField="value"
                colorField="type"
                height={300}
                config={{
                  radius: 0.8,
                  label: {
                    type: "outer",
                    content: "{name}: {percentage}",
                  },
                  interactions: [{ type: "element-active" }],
                }}
              />
            </div>
          </CardContent>
        </Card>

        {/* 排名列表 */}
        <div className="bg-card rounded-lg border">
          <div className="grid grid-cols-12 gap-2 p-4 font-medium border-b">
            <div className="col-span-1">排名</div>
            <div className="col-span-4">期刊</div>
            <div className="col-span-2">出版商</div>
            <div className="col-span-1">影响因子</div>
            <div className="col-span-1">5年IF</div>
            <div className="col-span-1">H-index</div>
            <div className="col-span-1">CiteScore</div>
            <div className="col-span-1">趋势</div>
          </div>

          {/* 排名项目 */}
          {journalRankingData.map((item) => (
            <div key={item.rank} className="grid grid-cols-12 gap-2 p-4 border-b hover:bg-muted/20 transition-colors">
              <div className="col-span-1 flex items-center font-medium">{item.rank}</div>
              <div className="col-span-4 flex items-center">
                <Link href="#" className="font-medium hover:text-primary transition-colors">
                  {item.name}
                </Link>
              </div>
              <div className="col-span-2 flex items-center text-muted-foreground">{item.publisher}</div>
              <div className="col-span-1 flex items-center font-medium">{item.impactFactor.toFixed(3)}</div>
              <div className="col-span-1 flex items-center text-muted-foreground">{item.fiveYearIF.toFixed(3)}</div>
              <div className="col-span-1 flex items-center text-muted-foreground">{item.hIndex}</div>
              <div className="col-span-1 flex items-center text-muted-foreground">{item.citeScore}</div>
              <div className="col-span-1 flex items-center">
                <TrendIcon trend={item.trend} />
              </div>
            </div>
          ))}
        </div>

        {/* 分页 */}
        <Pagination currentPage={1} totalPages={15} totalItems={150} itemsPerPage={10} />
      </div>
    </div>
  )
}
