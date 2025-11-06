import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { ALL_TESTS } from "@/lib/tests-config"

// output: 'export'를 위한 정적 파라미터 생성
export function generateStaticParams() {
  return ALL_TESTS.map((test) => ({
    slug: test.id,
  }))
}

const tests = {
  "ramen-mbti": {
    title: "라면 MBTI",
    description: "당신의 라면 취향으로 알아보는 성격 유형",
    path: "/ramen-mbti",
  },
  "coffee-mbti": {
    title: "커피 MBTI",
    description: "당신의 커피 취향으로 알아보는 성격 유형",
    path: "/coffee-mbti",
  },
  "study-mbti": {
    title: "공부 MBTI",
    description: "당신의 학습 스타일로 알아보는 성격 유형",
    path: "/study-mbti",
  },
  "alarm-habit": {
    title: "알람 습관 테스트",
    description: "당신의 기상 습관으로 알아보는 성격",
    path: "/alarm-habit",
  },
  "ntrp-test": {
    title: "NTRP 테니스 실력 테스트",
    description: "당신의 테니스 실력을 정확히 측정해보세요",
    path: "/ntrp-test",
  },
  "pet-mbti": {
    title: "반려동물 MBTI",
    description: "당신에게 맞는 완벽한 반려동물을 찾아보세요",
    path: "/pet-mbti",
  },
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const test = tests[params.slug as keyof typeof tests]

  if (!test) {
    return {
      title: "테스트를 찾을 수 없습니다 - 테몬",
    }
  }

  return {
    title: `${test.title} - 테몬`,
    description: test.description,
  }
}

export default function TestRedirect({ params }: { params: { slug: string } }) {
  const test = tests[params.slug as keyof typeof tests]

  if (!test) {
    notFound()
  }

  // 클라이언트 사이드 리다이렉트
  if (typeof window !== "undefined") {
    window.location.href = test.path
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">테스트 페이지로 이동 중...</p>
      </div>
    </div>
  )
}
