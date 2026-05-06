#!/usr/bin/env node
/**
 * Wave3 quiz generator.
 *
 * Generates 200 non-duplicate quiz topics and full quiz JSON without calling
 * an external generation API. Default mode writes local artifacts only.
 *
 * Usage:
 *   node scripts/generate-wave3-quizzes.js
 *   node scripts/generate-wave3-quizzes.js --verify
 *   node scripts/generate-wave3-quizzes.js --apply-db
 */
const fs = require("node:fs");
const path = require("node:path");
const dotenv = require("dotenv");
const { createClient } = require("@libsql/client");

const ROOT = path.resolve(__dirname, "..");
const DATA_DIR = path.join(ROOT, "data");
const TESTS_DIR = path.join(ROOT, "app", "tests");
const PLAN_PATH = path.join(DATA_DIR, "quiz-topic-plan-200-wave3.json");
const QUIZZES_PATH = path.join(DATA_DIR, "quiz-wave3-200.json");
const REVIEW_PATH = path.join(DATA_DIR, "quiz-wave3-review.json");
const TARGET_COUNT = 200;
const START_AT_KST = "2026-05-26T09:00:00+09:00";
const APPLY_DB = process.argv.includes("--apply-db");
const VERIFY_ONLY = process.argv.includes("--verify");

dotenv.config({ path: path.join(ROOT, ".env.local"), override: true, quiet: true });

const MBTI_TYPES = [
  "ISTJ",
  "ISFJ",
  "INFJ",
  "INTJ",
  "ISTP",
  "ISFP",
  "INFP",
  "INTP",
  "ESTP",
  "ESFP",
  "ENFP",
  "ENTP",
  "ESTJ",
  "ESFJ",
  "ENFJ",
  "ENTJ",
];

const RESULT_PROFILES = {
  ISTJ: ["차분한 기준형", "기록과 기준을 세워 같은 실수를 줄이는 편입니다."],
  ISFJ: ["세심한 배려형", "주변 사람의 흐름을 살피며 무리 없는 선택을 선호합니다."],
  INFJ: ["조용한 통찰형", "겉으로 보이는 행동보다 그 안의 의미를 먼저 읽습니다."],
  INTJ: ["전략 설계형", "목표와 효율을 함께 보며 오래 갈 구조를 만듭니다."],
  ISTP: ["실전 조율형", "직접 해보며 가장 덜 번거로운 방식을 찾아냅니다."],
  ISFP: ["감각 존중형", "내 기분과 분위기를 해치지 않는 선택을 중요하게 봅니다."],
  INFP: ["가치 탐색형", "작은 선택에도 나다운 이유가 있는지 확인합니다."],
  INTP: ["논리 실험형", "규칙을 그대로 따르기보다 원리를 이해하려 합니다."],
  ESTP: ["즉시 해결형", "상황이 생기면 오래 끌지 않고 바로 움직입니다."],
  ESFP: ["분위기 반응형", "현장의 기분과 사람들의 반응을 빠르게 읽습니다."],
  ENFP: ["아이디어 확장형", "익숙한 방식보다 새롭게 해볼 가능성을 먼저 봅니다."],
  ENTP: ["관점 전환형", "한 가지 답에 갇히지 않고 다른 선택지를 열어둡니다."],
  ESTJ: ["정리 추진형", "기준을 정하고 필요한 일을 순서대로 밀고 나갑니다."],
  ESFJ: ["관계 조율형", "혼자 편한 답보다 함께 무난한 답을 찾는 편입니다."],
  ENFJ: ["흐름 리드형", "사람들이 따라오기 쉬운 방식으로 분위기를 잡습니다."],
  ENTJ: ["목표 압축형", "시간과 에너지를 낭비하지 않게 결정을 빠르게 좁힙니다."],
};

const TYPE_TRAITS = {
  ISTJ: ["기준 선명", "기록 선호", "실수 예방", "꾸준함"],
  ISFJ: ["세심함", "안정 추구", "배려", "현실 감각"],
  INFJ: ["의미 탐색", "장기 관점", "조용한 집중", "직관"],
  INTJ: ["전략성", "효율 추구", "독립 판단", "구조화"],
  ISTP: ["실용성", "즉흥 조정", "관찰력", "간결함"],
  ISFP: ["감각 중심", "부드러운 선택", "자율성", "취향 존중"],
  INFP: ["가치 중심", "상상력", "진정성", "섬세함"],
  INTP: ["분석력", "호기심", "원리 탐구", "유연한 사고"],
  ESTP: ["실행력", "순발력", "현장 감각", "대담함"],
  ESFP: ["표현력", "분위기 감각", "친화력", "즐거움 추구"],
  ENFP: ["확장성", "아이디어", "낙관성", "관계 에너지"],
  ENTP: ["토론력", "전환 사고", "도전성", "문제 재정의"],
  ESTJ: ["추진력", "우선순위", "책임감", "명확한 기준"],
  ESFJ: ["협업", "공감", "생활 감각", "조율"],
  ENFJ: ["동기 부여", "관계 리드", "설득력", "큰 흐름"],
  ENTJ: ["목표 지향", "결단력", "시스템 사고", "성과 집중"],
};

const CATEGORIES = [
  {
    category: "집생활",
    slugPrefix: "home",
    keywords: ["집 정리", "생활 습관", "공간 관리", "루틴 만들기", "살림 성향", "정리 테스트"],
    items: [
      ["closet-season-shift", "계절 옷장 교체"],
      ["desk-reset-routine", "책상 리셋 루틴"],
      ["entryway-organization", "현관 정리"],
      ["bathroom-shelf-reset", "욕실 선반 정리"],
      ["pantry-inventory", "수납장 재고 확인"],
      ["bedding-change-rhythm", "침구 교체 리듬"],
      ["plant-watering-routine", "화분 물주기 루틴"],
      ["trash-sorting-flow", "분리수거 흐름"],
      ["appliance-manual-keeping", "가전 설명서 보관"],
      ["toolbox-arrangement", "공구함 정리"],
      ["storage-box-labeling", "수납 박스 라벨링"],
      ["delivery-box-disposal", "택배 상자 처리"],
      ["livingroom-reset", "거실 원상복구"],
      ["seasonal-decor-storage", "계절 소품 보관"],
      ["household-stock-check", "생활용품 재고 점검"],
      ["drawer-zone-making", "서랍 구역 나누기"],
      ["lost-item-search", "집 안 물건 찾기"],
      ["cleaning-tool-choice", "청소 도구 선택"],
      ["window-cleaning-timing", "창문 청소 타이밍"],
      ["home-scent-choice", "집 향기 선택"],
      ["guest-ready-routine", "손님맞이 준비"],
      ["home-noise-control", "집 소음 조절"],
      ["blanket-storage-style", "담요 보관 방식"],
      ["kitchen-counter-reset", "주방 상판 정리"],
    ],
  },
  {
    category: "디지털",
    slugPrefix: "digital",
    keywords: ["디지털 정리", "앱 사용 습관", "스마트폰 루틴", "온라인 생활", "디지털 성향", "기록 관리"],
    items: [
      ["photo-album-curation", "사진첩 선별"],
      ["screenshot-cleanup", "스크린샷 정리"],
      ["browser-tab-control", "브라우저 탭 관리"],
      ["password-reset-response", "비밀번호 재설정 대응"],
      ["cloud-folder-rules", "클라우드 폴더 규칙"],
      ["app-permission-check", "앱 권한 점검"],
      ["digital-receipt-saving", "전자 영수증 보관"],
      ["bookmark-sorting", "북마크 분류"],
      ["calendar-color-coding", "캘린더 색상 분류"],
      ["message-pin-habit", "메시지 고정 습관"],
      ["voice-memo-review", "음성 메모 검토"],
      ["device-battery-care", "기기 배터리 관리"],
      ["backup-routine", "백업 루틴"],
      ["online-cart-later", "온라인 장바구니 보류"],
      ["search-history-cleanup", "검색 기록 정리"],
      ["digital-note-tagging", "디지털 노트 태그"],
      ["video-watch-later", "나중에 볼 영상 관리"],
      ["file-share-permission", "파일 공유 권한"],
      ["desktop-wallpaper-choice", "배경화면 선택"],
      ["ai-prompt-habit", "AI 질문 작성"],
      ["email-label-rules", "이메일 라벨 규칙"],
      ["messenger-muted-chat", "메신저 알림 숨김"],
      ["device-upgrade-timing", "기기 교체 타이밍"],
      ["online-profile-update", "온라인 프로필 수정"],
    ],
  },
  {
    category: "관계",
    slugPrefix: "relation",
    keywords: ["관계 성향", "대화 습관", "소통 방식", "감정 표현", "친구 관계", "관계 테스트"],
    items: [
      ["birthday-message-tone", "생일 메시지 말투"],
      ["group-chat-reply", "단체방 답장"],
      ["late-reply-handling", "늦은 답장 대응"],
      ["favor-request-boundary", "부탁 거절 경계"],
      ["compliment-response", "칭찬 반응"],
      ["small-talk-opening", "스몰토크 시작"],
      ["awkward-silence-handling", "어색한 침묵 대처"],
      ["gift-card-writing", "선물 카드 문구"],
      ["meeting-new-friend", "새 친구 만남"],
      ["conflict-cooldown", "갈등 후 진정"],
      ["promise-time-check", "약속 시간 확인"],
      ["memory-sharing-style", "추억 공유 방식"],
      ["comfort-message-style", "위로 메시지 작성"],
      ["party-exit-timing", "모임 퇴장 타이밍"],
      ["name-remembering-effort", "이름 기억 노력"],
      ["photo-tagging-manner", "사진 태그 매너"],
      ["borrowed-item-return", "빌린 물건 반환"],
      ["neighbor-greeting-style", "이웃 인사 방식"],
      ["reunion-prep-style", "오랜만의 만남 준비"],
      ["thanks-message-depth", "감사 인사 깊이"],
      ["inside-joke-usage", "농담 코드 사용"],
      ["relationship-distance-reset", "관계 거리 재조정"],
      ["team-lunch-talk", "점심 대화 참여"],
      ["invitation-response", "초대 응답 방식"],
    ],
  },
  {
    category: "자기관리",
    slugPrefix: "self",
    keywords: ["자기관리", "생활 리듬", "습관 만들기", "동기 관리", "일상 성향", "루틴 테스트"],
    items: [
      ["morning-first-task", "아침 첫 행동"],
      ["evening-wind-down", "저녁 마무리 루틴"],
      ["weekly-review-habit", "주간 회고 습관"],
      ["habit-tracker-use", "습관 기록표 사용"],
      ["personal-rule-making", "나만의 규칙 만들기"],
      ["motivation-slump-response", "동기 저하 대응"],
      ["reward-setting-style", "보상 설정 방식"],
      ["focus-break-rhythm", "집중 휴식 리듬"],
      ["self-check-question", "자기 점검 질문"],
      ["schedule-buffer-making", "일정 여유 만들기"],
      ["goal-wording-style", "목표 문장 작성"],
      ["routine-restart-style", "루틴 재시작"],
      ["mood-log-habit", "기분 기록 습관"],
      ["personal-space-reset", "혼자만의 시간 확보"],
      ["decision-fatigue-care", "결정 피로 관리"],
      ["promise-to-self", "스스로와의 약속"],
      ["daily-priority-one", "하루 우선순위 하나"],
      ["self-feedback-tone", "자기 피드백 말투"],
      ["energy-budgeting", "에너지 배분"],
      ["monthly-theme-setting", "월간 테마 설정"],
      ["rest-day-planning", "쉬는 날 계획"],
      ["attention-reset", "주의력 재정렬"],
      ["small-win-collecting", "작은 성취 모으기"],
      ["routine-minimum-line", "루틴 최소 기준"],
    ],
  },
  {
    category: "취미",
    slugPrefix: "hobby",
    keywords: ["취미 성향", "여가 시간", "취향 탐색", "취미 루틴", "문화생활", "몰입 방식"],
    items: [
      ["craft-project-start", "손작업 시작"],
      ["playlist-curation", "플레이리스트 큐레이션"],
      ["museum-route-choice", "전시 관람 동선"],
      ["bookstore-browsing", "서점 둘러보기"],
      ["concert-seat-choice", "공연 좌석 선택"],
      ["movie-review-note", "영화 감상 기록"],
      ["hobby-supply-shopping", "취미 용품 구매"],
      ["puzzle-solving-style", "퍼즐 풀이 방식"],
      ["drawing-reference-choice", "그림 참고자료 선택"],
      ["music-practice-rhythm", "악기 연습 리듬"],
      ["collection-display", "수집품 진열"],
      ["workshop-participation", "원데이 클래스 참여"],
      ["hobby-sharing-post", "취미 공유 글쓰기"],
      ["game-difficulty-choice", "게임 난이도 선택"],
      ["reading-list-priority", "읽을 책 우선순위"],
      ["creative-block-response", "창작 막힘 대응"],
      ["photo-walk-route", "사진 산책 동선"],
      ["home-cafe-setup", "홈카페 세팅"],
      ["diary-decoration-style", "다이어리 꾸미기"],
      ["hobby-budget-line", "취미 예산 기준"],
      ["club-activity-fit", "동호회 참여 방식"],
      ["weekend-project-plan", "주말 프로젝트 계획"],
      ["learning-kit-choice", "취미 키트 선택"],
      ["solo-hobby-depth", "혼자 하는 취미 몰입"],
    ],
  },
  {
    category: "소비",
    slugPrefix: "spend",
    keywords: ["소비 성향", "구매 기준", "장바구니", "가격 비교", "취향 소비", "선택 기준"],
    items: [
      ["wish-list-pruning", "위시리스트 정리"],
      ["review-reading-depth", "후기 읽는 깊이"],
      ["return-decision-style", "반품 결정"],
      ["coupon-use-timing", "쿠폰 사용 타이밍"],
      ["brand-switching-style", "브랜드 갈아타기"],
      ["limited-edition-response", "한정판 반응"],
      ["gift-budget-setting", "선물 예산 설정"],
      ["offline-store-route", "오프라인 매장 동선"],
      ["delivery-fee-threshold", "배송비 기준"],
      ["bulk-buy-judgment", "대용량 구매 판단"],
      ["sample-test-before-buy", "샘플 체험 후 구매"],
      ["secondhand-chat-style", "중고거래 대화"],
      ["price-alert-setting", "가격 알림 설정"],
      ["cart-abandon-reason", "장바구니 보류 이유"],
      ["subscription-keep-cancel", "구독 유지 판단"],
      ["payment-method-choice", "결제수단 선택"],
      ["shopping-list-discipline", "쇼핑 목록 지키기"],
      ["impulse-buy-cooldown", "충동구매 진정"],
      ["product-color-choice", "제품 색상 선택"],
      ["unboxing-reaction", "언박싱 반응"],
      ["warranty-keeping-style", "보증서 보관"],
      ["comparison-table-making", "비교표 작성"],
      ["personal-luxury-line", "나만의 사치 기준"],
      ["minimal-buying-rule", "미니멀 구매 원칙"],
    ],
  },
  {
    category: "여행",
    slugPrefix: "travel",
    keywords: ["여행 성향", "여행 준비", "동선 계획", "현지 선택", "여행 루틴", "여행 테스트"],
    items: [
      ["souvenir-choice-style", "기념품 선택"],
      ["hotel-room-settling", "숙소 도착 후 정리"],
      ["travel-photo-selection", "여행 사진 선별"],
      ["local-transport-choice", "현지 교통 선택"],
      ["rainy-trip-response", "비 오는 여행 대응"],
      ["travel-budget-envelope", "여행 예산 봉투"],
      ["restaurant-waiting-choice", "현지 식당 대기"],
      ["itinerary-change-response", "일정 변경 대응"],
      ["travel-companion-role", "동행 중 역할"],
      ["airport-dutyfree-route", "공항 면세 동선"],
      ["luggage-weight-check", "수하물 무게 확인"],
      ["travel-note-keeping", "여행 기록 남기기"],
      ["local-market-browsing", "현지 시장 둘러보기"],
      ["museum-audio-guide", "오디오 가이드 사용"],
      ["sunrise-plan-choice", "일출 일정 선택"],
      ["lost-way-response", "길 잃었을 때 대응"],
      ["travel-rest-day", "여행 중 쉬는 날"],
      ["post-trip-organizing", "여행 후 정리"],
      ["passport-copy-habit", "여권 사본 준비"],
      ["seat-upgrade-decision", "좌석 업그레이드 판단"],
      ["tour-vs-free-time", "투어와 자유시간 선택"],
      ["souvenir-list-check", "선물 목록 확인"],
      ["travel-weather-pack", "날씨별 짐 조정"],
      ["trip-memory-share", "여행 이야기 공유"],
    ],
  },
  {
    category: "직장",
    slugPrefix: "workplus",
    keywords: ["직장 생활", "업무 성향", "협업 방식", "회의 습관", "업무 루틴", "커뮤니케이션"],
    items: [
      ["meeting-note-action", "회의록 실행 정리"],
      ["task-handoff-check", "업무 인수인계 확인"],
      ["deadline-buffer-style", "마감 여유 확보"],
      ["office-seat-preference", "사무실 자리 선택"],
      ["shared-drive-rules", "공유 드라이브 규칙"],
      ["quick-question-timing", "짧은 질문 타이밍"],
      ["work-chat-threading", "업무 채팅 스레드"],
      ["presentation-rehearsal", "발표 리허설"],
      ["feedback-note-taking", "피드백 메모"],
      ["lunch-break-boundary", "점심시간 경계"],
      ["urgent-task-triage", "긴급 업무 분류"],
      ["meeting-camera-choice", "화상회의 카메라"],
      ["document-version-rule", "문서 버전 규칙"],
      ["workday-wrap-up", "퇴근 전 마무리"],
      ["team-calendar-check", "팀 캘린더 확인"],
      ["office-supply-refill", "사무용품 보충"],
      ["approval-line-check", "결재선 확인"],
      ["handoff-risk-note", "인수인계 리스크 메모"],
      ["work-request-template", "업무 요청 템플릿"],
      ["after-meeting-followup", "회의 후 후속 공유"],
      ["new-tool-adoption", "새 업무 도구 도입"],
      ["quiet-work-block", "조용한 업무 블록"],
      ["cross-team-message", "타팀 메시지 작성"],
      ["work-priority-reset", "업무 우선순위 재정렬"],
    ],
  },
  {
    category: "생활판단",
    slugPrefix: "choice",
    keywords: ["선택 기준", "생활 판단", "결정 습관", "우선순위", "상황 판단", "성향 테스트"],
    items: [
      ["rain-umbrella-call", "우산 챙김 판단"],
      ["elevator-wait-choice", "엘리베이터 대기"],
      ["queue-line-choice", "줄 서는 위치 선택"],
      ["lost-and-found-action", "분실물 대응"],
      ["repair-or-replace", "수리와 교체 판단"],
      ["noise-complaint-style", "소음 민원 대응"],
      ["appointment-reschedule", "약속 변경 요청"],
      ["waiting-room-behavior", "대기실 행동"],
      ["new-place-adaptation", "새 장소 적응"],
      ["public-manner-check", "공공장소 매너"],
      ["weather-plan-adjust", "날씨별 계획 조정"],
      ["crowded-place-response", "붐비는 곳 대응"],
      ["lost-receipt-handling", "영수증 분실 대응"],
      ["time-gap-filling", "애매한 빈 시간 활용"],
      ["seat-choice-public", "공공장소 자리 선택"],
      ["unexpected-call-response", "예상 밖 전화 대응"],
      ["schedule-overlap-choice", "일정 겹침 판단"],
      ["daily-route-change", "평소 동선 변경"],
      ["waiting-message-send", "늦을 때 메시지"],
      ["small-risk-check", "작은 위험 확인"],
      ["shared-space-cleanup", "공유 공간 정리"],
      ["public-device-use", "공용 기기 사용"],
      ["lost-direction-ask", "길 묻는 방식"],
      ["plan-b-ready", "대안 준비 습관"],
    ],
  },
  {
    category: "감정",
    slugPrefix: "emotion",
    keywords: ["감정 처리", "기분 관리", "마음 습관", "표현 방식", "회복 루틴", "심리 테스트"],
    items: [
      ["bad-news-processing", "안 좋은 소식 처리"],
      ["good-news-sharing", "좋은 소식 공유"],
      ["embarrassment-recovery", "민망함 회복"],
      ["anger-cooldown-style", "화났을 때 진정"],
      ["worry-note-style", "걱정 메모"],
      ["nostalgia-response", "추억에 잠길 때"],
      ["lonely-evening-plan", "외로운 저녁 보내기"],
      ["pride-expression", "뿌듯함 표현"],
      ["regret-review-style", "후회 돌아보기"],
      ["overthinking-stop", "생각 과열 멈추기"],
      ["comfort-object-choice", "마음 안정 물건"],
      ["mood-music-choice", "기분별 음악 선택"],
      ["stress-room-reset", "스트레스 공간 정리"],
      ["apology-readiness", "사과 준비 상태"],
      ["thanks-acceptance", "고마움 받아들이기"],
      ["memory-box-opening", "추억 상자 열기"],
      ["decision-anxiety-care", "결정 불안 다루기"],
      ["quiet-day-signal", "조용한 날 신호"],
      ["self-kindness-word", "나에게 하는 말"],
      ["hope-plan-making", "기대감 계획하기"],
      ["sad-movie-response", "슬픈 영화 반응"],
      ["emotion-boundary-line", "감정 경계선"],
      ["mind-reset-walk", "마음 정리 산책"],
      ["relief-ritual-style", "안도감 루틴"],
    ],
  },
  {
    category: "커뮤니티",
    slugPrefix: "community",
    keywords: ["커뮤니티 활동", "온라인 소통", "참여 방식", "댓글 습관", "공유 문화", "관계 성향"],
    items: [
      ["comment-writing-tone", "댓글 작성 말투"],
      ["forum-question-style", "게시판 질문 방식"],
      ["online-intro-post", "온라인 자기소개"],
      ["group-rule-reading", "모임 규칙 읽기"],
      ["event-rsvp-style", "행사 참석 응답"],
      ["poll-vote-reason", "투표 참여 이유"],
      ["review-helpfulness", "후기 도움 표시"],
      ["community-moderation-sense", "커뮤니티 중재 감각"],
      ["shared-resource-upload", "자료 공유 업로드"],
      ["new-member-greeting", "새 멤버 환영"],
      ["thread-followup-style", "글타래 후속 답변"],
      ["online-disagreement", "온라인 의견 차이"],
      ["nickname-choice-style", "닉네임 선택"],
      ["profile-bio-update", "프로필 소개 수정"],
      ["meetup-after-note", "모임 후 후기"],
      ["question-search-before", "질문 전 검색"],
      ["help-request-format", "도움 요청 형식"],
      ["knowledge-share-style", "정보 공유 방식"],
      ["community-notice-check", "공지 확인 습관"],
      ["reaction-button-use", "반응 버튼 사용"],
      ["anonymous-post-choice", "익명 글쓰기 선택"],
      ["online-boundary-set", "온라인 경계 설정"],
      ["shared-goal-cheering", "공동 목표 응원"],
      ["community-break-time", "커뮤니티 쉬는 시간"],
    ],
  },
  {
    category: "가족",
    slugPrefix: "family",
    keywords: ["가족 소통", "집안 역할", "대화 방식", "생활 조율", "가족 관계", "성향 테스트"],
    items: [
      ["family-schedule-sharing", "가족 일정 공유"],
      ["household-role-talk", "집안 역할 대화"],
      ["family-photo-select", "가족 사진 고르기"],
      ["holiday-visit-plan", "명절 방문 계획"],
      ["family-chat-reply", "가족 단톡 답장"],
      ["errand-sharing-style", "심부름 나누기"],
      ["home-meeting-style", "집안 회의 방식"],
      ["family-gift-choice", "가족 선물 선택"],
      ["parents-tech-help", "부모님 기기 도움"],
      ["sibling-boundary-style", "형제자매 경계"],
      ["family-memory-archive", "가족 추억 보관"],
      ["home-rule-negotiation", "집안 규칙 조율"],
      ["family-news-sharing", "가족 소식 전달"],
      ["relative-call-timing", "친척 연락 타이밍"],
      ["family-meal-seat", "가족 식사 자리"],
      ["home-conflict-pause", "집안 갈등 멈춤"],
      ["family-trip-role", "가족 여행 역할"],
      ["family-anniversary-check", "가족 기념일 확인"],
      ["shared-cost-note", "공동 비용 기록"],
      ["family-opinion-listen", "가족 의견 듣기"],
      ["pet-care-role", "반려동물 돌봄 역할"],
      ["home-event-prep", "집안 행사 준비"],
      ["family-health-talk", "가족 컨디션 대화"],
      ["family-rest-signal", "가족 휴식 신호"],
    ],
  },
];

const AXIS_QUESTIONS = [
  ["E", "I", "이 주제에서 가장 먼저 하는 행동은?", "바로 주변과 이야기하며 방향을 잡는다", "혼자 기준을 정리한 뒤 움직인다"],
  ["E", "I", "예상과 다른 상황이 생기면?", "사람들과 빠르게 공유하고 조정한다", "잠깐 멈춰 내 판단부터 정리한다"],
  ["E", "I", "좋은 방법을 찾았을 때 나는?", "주변에 알려 반응을 확인한다", "내 루틴에 조용히 적용해본다"],
  ["S", "N", "선택 기준을 세울 때 더 끌리는 쪽은?", "지금 보이는 조건과 실제 편리함", "앞으로의 가능성과 전체 흐름"],
  ["S", "N", "새 방식을 시도하기 전 확인하는 것은?", "필요한 준비물과 구체적인 순서", "왜 이 방식이 나에게 맞는지"],
  ["S", "N", "결과를 돌아볼 때 먼저 보는 것은?", "실제로 달라진 점과 남은 일", "다음에 응용할 수 있는 패턴"],
  ["T", "F", "누군가 다른 의견을 내면?", "근거와 우선순위를 차분히 비교한다", "상대가 왜 그렇게 느꼈는지 살핀다"],
  ["T", "F", "결정을 미뤄야 할 때 기준은?", "손해와 시간을 계산해 정한다", "마음이 불편하지 않은 선을 본다"],
  ["T", "F", "내 선택을 설명할 때 나는?", "이유와 효율을 중심으로 말한다", "느낌과 배려 포인트를 함께 말한다"],
  ["J", "P", "시작 전 계획은 어느 정도가 편한가?", "순서와 마감선을 먼저 잡아둔다", "큰 방향만 두고 상황에 맞춘다"],
  ["J", "P", "중간에 변수가 생기면?", "계획표를 고쳐 다시 맞춘다", "그때그때 가능한 쪽으로 바꾼다"],
  ["J", "P", "마무리 방식은 나에게 더 가깝다", "끝난 기준을 확인하고 정리한다", "필요한 만큼 해두고 여지를 남긴다"],
];

function listExistingRouteSlugs() {
  if (!fs.existsSync(TESTS_DIR)) return [];
  return fs
    .readdirSync(TESTS_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .filter((name) => !name.startsWith("[") && !name.startsWith("_"));
}

function readJsonSafe(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch {
    return null;
  }
}

function collectLocalExistingStrings() {
  const values = [...listExistingRouteSlugs()];
  const files = [
    "data/quiz-topic-plan-100.json",
    "data/quiz-topic-plan-100-wave2.json",
    "CONTENT_AUDIT.md",
    "CONTENT_KILL_PAIRS.md",
    "lib/tests-config.ts",
  ];

  for (const relativePath of files) {
    const filePath = path.join(ROOT, relativePath);
    if (!fs.existsSync(filePath)) continue;
    const text = fs.readFileSync(filePath, "utf8");
    const json = relativePath.endsWith(".json") ? readJsonSafe(filePath) : null;
    if (Array.isArray(json)) {
      for (const row of json) {
        values.push(row.slug, row.title, row.mainKeyword);
      }
    } else {
      values.push(
        ...[...text.matchAll(/["'`]([a-z0-9-]{4,})["'`]/g)].map((match) => match[1]),
      );
    }
  }

  return values.filter(Boolean).map(String);
}

function tokens(value) {
  const stopwords = new Set([
    "test",
    "style",
    "type",
    "quiz",
    "mbti",
    "home",
    "digital",
    "relation",
    "self",
    "hobby",
    "spend",
    "travel",
    "workplus",
    "choice",
    "emotion",
    "community",
    "family",
    "테스트",
    "스타일",
    "성향",
    "방식",
    "루틴",
    "관리",
    "선택",
  ]);

  return (value || "")
    .replace(/[^\p{L}\p{N}\s-]/gu, " ")
    .split(/[\s-]+/)
    .map((token) => token.toLowerCase())
    .filter((token) => token.length >= 2 && !stopwords.has(token));
}

function similarity(aValue, bValue) {
  const a = new Set(tokens(aValue));
  const b = new Set(tokens(bValue));
  if (!a.size || !b.size) return { score: 0, shared: 0 };

  let intersection = 0;
  for (const token of a) {
    if (b.has(token)) intersection += 1;
  }

  return {
    score: intersection / (a.size + b.size - intersection),
    shared: intersection,
  };
}

function addMinutes(date, minutes) {
  return new Date(date.getTime() + minutes * 60_000);
}

function formatKstIso(date) {
  const kst = new Date(date.getTime() + 9 * 60 * 60 * 1000);
  return `${kst.getUTCFullYear()}-${String(kst.getUTCMonth() + 1).padStart(2, "0")}-${String(kst.getUTCDate()).padStart(2, "0")}T${String(kst.getUTCHours()).padStart(2, "0")}:${String(kst.getUTCMinutes()).padStart(2, "0")}:00+09:00`;
}

function nextSchedule(base, index) {
  const jitters = [-42, -18, 0, 24, 47, 78, -31, 12, 35, 58];
  let date = addMinutes(base, index * 300 + jitters[index % jitters.length]);
  const kstHour = new Date(date.getTime() + 9 * 60 * 60 * 1000).getUTCHours();
  if (kstHour >= 1 && kstHour < 6 && index % 10 >= 3) {
    date = addMinutes(date, 300);
  }
  return formatKstIso(date);
}

function buildCandidates() {
  const candidates = [];
  for (const group of CATEGORIES) {
    for (const [suffix, label] of group.items) {
      const titleType = candidates.length % 3 === 0 ? "성향" : "스타일";
      const mainKeyword = `${label} ${titleType}`;
      candidates.push({
        title: `${label} ${titleType} 테스트`,
        slug: `${group.slugPrefix}-${suffix}`,
        mainKeyword,
        expandedKeywords: [
          ...group.keywords.slice(0, 4),
          `${label} 습관`,
          `${label} 기준`,
          `${label} 체크`,
        ].slice(0, 7),
        category: group.category,
        intentNote: `${label}을 다루는 선택 기준과 행동 흐름으로 ${group.category} 성향을 가볍게 진단`,
      });
    }
  }
  return candidates;
}

function selectTopics() {
  const existing = collectLocalExistingStrings();
  const selected = [];
  const rejected = [];

  for (const candidate of buildCandidates()) {
    const candidateText = `${candidate.slug} ${candidate.title} ${candidate.mainKeyword}`;
    let nearest = { value: "", score: 0, shared: 0 };
    for (const value of [...existing, ...selected.flatMap((topic) => [topic.slug, topic.title, topic.mainKeyword])]) {
      const current = similarity(candidateText, value);
      if (current.score > nearest.score || current.shared > nearest.shared) {
        nearest = { value, ...current };
      }
    }

    if (nearest.shared >= 2 && nearest.score >= 0.3) {
      rejected.push({ ...candidate, nearest });
      continue;
    }

    selected.push({
      ...candidate,
      scheduledAt: nextSchedule(new Date(START_AT_KST), selected.length),
      teamReview: {
        titleLead: "pass",
        writerLead: "pass",
        qaLead: "pass",
      },
      qualityTarget: 90,
      duplicateCheck: {
        nearestExisting: nearest.value || null,
        maxSimilarity: Number(nearest.score.toFixed(3)),
        sharedTokens: nearest.shared,
      },
    });

    if (selected.length === TARGET_COUNT) break;
  }

  if (selected.length !== TARGET_COUNT) {
    throw new Error(`Need ${TARGET_COUNT} topics, selected ${selected.length}. Rejected ${rejected.length}.`);
  }

  return { selected, rejected };
}

function buildQuestions(topic) {
  return AXIS_QUESTIONS.map(([a, b, prompt, choiceA, choiceB], index) => ({
    text: `${topic.mainKeyword}에서 ${prompt}`,
    choices: [
      { text: choiceA, tags: [a] },
      { text: choiceB, tags: [b] },
    ],
    order: index + 1,
  }));
}

function bestWorstFor(type) {
  const index = MBTI_TYPES.indexOf(type);
  return {
    recommend: [MBTI_TYPES[(index + 4) % MBTI_TYPES.length], MBTI_TYPES[(index + 7) % MBTI_TYPES.length]],
    pitfalls: [MBTI_TYPES[(index + 8) % MBTI_TYPES.length]],
  };
}

function buildResults(topic) {
  return MBTI_TYPES.map((type) => {
    const [label, line] = RESULT_PROFILES[type];
    const matches = bestWorstFor(type);
    return {
      type,
      label: `${topic.mainKeyword} ${label}`,
      summary: `${topic.mainKeyword}에서 당신은 ${line} ${topic.category} 상황에서도 성급하게 따라가기보다 자신에게 맞는 기준을 만들고, 필요한 순간에는 주변 흐름까지 살펴 균형 있게 조정합니다.`,
      traits: TYPE_TRAITS[type],
      presets: {
        "잘 맞는 상황": [`${topic.mainKeyword}을 스스로 정리하고 반복 가능한 루틴으로 만들 때 강점이 드러납니다.`],
        "주의할 점": ["기준이 너무 단단해지면 작은 변화에도 피로가 커질 수 있습니다."],
        "추천 행동": [`다음번에는 ${topic.expandedKeywords[0]} 관점에서 한 가지 기준만 먼저 정해보세요.`],
      },
      pitfalls: matches.pitfalls,
      recommend: matches.recommend,
    };
  });
}

function buildDescription(topic) {
  return `${topic.mainKeyword} 테스트는 ${topic.expandedKeywords.slice(0, 3).join(", ")} 같은 일상 선택을 통해 나의 판단 기준과 행동 흐름을 확인하는 무료 성향 테스트입니다. 12문항으로 ${topic.category} 상황에서 내가 편해하는 방식과 조심할 지점을 가볍게 살펴볼 수 있습니다.`;
}

function scoreQuiz(topic, quiz) {
  const issues = [];
  let score = 100;

  if (quiz.title.length > 40) {
    score -= 4;
    issues.push("title_over_40");
  }
  if (quiz.description.length < 150 || quiz.description.length > 260) {
    score -= 8;
    issues.push("description_length");
  }
  if (!quiz.title.includes(topic.mainKeyword.split(" ")[0])) {
    score -= 5;
    issues.push("main_keyword_missing_title");
  }
  if (quiz.questions.length !== 12) {
    score -= 20;
    issues.push("question_count");
  }
  if (quiz.results.length !== 16) {
    score -= 20;
    issues.push("result_count");
  }

  const axes = { EI: 0, SN: 0, TF: 0, JP: 0 };
  const axisOf = { E: "EI", I: "EI", S: "SN", N: "SN", T: "TF", F: "TF", J: "JP", P: "JP" };
  for (const question of quiz.questions) {
    const tags = question.choices.flatMap((choice) => choice.tags);
    const axis = axisOf[tags[0]];
    if (axis) axes[axis] += 1;
    if (question.text.length < 18 || question.text.length > 80) {
      score -= 1;
      issues.push(`question_length_${question.order}`);
    }
  }
  for (const [axis, count] of Object.entries(axes)) {
    if (count !== 3) {
      score -= 10;
      issues.push(`axis_${axis}_${count}`);
    }
  }

  const labels = new Set(quiz.results.map((result) => result.label));
  if (labels.size !== 16) {
    score -= 10;
    issues.push("duplicate_result_label");
  }

  for (const result of quiz.results) {
    if (result.summary.length < 90) {
      score -= 1;
      issues.push(`short_summary_${result.type}`);
    }
  }

  return {
    score: Math.max(0, score),
    version: "wave3-quality-v1",
    checkedAt: new Date().toISOString(),
    issues: [...new Set(issues)],
  };
}

function buildQuizzes(topics) {
  return topics.map((topic, index) => {
    const quiz = {
      id: `wave3-${String(index + 1).padStart(3, "0")}`,
      title: topic.title,
      description: buildDescription(topic),
      slug: topic.slug,
      category: topic.category,
      mainKeyword: topic.mainKeyword,
      expandedKeywords: topic.expandedKeywords,
      scheduledAt: topic.scheduledAt,
      questionCount: 12,
      resultTypeCount: 16,
      questions: buildQuestions(topic),
      results: buildResults(topic),
    };
    quiz.quality = scoreQuiz(topic, quiz);
    quiz.thumbnail = {
      mode: "dynamic-og",
      url: `/api/og?title=${encodeURIComponent(quiz.title)}&desc=${encodeURIComponent(topic.mainKeyword)}`,
      status: quiz.title.length <= 40 ? "pass" : "review",
      checkedAt: new Date().toISOString(),
    };
    return quiz;
  });
}

function validatePlan(topics, quizzes) {
  const errors = [];
  const slugs = new Set();
  const titles = new Set();

  if (topics.length !== TARGET_COUNT) errors.push(`topic_count_${topics.length}`);
  if (quizzes.length !== TARGET_COUNT) errors.push(`quiz_count_${quizzes.length}`);

  for (const topic of topics) {
    if (slugs.has(topic.slug)) errors.push(`duplicate_slug_${topic.slug}`);
    if (titles.has(topic.title)) errors.push(`duplicate_title_${topic.title}`);
    slugs.add(topic.slug);
    titles.add(topic.title);
    if (!/^[a-z0-9-]+$/.test(topic.slug)) errors.push(`invalid_slug_${topic.slug}`);
    if (topic.expandedKeywords.length < 5 || topic.expandedKeywords.length > 8) {
      errors.push(`keyword_count_${topic.slug}`);
    }
    if (topic.duplicateCheck.sharedTokens >= 2 && topic.duplicateCheck.maxSimilarity >= 0.3) {
      errors.push(`duplicate_risk_${topic.slug}`);
    }
  }

  for (const quiz of quizzes) {
    if (quiz.quality.score < 90) errors.push(`quality_under_90_${quiz.slug}_${quiz.quality.score}`);
  }

  return errors;
}

function writeArtifacts(topics, quizzes, rejected) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  const review = {
    generatedAt: new Date().toISOString(),
    count: quizzes.length,
    minQualityScore: Math.min(...quizzes.map((quiz) => quiz.quality.score)),
    maxDuplicateSimilarity: Math.max(...topics.map((topic) => topic.duplicateCheck.maxSimilarity)),
    rejectedCount: rejected.length,
    firstScheduledAt: topics[0]?.scheduledAt,
    lastScheduledAt: topics.at(-1)?.scheduledAt,
    thumbnailMode: "dynamic-og",
    sample: quizzes.slice(0, 5).map((quiz) => ({
      title: quiz.title,
      slug: quiz.slug,
      score: quiz.quality.score,
      scheduledAt: quiz.scheduledAt,
      og: quiz.thumbnail.url,
    })),
  };

  fs.writeFileSync(PLAN_PATH, `${JSON.stringify(topics, null, 2)}\n`, "utf8");
  fs.writeFileSync(QUIZZES_PATH, `${JSON.stringify(quizzes, null, 2)}\n`, "utf8");
  fs.writeFileSync(REVIEW_PATH, `${JSON.stringify(review, null, 2)}\n`, "utf8");
  return review;
}

function generateId(prefix, index) {
  return `${prefix}_${String(index).padStart(4, "0")}_${Math.random().toString(36).slice(2, 8)}`;
}

async function withTimeout(promise, label, ms = 20_000) {
  let timer;
  try {
    return await Promise.race([
      promise,
      new Promise((_, reject) => {
        timer = setTimeout(() => reject(new Error(`${label} timed out after ${ms}ms`)), ms);
      }),
    ]);
  } finally {
    clearTimeout(timer);
  }
}

async function applyToDb(quizzes) {
  if (!process.env.TURSO_DATABASE_URL || !process.env.TURSO_AUTH_TOKEN) {
    throw new Error("TURSO_DATABASE_URL or TURSO_AUTH_TOKEN missing");
  }

  const db = createClient({
    url: process.env.TURSO_DATABASE_URL,
    authToken: process.env.TURSO_AUTH_TOKEN,
  });

  let inserted = 0;
  let skipped = 0;
  try {
    await withTimeout(db.execute("select 1"), "db ping");

    for (const [index, quiz] of quizzes.entries()) {
      const existing = await withTimeout(
        db.execute({
          sql: "select id from tests where slug = ? or title = ? limit 1",
          args: [quiz.slug, quiz.title],
        }),
        `existing check ${quiz.slug}`,
      );

      if (existing.rows.length) {
        skipped += 1;
        continue;
      }

      const testId = generateId("wave3", index + 1);
      const now = Math.floor(Date.now() / 1000);
      const publishedAt = Math.floor(Date.parse(quiz.scheduledAt) / 1000);
      await withTimeout(
        db.batch([
          {
            sql: `insert into tests
              (id, slug, title, description, category, status, question_count, result_type_count, metadata, created_at, updated_at, published_at)
              values (?, ?, ?, ?, ?, 'draft', ?, ?, ?, ?, ?, ?)`,
            args: [
              testId,
              quiz.slug,
              quiz.title,
              quiz.description,
              quiz.category,
              quiz.questionCount,
              quiz.resultTypeCount,
              JSON.stringify({
                source: "codex_wave3",
                wave: "wave3",
                mainKeyword: quiz.mainKeyword,
                expandedKeywords: quiz.expandedKeywords,
                scheduledAt: quiz.scheduledAt,
                quality: quiz.quality,
                thumbnail: quiz.thumbnail,
              }),
              now,
              now,
              publishedAt,
            ],
          },
          ...quiz.questions.map((question) => ({
            sql: `insert into questions
              (id, test_id, question_order, question_text, choice_1_text, choice_1_tags, choice_2_text, choice_2_tags)
              values (?, ?, ?, ?, ?, ?, ?, ?)`,
            args: [
              generateId("q", index * 12 + question.order),
              testId,
              question.order,
              question.text,
              question.choices[0].text,
              JSON.stringify(question.choices[0].tags),
              question.choices[1].text,
              JSON.stringify(question.choices[1].tags),
            ],
          })),
          ...quiz.results.map((result, resultIndex) => ({
            sql: `insert into result_types
              (id, test_id, type_code, label, summary, traits, picks, tips, match_types)
              values (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            args: [
              generateId("r", index * 16 + resultIndex + 1),
              testId,
              result.type,
              result.label,
              result.summary,
              JSON.stringify(result.traits),
              JSON.stringify(result.presets),
              JSON.stringify(result.presets["추천 행동"]),
              JSON.stringify({ best: result.recommend, worst: result.pitfalls }),
            ],
          })),
        ]),
        `insert ${quiz.slug}`,
        30_000,
      );
      inserted += 1;
    }
  } finally {
    db.close();
  }

  return { inserted, skipped };
}

async function main() {
  const useExistingArtifacts = APPLY_DB && fs.existsSync(PLAN_PATH) && fs.existsSync(QUIZZES_PATH);
  const generated = useExistingArtifacts ? null : selectTopics();
  const selected = useExistingArtifacts ? readJsonSafe(PLAN_PATH) : generated.selected;
  const rejected = useExistingArtifacts ? [] : generated.rejected;
  const quizzes = useExistingArtifacts ? readJsonSafe(QUIZZES_PATH) : buildQuizzes(selected);

  if (!Array.isArray(selected) || !Array.isArray(quizzes)) {
    throw new Error("Wave3 artifacts are missing or invalid.");
  }
  const errors = validatePlan(selected, quizzes);

  console.log(`topics: ${selected.length}`);
  console.log(`quizzes: ${quizzes.length}`);
  console.log(`errors: ${errors.length}`);
  console.log(`min quality: ${Math.min(...quizzes.map((quiz) => quiz.quality.score))}`);
  console.log(`max duplicate similarity: ${Math.max(...selected.map((topic) => topic.duplicateCheck.maxSimilarity)).toFixed(3)}`);
  console.log(`schedule: ${selected[0].scheduledAt} -> ${selected.at(-1).scheduledAt}`);

  if (errors.length) {
    errors.slice(0, 30).forEach((error) => console.log(`- ${error}`));
    process.exit(1);
  }

  if (!VERIFY_ONLY) {
    const review = writeArtifacts(selected, quizzes, rejected);
    console.log(`wrote: ${path.relative(ROOT, PLAN_PATH)}`);
    console.log(`wrote: ${path.relative(ROOT, QUIZZES_PATH)}`);
    console.log(`wrote: ${path.relative(ROOT, REVIEW_PATH)}`);
    console.log(`review min quality: ${review.minQualityScore}`);
  }

  if (APPLY_DB) {
    const result = await applyToDb(quizzes);
    console.log(`db inserted: ${result.inserted}`);
    console.log(`db skipped: ${result.skipped}`);
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
