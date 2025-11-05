import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Users, Moon, Sparkles } from "lucide-react"

export const metadata: Metadata = {
  title: "퇴근 후 루틴 테스트 | 저녁 습관으로 알아보는 성격 유형 | 테몬",
  description:
    "12문항으로 퇴근 루틴을 분석해 16가지 성격 유형을 매칭. 운동·집콕·모임·자기계발까지, 당신의 퇴근 패턴은? 퇴근하고 집에 와서 하는 '그 행동들'에 당신의 성격이 숨어있습니다.",
  keywords:
    "퇴근 루틴 테스트, 저녁 루틴, 성격 테스트, 퇴근 후 뭐하지, 야근 후 회복 루틴, 서울 야간 PT, 동네 카페, 홈트, 야시장 산책, 저녁 습관",
  alternates: {
    canonical: "/tests/evening-routine",
  },
  openGraph: {
    title: "퇴근 후 루틴 테스트 | 저녁 습관으로 알아보는 성격 유형",
    description: "12문항으로 퇴근 루틴을 분석해 16가지 성격 유형을 매칭. 운동·집콕·모임·자기계발까지, 당신의 퇴근 패턴은?",
    type: "website",
    url: "https://www.temon.kr/tests/evening-routine",
  },
}

export default function EveningRoutineIntro() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 dark:from-purple-950 dark:via-pink-950 dark:to-indigo-950">
      <main className="container max-w-4xl mx-auto px-4 py-8">
        <div className="text-center space-y-8">
          {/* Animated Evening Elements */}
          <div className="relative mx-auto w-32 h-32 mb-8">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full animate-pulse" />
            <div className="absolute inset-2 bg-gradient-to-br from-purple-200 to-pink-300 rounded-full flex items-center justify-center">
              <span className="text-4xl animate-bounce">🌙</span>
            </div>
            {/* Floating evening elements */}
            <div className="absolute -top-6 -left-6 text-lg animate-bounce" style={{ animationDelay: "0.5s" }}>
              🛋️
            </div>
            <div className="absolute -top-4 -right-8 text-lg animate-bounce" style={{ animationDelay: "1s" }}>
              ☕
            </div>
            <div className="absolute -bottom-6 -left-8 text-lg animate-bounce" style={{ animationDelay: "1.5s" }}>
              🏋️
            </div>
            <div className="absolute -bottom-4 -right-6 text-lg animate-bounce" style={{ animationDelay: "2s" }}>
              📚
            </div>
          </div>

          <div className="space-y-6">
            <Badge variant="secondary" className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
              🌙 NEW 테스트
            </Badge>

            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                퇴근 후 루틴으로 보는
              </span>
              <br />
              <span className="text-foreground">성격 유형 🌙</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              퇴근하고 집에 와서 하는 '그 행동들'에
              <br />
              당신의 성격이 숨어있습니다.
            </p>

            {/* Stats */}
            <div className="flex justify-center items-center space-x-8 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4" />
                <span>Coming Soon</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>3분 소요</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>12문항</span>
              </div>
            </div>

            <div className="space-y-4">
              <Button
                size="lg"
                className="h-16 px-12 text-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg hover:shadow-xl transition-all duration-300"
                asChild
              >
                <Link href="/tests/evening-routine/test">
                  <span className="text-2xl mr-3">🌙</span>
                  테스트 시작하기
                </Link>
              </Button>

              <p className="text-sm text-center text-muted-foreground">
                무료 • 회원가입 불필요 • 16가지 퇴근 루틴 스타일 분석
              </p>
            </div>
          </div>
        </div>

        {/* Test Introduction */}
        <div className="mt-20 space-y-12">
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur">
            <CardContent className="p-8">
              <div className="text-center space-y-6">
                <h2 className="text-2xl font-bold flex items-center justify-center space-x-2">
                  <Moon className="h-6 w-6 text-purple-500" />
                  <span>이런 질문들이 나와요!</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                  <div className="space-y-4">
                    <div className="p-4 bg-purple-50 dark:bg-purple-950 rounded-lg">
                      <p className="font-medium">1. 퇴근 직후 나는?</p>
                      <p className="text-sm text-muted-foreground mt-1">바로 약속 잡아 사람 만난다 vs 집으로 직행, 혼자만의 시간</p>
                    </div>
                    <div className="p-4 bg-pink-50 dark:bg-pink-950 rounded-lg">
                      <p className="font-medium">2. 저녁 식사 선택은?</p>
                      <p className="text-sm text-muted-foreground mt-1">늘 가던 메뉴/가게 vs 새로운 맛집·신상 메뉴 탐색</p>
                    </div>
                    <div className="p-4 bg-indigo-50 dark:bg-indigo-950 rounded-lg">
                      <p className="font-medium">3. 퇴근길 메시지 도착!</p>
                      <p className="text-sm text-muted-foreground mt-1">바로 답장/전화로 해결 vs 집 가서 정리해 답장</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 bg-purple-50 dark:bg-purple-950 rounded-lg">
                      <p className="font-medium">4. 운동 계획 세울 때</p>
                      <p className="text-sm text-muted-foreground mt-1">루틴·기록·측정이 우선 vs 기분·컨디션에 맞춰</p>
                    </div>
                    <div className="p-4 bg-pink-50 dark:bg-pink-950 rounded-lg">
                      <p className="font-medium">5. 집 정리 타이밍은</p>
                      <p className="text-sm text-muted-foreground mt-1">들어오자마자 정리·샤워 vs 좀 쉬다 슬슬 시작</p>
                    </div>
                    <div className="p-4 bg-indigo-50 dark:bg-indigo-950 rounded-lg">
                      <p className="font-medium">6. 하루 회고 방식</p>
                      <p className="text-sm text-muted-foreground mt-1">체크리스트/투두 점검 vs 앞으로의 가능성/아이디어</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 16 Types Section */}
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur">
            <CardContent className="p-8">
              <div className="text-center space-y-6">
                <h2 className="text-2xl font-bold">🌙 16가지 퇴근 루틴 스타일</h2>
                <p className="text-muted-foreground">당신은 어떤 저녁러일까요?</p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { emoji: "🎈", name: "스파크 메이커", type: "ENFP" },
                    { emoji: "🤝", name: "케어 코디네이터", type: "ENFJ" },
                    { emoji: "🎯", name: "미션 플래너", type: "ENTJ" },
                    { emoji: "🧪", name: "아이디어 허슬러", type: "ENTP" },
                    { emoji: "😊", name: "소셜 호스트", type: "ESFJ" },
                    { emoji: "📸", name: "무드 러너", type: "ESFP" },
                    { emoji: "📋", name: "루틴 마스터", type: "ESTJ" },
                    { emoji: "⚡", name: "액션 드리블러", type: "ESTP" },
                  ].map((character) => (
                    <div
                      key={character.type}
                      className="p-3 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 rounded-lg text-center"
                    >
                      <div className="text-2xl mb-1">{character.emoji}</div>
                      <div className="text-xs font-medium">{character.name}</div>
                      <div className="text-xs text-muted-foreground">{character.type}</div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Special Features Section */}
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur">
            <CardContent className="p-8">
              <div className="text-center space-y-6">
                <h2 className="text-2xl font-bold flex items-center justify-center space-x-2">
                  <Sparkles className="h-6 w-6 text-pink-500" />
                  <span>특별한 기능</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center space-y-3">
                    <div className="w-12 h-12 mx-auto bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                      <span className="text-2xl">🎯</span>
                    </div>
                    <h3 className="font-semibold">정확한 분석</h3>
                    <p className="text-sm text-muted-foreground">12가지 퇴근 루틴으로 MBTI 4축을 정확하게 분석</p>
                  </div>

                  <div className="text-center space-y-3">
                    <div className="w-12 h-12 mx-auto bg-pink-100 dark:bg-pink-900 rounded-full flex items-center justify-center">
                      <span className="text-2xl">💡</span>
                    </div>
                    <h3 className="font-semibold">맞춤 추천</h3>
                    <p className="text-sm text-muted-foreground">당신의 유형에 맞는 저녁 루틴, 앱 추천</p>
                  </div>

                  <div className="text-center space-y-3">
                    <div className="w-12 h-12 mx-auto bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center">
                      <span className="text-2xl">🔗</span>
                    </div>
                    <h3 className="font-semibold">쉬운 공유</h3>
                    <p className="text-sm text-muted-foreground">결과를 친구들과 쉽게 공유하고 비교해보세요</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

