/**
 * Cloudflare Pages Functions Worker
 * 
 * Cloudflare Pages Functions는 _worker.ts 파일을 찾아서 사용합니다.
 * 이 파일은 functions/index.ts의 Hono 앱을 re-export합니다.
 */

// functions/index.ts에서 Hono 앱을 import하여 export
export { default } from './index'

