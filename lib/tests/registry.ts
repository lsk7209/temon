/**
 * 테스트 레지스트리
 * 모든 테스트의 설정을 중앙 관리합니다.
 */

import { TestConfig } from "@/components/test-question-page"
import { calculateMBTIResult, calculateScoreBasedResult, calculateAverageScore } from "@/lib/test-utils"
import coffeeMbtiQuestions from "./questions/coffee-mbti.json"

// 질문 데이터를 동적으로 로드하는 함수 (필요시)
async function loadQuestions(testId: string) {
  try {
    const module = await import(`./questions/${testId}.json`)
    return module.default
  } catch (error) {
    console.error(`Failed to load questions for ${testId}:`, error)
    return null
  }
}

/**
 * 테스트 설정을 가져옵니다.
 */
export async function getTestConfig(testId: string): Promise<TestConfig | null> {
  // 현재는 직접 import, 나중에 동적 로딩으로 변경 가능
  const questionData = coffeeMbtiQuestions

  if (!questionData || questionData.testId !== testId) {
    return null
  }

  // 결과 계산 함수 매핑
  const calculateResult = (() => {
    switch (questionData.calculateResult) {
      case "mbti":
        return calculateMBTIResult
      case "score":
        // 점수 기반 계산 (예: kdrama-mbti)
        return (answers: Record<number, string>) => {
          // answers를 Record<string, number>로 변환 필요
          const scoreMap: Record<string, number> = {}
          Object.values(answers).forEach((answer) => {
            scoreMap[answer] = (scoreMap[answer] || 0) + 1
          })
          return calculateScoreBasedResult(scoreMap)
        }
      case "average":
        // 평균 계산 (예: ntrp-test)
        return (answers: Record<number, string>) => {
          const scores = Object.values(answers).map(Number)
          return calculateAverageScore(scores).toString()
        }
      default:
        // 기본: 첫 번째 답변 반환
        return (answers: Record<number, string>) => Object.values(answers)[0] || ""
    }
  })()

  return {
    testId: questionData.testId,
    questions: questionData.questions,
    calculateResult,
    resultPath: questionData.resultPath,
    colorTheme: questionData.colorTheme,
  }
}

/**
 * 테스트 설정을 동기적으로 가져옵니다 (SSR용)
 */
export function getTestConfigSync(testId: string): TestConfig | null {
  // 현재는 coffee-mbti만 지원
  if (testId !== "coffee-mbti") {
    return null
  }

  const questionData = coffeeMbtiQuestions

  return {
    testId: questionData.testId,
    questions: questionData.questions,
    calculateResult: calculateMBTIResult,
    resultPath: questionData.resultPath,
    colorTheme: questionData.colorTheme,
  }
}

