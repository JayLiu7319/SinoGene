"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import LineChart from "@/components/charts/line-chart"
import { FilterSidebar } from "./filter-sidebar"
import { Pagination } from "./pagination"
import { TrendIcon } from "./trend-icon"
import { NetworkGraphWrapper } from "./network-graph-wrapper"
import { teamTrendData, teamNetworkData, teamRankingData } from "../data"
import { Users } from "lucide-react"

const teamFilters = [
  {
    label: "排行类型",
    value: "ranking-type",
    options: [
      { label: "影响力排行", value: "impact" },
      { label: "引用排行", value: "citations" },
      { label: "论文数排行", value: "papers" },
      { label: "团队规模排行", value: "members" },
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
    label: "机构类型",
    value: "institution-type",
    options: [
      { label: "全部类型", value: "all" },
      { label: "高校", value: "university" },
      { label: "科研院所", value: "research" },
      { label: "医院", value: "hospital" },
      { label: "企业", value: "company" },
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

export function TeamsTab() {
  return (
    <div className="flex flex-col md:flex-row gap-6">
      <FilterSidebar filters={teamFilters} />

      <div className="flex-1">
        <div className="bg-muted/30 p-4 rounded-lg mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">团队影响力排行榜</h2>
            <Badge variant="outline">2023年度</Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            团队影响力排行基于团队的论文数量、引用次数、高被引论文数量、合作网络广度等多维度指标综合评估。以下排名展示了生物基因领域最具影响力的研究团队。
          </p>
        </div>

        {/* 团队影响力趋势图 */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>顶尖团队影响力趋势</CardTitle>
            <CardDescription>近6年顶尖研究团队影响力指数变化趋势</CardDescription>
          </CardHeader>
          <CardContent>
            <LineChart
              data={teamTrendData}
              xField="year"
              yField={["team1", "team2", "team3"]}
              height={300}
              config={{
                point: { size: 5, shape: "circle" },
                color: ["#1677ff", "#52c41a", "#faad14"],
                legend: {
                  position: "top-right",
                  itemName: {
                    formatter: (text) => {
                      const names = {
                        team1: "基因组学与精准医学团队",
                        team2: "干细胞与再生医学研究团队",
                        team3: "肿瘤免疫治疗研究团队",
                      }
                      return names[text] || text
                    },
                  },
                },
              }}
            />
          </CardContent>
        </Card>

        {/* 团队合作网络图 - 使用NetworkGraphWrapper替代直接使用NetworkGraph */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>顶尖团队合作网络</CardTitle>
            <CardDescription>基因组学与精准医学团队的合作网络关系图</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[400px]">
              <NetworkGraphWrapper data={teamNetworkData} height={400} />
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
              <div className="h-20 w-20 mx-auto bg-muted/50 rounded-full flex items-center justify-center text-primary">
                <Users className="h-10 w-10" />
              </div>
              <h3 className="font-bold text-lg mt-2">
                <Link href="/teams/team2" className="hover:text-primary transition-colors">
                  干细胞与再生医学研究团队
                </Link>
              </h3>
              <p className="text-muted-foreground">中国科学院</p>
              <div className="mt-2 text-2xl font-bold text-primary">影响力指数: 92</div>
              <div className="mt-1 text-sm text-muted-foreground">引用: 14,200 · 论文: 175</div>
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
              <div className="h-24 w-24 mx-auto bg-amber-100 rounded-full flex items-center justify-center text-amber-700">
                <Users className="h-12 w-12" />
              </div>
              <h3 className="font-bold text-xl mt-2">
                <Link href="/teams/team1" className="hover:text-primary transition-colors">
                  基因组学与精准医学团队
                </Link>
              </h3>
              <p className="text-muted-foreground">北京大学</p>
              <div className="mt-2 text-3xl font-bold text-amber-700">影响力指数: 98</div>
              <div className="mt-1 text-sm text-muted-foreground">引用: 18,500 · 论文: 215</div>
            </div>

            {/* 第三名 */}
            <div className="bg-muted/20 rounded-lg p-4 text-center order-3 relative">
              <div className="absolute top-3 left-3 bg-primary/10 text-primary rounded-full w-8 h-8 flex items-center justify-center font-bold">
                3
              </div>
              <div className="h-20 w-20 mx-auto bg-muted/50 rounded-full flex items-center justify-center text-primary">
                <Users className="h-10 w-10" />
              </div>
              <h3 className="font-bold text-lg mt-2">
                <Link href="/teams/team3" className="hover:text-primary transition-colors">
                  肿瘤免疫治疗研究团队
                </Link>
              </h3>
              <p className="text-muted-foreground">复旦大学</p>
              <div className="mt-2 text-2xl font-bold text-primary">影响力指数: 87</div>
              <div className="mt-1 text-sm text-muted-foreground">引用: 16,800 · 论文: 195</div>
            </div>
          </div>

          {/* 排名列表 */}
          <div className="bg-card rounded-lg border">
            <div className="grid grid-cols-12 gap-2 p-4 font-medium border-b">
              <div className="col-span-1">排名</div>
              <div className="col-span-4">团队</div>
              <div className="col-span-2">机构</div>
              <div className="col-span-1">影响力</div>
              <div className="col-span-1">成员</div>
              <div className="col-span-1">论文</div>
              <div className="col-span-1">引用</div>
              <div className="col-span-1">趋势</div>
            </div>

            {/* 排名项目 */}
            {teamRankingData.map((item) => (
              <div key={item.rank} className="grid grid-cols-12 gap-2 p-4 border-b hover:bg-muted/20 transition-colors">
                <div className="col-span-1 flex items-center font-medium">{item.rank}</div>
                <div className="col-span-4 flex items-center">
                  <Link href="#" className="font-medium hover:text-primary transition-colors">
                    {item.name}
                  </Link>
                </div>
                <div className="col-span-2 flex items-center text-muted-foreground">{item.institution}</div>
                <div className="col-span-1 flex items-center font-medium">{item.impact}</div>
                <div className="col-span-1 flex items-center text-muted-foreground">{item.members}</div>
                <div className="col-span-1 flex items-center text-muted-foreground">{item.papers}</div>
                <div className="col-span-1 flex items-center text-muted-foreground">
                  {(item.citations / 1000).toFixed(1)}k
                </div>
                <div className="col-span-1 flex items-center">
                  <TrendIcon trend={item.trend} />
                </div>
              </div>
            ))}
          </div>

          {/* 分页 */}
          <Pagination currentPage={1} totalPages={9} totalItems={85} itemsPerPage={10} />
        </div>
      </div>
    </div>
  )
}
