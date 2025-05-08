import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, AtSign, ExternalLink, Heart, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Breadcrumb } from "@/components/breadcrumb"
import LineChart from "@/components/charts/line-chart"
import PieChart from "@/components/charts/pie-chart"
import BarChart from "@/components/charts/bar-chart"
import NetworkGraph from "@/components/charts/network-graph"

// 模拟数据 - 引用趋势
const citationData = [
  { year: "2013", value: 120 },
  { year: "2014", value: 350 },
  { year: "2015", value: 480 },
  { year: "2016", value: 520 },
  { year: "2017", value: 750 },
  { year: "2018", value: 920 },
  { year: "2019", value: 1250 },
  { year: "2020", value: 1580 },
  { year: "2021", value: 1850 },
  { year: "2022", value: 2100 },
  { year: "2023", value: 2450 },
]

// 模拟数据 - 论文发表趋势
const publicationData = [
  { year: "2013", value: 3 },
  { year: "2014", value: 5 },
  { year: "2015", value: 4 },
  { year: "2016", value: 6 },
  { year: "2017", value: 8 },
  { year: "2018", value: 10 },
  { year: "2019", value: 12 },
  { year: "2020", value: 15 },
  { year: "2021", value: 18 },
  { year: "2022", value: 20 },
  { year: "2023", value: 19 },
]

// 模拟数据 - 期刊分布
const journalData = [
  { type: "Nature", value: 5 },
  { type: "Science", value: 3 },
  { type: "Cell", value: 4 },
  { type: "PNAS", value: 8 },
  { type: "Genome Biology", value: 12 },
  { type: "Nucleic Acids Research", value: 15 },
  { type: "Bioinformatics", value: 18 },
  { type: "其他", value: 55 },
]

// 模拟数据 - 合作者分布
const collaboratorData = [
  { institution: "北京大学", count: 28 },
  { institution: "清华大学", count: 22 },
  { institution: "中国科学院", count: 18 },
  { institution: "复旦大学", count: 15 },
  { institution: "哈佛大学", count: 12 },
  { institution: "斯坦福大学", count: 10 },
  { institution: "其他机构", count: 45 },
]

// 模拟数据 - 学术网络
const networkData = {
  nodes: [
    { id: "1", label: "张伟", size: 40, cluster: "self" },
    { id: "2", label: "李明", size: 30, cluster: "collaborator" },
    { id: "3", label: "王芳", size: 30, cluster: "collaborator" },
    { id: "4", label: "陈静", size: 25, cluster: "collaborator" },
    { id: "5", label: "刘强", size: 25, cluster: "collaborator" },
    { id: "6", label: "赵敏", size: 20, cluster: "collaborator" },
    { id: "7", label: "孙宇", size: 20, cluster: "collaborator" },
    { id: "8", label: "周健", size: 15, cluster: "collaborator" },
    { id: "9", label: "吴琳", size: 15, cluster: "collaborator" },
    { id: "10", label: "郑华", size: 15, cluster: "collaborator" },
    { id: "11", label: "黄磊", size: 10, cluster: "collaborator" },
    { id: "12", label: "杨帆", size: 10, cluster: "collaborator" },
  ],
  edges: [
    { source: "1", target: "2", value: 10 },
    { source: "1", target: "3", value: 8 },
    { source: "1", target: "4", value: 6 },
    { source: "1", target: "5", value: 6 },
    { source: "1", target: "6", value: 4 },
    { source: "1", target: "7", value: 4 },
    { source: "1", target: "8", value: 3 },
    { source: "1", target: "9", value: 3 },
    { source: "1", target: "10", value: 3 },
    { source: "1", target: "11", value: 2 },
    { source: "1", target: "12", value: 2 },
    { source: "2", target: "3", value: 5 },
    { source: "2", target: "4", value: 4 },
    { source: "3", target: "5", value: 4 },
    { source: "4", target: "6", value: 3 },
    { source: "5", target: "7", value: 3 },
    { source: "6", target: "8", value: 2 },
    { source: "7", target: "9", value: 2 },
  ],
}

export default function ResearcherDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="container-content">
      <Breadcrumb
        segments={[
          { name: "学者", href: "/researchers" },
          { name: "学者详情", href: `/researchers/${params.id}` },
        ]}
        className="mb-6"
      />

      <div className="mb-4">
        {/* 标题区域 */}
        <div className="flex justify-between items-start gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                <h1 className="text-2xl font-bold">张伟</h1>
                <div className="flex flex-wrap gap-1">
                  <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-200">
                    高引学者
                  </Badge>
                  <Badge variant="secondary" className="bg-green-50 text-green-700 border-green-200">
                    活跃学者
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <Button variant="outline" size="sm" className="gap-1">
              <Mail className="h-3.5 w-3.5" />
              邮件
            </Button>
            <Button variant="outline" size="sm" className="gap-1">
              <AtSign className="h-3.5 w-3.5" />
              ORCID
            </Button>
            <Button variant="outline" size="sm" className="gap-1">
              <ExternalLink className="h-3.5 w-3.5" />
              个人主页
            </Button>
            <Button variant="outline" size="sm" className="gap-1">
              <Heart className="h-3.5 w-3.5" />
              关注
            </Button>
            <Button variant="outline" size="icon" asChild>
              <Link href="/researchers">
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">返回</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-6 items-start mb-6">
        <Avatar className="h-24 w-24 border">
          <AvatarImage src="/placeholder.svg?key=yuls5" alt="张伟" />
          <AvatarFallback className="text-2xl">张伟</AvatarFallback>
        </Avatar>

        <div className="space-y-4 flex-1">
          <div>
            <div className="text-lg text-muted-foreground">教授</div>
            <div className="text-lg">北京大学 · 生命科学学院</div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">基因组学</Badge>
            <Badge variant="secondary">表观遗传学</Badge>
            <Badge variant="secondary">生物信息学</Badge>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">
        <div>
          {/* 学者主体内容 */}
          <div className="space-y-8">
            {/* 学术指标 */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-muted/50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-primary">45</div>
                <div className="text-sm text-muted-foreground">H-index</div>
              </div>
              <div className="bg-muted/50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-primary">12,500</div>
                <div className="text-sm text-muted-foreground">总引用</div>
              </div>
              <div className="bg-muted/50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-primary">120</div>
                <div className="text-sm text-muted-foreground">论文数</div>
              </div>
              <div className="bg-muted/50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-primary">5</div>
                <div className="text-sm text-muted-foreground">CNS论文</div>
              </div>
            </div>

            {/* 学者内容标签页 */}
            <Tabs defaultValue="overview">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="overview">概览</TabsTrigger>
                <TabsTrigger value="papers">论文</TabsTrigger>
                <TabsTrigger value="projects">项目</TabsTrigger>
                <TabsTrigger value="network">学术网络</TabsTrigger>
                <TabsTrigger value="metrics">学术指标</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="space-y-6 pt-4">
                <div>
                  <h3 className="text-lg font-semibold mb-3">教育背景</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <div>
                        <div className="font-medium">博士，生物学</div>
                        <div className="text-sm text-muted-foreground">北京大学</div>
                      </div>
                      <div className="text-sm text-muted-foreground">2005 - 2010</div>
                    </div>
                    <div className="flex justify-between">
                      <div>
                        <div className="font-medium">硕士，分子生物学</div>
                        <div className="text-sm text-muted-foreground">北京大学</div>
                      </div>
                      <div className="text-sm text-muted-foreground">2002 - 2005</div>
                    </div>
                    <div className="flex justify-between">
                      <div>
                        <div className="font-medium">学士，生物科学</div>
                        <div className="text-sm text-muted-foreground">复旦大学</div>
                      </div>
                      <div className="text-sm text-muted-foreground">1998 - 2002</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">工作经历</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <div>
                        <div className="font-medium">教授</div>
                        <div className="text-sm text-muted-foreground">北京大学，生命科学学院</div>
                      </div>
                      <div className="text-sm text-muted-foreground">2018 - 至今</div>
                    </div>
                    <div className="flex justify-between">
                      <div>
                        <div className="font-medium">副教授</div>
                        <div className="text-sm text-muted-foreground">北京大学，生命科学学院</div>
                      </div>
                      <div className="text-sm text-muted-foreground">2013 - 2018</div>
                    </div>
                    <div className="flex justify-between">
                      <div>
                        <div className="font-medium">助理教授</div>
                        <div className="text-sm text-muted-foreground">北京大学，生命科学学院</div>
                      </div>
                      <div className="text-sm text-muted-foreground">2010 - 2013</div>
                    </div>
                    <div className="flex justify-between">
                      <div>
                        <div className="font-medium">博士后研究员</div>
                        <div className="text-sm text-muted-foreground">哈佛大学，医学院</div>
                      </div>
                      <div className="text-sm text-muted-foreground">2008 - 2010</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">研究方向</h3>
                  <p className="text-muted-foreground mb-4">
                    张伟教授主要研究方向包括基因组学、表观遗传学和生物信息学。他的研究团队致力于解析基因组和表观基因组的调控机制，特别关注发育过程和疾病状态下的基因表达调控。
                  </p>
                  <Image
                    src="/genomics-epigenetics-bioinformatics-wordcloud.png"
                    alt="研究方向词云"
                    width={600}
                    height={200}
                    className="rounded-lg w-full"
                  />
                </div>
              </TabsContent>
              <TabsContent value="papers" className="pt-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold">论文列表 (120)</h3>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      筛选
                    </Button>
                    <Button variant="outline" size="sm">
                      排序
                    </Button>
                  </div>
                </div>
                <div className="space-y-4">
                  {/* 这里只展示几个示例论文 */}
                  <div className="p-4 border rounded-lg">
                    <p className="font-medium">单细胞RNA测序揭示人类胚胎发育中的细胞命运决定机制</p>
                    <p className="text-sm text-muted-foreground">张伟, 李明, 王芳. Nature, 2023</p>
                    <div className="flex justify-between items-center mt-2">
                      <div className="flex gap-2">
                        <Badge variant="outline">单细胞测序</Badge>
                        <Badge variant="outline">胚胎发育</Badge>
                      </div>
                      <div className="text-sm">引用: 87</div>
                    </div>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <p className="font-medium">人类与小鼠胚胎发育的比较转录组学研究</p>
                    <p className="text-sm text-muted-foreground">张伟, 陈静, 刘强. Developmental Cell, 2021</p>
                    <div className="flex justify-between items-center mt-2">
                      <div className="flex gap-2">
                        <Badge variant="outline">比较基因组学</Badge>
                        <Badge variant="outline">发育生物学</Badge>
                      </div>
                      <div className="text-sm">引用: 56</div>
                    </div>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <p className="font-medium">表观遗传修饰在干细胞分化过程中的动态变化</p>
                    <p className="text-sm text-muted-foreground">张伟, 赵敏, 孙宇. Cell Stem Cell, 2020</p>
                    <div className="flex justify-between items-center mt-2">
                      <div className="flex gap-2">
                        <Badge variant="outline">表观遗传学</Badge>
                        <Badge variant="outline">干细胞</Badge>
                      </div>
                      <div className="text-sm">引用: 72</div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="projects" className="pt-4">
                <h3 className="font-semibold mb-4">科研项目</h3>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex justify-between">
                      <p className="font-medium">人类早期胚胎发育的表观遗传调控机制研究</p>
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
                      <p className="font-medium">单细胞多组学技术开发及应用</p>
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
                      <p className="font-medium">基因组三维结构与基因表达调控的关系研究</p>
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
                <div className="text-center p-4">
                  <h3 className="font-semibold mb-4">学术合作网络</h3>
                  <div className="h-[500px] w-full border rounded-lg overflow-hidden">
                    <NetworkGraph data={networkData} height={500} />
                  </div>
                  <p className="text-sm text-muted-foreground mt-4">
                    学术合作网络图显示了张伟教授与其他研究者的合作关系。节点大小表示合作强度，连线粗细表示合作频率。
                  </p>
                </div>
              </TabsContent>
              <TabsContent value="metrics" className="pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="border rounded-lg p-4">
                    <h3 className="font-semibold mb-4">引用趋势</h3>
                    <LineChart
                      data={citationData}
                      xField="year"
                      yField="value"
                      height={300}
                      config={{
                        point: {
                          size: 5,
                          shape: "circle",
                        },
                        tooltip: {
                          formatter: (datum) => {
                            return { name: "引用次数", value: datum.value }
                          },
                        },
                        xAxis: {
                          title: {
                            text: "年份",
                          },
                        },
                        yAxis: {
                          title: {
                            text: "引用次数",
                          },
                        },
                        smooth: true,
                      }}
                    />
                  </div>
                  <div className="border rounded-lg p-4">
                    <h3 className="font-semibold mb-4">论文发表趋势</h3>
                    <BarChart
                      data={publicationData}
                      xField="year"
                      yField="value"
                      height={300}
                      config={{
                        tooltip: {
                          formatter: (datum) => {
                            return { name: "论文数量", value: datum.value }
                          },
                        },
                        xAxis: {
                          title: {
                            text: "年份",
                          },
                        },
                        yAxis: {
                          title: {
                            text: "论文数量",
                          },
                        },
                        columnStyle: {
                          fill: "#1890ff",
                        },
                      }}
                    />
                  </div>
                  <div className="border rounded-lg p-4">
                    <h3 className="font-semibold mb-4">期刊分布</h3>
                    <PieChart
                      data={journalData}
                      angleField="value"
                      colorField="type"
                      height={300}
                      config={{
                        radius: 0.8,
                        innerRadius: 0.5,
                        label: {
                          type: "outer",
                        },
                        tooltip: {
                          formatter: (datum) => {
                            return { name: datum.type, value: `${datum.value} 篇` }
                          },
                        },
                        interactions: [{ type: "element-active" }],
                      }}
                    />
                  </div>
                  <div className="border rounded-lg p-4">
                    <h3 className="font-semibold mb-4">合作者分布</h3>
                    <BarChart
                      data={collaboratorData}
                      xField="count"
                      yField="institution"
                      isHorizontal={true}
                      height={300}
                      config={{
                        tooltip: {
                          formatter: (datum) => {
                            return { name: datum.institution, value: `${datum.count} 人` }
                          },
                        },
                        xAxis: {
                          title: {
                            text: "合作者数量",
                          },
                        },
                        yAxis: {
                          title: {
                            text: "机构",
                          },
                        },
                        barStyle: {
                          fill: "#52c41a",
                        },
                      }}
                    />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* 侧边栏 */}
        <div className="space-y-6">
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold mb-3">代表性论文</h3>
            <div className="space-y-3">
              <div>
                <Link href="#" className="text-sm font-medium hover:text-primary transition-colors">
                  单细胞RNA测序揭示人类胚胎发育中的细胞命运决定机制
                </Link>
                <p className="text-xs text-muted-foreground">Nature, 2023 · 引用: 87</p>
              </div>
              <div>
                <Link href="#" className="text-sm font-medium hover:text-primary transition-colors">
                  人类与小鼠胚胎发育的比较转录组学研究
                </Link>
                <p className="text-xs text-muted-foreground">Developmental Cell, 2021 · 引用: 56</p>
              </div>
              <div>
                <Link href="#" className="text-sm font-medium hover:text-primary transition-colors">
                  表观遗传修饰在干细胞分化过程中的动态变化
                </Link>
                <p className="text-xs text-muted-foreground">Cell Stem Cell, 2020 · 引用: 72</p>
              </div>
            </div>
          </div>

          <div className="border rounded-lg p-4">
            <h3 className="font-semibold mb-3">所属团队</h3>
            <div className="space-y-3">
              <div>
                <Link href="#" className="text-sm font-medium hover:text-primary transition-colors">
                  基因组学与精准医学团队
                </Link>
                <p className="text-xs text-muted-foreground">北京大学 · 25名成员</p>
              </div>
            </div>
          </div>

          <div className="border rounded-lg p-4">
            <h3 className="font-semibold mb-3">相关学者</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg?key=e8ut5" alt="李明" />
                  <AvatarFallback>李明</AvatarFallback>
                </Avatar>
                <div>
                  <Link href="#" className="text-sm font-medium hover:text-primary transition-colors">
                    李明
                  </Link>
                  <p className="text-xs text-muted-foreground">中国科学院 · 研究员</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg?key=y2i9w" alt="王芳" />
                  <AvatarFallback>王芳</AvatarFallback>
                </Avatar>
                <div>
                  <Link href="#" className="text-sm font-medium hover:text-primary transition-colors">
                    王芳
                  </Link>
                  <p className="text-xs text-muted-foreground">复旦大学 · 教授</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg?key=l015b" alt="陈静" />
                  <AvatarFallback>陈静</AvatarFallback>
                </Avatar>
                <div>
                  <Link href="#" className="text-sm font-medium hover:text-primary transition-colors">
                    陈静
                  </Link>
                  <p className="text-xs text-muted-foreground">清华大学 · 副教授</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
