"use client"

import dynamic from "next/dynamic"
import { useState, useEffect } from "react"

// 动态导入NetworkGraph组件，禁用SSR
const NetworkGraph = dynamic(() => import("@/components/charts/network-graph"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full w-full bg-muted/20">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
    </div>
  ),
})

interface NetworkGraphWrapperProps {
  data: {
    nodes: Array<{
      id: string
      label?: string
      [key: string]: any
    }>
    edges: Array<{
      source: string
      target: string
      [key: string]: any
    }>
  }
  height?: number
  className?: string
}

export function NetworkGraphWrapper({ data, height = 400, className }: NetworkGraphWrapperProps) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return (
      <div className={`h-[${height}px] w-full flex items-center justify-center bg-muted/20 ${className || ""}`}>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return <NetworkGraph data={data} height={height} className={className} />
}
