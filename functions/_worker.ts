/**
 * Cloudflare Pages Functions Worker
 * 
 * Cloudflare Pages Functions는 _worker.ts 파일을 찾아서 사용합니다.
 * Hono 앱을 fetch handler로 export합니다.
 */

import app from './index'

// Cloudflare Pages Functions는 fetch handler를 기대합니다
// Hono 앱은 fetch 메서드를 가지고 있어서 직접 사용 가능
export default {
  fetch: (request: Request, env: any, ctx: ExecutionContext) => {
    return app.fetch(request, env, ctx)
  }
}

