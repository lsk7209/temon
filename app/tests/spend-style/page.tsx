/**
 * 소비 성향 테스트 인트로 페이지
 */

import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "소비 성향 테스트 | 12문항으로 보는 나의 소비 유형",
  description:
    "예산 관리, 가격 대비 가치, 충동구매 성향으로 16유형 분석. 결과 공유 가능",
  keywords: "소비, 구매, 예산, 가격, 충동구매, 성향 테스트, MBTI, 무료 테스트",
  alternates: {
    canonical: "/tests/spend-style",
  },
  openGraph: {
    title: "소비 성향 테스트 | 12문항으로 보는 나의 소비 유형",
    description: "예산 관리, 가격 대비 가치, 충동구매 성향으로 16유형 분석. 결과 공유 가능",
    type: "website",
    url: "https://www.temon.kr/tests/spend-style",
  },
}

export default function SpendStyleIntro() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              💰 소비 성향으로 알아보는 나의 유형
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              예산 계획, 충동구매, 가격 민감도까지 12문항으로 분석
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8">
            <div className="space-y-6">
              <div className="text-left">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                  🎯 테스트 소개
                </h2>
                <div className="space-y-3 text-gray-600 dark:text-gray-300">
                  <p>• 소비 습관으로 알아보는 나의 성향</p>
                  <p>• 16가지 소비 유형 중 당신의 유형은?</p>
                  <p>• 예산부터 충동구매까지, 나만의 소비 패턴 발견</p>
                  <p>• 나에게 맞는 완벽한 소비 전략 가이드</p>
                </div>
              </div>

              <div className="border-t dark:border-gray-700 pt-6">
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-500 dark:text-gray-400">
                  <div className="text-center">
                    <div className="font-semibold text-green-600 dark:text-green-400">소요시간</div>
                    <div>약 2분</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-green-600 dark:text-green-400">문항수</div>
                    <div>12문항</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Link href="/tests/spend-style/test">
            <Button
              size="lg"
              className="w-full md:w-auto px-12 py-4 text-lg font-semibold bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800"
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
                  충동구매를 줄이려면 무엇부터 시작해야 하나요?
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  장바구니에 담고 24시간 후에 다시 확인하는 룰을 만들어보세요. 테스트 결과에서 제시하는 각 유형별 충동구매 방지 전략을 참고할 수 있습니다.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  구독 서비스를 합리적으로 관리하는 간단한 기준이 있나요?
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  월별 사용률을 체크하고, 3개월 이상 사용하지 않은 구독은 해지하는 것이 좋습니다. 테스트 결과에서 추천하는 구독 관리 전략을 확인하세요.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  가격과 가치를 함께 비교하는 빠른 방법이 있나요?
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  단순 가격 비교보다는 총 소유 비용(TCO)과 사용 기간을 고려하는 것이 좋습니다. 테스트 결과에서 각 유형별 가격/가치 비교 전략을 참고하세요.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

