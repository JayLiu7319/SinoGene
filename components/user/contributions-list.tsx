"use client"
import Link from "next/link"
import { Edit3, CheckCircle, XCircle, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// 模拟数据
const contributionItems = [
  {
    id: "contrib1",
    type: "edit",
    target: {
      type: "researcher",
      id: "researcher1",
      name: "张伟",
    },
    field: "研究方向",
    oldValue: "基因组学, 表观遗传学",
    newValue: "基因组学, 表观遗传学, 生物信息学",
    status: "approved",
    createdAt: "2023-06-10T14:30:00Z",
    updatedAt: "2023-06-11T09:15:00Z",
  },
  {
    id: "contrib2",
    type: "edit",
    target: {
      type: "researcher",
      id: "researcher2",
      name: "李明",
    },
    field: "机构",
    oldValue: "中国科学院",
    newValue: "中国科学院遗传与发育生物学研究所",
    status: "pending",
    createdAt: "2023-06-08T11:20:00Z",
    updatedAt: "2023-06-08T11:20:00Z",
  },
  {
    id: "contrib3",
    type: "edit",
    target: {
      type: "researcher",
      id: "researcher3",
      name: "王芳",
    },
    field: "H指数",
    oldValue: "32",
    newValue: "35",
    status: "rejected",
    createdAt: "2023-06-05T16:45:00Z",
    updatedAt: "2023-06-06T10:30:00Z",
    rejectReason: "需要提供更可靠的数据来源",
  },
]

export function ContributionsList() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 gap-1">
            <CheckCircle className="h-3 w-3" />
            已通过
          </Badge>
        )
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200 gap-1">
            <Clock className="h-3 w-3" />
            审核中
          </Badge>
        )
      case "rejected":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 gap-1">
            <XCircle className="h-3 w-3" />
            未通过
          </Badge>
        )
      default:
        return null
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("zh-CN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="space-y-4">
      <div className="text-sm text-muted-foreground">共 {contributionItems.length} 条贡献记录</div>

      {contributionItems.length > 0 ? (
        <Card>
          <CardContent className="p-0">
            <ul className="divide-y">
              {contributionItems.map((item) => (
                <li key={item.id} className="p-4 hover:bg-muted/50">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                        <Edit3 className="h-4 w-4 text-blue-500" />
                      </div>
                      <div>
                        <div className="font-medium">
                          编辑了学者
                          <Link href={`/researchers/${item.target.id}`} className="text-primary hover:underline ml-1">
                            {item.target.name}
                          </Link>
                          的{item.field}
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">{formatDate(item.createdAt)}</div>
                      </div>
                    </div>
                    <div>{getStatusBadge(item.status)}</div>
                  </div>

                  <div className="mt-3 text-sm">
                    <div className="grid grid-cols-2 gap-4 p-3 bg-muted/50 rounded-lg">
                      <div>
                        <div className="text-muted-foreground mb-1">原值</div>
                        <div className="font-mono">{item.oldValue}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground mb-1">新值</div>
                        <div className="font-mono">{item.newValue}</div>
                      </div>
                    </div>
                  </div>

                  {item.status === "rejected" && item.rejectReason && (
                    <div className="mt-3 text-sm text-destructive">
                      <span className="font-medium">未通过原因：</span> {item.rejectReason}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Edit3 className="h-12 w-12 text-muted-foreground/50" />
          <h3 className="mt-4 text-lg font-semibold">您还没有任何贡献记录</h3>
          <p className="mt-2 text-sm text-muted-foreground">您可以通过编辑学者信息、补充数据等方式为平台做出贡献</p>
          <Button className="mt-4" variant="outline">
            浏览学者
          </Button>
        </div>
      )}
    </div>
  )
}
