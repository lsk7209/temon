const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');

const source = fs.readFileSync(require('node:path').join(__dirname, '../components/redesign/result-ad-unit.tsx'), 'utf8');
const code = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX } }).outputText;
const cases = [
  [undefined, true, null], ['', true, null], ['  \r\n\t', true, null],
  [' 9293409342 \r\n', true, '9293409342'], ['9293409342', true, '9293409342'],
  ['9293409342', false, null],
];
for (const [slot, enabled, expected] of cases) {
  const effects = [];
  const context = { exports: {}, process: { env: { NEXT_PUBLIC_ADSENSE_RESULT_SLOT_ID: slot, NEXT_PUBLIC_ADSENSE_DELIVERY_ENABLED: String(enabled) } }, window: {}, console,
    require(name) {
      if (name === 'react') return { useEffect: fn => effects.push(fn) };
      if (name === 'next/script') return { default: 'script' };
      if (name === 'react/jsx-runtime') return { jsx: (type, props) => ({ type, props }), jsxs: (type, props) => ({ type, props }) };
      throw new Error(name);
    },
  };
  vm.runInNewContext(code, context);
  const tree = context.exports.ResultAdUnit();
  effects.forEach(fn => fn());
  if (expected === null) {
    assert.equal(tree, null);
    assert.equal(context.window.adsbygoogle, undefined);
  } else {
    assert.equal(tree.type, 'section');
    const units = tree.props.children.filter(child => child.type === 'ins');
    assert.equal(units.length, 1);
    assert.equal(units[0].props['data-ad-slot'], expected);
    assert.equal(units[0].props['data-ad-client'], 'ca-pub-3050601904412736');
    assert.equal(context.window.adsbygoogle.length, 1);
  }
}
console.log('PASS: 6 actual-component slot/gate cases; one unit and one push when enabled.');
