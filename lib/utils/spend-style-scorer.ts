/**
 * 소비 성향 테스트 스코어러
 * 동점 시 기본 규칙: E>I, S>N, T>F, J>P 우선
 */

import type { OptionTag } from "@/lib/data/spend-style-questions"

export function decideType(answers: OptionTag[]): string {
  const score = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 }

  answers.forEach((tag) => {
    score[tag as keyof typeof score]++
  })

  // 동점 시 좌측 우선: E>S>T>J
  const EorI = score.E >= score.I ? "E" : "I"
  const SorN = score.S >= score.N ? "S" : "N"
  const TorF = score.T >= score.F ? "T" : "F"
  const JorP = score.J >= score.P ? "J" : "P"

  return `${EorI}${SorN}${TorF}${JorP}`
}

