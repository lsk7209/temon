export interface ResultType {
  mbti: string
  name: string
  summary: string
  traits: string[]
  presets: {
    shopping: string[]
    criteria: string[]
    warning: string[]
  }
  pitfalls: string[]
  recommend: string[]
}

const FOOD_BRAND_LABELS: Record<string, { name: string; summary: string }> = {
  ISTJ: { name: "검증 집착형", summary: "리뷰·성분표를 끝까지 확인하는 안정추구형" },
  ISFJ: { name: "정착 수호형", summary: "한 번 맞으면 오래 쓰는 브랜드 충성형" },
  INFJ: { name: "가치 탐색형", summary: "브랜드 철학과 스토리를 중요하게 보는 타입" },
  INTJ: { name: "데이터 설계형", summary: "가격/품질/재구매 주기를 계산하는 타입" },
  ISTP: { name: "실전 체험형", summary: "광고보다 실제 써보고 판단하는 타입" },
  ISFP: { name: "감각 취향형", summary: "패키지/식감/분위기까지 중요하게 보는 타입" },
  INFP: { name: "의미 소비형", summary: "내 취향과 맞는 브랜드 서사를 찾는 타입" },
  INTP: { name: "비교 분석형", summary: "카테고리별 장단점을 끝없이 비교하는 타입" },
  ESTP: { name: "핫딜 사냥형", summary: "행사·쿠폰·가성비에 즉각 반응하는 타입" },
  ESFP: { name: "트렌드 체험형", summary: "신상·화제 제품을 먼저 즐기는 타입" },
  ENFP: { name: "호기심 확장형", summary: "다양한 브랜드를 넓게 시도하는 타입" },
  ENTP: { name: "실험 도전형", summary: "독특한 콘셉트 브랜드에 끌리는 타입" },
  ESTJ: { name: "기준 관리형", summary: "예산과 품질 기준을 엄격히 지키는 타입" },
  ESFJ: { name: "공유 추천형", summary: "주변 평판과 추천을 반영해 선택하는 타입" },
  ENFJ: { name: "밸런스 조율형", summary: "취향과 실용을 함께 맞추는 타입" },
  ENTJ: { name: "효율 최적화형", summary: "최소 비용으로 최대 만족을 설계하는 타입" },
}

export const FOOD_BRAND_RESULTS: Record<string, ResultType> = Object.fromEntries(
  Object.entries(FOOD_BRAND_LABELS).map(([mbti, label]) => [
    mbti,
    {
      mbti,
      name: label.name,
      summary: label.summary,
      traits: [
        mbti.includes("S") ? "검증된 브랜드 선호" : "새 브랜드 탐색 선호",
        mbti.includes("T") ? "근거 중심 선택" : "경험 중심 선택",
        mbti.includes("J") ? "일관된 구매 루틴" : "상황별 유연한 선택",
      ],
      presets: {
        shopping: [
          mbti.includes("E") ? "오프라인 체험·추천 적극 활용" : "혼자 비교 후 신중 구매",
          mbti.includes("N") ? "신상/콜라보 제품 관심" : "기존 검증 제품 재구매",
        ],
        criteria: [
          "가격 대비 만족도 체크",
          mbti.includes("T") ? "성분/원산지/리뷰 우선" : "브랜드 무드/경험 가치 우선",
        ],
        warning: ["과소비 주의", "결과는 재미 요소로 활용"],
      },
      pitfalls: [mbti.includes("J") ? "즉흥 충동형" : "과도한 완벽주의형"],
      recommend: [mbti.includes("E") ? "I 균형형" : "E 균형형"],
    },
  ]),
)
