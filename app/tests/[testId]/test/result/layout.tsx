import type { Metadata } from "next"
import { generateResultPageMetadata } from "@/lib/quiz-seo-utils"
import { ALL_TESTS } from "@/lib/tests-config"

export async function generateMetadata({ params }: { params: { testId: string } }): Promise<Metadata> {
  const test = ALL_TESTS.find((t) => t.id === params.testId)
  const defaultTitle = test?.title || "테스트"

  // 테스트 이름에서 이모지 제거
  const testName = defaultTitle.replace(/[^\w\s가-힣]/g, "").trim() || defaultTitle

  // Naver-optimized description (under 80 chars)
  const shortDescription = `${testName} 테스트 결과 확인. 나의 성격 유형은?`
  // Full description for Google/AI (140-160자 최적화)
  let fullDescription = `${testName} 테스트 결과를 확인해보세요! 16가지 성격 유형 중 당신의 유형과 특징, 잘 맞는 유형을 알아보세요. 결과를 친구들과 공유하고 비교해보세요.`
  if (fullDescription.length < 140) {
    fullDescription = `${testName} 테스트 결과를 확인해보세요! 16가지 성격 유형 중 당신의 유형과 특징, 잘 맞는 유형을 알아보세요. 결과를 친구들과 공유하고 비교해보세요. 무료로 이용할 수 있습니다.`
  } else if (fullDescription.length > 160) {
    fullDescription = fullDescription.substring(0, 157) + "..."
  }

  return generateResultPageMetadata({
    quizId: params.testId,
    quizTitle: testName,
    shortDescription,
    fullDescription,
    keywords: `${testName}, 성격 테스트, 결과, MBTI, 심리테스트`,
    canonical: `/tests/${params.testId}/test/result`,
  })
}

export default function TestResultLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
