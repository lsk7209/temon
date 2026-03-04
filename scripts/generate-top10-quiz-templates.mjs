import { existsSync, mkdirSync, writeFileSync } from "node:fs"
import { join } from "node:path"

const ROOT = process.cwd()
const TESTS_DIR = join(ROOT, "app", "tests")

const MBTI_TYPES = ["ISTJ","ISFJ","INFJ","INTJ","ISTP","ISFP","INFP","INTP","ESTP","ESFP","ENFP","ENTP","ESTJ","ESFJ","ENFJ","ENTJ"]

const QUIZZES = [
  {
    slug: "sleep-position-style",
    title: "잠버릇 자세 성향 테스트",
    intro: "잠드는 자세와 뒤척임 습관으로 알아보는 나의 수면 성향",
    icon: "😴",
    questions: [
      "잠들기 직전 가장 편한 자세는?",
      "베개 높이가 안 맞으면 나는?",
      "자다가 자주 깨는 이유는 보통?",
      "이불 온도가 조금 불편하면?",
      "낯선 숙소에서 잠들 때 나는?",
      "옆사람의 뒤척임이 느껴지면?",
      "알람 전 자연 기상했을 때의 기분은?",
      "꿈을 꾼 날 아침엔?",
      "피곤한 날 잠드는 속도는?",
      "낮잠이 필요할 때 내 방식은?",
      "수면 앱/기록을 본다면?",
      "숙면을 위해 가장 먼저 바꾸는 것은?"
    ],
    frames: ["루틴 수호형","포근 케어형","감각 통찰형","수면 최적화형","즉시 회복형","감성 포근형","몽상 힐링형","패턴 분석형","파워냅 액션형","기분 전환형","리듬 탐험형","실험 개척형","시간 관리형","함께 숙면형","컨디션 코치형","성과 회복형"],
    theme: "blue"
  },
  {
    slug: "desk-organizing-style",title: "책상 정리 성향 테스트",intro:"책상 배치 습관으로 보는 나의 생산성 성향",icon:"🗂️",theme:"green",
    questions:["아침에 책상에 앉자마자 먼저 하는 일은?","펜/메모/충전기 위치가 흐트러지면?","서류가 쌓이면 정리 기준은?","모니터/노트북 배치는 어떻게?","데스크테리어 소품은 어떤 기준으로?","급한 업무 중 물건이 안 보이면?","책상 청소 주기는?","디지털 파일 정리와 책상 정리는?","공용 책상 사용 시 내 반응은?","집중이 안 될 때 정리 행동은?","퇴근 직전 책상 상태는?","이상적인 책상 한 줄 정의는?"],
    frames:["구조 정렬형","배려 정돈형","의미 배치형","시스템 설계형","실용 최소형","감성 큐레이션형","영감 보관형","개념 클러스터형","즉응 작업형","분위기 연출형","아이디어 확장형","실험 레이아웃형","효율 통제형","협업 친화형","팀 동기형","성과 지휘형"]
  },
  {slug:"email-reply-style",title:"이메일 답장 스타일 테스트",intro:"메일 답장 습관으로 알아보는 업무 커뮤니케이션 성향",icon:"📧",theme:"purple",questions:["메일함에 새 메일이 오면 가장 먼저?","제목이 모호한 메일을 받으면?","답장 톤을 정할 때 기준은?","참조(CC) 인원이 많을 때 작성 방식은?","긴 메일을 받으면 내 처리 방식은?","급한 요청 메일의 답장 우선순위는?","첨부파일 누락 발견 시 대처는?","오해 소지가 있는 문장은 어떻게?","회신 지연이 예상될 때 행동은?","감사/사과 표현을 쓰는 기준은?","메일 템플릿 사용 여부는?","이상적인 이메일 커뮤니케이션은?"],frames:["정확 회신형","배려 문안형","맥락 통합형","핵심 요약형","간결 처리형","부드러운 표현형","진정성 전달형","논리 정제형","신속 대응형","친화 소통형","확장 제안형","대안 제시형","기준 관리형","관계 조율형","협업 촉진형","의사결정형"]},
  {slug:"travel-packing-style",title:"여행 짐싸기 스타일 테스트",intro:"짐싸기 방식으로 알아보는 여행 성향",icon:"🧳",theme:"pink",questions:["여행 준비 시작 시점은?","짐 리스트를 만드는 편인가?","옷 선택 기준은?","비상약/상비품 준비 정도는?","짐이 많아질 때 우선 포기하는 것은?","전자기기/충전기 챙기는 방식은?","기내용/위탁 수하물 전략은?","현지 날씨 변수 대응은?","기념품 공간을 미리 비워두는가?","공항 도착 전 체크하는 것 1순위는?","동행인 짐싸기에 개입하는가?","내 짐싸기 한 줄 설명은?"],frames:["체크리스트 완성형","돌봄 준비형","의미 여행형","최적 동선형","경량 실전형","감성 소품형","스토리 수집형","상황 가설형","현장 적응형","무드 연출형","모험 확장형","변수 실험형","일정 통제형","동행 케어형","팀 분위기형","목표 달성형"]},
  {slug:"online-shopping-cart-style",title:"장바구니 관리 성향 테스트",intro:"담기-비우기-결제 패턴으로 보는 쇼핑 성향",icon:"🛒",theme:"red",questions:["장바구니에 상품을 담는 이유는?","위시리스트와 장바구니의 차이는?","할인 알림이 오면 반응은?","결제 전 비교하는 항목 1순위는?","무료배송 기준을 맞출 때 행동은?","충동구매를 막는 나만의 방식은?","리뷰를 읽는 깊이는?","재구매 상품 관리 방식은?","반품 가능성이 있으면?","결제 타이밍을 정하는 기준은?","동행 쇼핑 제안 시 반응은?","이상적인 온라인 쇼핑 경험은?"],frames:["기준 검증형","실속 배려형","가치 소비형","장기 최적형","기능 우선형","취향 만족형","의미 지향형","분석 탐색형","즉시 실행형","재미 발견형","신상 탐험형","실험 구매형","예산 통제형","공유 쇼핑형","추천 큐레이터형","성과 중심형"]},
  {slug:"deadline-management-style",title:"마감 관리 성향 테스트",intro:"마감 압박 대응으로 알아보는 실행 성향",icon:"⏰",theme:"green",questions:["마감이 생기면 가장 먼저 하는 일은?","작업 분량을 나누는 기준은?","예상보다 지연될 때 대처는?","집중 시간이 깨질 때 복구 방법은?","멀티태스킹 vs 단일태스킹 선호는?","중간 점검을 하는 빈도는?","막판 품질 점검에 쓰는 시간은?","협업 의존 작업에서 내 역할은?","리스크를 발견하면 공유 타이밍은?","마감 후 회고를 하는가?","반복되는 지연 원인 기록 여부는?","이상적인 마감 문화는?"],frames:["일정 준수형","안정 지원형","흐름 조율형","전략 설계형","문제 해결형","몰입 완성형","의미 추진형","구조 개선형","스퍼트 실행형","에너지 환기형","아이디어 가속형","대안 전환형","통제 리더형","커뮤니케이션형","동기 부여형","결과 지휘형"]},
  {slug:"subscription-management-style",title:"구독 서비스 관리 성향 테스트",intro:"구독 유지/해지 패턴으로 보는 관리 성향",icon:"💳",theme:"purple",questions:["새 구독 서비스를 시작하는 기준은?","무료체험 종료 직전 대응은?","사용 빈도가 낮아지면?","구독료 인상 안내를 받으면?","중복 기능 서비스 발견 시?","가족/팀 요금제 선호는?","결제일/갱신일 관리 방식은?","구독 서비스 평가 주기는?","해지 결정을 내리는 트리거는?","대체 서비스 탐색 습관은?","구독 예산 상한을 두는가?","이상적인 구독 포트폴리오는?"],frames:["체계 점검형","실용 유지형","가치 선별형","포트폴리오형","기능 압축형","취향 큐레이션형","만족 중심형","효율 분석형","즉시 조정형","경험 확장형","신서비스 탐험형","실험 스위칭형","비용 통제형","공유 최적형","팀 편의형","성과 투자형"]},
  {slug:"focus-music-style",title:"집중 음악 취향 테스트",intro:"집중할 때 듣는 사운드로 보는 몰입 성향",icon:"🎧",theme:"blue",questions:["집중할 때 가장 자주 트는 장르는?","가사가 있는 음악은 집중에 어떤 영향?","볼륨을 정하는 기준은?","작업 난이도에 따라 음악을 바꾸는가?","반복 재생을 선호하는가?","백색소음/자연음 사용 여부는?","플레이리스트 길이는 어느 정도?","음악 없이 집중이 더 잘 되는 순간은?","이어폰/스피커 선택 기준은?","집중이 깨졌을 때 곡 전환 습관은?","시간대별 선호 사운드가 다른가?","내게 가장 좋은 집중 사운드 환경은?"],frames:["루틴 플레이형","안정 리듬형","감정 정렬형","몰입 최적형","저자극 실용형","감성 몰입형","서사 공감형","구조 집중형","비트 추진형","에너지 환기형","무드 확장형","장르 실험형","성과 동기형","함께 집중형","분위기 리더형","목표 가속형"]},
  {slug:"memory-keeping-style",title:"추억 보관 스타일 테스트",intro:"기록 습관으로 알아보는 감정/정리 성향",icon:"📸",theme:"pink",questions:["특별한 날을 기록하는 주된 방식은?","사진 정리 주기는?","캡션/메모를 남기는 편인가?","물리적 기념품 보관 여부는?","추억 콘텐츠를 공유하는 기준은?","오래된 기록을 다시 보는 빈도는?","삭제/정리 결정을 내리는 기준은?","프라이버시와 공유의 균형은?","추억 기록 도구를 선택하는 기준은?","실패/아쉬운 기억도 남기는가?","연말 회고 기록 습관은?","내게 좋은 추억 보관이란?"],frames:["연대기 정리형","소중 보관형","의미 해석형","아카이브 설계형","핵심 기록형","감성 수집형","서정 서사형","태그 구조형","순간 포착형","공유 즐거움형","스토리 확장형","기록 실험형","체계 관리형","관계 공유형","공감 기록형","성과 회고형"]},
  {slug:"digital-detox-style",title:"디지털 디톡스 성향 테스트",intro:"디지털 휴식 전략으로 보는 자기관리 성향",icon:"📵",theme:"green",questions:["디지털 피로를 느끼는 순간은?","알림 설정을 관리하는 방식은?","SNS 휴식이 필요할 때 행동은?","잠들기 전 디바이스 사용 습관은?","집중 시간에 폰을 두는 위치는?","디톡스 실패 원인을 분석하는가?","주말 디지털 사용 계획을 세우는가?","대체 활동 전환 방식은?","주변에 디톡스 의지를 공유하는가?","재발 방지를 위한 규칙은?","앱 삭제/재설치 기준은?","내게 건강한 디지털 밸런스란?"],frames:["규칙 실천형","균형 돌봄형","내면 정리형","시스템 차단형","기능 최소형","감성 회복형","의미 전환형","패턴 분석형","행동 전환형","관계 재충전형","루틴 재설계형","실험 디톡스형","목표 통제형","함께 실천형","동기 확산형","성과 최적형"]}
]

const AXES = [["E","I"],["S","N"],["T","F"],["J","P"]]

const themeClass = {
  blue: "blue-indigo-purple",
  red: "red-orange-yellow",
  green: "green-emerald-teal",
  purple: "purple-pink-violet",
  pink: "pink-rose-red",
}

function pascal(str) {
  return str.split("-").map((s) => s.charAt(0).toUpperCase() + s.slice(1)).join("")
}

for (const quiz of QUIZZES) {
  const quizDir = join(TESTS_DIR, quiz.slug)
  const testDir = join(quizDir, "test")
  const resultDir = join(testDir, "result")

  mkdirSync(resultDir, { recursive: true })

  const intro = `import { TestIntro } from "@/components/test-intro"

export default function ${pascal(quiz.slug)}Intro() {
  return (
    <TestIntro
      id="${quiz.slug}"
      title="${quiz.icon} ${quiz.title}"
      description="${quiz.intro}"
      questionCount={12}
      avgMinutes={3}
      resultCount={16}
      theme="${quiz.theme}"
    />
  )
}
`

  const questionsJs = quiz.questions.map((q, i) => {
    const axis = AXES[i % AXES.length]
    return `  {
    id: ${i + 1},
    q: ${JSON.stringify(q)},
    a1: { text: "상황을 기준으로 체계적으로 선택한다", tags: ["${axis[0]}"] },
    a2: { text: "감각/직관을 믿고 유연하게 선택한다", tags: ["${axis[1]}"] },
  }`
  }).join(",\n")

  const testPage = `"use client"

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
${questionsJs}
]

export default function ${pascal(quiz.slug)}TestPage() {
  const quizLogic = useQuizLogic({
    testId: "${quiz.slug}",
    questions,
    resultPath: "/tests/${quiz.slug}/test/result",
  })

  return (
    <QuizContainer
      currentQuestion={quizLogic.currentQuestion}
      currentQ={quizLogic.currentQ}
      selectedChoice={quizLogic.selectedChoice}
      isProcessing={quizLogic.isProcessing}
      isSaving={quizLogic.isSaving}
      progress={quizLogic.progress}
      questionsLength={quizLogic.questionsLength}
      colorClasses={getQuizColorScheme("${themeClass[quiz.theme] || "blue-indigo-purple"}")}
      onChoiceSelect={quizLogic.handleChoiceSelect}
      onPrevious={quizLogic.handlePrevious}
    />
  )
}
`

  const resultMap = MBTI_TYPES.map((type, idx) => {
    const pit = MBTI_TYPES[(idx + 1) % MBTI_TYPES.length]
    const rec = MBTI_TYPES[(idx + 2) % MBTI_TYPES.length]
    return `  ${type}: {
    mbti: "${type}",
    name: ${JSON.stringify(quiz.frames[idx])},
    summary: ${JSON.stringify(`${quiz.title}에서 드러난 ${quiz.frames[idx]} 성향입니다.`)},
    traits: ["상황 판단", "선택 패턴", "행동 선호"],
    presets: {
      style: ["기본 루틴", "선호 방식"],
      habit: ["자주 보이는 습관", "강점으로 연결되는 행동"],
      tip: ["과부하를 줄이는 방법", "더 잘 맞는 실행 전략"],
    },
    pitfalls: ["${pit}"],
    recommend: ["${rec}"],
  }`
  }).join(",\n")

  const resultPage = `"use client"

import { MBTIResultPage } from "@/components/mbti-result-page"

const RESULTS = {
${resultMap}
}

export default function ${pascal(quiz.slug)}ResultPage() {
  return (
    <MBTIResultPage
      testId="${quiz.slug}"
      title="${quiz.title}"
      results={RESULTS}
      accentClass="text-${quiz.theme}-600"
      gradientClass="from-${quiz.theme}-50 to-white"
    />
  )
}
`

  writeFileSync(join(quizDir, "page.tsx"), intro, "utf8")
  writeFileSync(join(testDir, "page.tsx"), testPage, "utf8")
  writeFileSync(join(resultDir, "page.tsx"), resultPage, "utf8")

  console.log(`✅ generated: ${quiz.slug}`)
}

console.log(`\n✨ Generated ${QUIZZES.length} quizzes`)
