'use client'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

interface GeoData {
  country: string | null
  city: string | null
  sessions: number
  attempts: number
  completes: number
  convRate: number
}

export default function GeoTable({ data }: { data: GeoData[] }) {
  const formatPercent = (num: number) => `${(num * 100).toFixed(2)}%`

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>국가</TableHead>
            <TableHead>도시</TableHead>
            <TableHead className="text-right">세션</TableHead>
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
            data.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.country || '(unknown)'}</TableCell>
                <TableCell>{row.city || '-'}</TableCell>
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

