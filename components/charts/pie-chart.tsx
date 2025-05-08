"use client"
import { Pie } from "@/lib/antv"
import BaseChart from "./base-chart"

interface PieChartProps {
  data: any[]
  angleField: string
  colorField: string
  height?: number
  width?: number
  className?: string
  loading?: boolean
  config?: any
}

export default function PieChart({
  data,
  angleField,
  colorField,
  height = 300,
  width,
  className = "",
  loading = false,
  config = {},
}: PieChartProps) {
  const renderChart = (container: HTMLElement, data: any[], config: any) => {
    const pie = new Pie(container, {
      data,
      angleField,
      colorField,
      radius: 0.8,
      ...config,
    })

    pie.render()
    return pie
  }

  return (
    <BaseChart
      data={data}
      config={config}
      height={height}
      width={width}
      className={className}
      loading={loading}
      renderChart={renderChart}
    />
  )
}
