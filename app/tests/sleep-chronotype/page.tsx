/**
 * 수면 크로노타입 테스트 인트로 페이지
 */

import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "수면 크로노타입 테스트 | 12문항으로 보는 나의 리듬",
  description:
    "기상·취침·집중 타이밍과 낮잠 습관으로 16유형 분석. 결과 공유 가능",
  keywords: "수면, 크로노타입, 리듬, 기상, 취침, 성향 테스트, MBTI, 무료 테스트",
  alternates: {
    canonical: "/tests/sleep-chronotype",
  },
  openGraph: {
    title: "수면 크로노타입 테스트 | 12문항으로 보는 나의 리듬",
    description: "기상·취침·집중 타이밍과 낮잠 습관으로 16유형 분석. 결과 공유 가능",
    type: "website",
    url: "https://www.temon.kr/tests/sleep-chronotype",
  },
}

export default function SleepChronotypeIntro() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950 dark:to-purple-950">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              🌙 수면 크로노타입으로 알아보는 나의 하루 리듬
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              기상 시간, 낮잠 습관, 집중 타이밍을 12문항으로 분석해 16유형으로 매핑
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8">
            <div className="space-y-6">
              <div className="text-left">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                  🎯 테스트 소개
                </h2>
                <div className="space-y-3 text-gray-600 dark:text-gray-300">
                  <p>• 수면 리듬으로 알아보는 나의 성향</p>
                  <p>• 16가지 수면 크로노타입 중 당신의 유형은?</p>
                  <p>• 기상부터 취침까지, 나만의 하루 리듬 발견</p>
                  <p>• 나에게 맞는 완벽한 수면 루틴 가이드</p>
                </div>
              </div>

              <div className="border-t dark:border-gray-700 pt-6">
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-500 dark:text-gray-400">
                  <div className="text-center">
                    <div className="font-semibold text-indigo-600 dark:text-indigo-400">소요시간</div>
                    <div>약 2분</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-indigo-600 dark:text-indigo-400">문항수</div>
                    <div>12문항</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Link href="/tests/sleep-chronotype/test">
            <Button
              size="lg"
              className="w-full md:w-auto px-12 py-4 text-lg font-semibold bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-800"
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
                  아침형·저녁형은 바꿀 수 있나요?
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  완전히 바꾸기는 어렵지만, 점진적으로 조정할 수 있습니다. 테스트 결과에서 제시하는 각 유형별 루틴 가이드를 참고하여 천천히 변화를 시도해보세요.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  낮잠은 몇 분이 적당한가요?
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  보통 10-20분이 적당하며, 30분을 넘기면 깊은 수면에 들어가 깨어나기 어려울 수 있습니다. 테스트 결과에서 추천하는 낮잠 시간을 확인하세요.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  카페인 컷오프는 언제가 좋나요?
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  일반적으로 취침 6시간 전까지가 좋습니다. 테스트 결과에서 각 유형별 카페인 컷오프 시간을 참고하세요.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

