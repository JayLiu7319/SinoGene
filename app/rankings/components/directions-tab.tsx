"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import LineChart from "@/components/charts/line-chart"
import PieChart from "@/components/charts/pie-chart"
import { FilterSidebar } from "./filter-sidebar"
import { Pagination } from "./pagination"
import { TrendIcon } from "./trend-icon"
import { directionTrendData, directionFieldData, directionRankingData } from "../data"

const directionFilters = [
  {
    label: "排行类型",
    value: "ranking-type",
    options: [
      { label: "热度排行", value: "hotness" },
      { label: "增长率排行", value: "growth" },
      { label: "论文数排行", value: "papers" },
      { label: "学者数排行", value: "researchers" },
    ],
  },
  {
    label: "方向类别",
    value: "direction-type",
    options: [
      { label: "全部类别", value: "all" },
      { label: "基础研究", value: "basic" },
      { label: "应用研究", value: "applied" },
      { label: "技术方法", value: "technology" },
      { label: "临床转化", value: "clinical" },
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

export function DirectionsTab() {
  return (
    <div className="flex flex-col md:flex-row gap-6">
      <FilterSidebar filters={directionFilters} />

      <div className="flex-1">
        <div className="bg-muted/30 p-4 rounded-lg mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">研究方向热度排行榜</h2>
            <Badge variant="outline">2023年度</Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            研究方向热度排行基于论文发表数量、引用增长率、研究者数量、资金投入等多维度指标综合评估。以下排名展示了生物基因领域最热门的研究方向。
          </p>
        </div>

        {/* 热度趋势图 */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>热门方向趋势变化</CardTitle>
            <CardDescription>近6年生物基因领域热门研究方向热度变化趋势</CardDescription>
          </CardHeader>
          <CardContent>
            <LineChart
              data={directionTrendData}
              xField="year"
              yField={["空间转录组学", "RNA修饰与调控", "基因编辑治疗", "多组学整合分析", "肠道菌群与免疫"]}
              height={300}
              config={{
                point: { size: 5, shape: "circle" },
                color: ["#1677ff", "#52c41a", "#faad14", "#f759ab", "#722ed1"],
              }}
            />
          </CardContent>
        </Card>

        {/* 研究方向领域分布 */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>研究方向领域分布</CardTitle>
            <CardDescription>生物基因领域研究方向类别分布</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <PieChart
                data={directionFieldData}
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
            <div className="col-span-3">研究方向</div>
            <div className="col-span-2">父方向</div>
            <div className="col-span-1">热度指数</div>
            <div className="col-span-1">增长率</div>
            <div className="col-span-1">论文数</div>
            <div className="col-span-1">学者数</div>
            <div className="col-span-1">团队数</div>
            <div className="col-span-1">趋势</div>
          </div>

          {/* 排名项目 */}
          {directionRankingData.map((item) => (
            <div key={item.rank} className="grid grid-cols-12 gap-2 p-4 border-b hover:bg-muted/20 transition-colors">
              <div className="col-span-1 flex items-center font-medium">{item.rank}</div>
              <div className="col-span-3 flex items-center">
                <Link href={`/directions/${item.rank}`} className="font-medium hover:text-primary transition-colors">
                  {item.name}
                </Link>
              </div>
              <div className="col-span-2 flex items-center text-muted-foreground">{item.parent}</div>
              <div className="col-span-1 flex items-center font-medium">{item.hotness.toFixed(1)}</div>
              <div className="col-span-1 flex items-center text-success">+{item.growth}%</div>
              <div className="col-span-1 flex items-center text-muted-foreground">{item.papers}</div>
              <div className="col-span-1 flex items-center text-muted-foreground">{item.researchers}</div>
              <div className="col-span-1 flex items-center text-muted-foreground">{item.teams}</div>
              <div className="col-span-1 flex items-center">
                <TrendIcon trend={item.trend} />
              </div>
            </div>
          ))}
        </div>

        {/* 分页 */}
        <Pagination currentPage={1} totalPages={13} totalItems={124} itemsPerPage={10} />
      </div>
    </div>
  )
}
