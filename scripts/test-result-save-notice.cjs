const assert = require('node:assert/strict')
const fs = require('node:fs')
const vm = require('node:vm')
const ts = require('typescript')
const { renderToStaticMarkup } = require('react-dom/server')

let query = new URLSearchParams()
const source = fs.readFileSync('components/result-save-notice.tsx', 'utf8')
const compiled = ts.transpileModule(source, {
  compilerOptions: {
    module: ts.ModuleKind.CommonJS,
    target: ts.ScriptTarget.ES2022,
    jsx: ts.JsxEmit.ReactJSX,
  },
}).outputText
const isolatedModule = { exports: {} }
vm.runInNewContext(compiled, {
  module: isolatedModule,
  exports: isolatedModule.exports,
  require: (id) => id === 'next/navigation'
    ? { useSearchParams: () => query }
    : require(id),
})

const Notice = isolatedModule.exports.ResultSaveNotice
assert.equal(renderToStaticMarkup(require('react').createElement(Notice)), '')
query = new URLSearchParams('type=ENFP&save=unconfirmed')
const html = renderToStaticMarkup(require('react').createElement(Notice))
assert.match(html, /role="status"/)
assert.match(html, /서버 저장은 확인되지 않았습니다/)
assert.match(html, /확인된 결과 ID가 없어/)
console.log('result save notice: passed')
