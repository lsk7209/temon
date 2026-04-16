'use client'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

interface SearchEngineData {
  searchEngine: string
  sessions: number
  attempts: number
  completes: number
  convRate: number
}

export default function SearchEngineTable({ data }: { data: SearchEngineData[] }) {
  const formatPercent = (num: number) => `${(num * 100).toFixed(2)}%`

  const getEngineIcon = (engine: string) => {
    switch (engine) {
      case 'Google':
        return '🔍'
      case 'Naver':
        return '🟢'
      case 'Daum':
        return '🔵'
      case 'Bing':
        return '🔎'
      case 'Yahoo':
        return '💜'
      case 'Direct':
        return '📍'
      default:
        return '🌐'
    }
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>검색 엔진</TableHead>
            <TableHead className="text-right">세션</TableHead>
            <TableHead className="text-right">시도</TableHead>
            <TableHead className="text-right">완료</TableHead>
            <TableHead className="text-right">전환율</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-muted-foreground">
                데이터가 없습니다
              </TableCell>
            </TableRow>
          ) : (
            data.map((row, index) => (
              <TableRow key={index}>
                <TableCell>
                  <span className="mr-2">{getEngineIcon(row.searchEngine)}</span>
                  {row.searchEngine}
                </TableCell>
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

