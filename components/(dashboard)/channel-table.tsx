'use client'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

interface ChannelData {
  source: string
  medium: string
  campaign: string
  sessions: number
  attempts: number
  completes: number
  convRate: number
}

export default function ChannelTable({ data }: { data: ChannelData[] }) {
  const formatPercent = (num: number) => `${(num * 100).toFixed(2)}%`

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Source</TableHead>
            <TableHead>Medium</TableHead>
            <TableHead>Campaign</TableHead>
            <TableHead className="text-right">세션</TableHead>
            <TableHead className="text-right">시도</TableHead>
            <TableHead className="text-right">완료</TableHead>
            <TableHead className="text-right">전환율</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center text-muted-foreground">
                데이터가 없습니다
              </TableCell>
            </TableRow>
          ) : (
            data.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.source}</TableCell>
                <TableCell>{row.medium}</TableCell>
                <TableCell>{row.campaign}</TableCell>
                <TableCell className="text-right">{row.sessions.toLocaleString()}</TableCell>
                <TableCell className="text-right">{row.attempts.toLocaleString()}</TableCell>
                <TableCell className="text-right">{row.completes.toLocaleString()}</TableCell>
                <TableCell className="text-right">{formatPercent(row.convRate)}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}

