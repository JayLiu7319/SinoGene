"use client"

import { useEffect, useRef } from "react"

interface NetworkGraphProps {
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
  width?: number
  className?: string
  loading?: boolean
  config?: any
}

export default function NetworkGraph({
  data,
  height = 400,
  width,
  className = "",
  loading = false,
  config = {},
}: NetworkGraphProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const animationRef = useRef<number | null>(null)
  const nodesRef = useRef<any[]>([])
  const edgesRef = useRef<any[]>([])
  const isStabilizedRef = useRef<boolean>(false)

  // Initialize and run simulation
  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current) return

    // Initialize nodes and edges refs with the data
    nodesRef.current = data.nodes.map((node) => ({
      ...node,
      x: undefined,
      y: undefined,
      vx: 0,
      vy: 0,
      size: node.size || 20,
      color: node.cluster === "self" ? "#1890ff" : "#52c41a",
    }))
    edgesRef.current = [...data.edges]
    isStabilizedRef.current = false

    // Create canvas if it doesn't exist
    if (!canvasRef.current) {
      const canvas = document.createElement("canvas")
      canvas.width = width || containerRef.current.offsetWidth
      canvas.height = height
      containerRef.current.innerHTML = ""
      containerRef.current.appendChild(canvas)
      canvasRef.current = canvas
    }

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set initial positions in a more distributed way
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const radius = Math.min(canvas.width, canvas.height) * 0.35

    // Set initial positions in a more distributed way
    nodesRef.current.forEach((node, i) => {
      // Use golden ratio to distribute nodes more evenly
      const goldenRatio = 1.618033988749895
      const theta = i * goldenRatio * Math.PI * 2

      // Randomize the radius a bit to avoid perfect circle
      const r = radius * (0.8 + Math.random() * 0.4)

      node.x = centerX + r * Math.cos(theta)
      node.y = centerY + r * Math.sin(theta)

      // Add small random initial velocity to break symmetry
      node.vx = (Math.random() - 0.5) * 2
      node.vy = (Math.random() - 0.5) * 2
    })

    // Draw function
    const drawNetwork = () => {
      if (!ctx) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw edges
      ctx.strokeStyle = "#aaa"
      ctx.lineWidth = 1
      edgesRef.current.forEach((edge) => {
        const source = nodesRef.current.find((n) => n.id === edge.source)
        const target = nodesRef.current.find((n) => n.id === edge.target)

        if (
          source &&
          target &&
          source.x !== undefined &&
          source.y !== undefined &&
          target.x !== undefined &&
          target.y !== undefined
        ) {
          ctx.beginPath()
          ctx.moveTo(source.x, source.y)
          ctx.lineTo(target.x, target.y)
          ctx.stroke()
        }
      })

      // Draw nodes
      nodesRef.current.forEach((node) => {
        if (node.x === undefined || node.y === undefined) return

        const size = node.size || 20

        // Draw node circle
        ctx.fillStyle = node.color || "#1890ff"
        ctx.beginPath()
        ctx.arc(node.x, node.y, size / 2, 0, Math.PI * 2)
        ctx.fill()

        // Draw node border
        ctx.strokeStyle = "#fff"
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.arc(node.x, node.y, size / 2, 0, Math.PI * 2)
        ctx.stroke()

        // Draw labels
        if (node.label) {
          ctx.fillStyle = "#000"
          ctx.font = "12px Arial"
          ctx.textAlign = "center"
          ctx.fillText(node.label, node.x, node.y + size / 2 + 15)
        }
      })
    }

    // Run simulation
    let iterations = 0
    const maxIterations = 150 // Increase max iterations to allow better layout

    const runSimulation = () => {
      if (isStabilizedRef.current) {
        drawNetwork()
        return
      }

      let totalMovement = 0

      // Apply forces
      nodesRef.current.forEach((node, i) => {
        if (node.x === undefined || node.y === undefined) return

        let fx = 0
        let fy = 0

        // Center gravity - REDUCED to allow nodes to spread out more
        const dx = centerX - node.x
        const dy = centerY - node.y
        const distanceToCenter = Math.sqrt(dx * dx + dy * dy)

        // Only apply center gravity if node is too far from center
        if (distanceToCenter > radius * 1.5) {
          fx += dx * 0.003
          fy += dy * 0.003
        }

        // Node repulsion - INCREASED to push nodes apart more
        nodesRef.current.forEach((other, j) => {
          if (i === j || other.x === undefined || other.y === undefined) return

          const dx = node.x - other.x
          const dy = node.y - other.y
          const distance = Math.sqrt(dx * dx + dy * dy) || 1

          // Stronger repulsion force with longer range
          if (distance < 500) {
            const force = (1 / (distance * distance)) * 2000
            fx += (dx / distance) * force
            fy += (dy / distance) * force
          }
        })

        // Edge attraction - REDUCED to prevent nodes from clustering
        edgesRef.current.forEach((edge) => {
          if (edge.source === node.id || edge.target === node.id) {
            const other = nodesRef.current.find((n) => n.id === (edge.source === node.id ? edge.target : edge.source))

            if (other && other.x !== undefined && other.y !== undefined) {
              const dx = other.x - node.x
              const dy = other.y - node.y
              const distance = Math.sqrt(dx * dx + dy * dy) || 1

              // Weaker attraction force
              const force = distance * 0.005
              fx += (dx / distance) * force
              fy += (dy / distance) * force
            }
          }
        })

        // Update velocity (with damping)
        node.vx = (node.vx || 0) * 0.8 + fx
        node.vy = (node.vy || 0) * 0.8 + fy

        // Limit velocity
        const speed = Math.sqrt(node.vx * node.vx + node.vy * node.vy)
        if (speed > 5) {
          node.vx = (node.vx / speed) * 5
          node.vy = (node.vy / speed) * 5
        }

        // Update position
        const newX = node.x + node.vx
        const newY = node.y + node.vy

        // Calculate movement
        const movement = Math.sqrt(Math.pow(newX - node.x, 2) + Math.pow(newY - node.y, 2))
        totalMovement += movement

        // Boundary constraints with padding
        const padding = Math.max(50, node.size || 20)
        node.x = Math.max(padding, Math.min(canvas.width - padding, newX))
        node.y = Math.max(padding, Math.min(canvas.height - padding, newY))
      })

      iterations++

      // Check if simulation should stop
      if (iterations >= maxIterations || totalMovement < 0.5) {
        isStabilizedRef.current = true
      }

      // Draw and schedule next frame
      drawNetwork()

      if (!isStabilizedRef.current) {
        animationRef.current = requestAnimationFrame(runSimulation)
      }
    }

    // Start simulation
    runSimulation()

    // Handle window resize
    const handleResize = () => {
      if (canvasRef.current && containerRef.current) {
        canvasRef.current.width = containerRef.current.offsetWidth
        canvasRef.current.height = height
        drawNetwork()
      }
    }

    window.addEventListener("resize", handleResize)

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
        animationRef.current = null
      }
    }
  }, [data, height, width]) // Only re-run when data or dimensions change

  return (
    <div className={`relative ${className}`} style={{ height, width: width || "100%" }}>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/50 dark:bg-gray-900/50 z-10">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      )}
      <div ref={containerRef} className="w-full h-full"></div>
    </div>
  )
}
