/**
 * MBTI 계산 유틸리티 함수
 * 모든 퀴즈에서 공통으로 사용하는 MBTI 계산 로직
 */

/**
 * 태그 배열 배열로부터 MBTI 타입 계산
 * @param answers - 각 질문의 선택된 태그 배열 (예: [["E", "S"], ["I", "N"]])
 * @returns MBTI 타입 (예: "ENFP")
 */
export function calculateMBTI(answers: string[][]): string {
  const scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 }

  answers.forEach((tags) => {
    tags.forEach((tag) => {
      if (tag in scores) {
        scores[tag as keyof typeof scores]++
      }
    })
  })

  const result =
    (scores.E >= scores.I ? "E" : "I") +
    (scores.S >= scores.N ? "S" : "N") +
    (scores.T >= scores.F ? "T" : "F") +
    (scores.J >= scores.P ? "J" : "P")

  return result
}


