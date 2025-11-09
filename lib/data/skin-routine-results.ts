/**
 * 피부 루틴 성향 테스트 결과 데이터 (16유형)
 */

export interface ResultType {
  mbti: string
  name: string
  summary: string
  traits: string[]
  amRoutine: string[]
  pmRoutine: string[]
  pitfalls: string[]
  recommend: string[]
  ogTitle: string
}

export const SKIN_ROUTINE_RESULTS: Record<string, ResultType> = {
  ENFP: {
    mbti: "ENFP",
    name: "스파클 플레이어",
    summary: "오늘 컨디션에 맞춰 유쾌하게 변주",
    traits: [
      "새로운 텍스처 시도",
      "사용감 중시",
      "공유 적극",
      "즉효감 선호",
    ],
    amRoutine: [
      "미온수 세안",
      "가벼운 토너",
      "수분 세럼",
      "선크림",
    ],
    pmRoutine: [
      "세안",
      "토너",
      "광채/수분 세럼",
      "슬리핑 마스크(상태별)",
    ],
    pitfalls: [
      "단계 과다변경",
      "자극 감지 지연",
    ],
    recommend: [
      "수분 세럼",
      "광채 피니셔",
      "진정 마스크",
    ],
    ogTitle: "ENFP 스파클 플레이어",
  },
  INFP: {
    mbti: "INFP",
    name: "포근 케어러",
    summary: "감정과 피부균형을 조화롭게",
    traits: [
      "진정 집중",
      "향·무드 중요",
      "조용히 지속",
      "감성적 선택",
    ],
    amRoutine: [
      "부드러운 세안",
      "진정 토너",
      "보습 세럼",
      "선크림",
    ],
    pmRoutine: [
      "1차 클렌징",
      "부드러운 세안",
      "진정 토너",
      "보습 크림",
      "슬리핑 팩(선택)",
    ],
    pitfalls: [
      "과도한 제품 교체",
      "자극 제품 사용",
    ],
    recommend: [
      "진정 토너",
      "보습 세럼",
      "무향 크림",
    ],
    ogTitle: "INFP 포근 케어러",
  },
  ENFJ: {
    mbti: "ENFJ",
    name: "케어 큐레이터",
    summary: "주변도 함께 관리해주는 리더형",
    traits: [
      "가족·지인 루틴 설계",
      "기본 충실",
      "공유 적극",
      "체계적 관리",
    ],
    amRoutine: [
      "세안",
      "토너",
      "보습 세럼",
      "선크림",
    ],
    pmRoutine: [
      "1차 클렌징",
      "세안",
      "토너",
      "보습 세럼",
      "크림",
    ],
    pitfalls: [
      "타인 추천에 과도 의존",
      "자신 루틴 소홀",
    ],
    recommend: [
      "기본 라인 세트",
      "보습 크림",
      "선크림",
    ],
    ogTitle: "ENFJ 케어 큐레이터",
  },
  INFJ: {
    mbti: "INFJ",
    name: "밸런스 시어",
    summary: "감수성과 질서의 균형",
    traits: [
      "과하지 않게 정교",
      "진정-보습 흐름 선호",
      "완벽한 루틴 추구",
      "직관적 선택",
    ],
    amRoutine: [
      "약산성 세안",
      "진정 토너",
      "보습 세럼",
      "선크림",
    ],
    pmRoutine: [
      "1차 클렌징",
      "약산성 세안",
      "진정 토너",
      "보습 세럼",
      "크림",
    ],
    pitfalls: [
      "과도한 완벽주의",
      "제품 교체 주저",
    ],
    recommend: [
      "약산성 클렌저",
      "진정 토너",
      "보습 세럼",
    ],
    ogTitle: "INFJ 밸런스 시어",
  },
  ENTP: {
    mbti: "ENTP",
    name: "루틴 해커",
    summary: "규칙을 실험으로 재해석",
    traits: [
      "신기술 테스트",
      "단계 합치기 즐김",
      "효율 추구",
      "혁신적 접근",
    ],
    amRoutine: [
      "올인원 제품",
      "선크림",
    ],
    pmRoutine: [
      "세안",
      "멀티 세럼",
      "크림",
    ],
    pitfalls: [
      "과도한 실험",
      "기본 루틴 소홀",
    ],
    recommend: [
      "올인원 제품",
      "멀티 세럼",
      "효율 크림",
    ],
    ogTitle: "ENTP 루틴 해커",
  },
  INTP: {
    mbti: "INTP",
    name: "데이터 믹서",
    summary: "성분·농도부터 체크",
    traits: [
      "임상/논리 우선",
      "과학적 미니멀리즘",
      "성분 분석",
      "효율적 선택",
    ],
    amRoutine: [
      "약산성 세안",
      "효능 세럼",
      "선크림",
    ],
    pmRoutine: [
      "세안",
      "효능 세럼",
      "미니멀 크림",
    ],
    pitfalls: [
      "과도한 성분 분석",
      "실용성 간과",
    ],
    recommend: [
      "약산성 클렌저",
      "효능 세럼",
      "미니멀 크림",
    ],
    ogTitle: "INTP 데이터 믹서",
  },
  ENTJ: {
    mbti: "ENTJ",
    name: "모드 체인저",
    summary: "기분 따라 루틴 모드 전환",
    traits: [
      "라이트/리치 자유 변환",
      "상황 대응",
      "효율 추구",
      "결정력",
    ],
    amRoutine: [
      "세안",
      "토너",
      "세럼",
      "선크림",
    ],
    pmRoutine: [
      "세안",
      "토너",
      "세럼(상태별)",
      "크림",
    ],
    pitfalls: [
      "일관성 부족",
      "과도한 변화",
    ],
    recommend: [
      "다목적 세럼",
      "적응형 크림",
      "선크림",
    ],
    ogTitle: "ENTJ 모드 체인저",
  },
  INTJ: {
    mbti: "INTJ",
    name: "딥 힐러",
    summary: "회복 최우선",
    traits: [
      "수면·보습 루틴 고집",
      "과자극 회피",
      "장기적 관점",
      "체계적 관리",
    ],
    amRoutine: [
      "부드러운 세안",
      "진정 토너",
      "보습 세럼",
      "선크림",
    ],
    pmRoutine: [
      "1차 클렌징",
      "부드러운 세안",
      "진정 토너",
      "보습 세럼",
      "회복 크림",
    ],
    pitfalls: [
      "과도한 보호",
      "신제품 기피",
    ],
    recommend: [
      "진정 토너",
      "보습 세럼",
      "회복 크림",
    ],
    ogTitle: "INTJ 딥 힐러",
  },
  ESTJ: {
    mbti: "ESTJ",
    name: "프로 매니저",
    summary: "기준·체크리스트로 운영",
    traits: [
      "용량·시간 엄수",
      "재구매 규칙적",
      "체계적 관리",
      "일관성",
    ],
    amRoutine: [
      "세안",
      "토너",
      "세럼",
      "선크림(용량 엄수)",
    ],
    pmRoutine: [
      "1차 클렌징",
      "세안",
      "토너",
      "세럼",
      "크림",
    ],
    pitfalls: [
      "유연성 부족",
      "변화 기피",
    ],
    recommend: [
      "기본 라인 세트",
      "선크림",
      "크림",
    ],
    ogTitle: "ESTJ 프로 매니저",
  },
  ISTJ: {
    mbti: "ISTJ",
    name: "솔리드 키퍼",
    summary: "검증된 정석 루틴을 꾸준히 지키는 안정형",
    traits: [
      "변동 최소화",
      "체크리스트 운영",
      "민감관리 강점",
      "일관성",
    ],
    amRoutine: [
      "약산성 세안",
      "토너",
      "저자극 보습",
      "무기자차",
    ],
    pmRoutine: [
      "1차 클렌징(필요시)",
      "약산성 세안",
      "토너",
      "진정 세럼",
      "보습 크림",
    ],
    pitfalls: [
      "동시 신제품 테스트",
      "주기 외 각질케어",
    ],
    recommend: [
      "약산성 클렌저",
      "판테놀/베타글루칸 진정 세럼",
      "무향 보습크림",
      "PA 높은 자외선차단",
    ],
    ogTitle: "ISTJ 솔리드 키퍼",
  },
  ESTP: {
    mbti: "ESTP",
    name: "스냅 리부트",
    summary: "빠르고 정확한 해결",
    traits: [
      "즉시 진정",
      "필요 단계만",
      "실행력",
      "빠른 대응",
    ],
    amRoutine: [
      "세안",
      "올인원 제품",
      "선크림",
    ],
    pmRoutine: [
      "세안",
      "진정 세럼",
      "크림",
    ],
    pitfalls: [
      "기본 루틴 소홀",
      "과도한 간소화",
    ],
    recommend: [
      "올인원 제품",
      "진정 세럼",
      "선크림",
    ],
    ogTitle: "ESTP 스냅 리부트",
  },
  ISTP: {
    mbti: "ISTP",
    name: "쿨 다운 타이퍼",
    summary: "말수 적고 실용적",
    traits: [
      "저자극 위주",
      "군더더기 없음",
      "미니멀",
      "효율적",
    ],
    amRoutine: [
      "세안",
      "토너",
      "선크림",
    ],
    pmRoutine: [
      "세안",
      "토너",
      "크림",
    ],
    pitfalls: [
      "과도한 미니멀",
      "보습 부족",
    ],
    recommend: [
      "저자극 클렌저",
      "토너",
      "미니멀 크림",
    ],
    ogTitle: "ISTP 쿨 다운 타이퍼",
  },
  ESFJ: {
    mbti: "ESFJ",
    name: "워밍 케어메이커",
    summary: "다정한 챙김형",
    traits: [
      "주변 권유·공유",
      "기본 보습 철저",
      "배려심",
      "일관성",
    ],
    amRoutine: [
      "세안",
      "토너",
      "보습 세럼",
      "선크림",
    ],
    pmRoutine: [
      "1차 클렌징",
      "세안",
      "토너",
      "보습 세럼",
      "크림",
    ],
    pitfalls: [
      "타인 의견 과도 반영",
      "자신 루틴 소홀",
    ],
    recommend: [
      "기본 라인 세트",
      "보습 세럼",
      "크림",
    ],
    ogTitle: "ESFJ 워밍 케어메이커",
  },
  ISFJ: {
    mbti: "ISFJ",
    name: "소프트 가디언",
    summary: "안정 최우선",
    traits: [
      "일정한 루틴",
      "계절별 미세 조정",
      "안정성",
      "꾸준함",
    ],
    amRoutine: [
      "부드러운 세안",
      "토너",
      "보습 세럼",
      "선크림",
    ],
    pmRoutine: [
      "1차 클렌징",
      "부드러운 세안",
      "토너",
      "보습 세럼",
      "크림",
    ],
    pitfalls: [
      "변화 기피",
      "신제품 시도 주저",
    ],
    recommend: [
      "부드러운 클렌저",
      "보습 세럼",
      "크림",
    ],
    ogTitle: "ISFJ 소프트 가디언",
  },
  ESFP: {
    mbti: "ESFP",
    name: "글로우 메이커",
    summary: "즉각적 만족 선호",
    traits: [
      "광채 연출",
      "사용감/즉효감 중요",
      "즉흥적",
      "즐거움 추구",
    ],
    amRoutine: [
      "세안",
      "광채 토너",
      "수분 세럼",
      "선크림",
    ],
    pmRoutine: [
      "세안",
      "토너",
      "광채 세럼",
      "크림",
    ],
    pitfalls: [
      "일관성 부족",
      "과도한 제품 교체",
    ],
    recommend: [
      "광채 토너",
      "수분 세럼",
      "글로우 크림",
    ],
    ogTitle: "ESFP 글로우 메이커",
  },
  ISFP: {
    mbti: "ISFP",
    name: "미니멀 글레이저",
    summary: "감각적 미니멀",
    traits: [
      "간결한 단계",
      "텍스처 선별 집요",
      "감성적 선택",
      "미니멀",
    ],
    amRoutine: [
      "세안",
      "토너",
      "선크림",
    ],
    pmRoutine: [
      "세안",
      "토너",
      "크림",
    ],
    pitfalls: [
      "과도한 미니멀",
      "필수 단계 누락",
    ],
    recommend: [
      "감각적 클렌저",
      "토너",
      "미니멀 크림",
    ],
    ogTitle: "ISFP 미니멀 글레이저",
  },
}

