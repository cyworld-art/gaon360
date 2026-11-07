# GAONVYRA 360 — Free Website Starter

**All-Round Embedded & AI Technology** · 비상업적 가상 기술기업 사이트.

![license](https://img.shields.io/badge/hosting-Vercel%20Hobby-222?style=flat-square)

## 포함 기능

- Home, About, **Brand**, NPU & AI SDK, 8/16/32-bit Firmware, Healthcare, Embedded Hardware, AI Model Inference, Projects & Demos, Tech Notes
- Supabase Auth 이메일 회원가입/로그인/비밀번호 재설정
- 개인 프로필 수정 (`/account`)
- **관리자 전용 가입자 조회** (`/admin`): 이메일/표시 이름 검색, 가입일·마지막 로그인일, 20명 단위 페이지
- 서버/DB에서 권한을 강제하는 RLS + security definer RPC, 회원이 자신의 role을 변경할 수 없도록 열 수준 권한 설정
- Supabase 미연결 상태에서는 공개 포트폴리오 미리보기 가능 (인증 기능은 작동하지 않음)
- 가상 기술 컨셉 `Concept`/`Simulation` 및 비상업성 명시

## 대표 연락처

- 이메일: **gaon360.admin@gmail.com** (푸터·About·개인정보 안내·계정 페이지에 표시)

## 연결된 Supabase 프로젝트

- 프로젝트: `gaon360` (Free, ap-northeast-2 서울), ref `ghaqervshvgkkhwlhwdw`
- URL: `https://ghaqervshvgkkhwlhwdw.supabase.co`
- `supabase/schema.sql` 적용 완료 (기본 권한 revoke 보안 수정 포함)
- 브라우저에는 publishable key만 사용합니다. service_role / secret key 사용 금지.

## 비용: $0 유지

| 서비스 | 요금제 | 용도 |
|---|---|---|
| [v0](https://v0.app) | Free | UI 디자인 수정 선택사항. 무료 크레딧 한도 초과 시 중지 |
| [GitHub](https://github.com) | Free | 소스 관리, 공개/비공개 리포지토리 |
| [Vercel](https://vercel.com) | **Hobby** | 비상업적 개인 프로젝트 배포. 요금 발생 전에 배포·기능이 중단될 수 있음 |
| [Supabase](https://supabase.com) | **Free** | 1개 PostgreSQL, 인증, RLS. 미사용 기간이 길면 자동 일시 중지 |

**유료 업그레이드, 자체 도메인, 메일 발송 서비스, Vercel Pro, Supabase Pro 사용하지 마세요.** 무료 티어의 월별 한도는 공식 가격 안내를 수시로 확인하세요. v0는 디자인 보조 도구이고 **앱 런타임 필수 의존성이 아닙니다**.

## 1. 로컬 실행

필요: Node.js 20.9 이상 (Node 22 권장)

```bash
npm install
cp .env.example .env.local
npm run dev
```

`http://localhost:3000`에서 미리보기 가능. `.env.local`은 절대 GitHub에 올리지 마세요.

## 2. Supabase Free 설정

1. Supabase 무료 계정에서 새로운 **Free** 프로젝트를 만듭니다.
2. SQL Editor에서 `supabase/schema.sql` 전체 실행.
3. Project Settings / API에서 **Project URL**과 **publishable 또는 anon key**를 `.env.local`에 넣습니다. **service_role / secret key 절대 넣지 마세요.**
4. Authentication / Providers에서 Email 로그인 활성화. Auth URL 설정에 로컬과 Vercel 실제 도메인을 허용하고 `/account` 경로가 인증 후 접근 가능하게 설정하세요.
5. 가입 시 이메일 확인 여부에 따라 메일 확인 후 로그인합니다. Supabase 내장 이메일은 발송 한도가 낮으며 운영 서비스에 적합하지 않을 수 있습니다. 대량 공개 회원모집은 무료 구성에서 제외합니다.

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

1. [GitHub 신규 저장소](https://github.com/new)에서 `gaon360` **비공개** 저장소를 사용합니다.
2. 다운로드한 ZIP을 풀어 파일 전체 업로드하거나 터미널에서:

```bash
git init
git add .
git commit -m "Initial GAONVYRA 360 free website"
git branch -M main
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/gaon360.git
git push -u origin main
```

## 5. Vercel Hobby 배포

1. Vercel에서 **Hobby** 계정임을 확인합니다. [New Project](https://vercel.com/new) → GitHub 저장소 연결.
2. Framework = Next.js, Build Command = `npm run build` (자동 감지).
3. Environment Variables 두 개 추가: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
4. Deploy 후 무료 `*.vercel.app` 주소를 사용합니다. 별도 도메인 구매 불필요.
5. Supabase Authentication URL Configuration에 `https://YOUR-VERCEL-DOMAIN.vercel.app/**` 허용 URL 등록.
6. 회원가입, 이메일 인증, 일반회원 `/admin` 차단, 관리자 가입자 조회를 반드시 확인합니다.

## 6. 운영 시 주의

- **반드시 비상업적 개인 프로젝트만** Hobby에서 운영합니다. 상품판매·광고수익·유료 서비스 금지.
- Free Supabase 프로젝트는 저활동 7일 경과 시 일시 중지될 수 있고 자동 백업이 제공되지 않습니다. 주기적으로 수동 백업하세요.
- 개인정보 처리 안내(`/privacy`)는 **초안**입니다. 실사용 회원가입을 공개하기 전에 개인정보 처리 책임자, 실제 문의 채널, 보유·파기 기간, 국외 이전/위탁 등 필요한 법적 고지를 보완해야 합니다.
- 헬스케어 섹션은 합성 데이터만 사용합니다. 환자정보/실제 진단 데이터 업로드 금지.
- `GAONVYRA 360` 상표권은 조사 완료된 것이 아닙니다. 상표 등록 표시나 공식 DEEPX 제휴 주장을 하지 마세요.
- SDK나 코드 재사용 시 원 저장소 라이선스와 고지사항을 확인하세요.

## 현재 상태

- ✅ Next.js 소스코드와 무료 Supabase SQL 완성
- ✅ 회원가입/관리자 조회 인터페이스 작성
- ✅ Supabase Free 프로젝트 `gaon360` 생성 및 스키마 적용
- ⏳ 실제 관리자 계정: 가입 후 SQL Editor에서 admin 승격 필요
- ⏳ GitHub 저장소 생성 후 Vercel 연동·실배포 필요
