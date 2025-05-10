import type { Metadata } from "next"
import { ContributionsList } from "@/components/user/contributions-list"

export const metadata: Metadata = {
  title: "我的贡献 | 用户中心 | 华因智汇",
  description: "查看您对平台的贡献记录",
}

export default function ContributionsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">我的贡献</h1>
        <p className="text-muted-foreground">查看您对平台的贡献记录</p>
      </div>
      <ContributionsList />
    </div>
  )
}
