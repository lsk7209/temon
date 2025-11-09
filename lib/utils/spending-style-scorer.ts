/**
 * 소비 성향 테스트 스코어러
 */

export type OptionTag = 'E' | 'I' | 'S' | 'N' | 'T' | 'F' | 'J' | 'P'

/**
 * 선택한 태그 배열로부터 MBTI 유형 결정
 * 동점 시 E/S/T/J 우선
 */
export function decideType(tags: OptionTag[]): string {
  const s = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 }
  tags.forEach((t) => s[t]++)
  const EI = s.E >= s.I ? 'E' : 'I'
  const SN = s.S >= s.N ? 'S' : 'N'
  const TF = s.T >= s.F ? 'T' : 'F'
  const JP = s.J >= s.P ? 'J' : 'P'
  return `${EI}${SN}${TF}${JP}`
}

