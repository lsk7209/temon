"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RotateCcw, UtensilsCrossed, Sparkles } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Suspense, useEffect, useState } from "react"
import { ShareButtons } from "@/components/share-buttons"
import { getTestResult } from "@/lib/api-client"

const lunchTypes = {
  ENFP: {
    label: "분위기 탐험가",
    summary: "새 식당·새 조합을 즐기며 팀의 에너지를 끌어올린다",
    traits: ["신규 탐색 선호", "팀밥 선호", "즉흥 제안"],
    tips: ["예산 상한 설정", "대기 허용 시간 정하기", "고정 메뉴 1개 확보"],
    match: "ISFJ와 균형, ISTJ와는 기준 합의가 필요",
    emoji: "🔍",
  },
  INFP: {
    label: "감성 테이스터",
    summary: "그날의 기분과 이야기로 메뉴를 고른다",
    traits: ["혼밥 수용", "분위기 중시", "한정 메뉴 선호"],
    tips: ["시간 타이머 사용", "재구매 기준 문장화", "실험은 반반 전략"],
    match: "ENFJ와 상보, ESTJ와는 규칙 공유",
    emoji: "🌙",
  },
  ENFJ: {
    label: "케어 플래너",
    summary: "모두의 취향을 듣고 공평하게 조율한다",
    traits: ["의견 수렴", "투표 진행", "분배 깔끔"],
    tips: ["본인 취향 1개 고정", "예산·시간 공지", "의견 마감시각 설정"],
    match: "INTP와 상보, ISTP와는 역할 분담",
    emoji: "🤝",
  },
  INFJ: {
    label: "의미 큐레이터",
    summary: "브랜드 스토리와 일관된 품질을 선호한다",
    traits: ["사전 조사", "루틴 유지", "리스크 관리"],
    tips: ["즉흥 슬롯 1개 허용", "결정 지연 최소화", "후기 기록"],
    match: "ENFP와 시너지, ESTP와는 시간 합의",
    emoji: "📖",
  },
  ENTP: {
    label: "실험 조합가",
    summary: "소스·사이드·메인 조합을 테스트한다",
    traits: ["비교 시식", "유연한 기준", "후기 공유"],
    tips: ["동시 실험 2개 이하", "비용 상한", "피드백 간단 기록"],
    match: "ISFJ와 보완, ISTJ와는 기준 확정",
    emoji: "🧪",
  },
  INTP: {
    label: "분석 의사결정가",
    summary: "가격·칼로리·대기시간을 수치로 본다",
    traits: ["링크 저장", "재구매 기준 명확", "개선 제안"],
    tips: ["결론을 먼저 말하기", "현장 변수 반영", "톤 소프트닝 한 줄"],
    match: "ENFJ와 상보, ESFJ와는 톤 조율",
    emoji: "🔬",
  },
  ENTJ: {
    label: "드라이브 리더",
    summary: "시간·예산·동선을 최적화해 결정한다",
    traits: ["담당 배정", "대기 컷라인", "불필요 절차 제거"],
    tips: ["공감 문장 추가", "실험 슬롯 1개", "합의 로그 남기기"],
    match: "ISFP와 보완, INFP와는 프레임 제시",
    emoji: "🎯",
  },
  INTJ: {
    label: "전략 설계자",
    summary: "품질·거리·혼잡도를 시스템으로 관리",
    traits: ["화이트리스트", "리스크 최소", "리뷰 아카이브"],
    tips: ["즉흥 제안 접수창구", "예외 처리안 준비", "주기적 업데이트"],
    match: "ESFP와 균형, ENFP와는 역할 분담",
    emoji: "📐",
  },
  ESFJ: {
    label: "분위기 메이커",
    summary: "팀밥 경험을 즐겁게 만들고 기록한다",
    traits: ["사진 기록", "공정 분배", "초대 주도"],
    tips: ["요청·기한·담당 표기", "예산 상한 합의", "결정 로그"],
    match: "INTP와 상보, ISTP와는 형식 합의",
    emoji: "😊",
  },
  ISFJ: {
    label: "세심한 기록가",
    summary: "멤버 선호와 반응을 꼼꼼히 기억한다",
    traits: ["안정 선호", "재구매 강점", "배려 깊음"],
    tips: ["신규는 반반 시도", "변경 즉시 공유", "핵심 기준 굵게"],
    match: "ENTP와 보완, ENFP와는 리듬 조정",
    emoji: "🧸",
  },
  ESFP: {
    label: "현장 감각러",
    summary: "현장 분위기와 즉각 만족을 중시한다",
    traits: ["빠른 반응", "재미화", "기록 최소"],
    tips: ["리스크 한 줄", "한도 설정", "과소비 방지 기준"],
    match: "INTJ와 균형, ISTJ와는 규칙 합의",
    emoji: "🎉",
  },
  ISFP: {
    label: "미니멀 미식가",
    summary: "조용히 맛과 식감에 집중한다",
    traits: ["단문 피드백", "숙고형 선택", "정서 고려"],
    tips: ["요점 먼저", "지연 시 알림", "대안 1개 준비"],
    match: "ENTJ와 보완, ESTJ와는 형식 맞춤",
    emoji: "🌿",
  },
  ESTJ: {
    label: "프로세스 운영자",
    summary: "목록화·정리·분배를 깔끔히 처리한다",
    traits: ["규칙 선호", "담당 배정", "명확 요약"],
    tips: ["예외 처리안", "톤 완화", "의견 수렴 타임"],
    match: "INFP와 상보, ENFP와는 룰 명시",
    emoji: "📋",
  },
  ISTJ: {
    label: "정석 수호자",
    summary: "항상 같은 루틴과 포맷을 선호한다",
    traits: ["응답 일정", "템플릿 재사용", "예외에 약함"],
    tips: ["변경 이유 기록", "예외 시나리오 합의", "감사 표현"],
    match: "ENFP와 보완, ESFP와는 규칙 공유",
    emoji: "📦",
  },
  ESTP: {
    label: "즉응 실행가",
    summary: "보이는 대로 고르고 빠르게 움직인다",
    traits: ["짧고 명료", "결정 후 피드백", "세부는 나중"],
    tips: ["리스크·대안 1줄", "합의 로그", "세부는 문서 링크"],
    match: "INFJ와 상보, INTP와는 근거 링크 확보",
    emoji: "⚡",
  },
  ISTP: {
    label: "실용 솔루션러",
    summary: "필요한 말만 남기고 효율로 선택한다",
    traits: ["문의형 반응", "스크린샷 선호", "감정 표현 최소"],
    tips: ["배경 한 줄", "기한 표기", "상대 톤 맞춤"],
    match: "ESFJ와 보완, ENFJ와는 요청 형식 합의",
    emoji: "🛠",
  },
}

function ResultContent() {
  const searchParams = useSearchParams()
  const mbtiType = (searchParams.get("type") as keyof typeof lunchTypes) || "ENFP"
  const resultId = searchParams.get("id") || undefined
  const character = lunchTypes[mbtiType]
  const [loadedResult, setLoadedResult] = useState<{ id: string; testId: string } | null>(null)

  // 결과 ID가 있으면 결과 정보 로드
  useEffect(() => {
    if (resultId) {
      getTestResult(resultId)
        .then((result) => {
          setLoadedResult({ id: result.id, testId: result.testId })
        })
        .catch((error) => {
          console.error("결과 로드 실패:", error)
        })
    }
  }, [resultId])

  return (
    <div className="min-h-screen bg-[#F7FAFC] dark:bg-gray-950">
      {/* Main Result */}
      <main className="container max-w-[720px] mx-auto px-4 py-8">
        {/* Character Card */}
        <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur mb-8">
          <CardContent className="p-8 text-center">
            <div className="space-y-6">
              <div className="text-8xl mb-4">{character.emoji}</div>

              <div>
                <Badge
                  variant="secondary"
                  className="mb-4 bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200"
                >
                  {mbtiType}
                </Badge>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">{character.label}</h1>
                <p className="text-xl md:text-2xl text-muted-foreground font-medium">"{character.summary}"</p>
              </div>

              {/* Share Buttons */}
              <div className="flex flex-col items-center space-y-4">
                <ShareButtons
                  testId="lunch-decider"
                  testPath="/tests/lunch-decider/test"
                  resultType={mbtiType}
                  resultId={loadedResult?.id || resultId}
                  title={`나는 🍱 ${character.label}(${mbtiType})! 너는 어떤 점심러야?`}
                  description={character.summary}
                />
                <Button variant="outline" size="lg" asChild>
                  <Link href="/tests/lunch-decider/test">
                    <RotateCcw className="h-5 w-5 mr-2" />
                    다시 테스트
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Traits */}
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur mb-8">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center space-x-2">
              <span>🍱</span>
              <span>당신의 의사결정 특징</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {character.traits.map((trait, index) => (
                <div
                  key={index}
                  className="p-4 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950 dark:to-orange-950 rounded-lg"
                >
                  <p className="font-medium text-center">{trait}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Tips */}
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur mb-8">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center space-x-2">
              <span>💡</span>
              <span>추천 팁</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-3">
              {character.tips.map((tip, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <span className="text-amber-500 font-bold">{index + 1}.</span>
                  <p className="text-lg leading-relaxed text-muted-foreground flex-1">{tip}</p>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Match */}
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur mb-8">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center space-x-2">
              <span>❤️</span>
              <span>잘 맞는 파트너</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg leading-relaxed text-muted-foreground">{character.match}</p>
          </CardContent>
        </Card>

        {/* Other Tests */}
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center space-x-2">
              <Sparkles className="h-6 w-6 text-orange-500" />
              <span>다른 재미있는 테스트도 해보세요!</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  slug: "food-delivery",
                  title: "배달 음식 선택",
                  emoji: "🍕",
                  description: "배달 습관으로 알아보는 성격",
                  participants: "0",
                },
                {
                  slug: "convenience-snack",
                  title: "편의점 간식 루틴",
                  emoji: "🏪",
                  description: "편의점 간식 선택으로 알아보는 성격",
                  participants: "0",
                },
                {
                  slug: "cafe-style",
                  title: "카페 스타일",
                  emoji: "☕",
                  description: "카페 취향으로 알아보는 성격",
                  participants: "0",
                },
                {
                  slug: "dessert-style",
                  title: "디저트 취향",
                  emoji: "🍰",
                  description: "디저트 선택으로 알아보는 성격",
                  participants: "0",
                },
              ].map((test) => (
                <Card key={test.slug} className="group hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-3">{test.emoji}</div>
                    <h3 className="font-bold mb-2">{test.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{test.description}</p>
                    <p className="text-xs text-muted-foreground mb-4">{test.participants}명 참여</p>
                    <Button size="sm" variant="outline" asChild>
                      <Link href={`/tests/${test.slug}`}>테스트 하기</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 다른 테스트하기 버튼 */}
        <div className="mt-8 text-center">
          <Link href="/tests">
            <Button
              variant="outline"
              className="border-2 border-amber-300 hover:bg-amber-50 font-medium py-6 px-8 bg-transparent"
            >
              다른 테스트하기
            </Button>
          </Link>
        </div>
      </main>
    </div>
  )
}

export default function LunchDeciderResult() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResultContent />
    </Suspense>
  )
}

