import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CardPaper } from "@/components/card-paper"
import { CardResearcher } from "@/components/card-researcher"
import { CardTeam } from "@/components/card-team"
import { CardDirection } from "@/components/card-direction"

// 模拟数据
const featuredPapers = [
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
]

const featuredResearchers = [
  {
    id: "researcher1",
    name: "张伟",
    title: "教授",
    institution: "北京大学",
    department: "生命科学学院",
    researchAreas: ["基因组学", "表观遗传学", "生物信息学"],
    hIndex: 45,
    citations: 12500,
    papers: 120,
  },
  {
    id: "researcher2",
    name: "李明",
    title: "研究员",
    institution: "中国科学院",
    department: "遗传与发育生物学研究所",
    researchAreas: ["发育生物学", "干细胞", "再生医学"],
    hIndex: 38,
    citations: 9800,
    papers: 95,
  },
]

const featuredTeams = [
  {
    id: "team1",
    name: "基因组学与精准医学团队",
    institution: "北京大学",
    leader: {
      id: "researcher1",
      name: "张伟",
    },
    researchAreas: ["基因组学", "精准医学", "生物信息学"],
    memberCount: 25,
    papers: 215,
    citations: 18500,
  },
  {
    id: "team2",
    name: "干细胞与再生医学研究团队",
    institution: "中国科学院",
    leader: {
      id: "researcher2",
      name: "李明",
    },
    researchAreas: ["干细胞", "再生医学", "组织工程"],
    memberCount: 18,
    papers: 175,
    citations: 14200,
  },
]

const featuredDirections = [
  {
    id: "direction1",
    name: "空间转录组学",
    description:
      "空间转录组学是一种新兴的技术，可以在保留空间信息的同时分析组织中基因表达的空间分布，为理解复杂组织的功能和疾病机制提供了新的视角。",
    parentDirection: {
      id: "parent1",
      name: "单细胞生物学",
    },
    papers: 450,
    researchers: 120,
    teams: 35,
    trend: "up",
    trendPercentage: 45,
    hotness: 9,
  },
  {
    id: "direction2",
    name: "RNA修饰与调控",
    description:
      "RNA修饰是指RNA分子上的化学修饰，如m6A、m5C等，这些修饰可以调控RNA的稳定性、翻译效率和亚细胞定位，在基因表达调控中发挥重要作用。",
    parentDirection: {
      id: "parent2",
      name: "RNA生物学",
    },
    papers: 380,
    researchers: 95,
    teams: 28,
    trend: "up",
    trendPercentage: 32,
    hotness: 8,
  },
]

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 英雄区域 */}
      <section className="bg-gradient-to-b from-muted/50 to-background py-12 md:py-24">
        <div className="container grid gap-6 md:grid-cols-2 md:gap-12 items-center">
          <div className="flex flex-col gap-4">
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
              数据驱动的
              <br />
              生物基因科研情报
            </h1>
            <p className="text-xl text-muted-foreground">
              华因智汇为科研工作者提供全面的论文、学者、团队和研究方向分析，助力科研决策与创新。
            </p>
            <div className="relative mt-4">
              <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="搜索论文、学者、团队或研究方向..."
                className="pl-10 pr-20 h-12 text-base"
              />
              <Button className="absolute right-1 top-1 h-10">搜索</Button>
            </div>
            <div className="flex flex-wrap gap-2 text-sm text-muted-foreground mt-2">
              热门搜索:
              <Link href="/search?q=单细胞测序" className="hover:text-primary transition-colors">
                单细胞测序
              </Link>
              <Link href="/search?q=CRISPR" className="hover:text-primary transition-colors">
                CRISPR
              </Link>
              <Link href="/search?q=空间转录组" className="hover:text-primary transition-colors">
                空间转录组
              </Link>
            </div>
          </div>
          <div className="hidden md:flex justify-end">
            <Image
              src="https://pic4.zhimg.com/v2-e740896fbf2dbcc83541272910602ef5_1440w.gif"
              alt="科研数据可视化"
              width={500}
              height={500}
              className="rounded-lg"
              priority
            />
          </div>
        </div>
      </section>

      {/* 平台特点 */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl mb-4">科研情报的智能分析平台</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              华因智汇整合多源数据，通过AI赋能，为科研工作者提供深度洞察
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="bg-muted/50 rounded-lg p-6 flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4">
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
                  className="lucide lucide-file-text"
                >
                  <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" x2="8" y1="13" y2="13" />
                  <line x1="16" x2="8" y1="17" y2="17" />
                  <line x1="10" x2="8" y1="9" y2="9" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">科研论文</h3>
              <p className="text-muted-foreground">整合PubMed、CNKI等多源数据，提供论文智能分析与解读</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-6 flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4">
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
                  className="lucide lucide-user"
                >
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">科研学者</h3>
              <p className="text-muted-foreground">全面展示学者背景、研究方向、学术影响力与合作网络</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-6 flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4">
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
                  className="lucide lucide-users"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">科研团队</h3>
              <p className="text-muted-foreground">智能识别研究团队，分析团队结构、研究方向与学术产出</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-6 flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4">
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
                  className="lucide lucide-git-branch"
                >
                  <line x1="6" x2="6" y1="3" y2="15" />
                  <circle cx="18" cy="6" r="3" />
                  <circle cx="6" cy="18" r="3" />
                  <path d="M18 9a9 9 0 0 1-9 9" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">科研方向</h3>
              <p className="text-muted-foreground">动态追踪研究热点，分析方向发展趋势与地区分布</p>
            </div>
          </div>
        </div>
      </section>

      {/* 热门论文 */}
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">热门论文</h2>
            <Button variant="ghost" className="gap-1">
              查看更多 <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {featuredPapers.map((paper) => (
              <CardPaper key={paper.id} paper={paper} />
            ))}
          </div>
        </div>
      </section>

      {/* 热门学者 */}
      <section className="py-12 md:py-16 bg-muted/30">
        <div className="container">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">热门学者</h2>
            <Button variant="ghost" className="gap-1">
              查看更多 <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {featuredResearchers.map((researcher) => (
              <CardResearcher key={researcher.id} researcher={researcher} />
            ))}
          </div>
        </div>
      </section>

      {/* 热门团队和研究方向 */}
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="grid gap-12 md:grid-cols-2">
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">热门团队</h2>
                <Button variant="ghost" className="gap-1">
                  查看更多 <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
              <div className="grid gap-6">
                {featuredTeams.map((team) => (
                  <CardTeam key={team.id} team={team} />
                ))}
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">热门研究方向</h2>
                <Button variant="ghost" className="gap-1">
                  查看更多 <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
              <div className="grid gap-6">
                {featuredDirections.map((direction) => (
                  <CardDirection key={direction.id} direction={direction} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 数据统计 */}
      <section className="py-12 md:py-16 bg-muted/30">
        <div className="container">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl mb-4">平台数据</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              华因智汇持续整合国内外生物基因领域的科研数据
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-4">
            <div className="bg-background rounded-lg p-6 text-center">
              <div className="text-4xl font-bold text-primary mb-2">2.5M+</div>
              <div className="text-muted-foreground">科研论文</div>
            </div>
            <div className="bg-background rounded-lg p-6 text-center">
              <div className="text-4xl font-bold text-primary mb-2">150K+</div>
              <div className="text-muted-foreground">科研学者</div>
            </div>
            <div className="bg-background rounded-lg p-6 text-center">
              <div className="text-4xl font-bold text-primary mb-2">8.5K+</div>
              <div className="text-muted-foreground">科研团队</div>
            </div>
            <div className="bg-background rounded-lg p-6 text-center">
              <div className="text-4xl font-bold text-primary mb-2">1.2K+</div>
              <div className="text-muted-foreground">研究方向</div>
            </div>
          </div>
        </div>
      </section>

      {/* 订阅区域 */}
      <section className="py-12 md:py-16 bg-primary text-primary-foreground">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl mb-4">订阅科研动态</h2>
            <p className="text-xl opacity-90 mb-6">及时获取您关注的领域最新研究进展、学者动态和热点方向</p>
            <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="请输入您的邮箱"
                className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/70"
              />
              <Button variant="secondary" className="shrink-0">
                订阅
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
