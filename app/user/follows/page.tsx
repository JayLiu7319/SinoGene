import type { Metadata } from "next"
import { FollowsTab } from "@/components/user/follows-tab"

export const metadata: Metadata = {
  title: "我的关注 | 用户中心 | 华因智汇",
  description: "管理您关注的学者、团队和研究方向",
}

export default function FollowsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">我的关注</h1>
        <p className="text-muted-foreground">管理您关注的学者、团队和研究方向</p>
      </div>
      <FollowsTab />
    </div>
  )
}
