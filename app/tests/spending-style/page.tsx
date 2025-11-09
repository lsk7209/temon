/**
 * 소비 성향 테스트 인트로 페이지
 */

import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "소비 성향 테스트 | 12문항으로 알아보는 16유형",
  description:
    "계획 구매부터 즉흥 지출까지, 당신의 소비 패턴을 16유형으로 분석. 유형별 절약 팁과 추천 설정 제공.",
  keywords: "소비, 구매, 예산, 가격, 충동구매, 성향 테스트, MBTI, 무료 테스트",
  alternates: {
    canonical: "/tests/spending-style",
  },
  openGraph: {
    title: "소비 성향 테스트 | 12문항으로 알아보는 16유형",
    description: "계획 구매부터 즉흥 지출까지, 당신의 소비 패턴을 16유형으로 분석. 유형별 절약 팁과 추천 설정 제공.",
    type: "website",
    url: "https://www.temon.kr/tests/spending-style",
  },
}

export default function SpendingStyleIntro() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              💰 소비 습관으로 보는 나의 성향
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              계획성, 즉흥성, 비교 습관, 리스크 민감도, 절약·투자 균형을 12문항으로 분석하여 16유형으로 매핑합니다.
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
                  <p>• 계획부터 즉흥까지, 나만의 소비 패턴 발견</p>
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

          <Link href="/tests/spending-style/test">
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
                  충동구매를 줄이는 첫 단계는 무엇인가요?
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  위시리스트에 담고 48시간 대기하는 룰을 적용하는 것이 좋습니다. 테스트 결과에서 각 유형별 충동구매 방지 가이드를 확인하세요.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  구독 정리를 자동화하는 방법이 있나요?
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  분기별로 구독 서비스 사용량을 점검하고, 사용하지 않는 서비스는 자동으로 해지하는 루틴을 만드는 것이 좋습니다. 테스트 결과에서 추천하는 구독 관리 방법을 참고하세요.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  포인트·마일리지를 전략적으로 쓰는 기준은 무엇인가요?
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  체계적으로 적립하고 소진하는 루틴을 만들거나, 이벤트 중심으로 즉시 사용하는 방식 중 자신에게 맞는 방법을 선택하세요. 테스트 결과에서 각 유형별 포인트 활용 가이드를 확인할 수 있습니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

