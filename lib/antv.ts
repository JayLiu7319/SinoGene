"use client"

// Import only the chart types we need, avoiding complex dependencies
import { Line, Area, Column, Bar, Pie } from "@antv/g2plot"

// Export only what we need for our current charts
export {
  // G2Plot charts
  Line,
  Area,
  Column,
  Bar,
  Pie,
}

// Common chart theme and configurations
export const CHART_THEME = {
  defaultColor: "#1890ff",
  colors10: [
    "#1890ff",
    "#2fc25b",
    "#facc14",
    "#223273",
    "#8543e0",
    "#13c2c2",
    "#3436c7",
    "#f04864",
    "#748cfd",
    "#90ed7d",
  ],
  background: "transparent",
}

// Default chart configuration
export const defaultChartConfig = {
  autoFit: true,
  padding: [30, 30, 50, 50],
}
