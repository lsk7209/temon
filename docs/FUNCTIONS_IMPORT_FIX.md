# Functions Import 경로 수정 가이드

## 문제
Cloudflare Pages Functions 빌드 시 `@/` 경로 별칭이 제대로 해석되지 않아 빌드 오류가 발생했습니다.

## 해결 방법
모든 Functions 파일의 import 경로를 상대 경로로 변경했습니다.

## 변경된 파일

### functions/api/results.ts
```typescript
// 변경 전
import { getDatabase, initDatabase } from '@/lib/db/client'

// 변경 후
import { getDatabase, initDatabase } from '../../lib/db/client'
```

### functions/api/stats.ts
```typescript
// 변경 전
import { getDatabase, initDatabase } from '@/lib/db/client'

// 변경 후
import { getDatabase, initDatabase } from '../../lib/db/client'
```

### functions/api/dashboard.ts
```typescript
// 변경 전
import { initDatabase } from '@/lib/db/client'

// 변경 후
import { initDatabase } from '../../lib/db/client'
```

### functions/api/collect.ts
```typescript
// 변경 전
import * as schema from '@/lib/drizzle/schema'

// 변경 후
import * as schema from '../../lib/drizzle/schema'
```

### functions/api/reports.ts
```typescript
// 변경 전
import { getDrizzleDB, ... } from '@/lib/drizzle/queries'

// 변경 후
import { getDrizzleDB, ... } from '../../lib/drizzle/queries'
```

### functions/cron.ts
```typescript
// 변경 전
import { getDrizzleDB } from '@/lib/drizzle/queries'

// 변경 후
import { getDrizzleDB } from '../lib/drizzle/queries'
```

## 경로 매핑

### functions/api/* → lib/*
- `functions/api/*.ts` → `../../lib/` (2단계 상위)

### functions/* → lib/*
- `functions/*.ts` → `../lib/` (1단계 상위)

## 참고
- Next.js 앱 코드(`app/`, `components/` 등)에서는 여전히 `@/` 별칭 사용 가능
- Cloudflare Pages Functions만 상대 경로 사용
- TypeScript 컴파일러는 두 방식 모두 지원

