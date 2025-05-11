// Mock data for search results
export const mockPapers = [
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
    coverImage: "/genomics-abstract.png",
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
    coverImage: "/crispr-mechanism.png",
    tags: [
      { type: "top", label: "顶刊" },
      { type: "new", label: "最新" },
    ],
  },
]

export const mockResearchers = [
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
    avatar: "/diverse-professor-lecturing.png",
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
    avatar: "/diverse-research-team.png",
  },
]

export const mockTeams = [
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
    image: "/research-team.png",
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
    image: "/stem-cell-research.png",
  },
]

export const mockDirections = [
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
    image: "/spatial-transcriptomics.png",
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
    image: "/rna-modification.png",
  },
]
