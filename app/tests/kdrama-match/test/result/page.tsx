"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RotateCcw, Clapperboard, Sparkles } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Suspense, useEffect, useState } from "react"
import { ShareButtons } from "@/components/share-buttons"
import { getTestResult } from "@/lib/api-client"

const kdramaTypes = {
  ENFP: {
    label: "즉흥 로맨티스트",
    summary: "순간의 가능성을 연결해 이야기의 불씨를 만든다",
    traits: ["새로운 인연에 개방적", "위기에도 유연", "분위기 메이커"],
    scenes: ["뜻밖의 동맹 제안", "거리 퍼레이드 추격", "고백 직전 변수 역전"],
    buddy: "ISTJ, INTJ",
    tips: ["핵심 목표를 한 줄로 고정", "과한 분기점은 세 개 이하", "동료의 리스크 체크 수용"],
    emoji: "⚡",
  },
  INFP: {
    label: "내면 서사형",
    summary: "조용한 신념으로 관계의 깊이를 만든다",
    traits: ["가치 지향", "섬세한 공감", "느린 결심"],
    scenes: ["비밀 일기 공개", "상처 공유로 신뢰 회복", "약속을 지키는 결말"],
    buddy: "ENTJ, ESTJ",
    tips: ["결정 기한 명시", "체크리스트 간소화", "감정 소모 구간 휴식"],
    emoji: "🌙",
  },
  ENFJ: {
    label: "관계 조율자",
    summary: "팀을 하나로 묶어 클라이맥스를 견인",
    traits: ["조율 능력", "갈등 완충", "분배 감각"],
    scenes: ["합동 작전 브리핑", "오해 해소 회의", "엔딩 파티 주관"],
    buddy: "INTP, ISTP",
    tips: ["개인 목표도 챙기기", "지시와 부탁 구분", "피드백은 묶음 전달"],
    emoji: "🤝",
  },
  INFJ: {
    label: "운명 설계자",
    summary: "상징과 패턴 속에서 큰 그림을 완성",
    traits: ["장기 플랜", "메타 시각", "조용한 추진"],
    scenes: ["복선 회수 챕터", "예견된 만남 성사", "대의와 신념의 선택"],
    buddy: "ENFP, ESFP",
    tips: ["즉흥 변수 허용치 설정", "우선순위 3개로 축소", "결정 피로 신호 체크"],
    emoji: "📖",
  },
  ENTP: {
    label: "설정 파괴자",
    summary: "공식을 깨며 전개를 재정의",
    traits: ["반전 설계", "토론 즐김", "신상 아이디어"],
    scenes: ["악역과의 공조", "규칙 뒤집기", "기발한 미끼 작전"],
    buddy: "ISFJ, ISTJ",
    tips: ["핵심 규칙은 합의", "실행 담당과 페어", "마감 시한 엄수"],
    emoji: "💡",
  },
  INTP: {
    label: "논리 탐정",
    summary: "정교한 추론으로 진실에 접근",
    traits: ["증거 선호", "가설 검증", "차분한 분석"],
    scenes: ["타임라인 재구성", "거짓말 탐지 추론", "빈틈 메우는 연쇄 증명"],
    buddy: "ENFJ, ESFJ",
    tips: ["결론 요약 먼저", "데이터 3개만 핵심화", "커뮤니케이션 주기를 정함"],
    emoji: "🔬",
  },
  ENTJ: {
    label: "전략 프로듀서",
    summary: "자원과 사람을 배치해 승부를 만든다",
    traits: ["결단 빠름", "책임감", "성과 지향"],
    scenes: ["작전 타임라인 지휘", "위기 수습 총괄", "엔딩 계약 성사"],
    buddy: "ISFP, INFP",
    tips: ["감정 확인 라운드 도입", "리스크 테이블 공유", "승리 후 휴식 설계"],
    emoji: "🎯",
  },
  INTJ: {
    label: "마스터 플래너",
    summary: "정밀한 설계로 완성도를 끌어올림",
    traits: ["루트 고정", "디테일 집착", "조용한 리더십"],
    scenes: ["맵핑보드 완성", "대역전 엔드게임", "복선 한 번에 회수"],
    buddy: "ESFP, ENFP",
    tips: ["실험 구간을 작게 확보", "공유 타이밍 미리 공지", "서프라이즈 허용폭 지정"],
    emoji: "📐",
  },
  ESFJ: {
    label: "공감 리더",
    summary: "현장을 따뜻하게 묶어 성과로 연결",
    traits: ["케어 능력", "소통 빈번", "조직력"],
    scenes: ["갈등 중재식", "축하 이벤트", "팀 사기 회복"],
    buddy: "INTP, ISTP",
    tips: ["개인 시간 보호", "피드백 묶음 처리", "역할 분담 명확화"],
    emoji: "😊",
  },
  ISFJ: {
    label: "따뜻한 수호자",
    summary: "익숙함과 성실함으로 신뢰를 쌓음",
    traits: ["규칙 준수", "디테일 배려", "조용한 헌신"],
    scenes: ["증거 보관 완벽", "약속 시간 사수", "위기에서 뒤를 지킴"],
    buddy: "ENTP, ENFP",
    tips: ["소량 실험 허용", "요청은 명확히", "감정 표현도 먼저"],
    emoji: "🧸",
  },
  ESFP: {
    label: "현장 엔터테이너",
    summary: "순간의 에너지로 흐름을 바꿈",
    traits: ["즉흥력", "현장감각", "밈 생산"],
    scenes: ["위기 속 기지", "군중 설득", "한 방의 역전"],
    buddy: "INTJ, INFJ",
    tips: ["핵심 규칙 합의", "과속 방지 장치", "후속 정리 담당 지정"],
    emoji: "🎉",
  },
  ISFP: {
    label: "섬세한 감성러",
    summary: "작은 디테일에서 의미를 발견",
    traits: ["미장센 선호", "과묵한 다정함", "부담 없는 선택"],
    scenes: ["조용한 위로", "소품으로 전하는 신호", "비밀스런 선물"],
    buddy: "ENTJ, ESTJ",
    tips: ["요구를 명확히 말하기", "결정 타임아웃", "선호 공유 보드"],
    emoji: "🌿",
  },
  ESTJ: {
    label: "원칙주의 팀장",
    summary: "명확한 기준과 일정으로 추진",
    traits: ["시간 엄수", "정산 깔끔", "리스크 관리"],
    scenes: ["현장 통제", "규정 재정비", "계약 조건 최적화"],
    buddy: "INFP, ISFP",
    tips: ["공감 문장 먼저", "유연성 창 열기", "성과 공유는 팀 단위"],
    emoji: "📋",
  },
  ISTJ: {
    label: "정석 행정관",
    summary: "한결같은 신뢰로 판을 지탱",
    traits: ["패턴 유지", "리뷰 신뢰", "중복 검증"],
    scenes: ["체크리스트 완수", "백업 플랜 가동", "기록으로 구해내기"],
    buddy: "ENFP, ESFP",
    tips: ["즉흥 체험 가끔 수용", "감사 표현 가시화", "기대치 체크인"],
    emoji: "📦",
  },
  ESTP: {
    label: "액션 해결사",
    summary: "빠른 판단과 실행으로 사건을 돌파",
    traits: ["몸이 먼저", "위기 대처", "트렌드 민감"],
    scenes: ["추격전 선봉", "현장 교섭", "기물 활용 전개"],
    buddy: "INFJ, INTP",
    tips: ["감정 확인 한 줄", "과감하되 관성 주의", "후속 기록 담당"],
    emoji: "⚡",
  },
  ISTP: {
    label: "무심한 해결사",
    summary: "간결한 선택으로 실리를 챙김",
    traits: ["간단 주문", "유용 정보 선호", "자율 존중"],
    scenes: ["핵심만 건지는 잠입", "필요 장비만 챙김", "한 방에 끝내기"],
    buddy: "ESFJ, ENFJ",
    tips: ["감정 표현 합의", "요약 피드백", "고정 루틴에 변화 한 스푼"],
    emoji: "🛠",
  },
}

function ResultContent() {
  const searchParams = useSearchParams()
  const mbtiType = (searchParams.get("type") as keyof typeof kdramaTypes) || "ENFP"
  const resultId = searchParams.get("id") || undefined
  const character = kdramaTypes[mbtiType]
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
                  testId="kdrama-match"
                  testPath="/tests/kdrama-match/test"
                  resultType={mbtiType}
                  resultId={loadedResult?.id || resultId}
                  title={`나는 🎬 ${character.label}(${mbtiType})! 너는 어떤 드라마 캐릭터야?`}
                  description={character.summary}
                />
                <Button variant="outline" size="lg" asChild>
                  <Link href="/tests/kdrama-match/test">
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
              <Clapperboard className="h-6 w-6 text-pink-500" />
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

        {/* Scenes Section */}
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Sparkles className="h-6 w-6 text-purple-500" />
              <span>대표 장면</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {character.scenes.map((scene, index) => (
                <div
                  key={index}
                  className="p-4 bg-gradient-to-br from-pink-50 to-purple-50 dark:from-pink-950 dark:to-purple-950 rounded-lg text-center"
                >
                  <div className="text-2xl mb-2">🎬</div>
                  <p className="font-medium">{scene}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Buddy Section */}
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clapperboard className="h-6 w-6 text-pink-500" />
              <span>케미가 좋은 캐릭터</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl font-semibold text-center">{character.buddy}</p>
          </CardContent>
        </Card>

        {/* Tips Section */}
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clapperboard className="h-6 w-6 text-purple-500" />
              <span>전략 팁</span>
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
                  slug: "music-taste",
                  title: "음악 취향",
                  description: "음악 취향으로 보는 성향",
                  emoji: "🎧",
                  participants: "0",
                },
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

export default function KdramaMatchResult() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F7FAFC] flex items-center justify-center">로딩 중...</div>}>
      <ResultContent />
    </Suspense>
  )
}

