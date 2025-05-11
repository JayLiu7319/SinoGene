import Link from "next/link"
import { Breadcrumb } from "@/components/breadcrumb"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { HelpCircle } from "lucide-react"

export default function AdvancedSearchPage() {
  return (
    <div className="container py-6 md:py-8">
      <Breadcrumb
        segments={[
          { name: "首页", href: "/" },
          { name: "高级搜索", href: "/search/advanced" },
        ]}
      />

      <div className="mt-4 mb-8">
        <h1 className="text-2xl font-bold mb-2">高级搜索</h1>
        <p className="text-muted-foreground">使用高级搜索选项精确查找您需要的内容</p>
      </div>

      <div className="bg-white rounded-lg border shadow-sm p-6">
        <Tabs defaultValue="papers" className="w-full">
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="papers">论文搜索</TabsTrigger>
            <TabsTrigger value="researchers">学者搜索</TabsTrigger>
            <TabsTrigger value="teams">团队搜索</TabsTrigger>
            <TabsTrigger value="directions">研究方向搜索</TabsTrigger>
          </TabsList>

          <TabsContent value="papers">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="all-words">所有这些词</Label>
                    <div className="relative group">
                      <HelpCircle className="h-4 w-4 text-muted-foreground" />
                      <div className="absolute left-full ml-2 top-0 w-64 p-2 bg-popover text-popover-foreground text-sm rounded-md shadow-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity z-50">
                        搜索结果将包含所有这些词（AND 逻辑）
                      </div>
                    </div>
                  </div>
                  <Input id="all-words" placeholder="输入关键词，用空格分隔" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="exact-phrase">包含完整短语</Label>
                    <div className="relative group">
                      <HelpCircle className="h-4 w-4 text-muted-foreground" />
                      <div className="absolute left-full ml-2 top-0 w-64 p-2 bg-popover text-popover-foreground text-sm rounded-md shadow-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity z-50">
                        搜索结果将包含完全匹配的短语
                      </div>
                    </div>
                  </div>
                  <Input id="exact-phrase" placeholder="输入完整短语" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="any-words">至少包含一个词</Label>
                    <div className="relative group">
                      <HelpCircle className="h-4 w-4 text-muted-foreground" />
                      <div className="absolute left-full ml-2 top-0 w-64 p-2 bg-popover text-popover-foreground text-sm rounded-md shadow-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity z-50">
                        搜索结果将包含至少一个这些词（OR 逻辑）
                      </div>
                    </div>
                  </div>
                  <Input id="any-words" placeholder="输入关键词，用空格分隔" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="exclude-words">不包含这些词</Label>
                    <div className="relative group">
                      <HelpCircle className="h-4 w-4 text-muted-foreground" />
                      <div className="absolute left-full ml-2 top-0 w-64 p-2 bg-popover text-popover-foreground text-sm rounded-md shadow-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity z-50">
                        搜索结果将排除包含这些词的内容（NOT 逻辑）
                      </div>
                    </div>
                  </div>
                  <Input id="exclude-words" placeholder="输入关键词，用空格分隔" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="authors">作者</Label>
                  <Input id="authors" placeholder="输入作者姓名，用逗号分隔" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="journal">期刊名称</Label>
                  <Input id="journal" placeholder="输入期刊名称" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="year-from">发表年份（从）</Label>
                    <Input id="year-from" type="number" placeholder="起始年份" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="year-to">发表年份（至）</Label>
                    <Input id="year-to" type="number" placeholder="结束年份" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="doi">DOI</Label>
                  <Input id="doi" placeholder="输入 DOI" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="keywords">关键词</Label>
                  <Input id="keywords" placeholder="输入关键词，用逗号分隔" />
                </div>
              </div>

              <div className="flex justify-end gap-4">
                <Button type="reset" variant="outline">
                  重置
                </Button>
                <Button type="submit">搜索</Button>
              </div>
            </form>
          </TabsContent>

          <TabsContent value="researchers">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="researcher-name">姓名</Label>
                  <Input id="researcher-name" placeholder="输入学者姓名" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="institution">机构</Label>
                  <Input id="institution" placeholder="输入机构名称" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="research-areas">研究方向（关键词）</Label>
                  <Input id="research-areas" placeholder="输入研究方向关键词，用逗号分隔" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="title">职称</Label>
                  <Select>
                    <SelectTrigger id="title">
                      <SelectValue placeholder="选择职称" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="professor">教授</SelectItem>
                      <SelectItem value="associate-professor">副教授</SelectItem>
                      <SelectItem value="assistant-professor">助理教授</SelectItem>
                      <SelectItem value="researcher">研究员</SelectItem>
                      <SelectItem value="other">其他</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-end gap-4">
                <Button type="reset" variant="outline">
                  重置
                </Button>
                <Button type="submit">搜索</Button>
              </div>
            </form>
          </TabsContent>

          <TabsContent value="teams">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="team-name">团队名称</Label>
                  <Input id="team-name" placeholder="输入团队名称" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="team-institution">所属机构</Label>
                  <Input id="team-institution" placeholder="输入机构名称" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="core-members">核心成员姓名</Label>
                  <Input id="core-members" placeholder="输入核心成员姓名，用逗号分隔" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="team-research-areas">研究方向（关键词）</Label>
                  <Input id="team-research-areas" placeholder="输入研究方向关键词，用逗号分隔" />
                </div>
              </div>

              <div className="flex justify-end gap-4">
                <Button type="reset" variant="outline">
                  重置
                </Button>
                <Button type="submit">搜索</Button>
              </div>
            </form>
          </TabsContent>

          <TabsContent value="directions">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="direction-name">方向名称/关键词</Label>
                  <Input id="direction-name" placeholder="输入研究方向名称或关键词" />
                </div>
              </div>

              <div className="flex justify-end gap-4">
                <Button type="reset" variant="outline">
                  重置
                </Button>
                <Button type="submit">搜索</Button>
              </div>
            </form>
          </TabsContent>
        </Tabs>
      </div>

      <div className="mt-6 text-center">
        <p className="text-sm text-muted-foreground">
          需要帮助？查看我们的{" "}
          <Link href="#" className="text-primary hover:underline">
            搜索指南
          </Link>{" "}
          或{" "}
          <Link href="#" className="text-primary hover:underline">
            联系支持
          </Link>
        </p>
      </div>
    </div>
  )
}
