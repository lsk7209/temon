/**
 * 스마트폰 사용 스타일 테스트 결과 데이터 (16유형)
 */

export interface ResultType {
  mbti: string
  name: string
  summary: string
  traits: string[]
  presets: {
    notifications: string[]
    homescreen: string[]
    battery: string[]
    security?: string[]
  }
  pitfalls: string[]
  recommend: string[]
  ogTitle: string
}

export const PHONE_STYLE_RESULTS: Record<string, ResultType> = {
  ENFP: {
    mbti: "ENFP",
    name: "플로우 체이서",
    summary: "상황에 맞춰 유연하게 앱을 바꾸는 탐험가",
    traits: [
      "새 앱 시도",
      "상황별 화면 전환",
      "공유 적극",
      "즉흥적",
    ],
    presets: {
      notifications: [
        "요약 알림 기본",
        "메신저 실시간",
        "여행 시 알림 테마",
      ],
      homescreen: [
        "업무/여행/취미 페이지 전환",
      ],
      battery: [
        "저전력 자동 전환",
      ],
    },
    pitfalls: [
      "앱 과포화로 탐색 비용 증가",
    ],
    recommend: [
      "런처",
      "단축어 갤러리",
      "위젯팩",
    ],
    ogTitle: "ENFP 플로우 체이서",
  },
  INFP: {
    mbti: "INFP",
    name: "포켓 셀프케어",
    summary: "조용히 나에게 맞춘 감성 세팅",
    traits: [
      "무음 모드 선호",
      "집중 환경 조성",
      "미니멀",
      "감성적",
    ],
    presets: {
      notifications: [
        "무음 기본",
        "중요 알림만 허용",
        "방해 금지 모드",
      ],
      homescreen: [
        "최소한의 앱만",
        "감성 위젯",
      ],
      battery: [
        "절전 모드 자동",
        "백그라운드 제한",
      ],
    },
    pitfalls: [
      "과도한 차단으로 소통 단절",
    ],
    recommend: [
      "집중 앱",
      "명상 앱",
      "미니멀 위젯",
    ],
    ogTitle: "INFP 포켓 셀프케어",
  },
  ENFJ: {
    mbti: "ENFJ",
    name: "팀 네비게이터",
    summary: "모두가 편한 공용 프리셋을 주도",
    traits: [
      "안내 적극",
      "일정 관리",
      "배려",
      "조율",
    ],
    presets: {
      notifications: [
        "그룹 알림 우선",
        "일정 리마인더",
        "공유 알림",
      ],
      homescreen: [
        "공유 앱 중심",
        "캘린더 위젯",
      ],
      battery: [
        "공유 기능 최적화",
      ],
    },
    pitfalls: [
      "자신의 사용 패턴 소홀",
    ],
    recommend: [
      "캘린더",
      "공유 앱",
      "그룹 메신저",
    ],
    ogTitle: "ENFJ 팀 네비게이터",
  },
  INFJ: {
    mbti: "INFJ",
    name: "포커스 큐레이터",
    summary: "소음 차단과 심플함의 균형",
    traits: [
      "집중 모드",
      "정돈",
      "차분",
      "균형",
    ],
    presets: {
      notifications: [
        "화이트리스트",
        "요약 알림",
        "집중 시간 설정",
      ],
      homescreen: [
        "역할별 페이지 분리",
        "미니멀 배치",
      ],
      battery: [
        "백그라운드 제한",
        "자동 절전",
      ],
    },
    pitfalls: [
      "과도한 최적화",
    ],
    recommend: [
      "집중 앱",
      "정리 앱",
      "요약 앱",
    ],
    ogTitle: "INFJ 포커스 큐레이터",
  },
  ENTP: {
    mbti: "ENTP",
    name: "설정 해커",
    summary: "실험과 자동화를 즐기는 혁신가",
    traits: [
      "단축어 활용",
      "베타 테스트",
      "대안 앱 탐색",
      "자동화",
    ],
    presets: {
      notifications: [
        "스마트 필터링",
        "자동 분류",
      ],
      homescreen: [
        "동적 위젯",
        "자동화 단축어",
      ],
      battery: [
        "스마트 절전",
        "사용 패턴 학습",
      ],
    },
    pitfalls: [
      "과도한 실험",
    ],
    recommend: [
      "자동화 앱",
      "단축어",
      "베타 앱",
    ],
    ogTitle: "ENTP 설정 해커",
  },
  INTP: {
    mbti: "INTP",
    name: "로직 옵티마이저",
    summary: "데이터로 최적화하는 합리주의",
    traits: [
      "전력 분석",
      "로그 확인",
      "벤치마크",
      "과학적 접근",
    ],
    presets: {
      notifications: [
        "데이터 기반 필터",
        "우선순위 자동화",
      ],
      homescreen: [
        "효율 중심 배치",
        "사용 통계 기반",
      ],
      battery: [
        "전력 모니터링",
        "앱별 소비 분석",
      ],
    },
    pitfalls: [
      "과도한 분석",
    ],
    recommend: [
      "분석 앱",
      "벤치마크",
      "모니터링",
    ],
    ogTitle: "INTP 로직 옵티마이저",
  },
  ENTJ: {
    mbti: "ENTJ",
    name: "시스템 드라이버",
    summary: "목표 달성을 위한 생산성 체계",
    traits: [
      "구조화",
      "자동화",
      "목표 지향",
      "효율",
    ],
    presets: {
      notifications: [
        "업무 우선순위",
        "목표 관련만",
      ],
      homescreen: [
        "생산성 앱 중심",
        "목표 위젯",
      ],
      battery: [
        "업무 모드 최적화",
      ],
    },
    pitfalls: [
      "유연성 부족",
    ],
    recommend: [
      "생산성 앱",
      "목표 관리",
      "자동화",
    ],
    ogTitle: "ENTJ 시스템 드라이버",
  },
  INTJ: {
    mbti: "INTJ",
    name: "전략 플래너",
    summary: "마찰 최소화를 위한 설계형",
    traits: [
      "화이트리스트 알림",
      "페이지 역할 분리",
      "자동화",
      "최적화",
    ],
    presets: {
      notifications: [
        "핵심 앱만 실시간",
        "나머지 요약",
        "집중 모드 스케줄",
      ],
      homescreen: [
        "1페이지 생산성",
        "2페이지 정보",
        "3페이지 취미",
      ],
      battery: [
        "백그라운드 제한",
        "위치 권한 상황별",
      ],
    },
    pitfalls: [
      "과도한 차단으로 정보 누락",
    ],
    recommend: [
      "자동화",
      "리딩",
      "집중타이머",
    ],
    ogTitle: "INTJ 전략 플래너",
  },
  ESTJ: {
    mbti: "ESTJ",
    name: "룰 매니저",
    summary: "규칙 기반 생산성 운영자",
    traits: [
      "규칙",
      "체크리스트",
      "리마인더",
      "일관성",
    ],
    presets: {
      notifications: [
        "일정 리마인더",
        "업무 알림",
      ],
      homescreen: [
        "카테고리별 폴더",
        "체크리스트 위젯",
      ],
      battery: [
        "규칙 기반 절전",
      ],
    },
    pitfalls: [
      "유연성 부족",
    ],
    recommend: [
      "체크리스트",
      "리마인더",
      "생산성",
    ],
    ogTitle: "ESTJ 룰 매니저",
  },
  ISTJ: {
    mbti: "ISTJ",
    name: "스탠다드 키퍼",
    summary: "한번 정하면 꾸준한 정석파",
    traits: [
      "검증된 설정",
      "안정",
      "반복",
      "일관성",
    ],
    presets: {
      notifications: [
        "기본 설정 유지",
        "중요 알림만",
      ],
      homescreen: [
        "검증된 앱만",
        "고정 배치",
      ],
      battery: [
        "기본 절전 모드",
      ],
    },
    pitfalls: [
      "변화 기피",
    ],
    recommend: [
      "기본 앱",
      "보안",
      "백업",
    ],
    ogTitle: "ISTJ 스탠다드 키퍼",
  },
  ESTP: {
    mbti: "ESTP",
    name: "액션 스위처",
    summary: "필요한 것만 빠르게 쓰고 교체",
    traits: [
      "속도",
      "직관",
      "실행",
      "빠른 전환",
    ],
    presets: {
      notifications: [
        "즉시 알림",
        "필요 시만",
      ],
      homescreen: [
        "자주 쓰는 앱만",
        "빠른 접근",
      ],
      battery: [
        "빠른 충전",
      ],
    },
    pitfalls: [
      "일관성 부족",
    ],
    recommend: [
      "빠른 앱",
      "단축어",
      "위젯",
    ],
    ogTitle: "ESTP 액션 스위처",
  },
  ISTP: {
    mbti: "ISTP",
    name: "쿨 다운 유저",
    summary: "말수 적고 실용 위주의 셋업",
    traits: [
      "단순",
      "무소음",
      "도구성",
      "미니멀",
    ],
    presets: {
      notifications: [
        "무음 기본",
        "필수만",
      ],
      homescreen: [
        "도구 앱 중심",
        "미니멀",
      ],
      battery: [
        "효율적 사용",
      ],
    },
    pitfalls: [
      "과도한 미니멀",
    ],
    recommend: [
      "도구 앱",
      "유틸리티",
      "미니멀 위젯",
    ],
    ogTitle: "ISTP 쿨 다운 유저",
  },
  ESFJ: {
    mbti: "ESFJ",
    name: "케어 코디네이터",
    summary: "가족·지인 편의를 챙기는 세팅",
    traits: [
      "공유",
      "캘린더",
      "알림",
      "배려",
    ],
    presets: {
      notifications: [
        "가족 알림",
        "일정 공유",
      ],
      homescreen: [
        "공유 앱",
        "캘린더 위젯",
      ],
      battery: [
        "공유 최적화",
      ],
    },
    pitfalls: [
      "자신 패턴 소홀",
    ],
    recommend: [
      "공유 앱",
      "캘린더",
      "메신저",
    ],
    ogTitle: "ESFJ 케어 코디네이터",
  },
  ISFJ: {
    mbti: "ISFJ",
    name: "소프트 가디언",
    summary: "편안하고 예측 가능한 사용",
    traits: [
      "고정",
      "보안",
      "백업",
      "안정",
    ],
    presets: {
      notifications: [
        "안정적 알림",
        "중요만",
      ],
      homescreen: [
        "검증된 앱",
        "안정적 배치",
      ],
      battery: [
        "보수적 절전",
      ],
      security: [
        "정기 백업",
        "보안 강화",
      ],
    },
    pitfalls: [
      "변화 기피",
    ],
    recommend: [
      "백업",
      "보안",
      "안정 앱",
    ],
    ogTitle: "ISFJ 소프트 가디언",
  },
  ESFP: {
    mbti: "ESFP",
    name: "글로시 메이커",
    summary: "보기 좋고 즉각 즐거운 경험 선호",
    traits: [
      "위젯",
      "테마",
      "즉효감",
      "시각적",
    ],
    presets: {
      notifications: [
        "시각적 알림",
        "즉시 피드백",
      ],
      homescreen: [
        "예쁜 위젯",
        "테마 적용",
      ],
      battery: [
        "빠른 충전",
      ],
    },
    pitfalls: [
      "과도한 꾸미기",
    ],
    recommend: [
      "위젯",
      "테마",
      "커스터마이징",
    ],
    ogTitle: "ESFP 글로시 메이커",
  },
  ISFP: {
    mbti: "ISFP",
    name: "센스 리듬",
    summary: "감각적 미니멀 셋업",
    traits: [
      "무드",
      "미니멀",
      "자가케어",
      "감성",
    ],
    presets: {
      notifications: [
        "감성 알림",
        "무음 기본",
      ],
      homescreen: [
        "감성 위젯",
        "미니멀 배치",
      ],
      battery: [
        "절전 모드",
      ],
    },
    pitfalls: [
      "과도한 미니멀",
    ],
    recommend: [
      "감성 앱",
      "미니멀 위젯",
      "자가케어",
    ],
    ogTitle: "ISFP 센스 리듬",
  },
}

