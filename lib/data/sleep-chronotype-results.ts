/**
 * 수면 크로노타입 테스트 결과 데이터 (16유형)
 */

export interface ResultType {
  mbti: string
  name: string
  summary: string
  traits: string[]
  routines: {
    morning: string[]
    afternoon: string[]
    evening: string[]
  }
  pitfalls: string[]
  checklist: string[]
  ogTitle: string
}

export const SLEEP_CHRONOTYPE_RESULTS: Record<string, ResultType> = {
  ENTJ: {
    mbti: "ENTJ",
    name: "새벽 지휘관",
    summary: "일찍 기상해 리듬을 리드, 일정 중심의 강한 실행",
    traits: [
      "일찍 기상",
      "리듬 리드",
      "일정 중심",
      "강한 실행",
    ],
    routines: {
      morning: [
        "5-6시 기상",
        "물 500ml",
        "아침 운동 20분",
        "일정 확인",
      ],
      afternoon: [
        "점심 후 산책 10분",
        "오후 집중 시간대 활용",
      ],
      evening: [
        "저녁 7시 이후 카페인 금지",
        "22시 취침 준비",
      ],
    },
    pitfalls: [
      "과도한 일정으로 수면 부족",
    ],
    checklist: [
      "기상 시간 고정",
      "아침 운동",
      "오후 리셋",
      "저녁 차단",
    ],
    ogTitle: "ENTJ 새벽 지휘관",
  },
  INTJ: {
    mbti: "INTJ",
    name: "설계형 전략가",
    summary: "고정 취침과 데이터 기반 조정으로 오전 골든타임을 극대화합니다",
    traits: [
      "취침·기상 고정",
      "카페인 컷오프",
      "아침 루틴 3스텝",
      "데이터 기반",
    ],
    routines: {
      morning: [
        "물 300ml",
        "루틴 스트레칭 3분",
        "햇빛 5분",
      ],
      afternoon: [
        "10–20분 리셋",
        "가벼운 산책",
      ],
      evening: [
        "블루라이트 차단",
        "취침 전 30분 비스크린",
      ],
    },
    pitfalls: [
      "과한 최적화로 스트레스 상승",
    ],
    checklist: [
      "취침·기상 고정",
      "오전 우선순위 1건",
      "오후 리셋",
      "저녁 차단",
    ],
    ogTitle: "INTJ 설계형 전략가",
  },
  ENTP: {
    mbti: "ENTP",
    name: "야행 혁신가",
    summary: "늦은 밤 아이디어 폭발, 유연한 기상·루틴 실험",
    traits: [
      "늦은 밤 활성",
      "아이디어 폭발",
      "유연한 루틴",
      "실험적",
    ],
    routines: {
      morning: [
        "8-9시 기상",
        "물·카페인",
        "유연한 루틴",
      ],
      afternoon: [
        "오후 집중 시간",
        "짧은 낮잠 가능",
      ],
      evening: [
        "저녁 고강도 작업",
        "23시 이후 취침",
      ],
    },
    pitfalls: [
      "불규칙한 수면 패턴",
    ],
    checklist: [
      "기상 시간 범위 설정",
      "오후 리셋",
      "저녁 집중 시간",
      "취침 시간 범위",
    ],
    ogTitle: "ENTP 야행 혁신가",
  },
  INTP: {
    mbti: "INTP",
    name: "심야 분석가",
    summary: "조용한 밤 몰입, 낮엔 에너지 관리로 효율 유지",
    traits: [
      "심야 몰입",
      "에너지 관리",
      "조용한 환경",
      "효율 중시",
    ],
    routines: {
      morning: [
        "8-9시 기상",
        "천천히 각성",
        "물·가벼운 스트레칭",
      ],
      afternoon: [
        "낮잠 20분",
        "오후 집중 시간",
      ],
      evening: [
        "저녁 8시 이후 집중",
        "자정 이후 취침",
      ],
    },
    pitfalls: [
      "과도한 야행으로 낮 피로",
    ],
    checklist: [
      "기상 시간 범위",
      "오후 낮잠",
      "저녁 집중",
      "취침 시간 범위",
    ],
    ogTitle: "INTP 심야 분석가",
  },
  ENFJ: {
    mbti: "ENFJ",
    name: "모닝 코치",
    summary: "아침 소셜 에너지, 팀 리듬까지 조율",
    traits: [
      "아침 활성",
      "소셜 에너지",
      "팀 조율",
      "일정 관리",
    ],
    routines: {
      morning: [
        "6-7시 기상",
        "물·스트레칭",
        "아침 미팅 준비",
      ],
      afternoon: [
        "점심 후 산책",
        "팀 조율 시간",
      ],
      evening: [
        "저녁 7시 이후 카페인 금지",
        "22시 취침",
      ],
    },
    pitfalls: [
      "타인 우선으로 자신 수면 소홀",
    ],
    checklist: [
      "아침 루틴",
      "오후 리셋",
      "저녁 차단",
      "취침 시간 고정",
    ],
    ogTitle: "ENFJ 모닝 코치",
  },
  INFJ: {
    mbti: "INFJ",
    name: "잔잔한 리듬메이커",
    summary: "조용한 오전·깊은 밤 균형, 감각적 회복 중시",
    traits: [
      "조용한 오전",
      "깊은 밤",
      "감각적 회복",
      "균형 중시",
    ],
    routines: {
      morning: [
        "7-8시 기상",
        "천천히 각성",
        "물·명상",
      ],
      afternoon: [
        "오후 집중 시간",
        "짧은 휴식",
      ],
      evening: [
        "저녁 8시 이후 집중",
        "23시 취침",
      ],
    },
    pitfalls: [
      "과도한 이상주의",
    ],
    checklist: [
      "아침 명상",
      "오후 집중",
      "저녁 차단",
      "취침 시간",
    ],
    ogTitle: "INFJ 잔잔한 리듬메이커",
  },
  ENFP: {
    mbti: "ENFP",
    name: "리듬 탐험가",
    summary: "변동성 속에서도 창의 스파크를 살리며 간단한 가드레일로 균형을 잡습니다",
    traits: [
      "낮잠·산책 리셋",
      "감정 기반 몰입",
      "유연 루틴",
      "창의 스파크",
    ],
    routines: {
      morning: [
        "기분일기 1줄",
        "수분·햇빛 5분",
      ],
      afternoon: [
        "야외 10분",
        "카페인 컷오프 6시간",
      ],
      evening: [
        "가벼운 정리",
        "이틀 1회 고강도 운동",
      ],
    },
    pitfalls: [
      "늦은 카페인·스크린 루프",
    ],
    checklist: [
      "오후 야외",
      "컷오프 준수",
      "취침 전 30분 오프라인",
    ],
    ogTitle: "ENFP 리듬 탐험가",
  },
  INFP: {
    mbti: "INFP",
    name: "꿈결 몰입가",
    summary: "감정·상상 에너지로 심야 몰입, 유연한 수면창",
    traits: [
      "심야 몰입",
      "감정 기반",
      "유연한 수면",
      "상상 에너지",
    ],
    routines: {
      morning: [
        "8-9시 기상",
        "천천히 각성",
        "물·가벼운 스트레칭",
      ],
      afternoon: [
        "오후 집중 시간",
        "짧은 낮잠 가능",
      ],
      evening: [
        "저녁 8시 이후 집중",
        "자정 이후 취침",
      ],
    },
    pitfalls: [
      "불규칙한 수면 패턴",
    ],
    checklist: [
      "기상 시간 범위",
      "오후 리셋",
      "저녁 집중",
      "취침 시간 범위",
    ],
    ogTitle: "INFP 꿈결 몰입가",
  },
  ESTJ: {
    mbti: "ESTJ",
    name: "루틴 관리자",
    summary: "루틴·기상 고정, 오후엔 짧은 리셋으로 탄력",
    traits: [
      "루틴 고정",
      "기상 고정",
      "오후 리셋",
      "탄력 유지",
    ],
    routines: {
      morning: [
        "6시 기상",
        "물·스트레칭",
        "아침 운동",
      ],
      afternoon: [
        "점심 후 산책 10분",
        "오후 집중 시간",
      ],
      evening: [
        "저녁 7시 이후 카페인 금지",
        "22시 취침",
      ],
    },
    pitfalls: [
      "과도한 루틴 고집",
    ],
    checklist: [
      "기상 시간 고정",
      "아침 운동",
      "오후 리셋",
      "저녁 차단",
    ],
    ogTitle: "ESTJ 루틴 관리자",
  },
  ISTJ: {
    mbti: "ISTJ",
    name: "안정 수호자",
    summary: "규칙적 취침, 카페인·스크린 절제",
    traits: [
      "규칙적 취침",
      "카페인 절제",
      "스크린 절제",
      "안정 중시",
    ],
    routines: {
      morning: [
        "6-7시 기상",
        "물·스트레칭",
        "규칙적 루틴",
      ],
      afternoon: [
        "오후 집중 시간",
        "가벼운 산책",
      ],
      evening: [
        "저녁 7시 이후 카페인 금지",
        "22시 취침",
      ],
    },
    pitfalls: [
      "과도한 규칙 고집",
    ],
    checklist: [
      "기상 시간 고정",
      "오후 리셋",
      "저녁 차단",
      "취침 시간 고정",
    ],
    ogTitle: "ISTJ 안정 수호자",
  },
  ESTP: {
    mbti: "ESTP",
    name: "직진 수행가",
    summary: "즉시 행동, 오후 운동·콜드샤워로 각성 조절",
    traits: [
      "즉시 행동",
      "오후 운동",
      "콜드샤워",
      "각성 조절",
    ],
    routines: {
      morning: [
        "7-8시 기상",
        "물·스트레칭",
        "유연한 루틴",
      ],
      afternoon: [
        "오후 운동",
        "콜드샤워",
      ],
      evening: [
        "저녁 8시 이후 카페인 금지",
        "23시 취침",
      ],
    },
    pitfalls: [
      "불규칙한 수면",
    ],
    checklist: [
      "기상 시간 범위",
      "오후 운동",
      "저녁 차단",
      "취침 시간 범위",
    ],
    ogTitle: "ESTP 직진 수행가",
  },
  ISTP: {
    mbti: "ISTP",
    name: "조용한 최적가",
    summary: "필요한 만큼만 자고 효율 극대화",
    traits: [
      "효율 극대화",
      "필요한 만큼",
      "조용한 환경",
      "최적화",
    ],
    routines: {
      morning: [
        "7-8시 기상",
        "물·가벼운 스트레칭",
        "효율적 루틴",
      ],
      afternoon: [
        "오후 집중 시간",
        "짧은 휴식",
      ],
      evening: [
        "저녁 8시 이후 집중",
        "23시 취침",
      ],
    },
    pitfalls: [
      "과도한 최적화",
    ],
    checklist: [
      "기상 시간 범위",
      "오후 리셋",
      "저녁 차단",
      "취침 시간",
    ],
    ogTitle: "ISTP 조용한 최적가",
  },
  ESFJ: {
    mbti: "ESFJ",
    name: "케어 플래너",
    summary: "가족·팀 리듬 동기화, 저녁 스크린 타임 통제",
    traits: [
      "가족 리듬",
      "팀 동기화",
      "스크린 통제",
      "케어 중시",
    ],
    routines: {
      morning: [
        "6-7시 기상",
        "물·스트레칭",
        "가족 루틴",
      ],
      afternoon: [
        "점심 후 산책",
        "팀 조율",
      ],
      evening: [
        "저녁 7시 이후 스크린 차단",
        "22시 취침",
      ],
    },
    pitfalls: [
      "타인 우선으로 자신 소홀",
    ],
    checklist: [
      "아침 루틴",
      "오후 리셋",
      "저녁 차단",
      "취침 시간",
    ],
    ogTitle: "ESFJ 케어 플래너",
  },
  ISFJ: {
    mbti: "ISFJ",
    name: "포근한 페이스메이커",
    summary: "안정·회복 우선, 숙면 위생 충실",
    traits: [
      "안정 우선",
      "회복 중시",
      "숙면 위생",
      "포근함",
    ],
    routines: {
      morning: [
        "7시 기상",
        "물·스트레칭",
        "안정적 루틴",
      ],
      afternoon: [
        "오후 집중 시간",
        "가벼운 산책",
      ],
      evening: [
        "저녁 7시 이후 차단",
        "22시 취침",
      ],
    },
    pitfalls: [
      "과도한 보수",
    ],
    checklist: [
      "기상 시간 고정",
      "오후 리셋",
      "저녁 차단",
      "취침 시간 고정",
    ],
    ogTitle: "ISFJ 포근한 페이스메이커",
  },
  ESFP: {
    mbti: "ESFP",
    name: "에너지 스파크",
    summary: "변동성 있으나 체험으로 리듬 충전",
    traits: [
      "변동성",
      "체험 중시",
      "리듬 충전",
      "에너지",
    ],
    routines: {
      morning: [
        "7-8시 기상",
        "물·스트레칭",
        "유연한 루틴",
      ],
      afternoon: [
        "오후 활동",
        "야외 시간",
      ],
      evening: [
        "저녁 8시 이후 카페인 금지",
        "23시 취침",
      ],
    },
    pitfalls: [
      "불규칙한 수면",
    ],
    checklist: [
      "기상 시간 범위",
      "오후 활동",
      "저녁 차단",
      "취침 시간",
    ],
    ogTitle: "ESFP 에너지 스파크",
  },
  ISFP: {
    mbti: "ISFP",
    name: "감각 휴식러",
    summary: "감성 회복 창을 확보, 저자극 환경에서 깊은 수면",
    traits: [
      "감성 회복",
      "저자극 환경",
      "깊은 수면",
      "휴식 중시",
    ],
    routines: {
      morning: [
        "8시 기상",
        "천천히 각성",
        "물·가벼운 스트레칭",
      ],
      afternoon: [
        "오후 집중 시간",
        "조용한 휴식",
      ],
      evening: [
        "저녁 8시 이후 차단",
        "23시 취침",
      ],
    },
    pitfalls: [
      "과도한 휴식",
    ],
    checklist: [
      "기상 시간",
      "오후 리셋",
      "저녁 차단",
      "취침 시간",
    ],
    ogTitle: "ISFP 감각 휴식러",
  },
}

