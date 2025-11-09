/**
 * 소비 성향 테스트 질문 데이터
 */

export type OptionTag = 'E' | 'I' | 'S' | 'N' | 'T' | 'F' | 'J' | 'P'

export interface Question {
  id: number
  text: string
  options: { label: string; tag: OptionTag }[]
}

export const SPEND_STYLE_QUESTIONS: Question[] = [
  {
    id: 1,
    text: "세일 시작을 보면",
    options: [
      { label: "계획한 목록 위주로 산다", tag: "J" },
      { label: "현장 분위기 보고 결정한다", tag: "P" },
    ],
  },
  {
    id: 2,
    text: "큰 지출 전 정보 수집",
    options: [
      { label: "스펙·리뷰·가격표부터 본다", tag: "S" },
      { label: "평점 흐름·후기 느낌을 본다", tag: "N" },
    ],
  },
  {
    id: 3,
    text: "새 상품 발견 시",
    options: [
      { label: "주변에 물어보고 토론한다", tag: "E" },
      { label: "혼자 비교표 만들어 본다", tag: "I" },
    ],
  },
  {
    id: 4,
    text: "가격 vs 가치",
    options: [
      { label: "수치로 합리성부터 평가한다", tag: "T" },
      { label: "사용 경험과 만족감을 우선", tag: "F" },
    ],
  },
  {
    id: 5,
    text: "월 예산 집행",
    options: [
      { label: "카테고리별 한도 엄수", tag: "J" },
      { label: "월말에 가볍게 정산", tag: "P" },
    ],
  },
  {
    id: 6,
    text: "한정판 출시",
    options: [
      { label: "내 필요성 기준으로 판단", tag: "S" },
      { label: "FOMO도 고려해 결정", tag: "N" },
    ],
  },
  {
    id: 7,
    text: "공동구매 제안",
    options: [
      { label: "인원 모아 단가 낮추자", tag: "E" },
      { label: "번거로우니 개인구매 선호", tag: "I" },
    ],
  },
  {
    id: 8,
    text: "환불/교환 상황",
    options: [
      { label: "정책 확인 후 절차대로", tag: "T" },
      { label: "점원과 대화로 유연 해결", tag: "F" },
    ],
  },
  {
    id: 9,
    text: "구독 서비스",
    options: [
      { label: "장기 효율 계산 후 결정", tag: "J" },
      { label: "한 달 써보고 감으로 유지", tag: "P" },
    ],
  },
  {
    id: 10,
    text: "가격 변동",
    options: [
      { label: "가격추적 그래프 확인", tag: "S" },
      { label: "체감가가 납득되면 구매", tag: "N" },
    ],
  },
  {
    id: 11,
    text: "친구와 쇼핑",
    options: [
      { label: "의견 조율하며 함께", tag: "E" },
      { label: "각자 보고 나중에 공유", tag: "I" },
    ],
  },
  {
    id: 12,
    text: "충동구매 유혹",
    options: [
      { label: "장바구니 담고 하루 뒤 결정", tag: "T" },
      { label: "지금 기분 좋으면 결제", tag: "F" },
    ],
  },
]

