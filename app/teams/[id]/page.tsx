"use client"

import Link from "next/link"
import { ArrowLeft, ExternalLink, Heart, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Breadcrumb } from "@/components/breadcrumb"
import LineChart from "@/components/charts/line-chart"
import BarChart from "@/components/charts/bar-chart"
import PieChart from "@/components/charts/pie-chart"
import NetworkGraph from "@/components/charts/network-graph"
import { useState } from "react"

// 模拟数据 - 研究成果趋势
const publicationTrendData = [
  { year: "2017", count: 18 },
  { year: "2018", count: 22 },
  { year: "2019", count: 30 },
  { year: "2020", count: 35 },
  { year: "2021", count: 42 },
  { year: "2022", count: 38 },
  { year: "2023", count: 45 },
]

// 模拟数据 - 研究方向分布
const researchDirectionData = [
  { direction: "基因组学", value: 35 },
  { direction: "精准医学", value: 25 },
  { direction: "生物信息学", value: 20 },
  { direction: "表观遗传学", value: 15 },
  { direction: "单细胞测序", value: 5 },
]

// 模拟数据 - 论文类型分布
const paperTypeData = [
  { type: "研究论文", count: 120 },
  { type: "综述", count: 45 },
  { type: "方法学", count: 30 },
  { type: "临床研究", count: 20 },
]

// 模拟数据 - 期刊分布
const journalDistributionData = [
  { journal: "Nature", value: 15 },
  { journal: "Science", value: 12 },
  { journal: "Cell", value: 10 },
  { journal: "NEJM", value: 8 },
  { journal: "Genome Biology", value: 25 },
  { journal: "其他", value: 30 },
]

// 模拟数据 - 合作网络
const collaborationNetworkData = {
  nodes: [
    { id: "1", label: "基因组学团队", cluster: "self", size: 30 },
    { id: "2", label: "北京大学", size: 25 },
    { id: "3", label: "复旦大学", size: 25 },
    { id: "4", label: "中科院", size: 25 },
    { id: "5", label: "哈佛大学", size: 20 },
    { id: "6", label: "斯坦福大学", size: 20 },
    { id: "7", label: "清华大学", size: 20 },
    { id: "8", label: "上海交大", size: 15 },
  ],
  edges: [
    { source: "1", target: "2" },
    { source: "1", target: "3" },
    { source: "1", target: "4" },
    { source: "1", target: "5" },
    { source: "1", target: "6" },
    { source: "1", target: "7" },
    { source: "1", target: "8" },
    { source: "2", target: "3" },
    { source: "2", target: "7" },
    { source: "3", target: "4" },
    { source: "5", target: "6" },
  ],
}

// 模拟数据 - 引用趋势
const citationTrendData = [
  { year: "2017", count: 320 },
  { year: "2018", count: 580 },
  { year: "2019", count: 950 },
  { year: "2020", count: 1450 },
  { year: "2021", count: 2100 },
  { year: "2022", count: 2800 },
  { year: "2023", count: 3500 },
]

export default function TeamDetailPage({ params }: { params: { id: string } }) {
  const [isLoading, setIsLoading] = useState(false)

  return (
    <div className="container-content">
      <Breadcrumb
        segments={[
          { name: "团队", href: "/teams" },
          { name: "团队详情", href: `/teams/${params.id}` },
        ]}
        className="mb-6"
      />

      <div className="mb-4">
        {/* 标题区域 */}
        <div className="flex justify-between items-start gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                <h1 className="text-2xl font-bold">基因组学与精准医学团队</h1>
                <div className="flex flex-wrap gap-1">
                  <Badge variant="secondary" className="bg-purple-50 text-purple-700 border-purple-200">
                    顶尖团队
                  </Badge>
                  <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-200">
                    高产出
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <Button variant="outline" size="sm" className="gap-1">
              <ExternalLink className="h-3.5 w-3.5" />
              团队主页
            </Button>
            <Button variant="outline" size="sm" className="gap-1">
              <Heart className="h-3.5 w-3.5" />
              关注
            </Button>
            <Button variant="outline" size="icon" asChild>
              <Link href="/teams">
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">返回</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-6 items-start mb-6">
        <div className="bg-muted/50 h-24 w-24 rounded-lg flex items-center justify-center text-primary">
          <Users className="h-12 w-12" />
        </div>

        <div className="space-y-4 flex-1">
          <div>
            <div className="text-lg">北京大学 · 生命科学学院</div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">基因组学</Badge>
            <Badge variant="secondary">精准医学</Badge>
            <Badge variant="secondary">生物信息学</Badge>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">
        <div>
          {/* 团队主体内容 */}
          <div className="space-y-8">
            {/* 团队指标 */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-muted/50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-primary">25</div>
                <div className="text-sm text-muted-foreground">成员数</div>
              </div>
              <div className="bg-muted/50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-primary">215</div>
                <div className="text-sm text-muted-foreground">论文数</div>
              </div>
              <div className="bg-muted/50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-primary">18,500</div>
                <div className="text-sm text-muted-foreground">总引用</div>
              </div>
              <div className="bg-muted/50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-primary">86</div>
                <div className="text-sm text-muted-foreground">篇均引用</div>
              </div>
            </div>

            {/* 团队内容标签页 */}
            <Tabs defaultValue="overview">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="overview">概览</TabsTrigger>
                <TabsTrigger value="members">成员</TabsTrigger>
                <TabsTrigger value="papers">论文</TabsTrigger>
                <TabsTrigger value="projects">项目</TabsTrigger>
                <TabsTrigger value="network">合作网络</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="space-y-6 pt-4">
                <div>
                  <h3 className="text-lg font-semibold mb-3">团队简介</h3>
                  <p className="text-muted-foreground">
                    基因组学与精准医学团队成立于2010年，由张伟教授领导，致力于利用基因组学和生物信息学方法研究人类疾病的分子机制，开发精准医学诊断和治疗策略。团队在单细胞测序、表观遗传学和基因编辑等领域具有丰富的研究经验和技术积累。
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">核心领导</h3>
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16 border">
                      <AvatarImage src="/placeholder.svg?key=3e3d9" alt="张伟" />
                      <AvatarFallback className="text-lg">张伟</AvatarFallback>
                    </Avatar>
                    <div>
                      <Link
                        href="/researchers/researcher1"
                        className="text-lg font-medium hover:text-primary transition-colors"
                      >
                        张伟
                      </Link>
                      <div className="text-muted-foreground">教授，团队负责人</div>
                      <div className="text-sm text-muted-foreground">H-index: 45 · 引用: 12,500 · 论文: 120</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">研究方向</h3>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium">单细胞基因组学</h4>
                      <p className="text-sm text-muted-foreground">
                        开发和应用单细胞测序技术，研究细胞异质性和发育过程中的基因表达调控。
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium">表观遗传组学</h4>
                      <p className="text-sm text-muted-foreground">
                        研究DNA甲基化、组蛋白修饰等表观遗传修饰在基因表达调控中的作用。
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium">精准医学</h4>
                      <p className="text-sm text-muted-foreground">
                        基于基因组和表观基因组数据，开发疾病诊断和治疗的个体化策略。
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium">生物信息学方法开发</h4>
                      <p className="text-sm text-muted-foreground">
                        开发分析大规模生物学数据的算法和工具，包括多组学数据整合分析方法。
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">研究成果趋势</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">论文发表趋势</h4>
                      <LineChart
                        data={publicationTrendData}
                        xField="year"
                        yField="count"
                        height={250}
                        loading={isLoading}
                        config={{
                          point: {
                            size: 5,
                            shape: "diamond",
                          },
                          tooltip: {
                            formatter: (datum) => {
                              return { name: "论文数", value: datum.count }
                            },
                          },
                        }}
                      />
                    </div>
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">引用趋势</h4>
                      <LineChart
                        data={citationTrendData}
                        xField="year"
                        yField="count"
                        height={250}
                        loading={isLoading}
                        config={{
                          point: {
                            size: 5,
                            shape: "circle",
                          },
                          tooltip: {
                            formatter: (datum) => {
                              return { name: "引用数", value: datum.count }
                            },
                          },
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">研究方向分布</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">研究方向占比</h4>
                      <PieChart
                        data={researchDirectionData}
                        angleField="value"
                        colorField="direction"
                        height={250}
                        loading={isLoading}
                        config={{
                          radius: 0.8,
                          label: {
                            type: "outer",
                          },
                          interactions: [{ type: "element-active" }],
                        }}
                      />
                    </div>
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">期刊分布</h4>
                      <PieChart
                        data={journalDistributionData}
                        angleField="value"
                        colorField="journal"
                        height={250}
                        loading={isLoading}
                        config={{
                          radius: 0.8,
                          label: {
                            type: "outer",
                          },
                          interactions: [{ type: "element-active" }],
                        }}
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="members" className="pt-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold">团队成员 (25)</h3>
                  <Button variant="outline" size="sm">
                    筛选
                  </Button>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="flex items-center gap-3 p-3 border rounded-lg">
                    <Avatar className="h-12 w-12 border">
                      <AvatarImage src="/placeholder.svg?key=xjfyz" alt="张伟" />
                      <AvatarFallback>张伟</AvatarFallback>
                    </Avatar>
                    <div>
                      <Link
                        href="/researchers/researcher1"
                        className="font-medium hover:text-primary transition-colors"
                      >
                        张伟
                      </Link>
                      <div className="text-sm text-muted-foreground">教授，团队负责人</div>
                      <div className="text-xs text-muted-foreground">H-index: 45</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 border rounded-lg">
                    <Avatar className="h-12 w-12 border">
                      <AvatarImage src="/placeholder.svg?key=l9tz4" alt="李明" />
                      <AvatarFallback>李明</AvatarFallback>
                    </Avatar>
                    <div>
                      <Link
                        href="/researchers/researcher2"
                        className="font-medium hover:text-primary transition-colors"
                      >
                        李明
                      </Link>
                      <div className="text-sm text-muted-foreground">副教授</div>
                      <div className="text-xs text-muted-foreground">H-index: 32</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 border rounded-lg">
                    <Avatar className="h-12 w-12 border">
                      <AvatarImage src="/placeholder.svg?key=8rvp2" alt="王芳" />
                      <AvatarFallback>王芳</AvatarFallback>
                    </Avatar>
                    <div>
                      <Link
                        href="/researchers/researcher3"
                        className="font-medium hover:text-primary transition-colors"
                      >
                        王芳
                      </Link>
                      <div className="text-sm text-muted-foreground">副教授</div>
                      <div className="text-xs text-muted-foreground">H-index: 28</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 border rounded-lg">
                    <Avatar className="h-12 w-12 border">
                      <AvatarImage src="/placeholder.svg?key=c7ht5" alt="陈静" />
                      <AvatarFallback>陈静</AvatarFallback>
                    </Avatar>
                    <div>
                      <Link
                        href="/researchers/researcher4"
                        className="font-medium hover:text-primary transition-colors"
                      >
                        陈静
                      </Link>
                      <div className="text-sm text-muted-foreground">助理教授</div>
                      <div className="text-xs text-muted-foreground">H-index: 22</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 border rounded-lg">
                    <Avatar className="h-12 w-12 border">
                      <AvatarImage src="/placeholder.svg?key=d2kp7" alt="刘强" />
                      <AvatarFallback>刘强</AvatarFallback>
                    </Avatar>
                    <div>
                      <Link
                        href="/researchers/researcher5"
                        className="font-medium hover:text-primary transition-colors"
                      >
                        刘强
                      </Link>
                      <div className="text-sm text-muted-foreground">助理教授</div>
                      <div className="text-xs text-muted-foreground">H-index: 20</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 border rounded-lg">
                    <Avatar className="h-12 w-12 border">
                      <AvatarImage src="/placeholder.svg?key=f5jn8" alt="赵敏" />
                      <AvatarFallback>赵敏</AvatarFallback>
                    </Avatar>
                    <div>
                      <Link
                        href="/researchers/researcher6"
                        className="font-medium hover:text-primary transition-colors"
                      >
                        赵敏
                      </Link>
                      <div className="text-sm text-muted-foreground">博士后</div>
                      <div className="text-xs text-muted-foreground">H-index: 15</div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <Button variant="outline">查看全部成员</Button>
                </div>
              </TabsContent>
              <TabsContent value="papers" className="pt-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold">团队论文 (215)</h3>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      筛选
                    </Button>
                    <Button variant="outline" size="sm">
                      排序
                    </Button>
                  </div>
                </div>

                <div className="mb-6 border rounded-lg p-4">
                  <h4 className="font-medium mb-3">论文类型分布</h4>
                  <BarChart
                    data={paperTypeData}
                    xField="type"
                    yField="count"
                    height={250}
                    loading={isLoading}
                    config={{
                      label: {
                        position: "middle",
                        style: {
                          fill: "#FFFFFF",
                          opacity: 0.6,
                        },
                      },
                      xAxis: {
                        label: {
                          autoHide: true,
                          autoRotate: false,
                        },
                      },
                    }}
                  />
                </div>

                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium">
                      <Link href="/papers/paper1" className="hover:text-primary transition-colors">
                        单细胞RNA测序揭示人类胚胎发育中的细胞命运决定机制
                      </Link>
                    </h4>
                    <p className="text-sm text-muted-foreground mt-1">张伟, 李明, 王芳. Nature, 2023</p>
                    <div className="flex justify-between items-center mt-2">
                      <div className="flex gap-2">
                        <Badge variant="outline">单细胞测序</Badge>
                        <Badge variant="outline">胚胎发育</Badge>
                      </div>
                      <div className="text-sm">引用: 87</div>
                    </div>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium">
                      <Link href="/papers/paper2" className="hover:text-primary transition-colors">
                        人类与小鼠胚胎发育的比较转录组学研究
                      </Link>
                    </h4>
                    <p className="text-sm text-muted-foreground mt-1">张伟, 陈静, 刘强. Developmental Cell, 2021</p>
                    <div className="flex justify-between items-center mt-2">
                      <div className="flex gap-2">
                        <Badge variant="outline">比较基因组学</Badge>
                        <Badge variant="outline">发育生物学</Badge>
                      </div>
                      <div className="text-sm">引用: 56</div>
                    </div>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium">
                      <Link href="/papers/paper3" className="hover:text-primary transition-colors">
                        表观遗传修饰在干细胞分化过程中的动态变化
                      </Link>
                    </h4>
                    <p className="text-sm text-muted-foreground mt-1">张伟, 赵敏, 孙宇. Cell Stem Cell, 2020</p>
                    <div className="flex justify-between items-center mt-2">
                      <div className="flex gap-2">
                        <Badge variant="outline">表观遗传学</Badge>
                        <Badge variant="outline">干细胞</Badge>
                      </div>
                      <div className="text-sm">引用: 72</div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <Button variant="outline">查看全部论文</Button>
                </div>
              </TabsContent>
              <TabsContent value="projects" className="pt-4">
                <h3 className="font-semibold mb-4">科研项目</h3>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex justify-between">
                      <h4 className="font-medium">人类早期胚胎发育的表观遗传调控机制研究</h4>
                      <Badge>进行中</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">国家自然科学基金重点项目</p>
                    <div className="flex justify-between items-center mt-2">
                      <div className="text-sm">2021 - 2025</div>
                      <div className="text-sm font-medium">500万元</div>
                    </div>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="flex justify-between">
                      <h4 className="font-medium">单细胞多组学技术开发及应用</h4>
                      <Badge>进行中</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">科技部重点研发计划</p>
                    <div className="flex justify-between items-center mt-2">
                      <div className="text-sm">2020 - 2024</div>
                      <div className="text-sm font-medium">800万元</div>
                    </div>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="flex justify-between">
                      <h4 className="font-medium">基因组三维结构与基因表达调控的关系研究</h4>
                      <Badge variant="outline">已完成</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">国家自然科学基金面上项目</p>
                    <div className="flex justify-between items-center mt-2">
                      <div className="text-sm">2017 - 2020</div>
                      <div className="text-sm font-medium">80万元</div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="network" className="pt-4">
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold mb-4">学术合作网络</h3>
                  <div className="text-center">
                    <NetworkGraph data={collaborationNetworkData} height={400} loading={isLoading} />
                    <p className="text-sm text-muted-foreground mt-4">
                      团队合作网络图显示了基因组学与精准医学团队与其他研究团队的合作关系。
                      节点大小表示合作强度，连线表示合作关系。
                    </p>
                  </div>
                </div>
                <div className="mt-6">
                  <h3 className="font-semibold mb-4">主要合作机构</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium">中国科学院</h4>
                      <p className="text-sm text-muted-foreground mt-1">合作项目: 12 · 合作论文: 35</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium">哈佛大学</h4>
                      <p className="text-sm text-muted-foreground mt-1">合作项目: 8 · 合作论文: 22</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium">斯坦福大学</h4>
                      <p className="text-sm text-muted-foreground mt-1">合作项目: 6 · 合作论文: 18</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium">复旦大学</h4>
                      <p className="text-sm text-muted-foreground mt-1">合作项目: 10 · 合作论文: 28</p>
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
            <h3 className="font-semibold mb-3">团队成就</h3>
            <div className="space-y-3">
              <div>
                <div className="font-medium">国家杰出青年科学基金</div>
                <p className="text-xs text-muted-foreground">张伟 · 2018年</p>
              </div>
              <div>
                <div className="font-medium">国家自然科学奖二等奖</div>
                <p className="text-xs text-muted-foreground">团队 · 2020年</p>
              </div>
              <div>
                <div className="font-medium">教育部创新团队</div>
                <p className="text-xs text-muted-foreground">团队 · 2019年</p>
              </div>
            </div>
          </div>

          <div className="border rounded-lg p-4">
            <h3 className="font-semibold mb-3">代表性成果</h3>
            <div className="space-y-3">
              <div>
                <Link href="/papers/paper1" className="text-sm font-medium hover:text-primary transition-colors">
                  单细胞RNA测序揭示人类胚胎发育中的细胞命运决定机制
                </Link>
                <p className="text-xs text-muted-foreground">Nature, 2023 · 引用: 87</p>
              </div>
              <div>
                <Link href="/papers/paper2" className="text-sm font-medium hover:text-primary transition-colors">
                  人类与小鼠胚胎发育的比较转录组学研究
                </Link>
                <p className="text-xs text-muted-foreground">Developmental Cell, 2021 · 引用: 56</p>
              </div>
              <div>
                <Link href="/papers/paper3" className="text-sm font-medium hover:text-primary transition-colors">
                  表观遗传修饰在干细胞分化过程中的动态变化
                </Link>
                <p className="text-xs text-muted-foreground">Cell Stem Cell, 2020 · 引用: 72</p>
              </div>
            </div>
          </div>

          <div className="border rounded-lg p-4">
            <h3 className="font-semibold mb-3">相关团队</h3>
            <div className="space-y-3">
              <div>
                <Link href="/teams/team2" className="text-sm font-medium hover:text-primary transition-colors">
                  干细胞与再生医学研究团队
                </Link>
                <p className="text-xs text-muted-foreground">中国科学院</p>
              </div>
              <div>
                <Link href="/teams/team3" className="text-sm font-medium hover:text-primary transition-colors">
                  肿瘤免疫治疗研究团队
                </Link>
                <p className="text-xs text-muted-foreground">复旦大学</p>
              </div>
              <div>
                <Link href="/teams/team4" className="text-sm font-medium hover:text-primary transition-colors">
                  结构生物学与药物设计团队
                </Link>
                <p className="text-xs text-muted-foreground">清华大学</p>
              </div>
            </div>
          </div>

          <div className="border rounded-lg p-4">
            <h3 className="font-semibold mb-3">联系方式</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">邮箱</span>
                <span className="text-sm">team@pku.edu.cn</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">电话</span>
                <span className="text-sm">010-12345678</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">地址</span>
                <span className="text-sm">北京市海淀区颐和园路5号</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
