import type { Metadata } from "next"
import { RecentlyViewedList } from "@/components/user/recently-viewed-list"

export const metadata: Metadata = {
  title: "最近浏览 | 用户中心 | 华因智汇",
  description: "查看您最近浏览的论文、学者、团队和研究方向",
}

export default function RecentlyViewedPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">最近浏览</h1>
        <p className="text-muted-foreground">查看您最近浏览的论文、学者、团队和研究方向</p>
      </div>
      <RecentlyViewedList />
    </div>
  )
}
