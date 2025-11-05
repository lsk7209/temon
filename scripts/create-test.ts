#!/usr/bin/env ts-node
/**
 * 테스트 생성 스크립트
 * 
 * 사용법:
 * npm run create-test <test-id> <test-title>
 * 
 * 예시:
 * npm run create-test my-new-test "내 새로운 테스트"
 */

import * as fs from "fs"
import * as path from "path"

const TEST_ID = process.argv[2]
const TEST_TITLE = process.argv[3] || TEST_ID

if (!TEST_ID) {
  console.error("❌ 테스트 ID가 필요합니다.")
  console.log("사용법: npm run create-test <test-id> <test-title>")
  process.exit(1)
}

const BASE_DIR = path.join(process.cwd())
const TESTS_DIR = path.join(BASE_DIR, "app", "tests", TEST_ID)
const QUESTIONS_DIR = path.join(BASE_DIR, "lib", "tests", "questions")

// 디렉토리 생성
const directories = [
  path.join(TESTS_DIR, "test", "result"),
  QUESTIONS_DIR,
]

directories.forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
    console.log(`✅ 디렉토리 생성: ${dir}`)
  }
})

// 1. 인트로 페이지 생성
const introPage = `"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function ${TEST_ID.charAt(0).toUpperCase() + TEST_ID.slice(1).replace(/-/g, "")}Intro() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-pink-50 to-cyan-50 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <Card className="p-8 md:p-12 shadow-xl border-2 border-violet-200 bg-white/90 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-3xl md:text-4xl font-bold mb-4">
                ${TEST_TITLE}
              </CardTitle>
              <CardDescription className="text-lg">
                테스트 설명을 여기에 작성하세요.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/tests/${TEST_ID}/test">
                <Button
                  size="lg"
                  className="w-full md:w-auto px-12 py-4 text-lg font-semibold bg-violet-600 hover:bg-violet-700"
                >
                  테스트 시작하기 🚀
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
`

// 2. 질문 페이지 생성
const questionPage = `"use client"

import { TestQuestionPage } from "@/components/test-question-page"
import { getTestConfigSync } from "@/lib/tests/registry"

export default function ${TEST_ID.charAt(0).toUpperCase() + TEST_ID.slice(1).replace(/-/g, "")}Test() {
  const config = getTestConfigSync("${TEST_ID}")
  
  if (!config) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>테스트를 찾을 수 없습니다.</p>
      </div>
    )
  }

  return <TestQuestionPage config={config} />
}
`

// 3. 결과 페이지 생성
const resultPage = `"use client"

import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ShareButtons } from "@/components/share-buttons"
import Link from "next/link"
import { RotateCcw } from "lucide-react"

export default function ${TEST_ID.charAt(0).toUpperCase() + TEST_ID.slice(1).replace(/-/g, "")}Result() {
  const searchParams = useSearchParams()
  const resultType = searchParams.get("type") || "UNKNOWN"
  const resultId = searchParams.get("id") || undefined

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-pink-50 to-cyan-50 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <Card className="p-8 md:p-12 shadow-xl border-2 border-violet-200 bg-white/90 backdrop-blur text-center">
            <CardHeader>
              <CardTitle className="text-3xl md:text-4xl font-bold mb-4">
                결과: {resultType}
              </CardTitle>
              <CardDescription className="text-lg">
                결과 설명을 여기에 작성하세요.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col items-center space-y-4">
                <ShareButtons
                  testId="${TEST_ID}"
                  testPath="/tests/${TEST_ID}/test"
                  resultType={resultType}
                  resultId={resultId}
                  title="테스트 결과"
                  description="결과 설명"
                />
                <Button variant="outline" size="lg" asChild>
                  <Link href="/tests/${TEST_ID}/test">
                    <RotateCcw className="h-5 w-5 mr-2" />
                    다시 테스트
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
`

// 4. 질문 JSON 파일 생성
const questionJson = {
  testId: TEST_ID,
  questions: [
    {
      id: 1,
      text: "첫 번째 질문을 입력하세요",
      choices: [
        { id: "a", text: "선택지 A", tags: ["E"] },
        { id: "b", text: "선택지 B", tags: ["I"] },
      ],
    },
    {
      id: 2,
      text: "두 번째 질문을 입력하세요",
      choices: [
        { id: "a", text: "선택지 A", tags: ["S"] },
        { id: "b", text: "선택지 B", tags: ["N"] },
      ],
    },
  ],
  calculateResult: "mbti",
  resultPath: `/tests/${TEST_ID}/test/result`,
  colorTheme: {
    bg: "from-violet-50 to-pink-50",
    border: "border-violet-200",
    button: "bg-violet-500 text-white border-violet-500",
    text: "text-violet-600",
  },
}

// 파일 작성
const files = [
  { path: path.join(TESTS_DIR, "page.tsx"), content: introPage },
  { path: path.join(TESTS_DIR, "test", "page.tsx"), content: questionPage },
  { path: path.join(TESTS_DIR, "test", "result", "page.tsx"), content: resultPage },
  { path: path.join(QUESTIONS_DIR, `${TEST_ID}.json`), content: JSON.stringify(questionJson, null, 2) },
]

files.forEach(({ path: filePath, content }) => {
  fs.writeFileSync(filePath, content, "utf-8")
  console.log(`✅ 파일 생성: ${filePath}`)
})

console.log(`\n✨ 테스트 "${TEST_TITLE}" (${TEST_ID}) 생성 완료!`)
console.log(`\n다음 단계:`)
console.log(`1. lib/tests/questions/${TEST_ID}.json 파일을 편집하여 질문을 추가하세요`)
console.log(`2. lib/tests-config.ts에 테스트 정보를 추가하세요`)
console.log(`3. app/tests/${TEST_ID}/test/result/page.tsx를 편집하여 결과 페이지를 커스터마이징하세요`)

