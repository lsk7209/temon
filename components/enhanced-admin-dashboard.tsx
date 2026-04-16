"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Users,
  CheckCircle,
  TrendingUp,
  Activity,
  RefreshCw,
  Search,
  Monitor,
  Smartphone,
  Tablet,
  Globe,
  Code,
  Save,
  Trash2,
  Coffee,
  Utensils,
  Heart,
  BookOpen,
  AlarmClock,
  Trophy,
  ListPlus,
  Loader2,
  Zap,
  ExternalLink,
} from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"
import { getAdvancedStats, checkGAConnection, sendTestEvent } from "@/lib/analytics"

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

interface DeviceStats {
  device: string
  count: number
  percentage: number
}

interface BrowserStats {
  browser: string
  version: string
  count: number
  percentage: number
}

interface KeywordStats {
  keyword: string
  count: number
  percentage: number
}

interface OsStats {
  os: string
  count: number
  percentage: number
}

interface SearchEngineStats {
  engine: string
  count: number
  percentage: number
}

interface LandingPageStats {
  path: string
  count: number
  percentage: number
}

interface SeoOpportunity {
  path: string
  count: number
  percentage: number
  priority: "High" | "Medium" | "Watch"
  action: string
}

interface ScriptConfig {
  id: string
  name: string
  script: string
  enabled: boolean
}

export default function EnhancedAdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date())
  const [gaConnected, setGaConnected] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")

  // 상세 통계 데이터
  const [deviceStats, setDeviceStats] = useState<DeviceStats[]>([])
  const [browserStats, setBrowserStats] = useState<BrowserStats[]>([])
  const [keywordStats, setKeywordStats] = useState<KeywordStats[]>([])
  const [osStats, setOsStats] = useState<OsStats[]>([])
  const [searchEngineStats, setSearchEngineStats] = useState<SearchEngineStats[]>([])
  const [searchLandingPages, setSearchLandingPages] = useState<LandingPageStats[]>([])

  // Head 스크립트 관리
  const [scripts, setScripts] = useState<ScriptConfig[]>([])
  const [editingScript, setEditingScript] = useState<ScriptConfig | null>(null)
  const [scriptName, setScriptName] = useState("")
  const [scriptContent, setScriptContent] = useState("")

  // 퀴즈 공장 상태
  const [queueTopics, setQueueTopics] = useState("")
  const [isSubmittingQueue, setIsSubmittingQueue] = useState(false)
  const [queueItems, setQueueItems] = useState<any[]>([])
  const [queueStats, setQueueStats] = useState<any[]>([])

  const seoOpportunities: SeoOpportunity[] = searchLandingPages.slice(0, 5).map((item) => {
    const normalizedPath = item.path.toLowerCase()
    let action = "Expand intro answer blocks, strengthen result-page guidance, and add tighter related-quiz links."
    if (normalizedPath.includes("kdrama") || normalizedPath.includes("idol")) {
      action = "Broaden entertainment-intent copy, strengthen comparison hooks, and add more share-focused result CTAs."
    } else if (normalizedPath.includes("study") || normalizedPath.includes("alarm") || normalizedPath.includes("phone")) {
      action = "Add practical action steps, outcome-focused snippets, and stronger problem-solving language."
    } else if (normalizedPath.includes("pet") || normalizedPath.includes("ramen") || normalizedPath.includes("food")) {
      action = "Thicken AEO copy, expand FAQ contrast points, and improve next-click depth into related lifestyle quizzes."
    } else if (normalizedPath === "/tests") {
      action = "Curate category blocks, surface top search winners, and tighten collection-page internal links."
    }

    const priority: SeoOpportunity["priority"] =
      item.percentage >= 7 ? "High" : item.percentage >= 4 ? "Medium" : "Watch"

    return {
      path: item.path,
      count: item.count,
      percentage: item.percentage,
      priority,
      action,
    }
  })

  const testIcons: Record<string, React.ComponentType<{ className?: string }>> = {
    "커피 MBTI": Coffee,
    "라면 MBTI": Utensils,
    "반려동물 MBTI": Heart,
    "공부 MBTI": BookOpen,
    "알람 습관": AlarmClock,
    "NTRP 테스트": Trophy,
  }

  const loadMockDetailedStats = useCallback(() => {
    // 모의 데이터 (실제로는 API에서 가져옴)
    setDeviceStats([
      { device: "Desktop", count: 4500, percentage: 65 },
      { device: "Mobile", count: 2200, percentage: 32 },
      { device: "Tablet", count: 250, percentage: 3 },
    ])
    setBrowserStats([
      { browser: "Chrome", version: "120+", count: 4200, percentage: 61 },
      { browser: "Safari", version: "17+", count: 1800, percentage: 26 },
      { browser: "Edge", version: "120+", count: 650, percentage: 9 },
      { browser: "Firefox", version: "121+", count: 300, percentage: 4 },
    ])
    setKeywordStats([
      { keyword: "mbti 테스트", count: 1200, percentage: 17 },
      { keyword: "커피 mbti", count: 850, percentage: 12 },
      { keyword: "성격 테스트", count: 720, percentage: 10 },
      { keyword: "라면 mbti", count: 580, percentage: 8 },
      { keyword: "무료 mbti", count: 450, percentage: 7 },
    ])
    setOsStats([
      { os: "Windows", count: 3800, percentage: 55 },
      { os: "iOS", count: 1800, percentage: 26 },
      { os: "Android", count: 900, percentage: 13 },
      { os: "macOS", count: 450, percentage: 6 },
    ])
    setSearchEngineStats([
      { engine: "Google", count: 2400, percentage: 34 },
      { engine: "Naver", count: 1500, percentage: 21 },
      { engine: "Daum", count: 220, percentage: 3 },
      { engine: "Direct", count: 1800, percentage: 26 },
    ])
    setSearchLandingPages([
      { path: "/tests", count: 820, percentage: 12 },
      { path: "/tests/kdrama-mbti", count: 510, percentage: 7 },
      { path: "/tests/kpop-idol", count: 430, percentage: 6 },
      { path: "/tests/pet-mbti", count: 360, percentage: 5 },
      { path: "/tests/ramen-mbti", count: 310, percentage: 4 },
    ])
  }, [])

  const loadDetailedStats = useCallback(async () => {
    try {
      const response = await fetch('/api/admin/stats/detailed')
      if (response.ok) {
        const data = await response.json()
        setDeviceStats(data.devices || [])
        setBrowserStats(data.browsers || [])
        setKeywordStats(data.keywords || [])
        setOsStats(data.os || [])
        setSearchEngineStats(data.searchEngines || [])
        setSearchLandingPages(data.searchLandingPages || [])
      } else {
        loadMockDetailedStats()
      }
    } catch (error) {
      console.error("상세 통계 로딩 실패:", error)
      loadMockDetailedStats()
    }
  }, [loadMockDetailedStats])

  const loadStats = useCallback(async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/dashboard')
      if (response.ok) {
        const data = await response.json() as DashboardStats
        setStats(data)
        loadDetailedStats()
      } else {
        // Fallback or error handling
        console.error("Dashboard API returned error")
      }
      setLastUpdated(new Date())
      setGaConnected(checkGAConnection())
    } catch (error) {
      console.error("통계 로딩 실패:", error)
    } finally {
      setIsLoading(false)
    }
  }, [loadDetailedStats])

  const loadScripts = () => {
    try {
      const saved = localStorage.getItem('admin_head_scripts')
      if (saved) {
        setScripts(JSON.parse(saved))
      }
    } catch (error) {
      console.error("스크립트 로딩 실패:", error)
    }
  }

  const fetchQueue = async () => {
    try {
      const res = await fetch('/api/admin/queue')
      const data = await res.json()
      if (data.recentItems) setQueueItems(data.recentItems)
      if (data.stats) setQueueStats(data.stats)
    } catch (error) {
      console.error("Failed to fetch queue", error)
    }
  }

  const handleQueueSubmit = async () => {
    if (!queueTopics.trim()) return
    setIsSubmittingQueue(true)
    try {
      const topicList = queueTopics.split('\n').filter(t => t.trim().length > 0)
      const res = await fetch('/api/admin/queue', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topics: topicList }),
      })
      if (res.ok) {
        const data = await res.json()
        toast.success(`${data.count}개 주제가 대기열에 추가되었습니다.`)
        setQueueTopics("")
        fetchQueue()
      } else {
        toast.error("추가에 실패했습니다.")
      }
    } catch (error) {
      toast.error("오류가 발생했습니다.")
    } finally {
      setIsSubmittingQueue(false)
    }
  }

  const saveScripts = (newScripts: ScriptConfig[]) => {
    try {
      localStorage.setItem('admin_head_scripts', JSON.stringify(newScripts))
      setScripts(newScripts)
      alert("스크립트가 저장되었습니다. 페이지를 새로고침하면 적용됩니다.")
    } catch (error) {
      console.error("스크립트 저장 실패:", error)
      alert("스크립트 저장에 실패했습니다.")
    }
  }

  const handleSaveScript = () => {
    if (!scriptName.trim() || !scriptContent.trim()) {
      alert("이름과 스크립트 내용을 입력해주세요.")
      return
    }

    const newScript: ScriptConfig = {
      id: editingScript?.id || Date.now().toString(),
      name: scriptName,
      script: scriptContent,
      enabled: editingScript?.enabled ?? true,
    }

    if (editingScript) {
      const updated = scripts.map(s => s.id === editingScript.id ? newScript : s)
      saveScripts(updated)
    } else {
      saveScripts([...scripts, newScript])
    }

    setEditingScript(null)
    setScriptName("")
    setScriptContent("")
  }

  const handleDeleteScript = (id: string) => {
    if (confirm("정말 삭제하시겠습니까?")) {
      saveScripts(scripts.filter(s => s.id !== id))
    }
  }

  const handleEditScript = (script: ScriptConfig) => {
    setEditingScript(script)
    setScriptName(script.name)
    setScriptContent(script.script)
  }

  useEffect(() => {
    loadStats()
    loadScripts()
    if (activeTab === 'queue') fetchQueue()
    const interval = setInterval(loadStats, 30000)
    return () => clearInterval(interval)
  }, [loadStats, activeTab])

  if (isLoading && !stats) {
    return <div className="p-8 text-center">로딩 중...</div>
  }

  // Handle case where stats failed to load
  if (!stats) {
    return (
      <div className="p-8 text-center text-red-500">
        <p>통계 데이터를 불러오는데 실패했습니다.</p>
        <Button onClick={loadStats} variant="outline" className="mt-4">
          다시 시도
        </Button>
      </div>
    )
  }

  const completionRate =
    stats.totalTestsStarted > 0 ? Math.round((stats.totalTestsCompleted / stats.totalTestsStarted) * 100) : 0

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">📊 관리자 대시보드</h1>
          <p className="text-muted-foreground mt-1">
            테몬 MBTI 플랫폼 분석 | 마지막 업데이트: {lastUpdated.toLocaleTimeString("ko-KR")}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant={gaConnected ? "default" : "destructive"}>
            {gaConnected ? "✅ GA 연결됨" : "❌ GA 연결 안됨"}
          </Badge>
          <Button onClick={() => sendTestEvent() && alert("테스트 이벤트 전송됨")} variant="outline" size="sm">
            🧪 GA 테스트
          </Button>
          <Button onClick={loadStats} disabled={isLoading} variant="outline" size="sm">
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
            새로고침
          </Button>
        </div>
      </div>

      {/* 탭 메뉴 */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">개요</TabsTrigger>
          <TabsTrigger value="statistics">통계</TabsTrigger>
          <TabsTrigger value="keywords">키워드</TabsTrigger>
          <TabsTrigger value="devices">브라우저/기기</TabsTrigger>
          <TabsTrigger value="queue">퀴즈 공장</TabsTrigger>
          <TabsTrigger value="scripts">스크립트</TabsTrigger>
        </TabsList>

        {/* 개요 탭 */}
        <TabsContent value="overview" className="space-y-6">
          {/* 주요 지표 */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">총 방문자</CardTitle>
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
                {stats.testStats && Object.entries(stats.testStats).map(([testName, data]) => {
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
                      <Badge variant={rate >= 70 ? "default" : rate >= 50 ? "secondary" : "outline"}>
                        {rate}%
                      </Badge>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                상위 검색 랜딩 페이지
              </CardTitle>
              <CardDescription>검색엔진 유입이 처음 닿는 페이지 상위 15개</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>페이지</TableHead>
                    <TableHead className="text-right">유입 수</TableHead>
                    <TableHead className="text-right">비중</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {searchLandingPages.map((item, index) => (
                    <TableRow key={`${item.path}-${index}`}>
                      <TableCell className="max-w-[320px] truncate font-medium">{item.path}</TableCell>
                      <TableCell className="text-right">{item.count.toLocaleString()}</TableCell>
                      <TableCell className="text-right">{item.percentage}%</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Card className="hidden">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                SEO Action Queue
              </CardTitle>
              <CardDescription>검색 랜딩 페이지 기준으로 우선 손볼 후보와 권장 작업</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {seoOpportunities.map((item) => (
                  <div key={`seo-opportunity-${item.path}`} className="rounded-xl border p-4">
                    <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <p className="font-semibold">{item.path}</p>
                          <Badge variant={item.priority === "High" ? "default" : item.priority === "Medium" ? "secondary" : "outline"}>
                            {item.priority}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{item.action}</p>
                        <p className="text-xs text-muted-foreground">
                          {item.count.toLocaleString()} search landings, {item.percentage}% of tracked visits
                        </p>
                      </div>
                      <Button variant="outline" size="sm" asChild>
                        <Link href={item.path}>
                          Open
                          <ExternalLink className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                SEO Action Queue
              </CardTitle>
              <CardDescription>검색 랜딩 페이지 기준으로 우선 손볼 후보와 권장 작업</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {seoOpportunities.map((item) => (
                  <div key={`seo-opportunity-keywords-${item.path}`} className="rounded-xl border p-4">
                    <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <p className="font-semibold">{item.path}</p>
                          <Badge variant={item.priority === "High" ? "default" : item.priority === "Medium" ? "secondary" : "outline"}>
                            {item.priority}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{item.action}</p>
                        <p className="text-xs text-muted-foreground">
                          {item.count.toLocaleString()} search landings, {item.percentage}% of tracked visits
                        </p>
                      </div>
                      <Button variant="outline" size="sm" asChild>
                        <Link href={item.path}>
                          Open
                          <ExternalLink className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 통계 탭 */}
        <TabsContent value="statistics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>기기별 통계</CardTitle>
              <CardDescription>접속 기기 유형별 사용 현황</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>기기 유형</TableHead>
                    <TableHead className="text-right">접속 수</TableHead>
                    <TableHead className="text-right">비율</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {deviceStats.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {item.device === "Mobile" && <Smartphone className="h-4 w-4" />}
                          {item.device === "Tablet" && <Tablet className="h-4 w-4" />}
                          {item.device === "Desktop" && <Monitor className="h-4 w-4" />}
                          {item.device}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">{item.count.toLocaleString()}</TableCell>
                      <TableCell className="text-right">{item.percentage}%</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>OS별 통계</CardTitle>
              <CardDescription>운영체제별 사용 현황</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>OS</TableHead>
                    <TableHead className="text-right">접속 수</TableHead>
                    <TableHead className="text-right">비율</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {osStats.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.os}</TableCell>
                      <TableCell className="text-right">{item.count.toLocaleString()}</TableCell>
                      <TableCell className="text-right">{item.percentage}%</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 키워드 탭 */}
        <TabsContent value="keywords" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                검색엔진 유입 비중
              </CardTitle>
              <CardDescription>구글, 네이버, 다음 등 검색엔진별 방문 분포</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {searchEngineStats.map((item, index) => (
                  <div key={`${item.engine}-${index}`} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">{item.engine}</p>
                      <p className="text-sm text-muted-foreground">{item.count.toLocaleString()}회 유입</p>
                    </div>
                    <Badge>{item.percentage}%</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                상위 검색 랜딩 페이지
              </CardTitle>
              <CardDescription>검색엔진 유입이 처음 닿는 페이지 상위 15개</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>페이지</TableHead>
                    <TableHead className="text-right">유입 수</TableHead>
                    <TableHead className="text-right">비중</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {searchLandingPages.map((item, index) => (
                    <TableRow key={`keywords-${item.path}-${index}`}>
                      <TableCell className="max-w-[320px] truncate font-medium">{item.path}</TableCell>
                      <TableCell className="text-right">{item.count.toLocaleString()}</TableCell>
                      <TableCell className="text-right">{item.percentage}%</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                검색 키워드 통계
              </CardTitle>
              <CardDescription>사용자들이 검색한 키워드 Top 10</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {keywordStats.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="w-8 h-8 flex items-center justify-center">
                        {index + 1}
                      </Badge>
                      <div>
                        <p className="font-medium">{item.keyword}</p>
                        <p className="text-sm text-muted-foreground">{item.count.toLocaleString()}회 검색</p>
                      </div>
                    </div>
                    <Badge>{item.percentage}%</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 브라우저/기기 탭 */}
        <TabsContent value="devices" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                브라우저별 통계
              </CardTitle>
              <CardDescription>브라우저 및 버전별 사용 현황</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>브라우저</TableHead>
                    <TableHead>버전</TableHead>
                    <TableHead className="text-right">접속 수</TableHead>
                    <TableHead className="text-right">비율</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {browserStats.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.browser}</TableCell>
                      <TableCell>{item.version}</TableCell>
                      <TableCell className="text-right">{item.count.toLocaleString()}</TableCell>
                      <TableCell className="text-right">{item.percentage}%</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 퀴즈 공장 탭 */}
        <TabsContent value="queue" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ListPlus className="h-5 w-5" />
                  주제 대량 입력
                </CardTitle>
                <CardDescription className="flex items-center justify-between">
                  <span>새로운 퀴즈 주제를 입력하면 AI가 자동으로 생성합니다.</span>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      <AlarmClock className="mr-1 h-3 w-3" />
                      자동 실행: 매시 00분
                    </Badge>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={async () => {
                        try {
                          setIsSubmittingQueue(true)
                          const res = await fetch('/api/cron/generate')
                          const data = await res.json()
                          if (data.success) {
                            toast.success("즉시 생성이 시작되었습니다!")
                            fetchQueue() // 데이터 갱신
                          } else {
                            toast.error(data.message || "생성 실패")
                          }
                        } catch (e) {
                          toast.error("요청 중 오류 발생")
                        } finally {
                          setIsSubmittingQueue(false)
                        }
                      }}
                      disabled={isSubmittingQueue}
                    >
                      {isSubmittingQueue ? (
                        <Loader2 className="mr-2 h-3 w-3 animate-spin" />
                      ) : (
                        <Zap className="mr-2 h-3 w-3 text-yellow-500" />
                      )}
                      지금 즉시 실행
                    </Button>
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="주제를 입력하세요...&#13;&#10;연애 세포 테스트&#13;&#10;탕수육 부먹 찍먹 테스트"
                  className="min-h-[250px] font-mono"
                  value={queueTopics}
                  onChange={(e) => setQueueTopics(e.target.value)}
                />
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    {queueTopics.split('\n').filter(t => t.trim()).length}개 감지됨
                  </span>
                  <Button onClick={handleQueueSubmit} disabled={isSubmittingQueue || !queueTopics.trim()}>
                    {isSubmittingQueue && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    대기열 추가
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="py-4">
                    <CardTitle className="text-sm font-medium text-muted-foreground">대기중</CardTitle>
                    <div className="text-2xl font-bold mt-2">
                      {queueStats.find(s => s.status === 'pending')?.count || 0}
                    </div>
                  </CardHeader>
                </Card>
                <Card>
                  <CardHeader className="py-4">
                    <CardTitle className="text-sm font-medium text-muted-foreground">완료</CardTitle>
                    <div className="text-2xl font-bold mt-2 text-green-600">
                      {queueStats.find(s => s.status === 'completed')?.count || 0}
                    </div>
                  </CardHeader>
                </Card>
                <Card>
                  <CardHeader className="py-4">
                    <CardTitle className="text-sm font-medium text-muted-foreground">실패</CardTitle>
                    <div className="text-2xl font-bold mt-2 text-red-600">
                      {queueStats.find(s => s.status === 'failed')?.count || 0}
                    </div>
                  </CardHeader>
                </Card>
              </div>

              <Card className="max-h-[380px] flex flex-col">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>최근 작업</CardTitle>
                    <Button onClick={fetchQueue} variant="outline" size="sm">
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 overflow-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>상태</TableHead>
                        <TableHead>주제</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {queueItems.map((item) => {
                        const testId = item.status === 'completed' && item.logs?.startsWith('Generated: ')
                          ? item.logs.split('Generated: ')[1]
                          : null;

                        return (
                          <TableRow key={item.id}>
                            <TableCell>
                              <Badge variant={item.status === 'completed' ? 'default' : item.status === 'failed' ? 'destructive' : 'outline'}>
                                {item.status === 'pending' ? '대기중' : item.status === 'completed' ? '완료' : '실패'}
                              </Badge>
                            </TableCell>
                            <TableCell className="font-medium">
                              <div className="flex items-center justify-between group">
                                <span>{item.keyword}</span>
                                {testId && (
                                  <Link
                                    href={`/tests/${testId}`}
                                    target="_blank"
                                    className="text-indigo-600 hover:text-indigo-800 flex items-center gap-1 text-xs"
                                  >
                                    <ExternalLink className="h-3 w-3" />
                                    보기
                                  </Link>
                                )}
                              </div>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                      {queueItems.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={2} className="text-center py-8 text-muted-foreground">
                            대기열이 비어있습니다.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* 스크립트 관리 탭 */}
        <TabsContent value="scripts" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5" />
                Head 스크립트 관리
              </CardTitle>
              <CardDescription>페이지 head에 삽입할 스크립트를 관리합니다</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* 스크립트 목록 */}
              <div className="space-y-2">
                {scripts.map((script) => (
                  <div key={script.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <Badge variant={script.enabled ? "default" : "secondary"}>
                          {script.enabled ? "활성" : "비활성"}
                        </Badge>
                        <p className="font-medium">{script.name}</p>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {script.script.substring(0, 100)}...
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleEditScript(script)}>
                        수정
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDeleteScript(script.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {/* 스크립트 추가/수정 폼 */}
              <div className="border-t pt-4">
                <h3 className="font-medium mb-4">
                  {editingScript ? "스크립트 수정" : "새 스크립트 추가"}
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">스크립트 이름</label>
                    <Input
                      value={scriptName}
                      onChange={(e) => setScriptName(e.target.value)}
                      placeholder="예: Google Analytics, Meta Pixel 등"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">스크립트 코드</label>
                    <Textarea
                      value={scriptContent}
                      onChange={(e) => setScriptContent(e.target.value)}
                      placeholder="<script>...</script> 태그를 포함한 전체 코드를 입력하세요"
                      rows={8}
                      className="font-mono text-sm"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={handleSaveScript}>
                      <Save className="h-4 w-4 mr-2" />
                      저장
                    </Button>
                    {editingScript && (
                      <Button variant="outline" onClick={() => {
                        setEditingScript(null)
                        setScriptName("")
                        setScriptContent("")
                      }}>
                        취소
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              <div className="bg-muted p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  💡 <strong>주의사항:</strong> 스크립트는 localStorage에 저장되며, 실제 적용을 위해서는
                  layout.tsx에서 이 데이터를 읽어와 head에 삽입해야 합니다.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
