import { ArrowDown, ArrowUp, Minus } from "lucide-react"

interface TrendIconProps {
  trend: "up" | "down" | "stable"
}

export function TrendIcon({ trend }: TrendIconProps) {
  if (trend === "up") {
    return (
      <span className="text-success">
        <ArrowUp className="h-4 w-4" />
      </span>
    )
  }

  if (trend === "down") {
    return (
      <span className="text-destructive">
        <ArrowDown className="h-4 w-4" />
      </span>
    )
  }

  return (
    <span className="text-muted-foreground">
      <Minus className="h-4 w-4" />
    </span>
  )
}
