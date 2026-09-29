const assert = require('node:assert/strict')
const fs = require('node:fs')
const vm = require('node:vm')
const ts = require('typescript')

const events = []
let resolveSave
let saveCalls = 0
let failSave = true
const saveArgs = []
const api = {
  saveTestResult: async (args) => {
    saveCalls++
    saveArgs.push(args)
    if (failSave) throw new Error('save unavailable')
    return new Promise((resolve) => { resolveSave = resolve })
  },
}
const analytics = Object.fromEntries(
  ['trackTestStart', 'trackTestProgress', 'trackTestComplete', 'trackResultSave']
    .map((name) => [name, (...args) => events.push([name, ...args])]),
)
const react = {
  useState: (value) => [value, () => {}],
  useRef: (value) => ({ current: value }),
  useCallback: (callback) => callback,
}
const source = fs.readFileSync('hooks/use-test-result.ts', 'utf8')
const compiled = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText
const isolatedModule = { exports: {} }
vm.runInNewContext(compiled, {
  module: isolatedModule, exports: isolatedModule.exports,
  require: (id) => ({ react, '@/lib/api-client': api, '@/lib/analytics': analytics })[id],
  crypto: { randomUUID: () => 'one' },
  Object, Error,
})

async function main() {
  const hook = isolatedModule.exports.useTestResult({ testId: 'quiz' })
  assert.equal(hook.startAttempt(), 'attempt_one')
  assert.equal(hook.startAttempt(), 'attempt_one')
  hook.trackProgress(1, 2)
  assert.equal(await hook.saveResult('type', { 0: 'answer' }), null)
  assert.equal(saveCalls, 1)
  assert.equal(events.filter(([name]) => name === 'trackTestStart').length, 1)
  assert.equal(events.filter(([name]) => name === 'trackTestComplete').length, 1)
  assert.deepEqual(events.at(-1), ['trackResultSave', 'quiz', 'error'])
  assert.equal(events.some(([name]) => /Abandon/.test(name)), false)
  failSave = false
  const pending = hook.saveResult('type', { 0: 'answer' })
  assert.equal(await hook.saveResult('type', { 0: 'answer' }), null)
  resolveSave({ success: true, id: 'saved' })
  assert.equal(await pending, 'saved')
  assert.equal(saveCalls, 2)
  // Retry after a failed save reuses the same attempt key for server idempotency.
  assert.deepEqual(saveArgs.map((args) => args.attemptId), ['attempt_one', 'attempt_one'])
  assert.equal(await hook.saveResult('type', { 0: 'answer' }), 'saved')
  assert.equal(saveCalls, 2)
  assert.equal(events.filter(([name]) => name === 'trackTestComplete').length, 1)
  assert.deepEqual(events.at(-1), ['trackResultSave', 'quiz', 'success'])

  // Static quizzes (persist: false): complete once, no network save, no save event.
  const completions = []
  const staticHook = isolatedModule.exports.useTestResult({
    testId: 'static-quiz', persist: false, onComplete: (type) => completions.push(type),
  })
  const callsBefore = saveCalls
  staticHook.startAttempt()
  assert.equal(await staticHook.saveResult('ENFP', { 0: 'answer' }), null)
  assert.equal(saveCalls, callsBefore, 'no /api/results request')
  assert.deepEqual(completions, ['ENFP'])
  assert.equal(events.filter(([name, id]) => name === 'trackTestComplete' && id === 'static-quiz').length, 1)
  assert.equal(events.some(([name, id]) => name === 'trackResultSave' && id === 'static-quiz'), false)
  console.log('result attempt: passed')
}
main().catch((error) => { console.error(error); process.exitCode = 1 })
