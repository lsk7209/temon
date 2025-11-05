/**
 * 테스트 관련 유틸리티 함수
 */

export interface MBTIAnswer {
  E: number
  I: number
  S: number
  N: number
  T: number
  F: number
  J: number
  P: number
}

/**
 * MBTI 타입별 점수를 계산합니다.
 */
export function calculateMBTIScore(answers: Record<number, string>): MBTIAnswer {
  const counts: MBTIAnswer = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 }

  Object.values(answers).forEach((answer) => {
    if (answer in counts) {
      counts[answer as keyof MBTIAnswer]++
    }
  })

  return counts
}

/**
 * MBTI 점수로부터 최종 결과를 계산합니다.
 */
export function getMBTIResult(counts: MBTIAnswer): string {
  return (
    (counts.E >= counts.I ? "E" : "I") +
    (counts.S >= counts.N ? "S" : "N") +
    (counts.T >= counts.F ? "T" : "F") +
    (counts.J >= counts.P ? "J" : "P")
  )
}

/**
 * MBTI 답변으로부터 최종 결과를 계산합니다.
 */
export function calculateMBTIResult(answers: Record<number, string>): string {
  const counts = calculateMBTIScore(answers)
  return getMBTIResult(counts)
}

/**
 * 점수 기반 결과 계산 (가장 높은 점수의 타입 반환)
 */
export function calculateScoreBasedResult(
  answers: Record<string, number>
): string {
  return Object.entries(answers).reduce((a, b) =>
    answers[a[0]] > answers[b[0]] ? a : b
  )[0]
}

/**
 * 평균 점수 계산 (NTRP 테스트 등)
 */
export function calculateAverageScore(scores: number[]): number {
  if (scores.length === 0) return 0
  const average = scores.reduce((sum, score) => sum + score, 0) / scores.length
  return Math.round(average * 2) / 2 // 0.5 단위로 반올림
}

