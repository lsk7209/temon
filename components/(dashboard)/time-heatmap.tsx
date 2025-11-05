'use client'

import { useMemo } from 'react'

interface HeatmapData {
  dayOfWeek: number
  hour: number
  views: number
}

export default function TimeHeatmap({ data }: { data: HeatmapData[] }) {
  const days = ['일', '월', '화', '수', '목', '금', '토']

  // 히트맵 데이터 구성
  const heatmap = useMemo(() => {
    const map: Record<number, Record<number, number>> = {}
    
    // 초기화
    for (let day = 0; day < 7; day++) {
      map[day] = {}
      for (let hour = 0; hour < 24; hour++) {
        map[day][hour] = 0
      }
    }

    // 데이터 채우기
    data.forEach((item) => {
      if (map[item.dayOfWeek]) {
        map[item.dayOfWeek][item.hour] = item.views
      }
    })

    return map
  }, [data])

  const maxValue = Math.max(...data.map((d) => d.views), 1)

  const getIntensity = (value: number) => {
    if (value === 0) return 'bg-gray-100 dark:bg-gray-800'
    const ratio = value / maxValue
    if (ratio < 0.25) return 'bg-blue-200 dark:bg-blue-900'
    if (ratio < 0.5) return 'bg-blue-400 dark:bg-blue-700'
    if (ratio < 0.75) return 'bg-blue-600 dark:bg-blue-500'
    return 'bg-blue-800 dark:bg-blue-300'
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-25 gap-1">
        <div className="text-sm font-medium">요일/시간</div>
        {Array.from({ length: 24 }, (_, i) => (
          <div key={i} className="text-xs text-center text-muted-foreground">
            {i}시
          </div>
        ))}
        {days.map((day, dayIndex) => (
          <>
            <div key={`day-${dayIndex}`} className="text-sm font-medium">
              {day}
            </div>
            {Array.from({ length: 24 }, (_, hour) => (
              <div
                key={`${dayIndex}-${hour}`}
                className={`aspect-square rounded ${getIntensity(heatmap[dayIndex]?.[hour] || 0)}`}
                title={`${day}요일 ${hour}시: ${(heatmap[dayIndex]?.[hour] || 0).toLocaleString()}회`}
              />
            ))}
          </>
        ))}
      </div>
      <div className="flex items-center justify-end space-x-4 text-xs text-muted-foreground">
        <span>낮음</span>
        <div className="flex space-x-1">
          <div className="w-3 h-3 bg-blue-200 dark:bg-blue-900 rounded" />
          <div className="w-3 h-3 bg-blue-400 dark:bg-blue-700 rounded" />
          <div className="w-3 h-3 bg-blue-600 dark:bg-blue-500 rounded" />
          <div className="w-3 h-3 bg-blue-800 dark:bg-blue-300 rounded" />
        </div>
        <span>높음</span>
      </div>
    </div>
  )
}

