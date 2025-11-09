/**
 * 스마트폰 사용 스타일 테스트 결과 데이터 (16유형)
 */

export interface ResultType {
  mbti: string
  name: string
  summary: string
  traits: string[]
  settings: {
    notify: string[]
    home: string[]
    auto: string[]
  }
  risks: string[]
  checklist: string[]
  ogTitle: string
}

export const PHONE_USAGE_RESULTS: Record<string, ResultType> = {
  ENTJ: {
    mbti: "ENTJ",
    name: "시스템 오케스트레이터",
    summary: "자동화와 규칙으로 고효율 운영",
    traits: [
      "알림 자동화",
      "규칙 기반 운영",
      "고효율 중시",
      "시스템 최적화",
    ],
    settings: {
      notify: ["업무·캘린더만 허용", "소셜 요약 알림"],
      home: ["업무 위젯 1페이지", "개인 폴더 2페이지"],
      auto: ["근무시간 집중 모드", "위치 기반 무음"],
    },
    risks: ["과도한 자동화로 유연성 저하"],
    checklist: [
      "알림 인벤토리 작성",
      "자동화 규칙 설정",
      "주간 효율 리뷰",
      "필요 시 조정",
    ],
    ogTitle: "ENTJ 시스템 오케스트레이터",
  },
  INTJ: {
    mbti: "INTJ",
    name: "최적화 설계자",
    summary: "데이터와 루틴으로 알림·앱·자동화를 정교하게 설계합니다",
    traits: [
      "알림 미니멀",
      "위치·시간 자동화",
      "충돌 최소화",
      "데이터 기반",
    ],
    settings: {
      notify: ["업무·캘린더만 허용", "소셜 요약"],
      home: ["업무 위젯 1p", "개인 폴더 2p"],
      auto: ["근무시간 집중", "위치 기반 무음"],
    },
    risks: ["초기 설정 피로"],
    checklist: [
      "알림 인벤토리",
      "필요 알림만",
      "주간 로그",
      "한 기능씩 개선",
    ],
    ogTitle: "INTJ 최적화 설계자",
  },
  ENTP: {
    mbti: "ENTP",
    name: "실험 드라이버",
    summary: "신기능 시험과 빠른 피봇",
    traits: [
      "신기능 시험",
      "빠른 피봇",
      "실험적 사용",
      "유연한 설정",
    ],
    settings: {
      notify: ["우선순위 그룹", "실험 앱 알림"],
      home: ["테스트 페이지", "핵심 앱 전면"],
      auto: ["실험 모드 전환", "필요 시 수동"],
    },
    risks: ["과도한 실험으로 혼란"],
    checklist: [
      "신기능 1개씩",
      "주간 정리",
      "불필요 제거",
      "효과 평가",
    ],
    ogTitle: "ENTP 실험 드라이버",
  },
  INTP: {
    mbti: "INTP",
    name: "분석 프로토콜러",
    summary: "앱 비교·로그로 미세 조정",
    traits: [
      "앱 비교 분석",
      "로그 기록",
      "미세 조정",
      "프로토콜 중심",
    ],
    settings: {
      notify: ["필수만 허용", "분석 앱 알림"],
      home: ["분석 도구 위젯", "카테고리 폴더"],
      auto: ["데이터 수집", "로그 자동화"],
    },
    risks: ["과도한 분석으로 실행 지연"],
    checklist: [
      "앱 비교표 작성",
      "사용 로그 기록",
      "주간 분석",
      "최적화 적용",
    ],
    ogTitle: "INTP 분석 프로토콜러",
  },
  ENFJ: {
    mbti: "ENFJ",
    name: "커뮤니케이션 큐레이터",
    summary: "협업·케어 중심 알림 설계",
    traits: [
      "협업 중시",
      "케어 알림",
      "소통 우선",
      "팀 관리",
    ],
    settings: {
      notify: ["팀 메시지 실시간", "가족 알림 우선", "소셜 요약"],
      home: ["커뮤니케이션 위젯", "캘린더 연동"],
      auto: ["업무시간 알림", "주말 소셜 오픈"],
    },
    risks: ["과도한 알림으로 집중 저하"],
    checklist: [
      "알림 그룹 설정",
      "우선순위 정리",
      "집중 시간 보호",
      "주간 리뷰",
    ],
    ogTitle: "ENFJ 커뮤니케이션 큐레이터",
  },
  INFJ: {
    mbti: "INFJ",
    name: "밸런스 가디언",
    summary: "과자극 차단, 집중과 회복의 균형",
    traits: [
      "과자극 차단",
      "집중 보호",
      "회복 시간",
      "균형 중시",
    ],
    settings: {
      notify: ["필수만 허용", "요약 알림"],
      home: ["심플 구성", "필수 앱만"],
      auto: ["집중 모드 자동", "야간 무음"],
    },
    risks: ["과도한 차단으로 소통 단절"],
    checklist: [
      "알림 최소화",
      "집중 시간 설정",
      "회복 시간 확보",
      "주간 균형 점검",
    ],
    ogTitle: "INFJ 밸런스 가디언",
  },
  ENFP: {
    mbti: "ENFP",
    name: "감각 인스파이어",
    summary: "유연한 홈 구성과 직관적 사용, 핵심 가드레일로 과몰입을 막습니다",
    traits: [
      "전면 핵심 앱 6개",
      "요약 알림",
      "주말 오픈",
      "유연한 구성",
    ],
    settings: {
      notify: ["우선순위 그룹", "소셜 요약"],
      home: ["핵심 6개 전면", "검색 중심"],
      auto: ["수면 컷오프", "주말 소셜"],
    },
    risks: ["앱 과다 도입"],
    checklist: [
      "주 1회 정리",
      "신규 1개 룰",
      "수면 모드",
      "화면 시간 목표",
    ],
    ogTitle: "ENFP 감각 인스파이어",
  },
  INFP: {
    mbti: "INFP",
    name: "컴포트 네비게이터",
    summary: "편안한 사용감·심플한 흐름 선호",
    traits: [
      "편안한 사용감",
      "심플한 흐름",
      "저자극",
      "감성적 구성",
    ],
    settings: {
      notify: ["필수만 허용", "조용한 알림"],
      home: ["심플 레이아웃", "감성 위젯"],
      auto: ["야간 무음", "집중 시간 보호"],
    },
    risks: ["과도한 단순화"],
    checklist: [
      "알림 정리",
      "홈 화면 단순화",
      "필수 기능 확인",
      "주간 점검",
    ],
    ogTitle: "INFP 컴포트 네비게이터",
  },
  ESTJ: {
    mbti: "ESTJ",
    name: "규칙 관리자",
    summary: "폴더·알림·시간표 엄격 준수",
    traits: [
      "폴더 엄격",
      "알림 규칙",
      "시간표 준수",
      "체계적 관리",
    ],
    settings: {
      notify: ["카테고리별 규칙", "시간대별 설정"],
      home: ["카테고리 폴더", "시간표 위젯"],
      auto: ["일정 기반 자동", "규칙 엄수"],
    },
    risks: ["과도한 규칙으로 유연성 저하"],
    checklist: [
      "폴더 구조 정리",
      "알림 규칙 설정",
      "시간표 연동",
      "주간 점검",
    ],
    ogTitle: "ESTJ 규칙 관리자",
  },
  ISTJ: {
    mbti: "ISTJ",
    name: "클래식 수호자",
    summary: "검증된 앱과 표준 설정 고수",
    traits: [
      "검증된 앱",
      "표준 설정",
      "안정적 운영",
      "일관성",
    ],
    settings: {
      notify: ["필수만 허용", "표준 알림"],
      home: ["검증된 앱만", "표준 레이아웃"],
      auto: ["기본 자동화", "안정적 설정"],
    },
    risks: ["변화 기피"],
    checklist: [
      "앱 검증",
      "표준 설정 유지",
      "안정성 확인",
      "주간 점검",
    ],
    ogTitle: "ISTJ 클래식 수호자",
  },
  ESTP: {
    mbti: "ESTP",
    name: "스피드 에이스",
    summary: "즉시성 중시, 결과 중심",
    traits: [
      "즉시성 중시",
      "결과 중심",
      "빠른 실행",
      "실용적",
    ],
    settings: {
      notify: ["즉시 알림", "우선순위 그룹"],
      home: ["핵심 앱 전면", "빠른 접근"],
      auto: ["즉시 모드", "필요 시 수동"],
    },
    risks: ["과도한 즉시성으로 집중 저하"],
    checklist: [
      "핵심 앱 정리",
      "알림 우선순위",
      "집중 시간 설정",
      "주간 리뷰",
    ],
    ogTitle: "ESTP 스피드 에이스",
  },
  ISTP: {
    mbti: "ISTP",
    name: "미니멀 옵티마이저",
    summary: "최소 앱으로 최대 효율",
    traits: [
      "최소 앱",
      "최대 효율",
      "미니멀",
      "실용적",
    ],
    settings: {
      notify: ["필수만 허용", "요약 알림"],
      home: ["핵심 앱만", "검색 중심"],
      auto: ["필수 자동화", "최소 설정"],
    },
    risks: ["과도한 미니멀"],
    checklist: [
      "불필요 앱 제거",
      "핵심 앱 확인",
      "효율 점검",
      "주간 정리",
    ],
    ogTitle: "ISTP 미니멀 옵티마이저",
  },
  ESFJ: {
    mbti: "ESFJ",
    name: "소셜 플래너",
    summary: "그룹 소통·캘린더 연동에 강점",
    traits: [
      "그룹 소통",
      "캘린더 연동",
      "소셜 중시",
      "일정 관리",
    ],
    settings: {
      notify: ["그룹 메시지 실시간", "캘린더 알림", "소셜 요약"],
      home: ["캘린더 위젯", "소셜 앱 전면"],
      auto: ["일정 기반 알림", "그룹 모드"],
    },
    risks: ["과도한 소셜로 집중 저하"],
    checklist: [
      "그룹 알림 설정",
      "캘린더 연동",
      "집중 시간 보호",
      "주간 리뷰",
    ],
    ogTitle: "ESFJ 소셜 플래너",
  },
  ISFJ: {
    mbti: "ISFJ",
    name: "포근한 케어테이커",
    summary: "가족·일상 케어 우선, 안정적 운영",
    traits: [
      "가족 케어",
      "일상 관리",
      "안정적 운영",
      "케어 중시",
    ],
    settings: {
      notify: ["가족 알림 우선", "일상 관리", "요약 알림"],
      home: ["가족 앱 전면", "일상 위젯"],
      auto: ["가족 모드", "일상 자동화"],
    },
    risks: ["과도한 케어로 자신 소홀"],
    checklist: [
      "가족 알림 설정",
      "일상 관리 앱",
      "자신 시간 확보",
      "주간 점검",
    ],
    ogTitle: "ISFJ 포근한 케어테이커",
  },
  ESFP: {
    mbti: "ESFP",
    name: "하이라이트 체이서",
    summary: "시각·경험 중심, 위젯 활용",
    traits: [
      "시각 중심",
      "경험 중시",
      "위젯 활용",
      "즉흥적",
    ],
    settings: {
      notify: ["시각적 알림", "경험 앱 알림"],
      home: ["위젯 중심", "시각적 구성"],
      auto: ["경험 모드", "필요 시 수동"],
    },
    risks: ["과도한 시각 자극"],
    checklist: [
      "위젯 정리",
      "시각적 구성",
      "집중 시간 설정",
      "주간 리뷰",
    ],
    ogTitle: "ESFP 하이라이트 체이서",
  },
  ISFP: {
    mbti: "ISFP",
    name: "소프트 아티즌",
    summary: "감성적 커스텀과 저자극 사용",
    traits: [
      "감성적 커스텀",
      "저자극",
      "아티스틱",
      "편안한 사용",
    ],
    settings: {
      notify: ["조용한 알림", "감성 앱 알림"],
      home: ["감성적 구성", "커스텀 위젯"],
      auto: ["야간 무음", "감성 모드"],
    },
    risks: ["과도한 커스텀"],
    checklist: [
      "감성적 구성",
      "알림 정리",
      "저자극 설정",
      "주간 점검",
    ],
    ogTitle: "ISFP 소프트 아티즌",
  },
}

