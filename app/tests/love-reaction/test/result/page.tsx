"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RotateCcw, Heart, Sparkles } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Suspense, useEffect, useState } from "react"
import { ShareButtons } from "@/components/share-buttons"
import { getTestResult } from "@/lib/api-client"

const loveTypes = {
  ENFP: {
    label: "분위기 메이커형",
    summary: "설렘과 즐거움을 키우는 촉진자",
    traits: ["즉흥 제안 활발", "감정 표현 풍부", "새로운 경험 선호"],
    dates: ["테마 전시", "야간 산책", "플리마켓"],
    tips: ["기본 약속 시간만 합의", "감정 요약 한 줄", "연락 루틴 최소 규칙"],
    match: "ISTJ, INTJ",
    emoji: "⚡",
  },
  INFP: {
    label: "서정 공감형",
    summary: "깊은 정서 교류를 중시",
    traits: ["경청 중심", "기록·편지 선호", "여운을 오래 품음"],
    dates: ["독립서점", "호수 산책", "작은 공연"],
    tips: ["기대치 명시", "스몰토크 훈련", "갈등 시 시간표시 약속"],
    match: "ENTJ, ESTJ",
    emoji: "🌙",
  },
  ENFJ: {
    label: "큐레이션 리더형",
    summary: "상대에 맞춘 체험을 설계",
    traits: ["상대 취향 수집", "분위기 조성", "주도적 배려"],
    dates: ["클래스 체험", "미식 투어", "보드게임"],
    tips: ["본인 욕구도 명시", "일정 과부하 방지", "휴식 슬롯 확보"],
    match: "INTP, ISTP",
    emoji: "🤝",
  },
  INFJ: {
    label: "의미 탐구형",
    summary: "관계의 방향과 가치를 성찰",
    traits: ["깊은 대화", "속도 조절", "상징·의미 중시"],
    dates: ["전시 감상 후 대화", "조용한 카페", "서점 코스"],
    tips: ["요약 메모 공유", "즉흥 제안 수용 창 열기", "갈등 후 회고 포맷"],
    match: "ENFP, ESFP",
    emoji: "📖",
  },
  ENTP: {
    label: "아이디어 스파크형",
    summary: "새로움을 함께 실험",
    traits: ["재치있는 토론", "룰 메이킹", "밈·유머 풍부"],
    dates: ["방탈출", "실험적 식당", "도심 탐험"],
    tips: ["감정 확인 질문 추가", "약속 변경 이력 공유", "끝맺음 문장"],
    match: "ISFJ, ISTJ",
    emoji: "💡",
  },
  INTP: {
    label: "논리 탐색형",
    summary: "편안한 거리감 속 명료한 합의",
    traits: ["문제 해결 지향", "정보 조사", "단도직입"],
    dates: ["사담 산책", "과학관", "다큐 관람"],
    tips: ["감사 표현 루틴", "연락 간격 합의", "감정 요약 피드백"],
    match: "ENFJ, ESFJ",
    emoji: "🔬",
  },
  ENTJ: {
    label: "결정 추진형",
    summary: "목표와 계획으로 안정감 제공",
    traits: ["예약·동선 최적화", "확실한 약속", "갈등 조기 해결"],
    dates: ["미리 예약 미식", "원데이 클래스", "근교 드라이브"],
    tips: ["부드러운 완충 멘트", "상대 페이스 존중", "즉흥 슬롯 배정"],
    match: "ISFP, INFP",
    emoji: "🎯",
  },
  INTJ: {
    label: "전략 설계형",
    summary: "관계를 체계적으로 성장",
    traits: ["장기 그림", "퀄리티 중시", "깊은 몰입 대화"],
    dates: ["전망 좋은 조용한 레스토랑", "아트시네마", "테마 산책"],
    tips: ["감정 피드백 주기", "가벼운 잡담 비율 확보", "서프라이즈 수용 범위 합의"],
    match: "ESFP, ENFP",
    emoji: "📐",
  },
  ESFJ: {
    label: "분위기 매니저형",
    summary: "체온 높은 관계 운영",
    traits: ["기념일 챙김", "리액션 풍부", "네트워킹"],
    dates: ["홈파티", "플라워 클래스", "테마 카페"],
    tips: ["개인시간 보호선", "결정 피로 줄이기", "요약 공지 한 번에"],
    match: "INTP, ISTP",
    emoji: "😊",
  },
  ISFJ: {
    label: "안온 루틴형",
    summary: "꾸준함과 성실함으로 신뢰",
    traits: ["정시 연락", "익숙한 코스", "세심한 배려"],
    dates: ["단골 식당", "산책·카페", "전통 공연"],
    tips: ["신규 경험 월 1회", "요청은 명확히", "감정도 가끔 먼저"],
    match: "ENTP, ENFP",
    emoji: "🧸",
  },
  ESFP: {
    label: "현장 에너지형",
    summary: "순간의 즐거움을 극대화",
    traits: ["생동감 넘치는 데이트", "사진·공유", "리액션 부자"],
    dates: ["페스티벌", "테마파크", "스트리트 푸드"],
    tips: ["핵심 약속 사전 합의", "금액·시간 가드레일", "휴식 창 확보"],
    match: "INTJ, INFJ",
    emoji: "🎉",
  },
  ISFP: {
    label: "조용한 다정형",
    summary: "말보다 행동으로 전하는 애정",
    traits: ["섬세한 선물", "무드 감각", "1:1 집중"],
    dates: ["작은 갤러리", "피크닉", "캔들 만들기"],
    tips: ["요구 명확화 연습", "갈등 시 타임아웃 합의", "감정 단어장"],
    match: "ENTJ, ESTJ",
    emoji: "🌿",
  },
  ESTJ: {
    label: "규칙 운영형",
    summary: "명확한 약속과 실행",
    traits: ["분담·정산 명료", "시간 엄수", "계획 충실"],
    dates: ["예약 레스토랑", "공연·스포츠 관람", "근교 코스"],
    tips: ["공감 문장 먼저", "유연성 창 열기", "피드백 채널 단순화"],
    match: "INFP, ISFP",
    emoji: "📋",
  },
  ISTJ: {
    label: "정석 신뢰형",
    summary: "한결같은 태도로 안정감 제공",
    traits: ["예상 가능한 패턴", "약속 이행", "차분한 돌봄"],
    dates: ["정통 레스토랑", "고즈넉한 산책", "전시 관람"],
    tips: ["즉흥 체험 가끔 수용", "감사 표현 가시화", "기대치 체크인"],
    match: "ENFP, ESFP",
    emoji: "📦",
  },
  ESTP: {
    label: "즉응 액션형",
    summary: "결단력과 추진력으로 이끎",
    traits: ["결정 빠름", "문제 해결", "체험형 데이트"],
    dates: ["익스트림 스포츠 체험", "드라이브", "신상 맛집"],
    tips: ["감정 확인 한 줄", "과속 방지 규칙", "후속 정리"],
    match: "INFJ, INTP",
    emoji: "⚡",
  },
  ISTP: {
    label: "실용 절제형",
    summary: "조용하지만 든든한 실행",
    traits: ["간결 소통", "실용 선택", "자율 존중"],
    dates: ["카메라 산책", "공방 체험", "하이라이트 코스"],
    tips: ["감정 표현 빈도 합의", "요약형 피드백", "고정 메뉴에 변화 한 스푼"],
    match: "ESFJ, ENFJ",
    emoji: "🛠",
  },
}

function ResultContent() {
  const searchParams = useSearchParams()
  const mbtiType = (searchParams.get("type") as keyof typeof loveTypes) || "ENFP"
  const resultId = searchParams.get("id") || undefined
  const character = loveTypes[mbtiType]
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
                  className="mb-4 bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200"
                >
                  {mbtiType}
                </Badge>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">{character.label}</h1>
                <p className="text-xl md:text-2xl text-muted-foreground font-medium">"{character.summary}"</p>
              </div>

              {/* Share Buttons */}
              <div className="flex flex-col items-center space-y-4">
                <ShareButtons
                  testId="love-reaction"
                  testPath="/tests/love-reaction/test"
                  resultType={mbtiType}
                  resultId={loadedResult?.id || resultId}
                  title={`나는 💕 ${character.label}(${mbtiType})! 너는 어떤 연애 스타일이야?`}
                  description={character.summary}
                />
                <Button variant="outline" size="lg" asChild>
                  <Link href="/tests/love-reaction/test">
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
              <Heart className="h-6 w-6 text-pink-500" />
              <span>연애 특징</span>
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

        {/* Recommended Dates Section */}
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Sparkles className="h-6 w-6 text-rose-500" />
              <span>추천 데이트</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {character.dates.map((date, index) => (
                <div
                  key={index}
                  className="p-4 bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-950 dark:to-rose-950 rounded-lg text-center"
                >
                  <div className="text-2xl mb-2">💕</div>
                  <p className="font-medium">{date}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Tips Section */}
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Heart className="h-6 w-6 text-pink-500" />
              <span>관계 팁</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {character.tips.map((tip, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <Badge variant="secondary" className="mt-1 bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200">
                    팁 {index + 1}
                  </Badge>
                  <p className="text-lg flex-1">{tip}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Match Section */}
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Heart className="h-6 w-6 text-rose-500" />
              <span>잘 맞는 궁합</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl font-semibold text-center">{character.match}</p>
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
                  slug: "kakao-reply-style",
                  title: "카톡 답장 스타일",
                  description: "답장 습관으로 보는 소통 성향",
                  emoji: "💬",
                  participants: "0",
                },
                {
                  slug: "evening-routine",
                  title: "퇴근 후 루틴",
                  description: "저녁 시간 습관으로 보는 성향",
                  emoji: "🌙",
                  participants: "0",
                },
                {
                  slug: "shopping-style",
                  title: "쇼핑 스타일",
                  description: "쇼핑 습관으로 보는 성향",
                  emoji: "🛍️",
                  participants: "0",
                },
                {
                  slug: "movie-theater-style",
                  title: "영화관 관람 스타일",
                  description: "영화관에서 드러나는 성향",
                  emoji: "🎬",
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
              className="border-2 border-pink-300 hover:bg-pink-50 font-medium py-6 px-8 bg-transparent"
            >
              다른 테스트하기
            </Button>
          </Link>
        </div>
      </main>
    </div>
  )
}

export default function LoveReactionResult() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F7FAFC] flex items-center justify-center">로딩 중...</div>}>
      <ResultContent />
    </Suspense>
  )
}

