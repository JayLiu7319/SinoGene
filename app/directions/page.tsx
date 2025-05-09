import { Filter, Search, SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Breadcrumb } from "@/components/breadcrumb"
import { CardDirection } from "@/components/card-direction"

// 模拟数据
const directions = [
  {
    id: "1",
    name: "单细胞基因组学",
    description:
      "单细胞基因组学是研究单个细胞基因组的科学，它允许科学家在单细胞水平上研究基因表达和调控，为理解细胞异质性和疾病机制提供了新视角。",
    parentDirection: {
      id: "100",
      name: "基因组学",
    },
    papers: 1250,
    researchers: 580,
    teams: 120,
    trend: "up",
    trendPercentage: 35,
    hotness: 9,
    tags: [
      { type: "hot", label: "热门" },
      { type: "trending", label: "上升趋势" },
    ],
  },
  {
    id: "2",
    name: "空间转录组学",
    description:
      "空间转录组学是研究组织中基因表达空间分布的技术，它结合了高通量测序和空间分辨率，为理解组织结构和功能提供了新的视角。",
    parentDirection: {
      id: "101",
      name: "转录组学",
    },
    papers: 850,
    researchers: 420,
    teams: 85,
    trend: "up",
    trendPercentage: 48,
    hotness: 8,
    tags: [{ type: "emerging", label: "新兴方向" }],
  },
  {
    id: "3",
    name: "多组学整合分析",
    description:
      "多组学整合分析是将基因组学、转录组学、蛋白质组学等多种组学数据进行综合分析的方法，旨在全面理解生物系统的复杂性。",
    parentDirection: {
      id: "102",
      name: "系统生物学",
    },
    papers: 980,
    researchers: 510,
    teams: 95,
    trend: "up",
    trendPercentage: 25,
    hotness: 7,
    tags: [{ type: "interdisciplinary", label: "跨学科" }],
  },
  {
    id: "4",
    name: "表观遗传修饰",
    description:
      "表观遗传修饰研究DNA甲基化、组蛋白修饰等不改变DNA序列但影响基因表达的机制，对理解发育和疾病具有重要意义。",
    parentDirection: {
      id: "103",
      name: "表观遗传学",
    },
    papers: 1100,
    researchers: 540,
    teams: 110,
    trend: "stable",
    trendPercentage: null,
    hotness: 6,
    tags: [{ type: "established", label: "成熟方向" }],
  },
  {
    id: "5",
    name: "基因编辑技术",
    description:
      "基因编辑技术包括CRISPR-Cas9等工具，可以精确修改基因组，为基础研究、疾病治疗和作物改良提供了强大工具。",
    parentDirection: {
      id: "104",
      name: "基因工程",
    },
    papers: 1500,
    researchers: 680,
    teams: 150,
    trend: "up",
    trendPercentage: 20,
    hotness: 9,
    tags: [
      { type: "hot", label: "热门" },
      { type: "innovative", label: "创新技术" },
    ],
  },
  {
    id: "6",
    name: "人工智能生物学",
    description:
      "人工智能生物学将机器学习和深度学习技术应用于生物学研究，包括蛋白质结构预测、药物发现和基因组分析等领域。",
    parentDirection: {
      id: "105",
      name: "计算生物学",
    },
    papers: 780,
    researchers: 380,
    teams: 75,
    trend: "up",
    trendPercentage: 65,
    hotness: 10,
    tags: [
      { type: "new", label: "新兴" },
      { type: "trending", label: "上升趋势" },
      { type: "interdisciplinary", label: "跨学科" },
    ],
  },
]

export default function DirectionsPage() {
  return (
    <div className="container-content">
      <Breadcrumb segments={[{ name: "方向", href: "/directions" }]} className="mb-6" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <h1 className="text-3xl font-bold">科研方向</h1>
        <div className="flex items-center gap-2">
          <div className="relative w-full md:w-auto">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="搜索研究方向..." className="pl-9 w-full md:w-[300px]" />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
            <span className="sr-only">筛选</span>
          </Button>
          <Button variant="outline" size="icon">
            <SlidersHorizontal className="h-4 w-4" />
            <span className="sr-only">高级筛选</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-6">
        {/* 筛选侧边栏 */}
        <div className="space-y-6">
          <div>
            <h4 className="font-medium mb-3">父级方向</h4>
            <div className="space-y-2">
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue placeholder="选择父级方向" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部方向</SelectItem>
                  <SelectItem value="single_cell">单细胞生物学</SelectItem>
                  <SelectItem value="rna_biology">RNA生物学</SelectItem>
                  <SelectItem value="bioinformatics">生物信息学</SelectItem>
                  <SelectItem value="gene_therapy">基因治疗</SelectItem>
                  <SelectItem value="microbiome">微生物组学</SelectItem>
                  <SelectItem value="proteomics">蛋白质组学</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-3">热度</h4>
            <div className="space-y-2">
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue placeholder="选择热度" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部热度</SelectItem>
                  <SelectItem value="very_high">非常热门 (8-10)</SelectItem>
                  <SelectItem value="high">热门 (6-8)</SelectItem>
                  <SelectItem value="medium">一般 (4-6)</SelectItem>
                  <SelectItem value="low">较冷门 (2-4)</SelectItem>
                  <SelectItem value="very_low">冷门 (0-2)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-3">趋势</h4>
            <div className="space-y-2">
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue placeholder="选择趋势" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部趋势</SelectItem>
                  <SelectItem value="up">上升</SelectItem>
                  <SelectItem value="stable">稳定</SelectItem>
                  <SelectItem value="down">下降</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-3">排序方式</h4>
            <div className="space-y-2">
              <Select defaultValue="hotness_desc">
                <SelectTrigger>
                  <SelectValue placeholder="排序方式" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hotness_desc">热度 (最高)</SelectItem>
                  <SelectItem value="trend_desc">趋势增长 (最快)</SelectItem>
                  <SelectItem value="papers_desc">论文数量 (最多)</SelectItem>
                  <SelectItem value="researchers_desc">学者数量 (最多)</SelectItem>
                  <SelectItem value="name_asc">方向名称 (A-Z)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="pt-2">
            <Button className="w-full">应用筛选</Button>
          </div>
        </div>

        {/* 方向列表 */}
        <div className="grid gap-6 md:grid-cols-2">
          {directions.map((direction) => (
            <CardDirection key={direction.id} direction={direction} />
          ))}

          {/* 分页 */}
          <div className="flex items-center justify-between pt-4 md:col-span-2">
            <div className="text-sm text-muted-foreground">
              显示 <span className="font-medium">1-6</span> 共 <span className="font-medium">124</span> 条结果
            </div>
            <div className="flex items-center gap-1">
              <Button variant="outline" size="sm" disabled>
                上一页
              </Button>
              <Button variant="outline" size="sm" className="w-9 px-0">
                1
              </Button>
              <Button variant="outline" size="sm" className="w-9 px-0">
                2
              </Button>
              <Button variant="outline" size="sm" className="w-9 px-0">
                3
              </Button>
              <span className="mx-1">...</span>
              <Button variant="outline" size="sm" className="w-9 px-0">
                13
              </Button>
              <Button variant="outline" size="sm">
                下一页
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
