'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'

interface FunnelData {
  visit: number
  start: number
  firstPage: number
  complete: number
}

export default function FunnelChart({ data }: { data: FunnelData }) {
  const chartData = [
    {
      name: '방문',
      value: data.visit,
      percentage: 100,
    },
    {
      name: '시작',
      value: data.start,
      percentage: data.visit > 0 ? (data.start / data.visit) * 100 : 0,
    },
    {
      name: '첫 페이지',
      value: data.firstPage,
      percentage: data.visit > 0 ? (data.firstPage / data.visit) * 100 : 0,
    },
    {
      name: '완료',
      value: data.complete,
      percentage: data.visit > 0 ? (data.complete / data.visit) * 100 : 0,
    },
  ]

  const colors = ['#3b82f6', '#8b5cf6', '#ec4899', '#10b981']

  return (
    <div className="space-y-4">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip
            formatter={(value: number, name: string, props: any) => [
              `${value.toLocaleString()} (${props.payload.percentage.toFixed(1)}%)`,
              '값',
            ]}
          />
          <Bar dataKey="value" fill="#3b82f6">
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

