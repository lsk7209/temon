/**
 * 이별 후유증 유형 테스트 질문 데이터
 */

export type OptionTag = 'E' | 'I' | 'S' | 'N' | 'T' | 'F' | 'J' | 'P'

export interface Question {
    id: number
    text: string
    options: { label: string; tag: OptionTag }[]
}

export const BREAKUP_STYLE_QUESTIONS: Question[] = [
    {
        id: 1,
        text: "이별 직후, 가장 먼저 하는 일은?",
        options: [
            { label: "친구들에게 연락해서 술 약속 잡기", tag: "E" },
            { label: "혼자 방에 틀어박혀 슬픈 노래 듣기", tag: "I" },
        ],
    },
    {
        id: 2,
        text: "전 애인과의 추억 물건들은?",
        options: [
            { label: "눈에 안 보이게 즉시 폐기/보관함행", tag: "S" },
            { label: "언젠가 생각날 수 있으니 일단 둠", tag: "N" },
        ],
    },
    {
        id: 3,
        text: "이별의 원인을 분석할 때",
        options: [
            { label: "우리가 안 맞았던 점들을 객관적으로 따져봄", tag: "T" },
            { label: "그때의 감정과 상황을 계속 곱씹음", tag: "F" },
        ],
    },
    {
        id: 4,
        text: "주말에 시간이 비었을 때",
        options: [
            { label: "밀린 약속을 잡거나 밖으로 나감", tag: "E" },
            { label: "집에서 넷플릭스 보며 에너지 충전", tag: "I" },
        ],
    },
    {
        id: 5,
        text: "전 애인에게 연락이 온다면?",
        options: [
            { label: "무슨 일인지 확인하고 이성적으로 대응", tag: "T" },
            { label: "심장이 쿵 내려앉으며 온갖 생각 듦", tag: "F" },
        ],
    },
    {
        id: 6,
        text: "이별 후 나의 일상은",
        options: [
            { label: "원래 루틴대로 바쁘게 지냄", tag: "J" },
            { label: "손에 잡히는 대로, 기분 내키는 대로", tag: "P" },
        ],
    },
    {
        id: 7,
        text: "새로운 만남에 대한 생각",
        options: [
            { label: "사람은 사람으로 잊는 것! 소개팅 환영", tag: "E" },
            { label: "아직 마음의 정리가 필요해... 당분간 솔로", tag: "I" },
        ],
    },
    {
        id: 8,
        text: "카톡 차단/삭제 여부",
        options: [
            { label: "깔끔하게 차단 및 번호 삭제", tag: "J" },
            { label: "차단은 좀 그렇고... 숨김 처리?", tag: "P" },
        ],
    },
    {
        id: 9,
        text: "이별 후 가장 힘든 것",
        options: [
            { label: "현실적으로 변해버린 일상 (데이트, 연락 X)", tag: "S" },
            { label: "앞으로 사랑을 다시 할 수 있을까 하는 막막함", tag: "N" },
        ],
    },
    {
        id: 10,
        text: "친구들이 위로해줄 때 듣고 싶은 말",
        options: [
            { label: "'걔는 너한테 이런 점이 별로였어' (팩트 위로)", tag: "T" },
            { label: "'많이 힘들지? 네 마음 다 알아' (공감 위로)", tag: "F" },
        ],
    },
    {
        id: 11,
        text: "이별을 실감하는 순간",
        options: [
            { label: "같이 가던 맛집이나 장소를 지나갈 때", tag: "S" },
            { label: "문득 사랑이란 무엇인가 철학적 고민이 들 때", tag: "N" },
        ],
    },
    {
        id: 12,
        text: "이별 극복이란?",
        options: [
            { label: "정해진 애도 기간이 지나면 끝나는 프로젝트", tag: "J" },
            { label: "자연스럽게 흐려지길 기다리는 과정", tag: "P" },
        ],
    },
]
