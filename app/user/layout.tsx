import type React from "react"
import type { Metadata } from "next"
import { UserSidebar } from "@/components/user/user-sidebar"

export const metadata: Metadata = {
  title: "用户中心 | 华因智汇",
  description: "管理您的华因智汇账户、收藏、关注和浏览记录",
}

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="container py-8">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-[240px_1fr]">
        <UserSidebar />
        <main className="space-y-6">{children}</main>
      </div>
    </div>
  )
}
