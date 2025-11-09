/**
 * 스마트폰 사용 스타일 테스트 인트로 페이지
 */

import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "스마트폰 사용 스타일 테스트 | 12문항으로 알아보는 16유형",
  description:
    "알림 처리, 앱 정리, 집중 방해 요인, 소통 방식으로 16유형 분석. 결과 기반 생산성 팁 제공.",
  keywords: "스마트폰, 사용 스타일, 앱, 습관, 성향 테스트, MBTI, 무료 테스트",
  alternates: {
    canonical: "/tests/phone-usage",
  },
  openGraph: {
    title: "스마트폰 사용 스타일 테스트 | 12문항으로 알아보는 16유형",
    description: "알림 처리, 앱 정리, 집중 방해 요인, 소통 방식으로 16유형 분석. 결과 기반 생산성 팁 제공.",
    type: "website",
    url: "https://www.temon.kr/tests/phone-usage",
  },
}

export default function PhoneUsageIntro() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              📱 스마트폰 사용 습관으로 보는 나의 성향
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              알림, 앱 정리, 집중, 커뮤니케이션 습관을 12문항으로 분석해 16유형으로 매핑
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8">
            <div className="space-y-6">
              <div className="text-left">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                  🎯 테스트 소개
                </h2>
                <div className="space-y-3 text-gray-600 dark:text-gray-300">
                  <p>• 스마트폰 사용 습관으로 알아보는 나의 성향</p>
                  <p>• 16가지 사용 스타일 유형 중 당신의 유형은?</p>
                  <p>• 알림부터 집중 모드까지, 나만의 사용 패턴 발견</p>
                  <p>• 나에게 맞는 완벽한 스마트폰 설정 가이드</p>
                </div>
              </div>

              <div className="border-t dark:border-gray-700 pt-6">
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-500 dark:text-gray-400">
                  <div className="text-center">
                    <div className="font-semibold text-blue-600 dark:text-blue-400">소요시간</div>
                    <div>약 2분</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-blue-600 dark:text-blue-400">문항수</div>
                    <div>12문항</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Link href="/tests/phone-usage/test">
            <Button
              size="lg"
              className="w-full md:w-auto px-12 py-4 text-lg font-semibold bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
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
                  알림을 최소화하려면 무엇부터 정리해야 하나요?
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  우선순위가 낮은 앱의 알림부터 차단하고, 중요 알림만 허용하는 것이 좋습니다. 테스트 결과에서 각 유형별 알림 관리 가이드를 참고하세요.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  집중 모드 자동화 기본 원칙은 무엇인가요?
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  일정이나 위치에 따라 자동으로 집중 모드가 켜지도록 설정하는 것이 효과적입니다. 테스트 결과에서 추천하는 자동화 설정을 확인하세요.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  사진·파일 정리를 주기적으로 유지하는 팁은?
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  수시로 정리하거나 주기적으로 대청소하는 방식 중 자신에게 맞는 방법을 선택하세요. 테스트 결과에서 각 유형별 정리 방법을 확인할 수 있습니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

