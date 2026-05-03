"use client"

import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts"

interface RadarDatum {
  key: string
  value: number
  max: number
}

interface NTRPRadarChartProps {
  data: RadarDatum[]
  color: string
}

export function NTRPRadarChart({ data, color }: NTRPRadarChartProps) {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <RadarChart data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey="key" />
        <PolarRadiusAxis angle={90} domain={[0, 100]} />
        <Radar
          name="능력"
          dataKey="value"
          stroke={color}
          fill={color}
          fillOpacity={0.6}
        />
        <Tooltip />
      </RadarChart>
    </ResponsiveContainer>
  )
}
