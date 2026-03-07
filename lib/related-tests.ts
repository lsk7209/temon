import { ALL_TESTS, type Test } from "@/lib/tests-config"

function scoreRelatedness(current: Test, candidate: Test) {
  let score = 0

  if (current.category === candidate.category) {
    score += 4
  }

  const sharedTags = candidate.tags.filter((tag) => current.tags.includes(tag)).length
  score += sharedTags * 2

  if (candidate.popular) {
    score += 1
  }

  if (candidate.new) {
    score += 0.5
  }

  return score
}

export function getRelatedTests(testId: string, limit = 3): Test[] {
  const current = ALL_TESTS.find((test) => test.id === testId)

  if (!current) {
    return ALL_TESTS.filter((test) => test.id !== testId).slice(0, limit)
  }

  return ALL_TESTS.filter((test) => test.id !== testId)
    .map((candidate) => ({
      candidate,
      score: scoreRelatedness(current, candidate),
    }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score || a.candidate.title.localeCompare(b.candidate.title))
    .slice(0, limit)
    .map((entry) => entry.candidate)
}
