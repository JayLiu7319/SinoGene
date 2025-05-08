"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Breadcrumb } from "@/components/breadcrumb"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import dynamic from "next/dynamic"

// 使用动态导入，避免服务器端渲染时的问题
const LeafletMap = dynamic(() => import("@/components/maps/leaflet-map"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-[500px] bg-gray-100">
      <p className="text-muted-foreground">加载地图组件中...</p>
    </div>
  ),
})

// 模拟研究机构分布数据
const researchInstitutesData = [
  { lng: 116.3979471, lat: 39.9088569, name: "北京大学", value: 100, papers: 1250, researchers: 85 },
  { lng: 121.4737021, lat: 31.2304306, name: "复旦大学", value: 85, papers: 980, researchers: 72 },
  { lng: 116.3912757, lat: 39.9087362, name: "清华大学", value: 95, papers: 1150, researchers: 80 },
  { lng: 118.7915039, lat: 32.0583799, name: "南京大学", value: 75, papers: 820, researchers: 65 },
  { lng: 120.0848159, lat: 30.2741699, name: "浙江大学", value: 80, papers: 950, researchers: 70 },
  { lng: 113.3004761, lat: 23.1181473, name: "中山大学", value: 70, papers: 780, researchers: 60 },
  { lng: 114.3631439, lat: 30.5426788, name: "武汉大学", value: 65, papers: 720, researchers: 55 },
  { lng: 108.9442139, lat: 34.2583179, name: "西安交通大学", value: 60, papers: 650, researchers: 50 },
  { lng: 126.6302643, lat: 45.7414799, name: "哈尔滨工业大学", value: 55, papers: 600, researchers: 45 },
  { lng: 117.1451569, lat: 39.0853881, name: "南开大学", value: 50, papers: 550, researchers: 40 },
]

// 模拟国际合作机构数据
const internationalCollaborationData = [
  { lng: -71.1167, lat: 42.3736, name: "哈佛大学", value: 90, papers: 450, country: "美国" },
  { lng: -122.1697, lat: 37.4275, name: "斯坦福大学", value: 85, papers: 420, country: "美国" },
  { lng: -0.1278, lat: 51.5074, name: "伦敦大学学院", value: 75, papers: 380, country: "英国" },
  { lng: 2.3522, lat: 48.8566, name: "巴黎大学", value: 70, papers: 350, country: "法国" },
  { lng: 139.7594, lat: 35.6852, name: "东京大学", value: 65, papers: 320, country: "日本" },
  { lng: 151.2093, lat: -33.8688, name: "悉尼大学", value: 60, papers: 300, country: "澳大利亚" },
  { lng: 8.5417, lat: 47.3769, name: "苏黎世联邦理工学院", value: 55, papers: 280, country: "瑞士" },
  { lng: 11.582, lat: 48.1351, name: "慕尼黑大学", value: 50, papers: 250, country: "德国" },
  { lng: 126.978, lat: 37.5665, name: "首尔国立大学", value: 45, papers: 220, country: "韩国" },
  { lng: -79.3832, lat: 43.6532, name: "多伦多大学", value: 40, papers: 200, country: "加拿大" },
]

export default function MapsDemo() {
  const [activeTab, setActiveTab] = useState("domestic")

  return (
    <div className="container-content">
      <Breadcrumb
        segments={[
          { name: "首页", href: "/" },
          { name: "地图演示", href: "/maps-demo" },
        ]}
        className="mb-6"
      />

      <h1 className="text-2xl font-bold mb-6">科研机构地理分布</h1>

      <Tabs
        defaultValue="domestic"
        onValueChange={(value) => {
          setActiveTab(value)
        }}
        className="mb-8"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="domestic">国内研究机构分布</TabsTrigger>
          <TabsTrigger value="international">国际合作机构分布</TabsTrigger>
        </TabsList>
        <TabsContent value="domestic" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>国内主要研究机构分布</CardTitle>
              <CardDescription>展示中国主要研究机构的地理分布，点的大小表示研究规模</CardDescription>
            </CardHeader>
            <CardContent>
              <LeafletMap
                center={[35.8617, 104.1954]} // 中国中心点
                zoom={4}
                height={500}
                points={researchInstitutesData}
                valueField="value"
                colorRange={["#1677ff", "#52c41a", "#faad14"]}
              />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="international" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>国际合作机构分布</CardTitle>
              <CardDescription>展示全球主要合作研究机构的地理分布，点的大小表示合作强度</CardDescription>
            </CardHeader>
            <CardContent>
              <LeafletMap
                center={[20, 0]} // 世界中心点
                zoom={2}
                height={500}
                points={internationalCollaborationData}
                valueField="value"
                colorRange={["#722ed1", "#2f54eb", "#13c2c2"]}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>地图使用说明</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold mb-2">基本操作</h3>
              <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                <li>拖动地图可以平移视图</li>
                <li>使用鼠标滚轮或双指手势可以缩放地图</li>
                <li>点击圆点可以查看机构详细信息</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">图例说明</h3>
              <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                <li>圆点大小表示研究规模或合作强度</li>
                <li>圆点颜色根据数值从低到高变化</li>
                <li>点击圆点可以查看更多属性</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
