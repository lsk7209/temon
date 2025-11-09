/**
 * 소비 성향 테스트 결과 데이터 (16유형)
 */

export interface ResultType {
  mbti: string
  name: string
  summary: string
  traits: string[]
  strategies: {
    budget: string[]
    compare: string[]
    refund: string[]
    subscription?: string[]
  }
  pitfalls: string[]
  checklist: string[]
  ogTitle: string
}

export const SPEND_STYLE_RESULTS: Record<string, ResultType> = {
  ENTJ: {
    mbti: "ENTJ",
    name: "시스템 바이어",
    summary: "목표 지향, 카테고리별 ROI, 장기 효율 중시",
    traits: [
      "목표 지향",
      "카테고리별 ROI",
      "장기 효율 중시",
      "전략적 구매",
    ],
    strategies: {
      budget: [
        "카테고리별 예산 배분",
        "연간 목표 설정",
        "ROI 추적",
      ],
      compare: [
        "장기 가치 비교",
        "총 소유 비용 계산",
      ],
      refund: [
        "환불 정책 사전 확인",
        "보증 기간 확인",
      ],
      subscription: [
        "연간 구독 할인 활용",
        "사용률 모니터링",
      ],
    },
    pitfalls: [
      "과도한 최적화로 기회 상실",
    ],
    checklist: [
      "필요성 정의",
      "ROI 계산",
      "장기 계획 수립",
    ],
    ogTitle: "ENTJ 시스템 바이어",
  },
  INTJ: {
    mbti: "INTJ",
    name: "전략 설계자",
    summary: "규칙 기반 예산과 가격추적으로 최적의 타이밍을 잡습니다",
    traits: [
      "가격 알림",
      "연간 예산 프레임",
      "대체재 비교",
      "최적화 중시",
    ],
    strategies: {
      budget: [
        "카테고리 상한",
        "구독 분기점검",
      ],
      compare: [
        "사양/가격 로그",
        "히스토리 추적",
      ],
      refund: [
        "반품 규정 북마크",
        "보증 조건 확인",
      ],
    },
    pitfalls: [
      "분석 과부하로 기회 상실",
    ],
    checklist: [
      "필요성 정의",
      "대안 3개 비교",
      "가격 알림 설정",
    ],
    ogTitle: "INTJ 전략 설계자",
  },
  ENTP: {
    mbti: "ENTP",
    name: "아이디어 헌터",
    summary: "신제품 실험, 대안 탐색, 구독 스위칭 민첩",
    traits: [
      "신제품 실험",
      "대안 탐색",
      "구독 스위칭",
      "혁신 선호",
    ],
    strategies: {
      budget: [
        "실험 예산 분리",
        "구독 로테이션",
      ],
      compare: [
        "대안 비교",
        "신기능 체크",
      ],
      refund: [
        "무료 체험 활용",
        "유연한 해지",
      ],
    },
    pitfalls: [
      "과도한 실험으로 예산 초과",
    ],
    checklist: [
      "신제품 리뷰 확인",
      "대안 비교",
      "체험 기간 설정",
    ],
    ogTitle: "ENTP 아이디어 헌터",
  },
  INTP: {
    mbti: "INTP",
    name: "데이터 분석가",
    summary: "리뷰 메타분석, 환불/보증 규정 숙지",
    traits: [
      "리뷰 메타분석",
      "규정 숙지",
      "논리적 비교",
      "데이터 기반",
    ],
    strategies: {
      budget: [
        "데이터 기반 예산",
        "통계 분석",
      ],
      compare: [
        "메타 리뷰 분석",
        "사양 비교표",
      ],
      refund: [
        "환불/보증 규정 숙지",
        "정책 문서 확인",
      ],
    },
    pitfalls: [
      "과도한 분석으로 결정 지연",
    ],
    checklist: [
      "리뷰 통계 확인",
      "규정 문서 검토",
      "비교표 작성",
    ],
    ogTitle: "INTP 데이터 분석가",
  },
  ENFJ: {
    mbti: "ENFJ",
    name: "조율형 플래너",
    summary: "가족·팀 예산 조율, 공동구매·혜택 설계",
    traits: [
      "가족 예산 조율",
      "공동구매 설계",
      "혜택 공유",
      "조화 중시",
    ],
    strategies: {
      budget: [
        "가족 예산 조율",
        "공동 목표 설정",
      ],
      compare: [
        "공동구매 비교",
        "혜택 공유",
      ],
      refund: [
        "단체 환불 협의",
        "공동 이익 추구",
      ],
    },
    pitfalls: [
      "타인 우선으로 자신 소홀",
    ],
    checklist: [
      "공동 목표 확인",
      "혜택 공유",
      "예산 조율",
    ],
    ogTitle: "ENFJ 조율형 플래너",
  },
  INFJ: {
    mbti: "INFJ",
    name: "가치 지향가",
    summary: "브랜드 스토리·지속가능성 중시, 충동 억제",
    traits: [
      "브랜드 스토리 중시",
      "지속가능성",
      "충동 억제",
      "가치 우선",
    ],
    strategies: {
      budget: [
        "가치 기반 예산",
        "지속가능 소비",
      ],
      compare: [
        "브랜드 철학 비교",
        "가치 평가",
      ],
      refund: [
        "윤리적 환불",
        "지속가능 정책",
      ],
    },
    pitfalls: [
      "과도한 이상주의",
    ],
    checklist: [
      "브랜드 스토리 확인",
      "가치 평가",
      "지속가능성 체크",
    ],
    ogTitle: "INFJ 가치 지향가",
  },
  ENFP: {
    mbti: "ENFP",
    name: "감각 체험가",
    summary: "체험 가치와 재미를 우선하되, 간단한 가드레일로 과소비를 방지합니다",
    traits: [
      "새로움 선호",
      "이벤트 지향",
      "만족감 중심",
      "체험 우선",
    ],
    strategies: {
      budget: [
        "기분 지출 한도",
        "충동 24시간 룰",
      ],
      compare: [
        "핵심 기준 2개만",
        "체험 가치 우선",
      ],
      refund: [
        "중고 리커버리",
        "유연한 해지",
      ],
    },
    pitfalls: [
      "이벤트성 과소비",
    ],
    checklist: [
      "목표 기분 명료화",
      "상한 설정",
      "결제 전 휴지기",
    ],
    ogTitle: "ENFP 감각 체험가",
  },
  INFP: {
    mbti: "INFP",
    name: "기분 소비가",
    summary: "감정 기반 구매, 회복·셀프케어 지출 비중",
    traits: [
      "감정 기반",
      "셀프케어 중시",
      "회복 지출",
      "개인적 가치",
    ],
    strategies: {
      budget: [
        "셀프케어 예산",
        "감정 지출 관리",
      ],
      compare: [
        "감정적 만족도",
        "개인 가치 평가",
      ],
      refund: [
        "만족도 기반",
        "유연한 정책",
      ],
    },
    pitfalls: [
      "감정적 과소비",
    ],
    checklist: [
      "감정 상태 확인",
      "가치 평가",
      "휴지기 설정",
    ],
    ogTitle: "INFP 기분 소비가",
  },
  ESTJ: {
    mbti: "ESTJ",
    name: "규범 관리자",
    summary: "장부·카테고리 한도 엄수, 환불 절차 명확",
    traits: [
      "장부 관리",
      "카테고리 한도",
      "절차 명확",
      "규칙 준수",
    ],
    strategies: {
      budget: [
        "카테고리별 한도",
        "장부 기록",
      ],
      compare: [
        "표준 절차",
        "정책 확인",
      ],
      refund: [
        "환불 절차 명확",
        "문서 보관",
      ],
    },
    pitfalls: [
      "유연성 부족",
    ],
    checklist: [
      "예산 확인",
      "절차 확인",
      "문서 보관",
    ],
    ogTitle: "ESTJ 규범 관리자",
  },
  ISTJ: {
    mbti: "ISTJ",
    name: "표준 수호자",
    summary: "검증된 제품 재구매, 고정 구독 유지",
    traits: [
      "검증된 제품",
      "재구매 선호",
      "고정 구독",
      "안정성 중시",
    ],
    strategies: {
      budget: [
        "고정 예산",
        "재구매 패턴",
      ],
      compare: [
        "검증된 브랜드",
        "표준 제품",
      ],
      refund: [
        "신뢰 브랜드",
        "안정 정책",
      ],
    },
    pitfalls: [
      "변화 기피",
    ],
    checklist: [
      "검증 확인",
      "재구매 여부",
      "안정성 체크",
    ],
    ogTitle: "ISTJ 표준 수호자",
  },
  ESTP: {
    mbti: "ESTP",
    name: "직진 실용가",
    summary: "즉시가치 우선, 필요시 중고 매각",
    traits: [
      "즉시가치",
      "실용성",
      "중고 매각",
      "빠른 결정",
    ],
    strategies: {
      budget: [
        "유동 예산",
        "중고 회수",
      ],
      compare: [
        "즉시 가치",
        "실용성 우선",
      ],
      refund: [
        "빠른 환불",
        "중고 전환",
      ],
    },
    pitfalls: [
      "충동 구매",
    ],
    checklist: [
      "즉시 필요성",
      "실용성 확인",
      "회수 계획",
    ],
    ogTitle: "ESTP 직진 실용가",
  },
  ISTP: {
    mbti: "ISTP",
    name: "도구 최적가",
    summary: "기능/내구성 우선, 고관여 비교 최소",
    traits: [
      "기능 우선",
      "내구성",
      "최소 비교",
      "효율성",
    ],
    strategies: {
      budget: [
        "기능 예산",
        "장기 내구성",
      ],
      compare: [
        "핵심 기능만",
        "내구성 체크",
      ],
      refund: [
        "기능 불량 시",
        "간단 절차",
      ],
    },
    pitfalls: [
      "과도한 미니멀",
    ],
    checklist: [
      "기능 확인",
      "내구성 체크",
      "필요성 검토",
    ],
    ogTitle: "ISTP 도구 최적가",
  },
  ESFJ: {
    mbti: "ESFJ",
    name: "케어 코디네이터",
    summary: "선물·공동체 지출 비중, 쿠폰·적립",
    traits: [
      "선물 지출",
      "공동체",
      "쿠폰 활용",
      "적립 중시",
    ],
    strategies: {
      budget: [
        "선물 예산",
        "적립 활용",
      ],
      compare: [
        "쿠폰 비교",
        "적립 혜택",
      ],
      refund: [
        "선물 환불",
        "공동 이익",
      ],
    },
    pitfalls: [
      "타인 우선 과소비",
    ],
    checklist: [
      "쿠폰 확인",
      "적립 체크",
      "선물 예산",
    ],
    ogTitle: "ESFJ 케어 코디네이터",
  },
  ISFJ: {
    mbti: "ISFJ",
    name: "따뜻한 실속가",
    summary: "안정적 예산, 세이프티 넷 확보",
    traits: [
      "안정적 예산",
      "세이프티 넷",
      "신중한 구매",
      "보수적",
    ],
    strategies: {
      budget: [
        "안정 예산",
        "비상금 확보",
      ],
      compare: [
        "신중한 비교",
        "안정 브랜드",
      ],
      refund: [
        "보수적 정책",
        "안전 우선",
      ],
    },
    pitfalls: [
      "과도한 보수",
    ],
    checklist: [
      "안정성 확인",
      "비상금 체크",
      "신중 검토",
    ],
    ogTitle: "ISFJ 따뜻한 실속가",
  },
  ESFP: {
    mbti: "ESFP",
    name: "스타일 메이커",
    summary: "디자인/무드 최우선, 룩 앤 필",
    traits: [
      "디자인 우선",
      "무드 중시",
      "룩 앤 필",
      "스타일",
    ],
    strategies: {
      budget: [
        "스타일 예산",
        "트렌드 반영",
      ],
      compare: [
        "디자인 비교",
        "무드 평가",
      ],
      refund: [
        "스타일 불만",
        "유연한 정책",
      ],
    },
    pitfalls: [
      "과도한 스타일 지출",
    ],
    checklist: [
      "디자인 확인",
      "무드 체크",
      "스타일 평가",
    ],
    ogTitle: "ESFP 스타일 메이커",
  },
  ISFP: {
    mbti: "ISFP",
    name: "미니멀 테이스트",
    summary: "소수 정예, 감성 합리화",
    traits: [
      "소수 정예",
      "감성 합리화",
      "미니멀",
      "품질 우선",
    ],
    strategies: {
      budget: [
        "품질 예산",
        "소수 구매",
      ],
      compare: [
        "감성 평가",
        "품질 우선",
      ],
      refund: [
        "품질 불만",
        "신중한 정책",
      ],
    },
    pitfalls: [
      "과도한 미니멀",
    ],
    checklist: [
      "품질 확인",
      "감성 평가",
      "필요성 검토",
    ],
    ogTitle: "ISFP 미니멀 테이스트",
  },
}

