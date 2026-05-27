import type { Metadata } from "next"
import { generateResultPageMetadata } from "@/lib/quiz-seo-utils"
import { notFound } from "next/navigation"
import {
  getCleanTestTitle,
  getPublishedTestSeoSource,
} from "@/lib/test-seo-source"

export async function generateMetadata({ params }: { params: { testId: string } }): Promise<Metadata> {
  const test = await getPublishedTestSeoSource(params.testId)
  
  if (!test) {
    return {
      title: "테스트 결과를 찾을 수 없습니다 | 테몬",
      description: "요청하신 테스트 결과를 찾을 수 없습니다.",
    }
  }

  const testName = getCleanTestTitle(test.title)
  
  const shortDescription = `${testName} 테스트 결과 확인. 나의 성격 유형은?`
  let fullDescription = `${testName} 테스트 결과를 확인해보세요! ${test.resultTypeCount}가지 성격 유형 중 당신의 유형과 특징, 잘 맞는 유형을 알아보세요. 결과를 친구들과 공유하고 비교해보세요.`
  if (fullDescription.length < 140) {
    fullDescription = `${testName} 테스트 결과를 확인해보세요! ${test.resultTypeCount}가지 성격 유형 중 당신의 유형과 특징, 잘 맞는 유형을 알아보세요. 결과를 친구들과 공유하고 비교해보세요. 무료로 이용할 수 있습니다.`
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

export default async function TestResultLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { testId: string }
}) {
  const test = await getPublishedTestSeoSource(params.testId)
  
  if (!test) {
    notFound()
  }

  return <>{children}</>
}

