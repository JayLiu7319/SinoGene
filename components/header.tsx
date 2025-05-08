"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Bell, Menu, Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { Logo } from "@/components/logo"

const mainNavItems = [
  { title: "首页", href: "/" },
  { title: "论文", href: "/papers" },
  { title: "学者", href: "/researchers" },
  { title: "团队", href: "/teams" },
  { title: "方向", href: "/directions" },
  { title: "排行", href: "/rankings" },
]

export default function Header() {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false)
  const pathname = usePathname()
  const isLoggedIn = false // 假设用户未登录

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">打开菜单</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0">
            <div className="px-7">
              <Link href="/" className="flex items-center">
                <Logo className="h-8 w-8" />
                <span className="ml-2 text-lg font-bold">华因智汇</span>
              </Link>
            </div>
            <nav className="mt-8 flex flex-col gap-4 px-7">
              {mainNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-base font-medium transition-colors hover:text-primary",
                    pathname === item.href ? "text-primary" : "text-muted-foreground",
                  )}
                >
                  {item.title}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>

        <div className="flex items-center gap-2">
          <Link href="/" className="hidden md:flex items-center gap-2 mr-6">
            <Logo className="h-8 w-8" />
            <span className="hidden font-bold sm:inline-block">
              华因智汇
              <span className="text-xs text-muted-foreground ml-1">SinoGene Insights</span>
            </span>
          </Link>

          <nav className="hidden md:flex gap-6">
            {mainNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === item.href ? "text-primary" : "text-muted-foreground",
                )}
              >
                {item.title}
              </Link>
            ))}
          </nav>
        </div>

        <div className={cn("ml-auto flex items-center gap-2", isSearchExpanded ? "w-full md:w-1/2" : "")}>
          {isSearchExpanded ? (
            <div className="relative w-full">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="搜索论文、学者、团队、方向..."
                className="w-full pl-9 pr-12"
                autoFocus
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0"
                onClick={() => setIsSearchExpanded(false)}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">关闭搜索</span>
              </Button>
            </div>
          ) : (
            <Button variant="ghost" size="icon" className="shrink-0" onClick={() => setIsSearchExpanded(true)}>
              <Search className="h-5 w-5" />
              <span className="sr-only">搜索</span>
            </Button>
          )}

          {!isSearchExpanded && (
            <>
              <Button variant="ghost" size="icon" className="shrink-0">
                <Bell className="h-5 w-5" />
                <span className="sr-only">通知</span>
              </Button>

              {isLoggedIn ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-full shrink-0">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>用户</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>我的账户</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>个人中心</DropdownMenuItem>
                    <DropdownMenuItem>我的收藏</DropdownMenuItem>
                    <DropdownMenuItem>我的关注</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>退出登录</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button size="sm" className="shrink-0">
                  登录/注册
                </Button>
              )}
            </>
          )}
        </div>
      </div>
    </header>
  )
}
