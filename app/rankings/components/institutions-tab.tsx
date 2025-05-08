"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { FilterSidebar } from "./filter-sidebar"
import { Pagination } from "./pagination"
import { TrendIcon } from "./trend-icon"
import { MapWrapper } from "./map-wrapper"
import { institutionMapData, institutionRankingData } from "../data"

const institutionFilters = [
  {
    label: "排行类型",
    value: "ranking-type",
    options: [
      { label: "综合排行", value: "comprehensive" },
      { label: "论文产出排行", value: "papers" },
      { label: "引用排行", value: "citations" },
      { label: "人才培养排行", value: "talents" },
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
    label: "地区",
    value: "region",
    options: [
      { label: "全部地区", value: "all" },
      { label: "华北", value: "north" },
      { label: "华东", value: "east" },
      { label: "华南", value: "south" },
      { label: "华中", value: "central" },
      { label: "西南", value: "southwest" },
      { label: "西北", value: "northwest" },
      { label: "东北", value: "northeast" },
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

export function InstitutionsTab() {
  return (
    <div className="flex flex-col md:flex-row gap-6">
      <FilterSidebar filters={institutionFilters} />

      <div className="flex-1">
        <div className="bg-muted/30 p-4 rounded-lg mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">机构综合排行榜</h2>
            <Badge variant="outline">2023年度</Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            机构综合排行基于科研产出、人才培养、学术影响力、国际合作等多维度指标综合评估。以下排名展示了生物基因领域最具影响力的科研机构。
          </p>
        </div>

        {/* 机构地图分布 - 使用MapWrapper替代直接使用LeafletMap */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>机构地理分布</CardTitle>
            <CardDescription>中国生物基因领域科研机构分布热力图</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[400px]">
              <MapWrapper
                points={institutionMapData}
                valueField="value"
                colorRange={["#1677ff", "#52c41a", "#faad14"]}
                height={400}
              />
            </div>
          </CardContent>
        </Card>

        {/* 排名列表 */}
        <div className="bg-card rounded-lg border">
          <div className="grid grid-cols-12 gap-2 p-4 font-medium border-b">
            <div className="col-span-1">排名</div>
            <div className="col-span-3">机构</div>
            <div className="col-span-2">类型</div>
            <div className="col-span-1">综合指数</div>
            <div className="col-span-1">团队数</div>
            <div className="col-span-1">学者数</div>
            <div className="col-span-1">论文数</div>
            <div className="col-span-1">引用数</div>
            <div className="col-span-1">趋势</div>
          </div>

          {/* 排名项目 */}
          {institutionRankingData.map((item) => (
            <div key={item.rank} className="grid grid-cols-12 gap-2 p-4 border-b hover:bg-muted/20 transition-colors">
              <div className="col-span-1 flex items-center font-medium">{item.rank}</div>
              <div className="col-span-3 flex items-center">
                <Link href="#" className="font-medium hover:text-primary transition-colors">
                  {item.name}
                </Link>
              </div>
              <div className="col-span-2 flex items-center text-muted-foreground">{item.type}</div>
              <div className="col-span-1 flex items-center font-medium">{item.score}</div>
              <div className="col-span-1 flex items-center text-muted-foreground">{item.teams}</div>
              <div className="col-span-1 flex items-center text-muted-foreground">{item.researchers}</div>
              <div className="col-span-1 flex items-center text-muted-foreground">{item.papers}</div>
              <div className="col-span-1 flex items-center text-muted-foreground">
                {(item.citations / 1000).toFixed(0)}k
              </div>
              <div className="col-span-1 flex items-center">
                <TrendIcon trend={item.trend} />
              </div>
            </div>
          ))}
        </div>

        {/* 分页 */}
        <Pagination currentPage={1} totalPages={12} totalItems={120} itemsPerPage={10} />
      </div>
    </div>
  )
}
