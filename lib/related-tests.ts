import { ALL_TESTS, type Test } from "@/lib/tests-config";
import { isTestPublished } from "@/lib/visible-tests";

function scoreRelatedness(current: Test, candidate: Test) {
  let score = 0;

  if (current.category === candidate.category) {
    score += 4;
  }

  const sharedTags = candidate.tags.filter((tag) =>
    current.tags.includes(tag),
  ).length;
  score += sharedTags * 2;

  if (candidate.popular) {
    score += 1;
  }

  if (candidate.new) {
    score += 0.5;
  }

  return score;
}

export function getRelatedTests(testId: string, limit = 3): Test[] {
  const now = new Date();
  const current = ALL_TESTS.find((test) => test.id === testId);
  // 드립 대기(publishAt 미래) 테스트는 related 추천에서 제외
  const candidates = ALL_TESTS.filter(
    (test) => test.id !== testId && isTestPublished(test, now),
  );

  if (!current) {
    return candidates.slice(0, limit);
  }

  return candidates
    .map((candidate) => ({
      candidate,
      score: scoreRelatedness(current, candidate),
    }))
    .filter((entry) => entry.score > 0)
    .sort(
      (a, b) =>
        b.score - a.score || a.candidate.title.localeCompare(b.candidate.title),
    )
    .slice(0, limit)
    .map((entry) => entry.candidate);
}
