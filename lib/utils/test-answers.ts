/**
 * 테스트 답변 유틸리티 함수
 * 다양한 형식을 Record<number, string>로 변환
 */

/**
 * 답변 배열을 API가 기대하는 형식으로 변환
 * @param answers - 질문별 태그 배열 (예: [["E"], ["S"], ["T"]])
 * @returns Record<number, string> 형식 (예: { 0: '["E"]', 1: '["S"]', 2: '["T"]' })
 */
export function convertAnswersToRecord(answers: string[][]): Record<number, string> {
  const record: Record<number, string> = {}
  answers.forEach((tags, index) => {
    record[index] = JSON.stringify(tags)
  })
  return record
}

/**
 * string[] 배열을 Record<number, string>로 변환
 * @param answers - 태그 배열 (예: ["E", "S", "T"])
 * @returns Record<number, string> 형식 (예: { 0: "E", 1: "S", 2: "T" })
 */
export function convertStringArrayToRecord(answers: string[]): Record<number, string> {
  const record: Record<number, string> = {}
  answers.forEach((tag, index) => {
    record[index] = tag
  })
  return record
}

