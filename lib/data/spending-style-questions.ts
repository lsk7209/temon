/**
 * 소비 성향 테스트 질문 데이터
 */

export type OptionTag = 'E' | 'I' | 'S' | 'N' | 'T' | 'F' | 'J' | 'P'

export interface Question {
  id: number
  text: string
  options: { label: string; tag: OptionTag }[]
}

export const SPENDING_STYLE_QUESTIONS: Question[] = [
  {
    id: 1,
    text: "장바구니에 담긴 물건은",
    options: [
      { label: "구매 시점 정해둠", tag: "J" },
      { label: "기분 좋을 때 결제", tag: "P" },
    ],
  },
  {
    id: 2,
    text: "세일 소식을 보면",
    options: [
      { label: "평소 필요 목록과 대조", tag: "S" },
      { label: "새로운 대체품도 탐색", tag: "N" },
    ],
  },
  {
    id: 3,
    text: "큰 금액 지출 전",
    options: [
      { label: "스펙, 후기, AS를 비교", tag: "T" },
      { label: "실사용 후기를 감으로 판단", tag: "F" },
    ],
  },
  {
    id: 4,
    text: "구독 서비스는",
    options: [
      { label: "사용량 기준으로 엄격 관리", tag: "J" },
      { label: "쓰다 보면 가치가 생김", tag: "P" },
    ],
  },
  {
    id: 5,
    text: "가격 협상/혜택",
    options: [
      { label: "직접 문의해 적극 확보", tag: "E" },
      { label: "조용히 정보만 모아 적용", tag: "I" },
    ],
  },
  {
    id: 6,
    text: "충동구매 유혹",
    options: [
      { label: "예산 규칙 재확인", tag: "T" },
      { label: "오늘만은 나에게 보상", tag: "F" },
    ],
  },
  {
    id: 7,
    text: "신제품 출시",
    options: [
      { label: "성능·가성비 검증 후", tag: "S" },
      { label: "초기 사용자 리뷰를 추적", tag: "N" },
    ],
  },
  {
    id: 8,
    text: "여행 예산",
    options: [
      { label: "상세 카테고리 사전 배분", tag: "J" },
      { label: "현지 상황 보며 탄력 운영", tag: "P" },
    ],
  },
  {
    id: 9,
    text: "포인트/마일리지",
    options: [
      { label: "체계적 적립·소진 루틴", tag: "S" },
      { label: "이벤트 중심으로 즉시 사용", tag: "N" },
    ],
  },
  {
    id: 10,
    text: "선물 구매",
    options: [
      { label: "실용성과 내구성 우선", tag: "T" },
      { label: "의미·상징성을 중시", tag: "F" },
    ],
  },
  {
    id: 11,
    text: "쇼핑 채널",
    options: [
      { label: "라이브·매장 등 소통형", tag: "E" },
      { label: "비교 사이트·커뮤니티형", tag: "I" },
    ],
  },
  {
    id: 12,
    text: "월말 결산",
    options: [
      { label: "지출 리포트로 교정", tag: "J" },
      { label: "다음 달에 보며 감각 조절", tag: "P" },
    ],
  },
]

