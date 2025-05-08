"use client"
import LineChart from "@/components/charts/line-chart"
import BarChart from "@/components/charts/bar-chart"
import PieChart from "@/components/charts/pie-chart"

interface CitationData {
  year: string
  value: number
}

interface PublicationData {
  year: string
  value: number
}

interface JournalData {
  type: string
  value: number
}

interface CollaboratorData {
  institution: string
  count: number
}

interface ResearcherMetricsChartsProps {
  citationData: CitationData[]
  publicationData: PublicationData[]
  journalData: JournalData[]
  collaboratorData: CollaboratorData[]
}

export default function ResearcherMetricsCharts({
  citationData,
  publicationData,
  journalData,
  collaboratorData,
}: ResearcherMetricsChartsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="border rounded-lg p-4">
        <h3 className="font-semibold mb-4">引用趋势</h3>
        <LineChart
          data={citationData}
          xField="year"
          yField="value"
          height={300}
          config={{
            point: {
              size: 5,
              shape: "circle",
            },
            tooltip: {
              formatter: (datum: any) => {
                return { name: "引用次数", value: datum.value }
              },
            },
            xAxis: {
              title: {
                text: "年份",
              },
            },
            yAxis: {
              title: {
                text: "引用次数",
              },
            },
            smooth: true,
          }}
        />
      </div>
      <div className="border rounded-lg p-4">
        <h3 className="font-semibold mb-4">论文发表趋势</h3>
        <BarChart
          data={publicationData}
          xField="year"
          yField="value"
          height={300}
          config={{
            tooltip: {
              formatter: (datum: any) => {
                return { name: "论文数量", value: datum.value }
              },
            },
            xAxis: {
              title: {
                text: "年份",
              },
            },
            yAxis: {
              title: {
                text: "论文数量",
              },
            },
            columnStyle: {
              fill: "#1890ff",
            },
          }}
        />
      </div>
      <div className="border rounded-lg p-4">
        <h3 className="font-semibold mb-4">期刊分布</h3>
        <PieChart
          data={journalData}
          angleField="value"
          colorField="type"
          height={300}
          config={{
            radius: 0.8,
            innerRadius: 0.5,
            label: {
              type: "outer",
            },
            tooltip: {
              formatter: (datum: any) => {
                return { name: datum.type, value: `${datum.value} 篇` }
              },
            },
            interactions: [{ type: "element-active" }],
          }}
        />
      </div>
      <div className="border rounded-lg p-4">
        <h3 className="font-semibold mb-4">合作者分布</h3>
        <BarChart
          data={collaboratorData}
          xField="count"
          yField="institution"
          isHorizontal={true}
          height={300}
          config={{
            tooltip: {
              formatter: (datum: any) => {
                return { name: datum.institution, value: `${datum.count} 人` }
              },
            },
            xAxis: {
              title: {
                text: "合作者数量",
              },
            },
            yAxis: {
              title: {
                text: "机构",
              },
            },
            barStyle: {
              fill: "#52c41a",
            },
          }}
        />
      </div>
    </div>
  )
}
