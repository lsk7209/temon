'use client'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Progress } from '@/components/ui/progress'

interface TrafficSourceData {
  trafficSource: string
  sessions: number
  attempts: number
  completes: number
  convRate: number
}

export default function TrafficSourceChart({ data }: { data: TrafficSourceData[] }) {
  const formatPercent = (num: number) => `${(num * 100).toFixed(2)}%`

  const totalSessions = data.reduce((sum, item) => sum + item.sessions, 0)

  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'Direct':
        return '📍'
      case 'Search':
        return '🔍'
      case 'Social':
        return '📱'
      case 'Campaign':
        return '📢'
      case 'Referral':
        return '🔗'
      default:
        return '🌐'
    }
  }

  const getSourceColor = (source: string) => {
    switch (source) {
      case 'Direct':
        return 'bg-blue-500'
      case 'Search':
        return 'bg-green-500'
      case 'Social':
        return 'bg-purple-500'
      case 'Campaign':
        return 'bg-orange-500'
      case 'Referral':
        return 'bg-gray-500'
      default:
        return 'bg-gray-400'
    }
  }

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>유입 경로</TableHead>
              <TableHead className="text-right">세션</TableHead>
              <TableHead className="text-right">비율</TableHead>
              <TableHead className="text-right">시도</TableHead>
              <TableHead className="text-right">완료</TableHead>
              <TableHead className="text-right">전환율</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-muted-foreground">
                  데이터가 없습니다
                </TableCell>
              </TableRow>
            ) : (
              data.map((row, index) => {
                const percentage = totalSessions > 0 ? (row.sessions / totalSessions) * 100 : 0
                return (
                  <TableRow key={index}>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <span>{getSourceIcon(row.trafficSource)}</span>
                        <span className="font-medium">{row.trafficSource}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">{row.sessions.toLocaleString()}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Progress value={percentage} className="h-2" />
                        <span className="text-sm text-muted-foreground w-12 text-right">
                          {percentage.toFixed(1)}%
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">{row.attempts.toLocaleString()}</TableCell>
                    <TableCell className="text-right">{row.completes.toLocaleString()}</TableCell>
                    <TableCell className="text-right">{formatPercent(row.convRate)}</TableCell>
                  </TableRow>
                )
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

