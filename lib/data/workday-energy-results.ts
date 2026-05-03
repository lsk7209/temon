/**
 * 업무 에너지 테스트 결과 데이터 (16 MBTI 유형).
 * 일터에서 드러나는 에너지 사용·회복·상호작용 패턴을 엔터테인먼트 관점으로 해석.
 */

export interface ResultType {
  mbti: string;
  name: string;
  summary: string;
  traits: string[];
  presets: {
    status: string[];
    recovery: string[];
    warning: string[];
  };
  pitfalls: string[];
  recommend: string[];
  ogTitle: string;
}

export const WORKDAY_ENERGY_RESULTS: Record<string, ResultType> = {
  ISTJ: {
    mbti: "ISTJ",
    name: "체크리스트 수호자",
    summary: "일과를 표로 만들어두면 마음이 가장 편해지는 타입",
    traits: ["우선순위 명확", "납기 사수", "조용한 책임감"],
    presets: {
      status: ["주간 to-do 위에 시간 블록까지 색칠", "예외 요청은 메모 남겨 다음 회차로"],
      recovery: ["퇴근 30분 전 내일 첫 작업 정해두기", "주말 같은 시간 휴식 루틴"],
      warning: ["급한 변경에 유연성 부족, 답답함 폭발 주의"],
    },
    pitfalls: ["ENFP"],
    recommend: ["ESTJ"],
    ogTitle: "ISTJ 체크리스트 수호자",
  },
  ISFJ: {
    mbti: "ISFJ",
    name: "조용한 후방 지원관",
    summary: "회의 끝나고 누가 뭘 정리해야 할지 가장 먼저 보는 사람",
    traits: ["세심한 배려", "자료 정리 마스터", "감정 관찰력"],
    presets: {
      status: ["회의 노트 자동 공유", "동료 컨디션 살피며 일감 분배"],
      recovery: ["퇴근길 잔잔한 음악 + 혼자만의 산책", "주말 한 끼 정성 식사"],
      warning: ["혼자 다 챙기다 번아웃, 부탁받기 거절을 못 함"],
    },
    pitfalls: ["ENTP"],
    recommend: ["ESFP"],
    ogTitle: "ISFJ 조용한 후방 지원관",
  },
  INFJ: {
    mbti: "INFJ",
    name: "팀 분위기 통찰자",
    summary: "회의 분위기 1초 만에 읽고 다음 한 마디를 고르는 타입",
    traits: ["공기 읽기", "장기 비전", "혼자 사색하는 시간 필요"],
    presets: {
      status: ["1on1 대화 후 메모 정리", "조용한 시간에 큰 그림 정리"],
      recovery: ["저널·일기 쓰기", "혼자 카페에서 정리 시간"],
      warning: ["과도한 감정 흡수로 퇴근 후 무기력"],
    },
    pitfalls: ["ESTP"],
    recommend: ["ENFP"],
    ogTitle: "INFJ 팀 분위기 통찰자",
  },
  INTJ: {
    mbti: "INTJ",
    name: "프로세스 설계자",
    summary: "왜 이렇게 하는지 모르면 그 일을 못 하는 타입",
    traits: ["구조 설계", "효율 최적화", "잡담 최소"],
    presets: {
      status: ["워크플로우 다이어그램 그리며 정리", "비효율 발견 시 즉시 개선안 제안"],
      recovery: ["주 1회 깊은 집중 블록", "시스템 책 읽기"],
      warning: ["변경에 보수적, 협업자가 이유 설명 안 하면 신뢰 떨어짐"],
    },
    pitfalls: ["ESFJ"],
    recommend: ["ENTJ"],
    ogTitle: "INTJ 프로세스 설계자",
  },
  ISTP: {
    mbti: "ISTP",
    name: "현장 트러블슈터",
    summary: "장비·시스템이 멈추면 가장 먼저 손이 가는 사람",
    traits: ["문제 해결력", "도구 친화", "말보다 행동"],
    presets: {
      status: ["수리·디버깅에 몰입", "필요한 만큼만 보고"],
      recovery: ["혼자 만지작거리는 사이드 프로젝트", "야외 활동"],
      warning: ["과정 공유가 부족해 협업자 답답함"],
    },
    pitfalls: ["ENFJ"],
    recommend: ["ESTP"],
    ogTitle: "ISTP 현장 트러블슈터",
  },
  ISFP: {
    mbti: "ISFP",
    name: "분위기 감각 디자이너",
    summary: "결과물 디자인·톤·문구에 가장 먼저 손길이 가는 타입",
    traits: ["감각적 마무리", "조용한 자기 표현", "유연함"],
    presets: {
      status: ["문서 톤·이미지 컬러까지 신경", "팀 분위기에 맞춰 표현 조절"],
      recovery: ["손으로 만드는 취미", "음악·전시 감상"],
      warning: ["갈등 회피로 본인 의견을 못 냄"],
    },
    pitfalls: ["ENTJ"],
    recommend: ["ESFP"],
    ogTitle: "ISFP 분위기 감각 디자이너",
  },
  INFP: {
    mbti: "INFP",
    name: "의미 추구 작가",
    summary: '"이 일이 왜 의미 있는가"가 풀려야 손이 움직이는 타입',
    traits: ["의미 부여", "내면 언어 풍부", "혼자만의 몰입 시간"],
    presets: {
      status: ["프로젝트 미션 글로 정리", "동료 한 명에게 깊은 피드백"],
      recovery: ["글쓰기·일기·시 쓰기", "산책하며 생각 정리"],
      warning: ["완벽주의로 마감 늦어짐, 가치 충돌 시 번아웃"],
    },
    pitfalls: ["ESTJ"],
    recommend: ["ENFJ"],
    ogTitle: "INFP 의미 추구 작가",
  },
  INTP: {
    mbti: "INTP",
    name: "가설 검증 분석가",
    summary: "회의 중 누군가 \"왜?\"라고 물으면 가장 신난 얼굴이 되는 사람",
    traits: ["호기심", "논리 구조", "독립적 사고"],
    presets: {
      status: ["데이터 잘라보며 가설 점검", "노트에 다이어그램 마구 그림"],
      recovery: ["혼자 깊게 파는 학습 시간", "심야 코딩"],
      warning: ["수다 가설은 많지만 실행 적음"],
    },
    pitfalls: ["ESFJ"],
    recommend: ["ENTJ"],
    ogTitle: "INTP 가설 검증 분석가",
  },
  ESTP: {
    mbti: "ESTP",
    name: "현장 추진력 엔진",
    summary: "막히면 일단 한 번 해보고 나서 데이터 보는 타입",
    traits: ["즉각 실행", "위기 대응", "현실 감각"],
    presets: {
      status: ["급한 이슈에 가장 먼저 손 들기", "현장에서 직접 결정"],
      recovery: ["운동·스포츠로 에너지 발산", "사람들과 떠들썩한 회식"],
      warning: ["장기 계획·디테일 정리는 약함"],
    },
    pitfalls: ["INFJ"],
    recommend: ["ESFP"],
    ogTitle: "ESTP 현장 추진력 엔진",
  },
  ESFP: {
    mbti: "ESFP",
    name: "팀 무드메이커",
    summary: "사무실 공기를 1도 따뜻하게 만드는 사람",
    traits: ["친근한 에너지", "분위기 환기", "현재 즐기기"],
    presets: {
      status: ["커피 같이 가자고 먼저 부르기", "팀 행사·생일 챙김"],
      recovery: ["친구·동료와 만남", "맛집 탐방"],
      warning: ["디테일·반복 작업에서 집중력 저하"],
    },
    pitfalls: ["INTJ"],
    recommend: ["ESTP"],
    ogTitle: "ESFP 팀 무드메이커",
  },
  ENFP: {
    mbti: "ENFP",
    name: "아이디어 폭죽 발사기",
    summary: "회의 중 가장 많은 \"근데 우리 이거 해보면 어때요?\"가 나오는 사람",
    traits: ["아이디어 발산", "사람 에너지", "즉흥성"],
    presets: {
      status: ["여러 프로젝트 동시 점프", "동료들 활력 부여"],
      recovery: ["새로운 사람·장소 자극", "취미 폭넓게"],
      warning: ["반복 일에 빠르게 지루해짐, 마무리 약함"],
    },
    pitfalls: ["ISTJ"],
    recommend: ["INFJ"],
    ogTitle: "ENFP 아이디어 폭죽 발사기",
  },
  ENTP: {
    mbti: "ENTP",
    name: "토론 점화 챔피언",
    summary: "정해진 결론에 \"근데 반대 케이스 보면\"을 던지는 타입",
    traits: ["논쟁 즐김", "패턴 발견", "실험 정신"],
    presets: {
      status: ["회의 중 새 관점 던지기", "프로토타입 빠르게 만들기"],
      recovery: ["치열한 토론·디베이트", "새 분야 학습"],
      warning: ["감정 고려 없이 직설적이라 동료에게 상처"],
    },
    pitfalls: ["ISFJ"],
    recommend: ["INTJ"],
    ogTitle: "ENTP 토론 점화 챔피언",
  },
  ESTJ: {
    mbti: "ESTJ",
    name: "프로젝트 매니저 본능",
    summary: "분명한 일정·역할·기대치 없으면 일을 시작 못 하는 타입",
    traits: ["조직력", "결단력", "책임감"],
    presets: {
      status: ["WBS 그려서 공유", "역할·납기 명확히 통보"],
      recovery: ["완수한 to-do 체크할 때의 만족감", "운동 루틴"],
      warning: ["변경에 보수적, 감정 케어가 후순위"],
    },
    pitfalls: ["INFP"],
    recommend: ["ISTJ"],
    ogTitle: "ESTJ 프로젝트 매니저 본능",
  },
  ESFJ: {
    mbti: "ESFJ",
    name: "팀 케어 코디네이터",
    summary: "동료 누가 컨디션이 안 좋은지 가장 빨리 알아채는 사람",
    traits: ["조화 추구", "팀 건강 관리", "헌신적"],
    presets: {
      status: ["팀 점심·간식 챙김", "갈등 중재 역할"],
      recovery: ["가까운 사람들과 식사", "일정한 사회적 만남"],
      warning: ["갈등 회피로 본질 토론을 늦춤"],
    },
    pitfalls: ["INTP"],
    recommend: ["ISFJ"],
    ogTitle: "ESFJ 팀 케어 코디네이터",
  },
  ENFJ: {
    mbti: "ENFJ",
    name: "동기 부여 리더",
    summary: "팀원이 어디서 막혔는지 보이면 그 자리에서 같이 풀어주는 타입",
    traits: ["사람 성장 관심", "비전 제시", "공감 능력"],
    presets: {
      status: ["1on1 자주 잡기", "팀 비전 정기 공유"],
      recovery: ["코칭·멘토링", "큰 그림 정리하는 글쓰기"],
      warning: ["타인 감정 챙기다 본인 소진"],
    },
    pitfalls: ["ISTP"],
    recommend: ["INFP"],
    ogTitle: "ENFJ 동기 부여 리더",
  },
  ENTJ: {
    mbti: "ENTJ",
    name: "전략 추진 캡틴",
    summary: "OKR·로드맵·KPI를 일주일 만에 정렬하는 사람",
    traits: ["목표 지향", "결단력", "효율 추구"],
    presets: {
      status: ["로드맵 시각화", "리소스 재배분 제안"],
      recovery: ["목표 달성 후 짧고 강한 휴가", "성과 회고"],
      warning: ["속도 우선이라 동료 페이스 무시 위험"],
    },
    pitfalls: ["ISFP"],
    recommend: ["INTJ"],
    ogTitle: "ENTJ 전략 추진 캡틴",
  },
};
