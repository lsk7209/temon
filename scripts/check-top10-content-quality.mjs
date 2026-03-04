import { readFileSync, existsSync } from "node:fs"
import { join } from "node:path"

const ROOT = process.cwd()
const TESTS_DIR = join(ROOT, "app", "tests")

const TOP10_SLUGS = [
  "sleep-position-style",
  "desk-organizing-style",
  "email-reply-style",
  "travel-packing-style",
  "online-shopping-cart-style",
  "deadline-management-style",
  "subscription-management-style",
  "focus-music-style",
  "memory-keeping-style",
  "digital-detox-style",
]

const MBTI_KEYS = ["ISTJ","ISFJ","INFJ","INTJ","ISTP","ISFP","INFP","INTP","ESTP","ESFP","ENFP","ENTP","ESTJ","ESFJ","ENFJ","ENTJ"]

const issues = []

for (const slug of TOP10_SLUGS) {
  const introPath = join(TESTS_DIR, slug, "page.tsx")
  const testPath = join(TESTS_DIR, slug, "test", "page.tsx")
  const resultPath = join(TESTS_DIR, slug, "test", "result", "page.tsx")

  if (!existsSync(introPath) || !existsSync(testPath) || !existsSync(resultPath)) {
    issues.push(`${slug}: missing required page file(s)`)
    continue
  }

  const intro = readFileSync(introPath, "utf8")
  const testPage = readFileSync(testPath, "utf8")
  const resultPage = readFileSync(resultPath, "utf8")

  if (!/questionCount=\{12\}/.test(intro)) {
    issues.push(`${slug}: intro questionCount is not 12`)
  }

  const questionCount = (testPage.match(/\bid:\s*\d+/g) ?? []).length
  if (questionCount !== 12) {
    issues.push(`${slug}: test page question count is ${questionCount} (expected 12)`)
  }

  const foundMbti = MBTI_KEYS.filter((key) => new RegExp(`\\b${key}\\s*:`).test(resultPage))
  if (foundMbti.length !== 16) {
    issues.push(`${slug}: result page MBTI frame count is ${foundMbti.length} (expected 16)`)
  }
}

if (issues.length > 0) {
  console.error("❌ Top10 content quality check failed:")
  for (const issue of issues) {
    console.error(` - ${issue}`)
  }
  process.exit(1)
}

console.log(`✅ Top10 content quality check passed (${TOP10_SLUGS.length} quizzes)`)
