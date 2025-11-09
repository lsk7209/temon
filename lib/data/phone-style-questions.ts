/**
 * 스마트폰 사용 스타일 테스트 질문 데이터
 */

export type OptionTag = 'E' | 'I' | 'S' | 'N' | 'T' | 'F' | 'J' | 'P'

export interface Question {
  id: number
  text: string
  options: { label: string; tag: OptionTag }[]
}

export const PHONE_STYLE_QUESTIONS: Question[] = [
  {
    id: 1,
    text: "홈 화면 구성 방식은",
    options: [
      { label: "카테고리별 폴더로 정리", tag: "J" },
      { label: "자주 쓰는 것만 늘어놓음", tag: "P" },
    ],
  },
  {
    id: 2,
    text: "새 앱을 알게 되면",
    options: [
      { label: "리뷰/권한/업데이트 기록 먼저 확인", tag: "S" },
      { label: "일단 깔아보고 감으로 판단", tag: "N" },
    ],
  },
  {
    id: 3,
    text: "단톡 알림 폭주 시",
    options: [
      { label: "바로 끼어들어 정리 제안", tag: "E" },
      { label: "조용히 무음/나가기 고려", tag: "I" },
    ],
  },
  {
    id: 4,
    text: "배터리 급감 원인 분석",
    options: [
      { label: "소비 전력 로그로 원인 추적", tag: "T" },
      { label: "당분간 절전모드로 감정적 안정", tag: "F" },
    ],
  },
  {
    id: 5,
    text: "수면 중 알림 설정",
    options: [
      { label: "취침모드 고정, 규칙 유지", tag: "J" },
      { label: "그때그때 필요에 따라", tag: "P" },
    ],
  },
  {
    id: 6,
    text: "기기 바꿀 때",
    options: [
      { label: "사양표/벤치마크부터", tag: "S" },
      { label: "디자인/그립/무드 우선", tag: "N" },
    ],
  },
  {
    id: 7,
    text: "사진 정리",
    options: [
      { label: "공유 앨범 만들어 같이 정리", tag: "E" },
      { label: "혼자 골라서 보관", tag: "I" },
    ],
  },
  {
    id: 8,
    text: "충돌/오류 발생",
    options: [
      { label: "재현 절차 기록 후 해결책 탐색", tag: "T" },
      { label: "앱 교체하거나 우선 넘어감", tag: "F" },
    ],
  },
  {
    id: 9,
    text: "캘린더/투두",
    options: [
      { label: "고정 템플릿과 리마인더", tag: "J" },
      { label: "당일 기분대로 간단 메모", tag: "P" },
    ],
  },
  {
    id: 10,
    text: "뉴스/정보 소비",
    options: [
      { label: "원문 기사/자료 위주", tag: "S" },
      { label: "요약/숏폼 먼저", tag: "N" },
    ],
  },
  {
    id: 11,
    text: "약속 장소 공유",
    options: [
      { label: "위치 공유/보이스로 즉시 전달", tag: "E" },
      { label: "필요 시에만 조용히 공유", tag: "I" },
    ],
  },
  {
    id: 12,
    text: "위젯 사용",
    options: [
      { label: "핵심만 고정 셋업", tag: "T" },
      { label: "보기 좋아 보이면 추가", tag: "F" },
    ],
  },
]

