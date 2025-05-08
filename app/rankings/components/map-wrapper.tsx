"use client"

import { Suspense } from "react"
import dynamic from "next/dynamic"

// 加载指示器组件
const LoadingSpinner = () => (
  <div className="flex items-center justify-center h-full w-full">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
  </div>
)

// 动态导入LeafletMap组件，禁用SSR
const LeafletMap = dynamic(() => import("@/components/maps/leaflet-map"), {
  ssr: false,
  loading: () => <LoadingSpinner />,
})

// MapWrapper组件接口
interface MapWrapperProps {
  points: any[]
  valueField: string
  colorRange: string[]
  height: number
}

export function MapWrapper({ points, valueField, colorRange, height }: MapWrapperProps) {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <LeafletMap points={points} valueField={valueField} colorRange={colorRange} height={height} />
    </Suspense>
  )
}
