/**
 * 소비 성향 테스트 결과 데이터 (16유형)
 */

export interface ResultType {
  mbti: string
  name: string
  summary: string
  traits: string[]
  settings: {
    budget: string[]
    subs?: string[]
    notice?: string[]
  }
  risks: string[]
  checklist: string[]
  ogTitle: string
}

export const SPENDING_STYLE_RESULTS: Record<string, ResultType> = {
  ENTJ: {
    mbti: "ENTJ",
    name: "예산 지휘관",
    summary: "카테고리 예산과 규칙으로 누수 최소화",
    traits: [
      "카테고리 예산",
      "규칙 기반",
      "누수 최소화",
      "전략적 관리",
    ],
    settings: {
      budget: [
        "카테고리별 예산 배분",
        "월간 지출 한도",
        "ROI 추적",
      ],
      subs: [
        "분기별 사용량 점검",
        "중복 구독 해지",
      ],
    },
    risks: ["과도한 규칙으로 유연성 저하"],
    checklist: [
      "예산 카테고리 설정",
      "월간 한도 설정",
      "분기 리뷰",
      "규칙 조정",
    ],
    ogTitle: "ENTJ 예산 지휘관",
  },
  INTJ: {
    mbti: "INTJ",
    name: "가치 설계자",
    summary: "총소유비용과 수명 주기를 고려한 최적 소비를 지향합니다",
    traits: [
      "TCO 관점",
      "가격 추적",
      "구독 분기 리뷰",
      "최적화 중시",
    ],
    settings: {
      budget: [
        "대형 지출 체크리스트",
        "가격 추적 알림",
        "TCO 계산",
      ],
      subs: [
        "분기별 사용량 점검",
        "중복 해지",
      ],
    },
    risks: ["정보 과부하"],
    checklist: [
      "TCO 템플릿",
      "탑3 후보 정리",
      "가격 추적 등록",
      "구매 후 만족도 기록",
    ],
    ogTitle: "INTJ 가치 설계자",
  },
  ENTP: {
    mbti: "ENTP",
    name: "실험 구매러",
    summary: "신모델 테스트로 효용 빠르게 검증",
    traits: [
      "신모델 테스트",
      "빠른 검증",
      "실험적 구매",
      "효용 중시",
    ],
    settings: {
      budget: [
        "실험 예산 캡",
        "테스트 기간 설정",
      ],
      notice: [
        "신제품 알림",
        "프로모션 요약",
      ],
    },
    risks: ["과도한 실험으로 누수"],
    checklist: [
      "실험 예산 설정",
      "테스트 기간",
      "효용 평가",
      "불필요 제거",
    ],
    ogTitle: "ENTP 실험 구매러",
  },
  INTP: {
    mbti: "INTP",
    name: "분석 구매러",
    summary: "수치·리뷰 메타분석으로 결정",
    traits: [
      "수치 분석",
      "리뷰 메타분석",
      "데이터 기반",
      "논리적 결정",
    ],
    settings: {
      budget: [
        "비교 스프레드시트",
        "가격 추적",
      ],
      subs: [
        "사용량 로그",
        "분기 분석",
      ],
    },
    risks: ["과도한 분석으로 실행 지연"],
    checklist: [
      "비교표 작성",
      "리뷰 분석",
      "가격 추적",
      "결정 실행",
    ],
    ogTitle: "INTP 분석 구매러",
  },
  ENFJ: {
    mbti: "ENFJ",
    name: "배려 선물러",
    summary: "관계 중심 예산, 타인 만족 극대화",
    traits: [
      "관계 중심",
      "타인 만족",
      "선물 예산",
      "배려 중시",
    ],
    settings: {
      budget: [
        "선물 예산 분리",
        "관계별 한도",
      ],
      notice: [
        "선물 기념일 알림",
        "프로모션 요약",
      ],
    },
    risks: ["타인 우선으로 자신 소홀"],
    checklist: [
      "선물 예산 설정",
      "기념일 체크",
      "자신 예산 확보",
      "주간 리뷰",
    ],
    ogTitle: "ENFJ 배려 선물러",
  },
  INFJ: {
    mbti: "INFJ",
    name: "의미 큐레이터",
    summary: "상징·가치 중심의 느린 소비",
    traits: [
      "상징 중시",
      "가치 중심",
      "느린 소비",
      "의미 추구",
    ],
    settings: {
      budget: [
        "가치 기준 설정",
        "의미 있는 구매",
      ],
      notice: [
        "가치 기반 알림",
        "요약 알림",
      ],
    },
    risks: ["과도한 이상 추구"],
    checklist: [
      "가치 기준 정리",
      "의미 확인",
      "구매 전 대기",
      "만족도 기록",
    ],
    ogTitle: "INFJ 의미 큐레이터",
  },
  ENFP: {
    mbti: "ENFP",
    name: "감흥 스파크",
    summary: "보상 소비를 가드레일로 통제해 만족은 유지하고 누수는 줄입니다",
    traits: [
      "보상 예산 캡",
      "위시 48시간",
      "세일 요약 알림",
      "감성 가드레일",
    ],
    settings: {
      budget: [
        "월 보상데이 1회",
        "한도 캡 설정",
      ],
      notice: [
        "프로모션 요약 알림",
        "과도한 푸시 차단",
      ],
    },
    risks: ["이벤트성 구매 누적"],
    checklist: [
      "48시간 룰",
      "월1 보상데이",
      "구독 1건 정리",
      "만족도 기록",
    ],
    ogTitle: "ENFP 감흥 스파크",
  },
  INFP: {
    mbti: "INFP",
    name: "공감 미니멀",
    summary: "적게 사되 오래 쓰는 친화형",
    traits: [
      "미니멀",
      "오래 사용",
      "친화적",
      "의미 중시",
    ],
    settings: {
      budget: [
        "필수만 구매",
        "내구성 우선",
      ],
      notice: [
        "필수 알림만",
        "요약 알림",
      ],
    },
    risks: ["과도한 미니멀"],
    checklist: [
      "필수 확인",
      "내구성 체크",
      "의미 확인",
      "주간 리뷰",
    ],
    ogTitle: "INFP 공감 미니멀",
  },
  ESTJ: {
    mbti: "ESTJ",
    name: "실속 관리자",
    summary: "지출 캘린더·구독 정비로 새는 돈 차단",
    traits: [
      "지출 캘린더",
      "구독 정비",
      "실속 중시",
      "체계적 관리",
    ],
    settings: {
      budget: [
        "지출 캘린더",
        "카테고리 한도",
      ],
      subs: [
        "월간 구독 정리",
        "중복 해지",
      ],
    },
    risks: ["과도한 규칙"],
    checklist: [
      "캘린더 설정",
      "구독 정리",
      "한도 확인",
      "주간 점검",
    ],
    ogTitle: "ESTJ 실속 관리자",
  },
  ISTJ: {
    mbti: "ISTJ",
    name: "정석 수호자",
    summary: "검증된 브랜드와 표준 모델 고수",
    traits: [
      "검증된 브랜드",
      "표준 모델",
      "안정적 구매",
      "일관성",
    ],
    settings: {
      budget: [
        "검증된 브랜드만",
        "표준 가격대",
      ],
      notice: [
        "신제품 알림 최소",
        "검증된 제품 알림",
      ],
    },
    risks: ["변화 기피"],
    checklist: [
      "브랜드 검증",
      "표준 확인",
      "안정성 체크",
      "주간 점검",
    ],
    ogTitle: "ISTJ 정석 수호자",
  },
  ESTP: {
    mbti: "ESTP",
    name: "속전속결러",
    summary: "딜·체험 위주로 즉시성 극대화",
    traits: [
      "딜 중시",
      "체험 위주",
      "즉시성",
      "실용적",
    ],
    settings: {
      budget: [
        "딜 예산",
        "체험 한도",
      ],
      notice: [
        "딜 알림",
        "프로모션 요약",
      ],
    },
    risks: ["과도한 즉시성"],
    checklist: [
      "딜 예산 설정",
      "체험 한도",
      "즉시 구매 전 대기",
      "주간 리뷰",
    ],
    ogTitle: "ESTP 속전속결러",
  },
  ISTP: {
    mbti: "ISTP",
    name: "실용 공학러",
    summary: "구조·내구·수리 용이성 중시",
    traits: [
      "구조 중시",
      "내구성",
      "수리 용이",
      "실용적",
    ],
    settings: {
      budget: [
        "내구성 우선",
        "수리 비용 고려",
      ],
      notice: [
        "내구성 정보",
        "수리 가이드",
      ],
    },
    risks: ["과도한 실용성"],
    checklist: [
      "구조 확인",
      "내구성 체크",
      "수리 용이성",
      "주간 점검",
    ],
    ogTitle: "ISTP 실용 공학러",
  },
  ESFJ: {
    mbti: "ESFJ",
    name: "홈 케어러",
    summary: "가족/공동체 편익 중심의 장바구니",
    traits: [
      "가족 중심",
      "공동체 편익",
      "홈 케어",
      "배려 중시",
    ],
    settings: {
      budget: [
        "가족 예산 분리",
        "공동체 기여",
      ],
      notice: [
        "가족 필요 알림",
        "공동체 이벤트",
      ],
    },
    risks: ["타인 우선으로 자신 소홀"],
    checklist: [
      "가족 예산 설정",
      "공동체 기여",
      "자신 예산 확보",
      "주간 리뷰",
    ],
    ogTitle: "ESFJ 홈 케어러",
  },
  ISFJ: {
    mbti: "ISFJ",
    name: "따뜻한 절약가",
    summary: "안전·안정 우선, 과지출 방지",
    traits: [
      "안전 우선",
      "안정 중시",
      "절약",
      "보수적",
    ],
    settings: {
      budget: [
        "안전 예비금",
        "절약 목표",
      ],
      notice: [
        "절약 팁",
        "안전 정보",
      ],
    },
    risks: ["과도한 보수"],
    checklist: [
      "예비금 설정",
      "절약 목표",
      "안전 확인",
      "주간 점검",
    ],
    ogTitle: "ISFJ 따뜻한 절약가",
  },
  ESFP: {
    mbti: "ESFP",
    name: "하이라이트 헌터",
    summary: "만족감 높은 포인트 순간에 집중",
    traits: [
      "만족감 중시",
      "포인트 순간",
      "즉흥적",
      "경험 중심",
    ],
    settings: {
      budget: [
        "만족 예산",
        "포인트 한도",
      ],
      notice: [
        "프로모션 알림",
        "이벤트 요약",
      ],
    },
    risks: ["과도한 즉흥 구매"],
    checklist: [
      "만족 예산 설정",
      "포인트 확인",
      "즉흥 전 대기",
      "주간 리뷰",
    ],
    ogTitle: "ESFP 하이라이트 헌터",
  },
  ISFP: {
    mbti: "ISFP",
    name: "소프트 세이버",
    summary: "심플한 예산도구로 무리 없는 절약",
    traits: [
      "심플 예산",
      "무리 없는 절약",
      "감성적",
      "균형 중시",
    ],
    settings: {
      budget: [
        "심플 예산 도구",
        "절약 목표",
      ],
      notice: [
        "절약 팁",
        "요약 알림",
      ],
    },
    risks: ["과도한 절약"],
    checklist: [
      "예산 도구 설정",
      "절약 목표",
      "균형 확인",
      "주간 점검",
    ],
    ogTitle: "ISFP 소프트 세이버",
  },
}

