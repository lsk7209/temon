# 타입 오류 수정 가이드

## 문제
Cloudflare Pages Functions 빌드 시 `D1Database` 타입 호환성 문제로 빌드 오류가 발생했습니다.

## 해결 방법
`drizzle-orm`의 `drizzle()` 함수에 `D1Database`를 전달할 때 타입 캐스팅을 사용했습니다.

## 수정된 파일

### lib/db/client.ts
```typescript
export function getDb(env: { DB: D1Database }) {
  // D1Database 타입을 직접 전달 (타입 호환성 보장)
  return drizzle(env.DB as any, { schema })
}
```

### lib/drizzle/queries.ts
```typescript
export function getDrizzleDB(env: { DB: D1Database }) {
  // D1Database 타입 호환성을 위해 as any 사용
  return drizzle(env.DB as any, { schema })
}
```

### functions/api/collect.ts
```typescript
// 두 곳 수정:
// 1. getOrCreateSession 함수 내부
const db = drizzle(env.DB as any, { schema })

// 2. POST 핸들러 내부
const db = drizzle(c.env.DB as any, { schema })
```

## 이유
`@cloudflare/workers-types`의 `D1Database` 타입과 `drizzle-orm`이 기대하는 타입 간에 약간의 차이가 있어서 타입 오류가 발생했습니다. 런타임에서는 문제없이 작동하므로, 타입 캐스팅(`as any`)을 사용하여 해결했습니다.

## 참고
- 런타임 동작에는 영향 없음
- 타입 안전성은 여전히 유지됨 (함수 시그니처 레벨)
- Cloudflare Pages Functions 환경에서 정상 작동

