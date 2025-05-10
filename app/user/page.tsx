import type { Metadata } from "next"
import { ProfileForm } from "@/components/user/profile-form"

export const metadata: Metadata = {
  title: "个人资料 | 用户中心 | 华因智汇",
  description: "管理您的个人资料和研究兴趣",
}

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">个人资料</h1>
        <p className="text-muted-foreground">管理您的个人资料和研究兴趣</p>
      </div>
      <ProfileForm />
    </div>
  )
}
