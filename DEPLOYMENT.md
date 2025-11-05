# 배포 가이드 - Cloudflare Pages + D1 + Workers

## 📋 사전 준비사항

### 1. Cloudflare 계정 설정
- Cloudflare 계정 생성
- Cloudflare Workers & Pages 활성화

### 2. Wrangler CLI 설치
```bash
npm install -g wrangler
# 또는
pnpm add -g wrangler
```

### 3. Cloudflare 로그인
```bash
wrangler login
```

---

## 🗄️ 데이터베이스 설정 (D1)

### 1. D1 데이터베이스 생성
```bash
wrangler d1 create temon-mbti-db
```

출력된 `database_id`를 `wrangler.toml`의 `database_id`에 설정합니다.

### 2. 로컬 데이터베이스 초기화 (개발용)
```bash
wrangler d1 execute temon-mbti-db --local --file=./lib/db/schema.sql
```

### 3. 프로덕션 데이터베이스 초기화
```bash
wrangler d1 execute temon-mbti-db --file=./lib/db/schema.sql
```

---

## 🔧 환경 변수 설정

### 1. 로컬 개발 환경
`.env.local` 파일 생성:
```env
NEXT_PUBLIC_GA_ID=G-2TLW7Z2VQW
NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-3050601904412736
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
```

### 2. Cloudflare Pages 환경 변수
Cloudflare Dashboard에서 설정:
1. Pages > Your Project > Settings > Environment Variables
2. 다음 변수 추가:
   - `NEXT_PUBLIC_GA_ID`
   - `NEXT_PUBLIC_ADSENSE_CLIENT_ID`
   - `NEXT_PUBLIC_APP_URL`

### 3. Workers 환경 변수
`wrangler.toml`에 설정되어 있거나, Dashboard에서 설정:
```bash
wrangler secret put ADMIN_PASSWORD
wrangler secret put API_SECRET_KEY
```

---

## 🚀 배포 프로세스

### 방법 1: Cloudflare Pages 자동 배포 (권장)

1. **GitHub 연동**
   - Cloudflare Dashboard > Pages > Create a project
   - GitHub 저장소 연결
   - 빌드 설정:
     - Framework preset: Next.js
     - Build command: `npm run build`
     - Build output directory: `.next`

2. **환경 변수 설정**
   - Pages > Settings > Environment Variables
   - 필요한 변수 추가

3. **자동 배포**
   - GitHub에 push하면 자동 배포됩니다

### 방법 2: Wrangler CLI 수동 배포

```bash
# 빌드
npm run build

# 배포
wrangler pages deploy .next
```

---

## ⚙️ Cron 작업 설정

### 1. Cron Worker 배포
```bash
wrangler deploy workers/cron-stats.ts --name cron-stats
```

### 2. Cron Trigger 설정 확인
`wrangler.toml`의 `[[triggers.crons]]` 섹션 확인:
```toml
[[triggers.crons]]
cron = "0 2 * * *" # 매일 오전 2시 (UTC)
```

### 3. 로컬 테스트
```bash
wrangler dev workers/cron-stats.ts
```

---

## 🔍 데이터베이스 관리

### 로컬 데이터베이스 조회
```bash
wrangler d1 execute temon-mbti-db --local --command="SELECT * FROM test_results LIMIT 10"
```

### 프로덕션 데이터베이스 조회
```bash
wrangler d1 execute temon-mbti-db --command="SELECT * FROM test_results LIMIT 10"
```

### 데이터베이스 백업
```bash
wrangler d1 export temon-mbti-db --output=backup.sql
```

### 데이터베이스 복원
```bash
wrangler d1 execute temon-mbti-db --file=backup.sql
```

---

## 📊 모니터링

### Cloudflare Dashboard
- Analytics: 트래픽, 요청 수, 에러율
- Logs: 실시간 로그 확인
- Workers: Cron 작업 실행 상태

### 로그 확인
```bash
wrangler tail
```

---

## 🐛 트러블슈팅

### 문제 1: D1 데이터베이스 연결 실패
**해결:**
- `wrangler.toml`의 `database_id` 확인
- `wrangler login` 상태 확인
- 권한 확인

### 문제 2: 환경 변수 누락
**해결:**
- Cloudflare Dashboard에서 환경 변수 확인
- 로컬 개발 시 `.env.local` 확인

### 문제 3: Cron 작업이 실행되지 않음
**해결:**
- `wrangler.toml`의 cron 설정 확인
- Workers 배포 상태 확인
- 로그 확인: `wrangler tail`

### 문제 4: API 라우트 에러
**해결:**
- D1 데이터베이스 바인딩 확인
- 에러 로그 확인
- API 라우트가 Cloudflare Workers Functions로 올바르게 배포되었는지 확인

---

## 📝 체크리스트

배포 전 확인사항:
- [ ] D1 데이터베이스 생성 및 스키마 적용
- [ ] 환경 변수 설정 완료
- [ ] 로컬 빌드 성공 확인
- [ ] Cron 작업 배포 확인
- [ ] API 라우트 테스트
- [ ] 데이터베이스 연결 테스트
- [ ] Analytics 추적 확인

---

## 🔗 참고 링크

- [Cloudflare Pages 문서](https://developers.cloudflare.com/pages/)
- [Cloudflare D1 문서](https://developers.cloudflare.com/d1/)
- [Cloudflare Workers 문서](https://developers.cloudflare.com/workers/)
- [Wrangler CLI 문서](https://developers.cloudflare.com/workers/wrangler/)

---

**마지막 업데이트**: 2024년 12월

