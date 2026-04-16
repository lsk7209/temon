/**
 * NTRP 테스트 결과 설정 데이터
 */

export interface LevelBand {
  band: [number, number]
  level: string
  title: string
  color: string
  summary: string[]
  strengths: string[]
  weaknesses: string[]
  focus: string[]
}

export interface Persona {
  key: string
  theme: string
  slogan: string
}

export interface Drill {
  name: string
  goal: string
  duration: string
}

export interface DoublesConfig {
  role: string
  patterns: string[]
}

export interface Equipment {
  frame: string
  string: string
  tension: string
  note: string
}

export interface InjuryRisk {
  risk: string
  tip: string
}

export interface KPI {
  name: string
  target: string
}

export interface WeeklyPlan {
  week: number
  focus: string
  micro: string[]
}

export interface Mistake {
  issue: string
  fix: string
}

export const levelBands: LevelBand[] = [
  {
    band: [15, 24],
    level: "1.5",
    title: "입문",
    color: "#7bb661",
    summary: [
      "기초 스트로크 습득 단계",
      "경기 규칙·포지션 이해 필요",
      "라켓 컨트롤과 반응 속도 향상",
    ],
    strengths: ["열정", "기초 체력"],
    weaknesses: ["타점 불안", "백핸드 회피"],
    focus: ["타점/그립", "중립 스윙", "기본 풋워크"],
  },
  {
    band: [25, 34],
    level: "2.5",
    title: "초급",
    color: "#63a250",
    summary: [
      "기본 스트로크 안정화",
      "짧은 랠리 가능",
      "서브 기본 동작 학습",
    ],
    strengths: ["기본기 이해", "학습 의지"],
    weaknesses: ["일관성 부족", "전술 이해 부족"],
    focus: ["일관된 스윙", "발놀림", "서브 정확도"],
  },
  {
    band: [35, 44],
    level: "3.0",
    title: "중하",
    color: "#4b8d45",
    summary: [
      "기본기가 탄탄함",
      "전술 이해 시작",
      "안정적인 플레이 가능",
    ],
    strengths: ["안정적인 기본기", "전술 이해"],
    weaknesses: ["고급 기술 부족", "압박 상황 대응"],
    focus: ["공격/수비 균형", "샷 레퍼토리 확장", "멘탈 강화"],
  },
  {
    band: [45, 54],
    level: "3.5",
    title: "중상",
    color: "#2f6f33",
    summary: [
      "일관성 있는 플레이",
      "전술적 사고 가능",
      "네트 플레이 시도",
    ],
    strengths: ["일관성", "전술적 사고"],
    weaknesses: ["오버히트", "서두른 전진"],
    focus: ["고급 기술", "체력/지구력", "다양한 플레이"],
  },
  {
    band: [55, 64],
    level: "4.0",
    title: "상급",
    color: "#1e5c27",
    summary: [
      "다양한 기술 구사",
      "전략적 플레이",
      "강력한 서브와 리턴",
    ],
    strengths: ["기술 다양성", "전략적 플레이"],
    weaknesses: ["멘탈 게임", "특화 기술 부족"],
    focus: ["고급 전술", "멘탈 강화", "특화 기술"],
  },
  {
    band: [65, 70],
    level: "4.5",
    title: "상위",
    color: "#13481d",
    summary: [
      "높은 수준의 기술",
      "복잡한 전략 구사",
      "뛰어난 코트 커버리지",
    ],
    strengths: ["기술 완성도", "전략 판단력"],
    weaknesses: ["어깨 과사용", "스트레스 관리"],
    focus: ["전문 코칭", "고급 토너먼트", "약점 보완"],
  },
  {
    band: [71, 75],
    level: "5.0+",
    title: "엘리트",
    color: "#0a3514",
    summary: [
      "프로 수준의 기술",
      "고도의 전략적 사고",
      "경기 주도권 장악",
    ],
    strengths: ["완벽한 기술", "뛰어난 정신력"],
    weaknesses: ["부상 관리", "지속적 동기"],
    focus: ["프로 훈련", "전국 대회", "지도자 자격"],
  },
]

export const personas: Record<string, Persona> = {
  "공만 넘기는 성실형": { key: "rallyer", theme: "#1b5e20", slogan: "끝까지 넘기고 또 넘긴다" },
  "수비적 생존형": { key: "defender", theme: "#33691e", slogan: "하나라도 더 받는다" },
  "빠른 공격형": { key: "attacker", theme: "#bf360c", slogan: "기회를 보면 꽂는다" },
  "전술 분석형": { key: "analyst", theme: "#0d47a1", slogan: "읽고, 유도하고, 마무리" },
  "올라운더": { key: "allround", theme: "#6d4c41", slogan: "어디서든 해답을 찾는다" },
}

export const drills: Record<string, Drill[]> = {
  "1.5": [
    { name: "벽치기 50구", goal: "중립 임팩트", duration: "10분" },
    { name: "어프로치+발리 기본", goal: "앞뒤 이동감", duration: "10분" },
    { name: "세컨 서브 트로피 자세", goal: "토스 고정", duration: "10분" },
  ],
  "2.5": [
    { name: "포핸드 크로스 100구", goal: "일관성", duration: "15분" },
    { name: "백핸드 기본 스윙", goal: "그립/자세", duration: "15분" },
    { name: "서브 연속 50구", goal: "정확도", duration: "10분" },
  ],
  "3.0": [
    { name: "크로스 2:2 랠리", goal: "각·깊이", duration: "12분" },
    { name: "서브+1구 패턴", goal: "서브 후 주도", duration: "12분" },
    { name: "로브→오버헤드", goal: "전환/마무리", duration: "8분" },
  ],
  "3.5": [
    { name: "크로스 2:2 랠리", goal: "각·깊이", duration: "12분" },
    { name: "서브+1구 패턴", goal: "서브 후 주도", duration: "12분" },
    { name: "로브→오버헤드", goal: "전환/마무리", duration: "8분" },
  ],
  "4.0": [
    { name: "짧볼 어프로치", goal: "기회 창출", duration: "10분" },
    { name: "리턴 방향 코스", goal: "상대 약점 공략", duration: "10분" },
    { name: "드롭→패싱 리커버", goal: "읽기/대응", duration: "10분" },
  ],
  "4.5": [
    { name: "서브 코스·스핀", goal: "와이드/티", duration: "15분" },
    { name: "리턴 전개", goal: "dtl 리턴", duration: "15분" },
    { name: "패턴화", goal: "서브+3구 패턴", duration: "10분" },
  ],
  "5.0+": [
    { name: "고급 패턴 플레이", goal: "전술 완성도", duration: "20분" },
    { name: "압박 상황 대응", goal: "멘탈 강화", duration: "15분" },
    { name: "실전 경기 시뮬레이션", goal: "경기 감각", duration: "25분" },
  ],
}

export const doubles: Record<string, DoublesConfig> = {
  "2.5": {
    role: "베이스라인 안정형",
    patterns: [
      "서브 후 백사이드 크로스 랠리 유지",
      "상대 발리어 전진 시 로브로 공간 만들기",
      "파트너 네트 포칭 합 구호로 시그널",
    ],
  },
  "3.0": {
    role: "베이스라인 안정형",
    patterns: [
      "서브 후 백사이드 크로스 랠리 유지",
      "상대 발리어 전진 시 로브로 공간 만들기",
      "파트너 네트 포칭 합 구호로 시그널",
    ],
  },
  "3.5": {
    role: "전환형",
    patterns: [
      "리턴 라인 낮게, 3구 전진",
      "I-포메이션 시 서브 코스와 교차",
      "상대 약한쪽을 두 번 연속 공략",
    ],
  },
  "4.0": {
    role: "공격전개형",
    patterns: [
      "서브 wide → 오픈코트 공략",
      "리턴 dtl → 네트러시",
      "중립볼은 하프발리 연결",
    ],
  },
  "4.5": {
    role: "전략 주도형",
    patterns: [
      "서브 코스 다양화 + I-포메이션",
      "리턴 즉시 네트러시",
      "상대 포메이션 파악 후 공략",
    ],
  },
  "5.0+": {
    role: "프로 수준 전략형",
    patterns: [
      "완벽한 포메이션 전환",
      "상대 약점 정밀 공략",
      "의사소통 최적화",
    ],
  },
}

export const equipment: Record<string, Equipment> = {
  "1.5": {
    frame: "라이트(265~285g)·큰헤드(102~107)",
    string: "멀티/소프트 폴리",
    tension: "45~50 lbs",
    note: "진동 흡수 그립 권장",
  },
  "2.5": {
    frame: "라이트(265~285g)·큰헤드(102~107)",
    string: "멀티/소프트 폴리",
    tension: "46~51 lbs",
    note: "진동 흡수 그립 권장",
  },
  "3.0": {
    frame: "밸런스형(290g 내외)",
    string: "멀티+폴리 하이브리드",
    tension: "48~52 lbs",
    note: "컨트롤과 파워 균형",
  },
  "3.5": {
    frame: "밸런스형(290g 내외)",
    string: "멀티+폴리 하이브리드",
    tension: "49~53 lbs",
    note: "컨트롤과 파워 균형",
  },
  "4.0": {
    frame: "상급 컨트롤(300~305g)",
    string: "폴리 1.25~1.28",
    tension: "50~54 lbs",
    note: "스핀/구질 안정",
  },
  "4.5": {
    frame: "상급 컨트롤(300~305g)",
    string: "폴리 1.25~1.28",
    tension: "51~55 lbs",
    note: "스핀/구질 안정",
  },
  "5.0+": {
    frame: "투어계열(305g+)",
    string: "폴리 1.25~1.30",
    tension: "52~55 lbs",
    note: "스트링 컨디션 주기적 점검",
  },
}

export const injuryRisks: Record<string, InjuryRisk[]> = {
  "1.5": [{ risk: "테니스 엘보(초기)", tip: "라켓 가벼움/두꺼운 오버그립/스트링 텐션 낮춤" }],
  "2.5": [{ risk: "테니스 엘보", tip: "라켓 가벼움/두꺼운 오버그립/스트링 텐션 낮춤" }],
  "3.0": [{ risk: "무릎 충격", tip: "하체 강화·쿠션 높은 신발" }],
  "3.5": [{ risk: "무릎 충격 증가", tip: "하체 강화·쿠션 높은 신발·점프 착지 교육" }],
  "4.0": [{ risk: "어깨 과사용", tip: "서브 볼륨 관리·회전근개 강화 루틴" }],
  "4.5": [{ risk: "어깨 과사용", tip: "서브 볼륨 관리·회전근개 강화 루틴" }],
  "5.0+": [{ risk: "전신 피로 누적", tip: "회복 관리·스트레칭·영양 관리" }],
}

export const kpis: Record<string, KPI[]> = {
  "2.5": [
    { name: "퍼스트 서브 인률", target: "50%+" },
    { name: "리턴 인플레이", target: "65%+" },
    { name: "UE/위너 비", target: "≤ 2.5" },
  ],
  "3.0": [
    { name: "퍼스트 서브 인률", target: "55%+" },
    { name: "리턴 인플레이", target: "70%+" },
    { name: "UE/위너 비", target: "≤ 2.0" },
  ],
  "3.5": [
    { name: "퍼스트 서브 인률", target: "60%+" },
    { name: "세컨 서브 더블폴트", target: "≤ 1/게임" },
    { name: "네트 포인트 득점률", target: "50%+" },
  ],
  "4.0": [
    { name: "퍼스트 서브 인률", target: "65%+" },
    { name: "세컨 서브 더블폴트", target: "≤ 0.5/게임" },
    { name: "네트 포인트 득점률", target: "60%+" },
  ],
  "4.5": [
    { name: "퍼스트 서브 인률", target: "70%+" },
    { name: "브레이크 포인트 저장률", target: "60%+" },
    { name: "네트 포인트 득점률", target: "70%+" },
  ],
  "5.0+": [
    { name: "퍼스트 서브 인률", target: "75%+" },
    { name: "브레이크 포인트 저장률", target: "70%+" },
    { name: "네트 포인트 득점률", target: "80%+" },
  ],
}

export const weeklyPlan: Record<string, WeeklyPlan[]> = {
  "2.5": [
    { week: 1, focus: "타점/리턴 안정", micro: ["벽치기 300구", "리턴 포지션 20분", "발리 기초 15분"] },
    { week: 2, focus: "서브+1구", micro: ["퍼스트 서브 80구", "서브 후 오픈코트 공략", "풋워크 사다리"] },
    { week: 3, focus: "전환/네트", micro: ["어프로치 30분", "하프발리 10분", "로브 대응 10분"] },
    { week: 4, focus: "매치 적응", micro: ["세트 경기 2회", "전술 리뷰", "스트링/텐션 점검"] },
  ],
  "3.0": [
    { week: 1, focus: "타점/리턴 안정", micro: ["벽치기 300구", "리턴 포지션 20분", "발리 기초 15분"] },
    { week: 2, focus: "서브+1구", micro: ["퍼스트 서브 80구", "서브 후 오픈코트 공략", "풋워크 사다리"] },
    { week: 3, focus: "전환/네트", micro: ["어프로치 30분", "하프발리 10분", "로브 대응 10분"] },
    { week: 4, focus: "매치 적응", micro: ["세트 경기 2회", "전술 리뷰", "스트링/텐션 점검"] },
  ],
  "3.5": [
    { week: 1, focus: "서브 코스·스핀", micro: ["와이드/티 40:40", "킥서브 토스 15분"] },
    { week: 2, focus: "리턴 전개", micro: ["dtl 리턴 20분", "리턴 후 전진 15분"] },
    { week: 3, focus: "패턴화", micro: ["서브+3구 패턴", "포칭 시그널"] },
    { week: 4, focus: "실전/회복", micro: ["매치 3회", "스트렝스 deload"] },
  ],
  "4.0": [
    { week: 1, focus: "서브 코스·스핀", micro: ["와이드/티 40:40", "킥서브 토스 15분"] },
    { week: 2, focus: "리턴 전개", micro: ["dtl 리턴 20분", "리턴 후 전진 15분"] },
    { week: 3, focus: "패턴화", micro: ["서브+3구 패턴", "포칭 시그널"] },
    { week: 4, focus: "실전/회복", micro: ["매치 3회", "스트렝스 deload"] },
  ],
  "4.5": [
    { week: 1, focus: "고급 패턴", micro: ["서브+리턴 패턴", "네트러시 타이밍"] },
    { week: 2, focus: "전략적 플레이", micro: ["상대 약점 공략", "포메이션 전환"] },
    { week: 3, focus: "멘탈 강화", micro: ["압박 상황 대응", "집중력 유지"] },
    { week: 4, focus: "경기 감각", micro: ["실전 경기 4회", "전술 리뷰"] },
  ],
  "5.0+": [
    { week: 1, focus: "프로 수준 훈련", micro: ["고강도 패턴 연습", "체력 관리"] },
    { week: 2, focus: "전술 완성도", micro: ["상대 분석", "전략 수립"] },
    { week: 3, focus: "경기 최적화", micro: ["토너먼트 참가", "실전 경험"] },
    { week: 4, focus: "회복 및 평가", micro: ["부상 관리", "성과 분석"] },
  ],
}

export const commonMistakes: Record<string, Mistake[]> = {
  "2.5": [
    { issue: "백핸드 회피", fix: "그립 고정·준비 빨리·짧은 스윙부터" },
    { issue: "네트 앞 두려움", fix: "하프발리→짧볼 발→감각 적응" },
  ],
  "3.0": [
    { issue: "백핸드 회피", fix: "그립 고정·준비 빨리·짧은 스윙부터" },
    { issue: "네트 앞 두려움", fix: "하프발리→짧볼 발→감각 적응" },
  ],
  "3.5": [
    { issue: "오버히트", fix: "목표 구역 6분할·힘 80%" },
    { issue: "서두른 전진", fix: "상대 준비 확인·중립볼 전환" },
  ],
  "4.0": [
    { issue: "오버히트", fix: "목표 구역 6분할·힘 80%" },
    { issue: "서두른 전진", fix: "상대 준비 확인·중립볼 전환" },
  ],
  "4.5": [
    { issue: "멘탈 게임", fix: "집중력 유지·스트레스 관리" },
    { issue: "부상 관리", fix: "적절한 휴식·스트레칭·영양" },
  ],
  "5.0+": [
    { issue: "지속적 동기", fix: "목표 재설정·다양한 목표 추구" },
    { issue: "부상 관리", fix: "전문가 상담·회복 관리" },
  ],
}

