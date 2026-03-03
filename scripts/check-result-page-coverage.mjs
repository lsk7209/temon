import { readdirSync, existsSync, statSync } from "node:fs"
import { join, relative } from "node:path"

const ROOT = process.cwd()
const TESTS_DIR = join(ROOT, "app", "tests")

const entries = readdirSync(TESTS_DIR)
const missing = []

for (const name of entries) {
  if (name === "[testId]") continue

  const dir = join(TESTS_DIR, name)
  if (!statSync(dir).isDirectory()) continue

  const testPage = join(dir, "test", "page.tsx")
  if (!existsSync(testPage)) continue

  const resultEntry = join(dir, "test", "result", "page.tsx")
  const resultDynamic = join(dir, "test", "result", "[resultId]", "page.tsx")

  if (!existsSync(resultEntry) && !existsSync(resultDynamic)) {
    missing.push(relative(ROOT, dir))
  }
}

if (missing.length > 0) {
  console.error("❌ Missing result page coverage detected:")
  for (const item of missing) {
    console.error(` - ${item}`)
  }
  process.exit(1)
}

console.log(`✅ Result page coverage check passed (${entries.length} test directories scanned)`)
