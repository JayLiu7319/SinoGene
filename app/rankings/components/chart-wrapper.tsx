"use client"

import dynamic from "next/dynamic"
import { useState, useEffect } from "react"

// 动态导入图表组件，禁用SSR
const LineChart = dynamic(() => import("@/components/charts/line-chart"), { ssr: false })
const BarChart = dynamic(() => import("@/components/charts/bar-chart"), { ssr: false })
const PieChart = dynamic(() => import("@/components/charts/pie-chart"), { ssr: false })

interface ChartWrapperProps {
  type: "line" | "bar" | "pie"
  data: any[]
  xField?: string
  yField?: string | string[]
  angleField?: string
  colorField?: string
  isHorizontal?: boolean
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
  isHorizontal = false,
  height = 300,
  width,
  className = "",
  config = {},
}: ChartWrapperProps) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return (
      <div
        className={`flex items-center justify-center bg-muted/20 ${className}`}
        style={{ height, width: width || "100%" }}
      >
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  switch (type) {
    case "line":
      return (
        <LineChart
          data={data}
          xField={xField!}
          yField={yField!}
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
          xField={xField!}
          yField={yField!}
          isHorizontal={isHorizontal}
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
          angleField={angleField!}
          colorField={colorField!}
          height={height}
          width={width}
          className={className}
          config={config}
        />
      )
    default:
      return null
  }
}
