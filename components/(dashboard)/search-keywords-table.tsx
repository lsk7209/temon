'use client'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'

interface SearchKeywordData {
  searchEngine: string
  keyword: string
  sessions: number
  attempts: number
  completes: number
  convRate: number
}

export default function SearchKeywordsTable({ data }: { data: SearchKeywordData[] }) {
  const formatPercent = (num: number) => `${(num * 100).toFixed(2)}%`

  const getEngineBadge = (engine: string) => {
    const colors: Record<string, string> = {
      Google: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      Naver: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      Daum: 'bg-sky-100 text-sky-800 dark:bg-sky-900 dark:text-sky-200',
      Bing: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
      Yahoo: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    }
    return colors[engine] || 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>검색 엔진</TableHead>
            <TableHead>키워드</TableHead>
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
                <TableCell>
                  <Badge className={getEngineBadge(row.searchEngine)}>{row.searchEngine}</Badge>
                </TableCell>
                <TableCell className="font-medium">{row.keyword}</TableCell>
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

