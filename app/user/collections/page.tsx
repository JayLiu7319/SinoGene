import type { Metadata } from "next"
import { CollectionsTab } from "@/components/user/collections-tab"

export const metadata: Metadata = {
  title: "我的收藏 | 用户中心 | 华因智汇",
  description: "管理您收藏的论文、学者、团队和研究方向",
}

export default function CollectionsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">我的收藏</h1>
        <p className="text-muted-foreground">管理您收藏的论文、学者、团队和研究方向</p>
      </div>
      <CollectionsTab />
    </div>
  )
}
