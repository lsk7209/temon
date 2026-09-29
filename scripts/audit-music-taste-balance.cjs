const fs = require('node:fs');
const ts = require('typescript');

const file = 'app/tests/music-taste/test/page.tsx';
const source = ts.createSourceFile(file, fs.readFileSync(file, 'utf8'), ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
const property = (object, name) => object.properties.find((item) => ts.isPropertyAssignment(item) && item.name.getText(source) === name)?.initializer;
const declaration = source.statements.filter(ts.isVariableStatement)
  .flatMap((statement) => [...statement.declarationList.declarations])
  .find((item) => item.name.getText(source) === 'questions');
if (!declaration || !ts.isArrayLiteralExpression(declaration.initializer)) throw new Error('Question definition not parsed');
const pairs = declaration.initializer.elements.map((question) => {
  if (!ts.isObjectLiteralExpression(question)) throw new Error('Question not parsed');
  return ['a1', 'a2'].map((choiceName) => {
    const choice = property(question, choiceName);
    if (!choice || !ts.isObjectLiteralExpression(choice)) throw new Error('Choice not parsed');
    const tags = property(choice, 'tags');
    if (!tags || !ts.isArrayLiteralExpression(tags)) throw new Error('Tags not parsed');
    return tags.elements.map((tag) => {
      if (!ts.isStringLiteral(tag)) throw new Error('Tag not parsed');
      return tag.text;
    });
  });
});
if (pairs.length !== 12) throw new Error(`Expected 12 questions, got ${pairs.length}`);

const counts = new Map();
const axes = [['E', 'I'], ['S', 'N'], ['T', 'F'], ['J', 'P']];
for (let mask = 0; mask < 2 ** pairs.length; mask++) {
  const scores = Object.fromEntries(axes.flat().map((tag) => [tag, 0]));
  pairs.forEach((choices, index) => {
    choices[(mask >> index) & 1].forEach((tag) => {
      if (!(tag in scores)) throw new Error(`Unknown tag ${tag}`);
      scores[tag]++;
    });
  });
  const code = axes.map(([first, second]) => scores[first] >= scores[second] ? first : second).join('');
  counts.set(code, (counts.get(code) || 0) + 1);
}
const result = {
  source: file,
  model: 'all binary answers equally likely; not observed user behavior',
  questions: pairs.length,
  combinations: 2 ** pairs.length,
  reachableTypes: counts.size,
  firstLetterE: [...counts].filter(([code]) => code[0] === 'E').reduce((n, [, count]) => n + count, 0),
  thirdLetterT: [...counts].filter(([code]) => code[2] === 'T').reduce((n, [, count]) => n + count, 0),
};
if (result.reachableTypes !== 16 || result.firstLetterE !== 3072 || result.thirdLetterT !== 2816) {
  throw new Error(`Unexpected reachability: ${JSON.stringify(result)}`);
}
console.log(JSON.stringify(result, null, 2));
