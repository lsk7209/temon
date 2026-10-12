import assert from 'node:assert/strict';
const base = process.argv[2] || 'http://127.0.0.1:18176';
if (!/^http:\/\/127\.0\.0\.1:\d+$/.test(base)) throw Error('Loopback staging only');
const health = await fetch(`${base}/api/health`).then(r => r.json());
assert.equal(health.staging, true);
for (const path of ['/','/tests','/tests/coffee-mbti','/results/coffee-mbti','/robots.txt','/sitemap.xml','/ads.txt']) {
  const r = await fetch(base+path);
  assert.equal(r.status, 200, path);
  assert.match(r.headers.get('x-robots-tag') || '', /noindex/, path);
}
for (const path of ['/api/cron/generate','/api/cron/publish']) {
  const r = await fetch(base+path, {headers:{authorization:'Bearer undefined'}});
  assert.equal(r.status,401);
}
const payload = {testId:'staging-mbti',resultType:'ESTJ',answers:{0:'E',1:'S',2:'T',3:'J'},attemptId:crypto.randomUUID()};
const save = body => fetch(base+'/api/results',{method:'POST',headers:{'content-type':'application/json','x-forwarded-for':'spoofed'},body:JSON.stringify(body)});
const first = await save(payload); assert.equal(first.status,201); const result = await first.json();
const replay = await save(payload); assert.equal(replay.status,200); assert.equal((await replay.json()).id,result.id);
const concurrent = await Promise.all(Array.from({length:5},()=>save(payload).then(r=>r.json())));
assert(concurrent.every(r=>r.id===result.id));
const read = await fetch(base+'/api/results?id='+result.id).then(r=>r.json()); assert.equal(read.resultType,'ESTJ');
assert.equal((await save({...payload,resultType:'INFP'})).status,422);
assert.equal((await fetch(base+'/api/admin/queue')).status,401);
console.log('PASS staging pages, noindex, cron auth, results save/replay/concurrency/read/validation, admin protection');
