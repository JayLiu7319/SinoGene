import type { Metadata } from "next"
import { AccountSettingsForm } from "@/components/user/account-settings-form"

export const metadata: Metadata = {
  title: "账号设置 | 用户中心 | 华因智汇",
  description: "管理您的账号安全设置",
}

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">账号设置</h1>
        <p className="text-muted-foreground">管理您的账号安全设置</p>
      </div>
      <AccountSettingsForm />
    </div>
  )
}
