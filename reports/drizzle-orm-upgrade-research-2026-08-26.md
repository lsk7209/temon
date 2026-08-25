# temon.kr Drizzle ORM 0.29 → 0.45 업그레이드 조사

- 조사일: 2026-08-26
- 범위: `drizzle-orm` 업그레이드 영향과 보안 권고 검토
- 비범위: 패키지 설치, 코드 수정, 마이그레이션 생성·적용, Turso 변경

## 1. 결론 요약

`temon.kr`는 `drizzle-orm@0.45.2`로 올리는 것이 타당하다. 단, 목표는 모호한 `0.45.x`가 아니라 **SQL 식별자 escaping 취약점이 수정된 최소 `0.45.2`**여야 한다. 현재 실제 설치 버전은 `package.json`의 `^0.29.0`이 해석된 `0.29.5`이고, `drizzle-kit`은 현재 안정 최신인 `0.31.10`, `@libsql/client`는 `0.17.2`다.

핵심 Turso 연결 방식인 `createClient(...)` 후 `drizzle(client, { schema })`, `sqliteTable`, 정적 `sql\`...\`` 템플릿은 0.45.2에서도 유지된다. 전면 재작성형 업그레이드는 아니다. 예상 변경은 주로 타입 오류 확인과 deprecated schema callback 정리이며, 작업 규모는 **소~중(반나절~1일, 검증 포함 1~2일)**, 런타임 위험은 **낮음~중간**, 실제 DB에 `push`할 때의 운영 위험은 별도로 **중간~높음**이다.

현재 코드에서 GHSA의 실제 공격 경로는 발견되지 않았다. `sql.identifier()` 사용이 없고, 유일한 `.as('engine')` 별칭도 정적 문자열이다. 그러나 설치 버전 자체는 취약 범위이므로 미래 변경·간접 사용에 대한 방어와 audit 해소를 위해 업그레이드는 권장된다.

## 2. 현재 프로젝트 기준선

| 항목 | 선언/실제 | 프로젝트 사용 방식 |
|---|---:|---|
| `drizzle-orm` | `^0.29.0` / 실제 `0.29.5` | `drizzle-orm/libsql`, `sqlite-core`, SQL-like query builder, RQB `db.query` |
| `drizzle-kit` | `^0.31.10` / 실제 `0.31.10` | `dialect: "turso"`, `npx drizzle-kit push`, `drizzle/` 스냅샷 |
| `@libsql/client` | `^0.17.0` / 실제 `0.17.2` | `createClient({ url, authToken })` 후 Drizzle에 client 전달 |
| schema | `lib/db/schema.ts` | 8개 `sqliteTable`, FK, index, `sql\`(unixepoch())\`` 기본값 |
| query | `app/`, `lib/db/queries/` | `select/insert/delete`, `db.query.*`, `.get()`, `sql<number>`, 정적 raw SQL 조각 |

`drizzle.config.ts`는 이미 0.34부터 요구된 Turso 전용 dialect 형태다.

```ts
export default defineConfig({
  schema: "./lib/db/schema.ts",
  out: "./drizzle",
  dialect: "turso",
  dbCredentials: { url, authToken },
});
```

## 3. 0.29 → 0.45 구간의 breaking/호환성 변경

Drizzle은 1.0 이전에는 minor 버전에 API 변경을 넣는 정책이었으므로 각 minor를 독립적으로 확인해야 한다.

### 3.1 SQLite/libSQL/Turso 드라이버 연동

| 버전 | 변경 | temon.kr 영향 |
|---|---|---|
| 0.34.0 | Turso/libSQL을 일반 SQLite와 분리하여 Kit에 `dialect: "turso"` 도입. ORM `migrate()` 사용 시 `@libsql/client >=0.10.0` 필요 | **이미 충족.** config가 이미 `turso`, client는 0.17.2 |
| 0.34.0 | Turso/libSQL은 SQLite보다 넓은 ALTER 지원을 이용하는 별도 migration 전략 적용 | 이후 `push/generate` 결과가 과거 SQLite 전략과 달라질 수 있어 생성 SQL 검토 필수 |
| 0.34.0~0.35.0 | URL/connection config로 Drizzle이 client를 만드는 간편 초기화 API 추가 후 0.35에서 형태 조정. 기존 client 전달 API 호환 유지 | 현재 `drizzle(client, { schema })`는 0.45.2에서도 사용 가능. 교체 불필요 |
| 0.44.0 | driver 오류를 `DrizzleQueryError`로 감싸 SQL·파라미터·원인 오류 제공 | 특정 driver error type 분기는 없지만 로그/메시지는 달라질 수 있음 |

공식 자료: [0.34.0 release](https://github.com/drizzle-team/drizzle-orm/releases/tag/0.34.0), [0.35.0 release](https://github.com/drizzle-team/drizzle-orm/releases/tag/0.35.0), [0.44.0 release](https://github.com/drizzle-team/drizzle-orm/releases/tag/0.44.0), [Drizzle LibSQL guide](https://orm.drizzle.team/docs/get-started/turso-new)

### 3.2 schema 정의 API

| 버전 | 변경 | temon.kr 영향 |
|---|---|---|
| 0.36.0 | `*Table(..., columns, extraConfig)`의 세 번째 callback 반환 권장형이 객체에서 배열로 변경. 객체형은 계속 동작하지만 deprecated | **높은 직접 영향.** `questions`, `resultTypes`, `testResults` 3곳이 객체형 index 반환 |
| 0.38.0 | `SQLiteTextBuilderInitial` 등 일부 내부 builder generic/type 변경 | 내부 타입을 직접 import하지 않아 영향 없음 |
| 0.41.0 | SQLite numeric/decimal mode 및 blob mapping 수정 | 해당 타입 미사용. timestamp/json text에 직접 영향 없음 |

권장 변환:

```ts
// 현재: 호환되지만 deprecated
(table) => ({ idxTestId: index("idx_questions_test_id").on(table.testId) })

// 권장
(table) => [index("idx_questions_test_id").on(table.testId)]
```

`text("metadata", { mode: "json" })`, `integer(..., { mode: "timestamp" })`, `.default(sql\`(unixepoch())\`)`, `.references(...)`는 0.45 API에서 그대로 유효하다.

공식 자료: [0.36.0 release](https://github.com/drizzle-team/drizzle-orm/releases/tag/0.36.0), [0.38.0 release](https://github.com/drizzle-team/drizzle-orm/releases/tag/0.38.0), [SQLite column types](https://orm.drizzle.team/docs/column-types/sqlite), [Indexes & constraints](https://orm.drizzle.team/docs/indexes-constraints)

### 3.3 `sql` 템플릿 태그

- `sql\`...\``의 기본 계약은 유지된다. `${column}`/`${table}`은 식별자로, 일반 runtime 값은 bind parameter로 처리된다.
- `sql<number>\`count(*)\`` generic은 결과 타입 힌트이며 런타임 변환은 하지 않는다.
- 0.45.2 수정은 템플릿 값 parameterization 변경이 아니라 **동적 식별자와 alias escaping** 수정이다.
- `sql\`${resultTypes.testId} = ${resolvedTestId} ...\``는 column object와 값 parameter를 사용하므로 취약 identifier 입력 시나리오가 아니다.
- `sql\`count(*) DESC\``, `sql\`(unixepoch())\``는 정적 SQL이라 이번 GHSA와 무관하다. JavaScript 문자열 보간으로 사용자 값을 raw SQL에 합치면 별개의 일반 SQL injection 위험이다.

공식 자료: [Drizzle SQL template](https://orm.drizzle.team/docs/sql), [0.45.2 release](https://github.com/drizzle-team/drizzle-orm/releases/tag/0.45.2)

### 3.4 query builder / relational query 변경

| 변경 | temon.kr 영향 |
|---|---|
| 동적 query 조립은 `$dynamic()` 사용이 공식 권장 | `lib/db/queries/tests.ts`가 반복 `as any`로 조건부 `.where()/.orderBy()/.limit()` 조립. 0.45 타입 검사에서 우선 확인 |
| 0.35.0 SQLite/MySQL `update`·`delete`에 `.orderBy()`/`.limit()` 추가 | 추가 기능, 파괴 없음 |
| 0.39.0 CTE가 insert/update/delete/raw `sql` 지원 | 추가 기능, 미사용 |
| 0.43.0 dialect별 unsupported join API 정리 | SQLite 코드 직접 영향 없음 |
| 0.44.0 `DrizzleQueryError` 래핑 | generic catch만 사용해 낮은 영향. 로그 문자열 변화 가능 |
| RQB `db.query.tests.findFirst` | 0.45 안정 계열에서 RQB v1 유지. v1.0 RC 변경은 이번 범위가 아님 |

권장 형태:

```ts
let query = db.select().from(tests).$dynamic();
if (options?.status) query = query.where(eq(tests.status, options.status));
if (options?.category) query = query.where(eq(tests.category, options.category));
```

공식 자료: [Dynamic query building](https://orm.drizzle.team/docs/dynamic-query-building), [0.35.0 release](https://github.com/drizzle-team/drizzle-orm/releases/tag/0.35.0), [0.39.0 release](https://github.com/drizzle-team/drizzle-orm/releases/tag/0.39.0), [0.43.0 release](https://github.com/drizzle-team/drizzle-orm/releases/tag/0.43.0)

### 3.5 이 프로젝트와 무관한 주요 breaking changes

- 0.30.0 PostgreSQL timestamp/postgres.js date parser 변경: SQLite/libSQL이라 무관.
- 0.31.0 PostgreSQL index API 변경: SQLite index라 무관.
- 0.33.0 postgres.js JSON/JSONB raw-value 변경: SQLite text JSON이라 무관.
- 0.38.0 PostgreSQL/MySQL/vector 및 validator 내부 타입 변화: 해당 패키지·타입 미사용.
- 0.42.0 enum 지원 및 duplicate export 정리: 직접 영향 없음.

## 4. 프로젝트 영향 우선순위

### P0 — 반드시 처리/검증

1. 목표를 `0.45.2` 이상으로 고정한다. `0.45.0`/`0.45.1`은 GHSA 취약 상태다.
2. 임시 브랜치에서 의존성만 올린 뒤 build/TypeScript로 `drizzle(client, { schema })`, `.get()`, RQB, `ReturnType<typeof drizzle<typeof schema>>`를 검증한다.
3. `drizzle-kit generate`/`push`를 production Turso에 바로 실행하지 않는다. 먼저 생성 SQL diff가 비어 있거나 의도된 것인지 검토한다.

### P1 — 직접 영향 가능성이 높음

1. `schema.ts`의 3개 extra-config callback을 객체 반환에서 배열 반환으로 바꾼다.
2. `lib/db/queries/tests.ts`를 `$dynamic()`으로 전환하고 `as any`를 제거한다.
3. `DrizzleQueryError` 래핑 뒤 대표 API의 오류 처리·로그를 확인한다.

### P2 — 확인만 하면 됨

- `client.ts` 연결 방식은 유지 가능하다. connection shorthand로 바꾸는 것은 보안 수정에 필요하지 않다.
- `sql<number>` count, 정적 order-by SQL, `unixepoch()` default는 유지 가능하다.
- `@libsql/client@0.17.2`는 ORM 0.45.2 peer 조건 `>=0.10.0`을 만족한다.

## 5. drizzle-kit도 같이 올려야 하는가

**아니다. 현재 `drizzle-kit@0.31.10`은 이미 npm의 안정 최신이며 `drizzle-orm@0.45.2`와 현재 config를 지원한다.** ORM만 0.45.2로 올리고 Kit는 0.31.10에 고정·재검증하면 된다.

두 경고를 구분해야 한다.

1. **ORM GHSA:** `drizzle-orm >=0.45.2`로 해결. Kit는 패치 조건이 아니다.
2. **Kit audit 경고:** `drizzle-kit@0.31.10`의 구형 `@esbuild-kit/esm-loader` 경로 때문에 moderate 경고가 남는다. npm의 `drizzle-kit@0.18.1` downgrade 제안은 config·기능 회귀를 부를 수 있어 적용하면 안 된다. upstream 안정 릴리스에서 재평가한다.

근거: [0.31.0 compatibility note](https://github.com/drizzle-team/drizzle-orm/releases/tag/0.31.0), [0.36.0 kit requirement](https://github.com/drizzle-team/drizzle-orm/releases/tag/0.36.0), [Drizzle Kit config](https://orm.drizzle.team/docs/drizzle-config-file)

## 6. GHSA-gpj5-g38j-94v9 발동 조건과 해당 여부

### 정확한 발동 조건

- 식별자 escaping 함수가 SQLite/PostgreSQL/Gel의 `"` 또는 MySQL/SingleStore의 backtick을 식별자 내부에서 이중화하지 않았다.
- 영향: `drizzle-orm <=0.45.1` 및 `<=1.0.0-beta.19`; 수정: `0.45.2`, `1.0.0-beta.20`.
- 취약 API 예: `sql.identifier(untrustedName)`, 사용자 입력 기반 `.as(untrustedAlias)`, 동적 CTE/alias/report column 이름.
- bind parameter 값이 아니라 **테이블명·컬럼명·alias 같은 SQL 식별자**에 공격자 입력이 들어갈 때 발동한다.

```ts
const sortField = req.query.sort; // 공격자 제어
db.select().from(users).orderBy(sql.identifier(sortField));
```

SQLite에서는 이름에 `"`를 넣어 quoted identifier를 끝낸 뒤 SQL 문법을 삽입할 수 있었다. 실제 결과는 query 문맥, driver의 multi-statement 허용, DB 권한에 따라 달라진다.

### temon.kr 해당 여부

| 점검 | 결과 | 판단 |
|---|---|---|
| `sql.identifier(...)` | 0건 | 현재 직접 경로 없음 |
| `.as(...)` | `searchEngineCase.as('engine')` 1건 | 정적 literal이라 해당 없음 |
| 사용자 입력 기반 table/column/alias | 발견되지 않음 | 해당 없음 |
| 사용자 값의 `sql` interpolation | column object + bind value | 정상 parameterization, GHSA 무관 |
| raw libSQL | 대부분 `?` + `args` | GHSA와 별개이며 값 binding 패턴 |

따라서 **현재 코드는 advisory의 실질적 exploit 조건에 해당하지 않는 것으로 판단한다(정적 검색 기준, 높은 신뢰도).** 다만 패키지는 취약 범위이고, 향후 동적 정렬에서 `sql.identifier(req.query.*)`가 추가되면 즉시 노출된다. 업그레이드 전에는 외부 입력을 identifier/alias/CTE name에 직접 전달하지 말고 allowlist로 schema column object에 매핑해야 한다.

공식 자료: [GHSA-gpj5-g38j-94v9](https://github.com/drizzle-team/drizzle-orm/security/advisories/GHSA-gpj5-g38j-94v9), [0.45.2 release](https://github.com/drizzle-team/drizzle-orm/releases/tag/0.45.2)

## 7. 예상 작업 규모와 위험도

| 단계 | 예상 | 위험 |
|---|---:|---|
| package/lockfile 갱신 | 15~30분 | 낮음 |
| schema extra-config 3곳 정리 | 30~60분 | 낮음 |
| dynamic query typing 정리 | 30~90분 | 낮음~중간 |
| build/typecheck 및 대표 API 테스트 | 1~3시간 | 중간 |
| Kit generate와 snapshot diff 검토 | 1~2시간 | 중간 |
| 별도 Turso DB migration smoke | 1~2시간 | 중간 |

총 예상은 코드 수정만 **0.5일 내외**, 안전한 migration 검증까지 **1~2일**이다. 실제 schema 변경은 없으므로 정상이라면 새 migration SQL이 없어야 한다. 예상 밖 migration이 생기면 적용하지 말고 원인을 분석한다.

주요 위험은 pre-1.0 타입 inference 변화, `as any`로 가려진 query builder 문제, `push`의 table/index 재작성 가능성, 0.44 이후 error wrapping, 다른 대형 업그레이드와 결합할 때의 원인 분리 실패다.

## 8. 지금 당장 하지 말아야 할 이유

**업그레이드를 장기간 미룰 강한 이유는 없다.** 보안 패치가 있고 코드 영향이 제한적이다. 다만 다음 조건에서는 즉시 production 반영하면 안 된다.

- 목표가 `0.45.0`/`0.45.1`이면 보안 문제가 해결되지 않는다.
- Next.js 14→16 같은 대형 업그레이드와 한 PR에 묶으면 회귀 원인 분리가 어렵다.
- 별도 Turso DB나 복구 가능한 snapshot 없이 `drizzle-kit push`부터 실행하면 안 된다.
- `npm audit fix --force`가 제시하는 `drizzle-kit@0.18.1` downgrade를 적용하면 안 된다.
- production 안정화 작업 중이라면 배포 창을 분리하고 DB read/write smoke를 준비한 뒤 진행한다.

권고 순서는 `drizzle-orm@0.45.2` 단독 업그레이드 → schema/type 정리 → build → 생성 SQL 무변경 확인 → staging Turso smoke → production 배포다.

## 9. 실행 전 체크리스트

- [ ] 별도 브랜치에서 `drizzle-orm`만 정확히 `0.45.2`로 변경
- [ ] `@libsql/client@0.17.2`, `drizzle-kit@0.31.10` 유지
- [ ] schema callback 객체→배열 변환
- [ ] `$dynamic()`로 조건부 query typing 검증
- [ ] `npm run build` 통과
- [ ] `sql.identifier`, 동적 `.as()` 재검색
- [ ] `drizzle-kit generate` 결과가 예상대로 비어 있는지 검토
- [ ] production 아닌 Turso DB에서 대표 read/write smoke
- [ ] npm audit에서 Drizzle GHSA 제거 확인
- [ ] ORM 단독 변경으로 배포하고 rollback 가능한 lockfile/commit 확보

## 10. 자료의 한계

- 릴리스 노트는 모든 내부 타입 변화를 완전한 migration guide로 제공하지 않는다. 공식 minor 릴리스, 현재 문서, npm metadata, 프로젝트 정적 검색을 결합했다.
- 조사-only 요청이므로 0.45.2 실제 설치·build는 수행하지 않았다. 구체적인 컴파일 오류 수는 업그레이드 브랜치에서 확정해야 한다.
- GHSA 적용 여부는 현재 저장소 정적 패턴 기준이며 외부 패키지 내부의 동적 identifier 사용까지 증명한 것은 아니다.
