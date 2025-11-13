import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Users, Camera, Sparkles } from "lucide-react"

export const metadata: Metadata = {
  title: "인스타그램 스토리 스타일 테스트 | 스토리 올리는 방식으로 보는 16유형 | 테몬",
  description:
    "인스타그램 스토리 올리는 방식으로 16유형 성향을 분석합니다. 필터, 업로드 빈도, 스토리 내용으로 알아보는 나의 성격. 12문항, 결과 공유 이미지 자동 생성.",
  keywords:
    "인스타그램 테스트, 스토리 스타일, 필터 선택, SNS 성향 테스트, 심리테스트, 무료 테스트",
  alternates: {
    canonical: "/tests/instagram-story",
  },
  openGraph: {
    title: "인스타그램 스토리 스타일 테스트 | 스토리 올리는 방식으로 보는 16유형",
    description: "인스타그램 스토리 올리는 방식으로 16유형 성향을 분석합니다. 12문항, 결과 공유 이미지 자동 생성.",
    type: "website",
    url: "https://www.temon.kr/tests/instagram-story",
  },
}

export default function InstagramStoryIntro() {
  return (
    <div className="min-h-screen bg-[#F7FAFC] dark:bg-gray-950">
      <main className="container max-w-4xl mx-auto px-4 py-8">
        <div className="text-center space-y-8">
          <div className="relative mx-auto w-32 h-32 mb-8">
            <div className="absolute inset-0 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full animate-pulse" />
            <div className="absolute inset-2 bg-gradient-to-br from-pink-200 to-purple-300 rounded-full flex items-center justify-center">
              <span className="text-4xl animate-bounce">📸</span>
            </div>
            <div className="absolute -top-6 -left-6 text-lg animate-bounce" style={{ animationDelay: "0.5s" }}>
              ✨
            </div>
            <div className="absolute -top-4 -right-8 text-lg animate-bounce" style={{ animationDelay: "1s" }}>
              🎨
            </div>
            <div className="absolute -bottom-6 -left-8 text-lg animate-bounce" style={{ animationDelay: "1.5s" }}>
              💫
            </div>
            <div className="absolute -bottom-4 -right-6 text-lg animate-bounce" style={{ animationDelay: "2s" }}>
              🌈
            </div>
          </div>

          <div className="space-y-6">
            <Badge variant="secondary" className="bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200">
              📸 NEW 테스트
            </Badge>

            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                인스타그램 스토리로 보는
              </span>
              <br />
              <span className="text-foreground">나의 SNS 패턴 📸</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              스토리 올리는 방식, 필터 선택으로 16유형 분석. 12문항, 약 3분 소요.
            </p>

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
                className="h-16 px-12 text-xl bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 shadow-lg hover:shadow-xl transition-all duration-300"
                asChild
              >
                <Link href="/tests/instagram-story/test">
                  <span className="text-2xl mr-3">📸</span>
                  테스트 시작하기
                </Link>
              </Button>

              <p className="text-sm text-center text-muted-foreground">
                무료 • 회원가입 불필요 • 16가지 스토리 스타일 분석
              </p>
            </div>
          </div>
        </div>

        <div className="mt-20 space-y-12">
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur">
            <CardContent className="p-8">
              <div className="text-center space-y-6">
                <h2 className="text-2xl font-bold flex items-center justify-center space-x-2">
                  <Camera className="h-6 w-6 text-pink-500" />
                  <span>이런 질문들이 나와요!</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                  <div className="space-y-4">
                    <div className="p-4 bg-pink-50 dark:bg-pink-950 rounded-lg">
                      <p className="font-medium">1. 스토리를 올릴 때 당신은?</p>
                      <p className="text-sm text-muted-foreground mt-1">필터 없이 바로 올림 vs 필터 여러 개 시도</p>
                    </div>
                    <div className="p-4 bg-purple-50 dark:bg-purple-950 rounded-lg">
                      <p className="font-medium">2. 스토리 업로드 빈도는?</p>
                      <p className="text-sm text-muted-foreground mt-1">하루 여러 개 vs 가끔씩만</p>
                    </div>
                    <div className="p-4 bg-pink-50 dark:bg-pink-950 rounded-lg">
                      <p className="font-medium">3. 스토리 내용은?</p>
                      <p className="text-sm text-muted-foreground mt-1">일상 공유 vs 특별한 순간만</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 bg-purple-50 dark:bg-purple-950 rounded-lg">
                      <p className="font-medium">4. 스토리 하이라이트는?</p>
                      <p className="text-sm text-muted-foreground mt-1">여러 개 관리 vs 만들지 않음</p>
                    </div>
                    <div className="p-4 bg-pink-50 dark:bg-pink-950 rounded-lg">
                      <p className="font-medium">5. 스토리 댓글은?</p>
                      <p className="text-sm text-muted-foreground mt-1">댓글 많이 받음 vs 조용히만</p>
                    </div>
                    <div className="p-4 bg-purple-50 dark:bg-purple-950 rounded-lg">
                      <p className="font-medium">6. 스토리 보관은?</p>
                      <p className="text-sm text-muted-foreground mt-1">하이라이트에 보관 vs 그냥 지나감</p>
                    </div>
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

