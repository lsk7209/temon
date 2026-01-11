# D1 데이터베이스 설정 가이드

## 📋 개요

통계 정보는 **Cloudflare D1 데이터베이스**에 저장됩니다. D1은 Cloudflare의 서버리스 SQLite 데이터베이스로, 별도의 데이터베이스 서버 없이 통계를 저장할 수 있습니다.

## ⚠️ 중요 사항

**D1 데이터베이스가 연결되지 않으면:**
- 통계 데이터가 저장되지 않습니다
- 대시보드에 데이터가 표시되지 않습니다
- 검색 엔진별 유입, 키워드 분석 등 모든 통계 기능이 작동하지 않습니다

## 🔧 D1 데이터베이스 설정 방법

### 1단계: Cloudflare Dashboard에서 D1 데이터베이스 생성

1. **Cloudflare Dashboard 접속**
   - https://dash.cloudflare.com 접속
   - 로그인

2. **Workers & Pages 메뉴로 이동**
   - 왼쪽 사이드바에서 **Workers & Pages** 클릭

3. **D1 데이터베이스 생성**
   - 왼쪽 사이드바에서 **D1** 클릭
   - **Create database** 버튼 클릭

4. **데이터베이스 정보 입력**
   - **Database name**: `temon-analytics` (또는 원하는 이름)
   - **Region**: 가장 가까운 리전 선택 (예: `apac` - 아시아 태평양)
   - **Create** 버튼 클릭

5. **데이터베이스 ID 확인**
   - 생성된 데이터베이스 클릭
   - 상단에 표시된 **Database ID** 복사 (예: `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`)

### 2단계: 스키마 생성

1. **SQL 편집기 열기**
   - 생성한 데이터베이스 페이지에서 **SQL Editor** 탭 클릭

2. **스키마 실행**
   - `migrations/000_init.sql` 파일의 내용을 복사하여 SQL 편집기에 붙여넣기
   - **Run** 버튼 클릭하여 실행

### 3단계: Cloudflare Pages에 D1 바인딩

1. **Pages 프로젝트 설정**
   - Cloudflare Dashboard > **Workers & Pages** > **Pages**
   - `temon` 프로젝트 선택

2. **Settings 탭 클릭**

3. **Functions 섹션에서 D1 바인딩 추가**
   - **Functions** 섹션으로 스크롤
   - **D1 Database bindings** 섹션에서 **Add binding** 클릭
   - **Variable name**: `DB` (반드시 `DB`로 설정)
   - **Database**: `temon-analytics` 선택
   - **Save** 버튼 클릭

### 4단계: KV 네임스페이스 생성 및 바인딩 (선택사항)

세션 관리를 위해 KV 네임스페이스도 필요합니다:

1. **KV 네임스페이스 생성**
   - **Workers & Pages** > **KV** 클릭
   - **Create a namespace** 클릭
   - **Namespace title**: `temon-sessions` 입력
   - **Add** 버튼 클릭

2. **Pages에 KV 바인딩**
   - Pages 프로젝트 > **Settings** > **Functions**
   - **KV Namespace bindings** 섹션에서 **Add binding** 클릭
   - **Variable name**: `SESSIONS`
   - **KV namespace**: `temon-sessions` 선택
   - **Save** 버튼 클릭

### 5단계: 환경 변수 설정

1. **Pages 프로젝트 > Settings > Environment Variables**
2. 다음 변수 추가:
   - `ADMIN_TOKEN`: 관리자 대시보드 접근 토큰 (임의의 긴 문자열)

### 6단계: 배포 확인

1. **배포 후 대시보드 접속**
   - `/dashboard` 페이지 접속
   - 로그인

2. **데이터베이스 연결 확인**
   - 대시보드가 정상적으로 로드되면 연결 성공
   - 오류 메시지가 표시되면 위 단계를 다시 확인

## 🔍 연결 상태 확인

### 방법 1: 대시보드에서 확인
- 대시보드 접속 시 DB 연결 오류 메시지가 표시되면 연결 실패
- 데이터가 정상적으로 표시되면 연결 성공

### 방법 2: 헬스 체크 API 사용
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
  },
  "timestamp": "2025-01-09T12:00:00.000Z"
}
```

## ❓ 자주 묻는 질문

### Q: D1 데이터베이스 없이도 사이트는 작동하나요?
A: 네, 사이트 자체는 정상 작동합니다. 다만 통계 데이터가 저장되지 않고 대시보드에 데이터가 표시되지 않습니다.

### Q: D1 데이터베이스는 무료인가요?
A: Cloudflare D1은 무료 티어를 제공합니다. 월 5GB 읽기, 5GB 쓰기, 5GB 저장 공간이 무료로 제공됩니다.

### Q: 데이터는 어디에 저장되나요?
A: Cloudflare의 글로벌 네트워크에 분산 저장됩니다. 리전을 선택할 수 있습니다.

### Q: 기존 데이터는 어떻게 되나요?
A: D1 데이터베이스를 새로 생성하면 빈 데이터베이스입니다. 기존 데이터를 유지하려면 데이터베이스를 삭제하지 마세요.

## 📚 참고 자료

- [Cloudflare D1 문서](https://developers.cloudflare.com/d1/)
- [Cloudflare Pages Functions 문서](https://developers.cloudflare.com/pages/platform/functions/)
- [프로젝트 설정 가이드](./CLOUDFLARE_D1_KV_SETUP.md)

