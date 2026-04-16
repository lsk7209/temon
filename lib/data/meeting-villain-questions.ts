/**
 * 회의 빌런 테스트 질문 데이터
 */

export type OptionTag = 'E' | 'I' | 'S' | 'N' | 'T' | 'F' | 'J' | 'P'

export interface Question {
    id: number
    text: string
    options: { label: string; tag: OptionTag }[]
}

export const MEETING_VILLAIN_QUESTIONS: Question[] = [
    {
        id: 1,
        text: "회의 시작 5분 전, 나는?",
        options: [
            { label: "미리 도착해서 스몰토크 주도", tag: "E" },
            { label: "조용히 자리에 앉아 자료 검토", tag: "I" },
        ],
    },
    {
        id: 2,
        text: "회의 중 새로운 아이디어가 떠올랐을 때",
        options: [
            { label: "일단 손들고 바로 말한다", tag: "E" },
            { label: "생각을 정리한 뒤 적절한 타이밍을 본다", tag: "I" },
        ],
    },
    {
        id: 3,
        text: "회의 안건을 볼 때 더 중요한 것은?",
        options: [
            { label: "구체적인 데이터와 팩트", tag: "S" },
            { label: "전체적인 흐름과 비전", tag: "N" },
        ],
    },
    {
        id: 4,
        text: "회의록을 작성해야 한다면?",
        options: [
            { label: "나온 이야기 그대로 꼼꼼히 기록", tag: "S" },
            { label: "핵심 요약과 인사이트 위주로 기록", tag: "N" },
        ],
    },
    {
        id: 5,
        text: "동료의 의견에 반박해야 할 때",
        options: [
            { label: "논리적 모순을 지적하며 팩트로 반박", tag: "T" },
            { label: "기분 상하지 않게 돌려 말하며 반박", tag: "F" },
        ],
    },
    {
        id: 6,
        text: "회의 분위기가 험악해질 때",
        options: [
            { label: "잘못된 점을 짚어 문제를 해결하려 함", tag: "T" },
            { label: "중재하며 분위기를 풀려고 노력함", tag: "F" },
        ],
    },
    {
        id: 7,
        text: "회의 일정 잡을 때 선호하는 방식",
        options: [
            { label: "미리 정해진 시간에 규칙적으로", tag: "J" },
            { label: "필요할 때마다 유동적으로", tag: "P" },
        ],
    },
    {
        id: 8,
        text: "회의 결론이 나지 않고 끝난다면?",
        options: [
            { label: "다음 일정과 액션 아이템을 확실히 정해야 마음이 편함", tag: "J" },
            { label: "일단 논의된 것만으로도 의미 있다고 생각함", tag: "P" },
        ],
    },
    {
        id: 9,
        text: "나에게 이상적인 회의는?",
        options: [
            { label: "모두가 활발하게 의견을 나누는 브레인스토밍", tag: "E" },
            { label: "각자 준비한 내용을 차분히 공유하는 보고", tag: "I" },
        ],
    },
    {
        id: 10,
        text: "회의 자료를 준비할 때",
        options: [
            { label: "과거 사례와 데이터를 철저히 조사", tag: "S" },
            { label: "새로운 트렌드와 가능성에 초점", tag: "N" },
        ],
    },
    {
        id: 11,
        text: "의사결정 기준",
        options: [
            { label: "효율성과 성과가 최우선", tag: "T" },
            { label: "팀원들의 합의와 관계가 중요", tag: "F" },
        ],
    },
    {
        id: 12,
        text: "회의 준비 정도",
        options: [
            { label: "시나리오별 대처 방안까지 준비", tag: "J" },
            { label: "핵심 흐름만 파악하고 현장에서 대응", tag: "P" },
        ],
    },
]
