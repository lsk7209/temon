"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import dynamic from "next/dynamic"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  levelBands,
  personas,
  drills,
  kpis,
  weeklyPlan,
  doubles,
  equipment,
  injuryRisks,
  commonMistakes,
} from "@/lib/ntrpResultConfig"
import { getNTRPLevel, mapScoreToLevelBand, mapLevelToBaseProfile } from "@/lib/ntrpMath"
import { NTRPResultCard } from "@/components/ntrp-result-card"
import { ShareButtons } from "@/components/share-buttons"
import { trackTestComplete, trackShare } from "@/lib/analytics"
import { Download, RotateCcw, Copy, CheckCircle2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const NTRPRadarChart = dynamic(
  () => import("@/components/ntrp-radar-chart").then((mod) => mod.NTRPRadarChart),
  {
    ssr: false,
    loading: () => <div className="h-[400px] animate-pulse rounded-lg bg-muted" />,
  },
)

export default function NTRPTestResult() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { toast } = useToast()
  const cardRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)
  const [copied, setCopied] = useState(false)

  // Query params 읽기
  const scoreParam = searchParams.get("level") || searchParams.get("score")
  const score = scoreParam ? parseFloat(scoreParam) : 45 // Fallback to 45 for demo
  const q13Param = searchParams.get("q13")
  const resultId = searchParams.get("id") || undefined

  // 레벨 및 페르소나 계산
  const levelObj = useMemo(() => getNTRPLevel(score), [score])
  const band = useMemo(() => mapScoreToLevelBand(score), [score])
  const bandConfig = useMemo(() => levelBands.find((b) => b.level === band.level), [band.level])
  const persona = useMemo(() => {
    if (q13Param && personas[q13Param]) {
      return { label: q13Param, ...personas[q13Param] }
    }
    return { label: "올라운더", ...personas["올라운더"] }
  }, [q13Param])

  // 레이더 차트 데이터
  const radarData = useMemo(() => mapLevelToBaseProfile(band.level), [band.level])

  useEffect(() => {
    setMounted(true)
    trackTestComplete("ntrp-test", levelObj.level)
  }, [levelObj.level])

  // Export functions
  const handleExportPNG = async () => {
    if (!cardRef.current) return

    try {
      const [{ toPng }, { default: dayjs }] = await Promise.all([
        import("html-to-image"),
        import("dayjs"),
      ])
      const dataUrl = await toPng(cardRef.current, {
        quality: 1.0,
        pixelRatio: 2,
        backgroundColor: "#ffffff",
      })

      const link = document.createElement("a")
      link.download = `ntrp-result-${levelObj.level}-${dayjs().format("YYYYMMDD")}.png`
      link.href = dataUrl
      link.click()

      toast({
        title: "PNG 저장 완료",
        description: "결과 카드가 이미지로 저장되었습니다.",
      })
    } catch (error) {
      void error
      toast({
        title: "저장 실패",
        description: "이미지 저장 중 오류가 발생했습니다.",
        variant: "destructive",
      })
    }
  }

  const handleExportPDF = async () => {
    if (!cardRef.current) return

    try {
      const [{ toPng }, { PDFDocument, rgb }, { default: dayjs }] =
        await Promise.all([
          import("html-to-image"),
          import("pdf-lib"),
          import("dayjs"),
        ])
      const dataUrl = await toPng(cardRef.current, {
        quality: 1.0,
        pixelRatio: 2,
        backgroundColor: "#ffffff",
      })

      const pdfDoc = await PDFDocument.create()
      const page = pdfDoc.addPage([595, 842]) // A4 size

      const img = await pdfDoc.embedPng(dataUrl)
      const imgDims = img.scale(0.5)
      page.drawImage(img, {
        x: (page.getWidth() - imgDims.width) / 2,
        y: page.getHeight() - imgDims.height - 50,
        width: imgDims.width,
        height: imgDims.height,
      })

      page.drawText(`테몬 MBTI - NTRP 테스트 결과`, {
        x: 50,
        y: 30,
        size: 10,
        color: rgb(0.5, 0.5, 0.5),
      })

      page.drawText(dayjs().format("YYYY년 MM월 DD일"), {
        x: 450,
        y: 30,
        size: 10,
        color: rgb(0.5, 0.5, 0.5),
      })

      const pdfBytes = await pdfDoc.save()
      const blob = new Blob([pdfBytes as BlobPart], { type: "application/pdf" })
      const url = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.download = `ntrp-result-${levelObj.level}-${dayjs().format("YYYYMMDD")}.pdf`
      link.href = url
      link.click()
      URL.revokeObjectURL(url)

      toast({
        title: "PDF 저장 완료",
        description: "결과가 PDF로 저장되었습니다.",
      })
    } catch (error) {
      void error
      toast({
        title: "저장 실패",
        description: "PDF 저장 중 오류가 발생했습니다.",
        variant: "destructive",
      })
    }
  }

  const handleCopyLink = async () => {
    const url = `${window.location.origin}/tests/ntrp-test/test/result?level=${score}${q13Param ? `&q13=${encodeURIComponent(q13Param)}` : ""}`
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
      toast({
        title: "링크 복사 완료",
        description: "결과 링크가 클립보드에 복사되었습니다.",
      })
    } catch (error) {
      void error
      toast({
        title: "복사 실패",
        description: "링크 복사 중 오류가 발생했습니다.",
        variant: "destructive",
      })
    }
  }

  const handleShare = (platform: string) => {
    trackShare("ntrp-test", platform)
  }

  if (!mounted || !bandConfig) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
      </div>
    )
  }

  const themeColor = persona.theme || bandConfig.color
  const levelDrills = drills[band.level] || []
  const levelKpis = kpis[band.level] || []
  const levelWeeklyPlan = weeklyPlan[band.level] || []
  const levelDoubles = doubles[band.level]
  const levelEquipment = equipment[band.level]
  const levelInjuryRisks = injuryRisks[band.level] || []
  const levelMistakes = commonMistakes[band.level] || []

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🎾</div>
          <Badge
            className="text-lg px-4 py-2 mb-4 text-white"
            style={{ backgroundColor: themeColor }}
          >
            NTRP {levelObj.level}
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            당신의 NTRP 레벨은 {levelObj.level} 입니다
          </h1>
          <p className="text-xl text-gray-600 mb-2">{bandConfig.title} - {levelObj.desc}</p>
          <Badge variant="outline" className="mt-2" style={{ borderColor: themeColor, color: themeColor }}>
            {persona.slogan}
          </Badge>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 justify-center mt-6">
            <Button onClick={() => router.push("/tests/ntrp-test/test")} variant="outline" size="lg">
              <RotateCcw className="h-4 w-4 mr-2" />
              다시 테스트
            </Button>
            <Button onClick={handleCopyLink} variant="outline" size="lg">
              {copied ? (
                <>
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  복사됨
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 mr-2" />
                  링크 복사
                </>
              )}
            </Button>
            <Button onClick={handleExportPNG} variant="outline" size="lg" style={{ borderColor: themeColor, color: themeColor }}>
              <Download className="h-4 w-4 mr-2" />
              PNG 저장
            </Button>
            <Button onClick={handleExportPDF} variant="outline" size="lg" style={{ borderColor: themeColor, color: themeColor }}>
              <Download className="h-4 w-4 mr-2" />
              PDF 저장
            </Button>
          </div>
        </div>

        {/* Section 1: 핵심 요약 */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="rounded-2xl shadow-xl">
            <CardHeader>
              <CardTitle>📋 요약</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {bandConfig.summary.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-2" style={{ color: themeColor }}>•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="rounded-2xl shadow-xl">
            <CardHeader>
              <CardTitle>🎯 목표 KPI</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {levelKpis.map((kpi, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">{kpi.name}</span>
                      <span className="text-sm text-gray-500">{kpi.target}</span>
                    </div>
                    <Progress value={0} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Section 2: 플레이 레이더 */}
        <Card className="rounded-2xl shadow-xl mb-8">
          <CardHeader>
            <CardTitle>📊 플레이 레이더</CardTitle>
            <CardDescription>당신의 테니스 능력 프로필</CardDescription>
          </CardHeader>
          <CardContent>
            <NTRPRadarChart data={radarData} color={themeColor} />
          </CardContent>
        </Card>

        {/* Section 3: 강점/약점 & 포커스 */}
        <Card className="rounded-2xl shadow-xl mb-8">
          <CardHeader>
            <CardTitle>💪 강점 & 약점</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="font-bold mb-3 text-green-600">강점</h3>
                <div className="flex flex-wrap gap-2">
                  {bandConfig.strengths.map((strength, index) => (
                    <Badge key={index} variant="outline" className="bg-green-50 text-green-700">
                      {strength}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-bold mb-3 text-orange-600">약점</h3>
                <div className="flex flex-wrap gap-2">
                  {bandConfig.weaknesses.map((weakness, index) => (
                    <Badge key={index} variant="outline" className="bg-orange-50 text-orange-700">
                      {weakness}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            <Separator className="my-4" />
            <div>
              <h3 className="font-bold mb-3">이번 달 집중 포인트</h3>
              <div className="flex flex-wrap gap-2">
                {bandConfig.focus.map((item, index) => (
                  <Badge key={index} style={{ backgroundColor: themeColor, color: "white" }}>
                    {item}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 4: 추천 드릴 */}
        {levelDrills.length > 0 && (
          <Card className="rounded-2xl shadow-xl mb-8">
            <CardHeader>
              <CardTitle>🏋️ 추천 드릴</CardTitle>
              <CardDescription>레벨별 맞춤 훈련 프로그램</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {levelDrills.slice(0, 6).map((drill, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <h4 className="font-bold mb-2">{drill.name}</h4>
                    <p className="text-sm text-gray-600 mb-1">목표: {drill.goal}</p>
                    <p className="text-sm text-gray-500">시간: {drill.duration}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Section 5: 4주 마이크로사이클 */}
        {levelWeeklyPlan.length > 0 && (
          <Card className="rounded-2xl shadow-xl mb-8">
            <CardHeader>
              <CardTitle>📅 4주 마이크로사이클</CardTitle>
              <CardDescription>단계별 훈련 계획</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {levelWeeklyPlan.map((week, index) => (
                  <div key={index} className="border-l-4 pl-4" style={{ borderColor: themeColor }}>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge style={{ backgroundColor: themeColor, color: "white" }}>
                        {week.week}주차
                      </Badge>
                      <span className="font-bold">{week.focus}</span>
                    </div>
                    <ul className="space-y-1">
                      {week.micro.map((item, idx) => (
                        <li key={idx} className="text-sm text-gray-600">• {item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Section 6: 더블스 전술 */}
        {levelDoubles && (
          <Card className="rounded-2xl shadow-xl mb-8">
            <CardHeader>
              <CardTitle>🤝 더블스 전술</CardTitle>
              <CardDescription>파트너와 함께하는 전략</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <Badge variant="outline" className="mb-4" style={{ borderColor: themeColor, color: themeColor }}>
                  역할: {levelDoubles.role}
                </Badge>
              </div>
              <ul className="space-y-2">
                {levelDoubles.patterns.map((pattern, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-2" style={{ color: themeColor }}>•</span>
                    <span>{pattern}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  💡 <strong>팁:</strong> 의사소통 시그널과 손짓을 미리 정해두면 더 효과적입니다.
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Section 7: 장비/세팅 가이드 */}
        {levelEquipment && (
          <Card className="rounded-2xl shadow-xl mb-8">
            <CardHeader>
              <CardTitle>🎾 장비/세팅 가이드</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <span className="font-semibold">프레임: </span>
                  <span>{levelEquipment.frame}</span>
                </div>
                <div>
                  <span className="font-semibold">스트링: </span>
                  <span>{levelEquipment.string}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">텐션: </span>
                  <span>{levelEquipment.tension}</span>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={async () => {
                      await navigator.clipboard.writeText(levelEquipment.tension)
                      toast({
                        title: "텐션 복사됨",
                        description: levelEquipment.tension,
                      })
                    }}
                  >
                    <Copy className="h-3 w-3 mr-1" />
                    복사
                  </Button>
                </div>
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-700">{levelEquipment.note}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Section 8: 부상 리스크 & 예방 */}
        {levelInjuryRisks.length > 0 && (
          <Card className="rounded-2xl shadow-xl mb-8">
            <CardHeader>
              <CardTitle>⚠️ 부상 리스크 & 예방</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {levelInjuryRisks.map((risk, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <h4 className="font-bold text-orange-600 mb-2">{risk.risk}</h4>
                    <p className="text-sm text-gray-600">{risk.tip}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Section 9: 자주 발생하는 실수 & 해결 */}
        {levelMistakes.length > 0 && (
          <Card className="rounded-2xl shadow-xl mb-8">
            <CardHeader>
              <CardTitle>❌ 자주 발생하는 실수 & 해결</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {levelMistakes.map((mistake, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <h4 className="font-bold text-red-600 mb-2">문제: {mistake.issue}</h4>
                    <p className="text-sm text-gray-600">해결: {mistake.fix}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Section 10: 비교/공유 */}
        <Card className="rounded-2xl shadow-xl mb-8">
          <CardHeader>
            <CardTitle>📤 결과 공유하기</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <div ref={cardRef}>
                <NTRPResultCard
                  level={levelObj.level}
                  title={bandConfig.title}
                  slogan={persona.slogan}
                  color={bandConfig.color}
                  personaTheme={persona.theme}
                />
              </div>
            </div>
            <ShareButtons
              testId="ntrp-test"
              testPath="/tests/ntrp-test/test"
              resultType={levelObj.level}
              resultId={resultId}
              title={`NTRP ${levelObj.level} - ${bandConfig.title}`}
              description={persona.slogan}
            />
          </CardContent>
        </Card>

        {/* Footer CTA */}
        <div className="text-center space-y-4 pb-8">
          <Button
            onClick={() => router.push(`/tests/ntrp-test/test`)}
            size="lg"
            className="mr-4"
            style={{ backgroundColor: themeColor, color: "white" }}
          >
            다시 테스트하기
          </Button>
          <Button onClick={() => router.push("/tests")} size="lg" variant="outline">
            다른 테스트하기
          </Button>
        </div>
      </div>
    </div>
  )
}
