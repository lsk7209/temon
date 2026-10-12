// HTTP GET and SELECT only: never submit answers, analytics or cron requests.
import { execFileSync } from 'node:child_process';
import { config } from 'dotenv';
import { createClient } from '@libsql/client';
config({path:process.argv[2],quiet:true});
const client=createClient({url:process.env.TURSO_DATABASE_URL,authToken:process.env.TURSO_AUTH_TOKEN});
const get=(path,ip)=>execFileSync('curl.exe',['--resolve',`temon.kr:443:${ip}`,'--fail','--silent','--max-time','30',`https://temon.kr${path}`],{maxBuffer:12*1024*1024}).toString();
let failures=0;
const check=(name,ok)=>{console.log(JSON.stringify({check:name,pass:ok}));if(!ok)failures++;};
try {
 const saved=await client.execute("SELECT r.id,t.slug FROM test_results r JOIN tests t ON t.id=r.test_id WHERE t.status='published' ORDER BY r.created_at DESC LIMIT 1");
 const sample=await client.execute("SELECT slug FROM tests WHERE status='published' ORDER BY updated_at DESC LIMIT 1");
 const paths=['/','/tests/coffee-mbti','/tests?page=2','/tests?category=food',`/tests/${sample.rows[0].slug}`];
 const extract=html=>({title:html.match(/<title>(.*?)<\/title>/s)?.[1],canonical:html.match(/<link rel="canonical" href="([^"]+)"/)?.[1],robots:[...html.matchAll(/<meta name="robots" content="([^"]+)"/g)].map(m=>m[1]),jsonld:[...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)].map(m=>m[1])});
 for(const path of paths){const old=get(path,'216.150.1.1'),vps=get(path,'51.79.206.71');check(path+' metadata',JSON.stringify(extract(old))===JSON.stringify(extract(vps)));}
 const normalize=text=>text.replaceAll('\r\n','\n').replace(/<lastmod>[^<]+<\/lastmod>/g,'<lastmod>runtime</lastmod>');
 for(const path of ['/robots.txt','/ads.txt','/sitemap.xml','/sitemap-index.xml','/llms.txt','/llms-full.txt']){check(path+' content',normalize(get(path,'216.150.1.1'))===normalize(get(path,'51.79.206.71')));}
 if(saved.rows.length){const path=`/api/results?id=${saved.rows[0].id}`;check('existing saved result GET',get(path,'216.150.1.1')===get(path,'51.79.206.71'));const page=`/results/${saved.rows[0].slug}?id=${saved.rows[0].id}`;const old=extract(get(page,'216.150.1.1')),vps=extract(get(page,'51.79.206.71'));check('saved result noindex canonical',JSON.stringify(old)===JSON.stringify(vps)&&vps.robots.some(x=>x.includes('noindex')));}
 const home=get('/','51.79.206.71');check('GA4 retained',home.includes('G-L167CCPS8E'));
 // The consent-controlled ad loader is client rendered. Read our JS assets only;
 // never load the advertising provider or issue impressions/clicks.
 let publisherPresent=false;
 for(const match of home.matchAll(/<script src="([^\"]+)"/g)){
   if(!match[1].startsWith('/_next/static/'))continue;
   if(get(match[1],'51.79.206.71').includes('3050601904412736')){publisherPresent=true;break;}
 }
 check('AdSense publisher compiled',publisherPresent);
} finally {client.close();}
process.exitCode=failures?1:0;
