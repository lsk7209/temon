import { existsSync, readFileSync, readdirSync, statSync } from "node:fs"
import { join, relative } from "node:path"

const ROOT = process.cwd()
const TESTS_DIR = join(ROOT, "app", "tests")

const issues = []

for (const name of readdirSync(TESTS_DIR)) {
  if (name === "[testId]") continue

  const testDir = join(TESTS_DIR, name)
  if (!statSync(testDir).isDirectory()) continue

  const testPage = join(testDir, "test", "page.tsx")
  if (!existsSync(testPage)) continue

  const content = readFileSync(testPage, "utf8")
  const m = content.match(/resultPath:\s*["'`]([^"'`]+)["'`]/)
  if (!m) continue

  const resultPath = m[1]
  const expected = `/tests/${name}/test/result`
  if (resultPath !== expected) {
    issues.push(`${relative(ROOT, testPage)} -> resultPath mismatch: ${resultPath} (expected ${expected})`)
  }
}

if (issues.length) {
  console.error("❌ Quiz routing consistency check failed:")
  for (const issue of issues) console.error(` - ${issue}`)
  process.exit(1)
}

console.log("✅ Quiz routing consistency check passed")
