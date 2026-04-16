"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { Sparkles } from "lucide-react"

export default function KDramaClient() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <Card className="p-8 md:p-12 text-center shadow-xl border-2 border-pink-200 bg-white/90 backdrop-blur">
          <div className="mb-6 flex justify-center">
            <div className="relative">
              <div className="text-7xl animate-bounce">🎬</div>
              <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-pink-500 animate-pulse" />
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
            K-드라마 클리셰 테스트
          </h1>

          <p className="text-xl md:text-2xl text-gray-700 mb-6 font-medium">당신은 어떤 드라마 캐릭터?</p>

          <div className="space-y-4 mb-8 text-left bg-gradient-to-r from-pink-50 to-purple-50 p-6 rounded-lg border border-pink-200">
            <p className="text-gray-700 leading-relaxed">
              <span className="font-bold text-pink-600">🎭 재벌남/여</span>부터{" "}
              <span className="font-bold text-purple-600">🍲 국밥 조연</span>까지!
            </p>
            <p className="text-gray-700 leading-relaxed">10개의 드라마 클리셰 상황에서 당신의 선택은?</p>
            <p className="text-gray-700 leading-relaxed">
              눈물 쏙 빼는 멜로부터 웃긴 로코까지, 당신의 드라마 캐릭터 유형을 찾아보세요!
            </p>
          </div>

          <div className="flex flex-wrap gap-3 justify-center mb-8">
            <span className="px-4 py-2 bg-pink-100 text-pink-700 rounded-full text-sm font-medium border border-pink-300">
              🏢 재벌 클리셰
            </span>
            <span className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium border border-purple-300">
              💕 순정 멜로
            </span>
            <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium border border-blue-300">
              😂 코믹 로코
            </span>
            <span className="px-4 py-2 bg-rose-100 text-rose-700 rounded-full text-sm font-medium border border-rose-300">
              😭 눈물 폭발
            </span>
            <span className="px-4 py-2 bg-amber-100 text-amber-700 rounded-full text-sm font-medium border border-amber-300">
              🍲 국밥 조연
            </span>
          </div>

          <Link href="/kdrama-mbti/test">
            <Button
              size="lg"
              className="w-full md:w-auto px-12 py-6 text-lg font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 hover:from-pink-600 hover:via-purple-600 hover:to-blue-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              드라마 시작하기 🎬
            </Button>
          </Link>

          <p className="mt-6 text-sm text-gray-500">소요 시간: 약 2분 | 총 10문항</p>
        </Card>
      </div>
    </div>
  )
}

