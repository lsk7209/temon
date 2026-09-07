const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');
const jsx = (type, props) => ({type, props});
function load(file, imports) {
 const code=ts.transpileModule(fs.readFileSync(path.join(__dirname,'..',file),'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.ReactJSX}}).outputText;
 const context={exports:{},require(name){if(name==='react/jsx-runtime')return {jsx,jsxs:jsx,Fragment:'fragment'};if(name in imports)return imports[name];throw Error(name)}};
 vm.runInNewContext(code,context);return context.exports;
}
const layout=load('app/results/layout.tsx',{'react':{Suspense:'suspense'},'@/components/result-route-auto-enhancements':{ResultRouteAutoEnhancements:'extras'},'@/components/legacy-result-ad-slot':{LegacyResultAdSlot:'slot'}});
const core={type:'original-result-and-controls'};
const children=layout.default({children:core}).props.children;
assert.equal(children[0],core,'original result and controls remain first');
assert.equal(children[1].type,'slot','existing slot must precede auxiliary content');
assert.equal(children[2].props.children.type,'extras','auxiliary content retained after slot');
assert.equal(layout.metadata.robots.index,false);
for(const [route,visible] of [['/results/coffee-mbti',true],['/results/coffee-mbti/',true],['/results/test/result-id',false],['/tests/coffee-mbti/test',false],[null,false]]) {
 const slot=load('components/legacy-result-ad-slot.tsx',{'next/navigation':{usePathname:()=>route},'@/components/redesign/result-ad-unit':{ResultAdUnit:'unit'}}).LegacyResultAdSlot();
 assert.equal(slot!==null,visible,route);
 if(visible)assert.equal(slot.props.children.type,'unit');
}
console.log('PASS actual layout keeps core first, one slot before extras, noindex retained, five route gates unchanged');
