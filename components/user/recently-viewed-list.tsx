"use client"

import * as React from "react"
import Link from "next/link"
import { FileText, User, Users, GitBranch, Clock, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

// 模拟数据
const recentlyViewedItems = [
  {
    id: "paper1",
    type: "paper",
    title: "单细胞RNA测序揭示人类胚胎发育中的细胞命运决定机制",
    viewedAt: "2023-06-15T10:30:00Z",
  },
  {
    id: "researcher1",
    type: "researcher",
    title: "张伟",
    viewedAt: "2023-06-14T16:45:00Z",
  },
  {
    id: "team1",
    type: "team",
    title: "基因组学与精准医学团队",
    viewedAt: "2023-06-14T14:20:00Z",
  },
  {
    id: "direction1",
    type: "direction",
    title: "空间转录组学",
    viewedAt: "2023-06-13T09:15:00Z",
  },
  {
    id: "paper2",
    type: "paper",
    title: "CRISPR-Cas9介导的基因编辑在治疗遗传性疾病中的应用进展",
    viewedAt: "2023-06-12T11:10:00Z",
  },
]

export function RecentlyViewedList() {
  const [selectedItems, setSelectedItems] = React.useState<string[]>([])
  const [isDialogOpen, setIsDialogOpen] = React.useState<boolean>(false)
  const [items, setItems] = React.useState(recentlyViewedItems)

  const handleSelectItem = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedItems([...selectedItems, id])
    } else {
      setSelectedItems(selectedItems.filter((itemId) => itemId !== id))
    }
  }

  const handleClearSelected = () => {
    setItems(items.filter((item) => !selectedItems.includes(item.id)))
    setSelectedItems([])

    toast({
      title: "操作成功",
      description: `已清除 ${selectedItems.length} 条浏览记录`,
    })
  }

  const handleClearAll = () => {
    setItems([])
    setSelectedItems([])
    setIsDialogOpen(false)

    toast({
      title: "操作成功",
      description: "已清除全部浏览记录",
    })
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "paper":
        return <FileText className="h-4 w-4 text-blue-500" />
      case "researcher":
        return <User className="h-4 w-4 text-green-500" />
      case "team":
        return <Users className="h-4 w-4 text-purple-500" />
      case "direction":
        return <GitBranch className="h-4 w-4 text-orange-500" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const getTypeText = (type: string) => {
    switch (type) {
      case "paper":
        return "论文"
      case "researcher":
        return "学者"
      case "team":
        return "团队"
      case "direction":
        return "方向"
      default:
        return type
    }
  }

  const getTypeUrl = (type: string, id: string) => {
    switch (type) {
      case "paper":
        return `/papers/${id}`
      case "researcher":
        return `/researchers/${id}`
      case "team":
        return `/teams/${id}`
      case "direction":
        return `/directions/${id}`
      default:
        return "/"
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 0) {
      return "今天 " + date.toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" })
    } else if (diffDays === 1) {
      return "昨天 " + date.toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" })
    } else if (diffDays < 7) {
      return `${diffDays}天前`
    } else {
      return date.toLocaleDateString("zh-CN", { year: "numeric", month: "2-digit", day: "2-digit" })
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="text-sm text-muted-foreground">共 {items.length} 条浏览记录</div>
        <div className="flex gap-2">
          {selectedItems.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              className="gap-1 text-destructive hover:text-destructive"
              onClick={handleClearSelected}
            >
              <Trash2 className="h-4 w-4" />
              清除所选 ({selectedItems.length})
            </Button>
          )}
          <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <AlertDialogTrigger asChild>
              <Button variant="outline" size="sm" className="gap-1">
                <Trash2 className="h-4 w-4" />
                清除全部
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>确认清除全部浏览记录？</AlertDialogTitle>
                <AlertDialogDescription>此操作将清除您的所有浏览记录，且无法恢复。</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>取消</AlertDialogCancel>
                <AlertDialogAction onClick={handleClearAll}>确认清除</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      {items.length > 0 ? (
        <Card>
          <CardContent className="p-0">
            <ul className="divide-y">
              {items.map((item) => (
                <li key={item.id} className="flex items-center py-3 px-4 hover:bg-muted/50">
                  <Checkbox
                    checked={selectedItems.includes(item.id)}
                    onCheckedChange={(checked) => handleSelectItem(item.id, checked as boolean)}
                    className="mr-4"
                  />
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                      {getTypeIcon(item.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <Link
                        href={getTypeUrl(item.type, item.id)}
                        className="text-sm font-medium hover:text-primary truncate block"
                      >
                        {item.title}
                      </Link>
                      <div className="text-xs text-muted-foreground flex items-center gap-1">
                        <span className="inline-flex items-center gap-1">{getTypeText(item.type)}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground whitespace-nowrap">
                      <Clock className="h-3 w-3" />
                      {formatDate(item.viewedAt)}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Clock className="h-12 w-12 text-muted-foreground/50" />
          <h3 className="mt-4 text-lg font-semibold">暂无浏览记录</h3>
          <p className="mt-2 text-sm text-muted-foreground">您浏览的论文、学者、团队和研究方向将会显示在这里</p>
          <Button className="mt-4" variant="outline">
            开始浏览
          </Button>
        </div>
      )}
    </div>
  )
}
