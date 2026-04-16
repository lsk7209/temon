import { ALL_TESTS } from "@/lib/tests-config"
import TestPlayClient from "./test-play-client"

// output: 'export'를 위한 정적 파라미터 생성
export function generateStaticParams() {
  return ALL_TESTS.map((test) => ({
    slug: test.id,
  }))
}

export default function TestPlayPage() {
  return <TestPlayClient />
}
