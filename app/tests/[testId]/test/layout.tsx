import type { Metadata } from "next"
import { generateTestPageMetadata } from "@/lib/quiz-seo-utils"
import { ALL_TESTS } from "@/lib/tests-config"
import { notFound } from "next/navigation"

export async function generateMetadata({ params }: { params: { testId: string } }): Promise<Metadata> {
  const test = ALL_TESTS.find(t => t.id === params.testId)
  
  if (!test) {
    return {
      title: "테스트를 찾을 수 없습니다 | 테몬",
      description: "요청하신 테스트를 찾을 수 없습니다.",
    }
  }

  // 테스트 이름에서 이모지 제거
  const testName = test.title.replace(/[^\w\s가-힣]/g, '').trim() || test.title
  
  // Naver-optimized description (under 80 chars)
  const shortDescription = `${testName} 테스트 진행 중. 12문항으로 나의 성격 유형 발견!`
  // Full description for Google/AI (140-160자 최적화)
  let fullDescription = `${testName} 테스트를 진행해보세요! 12개의 질문에 답변하여 나의 성격 유형을 알아보세요. 약 3분 소요되며, 결과는 16가지 성격 유형 중 하나로 나타납니다.`
  if (fullDescription.length < 140) {
    fullDescription = `${testName} 테스트를 진행해보세요! 12개의 질문에 답변하여 나의 성격 유형을 알아보세요. 약 3분 소요되며, 결과는 16가지 성격 유형 중 하나로 나타납니다. 무료로 시작할 수 있습니다.`
  } else if (fullDescription.length > 160) {
    fullDescription = fullDescription.substring(0, 157) + "..."
  }

  return generateTestPageMetadata({
    quizId: params.testId,
    quizTitle: testName,
    shortDescription,
    fullDescription,
    keywords: `${testName}, 성격 테스트, MBTI, 심리테스트, 무료 테스트`,
    canonical: `/tests/${params.testId}/test`,
  })
}

export default function TestPageLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { testId: string }
}) {
  const test = ALL_TESTS.find(t => t.id === params.testId)
  
  if (!test) {
    notFound()
  }

  return <>{children}</>
}

