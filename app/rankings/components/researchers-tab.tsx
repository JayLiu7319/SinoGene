"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { FilterSidebar } from "./filter-sidebar"
import { Pagination } from "./pagination"
import { TrendIcon } from "./trend-icon"
import { MapWrapper } from "./map-wrapper"
import { ChartWrapper } from "./chart-wrapper"
import { researcherTrendData, researcherMapData, researcherRankingData } from "../data"

const researcherFilters = [
  {
    label: "排行类型",
    value: "ranking-type",
    options: [
      { label: "H-index排行", value: "h-index" },
      { label: "引用排行", value: "citations" },
      { label: "论文数排行", value: "papers" },
      { label: "影响力排行", value: "impact" },
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
    label: "地区",
    value: "region",
    options: [
      { label: "全部地区", value: "all" },
      { label: "中国", value: "china" },
      { label: "美国", value: "usa" },
      { label: "欧洲", value: "europe" },
      { label: "亚洲(不含中国)", value: "asia" },
      { label: "其他地区", value: "other" },
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

export function ResearchersTab() {
  return (
    <div className="flex flex-col md:flex-row gap-6">
      <FilterSidebar filters={researcherFilters} />

      <div className="flex-1">
        <div className="bg-muted/30 p-4 rounded-lg mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">H-index排行榜</h2>
            <Badge variant="outline">2023年度</Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            H-index是衡量学者学术影响力的重要指标，它同时考虑了学者的论文数量和被引用次数。以下排名基于各学者在生物基因领域的H-index值。
          </p>
        </div>

        {/* 学者分布地图 - 使用MapWrapper替代直接使用LeafletMap */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>学者地理分布</CardTitle>
            <CardDescription>中国生物基因领域顶尖学者分布</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[400px]">
              <MapWrapper
                points={researcherMapData}
                valueField="value"
                colorRange={["#1677ff", "#52c41a", "#faad14"]}
                height={400}
              />
            </div>
          </CardContent>
        </Card>

        {/* 学者指标趋势图 - 使用ChartWrapper替代直接使用LineChart */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>学者指标趋势</CardTitle>
            <CardDescription>近6年顶尖学者H-index、引用和论文数量变化趋势</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium mb-2">H-index趋势</h3>
                <ChartWrapper
                  type="line"
                  data={researcherTrendData}
                  xField="year"
                  yField="h_index"
                  height={250}
                  config={{
                    point: { size: 5, shape: "circle" },
                    color: "#1677ff",
                  }}
                />
              </div>
              <div>
                <h3 className="text-sm font-medium mb-2">引用与论文数趋势</h3>
                <ChartWrapper
                  type="line"
                  data={researcherTrendData}
                  xField="year"
                  yField={["citations", "papers"]}
                  height={250}
                  config={{
                    point: { size: 5, shape: "circle" },
                    color: ["#52c41a", "#faad14"],
                  }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          {/* 前三名 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {/* 第二名 */}
            <div className="bg-muted/20 rounded-lg p-4 text-center order-2 md:order-1 relative">
              <div className="absolute top-3 left-3 bg-primary/10 text-primary rounded-full w-8 h-8 flex items-center justify-center font-bold">
                2
              </div>
              <Avatar className="h-20 w-20 mx-auto border-2 border-primary/30">
                <AvatarImage src="/placeholder.svg?key=l0zzh" alt="李明" />
                <AvatarFallback className="text-xl">李明</AvatarFallback>
              </Avatar>
              <h3 className="font-bold text-lg mt-2">
                <Link href="/researchers/researcher2" className="hover:text-primary transition-colors">
                  李明
                </Link>
              </h3>
              <p className="text-muted-foreground">中国科学院</p>
              <div className="mt-2 text-2xl font-bold text-primary">H-index: 38</div>
              <div className="mt-1 text-sm text-muted-foreground">引用: 9,800 · 论文: 95</div>
            </div>

            {/* 第一名 */}
            <div className="bg-gradient-to-b from-amber-50 to-amber-100/30 rounded-lg p-4 text-center order-1 md:order-2 relative border border-amber-200">
              <div className="absolute top-3 left-3 bg-amber-100 text-amber-700 rounded-full w-8 h-8 flex items-center justify-center font-bold">
                1
              </div>
              <div className="absolute top-2 right-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-amber-500"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              </div>
              <Avatar className="h-24 w-24 mx-auto border-2 border-amber-300">
                <AvatarImage src="/placeholder.svg?key=yj1ck" alt="张伟" />
                <AvatarFallback className="text-2xl">张伟</AvatarFallback>
              </Avatar>
              <h3 className="font-bold text-xl mt-2">
                <Link href="/researchers/researcher1" className="hover:text-primary transition-colors">
                  张伟
                </Link>
              </h3>
              <p className="text-muted-foreground">北京大学</p>
              <div className="mt-2 text-3xl font-bold text-amber-700">H-index: 45</div>
              <div className="mt-1 text-sm text-muted-foreground">引用: 12,500 · 论文: 120</div>
            </div>

            {/* 第三名 */}
            <div className="bg-muted/20 rounded-lg p-4 text-center order-3 relative">
              <div className="absolute top-3 left-3 bg-primary/10 text-primary rounded-full w-8 h-8 flex items-center justify-center font-bold">
                3
              </div>
              <Avatar className="h-20 w-20 mx-auto border-2 border-primary/30">
                <AvatarImage src="/placeholder.svg?key=aussd" alt="王芳" />
                <AvatarFallback className="text-xl">王芳</AvatarFallback>
              </Avatar>
              <h3 className="font-bold text-lg mt-2">
                <Link href="/researchers/researcher3" className="hover:text-primary transition-colors">
                  王芳
                </Link>
              </h3>
              <p className="text-muted-foreground">复旦大学</p>
              <div className="mt-2 text-2xl font-bold text-primary">H-index: 36</div>
              <div className="mt-1 text-sm text-muted-foreground">引用: 11,200 · 论文: 105</div>
            </div>
          </div>

          {/* 排名列表 */}
          <div className="bg-card rounded-lg border">
            <div className="grid grid-cols-12 gap-2 p-4 font-medium border-b">
              <div className="col-span-1">排名</div>
              <div className="col-span-3">学者</div>
              <div className="col-span-3">机构</div>
              <div className="col-span-2">H-index</div>
              <div className="col-span-1">引用</div>
              <div className="col-span-1">论文</div>
              <div className="col-span-1">趋势</div>
            </div>

            {/* 排名项目 */}
            {researcherRankingData.map((item) => (
              <div key={item.rank} className="grid grid-cols-12 gap-2 p-4 border-b hover:bg-muted/20 transition-colors">
                <div className="col-span-1 flex items-center font-medium">{item.rank}</div>
                <div className="col-span-3 flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={item.avatar || "/placeholder.svg"} alt={item.name} />
                    <AvatarFallback>{item.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <Link href="#" className="font-medium hover:text-primary transition-colors">
                    {item.name}
                  </Link>
                </div>
                <div className="col-span-3 flex items-center text-muted-foreground">{item.institution}</div>
                <div className="col-span-2 flex items-center font-medium">{item.hIndex}</div>
                <div className="col-span-1 flex items-center text-muted-foreground">
                  {(item.citations / 1000).toFixed(1)}k
                </div>
                <div className="col-span-1 flex items-center text-muted-foreground">{item.papers}</div>
                <div className="col-span-1 flex items-center">
                  <TrendIcon trend={item.trend} />
                </div>
              </div>
            ))}
          </div>

          {/* 分页 */}
          <Pagination currentPage={1} totalPages={10} totalItems={100} itemsPerPage={10} />
        </div>
      </div>
    </div>
  )
}
