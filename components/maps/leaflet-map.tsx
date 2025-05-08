"use client"

import { useEffect, useRef, useState } from "react"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

interface Point {
  lng: number
  lat: number
  name: string
  [key: string]: any
}

interface LeafletMapProps {
  center?: [number, number]
  zoom?: number
  height?: number | string
  points?: Point[]
  valueField?: string
  colorRange?: string[]
  className?: string
}

export default function LeafletMap({
  center = [35.8617, 104.1954], // 默认中国中心点
  zoom = 4,
  height = 400,
  points = [],
  valueField = "value",
  colorRange = ["#1677ff", "#52c41a", "#faad14"],
  className = "",
}: LeafletMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const leafletMap = useRef<L.Map | null>(null)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    delete L.Icon.Default.prototype._getIconUrl
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: "/leaflet/marker-icon-2x.png",
      iconUrl: "/leaflet/marker-icon.png",
      shadowUrl: "/leaflet/marker-shadow.png",
    })
  }, [])

  // 计算点的颜色
  const getPointColor = (value: number, min: number, max: number) => {
    if (max === min) return colorRange[0]
    const ratio = (value - min) / (max - min)
    const index = Math.min(Math.floor(ratio * colorRange.length), colorRange.length - 1)
    return colorRange[index]
  }

  // 计算点的大小
  const getPointRadius = (value: number, min: number, max: number) => {
    if (max === min) return 8
    const ratio = (value - min) / (max - min)
    return 5 + ratio * 15 // 最小5px，最大20px
  }

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isClient || !mapRef.current) return

    // 初始化地图
    if (!leafletMap.current) {
      leafletMap.current = L.map(mapRef.current).setView(center, zoom)

      // 添加底图
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(leafletMap.current)
    } else {
      // 更新地图视图
      leafletMap.current.setView(center, zoom)
    }

    // 清除现有标记
    leafletMap.current.eachLayer((layer) => {
      if (layer instanceof L.Marker || layer instanceof L.CircleMarker) {
        leafletMap.current?.removeLayer(layer)
      }
    })

    // 添加点位标记
    if (points && points.length > 0) {
      // 计算数值范围
      const values = points.map((point) => point[valueField] || 0)
      const minValue = Math.min(...values)
      const maxValue = Math.max(...values)

      // 添加点位
      points.forEach((point) => {
        const value = point[valueField] || 0
        const color = getPointColor(value, minValue, maxValue)
        const radius = getPointRadius(value, minValue, maxValue)

        const circleMarker = L.circleMarker([point.lat, point.lng], {
          radius: radius,
          fillColor: color,
          color: "#fff",
          weight: 1,
          opacity: 1,
          fillOpacity: 0.8,
        }).addTo(leafletMap.current!)

        // 创建弹出信息
        let popupContent = `<div style="min-width: 180px;">
          <h3 style="font-weight: bold; margin-bottom: 8px;">${point.name}</h3>
        `

        // 添加其他属性
        Object.entries(point).forEach(([key, val]) => {
          if (key !== "lng" && key !== "lat" && key !== "name") {
            const displayValue = val
            let displayKey = key

            // 格式化显示名称
            if (key === "value") displayKey = "研究规模"
            if (key === "papers") displayKey = "论文数量"
            if (key === "researchers") displayKey = "研究人员"
            if (key === "country") displayKey = "所在国家"

            popupContent += `<div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
              <span style="color: #666;">${displayKey}:</span>
              <span style="font-weight: 500;">${displayValue}</span>
            </div>`
          }
        })

        popupContent += `</div>`
        circleMarker.bindPopup(popupContent)
      })

      // 自动调整视图以包含所有点
      if (points.length > 1) {
        const bounds = L.latLngBounds(points.map((point) => [point.lat, point.lng]))
        leafletMap.current.fitBounds(bounds, { padding: [50, 50] })
      }
    }

    return () => {
      // 组件卸载时清理地图
      if (leafletMap.current) {
        leafletMap.current.remove()
        leafletMap.current = null
      }
    }
  }, [isClient, center, zoom, points, valueField, colorRange])

  return <div ref={mapRef} style={{ height, width: "100%" }} className={className} />
}
