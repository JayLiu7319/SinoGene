import type React from "react"
import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import { cn } from "@/lib/utils"

interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
  segments: {
    name: string
    href: string
  }[]
  separator?: React.ReactNode
  home?: boolean
}

export function Breadcrumb({
  segments,
  separator = <ChevronRight className="h-4 w-4" />,
  home = true,
  className,
  ...props
}: BreadcrumbProps) {
  return (
    <nav aria-label="面包屑" className={cn("flex items-center text-sm text-muted-foreground", className)} {...props}>
      <ol className="flex items-center gap-1.5">
        {home && (
          <li>
            <Link
              href="/"
              className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Home className="h-4 w-4" />
              <span className="sr-only">首页</span>
            </Link>
          </li>
        )}
        {home && segments.length > 0 && (
          <li className="flex items-center gap-1.5">
            <span aria-hidden="true" className="text-muted-foreground/50">
              {separator}
            </span>
          </li>
        )}
        {segments.map((segment, index) => (
          <li key={segment.href} className="flex items-center gap-1.5">
            {index > 0 && (
              <span aria-hidden="true" className="text-muted-foreground/50">
                {separator}
              </span>
            )}
            {index === segments.length - 1 ? (
              <span className="font-medium text-foreground">{segment.name}</span>
            ) : (
              <Link href={segment.href} className="text-muted-foreground hover:text-foreground transition-colors">
                {segment.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
