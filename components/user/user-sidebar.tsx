"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { User, Bookmark, Heart, Clock, Edit3, Settings, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const sidebarItems = [
  {
    title: "个人资料",
    href: "/user",
    icon: User,
  },
  {
    title: "我的收藏",
    href: "/user/collections",
    icon: Bookmark,
  },
  {
    title: "我的关注",
    href: "/user/follows",
    icon: Heart,
  },
  {
    title: "最近浏览",
    href: "/user/recently-viewed",
    icon: Clock,
  },
  {
    title: "我的贡献",
    href: "/user/contributions",
    icon: Edit3,
  },
  {
    title: "账号设置",
    href: "/user/settings",
    icon: Settings,
  },
]

export function UserSidebar() {
  const pathname = usePathname()

  const handleLogout = () => {
    // 模拟登出逻辑
    console.log("Logging out...")
    // 实际应用中应该调用登出API，然后重定向到首页
    window.location.href = "/"
  }

  return (
    <nav className="space-y-2">
      {sidebarItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:text-primary",
            pathname === item.href ? "bg-muted font-medium text-primary" : "text-muted-foreground",
          )}
        >
          <item.icon className="h-4 w-4" />
          {item.title}
        </Link>
      ))}
      <Button
        variant="ghost"
        className="w-full justify-start gap-3 px-3 text-sm font-normal text-muted-foreground hover:text-destructive"
        onClick={handleLogout}
      >
        <LogOut className="h-4 w-4" />
        退出登录
      </Button>
    </nav>
  )
}
