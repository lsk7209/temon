export const MBTI_LABELS: Record<string, string> = {
  ISTJ: "원칙형", ISFJ: "배려형", INFJ: "통찰형", INTJ: "전략형",
  ISTP: "해결형", ISFP: "감성형", INFP: "이상형", INTP: "분석형",
  ESTP: "행동형", ESFP: "분위기형", ENFP: "아이디어형", ENTP: "도전형",
  ESTJ: "관리형", ESFJ: "조율형", ENFJ: "리더형", ENTJ: "지휘형",
}

export function buildGenericMbtiResultMap(
  domain: string,
  presetKeys: [string, string, string],
): Record<string, { mbti: string; name: string; summary: string; traits: string[]; presets: Record<string, string[]>; pitfalls: string[]; recommend: string[] }> {
  const keys = Object.keys(MBTI_LABELS)
  return Object.fromEntries(
    keys.map((mbti) => {
      const [a, b, c, d] = mbti.split("")
      const i1 = a === "E" ? "대외적" : "내향적"
      const i2 = b === "N" ? "직관적" : "현실적"
      const i3 = c === "F" ? "감성적" : "논리적"
      const i4 = d === "P" ? "유연한" : "계획적인"
      return [
        mbti,
        {
          mbti,
          name: `${domain} ${MBTI_LABELS[mbti]}`,
          summary: `${i1}이고 ${i2}이며 ${i3} 판단을 하는 ${i4} ${domain} 타입`,
          traits: [`${i1} 반응`, `${i2} 선택`, `${i3} 의사결정`, `${i4} 실행`],
          presets: {
            [presetKeys[0]]: [`${domain}에서 ${i2} 접근을 선호해요`, `${i4} 루틴으로 안정감을 만들어요`],
            [presetKeys[1]]: [`${i3} 기준으로 상황을 해석해요`, `${i1} 에너지 흐름을 관리해요`],
            [presetKeys[2]]: [`무리하지 않는 강도 조절`, `자신만의 페이스 유지`],
          },
          pitfalls: [mbti.startsWith("E") ? "I***" : "E***"],
          recommend: [mbti.startsWith("T") ? "F***" : "T***"],
        },
      ]
    }),
  )
}
