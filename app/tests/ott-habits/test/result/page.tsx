"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RotateCcw, Play, Sparkles } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Suspense, useEffect, useState } from "react"
import { ShareButtons } from "@/components/share-buttons"
import { getTestResult } from "@/lib/api-client"

const ottTypes = {
  ENFP: {
    label: "분위기 전파형",
    summary: "재미를 발견하고 나누는 탐험가",
    traits: ["즉흥 재생", "추천 공유 활발", "감정 반응 풍부"],
    reco: ["혁신적 판타지", "하이 콘셉트 코미디", "다큐 드라마"],
    tips: ["기본 스포 규칙 합의", "정주행 슬롯 확보", "기록 최소 포맷"],
    buddy: "ISTJ, INTJ",
    emoji: "⚡",
  },
  INFP: {
    label: "몰입 감성형",
    summary: "캐릭터와 세계관에 깊이 이입",
    traits: ["감정선 집중", "여운을 오래 품음", "혼자 보는 시간 선호"],
    reco: ["휴먼 드라마", "청춘 성장물", "음악 다큐"],
    tips: ["시청 목표 가벼운 설정", "스포 가드 문장 준비", "감상 메모 한 줄"],
    buddy: "ENTJ, ESTJ",
    emoji: "🌙",
  },
  ENFJ: {
    label: "큐레이터 리더형",
    summary: "상대 취향에 맞춰 코스 설계",
    traits: ["같이 보기 주도", "토론 유도", "리액션 세팅"],
    reco: ["관계극", "미식·여행 리얼리티", "토론거리 SF"],
    tips: ["과한 일정 금지", "본인 취향도 반영", "휴식 타임 확보"],
    buddy: "INTP, ISTP",
    emoji: "🤝",
  },
  INFJ: {
    label: "의미 탐구형",
    summary: "작품의 메시지와 상징을 해석",
    traits: ["분석적 감상", "조용한 집중", "메모 습관"],
    reco: ["아트시네마", "철학 다큐", "미니시리즈"],
    tips: ["가벼운 작품 병행", "즉흥 제안 수용 범위", "감상 공유 주기"],
    buddy: "ENFP, ESFP",
    emoji: "📖",
  },
  ENTP: {
    label: "아이디어 스파크형",
    summary: "새 포맷을 실험하고 토론",
    traits: ["트렌드 민감", "밈·유머 활용", "지적 농담"],
    reco: ["메타 코미디", "크리에이티브 리얼리티", "테크 다큐"],
    tips: ["감정 확인 질문 추가", "결말 스포 주의", "완결까지 버킷 관리"],
    buddy: "ISFJ, ISTJ",
    emoji: "💡",
  },
  INTP: {
    label: "논리 탐색형",
    summary: "설정·디테일을 파고드는 분석가",
    traits: ["버그 탐지", "설정 검증", "정보 조사"],
    reco: ["SF 미스터리", "범죄 수사물", "과학 다큐"],
    tips: ["감정 피드백 한 줄", "공동시청 속도 합의", "완결·미완 구분"],
    buddy: "ENFJ, ESFJ",
    emoji: "🔬",
  },
  ENTJ: {
    label: "전략 최적화형",
    summary: "시간·품질을 관리하는 결정가",
    traits: ["워치리스트 체계", "중도 하차 과감", "평점 기준 확실"],
    reco: ["프리미엄 드라마", "하이퀄 다큐", "완결 시리즈"],
    tips: ["가벼운 즉흥도 허용", "파트너 취향 창구", "감사 표현 루틴"],
    buddy: "ISFP, INFP",
    emoji: "🎯",
  },
  INTJ: {
    label: "설계 몰입형",
    summary: "장기 세계관을 정밀 감상",
    traits: ["장르 집중", "회차 배분", "스포 차단"],
    reco: ["대하 판타지", "정치 스릴러", "하드 SF"],
    tips: ["라이트 콘텐츠 섞기", "대화 라운드 지정", "서프라이즈 수용 범위"],
    buddy: "ESFP, ENFP",
    emoji: "📐",
  },
  ESFJ: {
    label: "분위기 매니저형",
    summary: "함께 보는 재미를 극대화",
    traits: ["단톡 추천", "리액션 풍부", "기념일 시청 이벤트"],
    reco: ["로맨스 코미디", "힐링 예능", "패밀리 드라마"],
    tips: ["개인시간 보호", "결정 피로 완화", "요약 공지 한 번에"],
    buddy: "INTP, ISTP",
    emoji: "😊",
  },
  ISFJ: {
    label: "안온 루틴형",
    summary: "편안한 패턴과 익숙함을 선호",
    traits: ["정시 시청", "단골 장르", "세심한 배려"],
    reco: ["클래식 드라마", "의학·법정물", "휴먼 다큐"],
    tips: ["신규 장르 월 1편", "요청은 명확히", "감정도 가끔 먼저"],
    buddy: "ENTP, ENFP",
    emoji: "🧸",
  },
  ESFP: {
    label: "현장 에너지형",
    summary: "순간의 즐거움과 리액션 중심",
    traits: ["밈 공유", "라이브 파티뷰", "신작 발굴"],
    reco: ["버라이어티 예능", "음악·퍼포먼스", "코미디 스페셜"],
    tips: ["핵심 약속 합의", "시간 가드레일", "휴식 창 확보"],
    buddy: "INTJ, INFJ",
    emoji: "🎉",
  },
  ISFP: {
    label: "조용한 다정형",
    summary: "작은 감정선을 소중히 감상",
    traits: ["미장센 감도", "잔잔한 몰입", "1:1 시청 선호"],
    reco: ["인디 영화", "자연 다큐", "감성 드라마"],
    tips: ["요구 명확화 연습", "타임아웃 합의", "감상 단어장"],
    buddy: "ENTJ, ESTJ",
    emoji: "🌿",
  },
  ESTJ: {
    label: "규칙 운영형",
    summary: "명확한 기준과 일정 관리",
    traits: ["시간 엄수", "시즌 관리", "정산·공유 명료"],
    reco: ["실화 범죄", "전쟁·역사", "리얼 비즈"],
    tips: ["공감 문장 먼저", "유연성 창 열기", "피드백 채널 단순화"],
    buddy: "INFP, ISFP",
    emoji: "📋",
  },
  ISTJ: {
    label: "정석 신뢰형",
    summary: "한결같은 선택으로 안정감",
    traits: ["예상 가능한 패턴", "리뷰 신뢰", "중복 시청"],
    reco: ["장수 시리즈", "클래식 영화", "다큐 시리즈"],
    tips: ["즉흥 체험 가끔 수용", "감사 표현 가시화", "기대치 체크인"],
    buddy: "ENFP, ESFP",
    emoji: "📦",
  },
  ESTP: {
    label: "즉응 액션형",
    summary: "결정이 빠르고 실행 지향",
    traits: ["예고편 위주 판단", "중반 지루하면 하차", "트렌드 빠른 편"],
    reco: ["액션 블록버스터", "스포츠 다큐", "리얼 챌린지"],
    tips: ["감정 확인 한 줄", "과속 방지 규칙", "후속 정리"],
    buddy: "INFJ, INTP",
    emoji: "⚡",
  },
  ISTP: {
    label: "실용 절제형",
    summary: "조용하지만 탄탄한 선택",
    traits: ["간결 소통", "유용 정보 선호", "자율 존중"],
    reco: ["공학·생존 다큐", "미스터리 스릴러", "하이라이트 편집"],
    tips: ["감정 표현 빈도 합의", "요약형 피드백", "고정 장르에 변화 한 스푼"],
    buddy: "ESFJ, ENFJ",
    emoji: "🛠",
  },
}

function ResultContent() {
  const searchParams = useSearchParams()
  const mbtiType = (searchParams.get("type") as keyof typeof ottTypes) || "ENFP"
  const resultId = searchParams.get("id") || undefined
  const character = ottTypes[mbtiType]
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
                  className="mb-4 bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
                >
                  {mbtiType}
                </Badge>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">{character.label}</h1>
                <p className="text-xl md:text-2xl text-muted-foreground font-medium">"{character.summary}"</p>
              </div>

              {/* Share Buttons */}
              <div className="flex flex-col items-center space-y-4">
                <ShareButtons
                  testId="ott-habits"
                  testPath="/tests/ott-habits/test"
                  resultType={mbtiType}
                  resultId={loadedResult?.id || resultId}
                  title={`나는 📺 ${character.label}(${mbtiType})! 너는 어떤 OTT 시청러야?`}
                  description={character.summary}
                />
                <Button variant="outline" size="lg" asChild>
                  <Link href="/tests/ott-habits/test">
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
              <Play className="h-6 w-6 text-purple-500" />
              <span>시청 특징</span>
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

        {/* Recommended Content Section */}
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Sparkles className="h-6 w-6 text-indigo-500" />
              <span>추천 컨텐츠</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {character.reco.map((content, index) => (
                <div
                  key={index}
                  className="p-4 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-950 dark:to-indigo-950 rounded-lg text-center"
                >
                  <div className="text-2xl mb-2">📺</div>
                  <p className="font-medium">{content}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Tips Section */}
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Play className="h-6 w-6 text-purple-500" />
              <span>시청 팁</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {character.tips.map((tip, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <Badge variant="secondary" className="mt-1 bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
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
              <Play className="h-6 w-6 text-indigo-500" />
              <span>잘 맞는 공동시청 파트너</span>
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
                  slug: "movie-theater-style",
                  title: "영화관 관람 스타일",
                  description: "영화관에서 드러나는 성향",
                  emoji: "🎬",
                  participants: "0",
                },
                {
                  slug: "phone-usage",
                  title: "스마트폰 사용 습관",
                  description: "스마트폰 사용 습관으로 보는 성향",
                  emoji: "📱",
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
                  slug: "music-taste",
                  title: "음악 취향 테스트",
                  description: "음악 취향으로 보는 성향",
                  emoji: "🎧",
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
              className="border-2 border-purple-300 hover:bg-purple-50 font-medium py-6 px-8 bg-transparent"
            >
              다른 테스트하기
            </Button>
          </Link>
        </div>
      </main>
    </div>
  )
}

export default function OTTHabitsResult() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F7FAFC] flex items-center justify-center">로딩 중...</div>}>
      <ResultContent />
    </Suspense>
  )
}

