/**
 * 피부 루틴 성향 테스트 인트로 페이지
 */

import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "피부 루틴 성향 테스트 | 12문항으로 찾는 나만의 스킨케어 유형",
  description:
    "세안·보습·활성 성분·생활습관으로 16유형 분석. 결과별 루틴 가이드 제공.",
  keywords: "피부 루틴, 스킨케어, 성향 테스트, MBTI, 뷰티, 무료 테스트",
  alternates: {
    canonical: "/tests/skin-routine",
  },
  openGraph: {
    title: "피부 루틴 성향 테스트 | 12문항으로 보는 나의 스킨케어 유형",
    description: "세안, 토너, 보습, 선크림 습관으로 성향을 16유형으로 분석합니다. 2분 완성.",
    type: "website",
    url: "https://www.temon.kr/tests/skin-routine",
  },
}

export default function SkinRoutineIntro() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-950 dark:to-rose-950">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              ✨ 피부 루틴 성향으로 보는 나의 스킨케어 스타일
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              세안, 보습, 활성 성분 사용, 생활습관까지 12문항으로 분석해 16유형으로 매핑
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8">
            <div className="space-y-6">
              <div className="text-left">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                  🎯 테스트 소개
                </h2>
                <div className="space-y-3 text-gray-600 dark:text-gray-300">
                  <p>• 스킨케어 습관으로 알아보는 나의 성향</p>
                  <p>• 16가지 피부 루틴 유형 중 당신의 유형은?</p>
                  <p>• 세안부터 보습까지, 나만의 루틴 패턴 발견</p>
                  <p>• 나에게 맞는 완벽한 스킨케어 가이드</p>
                </div>
              </div>

              <div className="border-t dark:border-gray-700 pt-6">
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-500 dark:text-gray-400">
                  <div className="text-center">
                    <div className="font-semibold text-pink-600 dark:text-pink-400">소요시간</div>
                    <div>약 2분</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-pink-600 dark:text-pink-400">문항수</div>
                    <div>12문항</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Link href="/tests/skin-routine/test">
            <Button
              size="lg"
              className="w-full md:w-auto px-12 py-4 text-lg font-semibold bg-pink-600 hover:bg-pink-700 dark:bg-pink-700 dark:hover:bg-pink-800"
            >
              테스트 시작하기 🚀
            </Button>
          </Link>

          <div className="mt-8 text-sm text-gray-500 dark:text-gray-400">
            <p>💡 정확한 결과를 위해 솔직하게 답변해주세요!</p>
          </div>

          {/* FAQ 섹션 */}
          <div className="mt-12 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-left">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              자주 묻는 질문
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  강한 활성 성분은 어떻게 도입해야 하나요?
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  저농도부터 시작하여 점진적으로 농도를 높이고, 피부 반응을 주의 깊게 관찰하세요. 테스트 결과에서 제시하는 각 유형별 성분 도입 가이드를 참고하세요.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  레티노이드와 각질 제거는 같이 써도 되나요?
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  레티노이드와 각질 제거 성분(AHA/BHA)을 같은 날 사용하는 것은 피하는 것이 좋습니다. 테스트 결과에서 추천하는 주간 관리 가이드를 확인하세요.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  여행 중 루틴은 어떻게 간소화하나요?
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  필수 단계만 남기고 멀티 제품을 활용하는 것이 좋습니다. 테스트 결과에서 각 유형별 여행 루틴 가이드를 참고하세요.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

