// Executed inside the private staging container. Values never leave memory.
import assert from 'node:assert/strict';
assert.equal(process.env.TEMON_STAGING, 'true');
const base = 'http://127.0.0.1:3000';
const login = await fetch(base+'/api/admin/login',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({password:process.env.ADMIN_PASSWORD})});
assert.equal(login.status,200);
const cookie = login.headers.get('set-cookie');
assert(cookie);
for(const flag of ['HttpOnly','Secure','SameSite=lax','Path=/','Max-Age=28800']) assert(cookie.toLowerCase().includes(flag.toLowerCase()));
const headers = {cookie:cookie.split(';')[0]};
assert.equal((await fetch(base+'/api/admin/login',{headers}).then(r=>r.json())).authenticated,true);
const logout=await fetch(base+'/api/admin/login',{method:'DELETE',headers});
assert.equal(logout.status,200);assert(/max-age=0|expires=/i.test(logout.headers.get('set-cookie')||''));
assert.equal((await fetch(base+'/api/admin/login').then(r=>r.json())).authenticated,false);
for(const path of ['/api/cron/generate','/api/cron/publish']) {
  assert.equal((await fetch(base+path,{headers:{authorization:'Bearer '+process.env.CRON_SECRET}})).status,503);
}
assert(!process.env.GOOGLE_API_KEY&&!process.env.GOOGLE_GENERATIVE_AI_KEY&&!process.env.TURSO_AUTH_TOKEN);
console.log('PASS private login cookie attributes/session/logout, authenticated disabled crons, Gemini/Turso token absent');
