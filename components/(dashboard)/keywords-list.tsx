'use client'

import { Badge } from '@/components/ui/badge'

interface KeywordData {
  keyword: string
  sessions: number
}

export default function KeywordsList({ data }: { data: KeywordData[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {data.length === 0 ? (
        <p className="text-muted-foreground">데이터가 없습니다</p>
      ) : (
        data.map((item, index) => (
          <Badge key={index} variant="secondary" className="text-sm">
            {item.keyword} ({item.sessions.toLocaleString()})
          </Badge>
        ))
      )}
    </div>
  )
}

