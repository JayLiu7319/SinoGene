"use client"
import { Bar, Column } from "@/lib/antv"
import BaseChart from "./base-chart"

interface BarChartProps {
  data: any[]
  xField: string
  yField: string
  isHorizontal?: boolean
  height?: number
  width?: number
  className?: string
  loading?: boolean
  config?: any
}

export default function BarChart({
  data,
  xField,
  yField,
  isHorizontal = false,
  height = 300,
  width,
  className = "",
  loading = false,
  config = {},
}: BarChartProps) {
  const renderChart = (container: HTMLElement, data: any[], config: any) => {
    // Use Bar for horizontal charts, Column for vertical
    const ChartComponent = isHorizontal ? Bar : Column

    const chart = new ChartComponent(container, {
      data,
      xField: isHorizontal ? yField : xField,
      yField: isHorizontal ? xField : yField,
      ...config,
    })

    chart.render()
    return chart
  }

  return (
    <BaseChart
      data={data}
      config={{ ...config, isHorizontal }}
      height={height}
      width={width}
      className={className}
      loading={loading}
      renderChart={renderChart}
    />
  )
}
