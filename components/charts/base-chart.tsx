"use client"

import { useEffect, useRef, useState } from "react"

interface BaseChartProps {
  data: any[]
  config?: any
  height?: number
  width?: number
  className?: string
  loading?: boolean
  renderChart: (container: HTMLElement, data: any[], config: any) => any
}

export default function BaseChart({
  data,
  config = {},
  height = 300,
  width,
  className = "",
  loading = false,
  renderChart,
}: BaseChartProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const chartRef = useRef<any | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Ensure we're on client side
    if (typeof window === "undefined") return

    // Ensure container exists and we have data
    if (!containerRef.current || !data || data.length === 0) return

    try {
      // Clean up previous chart instance
      if (chartRef.current) {
        chartRef.current.destroy()
        chartRef.current = null
      }

      // Create new chart instance
      const chart = renderChart(containerRef.current, data, config)
      chartRef.current = chart

      // Clear error state
      setError(null)
    } catch (err) {
      console.error("Chart rendering error:", err)
      setError("图表渲染失败，请检查数据格式")
    }

    // Clean up on unmount
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy()
        chartRef.current = null
      }
    }
  }, [data, config, renderChart])

  return (
    <div className={`relative ${className}`} style={{ height, width: width || "100%" }}>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/50 dark:bg-gray-900/50 z-10">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      )}

      {error && (
        <div className="absolute inset-0 flex items-center justify-center text-red-500">
          <p>{error}</p>
        </div>
      )}

      <div ref={containerRef} className="w-full h-full"></div>
    </div>
  )
}
