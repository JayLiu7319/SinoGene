"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, ExternalLink, Heart, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Breadcrumb } from "@/components/breadcrumb"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import LineChart from "@/components/charts/line-chart"
import BarChart from "@/components/charts/bar-chart"
import PieChart from "@/components/charts/pie-chart"
import NetworkGraph from "@/components/charts/network-graph"
import LeafletMap from "@/components/maps/leaflet-map"

// 模拟数据 - 研究趋势
const trendData = [
  { year: 2016, papers: 15, citations: 45 },
  { year: 2017, papers: 28, citations: 120 },
  { year: 2018, papers: 42, citations: 310 },
  { year: 2019, papers: 68, citations: 580 },
  { year: 2020, papers: 95, citations: 980 },
  { year: 2021, papers: 135, citations: 1650 },
  { year: 2022, papers: 180, citations: 2450 },
  { year: 2023, papers: 230, citations: 3200 },
]

// 模拟数据 - 技术比较
const techComparisonData = [
  { tech: "Visium", resolution: 55, genes: 100, cost: 80, ease: 90 },
  { tech: "Slide-seq", resolution: 85, genes: 90, cost: 70, ease: 60 },
  { tech: "MERFISH", resolution: 95, genes: 60, cost: 50, ease: 40 },
  { tech: "seqFISH+", resolution: 90, genes: 80, cost: 40, ease: 30 },
  { tech: "Stereo-seq", resolution: 98, genes: 95, cost: 30, ease: 20 },
]

// 模拟数据 - 应用领域分布
const applicationFieldsData = [
  { field: "发育生物学", value: 35 },
  { field: "肿瘤生物学", value: 25 },
  { field: "神经科学", value: 20 },
  { field: "免疫学", value: 12 },
  { field: "组织病理学", value: 8 },
]

// 模拟数据 - 期刊分布
const journalDistributionData = [
  { journal: "Nature", value: 28 },
  { journal: "Science", value: 22 },
  { journal: "Cell", value: 18 },
  { journal: "Nature Methods", value: 12 },
  { journal: "Nature Biotechnology", value: 10 },
  { journal: "其他", value: 10 },
]

// 模拟数据 - 研究机构分布
const researchInstitutesData = [
  { name: "北京大学", lat: 39.9937, lng: 116.3059, value: 85, papers: 42, researchers: 18 },
  { name: "清华大学", lat: 40.0096, lng: 116.3206, value: 78, papers: 38, researchers: 15 },
  { name: "中国科学院", lat: 39.9847, lng: 116.3176, value: 92, papers: 45, researchers: 22 },
  { name: "复旦大学", lat: 31.2976, lng: 121.5045, value: 65, papers: 32, researchers: 14 },
  { name: "上海交通大学", lat: 31.2017, lng: 121.4273, value: 60, papers: 30, researchers: 12 },
  { name: "浙江大学", lat: 30.259, lng: 120.1253, value: 55, papers: 28, researchers: 11 },
  { name: "中山大学", lat: 23.0965, lng: 113.2988, value: 50, papers: 25, researchers: 10 },
  { name: "武汉大学", lat: 30.5383, lng: 114.3621, value: 45, papers: 22, researchers: 9 },
]

// 模拟数据 - 国际合作机构
const internationalInstitutesData = [
  { name: "哈佛大学", lat: 42.377, lng: -71.1167, value: 90, papers: 45, country: "美国" },
  { name: "斯坦福大学", lat: 37.4275, lng: -122.1697, value: 85, papers: 42, country: "美国" },
  { name: "麻省理工学院", lat: 42.3601, lng: -71.0942, value: 80, papers: 40, country: "美国" },
  { name: "牛津大学", lat: 51.7548, lng: -1.2544, value: 75, papers: 38, country: "英国" },
  { name: "剑桥大学", lat: 52.2043, lng: 0.1149, value: 70, papers: 35, country: "英国" },
  { name: "东京大学", lat: 35.7128, lng: 139.7621, value: 65, papers: 32, country: "日本" },
  { name: "首尔国立大学", lat: 37.4591, lng: 126.952, value: 60, papers: 30, country: "韩国" },
  { name: "多伦多大学", lat: 43.6629, lng: -79.3957, value: 55, papers: 28, country: "加拿大" },
]

// 模拟数据 - 合作网络
const collaborationNetworkData = {
  nodes: [
    { id: "1", label: "空间转录组学", cluster: "self", size: 30 },
    { id: "2", label: "单细胞测序", cluster: "related", size: 25 },
    { id: "3", label: "空间组织学", cluster: "related", size: 20 },
    { id: "4", label: "基因表达", cluster: "related", size: 18 },
    { id: "5", label: "组织病理学", cluster: "related", size: 15 },
    { id: "6", label: "发育生物学", cluster: "application", size: 22 },
    { id: "7", label: "肿瘤生物学", cluster: "application", size: 20 },
    { id: "8", label: "神经科学", cluster: "application", size: 18 },
    { id: "9", label: "免疫学", cluster: "application", size: 15 },
    { id: "10", label: "多组学整合", cluster: "tech", size: 17 },
    { id: "11", label: "AI分析", cluster: "tech", size: 16 },
    { id: "12", label: "图像处理", cluster: "tech", size: 14 },
  ],
  edges: [
    { source: "1", target: "2", weight: 5 },
    { source: "1", target: "3", weight: 5 },
    { source: "1", target: "4", weight: 4 },
    { source: "1", target: "5", weight: 3 },
    { source: "1", target: "6", weight: 4 },
    { source: "1", target: "7", weight: 4 },
    { source: "1", target: "8", weight: 3 },
    { source: "1", target: "9", weight: 2 },
    { source: "1", target: "10", weight: 3 },
    { source: "1", target: "11", weight: 2 },
    { source: "1", target: "12", weight: 2 },
    { source: "2", target: "3", weight: 3 },
    { source: "2", target: "4", weight: 4 },
    { source: "2", target: "10", weight: 3 },
    { source: "3", target: "5", weight: 3 },
    { source: "3", target: "12", weight: 2 },
    { source: "4", target: "11", weight: 2 },
    { source: "6", target: "7", weight: 1 },
    { source: "7", target: "9", weight: 2 },
    { source: "8", target: "12", weight: 1 },
    { source: "10", target: "11", weight: 2 },
  ],
}

export default function DirectionDetailPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="container-content">
      <Breadcrumb
        segments={[
          { name: "方向", href: "/directions" },
          { name: "方向详情", href: `/directions/${params.id}` },
        ]}
        className="mb-6"
      />

      <div className="mb-4">
        {/* 标题区域 */}
        <div className="flex justify-between items-start gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                <h1 className="text-2xl font-bold">空间转录组学</h1>
                <div className="flex flex-wrap gap-1">
                  <Badge variant="secondary" className="bg-green-50 text-green-700 border-green-200">
                    新兴方向
                  </Badge>
                  <Badge variant="secondary" className="bg-orange-50 text-orange-700 border-orange-200">
                    热门
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <Button variant="outline" size="sm" className="gap-1">
              <ExternalLink className="h-3.5 w-3.5" />
              相关资源
            </Button>
            <Button variant="outline" size="sm" className="gap-1">
              <Heart className="h-3.5 w-3.5" />
              关注
            </Button>
            <Button variant="outline" size="icon" asChild>
              <Link href="/directions">
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">返回</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Link href="/directions/parent1" className="hover:text-primary transition-colors">
            单细胞生物学
          </Link>
          <span>·</span>
          <div className="flex items-center gap-1 text-success">
            <TrendingUp className="h-4 w-4" />
            <span>上升趋势 (45%)</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mt-4">
          <Badge variant="secondary">单细胞测序</Badge>
          <Badge variant="secondary">空间组织学</Badge>
          <Badge variant="secondary">基因表达</Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">
        <div>
          {/* 方向主体内容 */}
          <div className="space-y-8">
            {/* 方向内容标签页 */}
            <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-6">
                <TabsTrigger value="overview">概览</TabsTrigger>
                <TabsTrigger value="methods">研究方法</TabsTrigger>
                <TabsTrigger value="papers">热门论文</TabsTrigger>
                <TabsTrigger value="researchers">相关学者</TabsTrigger>
                <TabsTrigger value="teams">相关团队</TabsTrigger>
                <TabsTrigger value="trends">趋势分析</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="space-y-6 pt-4">
                <div>
                  <h3 className="text-lg font-semibold mb-3">方向定义</h3>
                  <div className="prose max-w-none">
                    <p>
                      空间转录组学是一种新兴的技术和研究领域，它结合了单细胞RNA测序和空间分辨技术，可以在保留空间信息的同时分析组织中基因表达的空间分布。这一技术为理解复杂组织的功能和疾病机制提供了新的视角。
                    </p>
                    <p>
                      与传统的单细胞RNA测序不同，空间转录组学技术能够保留细胞在组织中的位置信息，从而揭示基因表达的空间模式和细胞间相互作用。这对于研究发育过程、疾病进展和组织微环境尤为重要。
                    </p>
                  </div>
                </div>

                {/* 添加研究趋势图表 */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">研究趋势</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">论文发表趋势</h4>
                      <LineChart
                        data={trendData}
                        xField="year"
                        yField="papers"
                        height={250}
                        config={{
                          point: { size: 5, shape: "circle" },
                          label: { style: { fill: "#aaa" } },
                        }}
                      />
                    </div>
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">引用趋势</h4>
                      <LineChart
                        data={trendData}
                        xField="year"
                        yField="citations"
                        height={250}
                        config={{
                          point: { size: 5, shape: "circle" },
                          label: { style: { fill: "#aaa" } },
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">主要应用领域</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <h4 className="font-medium mb-2">发育生物学</h4>
                      <p className="text-sm text-muted-foreground">
                        研究胚胎发育过程中的基因表达空间模式，揭示细胞命运决定和组织形成的分子机制。
                      </p>
                    </div>
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <h4 className="font-medium mb-2">肿瘤生物学</h4>
                      <p className="text-sm text-muted-foreground">
                        分析肿瘤微环境中不同细胞类型的空间分布和相互作用，理解肿瘤异质性和免疫逃逸机制。
                      </p>
                    </div>
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <h4 className="font-medium mb-2">神经科学</h4>
                      <p className="text-sm text-muted-foreground">
                        研究大脑不同区域的基因表达模式，揭示神经元类型多样性和神经环路功能。
                      </p>
                    </div>
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <h4 className="font-medium mb-2">组织病理学</h4>
                      <p className="text-sm text-muted-foreground">
                        结合传统病理学和分子分析，提高疾病诊断的精准度和个体化治疗策略的制定。
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">发展历程</h3>
                  <div className="relative">
                    <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-muted-foreground/20"></div>
                    <div className="space-y-6 relative">
                      <div className="relative pl-10">
                        <div className="absolute left-0 top-1.5 h-6 w-6 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs">
                          1
                        </div>
                        <h4 className="font-medium">早期技术 (2016-2018)</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          最早的空间转录组学技术如空间转录组测序(Spatial
                          Transcriptomics)和FISH技术的改进版本开始出现，但分辨率和通量有限。
                        </p>
                      </div>
                      <div className="relative pl-10">
                        <div className="absolute left-0 top-1.5 h-6 w-6 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs">
                          2
                        </div>
                        <h4 className="font-medium">技术突破 (2019-2020)</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          Slide-seq、Visium和MERFISH等技术的出现大幅提高了空间分辨率和基因检测数量，使空间转录组学研究进入快速发展阶段。
                        </p>
                      </div>
                      <div className="relative pl-10">
                        <div className="absolute left-0 top-1.5 h-6 w-6 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs">
                          3
                        </div>
                        <h4 className="font-medium">广泛应用 (2021-至今)</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          空间转录组学技术在多个领域得到广泛应用，并与其他组学技术如空间蛋白质组学、空间表观基因组学等结合，形成多组学空间分析方法。
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">关键指标</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="bg-muted/50 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-primary">450</div>
                      <div className="text-sm text-muted-foreground">论文数</div>
                    </div>
                    <div className="bg-muted/50 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-primary">120</div>
                      <div className="text-sm text-muted-foreground">学者数</div>
                    </div>
                    <div className="bg-muted/50 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-primary">35</div>
                      <div className="text-sm text-muted-foreground">团队数</div>
                    </div>
                    <div className="bg-muted/50 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-primary">9/10</div>
                      <div className="text-sm text-muted-foreground">热度指数</div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="methods" className="space-y-6 pt-4">
                <div>
                  <h3 className="text-lg font-semibold mb-3">主要技术方法</h3>
                  <div className="space-y-6">
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">空间转录组测序 (Spatial Transcriptomics)</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        使用带有空间条形码的捕获探针阵列，将组织切片放置在阵列上，RNA分子被捕获并标记空间位置，然后进行测序分析。
                      </p>
                      <Image
                        src="/placeholder.svg?key=vvefo"
                        alt="空间转录组测序工作流程"
                        width={600}
                        height={200}
                        className="rounded-lg w-full"
                      />
                    </div>
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">原位杂交技术 (FISH-based methods)</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        包括MERFISH、seqFISH+等技术，通过荧光原位杂交方法直接在组织切片上检测RNA分子，具有高空间分辨率。
                      </p>
                      <Image
                        src="/placeholder.svg?key=4z9l5"
                        alt="MERFISH技术示意图"
                        width={600}
                        height={200}
                        className="rounded-lg w-full"
                      />
                    </div>
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">Slide-seq/Visium</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        使用带有DNA条形码的微珠阵列捕获组织切片中的RNA，每个微珠对应一个空间位置，通过测序获得空间转录组数据。
                      </p>
                      <Image
                        src="/placeholder.svg?key=85gj8"
                        alt="Visium空间转录组技术"
                        width={600}
                        height={200}
                        className="rounded-lg w-full"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">数据分析方法</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-1">空间聚类分析</h4>
                      <p className="text-sm text-muted-foreground">
                        基于基因表达模式和空间位置信息，识别具有相似特征的细胞或区域，揭示组织的空间结构。
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">空间差异表达分析</h4>
                      <p className="text-sm text-muted-foreground">
                        识别在不同空间区域特异表达的基因，揭示区域特异性的分子特征和功能。
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">空间轨迹分析</h4>
                      <p className="text-sm text-muted-foreground">
                        结合空间信息和基因表达动态，推断细胞发育轨迹和分化路径的空间分布。
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">细胞-细胞相互作用分析</h4>
                      <p className="text-sm text-muted-foreground">
                        基于配体-受体表达和空间邻近关系，预测细胞间通讯网络和信号传导路径。
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">多组学数据整合</h4>
                      <p className="text-sm text-muted-foreground">
                        将空间转录组数据与单细胞RNA-seq、空间蛋白质组学等数据整合，获得更全面的分子空间图谱。
                      </p>
                    </div>
                  </div>
                </div>

                {/* 添加技术比较图表 */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">技术比较</h3>
                  <div className="space-y-6">
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-3">空间分辨率比较</h4>
                      <BarChart
                        data={techComparisonData}
                        xField="tech"
                        yField="resolution"
                        height={250}
                        config={{
                          label: { position: "top" },
                          color: "#1677ff",
                        }}
                      />
                      <div className="text-xs text-center text-muted-foreground mt-2">
                        各技术的空间分辨率比较（值越高表示分辨率越好）
                      </div>
                    </div>
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-3">基因检测能力比较</h4>
                      <BarChart
                        data={techComparisonData}
                        xField="tech"
                        yField="genes"
                        height={250}
                        config={{
                          label: { position: "top" },
                          color: "#52c41a",
                        }}
                      />
                      <div className="text-xs text-center text-muted-foreground mt-2">
                        各技术的基因检测能力比较（值越高表示检测基因数越多）
                      </div>
                    </div>
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-3">综合比较</h4>
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                          <thead>
                            <tr className="bg-muted/50">
                              <th className="border px-4 py-2 text-left">技术</th>
                              <th className="border px-4 py-2 text-left">空间分辨率</th>
                              <th className="border px-4 py-2 text-left">基因检测数</th>
                              <th className="border px-4 py-2 text-left">优势</th>
                              <th className="border px-4 py-2 text-left">局限性</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="border px-4 py-2">Visium</td>
                              <td className="border px-4 py-2">55μm (spot)</td>
                              <td className="border px-4 py-2">全转录组</td>
                              <td className="border px-4 py-2">易于使用，商业化成熟</td>
                              <td className="border px-4 py-2">分辨率有限，无法分辨单个细胞</td>
                            </tr>
                            <tr>
                              <td className="border px-4 py-2">Slide-seq</td>
                              <td className="border px-4 py-2">10μm (bead)</td>
                              <td className="border px-4 py-2">全转录组</td>
                              <td className="border px-4 py-2">高分辨率，接近单细胞水平</td>
                              <td className="border px-4 py-2">技术复杂，检测敏感性较低</td>
                            </tr>
                            <tr>
                              <td className="border px-4 py-2">MERFISH</td>
                              <td className="border px-4 py-2">单细胞</td>
                              <td className="border px-4 py-2">~1000个</td>
                              <td className="border px-4 py-2">单细胞分辨率，高灵敏度</td>
                              <td className="border px-4 py-2">基因数有限，实验复杂</td>
                            </tr>
                            <tr>
                              <td className="border px-4 py-2">seqFISH+</td>
                              <td className="border px-4 py-2">单细胞</td>
                              <td className="border px-4 py-2">~10000个</td>
                              <td className="border px-4 py-2">单细胞分辨率，基因数较多</td>
                              <td className="border px-4 py-2">实验复杂，成本高</td>
                            </tr>
                            <tr>
                              <td className="border px-4 py-2">Stereo-seq</td>
                              <td className="border px-4 py-2">0.5-2μm</td>
                              <td className="border px-4 py-2">全转录组</td>
                              <td className="border px-4 py-2">超高分辨率，全转录组</td>
                              <td className="border px-4 py-2">数据量大，分析复杂</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="papers" className="pt-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold">热门论文</h3>
                  <Button variant="outline" size="sm">
                    查看全部
                  </Button>
                </div>
                <div className="space-y-6">
                  {/* 这里使用之前定义的CardPaper组件，但为简化只展示几个示例 */}
                  <div className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start gap-2">
                      <h4 className="font-medium">
                        <Link href="#" className="hover:text-primary transition-colors">
                          Spatially resolved transcriptomics reveals the architecture of the human brain
                        </Link>
                      </h4>
                      <Badge>高被引</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">Chen X, Wang Y, Zhang W, et al. Nature, 2022</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      本研究利用高分辨率空间转录组学技术，绘制了人类大脑的分子空间图谱，揭示了不同脑区的基因表达模式和细胞类型分布，为理解大脑功能和疾病提供了新的视角。
                    </p>
                    <div className="flex justify-between items-center mt-2">
                      <div className="flex gap-2">
                        <Badge variant="outline">空间转录组学</Badge>
                        <Badge variant="outline">神经科学</Badge>
                      </div>
                      <div className="text-sm">引用: 245</div>
                    </div>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start gap-2">
                      <h4 className="font-medium">
                        <Link href="#" className="hover:text-primary transition-colors">
                          Spatial multi-omics map of tumor microenvironment reveals immunotherapy resistance mechanisms
                        </Link>
                      </h4>
                      <Badge variant="secondary">热门</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">Li J, Zhao M, Liu Y, et al. Science, 2023</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      该研究结合空间转录组学和空间蛋白质组学技术，构建了肿瘤微环境的多组学空间图谱，揭示了免疫治疗抵抗机制的空间异质性，为优化免疫治疗策略提供了新思路。
                    </p>
                    <div className="flex justify-between items-center mt-2">
                      <div className="flex gap-2">
                        <Badge variant="outline">空间多组学</Badge>
                        <Badge variant="outline">肿瘤免疫</Badge>
                      </div>
                      <div className="text-sm">引用: 178</div>
                    </div>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start gap-2">
                      <h4 className="font-medium">
                        <Link href="#" className="hover:text-primary transition-colors">
                          Stereo-seq reveals spatial trajectories of embryonic development with single-cell resolution
                        </Link>
                      </h4>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">Wang X, Liu H, Chen J, et al. Cell, 2022</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      本研究开发了超高分辨率的Stereo-seq空间转录组学技术，并应用于小鼠胚胎发育研究，揭示了发育过程中的空间基因表达动态和细胞命运决定机制。
                    </p>
                    <div className="flex justify-between items-center mt-2">
                      <div className="flex gap-2">
                        <Badge variant="outline">Stereo-seq</Badge>
                        <Badge variant="outline">发育生物学</Badge>
                      </div>
                      <div className="text-sm">引用: 156</div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="researchers" className="pt-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold">相关学者</h3>
                  <Button variant="outline" size="sm">
                    查看全部
                  </Button>
                </div>
                <div className="grid gap-6 md:grid-cols-2">
                  {/* 这里使用之前定义的CardResearcher组件，但为简化只展示几个示例 */}
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-16 w-16 border">
                        <AvatarImage src="/placeholder.svg?key=yt6ub" alt="张伟" />
                        <AvatarFallback className="text-lg">张伟</AvatarFallback>
                      </Avatar>
                      <div>
                        <Link
                          href="/researchers/researcher1"
                          className="font-medium hover:text-primary transition-colors"
                        >
                          张伟
                        </Link>
                        <div className="text-sm text-muted-foreground">北京大学 · 教授</div>
                        <div className="text-sm text-muted-foreground">H-index: 45 · 空间转录组学论文: 18</div>
                        <div className="flex gap-1 mt-1">
                          <Badge variant="secondary" className="text-xs">
                            空间转录组学
                          </Badge>
                          <Badge variant="secondary" className="text-xs">
                            单细胞测序
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-16 w-16 border">
                        <AvatarImage src="/placeholder.svg?key=l9tz4" alt="李明" />
                        <AvatarFallback className="text-lg">李明</AvatarFallback>
                      </Avatar>
                      <div>
                        <Link
                          href="/researchers/researcher2"
                          className="font-medium hover:text-primary transition-colors"
                        >
                          李明
                        </Link>
                        <div className="text-sm text-muted-foreground">中国科学院 · 研究员</div>
                        <div className="text-sm text-muted-foreground">H-index: 38 · 空间转录组学论文: 15</div>
                        <div className="flex gap-1 mt-1">
                          <Badge variant="secondary" className="text-xs">
                            空间转录组学
                          </Badge>
                          <Badge variant="secondary" className="text-xs">
                            发育生物学
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-16 w-16 border">
                        <AvatarImage src="/placeholder.svg?key=8rvp2" alt="王芳" />
                        <AvatarFallback className="text-lg">王芳</AvatarFallback>
                      </Avatar>
                      <div>
                        <Link
                          href="/researchers/researcher3"
                          className="font-medium hover:text-primary transition-colors"
                        >
                          王芳
                        </Link>
                        <div className="text-sm text-muted-foreground">复旦大学 · 教授</div>
                        <div className="text-sm text-muted-foreground">H-index: 42 · 空间转录组学论文: 12</div>
                        <div className="flex gap-1 mt-1">
                          <Badge variant="secondary" className="text-xs">
                            空间转录组学
                          </Badge>
                          <Badge variant="secondary" className="text-xs">
                            肿瘤生物学
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-16 w-16 border">
                        <AvatarImage src="/placeholder.svg?key=c7ht5" alt="陈静" />
                        <AvatarFallback className="text-lg">陈静</AvatarFallback>
                      </Avatar>
                      <div>
                        <Link
                          href="/researchers/researcher4"
                          className="font-medium hover:text-primary transition-colors"
                        >
                          陈静
                        </Link>
                        <div className="text-sm text-muted-foreground">清华大学 · 副教授</div>
                        <div className="text-sm text-muted-foreground">H-index: 28 · 空间转录组学论文: 10</div>
                        <div className="flex gap-1 mt-1">
                          <Badge variant="secondary" className="text-xs">
                            空间转录组学
                          </Badge>
                          <Badge variant="secondary" className="text-xs">
                            计算生物学
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="teams" className="pt-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold">相关团队</h3>
                  <Button variant="outline" size="sm">
                    查看全部
                  </Button>
                </div>
                <div className="grid gap-6 md:grid-cols-2">
                  {/* 这里使用之前定义的CardTeam组件，但为简化只展示几个示例 */}
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium">
                      <Link href="/teams/team1" className="hover:text-primary transition-colors">
                        基因组学与精准医学团队
                      </Link>
                    </h4>
                    <div className="text-sm text-muted-foreground">北京大学</div>
                    <div className="flex items-center gap-3 my-3">
                      <Avatar className="h-10 w-10 border">
                        <AvatarImage src="/placeholder.svg?key=4y1gb" alt="张伟" />
                        <AvatarFallback>张伟</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="text-sm font-medium">
                          <Link href="/researchers/researcher1" className="hover:text-primary transition-colors">
                            张伟
                          </Link>
                        </div>
                        <div className="text-xs text-muted-foreground">团队负责人</div>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      <Badge variant="secondary" className="font-normal">
                        空间转录组学
                      </Badge>
                      <Badge variant="secondary" className="font-normal">
                        精准医学
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">空间转录组学论文: 28 · 相关引用: 2,450</div>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium">
                      <Link href="/teams/team2" className="hover:text-primary transition-colors">
                        干细胞与再生医学研究团队
                      </Link>
                    </h4>
                    <div className="text-sm text-muted-foreground">中国科学院</div>
                    <div className="flex items-center gap-3 my-3">
                      <Avatar className="h-10 w-10 border">
                        <AvatarImage src="/placeholder.svg?key=gvik2" alt="李明" />
                        <AvatarFallback>李明</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="text-sm font-medium">
                          <Link href="/researchers/researcher2" className="hover:text-primary transition-colors">
                            李明
                          </Link>
                        </div>
                        <div className="text-xs text-muted-foreground">团队负责人</div>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      <Badge variant="secondary" className="font-normal">
                        空间转录组学
                      </Badge>
                      <Badge variant="secondary" className="font-normal">
                        干细胞
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">空间转录组学论文: 22 · 相关引用: 1,980</div>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium">
                      <Link href="/teams/team3" className="hover:text-primary transition-colors">
                        肿瘤免疫治疗研究团队
                      </Link>
                    </h4>
                    <div className="text-sm text-muted-foreground">复旦大学</div>
                    <div className="flex items-center gap-3 my-3">
                      <Avatar className="h-10 w-10 border">
                        <AvatarImage src="/placeholder.svg?key=wrbdk" alt="王芳" />
                        <AvatarFallback>王芳</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="text-sm font-medium">
                          <Link href="/researchers/researcher3" className="hover:text-primary transition-colors">
                            王芳
                          </Link>
                        </div>
                        <div className="text-xs text-muted-foreground">团队负责人</div>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      <Badge variant="secondary" className="font-normal">
                        空间转录组学
                      </Badge>
                      <Badge variant="secondary" className="font-normal">
                        肿瘤免疫
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">空间转录组学论文: 18 · 相关引用: 1,650</div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="trends" className="pt-4">
                <div className="space-y-8">
                  {/* 添加发展趋势图表 */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">发展趋势</h3>
                    <div className="border rounded-lg p-4">
                      <LineChart
                        data={trendData}
                        xField="year"
                        yField="papers"
                        height={300}
                        config={{
                          point: { size: 5, shape: "circle" },
                          label: { style: { fill: "#aaa" } },
                          title: "空间转录组学论文发表数量趋势 (2016-2023)",
                        }}
                      />
                    </div>
                  </div>

                  {/* 添加地区分布地图 */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">地区分布</h3>
                    <div className="grid grid-cols-1 gap-6">
                      <div className="border rounded-lg p-4">
                        <h4 className="font-medium mb-3">国内研究机构分布</h4>
                        <LeafletMap
                          points={researchInstitutesData}
                          center={[35.8617, 104.1954]}
                          zoom={4}
                          height={400}
                          valueField="value"
                          colorRange={["#1677ff", "#52c41a", "#faad14"]}
                          className="rounded-lg"
                        />
                        <div className="text-sm text-muted-foreground mt-2 text-center">
                          中国空间转录组学研究机构分布（圆点大小表示研究规模）
                        </div>
                      </div>
                      <div className="border rounded-lg p-4">
                        <h4 className="font-medium mb-3">国际合作机构分布</h4>
                        <LeafletMap
                          points={internationalInstitutesData}
                          center={[30, 0]}
                          zoom={2}
                          height={400}
                          valueField="value"
                          colorRange={["#1677ff", "#52c41a", "#faad14"]}
                          className="rounded-lg"
                        />
                        <div className="text-sm text-muted-foreground mt-2 text-center">
                          全球空间转录组学主要合作机构分布（圆点大小表示合作强度）
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 添加应用领域分布图表 */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">应用领域分布</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="border rounded-lg p-4">
                        <h4 className="font-medium mb-3">研究领域分布</h4>
                        <PieChart
                          data={applicationFieldsData}
                          angleField="value"
                          colorField="field"
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
                      <div className="border rounded-lg p-4">
                        <h4 className="font-medium mb-3">期刊分布</h4>
                        <PieChart
                          data={journalDistributionData}
                          angleField="value"
                          colorField="journal"
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
                    </div>
                  </div>

                  {/* 添加合作网络图 */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">研究方向关联网络</h3>
                    <div className="border rounded-lg p-4">
                      <NetworkGraph data={collaborationNetworkData} height={500} className="rounded-lg" />
                      <div className="text-sm text-muted-foreground mt-2 text-center">
                        空间转录组学与相关研究方向的关联网络（节点大小表示相关度）
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-4">未来发展预测</h3>
                    <div className="space-y-3">
                      <div className="p-4 border rounded-lg">
                        <h4 className="font-medium">技术整合与多组学分析</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          空间转录组学将与空间蛋白质组学、空间代谢组学等技术整合，形成多组学空间分析平台，提供更全面的分子空间信息。
                        </p>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <h4 className="font-medium">分辨率与规模的提升</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          技术将朝着更高空间分辨率、更大组织范围和更多基因检测的方向发展，实现从亚细胞到整个器官的多尺度空间分析。
                        </p>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <h4 className="font-medium">临床应用拓展</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          空间转录组学将逐步应用于临床病理诊断、精准医疗和药物开发，为疾病诊断和治疗提供空间分子信息。
                        </p>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <h4 className="font-medium">人体图谱计划</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          空间转录组学将成为人体细胞图谱计划的核心技术，绘制人体各器官的高分辨率空间分子图谱，推动基础医学研究和临床应用。
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* 侧边栏 */}
        <div className="space-y-6">
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold mb-3">子方向</h3>
            <div className="space-y-3">
              <div>
                <Link href="#" className="text-sm font-medium hover:text-primary transition-colors">
                  单细胞空间转录组学
                </Link>
                <div className="flex justify-between items-center mt-1">
                  <div className="text-xs text-muted-foreground">论文: 180</div>
                  <div className="flex items-center gap-1 text-xs text-success">
                    <TrendingUp className="h-3 w-3" />
                    <span>52%</span>
                  </div>
                </div>
              </div>
              <div>
                <Link href="#" className="text-sm font-medium hover:text-primary transition-colors">
                  空间多组学整合
                </Link>
                <div className="flex justify-between items-center mt-1">
                  <div className="text-xs text-muted-foreground">论文: 120</div>
                  <div className="flex items-center gap-1 text-xs text-success">
                    <TrendingUp className="h-3 w-3" />
                    <span>48%</span>
                  </div>
                </div>
              </div>
              <div>
                <Link href="#" className="text-sm font-medium hover:text-primary transition-colors">
                  空间转录组数据分析
                </Link>
                <div className="flex justify-between items-center mt-1">
                  <div className="text-xs text-muted-foreground">论文: 95</div>
                  <div className="flex items-center gap-1 text-xs text-success">
                    <TrendingUp className="h-3 w-3" />
                    <span>40%</span>
                  </div>
                </div>
              </div>
              <div>
                <Link href="#" className="text-sm font-medium hover:text-primary transition-colors">
                  空间转录组临床应用
                </Link>
                <div className="flex justify-between items-center mt-1">
                  <div className="text-xs text-muted-foreground">论文: 55</div>
                  <div className="flex items-center gap-1 text-xs text-success">
                    <TrendingUp className="h-3 w-3" />
                    <span>65%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border rounded-lg p-4">
            <h3 className="font-semibold mb-3">相关方向</h3>
            <div className="space-y-3">
              <div>
                <Link href="#" className="text-sm font-medium hover:text-primary transition-colors">
                  单细胞生物学
                </Link>
                <p className="text-xs text-muted-foreground">父方向</p>
              </div>
              <div>
                <Link href="#" className="text-sm font-medium hover:text-primary transition-colors">
                  组织学与病理学
                </Link>
                <p className="text-xs text-muted-foreground">相关方向</p>
              </div>
              <div>
                <Link href="#" className="text-sm font-medium hover:text-primary transition-colors">
                  多组学整合分析
                </Link>
                <p className="text-xs text-muted-foreground">相关方向</p>
              </div>
              <div>
                <Link href="#" className="text-sm font-medium hover:text-primary transition-colors">
                  生物信息学
                </Link>
                <p className="text-xs text-muted-foreground">相关方向</p>
              </div>
            </div>
          </div>

          <div className="border rounded-lg p-4">
            <h3 className="font-semibold mb-3">热门技术</h3>
            <div className="space-y-3">
              <div>
                <Link href="#" className="text-sm font-medium hover:text-primary transition-colors">
                  Visium空间转录组
                </Link>
                <div className="w-full bg-muted rounded-full h-1.5 mt-1">
                  <div className="bg-primary h-1.5 rounded-full" style={{ width: "85%" }}></div>
                </div>
              </div>
              <div>
                <Link href="#" className="text-sm font-medium hover:text-primary transition-colors">
                  MERFISH
                </Link>
                <div className="w-full bg-muted rounded-full h-1.5 mt-1">
                  <div className="bg-primary h-1.5 rounded-full" style={{ width: "70%" }}></div>
                </div>
              </div>
              <div>
                <Link href="#" className="text-sm font-medium hover:text-primary transition-colors">
                  Slide-seq
                </Link>
                <div className="w-full bg-muted rounded-full h-1.5 mt-1">
                  <div className="bg-primary h-1.5 rounded-full" style={{ width: "65%" }}></div>
                </div>
              </div>
              <div>
                <Link href="#" className="text-sm font-medium hover:text-primary transition-colors">
                  Stereo-seq
                </Link>
                <div className="w-full bg-muted rounded-full h-1.5 mt-1">
                  <div className="bg-primary h-1.5 rounded-full" style={{ width: "60%" }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
