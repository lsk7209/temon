# 통계 데이터 수집 상태 확인 가이드

## ⚠️ 중요: 현재 통계 정보의 정확성

**관리자 대시보드의 통계 정보는 D1 데이터베이스 연결 상태에 따라 달라집니다.**

### 정확한 통계를 보려면:

1. ✅ **D1 데이터베이스가 Cloudflare Pages에 바인딩되어 있어야 합니다**
2. ✅ **데이터 수집이 실제로 작동하고 있어야 합니다**
3. ✅ **스키마가 올바르게 생성되어 있어야 합니다**

---

## 🔍 현재 상태 확인 방법

### 1. DB 연결 상태 확인

대시보드 접속 시:
- **데이터가 0으로 표시되면**: DB 연결이 안 되어 있거나 데이터가 수집되지 않고 있습니다
- **"⚠️ 데이터베이스 연결 오류" 메시지**: DB가 바인딩되지 않았습니다
- **데이터가 표시되면**: 정상 작동 중입니다

### 2. 헬스 체크 API 사용

```bash
curl https://your-domain.com/api/health
```

응답 예시:
```json
{
  "status": "healthy",
  "db": {
    "connected": true,
    "message": "데이터베이스 연결 정상"
  }
}
```

### 3. 데이터 수집 확인

브라우저 개발자 도구 콘솔에서:
```javascript
// analytics.js가 로드되었는지 확인
console.log(window.temonAnalytics)

// 페이지 뷰 이벤트 수동 전송 테스트
window.temonAnalytics.trackPageView()
```

네트워크 탭에서 `/api/collect` 요청이 전송되는지 확인

---

## 📊 데이터 수집 흐름

```
사용자 방문
  ↓
analytics.js 로드 (app/layout.tsx)
  ↓
페이지 뷰 이벤트 자동 전송
  ↓
/api/collect 엔드포인트 호출
  ↓
D1 데이터베이스에 저장
  ↓
대시보드에서 조회 (/api/reports)
```

---

## ❌ 문제 해결

### 문제 1: 모든 통계가 0으로 표시됨

**원인:**
- D1 데이터베이스가 바인딩되지 않음
- 데이터 수집이 작동하지 않음
- 스키마가 생성되지 않음

**해결:**
1. Cloudflare Dashboard에서 D1 바인딩 확인
2. `DB_SETUP_GUIDE.md` 참고하여 설정
3. 스키마 생성 확인 (`migrations/000_init.sql`)

### 문제 2: "데이터베이스 연결 오류" 메시지

**원인:**
- D1 데이터베이스 바인딩 누락
- 잘못된 database_id

**해결:**
1. Cloudflare Dashboard > Pages > Settings > Functions
2. D1 Database bindings 확인
3. Variable name이 `DB`인지 확인
4. 올바른 database_id 설정

### 문제 3: 데이터가 수집되지 않음

**원인:**
- `analytics.js`가 로드되지 않음
- `/api/collect` 엔드포인트 오류
- CORS 문제

**해결:**
1. 브라우저 콘솔에서 `window.temonAnalytics` 확인
2. 네트워크 탭에서 `/api/collect` 요청 확인
3. Functions 배포 상태 확인

---

## ✅ 정확한 통계를 위한 체크리스트

- [ ] D1 데이터베이스 생성됨
- [ ] D1 데이터베이스가 Pages에 바인딩됨 (Variable: `DB`)
- [ ] 스키마 생성됨 (`migrations/000_init.sql` 실행)
- [ ] KV 네임스페이스 바인딩됨 (선택사항, 세션 관리용)
- [ ] `analytics.js`가 로드됨 (브라우저 콘솔 확인)
- [ ] `/api/collect` 요청이 성공함 (네트워크 탭 확인)
- [ ] 대시보드에 데이터가 표시됨

---

## 📝 참고

- **현재 상태**: DB 연결이 안 되어 있으면 통계는 **0**으로 표시됩니다
- **샘플 데이터 없음**: 대시보드는 실제 DB 데이터만 표시합니다
- **데이터 수집**: `analytics.js`가 자동으로 페이지 뷰를 추적합니다
- **실시간 반영**: 데이터는 즉시 DB에 저장되지만, 대시보드 새로고침 필요

---

## 🔗 관련 문서

- [DB 설정 가이드](./DB_SETUP_GUIDE.md)
- [Analytics 배포 가이드](./ANALYTICS_DEPLOYMENT.md)
- [Cloudflare D1 문서](https://developers.cloudflare.com/d1/)

