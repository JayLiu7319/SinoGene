"use client"

import { Suspense } from "react"
import dynamic from "next/dynamic"

// 动态导入NetworkGraph组件，禁用SSR
const NetworkGraph = dynamic(() => import("@/components/charts/network-graph"), {
  ssr: false,
  loading: () => <LoadingSpinner />,
})

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center h-full w-full">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
    </div>
  )
}

interface NetworkGraphWrapperProps {
  data: any
  height?: number
  width?: number
}

export default function NetworkGraphWrapper({ data, height, width }: NetworkGraphWrapperProps) {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <NetworkGraph data={data} height={height} width={width} />
    </Suspense>
  )
}
