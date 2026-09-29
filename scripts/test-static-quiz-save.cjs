// Static quizzes have no `tests` parent row; their flows must not call /api/results.
const assert = require('node:assert/strict')
const fs = require('node:fs')

const flows = [
  'hooks/use-quiz-logic.ts',
  'components/test-question-page.tsx',
  'app/ntrp-test/test/page.tsx',
  'app/tests/ntrp-test/test/page.tsx',
]
for (const file of flows) {
  const source = fs.readFileSync(file, 'utf8')
  assert.match(source, /persist:\s*false/, `${file} must not persist static results`)
  assert.doesNotMatch(source, /save=unconfirmed/, `${file} must not show the save warning`)
  assert.match(source, /onComplete:/, `${file} navigates on completion`)
}
const callers = []
for (const dir of ['app', 'components', 'hooks']) {
  const walk = (path) => {
    for (const entry of fs.readdirSync(path, { withFileTypes: true })) {
      const full = `${path}/${entry.name}`
      if (entry.isDirectory()) walk(full)
      else if (/\.(ts|tsx)$/.test(entry.name) && full !== 'hooks/use-test-result.ts' &&
        /useTestResult\(\{/.test(fs.readFileSync(full, 'utf8'))) callers.push(full)
    }
  }
  walk(dir)
}
assert.deepEqual(callers.sort(), flows.slice().sort(), 'every useTestResult caller is a reviewed static flow')
console.log(`static quiz save: passed (${flows.length} flows, no /api/results call)`)
