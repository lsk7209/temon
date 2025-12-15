import { redirect } from "next/navigation"
import { notFound } from "next/navigation"
import { ALL_TESTS } from "@/lib/tests-config"

// output: 'export'를 위한 정적 파라미터 생성
export function generateStaticParams() {
  return ALL_TESTS.map((test) => ({
    slug: test.id,
  }))
}

const tests: Record<string, string> = {
  "ramen-mbti": "/tests/ramen-mbti",
  "coffee-mbti": "/tests/coffee-mbti",
  "study-mbti": "/tests/study-mbti",
  "alarm-habit": "/tests/alarm-habit",
  "ntrp-test": "/tests/ntrp-test",
  "pet-mbti": "/tests/pet-mbti",
  "kdrama-mbti": "/tests/kdrama-mbti",
  "kpop-idol": "/tests/kpop-idol",
  "snowwhite-mbti": "/tests/snowwhite-mbti",
}

export default function TestRedirect({ params }: { params: { slug: string } }) {
  const testPath = tests[params.slug]

  if (!testPath) {
    notFound()
  }

  // 서버 사이드 리다이렉트 (301 Permanent Redirect)
  redirect(testPath)
}
