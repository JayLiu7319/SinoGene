"use client"
import { Line } from "@/lib/antv"
import BaseChart from "./base-chart"

interface LineChartProps {
  data: any[]
  xField: string
  yField: string | string[]
  seriesField?: string
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
  seriesField,
  height = 300,
  width,
  className = "",
  loading = false,
  config = {},
}: LineChartProps) {
  const renderChart = (container: HTMLElement, data: any[], config: any) => {
    // 处理多线图的情况
    if (Array.isArray(yField)) {
      // 转换数据格式以适应多线图
      const transformedData = []
      data.forEach((item) => {
        yField.forEach((field) => {
          transformedData.push({
            ...item,
            value: item[field],
            category: field,
          })
        })
      })

      const line = new Line(container, {
        data: transformedData,
        xField,
        yField: "value",
        seriesField: "category",
        smooth: true,
        ...config,
      })

      line.render()
      return line
    } else {
      // 单线图的情况
      const line = new Line(container, {
        data,
        xField,
        yField,
        seriesField,
        smooth: true,
        ...config,
      })

      line.render()
      return line
    }
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
