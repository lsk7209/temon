const fs = require("fs")
const path = require("path")

const root = process.cwd()
const testsDir = path.join(root, "app", "tests")

function exists(relativePath) {
  return fs.existsSync(path.join(root, relativePath))
}

function listQuizDirs() {
  return fs
    .readdirSync(testsDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && entry.name !== "[testId]")
    .map((entry) => entry.name)
    .sort()
}

function buildRecord(name) {
  const intro = exists(path.join("app", "tests", name, "page.tsx"))
  const test = exists(path.join("app", "tests", name, "test", "page.tsx"))
  const result = exists(path.join("app", "tests", name, "test", "result", "page.tsx"))

  return { name, intro, test, result, complete: intro && test && result }
}

function main() {
  const records = listQuizDirs().map(buildRecord)
  const incomplete = records.filter((record) => !record.complete)

  console.log(`Total quiz directories: ${records.length}`)
  console.log(`Complete flows: ${records.length - incomplete.length}`)
  console.log(`Incomplete flows: ${incomplete.length}`)

  if (incomplete.length > 0) {
    console.log("\nMissing pieces:")
    for (const record of incomplete) {
      const missing = []
      if (!record.intro) missing.push("intro")
      if (!record.test) missing.push("test")
      if (!record.result) missing.push("result")
      console.log(`- ${record.name}: ${missing.join(", ")}`)
    }
    process.exitCode = 1
    return
  }

  console.log("\nAll quiz flows include intro, test, and result pages.")
}

main()
