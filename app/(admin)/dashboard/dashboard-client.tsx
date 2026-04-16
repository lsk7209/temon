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
import SearchEngineTable from '@/components/(dashboard)/search-engine-table'
import SearchKeywordsTable from '@/components/(dashboard)/search-keywords-table'
import TrafficSourceChart from '@/components/(dashboard)/traffic-source-chart'

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
  searchEngines?: Array<{
    searchEngine: string
    sessions: number
    attempts: number
    completes: number
    convRate: number
  }>
  searchKeywords?: Array<{
    searchEngine: string
    keyword: string
    sessions: number
    attempts: number
    completes: number
    convRate: number
  }>
  trafficSource?: Array<{
    trafficSource: string
    sessions: number
    attempts: number
    completes: number
    convRate: number
  }>
}

export default function DashboardClient({ initialData }: { initialData: DashboardData | null }) {
  const [data, setData] = useState<DashboardData | null>(initialData)
  const [loading, setLoading] = useState(true) // 초기 로딩 상태를 true로 설정
  const [dateRange, setDateRange] = useState<'today' | '7d' | '30d' | 'custom'>('today')
  const [startDate, setStartDate] = useState<Date | undefined>()
  const [endDate, setEndDate] = useState<Date | undefined>()

  const fetchReports = React.useCallback(async () => {
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

      // Cloudflare Pages Functions는 같은 도메인에서 /api/dashboard-stats로 접근 가능
      // 프로덕션에서는 자동으로 Functions로 라우팅됨
      // 참고: /api/reports는 광고 차단기에 의해 차단될 수 있어 변경함
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || '/api/dashboard-stats'
      const res = await fetch(`${apiUrl}?${params.toString()}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })

      if (res.ok) {
        const json = await res.json() as DashboardData & { dbConnected?: boolean; message?: string }

        // DB 연결 상태 확인
        if (json.dbConnected === false) {
          alert(`⚠️ 데이터베이스 연결 오류\n\n${json.message || 'D1 데이터베이스가 설정되지 않았습니다.'}\n\nCloudflare Dashboard에서 D1 데이터베이스를 바인딩해주세요.`)
        }

        setData(json)
      } else {
        const errorText = await res.text()
        let errorData
        try {
          errorData = JSON.parse(errorText)
        } catch {
          errorData = { message: errorText }
        }

        console.error('Failed to fetch reports:', res.status, errorData)

        // DB 연결 오류인 경우
        if (errorData.dbConnected === false || res.status === 503) {
          alert(`⚠️ 데이터베이스 연결 오류\n\n${errorData.message || 'D1 데이터베이스가 설정되지 않았습니다.'}\n\nCloudflare Dashboard에서 D1 데이터베이스를 바인딩해주세요.`)
        } else {
          alert(`데이터를 불러올 수 없습니다. (${res.status})\n${errorData.message || '관리자에게 문의하세요.'}`)
        }
      }
    } catch (error) {
      console.error('Failed to fetch reports:', error)
      alert('데이터를 불러오는 중 오류가 발생했습니다.\n네트워크 연결을 확인하세요.')
    } finally {
      setLoading(false)
    }
  }, [startDate, endDate])

  // 초기 데이터 로드
  useEffect(() => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const start = today
    const end = new Date(today.getTime() + 24 * 60 * 60 * 1000 - 1)

    setStartDate(start)
    setEndDate(end)

    // 즉시 데이터 로드
    const loadInitialData = async () => {
      setLoading(true)
      const params = new URLSearchParams()
      params.set('startDate', start.getTime().toString())
      params.set('endDate', end.getTime().toString())

      const token = localStorage.getItem('admin_token')
      if (!token) {
        window.location.href = '/admin'
        setLoading(false)
        return
      }

      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || '/api/dashboard-stats'
        const res = await fetch(`${apiUrl}?${params.toString()}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        })

        if (res.ok) {
          const json = await res.json() as DashboardData & { dbConnected?: boolean; message?: string }

          // DB 연결 상태 확인
          if (json.dbConnected === false) {
            alert(`⚠️ 데이터베이스 연결 오류\n\n${json.message || 'D1 데이터베이스가 설정되지 않았습니다.'}\n\nCloudflare Dashboard에서 D1 데이터베이스를 바인딩해주세요.`)
          }

          setData(json)
        } else {
          const errorText = await res.text()
          let errorData
          try {
            errorData = JSON.parse(errorText)
          } catch {
            errorData = { message: errorText }
          }

          console.error('Failed to fetch initial data:', res.status, errorData)

          // DB 연결 오류인 경우
          if (errorData.dbConnected === false || res.status === 503) {
            alert(`⚠️ 데이터베이스 연결 오류\n\n${errorData.message || 'D1 데이터베이스가 설정되지 않았습니다.'}\n\nCloudflare Dashboard에서 D1 데이터베이스를 바인딩해주세요.`)
          }

          // 에러가 발생해도 빈 데이터 구조를 설정하여 UI가 표시되도록 함
          setData({
            kpi: {
              sessions: 0,
              attempts_started: 0,
              completed: 0,
              abandoned: 0,
              completion_rate: 0,
              abandon_rate: 0,
              avg_duration_p50: 0,
            },
            funnel: {
              visit: 0,
              start: 0,
              firstPage: 0,
              complete: 0,
            },
            channels: [],
            keywords: [],
            browser: [],
            geo: [],
            timeHeatmap: [],
            perf: {
              lcp: null,
              fid: null,
              cls: null,
              ttfb: null,
            },
            searchEngines: [],
            searchKeywords: [],
            trafficSource: [],
          })
        }
      } catch (error) {
        console.error('Failed to fetch initial data:', error)
        // 에러가 발생해도 빈 데이터 구조를 설정
        setData({
          kpi: {
            sessions: 0,
            attempts_started: 0,
            completed: 0,
            abandoned: 0,
            completion_rate: 0,
            abandon_rate: 0,
            avg_duration_p50: 0,
          },
          funnel: {
            visit: 0,
            start: 0,
            firstPage: 0,
            complete: 0,
          },
          channels: [],
          keywords: [],
          browser: [],
          geo: [],
          timeHeatmap: [],
          perf: {
            lcp: null,
            fid: null,
            cls: null,
            ttfb: null,
          },
          searchEngines: [],
          searchKeywords: [],
          trafficSource: [],
        })
      } finally {
        setLoading(false)
      }
    }

    loadInitialData()
  }, [])

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
  }, [dateRange, fetchReports, startDate, endDate])

  useEffect(() => {
    if (startDate && endDate && dateRange !== 'custom') {
      fetchReports()
    }
  }, [startDate, endDate, dateRange, fetchReports])

  const handleExportCSV = () => {
    // CSV 내보내기 로직
    console.log('Export CSV')
  }

  const handleExportPDF = () => {
    // PDF 내보내기 로직
    console.log('Export PDF')
  }

  if (loading && !data) {
    return (
      <div className="container mx-auto p-8">
        <Card>
          <CardContent className="p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
            <p>데이터를 불러오는 중...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="container mx-auto p-8">
        <Card>
          <CardContent className="p-8 text-center">
            <p className="mb-4">데이터를 불러올 수 없습니다.</p>
            <Button onClick={fetchReports}>다시 시도</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-8 space-y-8">
      {/* 로딩 오버레이 */}
      {loading && data && (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
          <Card className="p-4">
            <CardContent className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-2"></div>
              <p className="text-sm">데이터를 업데이트하는 중...</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Analytics 대시보드</h1>
          <p className="text-muted-foreground mt-2">테몬 플랫폼 통계 분석</p>
          {/* DB 연결 상태 표시 */}
          {data && (
            <div className="mt-2">
              {data.kpi.sessions === 0 && data.kpi.attempts_started === 0 ? (
                <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 text-sm">
                  <span>⚠️</span>
                  <span>
                    데이터가 없습니다. D1 데이터베이스가 연결되어 있고 데이터가 수집되고 있는지 확인해주세요.
                  </span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-green-600 dark:text-green-400 text-sm">
                  <span>✅</span>
                  <span>데이터 수집 중: {data.kpi.sessions.toLocaleString()}개 세션</span>
                </div>
              )}
            </div>
          )}
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

      {/* 검색 엔진별 유입 통계 */}
      {data.searchEngines && data.searchEngines.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>검색 엔진별 유입 통계</CardTitle>
          </CardHeader>
          <CardContent>
            <SearchEngineTable data={data.searchEngines} />
          </CardContent>
        </Card>
      )}

      {/* 검색 엔진별 키워드 분석 */}
      {data.searchKeywords && data.searchKeywords.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>검색 엔진별 키워드 분석</CardTitle>
          </CardHeader>
          <CardContent>
            <SearchKeywordsTable data={data.searchKeywords} />
          </CardContent>
        </Card>
      )}

      {/* 유입 경로 분류 */}
      {data.trafficSource && data.trafficSource.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>유입 경로 분류</CardTitle>
          </CardHeader>
          <CardContent>
            <TrafficSourceChart data={data.trafficSource} />
          </CardContent>
        </Card>
      )}
    </div>
  )
}

