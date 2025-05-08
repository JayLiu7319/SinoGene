import { Filter, Search, SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Breadcrumb } from "@/components/breadcrumb"
import { CardPaper } from "@/components/card-paper"

// 模拟数据
const papers = [
  {
    id: "paper1",
    title: "单细胞RNA测序揭示人类胚胎发育中的细胞命运决定机制",
    authors: [
      { id: "author1", name: "张伟" },
      { id: "author2", name: "李明" },
      { id: "author3", name: "王芳" },
    ],
    journal: "Nature",
    year: 2023,
    abstract:
      "本研究利用单细胞RNA测序技术，对人类早期胚胎发育过程中的细胞转录组进行了系统分析，揭示了细胞命运决定的分子机制，为理解人类发育提供了新的见解。",
    keywords: ["单细胞测序", "胚胎发育", "细胞命运"],
    doi: "10.1038/s41586-023-12345-6",
    citations: 87,
    coverImage: "https://www.aksomics.com/uploads/2022/02/211636501326.png",
    tags: [
      { type: "top", label: "顶刊" },
      { type: "hot", label: "热门" },
    ],
  },
  {
    id: "paper2",
    title: "CRISPR-Cas9介导的基因编辑在治疗遗传性疾病中的应用进展",
    authors: [
      { id: "author4", name: "陈静" },
      { id: "author5", name: "刘强" },
    ],
    journal: "Cell",
    year: 2023,
    abstract:
      "本综述总结了CRISPR-Cas9基因编辑技术在治疗遗传性疾病中的最新进展，讨论了临床应用面临的挑战和未来发展方向，为基因治疗提供了新的思路。",
    keywords: ["CRISPR-Cas9", "基因编辑", "遗传病"],
    doi: "10.1016/j.cell.2023.54321",
    citations: 65,
    coverImage: "https://iotasciences.com/wp-content/uploads/2024/06/CRISPR-Cas9_mechanism.jpg",
    tags: [
      { type: "top", label: "顶刊" },
      { type: "new", label: "最新" },
    ],
  },
  {
    id: "paper3",
    title: "人类肠道菌群与免疫系统相互作用的分子机制研究",
    authors: [
      { id: "author6", name: "赵敏" },
      { id: "author7", name: "孙宇" },
    ],
    journal: "Science",
    year: 2022,
    abstract:
      "本研究通过多组学方法揭示了肠道菌群与宿主免疫系统之间的相互作用机制，发现了特定菌群代谢物调控免疫细胞功能的新途径，为肠道疾病的治疗提供了新靶点。",
    keywords: ["肠道菌群", "免疫系统", "代谢组学"],
    doi: "10.1126/science.2022.98765",
    citations: 42,
    tags: [{ type: "top", label: "顶刊" }],
  },
  {
    id: "paper4",
    title: "基于深度学习的蛋白质结构预测方法及其在药物设计中的应用",
    authors: [
      { id: "author8", name: "黄强" },
      { id: "author9", name: "吴佳" },
      { id: "author10", name: "张明" },
    ],
    journal: "Nature Methods",
    year: 2022,
    abstract:
      "本研究开发了一种基于深度学习的蛋白质三维结构预测算法，显著提高了预测精度，并将其应用于靶向设计药物，为新药研发提供了有力工具。",
    keywords: ["深度学习", "蛋白质结构", "药物设计"],
    doi: "10.1038/nmeth.2022.54321",
    citations: 56,
    coverImage: "https://developer-blogs.nvidia.com/wp-content/uploads/2021/07/Predicted-protein-structures.png",
    tags: [{ type: "featured", label: "精选" }],
  },
  {
    id: "paper5",
    title: "表观遗传修饰在干细胞分化过程中的动态变化及调控机制",
    authors: [
      { id: "author11", name: "林华" },
      { id: "author12", name: "郑重" },
    ],
    journal: "Cell Stem Cell",
    year: 2021,
    abstract:
      "本研究系统分析了干细胞分化过程中组蛋白修饰和DNA甲基化的动态变化模式，揭示了表观遗传修饰在调控干细胞命运决定中的关键作用。",
    keywords: ["表观遗传学", "干细胞", "分化"],
    doi: "10.1016/j.stem.2021.12345",
    citations: 38,
  },
  {
    id: "paper6",
    title: "新型冠状病毒变异株的进化动力学及免疫逃逸机制",
    authors: [
      { id: "author13", name: "王刚" },
      { id: "author14", name: "李红" },
      { id: "author15", name: "张伟" },
    ],
    journal: "Nature Microbiology",
    year: 2022,
    abstract:
      "本研究通过对全球新冠病毒基因组数据的分析，揭示了病毒变异株的进化动力学和免疫逃逸机制，为疫苗更新和防控策略提供了科学依据。",
    keywords: ["新冠病毒", "进化动力学", "免疫逃逸"],
    doi: "10.1038/s41564-022-67890",
    citations: 75,
    coverImage: "https://cms-emer-res.cctvnews.cctv.com/cctv/video/bb37f6ef5c3f40fb957ac64cbb7c71a8/20211128105547218.png",
    tags: [{ type: "hot", label: "热门" }],
  },
]

export default function PapersPage() {
  return (
    <div className="container-content">
      <Breadcrumb segments={[{ name: "论文", href: "/papers" }]} className="mb-6" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <h1 className="text-3xl font-bold">科研论文</h1>
        <div className="flex items-center gap-2">
          <div className="relative w-full md:w-auto">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="搜索论文..." className="pl-9 w-full md:w-[300px]" />
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
            <h3 className="font-medium mb-3">发表年份</h3>
            <div className="space-y-2">
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue placeholder="选择年份" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部年份</SelectItem>
                  <SelectItem value="2023">2023</SelectItem>
                  <SelectItem value="2022">2022</SelectItem>
                  <SelectItem value="2021">2021</SelectItem>
                  <SelectItem value="2020">2020</SelectItem>
                  <SelectItem value="2019">2019</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-3">期刊</h3>
            <div className="space-y-2">
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue placeholder="选择期刊" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部期刊</SelectItem>
                  <SelectItem value="nature">Nature</SelectItem>
                  <SelectItem value="science">Science</SelectItem>
                  <SelectItem value="cell">Cell</SelectItem>
                  <SelectItem value="nature_methods">Nature Methods</SelectItem>
                  <SelectItem value="cell_stem_cell">Cell Stem Cell</SelectItem>
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
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-3">排序方式</h3>
            <div className="space-y-2">
              <Select defaultValue="date_desc">
                <SelectTrigger>
                  <SelectValue placeholder="排序方式" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date_desc">发表时间 (最新)</SelectItem>
                  <SelectItem value="date_asc">发表时间 (最早)</SelectItem>
                  <SelectItem value="citations_desc">引用次数 (最多)</SelectItem>
                  <SelectItem value="citations_asc">引用次数 (最少)</SelectItem>
                  <SelectItem value="relevance">相关度</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="pt-2">
            <Button className="w-full">应用筛选</Button>
          </div>
        </div>

        {/* 论文列表 */}
        <div className="space-y-6">
          {papers.map((paper) => (
            <CardPaper key={paper.id} paper={paper} />
          ))}

          {/* 分页 */}
          <div className="flex items-center justify-between pt-4">
            <div className="text-sm text-muted-foreground">
              显示 <span className="font-medium">1-6</span> 共 <span className="font-medium">256</span> 条结果
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
                26
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
