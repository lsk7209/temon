"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Users,
  CheckCircle,
  TrendingUp,
  Activity,
  RefreshCw,
  Coffee,
  Utensils,
  Heart,
  BookOpen,
  AlarmClock,
  Trophy,
  Zap,
} from "lucide-react"
import { checkGAConnection, sendTestEvent } from "@/lib/analytics"

interface TestStat {
  started: number
  completed: number
}

interface DashboardStats {
  totalVisits: number
  totalTestsStarted: number
  totalTestsCompleted: number
  lastVisit: number
  testStats: Record<string, TestStat>
}

type LoadState = "loading" | "live" | "empty" | "unavailable"

export default function AnalyticsDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loadState, setLoadState] = useState<LoadState>("loading")
  const [unavailableReason, setUnavailableReason] = useState<string | null>(null)
  const [lastSuccessAt, setLastSuccessAt] = useState<Date | null>(null)
  const [gaConnected, setGaConnected] = useState(false)

  const testIcons: Record<string, React.ComponentType<{ className?: string }>> = {
    "커피 MBTI": Coffee,
    "라면 MBTI": Utensils,
    "반려동물 MBTI": Heart,
    "공부 MBTI": BookOpen,
    "알람 습관": AlarmClock,
    "NTRP 테스트": Trophy,
  }

  // API 실패 시 임의 숫자를 만들어 "실시간 통계"로 표시하지 않는다 (F09).
  // 조회 실패와 데이터 없음을 구분하고, 401/403은 권한 안내로 분리한다.
  const loadStats = async () => {
    setLoadState((previous) => (previous === "live" ? previous : "loading"))
    try {
      const response = await fetch("/api/dashboard")
      if (response.status === 401 || response.status === 403) {
        setUnavailableReason("관리자 권한이 필요합니다.")
        setLoadState("unavailable")
        return
      }
      if (!response.ok) {
        setUnavailableReason(`통계 조회에 실패했습니다 (HTTP ${response.status}).`)
        setLoadState("unavailable")
        return
      }
      const data = (await response.json()) as DashboardStats & { success?: boolean; error?: string }
      if (data.success === false) {
        setUnavailableReason(data.error || "통계 조회에 실패했습니다.")
        setLoadState("unavailable")
        return
      }
      setStats(data)
      setLastSuccessAt(new Date())
      setUnavailableReason(null)
      const hasAnyData =
        data.totalVisits > 0 || data.totalTestsStarted > 0 || data.totalTestsCompleted > 0
      setLoadState(hasAnyData ? "live" : "empty")
    } catch (error) {
      console.error("통계 로딩 실패:", error)
      setUnavailableReason("네트워크 오류로 통계를 불러오지 못했습니다.")
      setLoadState("unavailable")
    } finally {
      setGaConnected(checkGAConnection())
    }
  }

  const handleRefresh = () => {
    loadStats()
  }

  const handleTestGA = () => {
    const success = sendTestEvent()
    if (success) {
      alert("GA 테스트 이벤트가 전송되었습니다! Google Analytics에서 확인해보세요.")
    } else {
      alert("GA 연결에 문제가 있습니다.")
    }
  }

  useEffect(() => {
    loadStats()

    // 30초마다 자동 업데이트
    const interval = setInterval(loadStats, 30000)
    return () => clearInterval(interval)
  }, [])

  if (loadState === "loading" && !stats) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <Skeleton className="h-8 w-48 mb-2" />
            <Skeleton className="h-4 w-64" />
          </div>
          <div className="flex space-x-2">
            <Skeleton className="h-9 w-20" />
            <Skeleton className="h-9 w-24" />
            <Skeleton className="h-9 w-20" />
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-4" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-16 mb-2" />
                <Skeleton className="h-3 w-24" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  // 조회 실패: 데이터가 없다는 뜻이 아니라 확인할 수 없다는 뜻이므로 명확히 구분한다.
  if (loadState === "unavailable" && !stats) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">📊 실시간 통계</h1>
            <p className="text-muted-foreground mt-1">테몬 MBTI 플랫폼 분석 대시보드</p>
          </div>
          <Button onClick={handleRefresh} variant="outline" size="sm" className="gap-2 bg-transparent">
            <RefreshCw className="h-4 w-4" />
            다시 시도
          </Button>
        </div>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm font-medium text-destructive">통계를 불러올 수 없습니다</p>
            <p className="text-sm text-muted-foreground mt-1">{unavailableReason}</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!stats) return null

  const completionRate =
    stats.totalTestsStarted > 0 ? Math.round((stats.totalTestsCompleted / stats.totalTestsStarted) * 100) : 0

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">📊 실시간 통계</h1>
          <p className="text-muted-foreground mt-1">
            테몬 MBTI 플랫폼 분석 대시보드
            {lastSuccessAt && ` | 마지막 조회 성공: ${lastSuccessAt.toLocaleTimeString("ko-KR")}`}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant={gaConnected ? "default" : "destructive"}>
            {gaConnected ? "✅ GA 스크립트 준비됨" : "❌ GA 스크립트 없음"}
          </Badge>
          <Button onClick={handleTestGA} variant="outline" size="sm" className="gap-2 bg-transparent">
            <Zap className="h-4 w-4" />🧪 GA 테스트
          </Button>
          <Button
            onClick={handleRefresh}
            disabled={loadState === "loading"}
            variant="outline"
            size="sm"
            className="gap-2 bg-transparent"
          >
            <RefreshCw className={`h-4 w-4 ${loadState === "loading" ? "animate-spin" : ""}`} />
            새로고침
          </Button>
        </div>
      </div>

      {loadState === "unavailable" && (
        <Card className="border-destructive/50">
          <CardContent className="pt-6">
            <p className="text-sm font-medium text-destructive">최근 조회에 실패했습니다</p>
            <p className="text-sm text-muted-foreground mt-1">
              {unavailableReason} 아래 수치는 이전 조회값입니다
              {lastSuccessAt ? ` (${lastSuccessAt.toLocaleTimeString("ko-KR")} 기준)` : ""}.
            </p>
          </CardContent>
        </Card>
      )}

      {/* GA 스크립트 로딩 상태 — 실제 데이터 수집 완료를 뜻하지 않는다 */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${gaConnected ? "bg-green-500" : "bg-red-500"}`} />
              <span className="font-medium">Google Analytics 스크립트 상태</span>
            </div>
            <Badge variant={gaConnected ? "default" : "destructive"}>
              {gaConnected ? "✅ 로드됨" : "❌ 로드 안됨"}
            </Badge>
          </div>
          {gaConnected && (
            <p className="text-sm text-muted-foreground mt-2">
              추적 ID: G-L167CCPS8E | window.gtag 함수가 로드되어 있습니다 (실시간 수집 완료를 보장하지 않음)
            </p>
          )}
        </CardContent>
      </Card>

      {/* 주요 지표 */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">총 방문</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalVisits.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">누적 페이지 방문</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">테스트 시작</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalTestsStarted.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">총 시작 횟수</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">테스트 완료</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalTestsCompleted.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">총 완료 횟수</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">완료율</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{completionRate}%</div>
            <p className="text-xs text-muted-foreground">평균 완료율</p>
          </CardContent>
        </Card>
      </div>

      {/* 테스트별 상세 통계 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            테스트별 상세 통계
          </CardTitle>
          <CardDescription>각 테스트의 시작 및 완료 현황</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(stats.testStats).map(([testName, data]) => {
              const Icon = testIcons[testName] || Activity
              const rate = data.started > 0 ? Math.round((data.completed / data.started) * 100) : 0

              return (
                <div key={testName} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Icon className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <h4 className="font-medium">{testName}</h4>
                      <p className="text-sm text-muted-foreground">
                        시작: {data.started.toLocaleString()} | 완료: {data.completed.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-24">
                      <Progress value={rate} className="h-2" />
                    </div>
                    <Badge variant={rate >= 70 ? "default" : rate >= 50 ? "secondary" : "outline"}>{rate}%</Badge>
                  </div>
                </div>
              )
            })}
            {Object.keys(stats.testStats).length === 0 && (
              <p className="text-center text-muted-foreground py-8">
                아직 테스트 데이터가 없습니다. 테스트를 실행해보세요!
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* 마지막 조회 정보 — "실시간 수집 중" 같은 확인되지 않은 문구를 쓰지 않는다 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            조회 정보
          </CardTitle>
          <CardDescription>
            {lastSuccessAt ? `마지막 조회 성공: ${lastSuccessAt.toLocaleString("ko-KR")}` : "조회 기록 없음"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <AlarmClock className="h-3 w-3" />
              <span>마지막 방문: {new Date(stats.lastVisit).toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="h-3 w-3" />
              <span>활성 테스트: {Object.keys(stats.testStats).length}개</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
