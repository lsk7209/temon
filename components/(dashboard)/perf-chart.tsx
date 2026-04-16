'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'

interface PerfData {
  lcp: number | null
  fid: number | null
  cls: number | null
  ttfb: number | null
}

export default function PerfChart({ data }: { data: PerfData }) {
  const chartData = [
    { name: 'LCP', value: data.lcp || 0, threshold: 2500 },
    { name: 'FID', value: data.fid || 0, threshold: 100 },
    { name: 'CLS', value: data.cls || 0, threshold: 0.1 },
    { name: 'TTFB', value: data.ttfb || 0, threshold: 800 },
  ]

  const getColor = (value: number, threshold: number) => {
    if (value === 0) return '#9ca3af'
    if (value <= threshold * 0.75) return '#10b981' // Good
    if (value <= threshold) return '#f59e0b' // Needs improvement
    return '#ef4444' // Poor
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip
          formatter={(value: number, name: string, props: any) => [
            `${value.toFixed(2)} (임계값: ${props.payload.threshold})`,
            '값',
          ]}
        />
        <Bar dataKey="value">
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={getColor(entry.value, entry.threshold)} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}

