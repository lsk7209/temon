export type TrendingQuizSeed = {
  slug: string
  title: string
  description: string
  category: '트렌드' | '커리어' | '라이프' | '엔터테인먼트' | '테크'
  tags: string[]
}

/**
 * 2026 트렌드 기반 신규 퀴즈 후보군.
 * - 기존 ALL_TESTS slug와 중복되지 않도록 선별
 * - 제작 우선순위: 숏폼/AI/커리어/자기관리 축
 */
export const TRENDING_QUIZ_SEEDS_2026: TrendingQuizSeed[] = [
  {
    slug: 'ai-prompt-style',
    title: '🤖 AI 프롬프트 스타일 테스트',
    description: '질문 방식과 맥락 설계 습관으로 알아보는 AI 활용 성향',
    category: '테크',
    tags: ['AI', '프롬프트', '생산성', '트렌드'],
  },
  {
    slug: 'ai-love-counsel-style',
    title: '💬 AI 연애상담 사용 성향 테스트',
    description: '고민을 정리하고 질문하는 방식으로 보는 관계 커뮤니케이션 타입',
    category: '트렌드',
    tags: ['AI', '연애', '상담', '대화'],
  },
  {
    slug: 'meme-decoder-2026',
    title: '🧩 2026 밈 해석력 테스트',
    description: '밈을 소비하고 해석하는 속도로 알아보는 디지털 감각',
    category: '엔터테인먼트',
    tags: ['밈', 'SNS', '트렌드', '디지털'],
  },
  {
    slug: 'shortform-hook-style',
    title: '🎬 숏폼 3초 후킹 스타일 테스트',
    description: '첫 문장/첫 장면 선택 습관으로 보는 콘텐츠 몰입 설계 성향',
    category: '트렌드',
    tags: ['숏폼', '릴스', '쇼츠', '콘텐츠'],
  },
  {
    slug: 'shortform-edit-style',
    title: '✂️ 숏폼 편집 성향 테스트',
    description: '컷 분할과 자막 리듬 선택으로 보는 편집자 기질',
    category: '엔터테인먼트',
    tags: ['편집', '숏폼', '영상', '크리에이터'],
  },
  {
    slug: 'digital-detox-type',
    title: '🌿 디지털 디톡스 유형 테스트',
    description: '알림/스크린타임 대처 방식으로 보는 회복 루틴 타입',
    category: '라이프',
    tags: ['디톡스', '집중', '루틴', '웰빙'],
  },
  {
    slug: 'algorithm-bubble-type',
    title: '🫧 알고리즘 버블 유형 테스트',
    description: '추천 피드 소비 습관으로 보는 취향 확장 vs 고정 성향',
    category: '테크',
    tags: ['알고리즘', '추천', '취향', 'SNS'],
  },
  {
    slug: 'threads-tone-style',
    title: '🧵 텍스트 SNS 말투 성향 테스트',
    description: '짧은 글/긴 글 선택과 어조로 보는 온라인 커뮤니케이션 타입',
    category: '트렌드',
    tags: ['텍스트SNS', '말투', '커뮤니케이션', '트렌드'],
  },
  {
    slug: 'profile-branding-type',
    title: '🪪 프로필 브랜딩 성향 테스트',
    description: '자기소개와 프로필 구성 방식으로 보는 퍼스널 브랜딩 성향',
    category: '커리어',
    tags: ['브랜딩', '프로필', '자기표현', 'SNS'],
  },
  {
    slug: 'career-pivot-type',
    title: '🧭 커리어 피벗 유형 테스트',
    description: '기회 판단과 리스크 감수 방식으로 보는 직무 전환 스타일',
    category: '커리어',
    tags: ['커리어', '이직', '성장', '의사결정'],
  },
  {
    slug: 'sideproject-drive-type',
    title: '🚀 사이드프로젝트 추진력 테스트',
    description: '아이디어 실행/협업 방식으로 보는 프로젝트 추진 성향',
    category: '커리어',
    tags: ['사이드프로젝트', '실행력', '협업', '생산성'],
  },
  {
    slug: 'remote-work-comm-type',
    title: '🏠 원격근무 커뮤니케이션 테스트',
    description: '비동기/동기 소통 습관으로 보는 협업 커뮤니케이션 타입',
    category: '커리어',
    tags: ['원격근무', '협업', '커뮤니케이션', '업무'],
  },
  {
    slug: 'notes-organizing-type',
    title: '🗂️ 회의록 정리 성향 테스트',
    description: '요약/구조화 습관으로 알아보는 정보 정리 타입',
    category: '커리어',
    tags: ['회의록', '노션', '정리', '생산성'],
  },
  {
    slug: 'runclub-style',
    title: '🏃 런클럽 참여 스타일 테스트',
    description: '달리기 동기와 페이스 운영 방식으로 보는 운동 사회성 타입',
    category: '라이프',
    tags: ['러닝', '런클럽', '운동', '루틴'],
  },
  {
    slug: 'fitness-consistency-type',
    title: '💪 운동 루틴 지속력 테스트',
    description: '목표 설정과 루틴 유지 방식으로 보는 습관 유지 성향',
    category: '라이프',
    tags: ['운동', '습관', '지속력', '자기관리'],
  },
  {
    slug: 'slow-aging-food-type',
    title: '🥗 저속노화 식습관 성향 테스트',
    description: '식단 선택과 생활 루틴으로 보는 건강 관리 타입',
    category: '라이프',
    tags: ['저속노화', '건강', '식습관', '라이프스타일'],
  },
  {
    slug: 'bloodsugar-control-type',
    title: '📉 혈당 관리 스타일 테스트',
    description: '식사 순서와 간식 패턴으로 보는 혈당 관리 성향',
    category: '라이프',
    tags: ['혈당', '건강', '식단', '습관'],
  },
  {
    slug: 'caffeine-cutoff-type',
    title: '☕ 카페인 컷오프 성향 테스트',
    description: '카페인 섭취 시간과 수면 우선순위로 보는 에너지 관리 타입',
    category: '라이프',
    tags: ['카페인', '수면', '루틴', '집중'],
  },
  {
    slug: 'sleepmaxxing-type',
    title: '😴 슬립맥싱 실천 유형 테스트',
    description: '잠들기 전 루틴과 환경 세팅으로 보는 수면 최적화 타입',
    category: '라이프',
    tags: ['수면', '슬립맥싱', '회복', '루틴'],
  },
  {
    slug: 'travel-vlog-type',
    title: '📹 여행 브이로그 성향 테스트',
    description: '기록 포인트와 편집 흐름 선택으로 보는 여행 기록자 타입',
    category: '엔터테인먼트',
    tags: ['여행', '브이로그', '기록', '콘텐츠'],
  },
  {
    slug: 'airport-waiting-type',
    title: '🛫 공항 대기시간 활용 테스트',
    description: '대기시간 사용 습관으로 보는 계획형 vs 즉흥형 여행 성향',
    category: '트렌드',
    tags: ['공항', '여행', '시간관리', '루틴'],
  },
  {
    slug: 'festival-survival-type',
    title: '🎪 페스티벌 생존력 테스트',
    description: '동선/체력/소지품 운영 방식으로 보는 페스티벌 적응 타입',
    category: '엔터테인먼트',
    tags: ['페스티벌', '공연', '생존', '라이프'],
  },
  {
    slug: 'ticketing-mental-type',
    title: '🎟️ 티켓팅 멘탈 유형 테스트',
    description: '예매 직전 행동과 실패 대처 방식으로 보는 팬덤 행동 성향',
    category: '엔터테인먼트',
    tags: ['티켓팅', '팬덤', '콘서트', '멘탈'],
  },
  {
    slug: 'goods-collector-type',
    title: '🧸 굿즈 수집 성향 테스트',
    description: '수집 기준과 보관 방식으로 보는 취향 큐레이션 타입',
    category: '엔터테인먼트',
    tags: ['굿즈', '수집', '취향', '팬덤'],
  },
  {
    slug: 'secondhand-negotiation-type',
    title: '💸 중고거래 협상 스타일 테스트',
    description: '가격 제안과 대화 방식으로 보는 거래 협상 성향',
    category: '트렌드',
    tags: ['중고거래', '협상', '소비', '커뮤니케이션'],
  },
  {
    slug: 'secondhand-manner-type',
    title: '📦 중고거래 매너 유형 테스트',
    description: '약속/응답/후기 습관으로 보는 거래 신뢰도 성향',
    category: '트렌드',
    tags: ['중고거래', '매너', '커뮤니티', '소통'],
  },
  {
    slug: 'deepwork-entry-type',
    title: '🧠 딥워크 진입 방식 테스트',
    description: '집중 시작 트리거와 방해요소 차단 방식으로 보는 몰입 타입',
    category: '커리어',
    tags: ['집중', '딥워크', '생산성', '업무'],
  },
  {
    slug: 'multi-device-productivity',
    title: '🖥️ 멀티디바이스 생산성 테스트',
    description: '기기 분업 전략으로 보는 디지털 워크플로우 성향',
    category: '테크',
    tags: ['생산성', '디바이스', '워크플로우', '테크'],
  },
  {
    slug: 'finance-automation-type',
    title: '📊 금융 자동화 성향 테스트',
    description: '자동이체/예산관리 습관으로 보는 돈 관리 시스템 타입',
    category: '커리어',
    tags: ['재테크', '자동화', '예산', '관리'],
  },
  {
    slug: 'personal-brand-content-type',
    title: '📣 퍼스널 브랜딩 콘텐츠 성향 테스트',
    description: '발행 주제와 톤 선택으로 보는 1인 브랜드 운영 타입',
    category: '커리어',
    tags: ['퍼스널브랜딩', '콘텐츠', 'SNS', '커리어'],
  },
]
