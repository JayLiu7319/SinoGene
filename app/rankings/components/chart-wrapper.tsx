"use client"

import dynamic from "next/dynamic"
import { Skeleton } from "@/components/ui/skeleton"

// 动态导入图表组件，避免SSR问题
const LineChart = dynamic(() => import("@/components/charts/line-chart"), {
  ssr: false,
  loading: () => <Skeleton className="w-full h-full" />,
})

const BarChart = dynamic(() => import("@/components/charts/bar-chart"), {
  ssr: false,
  loading: () => <Skeleton className="w-full h-full" />,
})

const PieChart = dynamic(() => import("@/components/charts/pie-chart"), {
  ssr: false,
  loading: () => <Skeleton className="w-full h-full" />,
})

interface ChartWrapperProps {
  type: "line" | "bar" | "pie"
  data: any[]
  xField?: string
  yField?: string | string[]
  angleField?: string
  colorField?: string
  seriesField?: string
  height?: number
  width?: number
  className?: string
  config?: any
}

export function ChartWrapper({
  type,
  data,
  xField,
  yField,
  angleField,
  colorField,
  seriesField,
  height = 300,
  width,
  className = "",
  config = {},
}: ChartWrapperProps) {
  if (!data || data.length === 0) {
    return <Skeleton className={`w-full h-[${height}px] ${className}`} />
  }

  switch (type) {
    case "line":
      return (
        <LineChart
          data={data}
          xField={xField}
          yField={yField}
          seriesField={seriesField}
          height={height}
          width={width}
          className={className}
          config={config}
        />
      )
    case "bar":
      return (
        <BarChart
          data={data}
          xField={xField}
          yField={yField}
          seriesField={seriesField}
          height={height}
          width={width}
          className={className}
          config={config}
        />
      )
    case "pie":
      return (
        <PieChart
          data={data}
          angleField={angleField}
          colorField={colorField}
          height={height}
          width={width}
          className={className}
          config={config}
        />
      )
    default:
      return <Skeleton className={`w-full h-[${height}px] ${className}`} />
  }
}
