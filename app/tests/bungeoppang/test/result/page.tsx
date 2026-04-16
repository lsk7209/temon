"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RotateCcw, Fish, Sparkles } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Suspense, useEffect, useState } from "react"
import { ShareButtons } from "@/components/share-buttons"
import { getTestResult } from "@/lib/api-client"

const bungeoppangTypes = {
  ENFP: {
    label: "분위기 전파형",
    summary: "즉흥과 공유로 맛의 재미를 키운다",
    traits: ["새로운 맛 탐색", "사진·후기 공유", "나눔 제안 잦음"],
    reco: ["치즈 크리스피", "반반 믹스", "계절 한정"],
    tips: ["수량 상한 정하기", "대기시간 알림", "핵심 맛 기록"],
    buddy: "ISTJ, INTJ",
    emoji: "⚡",
  },
  INFP: {
    label: "감성 몰입형",
    summary: "작은 행복을 조용히 음미",
    traits: ["한두 개로 충분", "선호 맛 고정", "여운을 즐김"],
    reco: ["고구마 소프트", "팥 라이트", "버터 한 점"],
    tips: ["새 맛 월 1회", "온도 맞춰 휴지", "감상 한 줄 메모"],
    buddy: "ENTJ, ESTJ",
    emoji: "🌙",
  },
  ENFJ: {
    label: "케어 큐레이터형",
    summary: "함께 먹는 사람 중심으로 선택",
    traits: ["취향 물어봄", "공유 수량 넉넉", "분배 깔끔"],
    reco: ["세트 구성", "달단짠 조합", "알레르기 고려"],
    tips: ["본인 취향도 반영", "선결제 과부하 주의", "휴지·물티슈 챙김"],
    buddy: "INTP, ISTP",
    emoji: "🤝",
  },
  INFJ: {
    label: "의미 탐구형",
    summary: "전통과 변주의 균형을 고민",
    traits: ["재료 출처 관심", "먹는 순서 고정", "조용한 몰입"],
    reco: ["전통 팥 바삭", "흑임자 변주", "작은 사이즈 세트"],
    tips: ["즉흥 시도 허용 범위 정하기", "맛 노트 템플릿", "대기 피크 회피"],
    buddy: "ENFP, ESFP",
    emoji: "📖",
  },
  ENTP: {
    label: "실험 도전자형",
    summary: "새 포맷을 즐기며 토론",
    traits: ["한정 메뉴 최애", "밈·리뷰 생산", "비교 시식"],
    reco: ["치즈+할라피뇨", "크로와상 붕어빵", "디핑 소스 세트"],
    tips: ["핵심 기준 2개만", "동행의 취향 존중", "과한 줄 서기 제한"],
    buddy: "ISFJ, ISTJ",
    emoji: "💡",
  },
  INTP: {
    label: "논리 탐색형",
    summary: "굽기·속비율을 분석",
    traits: ["가성비 계산", "대기시간 예측", "리뷰 데이터화"],
    reco: ["표준 팥 3개", "단짠 밸런스", "굽기 강 약 비교"],
    tips: ["감정 피드백 한 줄", "충동구매 캡", "데이터 공유 간결화"],
    buddy: "ENFJ, ESFJ",
    emoji: "🔬",
  },
  ENTJ: {
    label: "전략 최적화형",
    summary: "시간·품질·동선을 통제",
    traits: ["사전 조사", "하차 기준 명확", "세트 효율 추구"],
    reco: ["프리미엄 세트", "대용량 박스", "완성도 높은 팥"],
    tips: ["가벼운 즉흥 허용", "동행 의견 수렴", "칭찬 루틴 유지"],
    buddy: "ISFP, INFP",
    emoji: "🎯",
  },
  INTJ: {
    label: "설계 몰입형",
    summary: "선호 세계관을 정밀하게 축적",
    traits: ["단골 고정", "정해진 루트", "스포일러 차단처럼 조용"],
    reco: ["바삭 강한 팥", "고소 버터 조합", "정량 세트"],
    tips: ["라이트 변주 월 1회", "공유 타이밍 지정", "서프라이즈 허용 폭 설정"],
    buddy: "ESFP, ENFP",
    emoji: "📐",
  },
  ESFJ: {
    label: "분위기 매니저형",
    summary: "함께 먹기 좋은 순간을 만든다",
    traits: ["인원 수 맞춤", "리액션 풍부", "사진 남김"],
    reco: ["하트 모양 변형", "달단짠 세트", "음료 페어링"],
    tips: ["개인시간 보호", "선택 피로 줄이기", "요약 공지 한 번에"],
    buddy: "INTP, ISTP",
    emoji: "😊",
  },
  ISFJ: {
    label: "안온 루틴형",
    summary: "익숙함으로 안정감을 찾는다",
    traits: ["정해진 가게", "시간대 고정", "섬세한 배려"],
    reco: ["전통 팥 2개", "슈크림 1개", "따뜻한 음료"],
    tips: ["신메뉴 소량 체험", "요청은 명확히", "감정도 먼저 표현"],
    buddy: "ENTP, ENFP",
    emoji: "🧸",
  },
  ESFP: {
    label: "현장 에너지형",
    summary: "순간의 즐거움과 리액션 중심",
    traits: ["향 맡고 구매", "밈 공유", "친구 태그"],
    reco: ["치즈 폭발", "초코 디핑", "한입 사이즈 다수"],
    tips: ["핵심 규칙 합의", "과속구매 주의", "휴식 창 확보"],
    buddy: "INTJ, INFJ",
    emoji: "🎉",
  },
  ISFP: {
    label: "조용한 다정형",
    summary: "작은 감각을 섬세하게 즐김",
    traits: ["부담 없는 수량", "미장센 선호", "1:1 공유"],
    reco: ["고구마 소프트", "슈 라이트", "버터 미세 추가"],
    tips: ["요구 명확화", "타임아웃 합의", "감상 단어장"],
    buddy: "ENTJ, ESTJ",
    emoji: "🌿",
  },
  ESTJ: {
    label: "규칙 운영형",
    summary: "명확한 기준과 일정 관리",
    traits: ["시간 엄수", "대기 최적화", "정산 명료"],
    reco: ["세트 규격", "대기 짧은 가게", "표준 맛 위주"],
    tips: ["공감 문장 먼저", "유연성 창 열기", "피드백 단순화"],
    buddy: "INFP, ISFP",
    emoji: "📋",
  },
  ISTJ: {
    label: "정석 신뢰형",
    summary: "한결같은 선택으로 안정감",
    traits: ["패턴 유지", "리뷰 신뢰", "중복 시식 허용"],
    reco: ["전통 팥 고정", "바삭도 일정", "합리 세트"],
    tips: ["즉흥 체험 가끔 수용", "감사 표현 가시화", "기대치 체크인"],
    buddy: "ENFP, ESFP",
    emoji: "📦",
  },
  ESTP: {
    label: "즉응 액션형",
    summary: "빠르게 결정하고 실행",
    traits: ["예고편 같은 맛 테스트", "지루하면 중단", "트렌드 민감"],
    reco: ["매운 달콤 변주", "치즈 추가", "한입 5개"],
    tips: ["감정 확인 한 줄", "과속 방지 규칙", "후속 정리"],
    buddy: "INFJ, INTP",
    emoji: "⚡",
  },
  ISTP: {
    label: "실용 절제형",
    summary: "간결하지만 탄탄한 선택",
    traits: ["간단 주문", "유용 정보 선호", "자율 존중"],
    reco: ["표준 팥 2개", "치즈 1개", "대기 짧은 루트"],
    tips: ["감정 표현 합의", "요약 피드백", "고정 장르에 변화 한 스푼"],
    buddy: "ESFJ, ENFJ",
    emoji: "🛠",
  },
}

function ResultContent() {
  const searchParams = useSearchParams()
  const mbtiType = (searchParams.get("type") as keyof typeof bungeoppangTypes) || "ENFP"
  const resultId = searchParams.get("id") || undefined
  const character = bungeoppangTypes[mbtiType]
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
                  className="mb-4 bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
                >
                  {mbtiType}
                </Badge>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">{character.label}</h1>
                <p className="text-xl md:text-2xl text-muted-foreground font-medium">"{character.summary}"</p>
              </div>

              {/* Share Buttons */}
              <div className="flex flex-col items-center space-y-4">
                <ShareButtons
                  testId="bungeoppang"
                  testPath="/tests/bungeoppang/test"
                  resultType={mbtiType}
                  resultId={loadedResult?.id || resultId}
                  title={`나는 🐟 ${character.label}(${mbtiType})! 너는 어떤 붕어빵러야?`}
                  description={character.summary}
                />
                <Button variant="outline" size="lg" asChild>
                  <Link href="/tests/bungeoppang/test">
                    <RotateCcw className="h-5 w-5 mr-2" />
                    다시 테스트
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Traits Section */}
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Fish className="h-6 w-6 text-orange-500" />
              <span>특징</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {character.traits.map((trait, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <Badge variant="outline" className="mt-1">
                    {index + 1}
                  </Badge>
                  <p className="text-lg flex-1">{trait}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recommended Combos Section */}
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Sparkles className="h-6 w-6 text-red-500" />
              <span>추천 조합</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {character.reco.map((combo, index) => (
                <div
                  key={index}
                  className="p-4 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950 dark:to-red-950 rounded-lg text-center"
                >
                  <div className="text-2xl mb-2">🐟</div>
                  <p className="font-medium">{combo}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Tips Section */}
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Fish className="h-6 w-6 text-orange-500" />
              <span>구매 팁</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {character.tips.map((tip, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <Badge variant="secondary" className="mt-1 bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200">
                    팁 {index + 1}
                  </Badge>
                  <p className="text-lg flex-1">{tip}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Buddy Section */}
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Fish className="h-6 w-6 text-red-500" />
              <span>잘 맞는 먹팟 파트너</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl font-semibold text-center">{character.buddy}</p>
          </CardContent>
        </Card>

        {/* Related Tests */}
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur">
          <CardHeader>
            <CardTitle>다른 테스트도 해보세요</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  slug: "ramen-mbti",
                  title: "라면 취향",
                  description: "라면 취향으로 보는 성향",
                  emoji: "🍜",
                  participants: "0",
                },
                {
                  slug: "dessert-style",
                  title: "디저트 취향",
                  description: "디저트 취향으로 보는 성향",
                  emoji: "🍰",
                  participants: "0",
                },
                {
                  slug: "food-delivery",
                  title: "배달 음식 선택",
                  description: "배달 음식 선택으로 보는 성향",
                  emoji: "🍕",
                  participants: "0",
                },
                {
                  slug: "cafe-style",
                  title: "카페 스타일",
                  description: "카페 스타일로 보는 성향",
                  emoji: "☕",
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

        {/* Retry Button */}
        <div className="mt-8 text-center">
          <Link href="/tests">
            <Button
              variant="outline"
              className="border-2 border-orange-300 hover:bg-orange-50 font-medium py-6 px-8 bg-transparent"
            >
              다른 테스트하기
            </Button>
          </Link>
        </div>
      </main>
    </div>
  )
}

export default function BungeoppangResult() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F7FAFC] flex items-center justify-center">로딩 중...</div>}>
      <ResultContent />
    </Suspense>
  )
}

