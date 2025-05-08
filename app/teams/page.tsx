import { Filter, Search, SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Breadcrumb } from "@/components/breadcrumb"
import { CardTeam } from "@/components/card-team"

// 模拟数据
const teams = [
  {
    id: "1",
    name: "基因组学与生物信息学研究团队",
    institution: "北京大学",
    leader: {
      id: "1",
      name: "张三",
      avatar: "/diverse-research-team.png",
    },
    researchAreas: ["基因组学", "生物信息学", "表观遗传学"],
    memberCount: 25,
    papers: 180,
    citations: 15000,
    tags: [
      { type: "top", label: "顶尖团队" },
      { type: "productive", label: "高产出" },
    ],
  },
  {
    id: "2",
    name: "分子生物学与细胞工程实验室",
    institution: "清华大学",
    leader: {
      id: "2",
      name: "李四",
      avatar: "/scientist-in-lab.png",
    },
    researchAreas: ["分子生物学", "细胞工程", "蛋白质组学"],
    memberCount: 18,
    papers: 120,
    citations: 9800,
    tags: [{ type: "collaborative", label: "高协作" }],
  },
  {
    id: "3",
    name: "发育生物学与再生医学研究中心",
    institution: "中国科学院",
    leader: {
      id: "3",
      name: "王五",
      avatar: "/diverse-professor-lecturing.png",
    },
    researchAreas: ["发育生物学", "干细胞", "再生医学"],
    memberCount: 22,
    papers: 150,
    citations: 12500,
    tags: [{ type: "innovative", label: "创新团队" }],
  },
  {
    id: "4",
    name: "神经科学与认知研究实验室",
    institution: "复旦大学",
    leader: {
      id: "4",
      name: "赵六",
      avatar: "/female-researcher.png",
    },
    researchAreas: ["神经科学", "认知科学", "脑科学"],
    memberCount: 15,
    papers: 90,
    citations: 7200,
    tags: [{ type: "emerging", label: "新兴团队" }],
  },
  {
    id: "5",
    name: "肿瘤免疫与精准医疗研究团队",
    institution: "浙江大学",
    leader: {
      id: "5",
      name: "钱七",
      avatar: "/male-scientist.png",
    },
    researchAreas: ["肿瘤学", "免疫学", "精准医疗"],
    memberCount: 28,
    papers: 200,
    citations: 18000,
    tags: [
      { type: "top", label: "顶尖团队" },
      { type: "productive", label: "高产出" },
    ],
  },
  {
    id: "6",
    name: "合成生物学与代谢工程实验室",
    institution: "上海交通大学",
    leader: {
      id: "6",
      name: "孙八",
      avatar: "/asian-professor.png",
    },
    researchAreas: ["合成生物学", "代谢工程", "系统生物学"],
    memberCount: 20,
    papers: 130,
    citations: 10500,
    tags: [{ type: "innovative", label: "创新团队" }],
  },
]

export default function TeamsPage() {
  return (
    <div className="container-content">
      <Breadcrumb segments={[{ name: "团队", href: "/teams" }]} className="mb-6" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <h1 className="text-3xl font-bold">科研团队</h1>
        <div className="flex items-center gap-2">
          <div className="relative w-full md:w-auto">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="搜索团队..." className="pl-9 w-full md:w-[300px]" />
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
            <h3 className="font-medium mb-3">机构</h3>
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
            <h3 className="font-medium mb-3">研究方向</h3>
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
                  <SelectItem value="synthetic_biology">合成生物学</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-3">团队规模</h3>
            <div className="space-y-2">
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue placeholder="选择团队规模" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部规模</SelectItem>
                  <SelectItem value="small">小型 (≤10人)</SelectItem>
                  <SelectItem value="medium">中型 (11-20人)</SelectItem>
                  <SelectItem value="large">大型 (21-30人)</SelectItem>
                  <SelectItem value="very_large">超大型 ({">"}30人)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-3">排序方式</h3>
            <div className="space-y-2">
              <Select defaultValue="citations_desc">
                <SelectTrigger>
                  <SelectValue placeholder="排序方式" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="citations_desc">引用次数 (最多)</SelectItem>
                  <SelectItem value="papers_desc">论文数量 (最多)</SelectItem>
                  <SelectItem value="members_desc">成员数量 (最多)</SelectItem>
                  <SelectItem value="name_asc">团队名称 (A-Z)</SelectItem>
                  <SelectItem value="relevance">相关度</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="pt-2">
            <Button className="w-full">应用筛选</Button>
          </div>
        </div>

        {/* 团队列表 */}
        <div className="grid gap-6 md:grid-cols-2">
          {teams.map((team) => (
            <CardTeam key={team.id} team={team} />
          ))}

          {/* 分页 */}
          <div className="flex items-center justify-between pt-4 md:col-span-2">
            <div className="text-sm text-muted-foreground">
              显示 <span className="font-medium">1-6</span> 共 <span className="font-medium">98</span> 条结果
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
                10
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
