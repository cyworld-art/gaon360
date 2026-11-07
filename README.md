# GAONVYRA 360 — Free Website Starter

**All-Round Embedded & AI Technology** · 비상업적 사이트.

![license](https://img.shields.io/badge/hosting-Vercel%20Hobby-222?style=flat-square)

## 기능

- Home, About, **Brand**, NPU & AI SDK, 8/16/32-bit Firmware, Healthcare, Embedded Hardware, AI Model Inference, Projects & Demos, Tech Notes
- 개인 프로필 수정 (`/account`)
- **관리자 전용 가입자 조회** (`/admin`): 이메일/표시 이름 검색, 가입일·마지막 로그인일, 20명 단위 페이지
- 서버/DB에서 권한을 강제하는 RLS + security definer RPC, 회원이 자신의 role을 변경할 수 없도록 열 수준 권한 설정
- Supabase 미연결 상태에서는 공개 포트폴리오 미리보기 가능 (인증 기능은 작동하지 않음)
- 가상 기술 컨셉 `Concept`/`Simulation` 및 비상업성 명시

## 1. 로컬 실행

필요: Node.js 20.9 이상 (Node 22 권장)

```bash
npm install
cp .env.example .env.local
npm run dev
```

`http://localhost:3000`에서 미리보기 가능. `.env.local`은 절대 GitHub에 올리지 마세요.

## 2.  설정

SQL Editor에서 `supabase/schema.sql` 전체 실행.

### 3. 관리자 계정 생성

1. 가입 페이지(`/login`)에서 실제 관리자가 사용할 이메일 계정을 **일반 회원으로 먼저 등록**합니다.
2. 이메일 인증 후, **Supabase SQL Editor에서만** 다음 SQL을 실행해 `admin`으로 승격합니다. 반드시 사용자 이메일을 변경한 뒤 실행하세요.

```sql
update public.profiles set role='admin'
where id=(select id from auth.users where email='YOUR_REAL_ADMIN_EMAIL' limit 1);
```

3. 관리자로 로그인하여 `/admin`으로 이동하세요. **가입자 이메일·가입일·최근 로그인·권한만** 조회할 수 있습니다.
4. 일반 회원 계정으로 `/admin` 접근을 시도하면 차단되어야 합니다.

**주의:** 단순한 UI 숨김이 아닙니다. DB RPC 내부에서 관리자 권한을 검사합니다. 일반 회원은 프로필 `role`·`status`를 수정할 수 없도록 열 수준 UPDATE 권한이 제한됩니다. 관리자가 직접 회원 계정을 차단·삭제하는 기능은 이 무료 스타터에 포함하지 않았습니다. Supabase 대시보드에서 별도로 수행하세요.

## 4. GitHub Free 저장소

git init
git add .
git commit -m "Initial GAONVYRA 360"
git branch -M main
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/gaon360.git
git push -u origin main
```

## 5. 배포

Framework = Next.js, Build Command = `npm run build` (자동 감지).
Environment Variables 두 개 추가: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`.

Supabase Authentication URL Configuration에 `https://YOUR-VERCEL-DOMAIN.vercel.app/**` 허용 URL 등록.
회원가입, 이메일 인증, 일반회원 `/admin` 차단, 관리자 가입자 조회를 반드시 확인합니다.

## 6. 운영 시 주의
- 개인정보 처리 안내(`/privacy`)는 **초안**입니다. 실사용 회원가입을 공개하기 전에 개인정보 처리 책임자, 실제 문의 채널, 보유·파기 기간, 국외 이전/위탁 등 필요한 법적 고지를 보완해야 합니다.
- 헬스케어 섹션은 합성 데이터만 사용합니다. 환자정보/실제 진단 데이터 업로드 금지.
- `GAONVYRA 360` 상표권은 조사 완료된 것이 아닙니다. 상표 등록 표시나 공식 DEEPX 제휴 주장을 하지 마세요.
- SDK나 코드 재사용 시 원 저장소 라이선스와 고지사항을 확인하세요.

## 현재 상태
- ⏳ 실제 관리자 계정: 가입 후 SQL Editor에서 admin 승격 필요

