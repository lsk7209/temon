#!/usr/bin/env node
/**
 * 신규 퀴즈 slug 30개가 기존 ALL_TESTS와 주제 중복이 없는지 검증.
 *
 * 방식:
 *   - slug 토큰 + 가상 title/description의 자카드 유사도 계산
 *   - 기존 모든 211개와 임계치(0.3) 초과 시 경고
 *
 * 사용:
 *   node scripts/validate-new-slugs.js
 */
const fs = require("node:fs");
const path = require("node:path");

const ROOT = path.resolve(__dirname, "..");
const TESTS_DIR = path.join(ROOT, "app", "tests");

// 신규 30개 초안 slug + 제목 (기획 단계)
const NEW_QUIZ_DRAFTS = [
  // 직장/커리어 (5)
  { slug: "commute-style", title: "출퇴근 스타일 테스트" },
  { slug: "workday-energy", title: "근무 중 에너지 패턴" },
  { slug: "worknight-recovery", title: "퇴근 후 회복 방식" },
  { slug: "office-snack-habit", title: "사무실 간식 습관" },
  { slug: "wfh-focus-type", title: "재택근무 집중 유형" },
  // 연애/관계 (5)
  { slug: "first-date-nerves", title: "첫 데이트 긴장도" },
  { slug: "friend-distance", title: "친구 간 거리 조절 스타일" },
  { slug: "sns-reaction-style", title: "SNS 반응 스타일" },
  { slug: "parent-comm-style", title: "부모와 소통 방식" },
  { slug: "breakup-recovery-speed", title: "이별 회복 속도" },
  // 자기계발/학습 (4)
  { slug: "goal-persistence", title: "목표 지속력 테스트" },
  { slug: "reading-focus", title: "독서 집중도 유형" },
  { slug: "course-completion", title: "온라인 강의 완주율" },
  { slug: "language-learner-type", title: "외국어 학습 스타일" },
  // 여행/외출 (4)
  { slug: "packing-style", title: "여행 짐 싸기 스타일" },
  { slug: "airport-wait-type", title: "공항 대기 유형" },
  { slug: "map-dependency", title: "지도앱 의존도" },
  { slug: "trip-planning-style", title: "여행 계획 스타일" },
  // 쇼핑/소비 (4)
  { slug: "sale-reaction", title: "세일 반응 유형" },
  { slug: "subscription-audit", title: "구독 서비스 정리 습관" },
  { slug: "comparison-shopping", title: "비교 쇼핑 스타일" },
  { slug: "membership-usage", title: "멤버십 활용도" },
  // 건강/운동 (4)
  { slug: "stress-relief-type", title: "스트레스 해소 유형" },
  { slug: "workout-consistency", title: "운동 지속 스타일" },
  { slug: "hydration-habit", title: "수분 섭취 습관 테스트" },
  { slug: "diet-approach", title: "다이어트 접근 방식" },
  // 디지털/AI (4)
  { slug: "notification-control", title: "알림 관리 스타일" },
  { slug: "focus-mode-usage", title: "집중 모드 활용" },
  { slug: "ai-chatbot-style", title: "AI 챗봇 활용 유형" },
  { slug: "screentime-reaction", title: "스크린 타임 반응" },
];

// 기존 slug 목록 (app/tests/ 디렉토리 스캔)
function listExistingSlugs() {
  return fs
    .readdirSync(TESTS_DIR, { withFileTypes: true })
    .filter(
      (e) =>
        e.isDirectory() && !e.name.startsWith("[") && !e.name.startsWith("_"),
    )
    .map((e) => e.name)
    .filter((id) => fs.existsSync(path.join(TESTS_DIR, id, "page.tsx")));
}

function tokens(s) {
  return (s || "")
    .replace(/[^\p{L}\p{N}\s-]/gu, " ")
    .split(/[\s-]+/)
    .filter((t) => t.length >= 2)
    .map((t) => t.toLowerCase());
}

function jaccard(aTokens, bTokens) {
  const a = new Set(aTokens);
  const b = new Set(bTokens);
  if (!a.size || !b.size) return 0;
  let inter = 0;
  for (const t of a) if (b.has(t)) inter++;
  return inter / (a.size + b.size - inter);
}

const existing = listExistingSlugs();
console.log(`기존 slug: ${existing.length}개`);
console.log(`신규 draft: ${NEW_QUIZ_DRAFTS.length}개`);
console.log("");

const THRESHOLD = 0.3;
const warnings = [];

for (const draft of NEW_QUIZ_DRAFTS) {
  const draftTokens = [...tokens(draft.slug), ...tokens(draft.title)];

  // 신규 slug 자체가 기존에 이미 존재하는지
  if (existing.includes(draft.slug)) {
    warnings.push({
      type: "DUPLICATE_SLUG",
      draft: draft.slug,
      existing: draft.slug,
      score: 1.0,
    });
    continue;
  }

  let worst = { slug: null, score: 0 };
  for (const ex of existing) {
    const exTokens = tokens(ex);
    const score = jaccard(draftTokens, exTokens);
    if (score > worst.score) worst = { slug: ex, score };
  }

  if (worst.score >= THRESHOLD) {
    warnings.push({
      type: "SIMILAR",
      draft: draft.slug,
      existing: worst.slug,
      score: worst.score,
    });
  }
}

console.log(`경고(score >= ${THRESHOLD}): ${warnings.length}개`);
if (warnings.length === 0) {
  console.log("✅ 모든 신규 slug가 기존과 충분히 구별됨 — Phase B 진행 가능");
} else {
  console.log("");
  warnings.forEach((w) => {
    console.log(
      `  [${w.type}] ${w.draft} ↔ ${w.existing} (score ${w.score.toFixed(2)})`,
    );
  });
  console.log("");
  console.log("⚠️ 0.3 이상 유사한 항목은 slug 재명명 또는 주제 교체 필요");
}

process.exit(warnings.length > 0 ? 1 : 0);
