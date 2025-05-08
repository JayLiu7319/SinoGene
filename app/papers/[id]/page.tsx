"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Bookmark, ExternalLink, Share2, Mail, ChevronDown, ChevronUp, Languages } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Breadcrumb } from "@/components/breadcrumb"

export default function PaperDetailPage({ params }: { params: { id: string } }) {
  const [showEnglishTitle, setShowEnglishTitle] = useState(false)
  const [showFullEnglishAbstract, setShowFullEnglishAbstract] = useState(false)

  // 中英文标题
  const chineseTitle = "单细胞RNA测序揭示人类胚胎发育中的细胞命运决定机制"
  const englishTitle =
    "Single-cell RNA sequencing reveals cell fate determination mechanisms during human embryonic development"

  // 中英文摘要
  const chineseAbstract = `本研究利用单细胞RNA测序技术，对人类早期胚胎发育过程中的细胞转录组进行了系统分析，揭示了细胞命运决定的分子机制，为理解人类发育提供了新的见解。

我们对从受精卵到原肠胚阶段的人类胚胎进行了单细胞转录组测序，获得了超过10,000个细胞的基因表达谱。通过分析这些数据，我们识别了关键的发育时间点和调控因子，构建了早期胚胎发育的基因调控网络。

研究发现，在胚胎发育的不同阶段，特定的转录因子组合激活或抑制下游基因表达，引导细胞向特定命运分化。我们还发现了一些新的调控因子，它们在特定细胞类型的形成中起关键作用。

此外，我们通过比较人类与小鼠胚胎发育的单细胞转录组数据，揭示了物种间保守和特异的发育调控机制，为理解人类特有的发育过程提供了重要线索。

本研究为理解人类早期胚胎发育的分子机制提供了宝贵资源，也为研究发育异常和相关疾病提供了新的视角。`

  const englishAbstract = `This study employs single-cell RNA sequencing technology to systematically analyze cellular transcriptomes during early human embryonic development, revealing the molecular mechanisms of cell fate determination and providing new insights into human development.

We performed single-cell transcriptome sequencing on human embryos from the fertilized egg to the gastrula stage, obtaining gene expression profiles of over 10,000 cells. By analyzing these data, we identified key developmental timepoints and regulatory factors, constructing a gene regulatory network for early embryonic development.

The research found that at different stages of embryonic development, specific combinations of transcription factors activate or inhibit downstream gene expression, guiding cells to differentiate toward specific fates. We also discovered several novel regulatory factors that play crucial roles in the formation of specific cell types.

Furthermore, by comparing single-cell transcriptome data between human and mouse embryonic development, we revealed conserved and species-specific developmental regulatory mechanisms, providing important clues for understanding human-specific developmental processes.

This study provides valuable resources for understanding the molecular mechanisms of early human embryonic development and offers new perspectives for studying developmental abnormalities and related diseases.`

  return (
    <div className="container-content">
      <Breadcrumb
        segments={[
          { name: "论文", href: "/papers" },
          { name: "论文详情", href: `/papers/${params.id}` },
        ]}
        className="mb-6"
      />

      <div className="mb-4">
        {/* 标题区域 */}
        <div className="flex justify-between items-start gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 flex-shrink-0"
                onClick={() => setShowEnglishTitle(!showEnglishTitle)}
                title={showEnglishTitle ? "显示中文标题" : "显示英文标题"}
              >
                <Languages className="h-4 w-4" />
                <span className="sr-only">{showEnglishTitle ? "显示中文标题" : "显示英文标题"}</span>
              </Button>
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                <h1 className="text-2xl font-bold">{showEnglishTitle ? englishTitle : chineseTitle}</h1>
                <div className="flex flex-wrap gap-1">
                  <Badge variant="secondary" className="bg-purple-50 text-purple-700 border-purple-200">
                    顶刊
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
              DOI
            </Button>
            <Button variant="outline" size="sm" className="gap-1">
              <Bookmark className="h-3.5 w-3.5" />
              收藏
            </Button>
            <Button variant="outline" size="sm" className="gap-1">
              <Share2 className="h-3.5 w-3.5" />
              分享
            </Button>
            <Button variant="outline" size="icon" asChild>
              <Link href="/papers">
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">返回</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex flex-wrap gap-x-6 gap-y-3">
          {/* 第一作者 */}
          <div>
            <div className="flex items-center">
              <Link href="/researchers/author1" className="font-medium text-primary hover:underline">
                张伟
              </Link>
              <Badge variant="outline" className="ml-1 text-xs px-1.5 py-0 h-5">
                第一作者
              </Badge>
            </div>
            <div className="text-xs text-muted-foreground mt-1">中国科学院遗传与发育生物学研究所</div>
          </div>

          {/* 其他作者 */}
          <div>
            <div className="flex items-center">
              <Link href="/researchers/author2" className="hover:text-primary transition-colors">
                李明
              </Link>
            </div>
            <div className="text-xs text-muted-foreground mt-1">清华大学医学院</div>
          </div>

          {/* 通讯作者 */}
          <div>
            <div className="flex items-center">
              <Link href="/researchers/author3" className="font-medium text-primary hover:underline flex items-center">
                王芳
                <Mail className="h-3 w-3 ml-1" />
              </Link>
              <Badge variant="outline" className="ml-1 text-xs px-1.5 py-0 h-5">
                通讯作者
              </Badge>
            </div>
            <div className="text-xs text-muted-foreground mt-1">北京大学生命科学学院，国家蛋白质科学中心</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">
        <div>
          {/* 论文主体内容 */}
          <div className="space-y-8">
            {/* 基本信息 */}
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">单细胞测序</Badge>
                <Badge variant="secondary">胚胎发育</Badge>
                <Badge variant="secondary">细胞命运</Badge>
              </div>
            </div>

            {/* 论文内容标签页 */}
            <Tabs defaultValue="abstract">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="abstract">摘要</TabsTrigger>
                <TabsTrigger value="ai-analysis">AI解读</TabsTrigger>
                <TabsTrigger value="funding">基金资助</TabsTrigger>
                <TabsTrigger value="references">参考文献</TabsTrigger>
                <TabsTrigger value="citations">引用</TabsTrigger>
              </TabsList>
              <TabsContent value="abstract" className="space-y-6 pt-4">
                {/* 中文摘要 */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">中文摘要</h3>
                  <div className="prose max-w-none">
                    {chineseAbstract.split("\n\n").map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>
                </div>

                {/* 英文摘要 */}
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-lg font-semibold">英文摘要 (Original Abstract)</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowFullEnglishAbstract(!showFullEnglishAbstract)}
                      className="text-xs"
                    >
                      {showFullEnglishAbstract ? (
                        <>
                          收起 <ChevronUp className="h-3 w-3 ml-1" />
                        </>
                      ) : (
                        <>
                          展开 <ChevronDown className="h-3 w-3 ml-1" />
                        </>
                      )}
                    </Button>
                  </div>
                  <div className="prose max-w-none">
                    {showFullEnglishAbstract ? (
                      englishAbstract.split("\n\n").map((paragraph, index) => <p key={index}>{paragraph}</p>)
                    ) : (
                      <>
                        <p>{englishAbstract.split("\n\n")[0]}</p>
                        {englishAbstract.split("\n\n").length > 1 && (
                          <p className="text-muted-foreground text-sm">点击"展开"查看完整英文摘要...</p>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="ai-analysis" className="space-y-6 pt-4">
                <div className="bg-muted/50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">一句话总结</h3>
                  <p>
                    该研究通过单细胞RNA测序技术分析人类早期胚胎发育过程中的基因表达变化，揭示了细胞命运决定的分子机制和关键调控因子。
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">核心创新点</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>首次对人类从受精卵到原肠胚全过程进行高分辨率单细胞转录组分析</li>
                    <li>发现了新的细胞命运决定关键调控因子</li>
                    <li>构建了人类早期胚胎发育的基因调控网络</li>
                    <li>揭示了人类特有的发育调控机制</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">实验方法概述</h3>
                  <p className="mb-4">
                    研究采用10x Genomics单细胞RNA测序技术，结合生物信息学分析方法，对人类早期胚胎样本进行了系统研究。
                  </p>
                  <Image
                    src="/placeholder.svg?key=z25so"
                    alt="单细胞RNA测序实验流程图"
                    width={600}
                    height={200}
                    className="rounded-lg w-full"
                  />
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">主要结论</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>人类胚胎发育过程中存在多个关键的细胞命运决定时间点</li>
                    <li>特定的转录因子组合��细胞分化过程中起决定性作用</li>
                    <li>发现了多个新的调控因子，它们在特定细胞类型形成中至关重要</li>
                    <li>人类与小鼠胚胎发育存在显著的物种特异性调控机制</li>
                  </ul>
                </div>
              </TabsContent>
              <TabsContent value="funding" className="pt-4">
                <h3 className="text-lg font-semibold mb-4">基金资助信息</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-muted">
                        <th className="border px-4 py-2 text-left">基金名称</th>
                        <th className="border px-4 py-2 text-left">项目编号</th>
                        <th className="border px-4 py-2 text-left">资助金额</th>
                        <th className="border px-4 py-2 text-left">起止时间</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border px-4 py-2">国家自然科学基金重点项目</td>
                        <td className="border px-4 py-2">82030037</td>
                        <td className="border px-4 py-2">320万元</td>
                        <td className="border px-4 py-2">2021-01 至 2025-12</td>
                      </tr>
                      <tr className="bg-muted/30">
                        <td className="border px-4 py-2">国家重点研发计划</td>
                        <td className="border px-4 py-2">2021YFC2700300</td>
                        <td className="border px-4 py-2">1500万元</td>
                        <td className="border px-4 py-2">2021-07 至 2026-06</td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2">中国科学院战略性先导科技专项</td>
                        <td className="border px-4 py-2">XDA16020700</td>
                        <td className="border px-4 py-2">280万元</td>
                        <td className="border px-4 py-2">2020-01 至 2024-12</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-sm text-muted-foreground mt-4">
                  注：基金资助信息来源于论文致谢部分和国家自然科学基金委员会公开数据。
                </p>
              </TabsContent>
              <TabsContent value="references" className="pt-4">
                <p className="text-muted-foreground mb-4">参考文献列表 (15)</p>
                <div className="space-y-4">
                  {/* 这里只展示几个示例参考文献 */}
                  <div className="p-4 border rounded-lg">
                    <p className="font-medium">
                      Single-cell RNA-seq reveals lineage and X chromosome dynamics in human preimplantation embryos
                    </p>
                    <p className="text-sm text-muted-foreground">Petropoulos S, et al. Cell, 2016</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <p className="font-medium">Establishment of a human blastocyst stem cell line</p>
                    <p className="text-sm text-muted-foreground">Liu X, et al. Nature, 2021</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <p className="font-medium">Spatiotemporal transcriptomic atlas of mouse organogenesis</p>
                    <p className="text-sm text-muted-foreground">Cao J, et al. Cell, 2019</p>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="citations" className="pt-4">
                <p className="text-muted-foreground mb-4">被引用论文列表 (87)</p>
                <div className="space-y-4">
                  {/* 这里只展示几个示例引用论文 */}
                  <div className="p-4 border rounded-lg">
                    <p className="font-medium">
                      Spatial transcriptomics of human embryonic organoids reveals novel developmental mechanisms
                    </p>
                    <p className="text-sm text-muted-foreground">Chen Y, et al. Nature Cell Biology, 2023</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <p className="font-medium">
                      Comparative analysis of cell fate determination in human and non-human primates
                    </p>
                    <p className="text-sm text-muted-foreground">Wang L, et al. Science, 2023</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <p className="font-medium">Epigenetic regulation of human embryonic cell differentiation</p>
                    <p className="text-sm text-muted-foreground">Zhang K, et al. Cell Stem Cell, 2023</p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* 侧边栏 */}
        <div className="space-y-6">
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold mb-3">期刊信息</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">期刊</span>
                <span className="text-sm font-medium">Nature</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">年份</span>
                <span className="text-sm font-medium">2023</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">卷期</span>
                <span className="text-sm font-medium">Vol. 618, No. 7964</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">页码</span>
                <span className="text-sm font-medium">pp. 325-342</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">影响因子</span>
                <span className="text-sm font-medium">49.962</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">JCR分区</span>
                <span className="text-sm font-medium">Q1</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">中科院分区</span>
                <span className="text-sm font-medium">1区</span>
              </div>
            </div>
          </div>

          <div className="border rounded-lg p-4">
            <h3 className="font-semibold mb-3">论文指标</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">被引用次数</span>
                <span className="text-sm font-medium">87</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">阅读量</span>
                <span className="text-sm font-medium">12,456</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Altmetric分数</span>
                <span className="text-sm font-medium">156</span>
              </div>
            </div>
          </div>

          <div className="border rounded-lg p-4">
            <h3 className="font-semibold mb-3">相关论文</h3>
            <div className="space-y-3">
              <div>
                <Link href="#" className="text-sm font-medium hover:text-primary transition-colors">
                  人类胚胎干细胞分化过程中的表观遗传调控机制
                </Link>
                <p className="text-xs text-muted-foreground">李明, et al. Cell Stem Cell, 2022</p>
              </div>
              <div>
                <Link href="#" className="text-sm font-medium hover:text-primary transition-colors">
                  单细胞多组学分析揭示人类早期胚胎发育的调控网络
                </Link>
                <p className="text-xs text-muted-foreground">王芳, et al. Nature Methods, 2022</p>
              </div>
              <div>
                <Link href="#" className="text-sm font-medium hover:text-primary transition-colors">
                  人类与小鼠胚胎发育的比较转录组学研究
                </Link>
                <p className="text-xs text-muted-foreground">张伟, et al. Developmental Cell, 2021</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
