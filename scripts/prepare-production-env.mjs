// Local secret allowlist transfer. Files must stay excluded from Git/build context.
import fs from 'node:fs';
import crypto from 'node:crypto';
import { parse } from 'dotenv';
const [input, directory] = process.argv.slice(2);
if (!input || !directory) throw new Error('Expected environment input and private directory');
const source = parse(fs.readFileSync(input));
fs.mkdirSync(directory, {recursive:true,mode:0o700});
const runtimeNames = ['TURSO_DATABASE_URL','TURSO_AUTH_TOKEN','INDEXNOW_KEY','GOOGLE_SERVICE_ACCOUNT_JSON','GOOGLE_SERVICE_ACCOUNT_JSON_BASE64','GSC_SITE_URL','GSC_PROPERTY_URL','GSC_SITEMAP_URL','GSC_INDEXING_API_ENABLED','GOOGLE_SITE_VERIFICATION','NAVER_SITE_VERIFICATION','DAUM_SITE_VERIFICATION','IP_HASH_SALT','ADMIN_TOKEN','ADMIN_PASSWORD'];
const runtime = Object.fromEntries(runtimeNames.filter(name => source[name]).map(name => [name,source[name]]));
if (!runtime.TURSO_DATABASE_URL || !runtime.TURSO_AUTH_TOKEN) throw new Error('Database runtime credentials missing');
runtime.CRON_SECRET = crypto.randomBytes(32).toString('hex');
runtime.ADMIN_TOKEN ||= crypto.randomBytes(32).toString('hex');
runtime.ADMIN_PASSWORD ||= crypto.randomBytes(32).toString('hex');
// Preserve anonymous IP storage when original salt was absent.
runtime.TEMON_CRON_ENABLED = 'false';
runtime.TEMON_GENERATION_ENABLED = 'false';
runtime.TEMON_CRON_OWNER = 'vps';
runtime.TEMON_CRON_INSTANCE = 'vps';
const publicEnv = Object.fromEntries(Object.entries(source).filter(([name]) => name.startsWith('NEXT_PUBLIC_')));
publicEnv.NEXT_PUBLIC_TEMON_STAGING = 'false';
publicEnv.NEXT_PUBLIC_APP_URL = 'https://temon.kr';
const dotenv = values => Object.entries(values).map(([name,value]) => `${name}=${JSON.stringify(value)}`).join('\n')+'\n';
fs.writeFileSync(`${directory}/.env.production`,dotenv(runtime),{flag:'wx',mode:0o600});
fs.writeFileSync(`${directory}/public-build.json`,JSON.stringify(publicEnv,null,2),{flag:'wx',mode:0o600});
console.log('ENV_ALLOWLIST_READY',Object.keys(runtime).sort().join(','),'Gemini=false');
