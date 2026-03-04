export type QuizBrief = {
  slug: string
  oneLiner: string
  targetKeywords: string[]
  sampleQuestions: string[]
  resultArchetypes: string[]
}

/**
 * 1차 우선 개발 TOP 10의 제작 브리프.
 * 실제 구현 시 question/result 데이터를 빠르게 확장하기 위한 초안 데이터.
 */
export const TRENDING_QUIZ_BRIEFS: QuizBrief[] = [
  {
    slug: 'ai-prompt-style',
    oneLiner: '질문 구조와 맥락 입력 습관으로 보는 AI 협업 성향 테스트',
    targetKeywords: ['AI 프롬프트', '챗GPT 활용', '생산성 테스트', 'AI 성향'],
    sampleQuestions: [
      'AI에게 질문할 때, 먼저 목적을 길게 설명하는 편인가요?',
      '답변이 마음에 들지 않으면 재질문을 어떻게 하나요?',
      'AI 답변을 바로 쓰나요, 내 스타일로 재작성하나요?',
      '새로운 작업을 시작할 때 AI를 어느 타이밍에 호출하나요?',
    ],
    resultArchetypes: ['전략형 프롬프터', '실험형 프롬프터', '속도형 프롬프터', '장인형 프롬프터'],
  },
  {
    slug: 'shortform-hook-style',
    oneLiner: '3초 안에 시선을 잡는 후킹 문장/장면 선택 성향 테스트',
    targetKeywords: ['숏폼', '쇼츠', '릴스', '후킹 문장'],
    sampleQuestions: [
      '첫 장면은 강한 임팩트 vs 궁금증 유도 중 무엇을 택하나요?',
      '자막은 정보형 vs 감성형 중 어디에 가깝나요?',
      '썸네일/첫 프레임을 고를 때 가장 중요하게 보는 건?',
      '조회수가 낮을 때 첫 수정 포인트는?',
    ],
    resultArchetypes: ['임팩트형', '스토리형', '정보형', '감성형'],
  },
  {
    slug: 'algorithm-bubble-type',
    oneLiner: '추천 피드 소비 습관으로 보는 취향 버블 적응/탈출 성향',
    targetKeywords: ['알고리즘 버블', '추천 피드', 'SNS 소비 패턴'],
    sampleQuestions: [
      '추천 피드에서 낯선 주제가 뜨면 어떻게 반응하나요?',
      '구독/팔로우 정리는 얼마나 자주 하나요?',
      '트렌드 영상과 관심사 영상을 어떤 비율로 보나요?',
      '피드가 지루해질 때 취하는 행동은?',
    ],
    resultArchetypes: ['확장 탐험형', '균형 큐레이션형', '몰입 고정형', '알고리즘 조련형'],
  },
  {
    slug: 'career-pivot-type',
    oneLiner: '커리어 전환 시점의 의사결정 방식 테스트',
    targetKeywords: ['커리어 피벗', '이직 성향', '직무 전환 테스트'],
    sampleQuestions: [
      '새로운 기회가 생기면 먼저 리스크부터 계산하나요?',
      '직무 전환을 결심할 때 가장 중요한 기준은?',
      '배우는 기간 동안 수입/성장 중 무엇을 우선하나요?',
      '주변 반대가 있을 때 결정 방식은?',
    ],
    resultArchetypes: ['리스크 관리형', '기회 선점형', '가치 추구형', '데이터 분석형'],
  },
  {
    slug: 'sideproject-drive-type',
    oneLiner: '사이드프로젝트를 시작·유지·완료하는 추진력 성향 테스트',
    targetKeywords: ['사이드프로젝트', '실행력', '생산성'],
    sampleQuestions: [
      '아이디어가 떠오르면 바로 시작 vs 자료 조사 중 어디인가요?',
      '팀 프로젝트에서 맡고 싶은 역할은?',
      '중간 슬럼프가 왔을 때 회복 방법은?',
      '완성 기준을 어떻게 정하나요?',
    ],
    resultArchetypes: ['런처형', '매니저형', '메이커형', '완성형'],
  },
  {
    slug: 'runclub-style',
    oneLiner: '러닝 모임에서의 페이스/관계/목표 성향 테스트',
    targetKeywords: ['런클럽', '러닝 성향', '운동 루틴'],
    sampleQuestions: [
      '런클럽에서 가장 즐거운 순간은?',
      '페이스를 맞출 때 본인 기록 vs 팀 분위기 중 무엇이 우선인가요?',
      '비 오는 날 러닝 계획은?',
      '기록 인증을 남기는 편인가요?',
    ],
    resultArchetypes: ['기록 추구형', '소셜 에너지형', '루틴 수호형', '회복 밸런스형'],
  },
  {
    slug: 'sleepmaxxing-type',
    oneLiner: '수면 최적화를 위한 저녁 루틴 실행 성향 테스트',
    targetKeywords: ['슬립맥싱', '수면 루틴', '회복'],
    sampleQuestions: [
      '잠들기 1시간 전 스마트폰 사용 습관은?',
      '취침 전 루틴(조명/온도/음악)을 얼마나 고정해서 쓰나요?',
      '수면 시간이 부족한 날의 대처 방식은?',
      '카페인 섭취 마감 시간을 지키는 편인가요?',
    ],
    resultArchetypes: ['환경 설계형', '루틴 집행형', '유연 회복형', '감각 최적화형'],
  },
  {
    slug: 'ticketing-mental-type',
    oneLiner: '티켓팅 전후 멘탈/전략/협업 방식 테스트',
    targetKeywords: ['티켓팅', '콘서트 예매', '팬덤 테스트'],
    sampleQuestions: [
      '예매 시작 전 체크리스트를 얼마나 세밀하게 준비하나요?',
      '실패 시 즉시 재도전 vs 다음 기회 준비 중 어떤 편인가요?',
      '티켓팅을 혼자 vs 팀으로 진행하나요?',
      '좌석 선택에서 시야 vs 가격 우선순위는?',
    ],
    resultArchetypes: ['전략 지휘형', '속도 돌파형', '분산 협업형', '멘탈 회복형'],
  },
  {
    slug: 'secondhand-negotiation-type',
    oneLiner: '중고거래 제안·협상·마무리 대화 스타일 테스트',
    targetKeywords: ['중고거래', '가격협상', '당근거래'],
    sampleQuestions: [
      '첫 제안가는 어떻게 정하나요?',
      '상대가 낮은 가격을 부르면 어떻게 대응하나요?',
      '거래 일정 조율에서 중요한 기준은?',
      '거래 후 피드백 메시지를 남기나요?',
    ],
    resultArchetypes: ['정찰가 원칙형', '유연 협상형', '속전속결형', '신뢰 구축형'],
  },
  {
    slug: 'personal-brand-content-type',
    oneLiner: '퍼스널 브랜딩 콘텐츠 기획/발행 성향 테스트',
    targetKeywords: ['퍼스널 브랜딩', '콘텐츠 기획', '크리에이터'],
    sampleQuestions: [
      '콘텐츠 주제는 트렌드 vs 전문성 중 어디에 두나요?',
      '발행 주기를 고정하는 편인가요?',
      '댓글/반응 데이터를 다음 기획에 반영하나요?',
      '영상/글/이미지 중 주력 포맷은 무엇인가요?',
    ],
    resultArchetypes: ['전문성 축적형', '트렌드 파도형', '커뮤니티 소통형', '시스템 운영형'],
  },
]
