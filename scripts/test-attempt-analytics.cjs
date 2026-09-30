const assert = require('node:assert/strict')
const fs = require('node:fs')
const vm = require('node:vm')
const ts = require('typescript')

const source = fs.readFileSync('lib/analytics.ts', 'utf8')
const compiled = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText
const events = []
let now = 0
let flush
const window = { gtag: undefined }
const isolatedModule = { exports: {} }
const context = {
  module: isolatedModule, exports: isolatedModule.exports, window,
  Date: class extends Date { static now() { return now } },
  setInterval(callback) { flush = callback; return 1 },
  clearInterval() { flush = undefined },
  console, fetch: async () => ({ ok: true }),
  // Consent is covered by test-analytics-consent.cjs; here tracking is allowed.
  require: (id) => {
    if (id === './consent') return { isAnalyticsAllowed: () => true }
    throw new Error(`unexpected require ${id}`)
  },
}
vm.runInNewContext(compiled, context)
const analytics = isolatedModule.exports

analytics.trackTestStart('quiz')
analytics.trackTestProgress('quiz', 0, 4, 'attempt-1')
analytics.trackTestProgress('quiz', 1, 4, 'attempt-1')
analytics.trackTestProgress('quiz', 4, 4, 'attempt-1')
analytics.trackTestProgress('quiz', 4, 4, 'attempt-1')
assert.equal(window.__temonPendingGtagEvents.length, 5)
window.gtag = (_command, name, params) => events.push({ name, params })
flush()
assert.deepEqual(events.map((event) => event.name), [
  'test_start', 'test_progress', 'test_progress', 'test_progress', 'test_progress',
])
assert.deepEqual(events.filter((event) => event.name === 'test_progress').map((event) => event.params.progress_percent), [25, 50, 75, 100])
assert.equal(window.__temonPendingGtagEvents.length, 0)
analytics.trackTestProgress('quiz', 1, 4, 'attempt-2')
assert.equal(events.filter((event) => event.name === 'test_progress').length, 5)
analytics.trackTestComplete('quiz', 'type')
analytics.trackResultSave('quiz', 'error')
assert.deepEqual(events.slice(-2).map((event) => event.name), ['test_complete', 'result_save_error'])
// T05: error_code는 허용 목록으로 정규화된다. 코드 미지정 시 server_error로 fallback.
assert.equal(events.at(-1).params.error_code, 'server_error')
window.gtag = undefined
for (let index = 0; index < 105; index++) analytics.trackTestStart(`quiz-${index}`)
assert.equal(window.__temonPendingGtagEvents.length, 100)
now = 31_000
window.gtag = (_command, name, params) => events.push({ name, params })
flush()
assert.equal(window.__temonPendingGtagEvents.length, 0)
assert.equal(events.filter((event) => event.name === 'test_start').length, 1)
console.log('attempt analytics: passed')
