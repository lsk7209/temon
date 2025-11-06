'use client'

/**
 * 대시보드 클라이언트 컴포넌트
 */

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { CalendarIcon, Download, Filter } from 'lucide-react'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'
import KPICards from '@/components/(dashboard)/kpi-cards'
import FunnelChart from '@/components/(dashboard)/funnel-chart'
import ChannelTable from '@/components/(dashboard)/channel-table'
import BrowserTable from '@/components/(dashboard)/browser-table'
import GeoTable from '@/components/(dashboard)/geo-table'
import TimeHeatmap from '@/components/(dashboard)/time-heatmap'
import PerfChart from '@/components/(dashboard)/perf-chart'
import KeywordsList from '@/components/(dashboard)/keywords-list'

interface DashboardData {
  kpi: {
    sessions: number
    attempts_started: number
    completed: number
    abandoned: number
    completion_rate: number
    abandon_rate: number
    avg_duration_p50: number
  }
  funnel: {
    visit: number
    start: number
    firstPage: number
    complete: number
  }
  channels: Array<{
    source: string
    medium: string
    campaign: string
    sessions: number
    attempts: number
    completes: number
    convRate: number
  }>
  keywords: Array<{
    keyword: string
    sessions: number
  }>
  browser: Array<{
    browser: string | null
    browserVer: string | null
    sessions: number
    attempts: number
    completes: number
    convRate: number
  }>
  geo: Array<{
    country: string | null
    city: string | null
    sessions: number
    attempts: number
    completes: number
    convRate: number
  }>
  timeHeatmap: Array<{
    dayOfWeek: number
    hour: number
    views: number
  }>
  perf: {
    lcp: number | null
    fid: number | null
    cls: number | null
    ttfb: number | null
  }
}

export default function DashboardClient({ initialData }: { initialData: DashboardData | null }) {
  const [data, setData] = useState<DashboardData | null>(initialData)
  const [loading, setLoading] = useState(false)
  const [dateRange, setDateRange] = useState<'today' | '7d' | '30d' | 'custom'>('today')
  const [startDate, setStartDate] = useState<Date | undefined>()
  const [endDate, setEndDate] = useState<Date | undefined>()

  const fetchReports = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (startDate) params.set('startDate', startDate.getTime().toString())
      if (endDate) params.set('endDate', endDate.getTime().toString())

      const token = localStorage.getItem('admin_token')
      if (!token) {
        window.location.href = '/admin'
        return
      }

      const res = await fetch(`/api/reports?${params.toString()}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (res.ok) {
        const json = await res.json() as DashboardData
        setData(json)
      }
    } catch (error) {
      console.error('Failed to fetch reports:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (dateRange === 'custom' && startDate && endDate) {
      fetchReports()
    } else if (dateRange !== 'custom') {
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      let start: Date

      switch (dateRange) {
        case '7d':
          start = new Date(today)
          start.setDate(start.getDate() - 7)
          break
        case '30d':
          start = new Date(today)
          start.setDate(start.getDate() - 30)
          break
        default:
          start = today
      }

      setStartDate(start)
      setEndDate(new Date(today.getTime() + 24 * 60 * 60 * 1000 - 1))
    }
  }, [dateRange])

  useEffect(() => {
    if (startDate && endDate && dateRange !== 'custom') {
      fetchReports()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDate, endDate, dateRange])

  const handleExportCSV = () => {
    // CSV 내보내기 로직
    console.log('Export CSV')
  }

  const handleExportPDF = () => {
    // PDF 내보내기 로직
    console.log('Export PDF')
  }

  if (!data) {
    return (
      <div className="container mx-auto p-8">
        <Card>
          <CardContent className="p-8 text-center">
            <p>데이터를 불러올 수 없습니다.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-8 space-y-8">
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Analytics 대시보드</h1>
          <p className="text-muted-foreground mt-2">테몬 플랫폼 통계 분석</p>
        </div>
        <div className="flex items-center space-x-4">
          <Select value={dateRange} onValueChange={(v) => setDateRange(v as any)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">오늘</SelectItem>
              <SelectItem value="7d">최근 7일</SelectItem>
              <SelectItem value="30d">최근 30일</SelectItem>
              <SelectItem value="custom">커스텀</SelectItem>
            </SelectContent>
          </Select>

          {dateRange === 'custom' && (
            <>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startDate ? format(startDate, 'yyyy-MM-dd', { locale: ko }) : '시작일'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <Calendar mode="single" selected={startDate} onSelect={setStartDate} />
                </PopoverContent>
              </Popover>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {endDate ? format(endDate, 'yyyy-MM-dd', { locale: ko }) : '종료일'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <Calendar mode="single" selected={endDate} onSelect={setEndDate} />
                </PopoverContent>
              </Popover>
            </>
          )}

          <Button variant="outline" onClick={handleExportCSV}>
            <Download className="mr-2 h-4 w-4" />
            CSV
          </Button>
          <Button variant="outline" onClick={handleExportPDF}>
            <Download className="mr-2 h-4 w-4" />
            PDF
          </Button>
        </div>
      </div>

      {/* KPI 카드 */}
      <KPICards data={data.kpi} />

      {/* 퍼널 차트 */}
      <Card>
        <CardHeader>
          <CardTitle>전환 퍼널</CardTitle>
        </CardHeader>
        <CardContent>
          <FunnelChart data={data.funnel} />
        </CardContent>
      </Card>

      {/* 채널/캠페인 테이블 */}
      <Card>
        <CardHeader>
          <CardTitle>채널/캠페인 성과</CardTitle>
        </CardHeader>
        <CardContent>
          <ChannelTable data={data.channels} />
        </CardContent>
      </Card>

      {/* 키워드 Top 10 */}
      <Card>
        <CardHeader>
          <CardTitle>키워드 Top 10</CardTitle>
        </CardHeader>
        <CardContent>
          <KeywordsList data={data.keywords} />
        </CardContent>
      </Card>

      {/* 브라우저별 전환율 */}
      <Card>
        <CardHeader>
          <CardTitle>브라우저별 전환율</CardTitle>
        </CardHeader>
        <CardContent>
          <BrowserTable data={data.browser} />
        </CardContent>
      </Card>

      {/* 지역별 통계 */}
      <Card>
        <CardHeader>
          <CardTitle>지역별 통계</CardTitle>
        </CardHeader>
        <CardContent>
          <GeoTable data={data.geo} />
        </CardContent>
      </Card>

      {/* 시간대 히트맵 */}
      <Card>
        <CardHeader>
          <CardTitle>시간대 히트맵</CardTitle>
        </CardHeader>
        <CardContent>
          <TimeHeatmap data={data.timeHeatmap} />
        </CardContent>
      </Card>

      {/* Web Vitals */}
      <Card>
        <CardHeader>
          <CardTitle>Web Vitals 성능</CardTitle>
        </CardHeader>
        <CardContent>
          <PerfChart data={data.perf} />
        </CardContent>
      </Card>
    </div>
  )
}

