/**
 * 주식 투자 스타일 테스트 질문 데이터
 */

export type OptionTag = 'E' | 'I' | 'S' | 'N' | 'T' | 'F' | 'J' | 'P'

export interface Question {
    id: number
    text: string
    options: { label: string; tag: OptionTag }[]
}

export const INVESTMENT_STYLE_QUESTIONS: Question[] = [
    {
        id: 1,
        text: "투자 정보를 얻는 주된 경로",
        options: [
            { label: "주식 단톡방, 커뮤니티, 지인 추천", tag: "E" },
            { label: "혼자 뉴스 기사, 리포트, 공시 분석", tag: "I" },
        ],
    },
    {
        id: 2,
        text: "매수 버튼을 누르기 직전",
        options: [
            { label: "차트, 재무제표 등 팩트 한번 더 확인", tag: "S" },
            { label: "왠지 오를 것 같은 느낌적인 느낌!", tag: "N" },
        ],
    },
    {
        id: 3,
        text: "보유 종목이 -20% 폭락했을 때",
        options: [
            { label: "추가 매수 기회인가? 손절 라인인가? (계산)", tag: "T" },
            { label: "아... 내 돈... (속이 쓰리고 우울함)", tag: "F" },
        ],
    },
    {
        id: 4,
        text: "투자 수익금으로 하고 싶은 것",
        options: [
            { label: "친구들에게 거하게 한턱 쏘기", tag: "E" },
            { label: "통장에 꽂아두고 혼자 흐뭇해하기", tag: "I" },
        ],
    },
    {
        id: 5,
        text: "급등주를 발견했을 때",
        options: [
            { label: "근거 없는 상승은 위험해. 구경만 함", tag: "T" },
            { label: "지금 안 타면 바보! 탑승 완료", tag: "F" },
        ],
    },
    {
        id: 6,
        text: "투자 포트폴리오 관리",
        options: [
            { label: "섹터별 비중, 현금 비중 철저히 계획", tag: "J" },
            { label: "그때그때 좋아 보이는 걸로 채움", tag: "P" },
        ],
    },
    {
        id: 7,
        text: "새로운 산업(AI, 바이오 등)에 투자할 때",
        options: [
            { label: "현재 실적과 숫자 확인 필수", tag: "S" },
            { label: "미래 성장 가능성과 스토리에 베팅", tag: "N" },
        ],
    },
    {
        id: 8,
        text: "매도 타이밍 결정",
        options: [
            { label: "목표가 도달 시 뒤도 안 돌아보고 매도", tag: "J" },
            { label: "더 오를 것 같은데? 조금만 더...", tag: "P" },
        ],
    },
    {
        id: 9,
        text: "손실 중인 종목을 볼 때",
        options: [
            { label: "과거 데이터 기반으로 반등 시점 예측", tag: "S" },
            { label: "언젠간 오르겠지... 행복회로 가동", tag: "N" },
        ],
    },
    {
        id: 10,
        text: "투자 실패 경험 공유",
        options: [
            { label: "내가 왜 실패했는지 분석해서 썰 풂", tag: "T" },
            { label: "나 너무 슬퍼... 위로해줘...", tag: "F" },
        ],
    },
    {
        id: 11,
        text: "오랜만의 동창회, 주식 이야기가 나오면?",
        options: [
            { label: "내가 아는 정보 대방출 (토론 주도)", tag: "E" },
            { label: "조용히 듣다가 꿀정보만 줍줍", tag: "I" },
        ],
    },
    {
        id: 12,
        text: "배당금 입금 알림이 왔을 때",
        options: [
            { label: "재투자 계획 수립", tag: "J" },
            { label: "오 꽁돈! 오늘 치킨각", tag: "P" },
        ],
    },
]
