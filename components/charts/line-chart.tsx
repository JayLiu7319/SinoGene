"use client"
import { Line } from "@/lib/antv"
import BaseChart from "./base-chart"

interface LineChartProps {
  data: any[]
  xField: string
  yField: string
  height?: number
  width?: number
  className?: string
  loading?: boolean
  config?: any
}

export default function LineChart({
  data,
  xField,
  yField,
  height = 300,
  width,
  className = "",
  loading = false,
  config = {},
}: LineChartProps) {
  const renderChart = (container: HTMLElement, data: any[], config: any) => {
    const line = new Line(container, {
      data,
      xField,
      yField,
      smooth: true,
      ...config,
    })

    line.render()
    return line
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
