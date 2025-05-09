import { Filter, Search, SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Breadcrumb } from "@/components/breadcrumb"
import { CardResearcher } from "@/components/card-researcher"

// 模拟数据
const researchers = [
  {
    id: "1",
    name: "张三",
    avatar: "/diverse-research-team.png",
    title: "教授",
    institution: "北京大学",
    department: "生物医学工程系",
    researchAreas: ["基因组学", "生物信息学", "表观遗传学"],
    hIndex: 45,
    citations: 12500,
    papers: 120,
    tags: [
      { type: "top", label: "顶尖学者" },
      { type: "cited", label: "高引用" },
    ],
  },
  {
    id: "2",
    name: "李四",
    avatar: "/scientist-in-lab.png",
    title: "副教授",
    institution: "清华大学",
    department: "生命科学学院",
    researchAreas: ["分子生物学", "细胞生物学", "蛋白质组学"],
    hIndex: 32,
    citations: 8200,
    papers: 85,
    tags: [{ type: "rising", label: "新星学者" }],
  },
  {
    id: "3",
    name: "王五",
    avatar: "/diverse-professor-lecturing.png",
    title: "研究员",
    institution: "中国科学院",
    department: "遗传与发育生物学研究所",
    researchAreas: ["发育生物学", "干细胞", "再生医学"],
    hIndex: 38,
    citations: 9800,
    papers: 95,
    tags: [{ type: "active", label: "活跃学者" }],
  },
  {
    id: "4",
    name: "赵六",
    avatar: "/female-researcher.png",
    title: "助理教授",
    institution: "复旦大学",
    department: "基础医学院",
    researchAreas: ["神经科学", "认知科学", "脑科学"],
    hIndex: 25,
    citations: 5600,
    papers: 65,
    tags: [{ type: "new", label: "新入职" }],
  },
  {
    id: "5",
    name: "钱七",
    avatar: "/male-scientist.png",
    title: "教授",
    institution: "浙江大学",
    department: "医学院",
    researchAreas: ["肿瘤学", "免疫学", "精准医疗"],
    hIndex: 42,
    citations: 11200,
    papers: 110,
    tags: [
      { type: "top", label: "顶尖学者" },
      { type: "active", label: "活跃学者" },
    ],
  },
  {
    id: "6",
    name: "孙八",
    avatar: "/asian-professor.png",
    title: "研究员",
    institution: "上海交通大学",
    department: "生物工程学院",
    researchAreas: ["合成生物学", "代谢工程", "系统生物学"],
    hIndex: 35,
    citations: 8900,
    papers: 90,
    tags: [{ type: "innovative", label: "创新者" }],
  },
]

export default function ResearchersPage() {
  return (
    <div className="container-content">
      <Breadcrumb segments={[{ name: "学者", href: "/researchers" }]} className="mb-6" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <h1 className="text-3xl font-bold">科研学者</h1>
        <div className="flex items-center gap-2">
          <div className="relative w-full md:w-auto">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="搜索学者..." className="pl-9 w-full md:w-[300px]" />
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
            <h4 className="font-medium mb-3">机构</h4>
            <div className="space-y-2">
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue placeholder="选择机构" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部机构</SelectItem>
                  <SelectItem value="pku">北京大学</SelectItem>
                  <SelectItem value="tsinghua">清华大学</SelectItem>
                  <SelectItem value="fudan">复旦大学</SelectItem>
                  <SelectItem value="sjtu">上海交通大学</SelectItem>
                  <SelectItem value="zju">浙江大学</SelectItem>
                  <SelectItem value="cas">中国科学院</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-3">职称</h4>
            <div className="space-y-2">
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue placeholder="选择职称" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部职称</SelectItem>
                  <SelectItem value="professor">教授</SelectItem>
                  <SelectItem value="associate_professor">副教授</SelectItem>
                  <SelectItem value="assistant_professor">助理教授</SelectItem>
                  <SelectItem value="researcher">研究员</SelectItem>
                  <SelectItem value="associate_researcher">副研究员</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-3">研究方向</h4>
            <div className="space-y-2">
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue placeholder="选择研究方向" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部方向</SelectItem>
                  <SelectItem value="genomics">基因组学</SelectItem>
                  <SelectItem value="gene_editing">基因编辑</SelectItem>
                  <SelectItem value="single_cell">单细胞生物学</SelectItem>
                  <SelectItem value="immunology">免疫学</SelectItem>
                  <SelectItem value="bioinformatics">生物信息学</SelectItem>
                  <SelectItem value="stem_cell">干细胞</SelectItem>
                  <SelectItem value="structural_biology">结构生物学</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-3">排序方式</h4>
            <div className="space-y-2">
              <Select defaultValue="h_index_desc">
                <SelectTrigger>
                  <SelectValue placeholder="排序方式" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="h_index_desc">H-index (最高)</SelectItem>
                  <SelectItem value="citations_desc">引用次数 (最多)</SelectItem>
                  <SelectItem value="papers_desc">论文数量 (最多)</SelectItem>
                  <SelectItem value="name_asc">姓名 (A-Z)</SelectItem>
                  <SelectItem value="relevance">相关度</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="pt-2">
            <Button className="w-full">应用筛选</Button>
          </div>
        </div>

        {/* 学者列表 */}
        <div className="grid gap-6 md:grid-cols-2">
          {researchers.map((researcher) => (
            <CardResearcher key={researcher.id} researcher={researcher} />
          ))}

          {/* 分页 */}
          <div className="flex items-center justify-between pt-4 md:col-span-2">
            <div className="text-sm text-muted-foreground">
              显示 <span className="font-medium">1-6</span> 共 <span className="font-medium">152</span> 条结果
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
                16
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
