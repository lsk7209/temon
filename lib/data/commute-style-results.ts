/**
 * 출퇴근 스타일 테스트 결과 데이터 (16 MBTI 유형).
 * 각 결과는 출퇴근 길에서 드러나는 성격 패턴을 엔터테인먼트 관점으로 해석.
 */

export interface ResultType {
  mbti: string;
  name: string;
  summary: string;
  traits: string[];
  presets: {
    status: string[]; // 출근길 현재 상태
    recovery: string[]; // 에너지 회복 팁
    warning: string[]; // 주의할 점
  };
  pitfalls: string[]; // 피곤한 스타일
  recommend: string[]; // 찰떡 스타일
  ogTitle: string;
}

export const COMMUTE_STYLE_RESULTS: Record<string, ResultType> = {
  ISTJ: {
    mbti: "ISTJ",
    name: "정각 도착 지휘관",
    summary: "시간표보다 정확한 걸음. 지하철이 늦으면 내가 이상함",
    traits: ["항상 같은 자리", "정시 도착 집착", "조용한 효율주의"],
    presets: {
      status: ["8시 12분 칸·3번 문 고정", "지하철 앱 2개 비교"],
      recovery: ["퇴근 전 내일 옷 미리 걸어두기", "주말 루틴 유지"],
      warning: ["루틴 깨지면 하루 전체 흔들림 주의"],
    },
    pitfalls: ["ENFP"],
    recommend: ["ESTJ"],
    ogTitle: "ISTJ 정각 도착 지휘관",
  },
  ISFJ: {
    mbti: "ISFJ",
    name: "배려의 손잡이",
    summary: "내릴 분 먼저 내리시라고 한 발 물러서는 타입",
    traits: ["조용한 양보", "친절한 눈인사", "타인 컨디션 챙김"],
    presets: {
      status: [
        "어르신·임산부 자리 우선 양보",
        "혼자 이어폰 소리 크게 틀기 미안함",
      ],
      recovery: ["퇴근길 잔잔한 플레이리스트", "출근 전 10분 조용한 커피"],
      warning: ["혼자서만 배려하다 에너지 고갈"],
    },
    pitfalls: ["ENTP"],
    recommend: ["ESFP"],
    ogTitle: "ISFJ 배려의 손잡이",
  },
  INFJ: {
    mbti: "INFJ",
    name: "출퇴근길 철학자",
    summary: "만원 버스에서 인생 통찰 3개 뽑아내는 타입",
    traits: ["깊은 관찰력", "혼자만의 생각 정리", "미묘한 감정 포착"],
    presets: {
      status: ["창밖 보며 오늘의 질문 던지기", "팟캐스트·철학 오디오북 선호"],
      recovery: ["일기·메모 앱에 통근 인사이트 저장", "도착 후 차 한 잔"],
      warning: ["생각 과잉으로 퇴근 후 번아웃 주의"],
    },
    pitfalls: ["ESTP"],
    recommend: ["ENFP"],
    ogTitle: "INFJ 출퇴근길 철학자",
  },
  INTJ: {
    mbti: "INTJ",
    name: "효율 최적화 엔지니어",
    summary: "환승 3초까지 계산하는 걸어다니는 교통 알고리즘",
    traits: ["루트 최적화", "앱 크로스체크", "무의미한 대화 최소화"],
    presets: {
      status: [
        "카카오맵·지하철안내·구글맵 3중 비교",
        "환승 엘리베이터 위치까지 외움",
      ],
      recovery: ["전략적 통근 요일 배정(재택·대면 분산)", "최단 루트 실험"],
      warning: ["예외 상황(고장·폭설)에 유연성 부족"],
    },
    pitfalls: ["ESFJ"],
    recommend: ["ENTP"],
    ogTitle: "INTJ 효율 최적화 엔지니어",
  },
  ISTP: {
    mbti: "ISTP",
    name: "즉흥 루트 탐험가",
    summary: "오늘 갑자기 버스 환승? 이런 날을 기다렸다",
    traits: ["현장 판단력", "변수 대응 빠름", "말수 적음"],
    presets: {
      status: ["새 정류장·지름길 탐색", "교통 상황 실시간 체감"],
      recovery: ["주말에 통근 외 여정(자전거·산책) 넣기", "혼자 카페 시간"],
      warning: ["루틴 완전 거부 → 약속 시간 지각 가능"],
    },
    pitfalls: ["ESFJ"],
    recommend: ["ESTP"],
    ogTitle: "ISTP 즉흥 루트 탐험가",
  },
  ISFP: {
    mbti: "ISFP",
    name: "감성 창가석 예술가",
    summary: "창가 햇살 보며 오늘 저장할 장면 고르는 사람",
    traits: ["풍경 관찰", "미니멀 짐", "조용한 자기표현"],
    presets: {
      status: ["창밖 사진 1장·마음에 드는 플레이리스트", "엔드포인트는 카페"],
      recovery: ["퇴근 후 혼자 산책", "좋아하는 노래 반복"],
      warning: ["감성 몰입 중 내릴 역 지나칠 주의"],
    },
    pitfalls: ["ENTJ"],
    recommend: ["ENFP"],
    ogTitle: "ISFP 감성 창가석 예술가",
  },
  INFP: {
    mbti: "INFP",
    name: "몽상 버스 탑승자",
    summary: "지하철 안에서 내 인생 영화 시나리오 쓰는 중",
    traits: ["상상력 폭발", "감성적 관찰", "조용한 몰입"],
    presets: {
      status: ["책·웹소설 한 편씩 삼키기", "귀에 감성 플레이리스트"],
      recovery: ["퇴근 후 일기 쓰기", "주말 혼자 영화관"],
      warning: ["출근길 지각하는 패턴 반복 주의"],
    },
    pitfalls: ["ESTJ"],
    recommend: ["ENFJ"],
    ogTitle: "INFP 몽상 버스 탑승자",
  },
  INTP: {
    mbti: "INTP",
    name: "통근길 연구원",
    summary: "만원 지하철 속 군중 행동을 데이터로 보는 사람",
    traits: ["분석적 관찰", "호기심 많음", "무표정한 깊이"],
    presets: {
      status: ["지하철 혼잡도 그래프 상상", "유튜브 다큐 시청"],
      recovery: ["새로운 주제 리서치", "혼자 독서 시간"],
      warning: ["생각에 빠져 내릴 역 놓침 — 상습"],
    },
    pitfalls: ["ESFJ"],
    recommend: ["ENTJ"],
    ogTitle: "INTP 통근길 연구원",
  },
  ESTP: {
    mbti: "ESTP",
    name: "막차 협상가",
    summary: "5분 늦어도 택시·버스·지하철 중 최적 즉석 선택",
    traits: ["순발력", "현장 감각", "위기 돌파"],
    presets: {
      status: ["교통 카드 잔액 앱에서 실시간 확인", "지연 시 플랜B 즉시 가동"],
      recovery: ["운동으로 체력 리셋", "친구랑 퇴근 후 치맥"],
      warning: ["루틴 없이 매일 아슬아슬 → 번아웃"],
    },
    pitfalls: ["INFJ"],
    recommend: ["ESFP"],
    ogTitle: "ESTP 막차 협상가",
  },
  ESFP: {
    mbti: "ESFP",
    name: "통근길 분위기 메이커",
    summary: "옆 사람 반려견 안부까지 확인하는 사교 대장",
    traits: ["친화력", "분위기 감지", "즉흥 대화"],
    presets: {
      status: ["엘리베이터 인사·스몰톡 풀가동", "출근 전 미니 커피 미팅"],
      recovery: ["퇴근 후 사람 만나 수다", "주말 브런치 약속"],
      warning: ["에너지 과다 투입으로 월요병 심화"],
    },
    pitfalls: ["INTJ"],
    recommend: ["ISFP"],
    ogTitle: "ESFP 통근길 분위기 메이커",
  },
  ENFP: {
    mbti: "ENFP",
    name: "새 루트 제안가",
    summary: "오늘 저 라인 처음 타봐! 매일 신선한 루트 탐험",
    traits: ["열린 호기심", "즉흥 전환", "긍정 에너지"],
    presets: {
      status: ["새 카페 들러서 출근", "퇴근길 즉석 산책"],
      recovery: ["주간 루트 교체", "친구와 번개 만남"],
      warning: ["매일 새로움 추구로 소진될 수 있음"],
    },
    pitfalls: ["ISTJ"],
    recommend: ["INFJ"],
    ogTitle: "ENFP 새 루트 제안가",
  },
  ENTP: {
    mbti: "ENTP",
    name: "교통 비효율 지적러",
    summary: "이 역 환승 구조는 왜 이래? 개선안 3개 있음",
    traits: ["비판적 사고", "토론 즐김", "아이디어 연쇄"],
    presets: {
      status: ["통근 경험 글쓰기·SNS 공유", "루트별 시간 비교 기록"],
      recovery: ["새 프로젝트 시작", "흥미로운 통근 인터뷰"],
      warning: ["비판만 하다 실행 타이밍 놓침"],
    },
    pitfalls: ["ISFJ"],
    recommend: ["INTJ"],
    ogTitle: "ENTP 교통 비효율 지적러",
  },
  ESTJ: {
    mbti: "ESTJ",
    name: "팀 출근 매니저",
    summary: "오늘 9시 미팅, 늦지 말라는 리마인더 3번 보냄",
    traits: ["조직 관리", "시간 엄수", "책임감"],
    presets: {
      status: ["팀 전체 출근 체크", "회의실 예약까지 완료"],
      recovery: ["퇴근 후 헬스장 루틴", "가족과 저녁 식사"],
      warning: ["타인의 지각에 과도 스트레스"],
    },
    pitfalls: ["INFP"],
    recommend: ["ISTJ"],
    ogTitle: "ESTJ 팀 출근 매니저",
  },
  ESFJ: {
    mbti: "ESFJ",
    name: "출근길 따뜻한 동반자",
    summary: "동료 컨디션 물어보며 같이 출근하는 힐링",
    traits: ["배려", "그룹 조율", "따뜻한 관심"],
    presets: {
      status: ["아침 인사 카톡 먼저 보냄", "팀 커피 주문 자진"],
      recovery: ["점심 같이 먹으며 수다", "퇴근 동료와 함께"],
      warning: ["모두 챙기다 자기 케어 누락"],
    },
    pitfalls: ["INTP"],
    recommend: ["ISFJ"],
    ogTitle: "ESFJ 출근길 따뜻한 동반자",
  },
  ENFJ: {
    mbti: "ENFJ",
    name: "통근 힐러",
    summary: "만원 지하철에서도 주변 기분 살피는 따뜻한 리더",
    traits: ["감정 공감", "분위기 조율", "책임감"],
    presets: {
      status: ["팀 사기 체크·힘든 동료 상담", "회의 분위기 리드"],
      recovery: ["퇴근 후 취미 시간", "가까운 사람과 대화"],
      warning: ["남 챙기다 본인 피로 누적"],
    },
    pitfalls: ["ISTP"],
    recommend: ["INFP"],
    ogTitle: "ENFJ 통근 힐러",
  },
  ENTJ: {
    mbti: "ENTJ",
    name: "통근 최적화 CEO",
    summary: "통근 시간을 투자 시간으로 쓰는 효율 끝판왕",
    traits: ["전략적 시간 활용", "목표 지향", "리더십"],
    presets: {
      status: ["지하철에서 업무 메일 정리", "하루 목표 체크리스트 점검"],
      recovery: ["퇴근 후 업무 OFF 의식적 차단", "주말 운동"],
      warning: ["쉴 틈 없이 달리다 피로 폭발"],
    },
    pitfalls: ["ISFP"],
    recommend: ["INTP"],
    ogTitle: "ENTJ 통근 최적화 CEO",
  },
};
