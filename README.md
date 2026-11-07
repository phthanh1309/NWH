# Nova Wave Hub (NWH)

Nền tảng đọc truyện trực tuyến dành cho độc giả Việt Nam, nơi người đọc khám phá và theo dõi tác phẩm, tương tác quanh nội dung đọc; creator có thể gửi tác phẩm có quyền sử dụng phù hợp để được xem xét phát hành theo quy trình minh bạch.

> **Trạng thái hiện tại:** E01-01 đã hoàn tất phần khởi tạo Next.js + TypeScript; E01-02 đã thiết lập design tokens, typography, spacing và responsive application shell theo wireframe E00-04; E01-03 đã thiết lập Neon PostgreSQL cho dev/staging ở mức cấu hình môi trường; E01-04 đã khóa Prisma ORM `7.10.1`, cấu hình Prisma Client generator và Prisma Migrate dùng direct connection, đồng thời áp dụng baseline migration trên Neon branch `dev`. Chưa có authentication, CI, DB client ứng dụng hoặc tính năng đọc truyện. Thay đổi đang chờ review/commit.

## Định hướng sản phẩm

- **Thị trường:** Việt Nam trước.
- **Mô hình:** Community, với nội dung từ đội ngũ quản trị và creator/cộng đồng.
- **Community:** reading-centric — tương tác gắn với tác phẩm, chương và hoạt động đọc; không có global social feed hoặc DM trong MVP.
- **Moderation:** mixed, tùy loại nội dung và mức độ xác minh của creator.
- **Content rights:** không publish hoặc tiếp tục phân phối nội dung khi quyền sử dụng chưa được xác minh và còn hiệu lực.
- **Kiến trúc mục tiêu:** Modular Monolith; tránh tách microservices hoặc thêm hạ tầng phức tạp khi chưa có nhu cầu được chứng minh.

Các quyết định sản phẩm, kiến trúc và backlog chuẩn được quản lý trong Project Skill `PROJECT_SKILL_READING_PLATFORM_V1.md` của dự án.

## Trạng thái roadmap

| Epic | Nội dung | Trạng thái |
| --- | --- | --- |
| E00 | Product Foundation | Đang thực hiện |
| E01 | Project Infrastructure | Đang thực hiện — E01-01, E01-02, E01-03 đã kiểm chứng; E01-04 chờ review |
| E02–E11 | Auth, catalog, rights, reader, community và launch readiness | Backlog |

Không coi việc tạo issue hoặc tài liệu nháp là hoàn thành epic. Chỉ đánh dấu hoàn thành khi acceptance criteria có bằng chứng và được review.

## Stack hiện tại

| Thành phần | Phiên bản |
| --- | --- |
| Next.js (App Router, Turbopack) | `16.4.5` |
| React / React DOM | `19.3.0` |
| TypeScript | `5.9.3` |
| ESLint + `eslint-config-next` | `9.39.5` / `16.4.5` |
| PostgreSQL (dev/staging) | Neon, branches `dev` và `staging`, region `aws-ap-southeast-1` |
| Prisma ORM (CLI / Client / Neon adapter) | `7.10.1` (pin chính xác) |
| Node.js tối thiểu | `>=20.9.0` |
| Package manager | `npm@11.16.0` |

Dependency được khóa bằng `package-lock.json`. Không thêm Tailwind, authentication,
test framework hoặc CI trong E01-01. E01-02 dùng CSS thuần: global CSS cho tokens/base
styles và CSS Modules cho component, không thêm UI framework hay dependency mới.
E01-03 chỉ cấu hình biến môi trường và tài liệu kết nối Neon PostgreSQL. E01-04
thêm Prisma ORM `7.10.1`, schema khung, Prisma Client generator và baseline
migration; **chưa** tạo DB client cho ứng dụng, env validation hoặc health
endpoint — các phần đó thuộc E01-05.

## Cấu trúc repository

```text
.
├── .github/                  # Pull request template
├── src/
│   ├── app/                  # Next.js App Router
│   │   ├── globals.css       # Reset + base styles
│   │   ├── layout.tsx        # Root layout, bọc AppShell
│   │   └── page.tsx          # Homepage placeholder
│   ├── components/
│   │   └── layout/           # AppShell, AppHeader, AppFooter, BottomNav, NavLinks
│   ├── modules/              # Ranh giới module nghiệp vụ (modular monolith)
│   ├── generated/prisma/     # Prisma Client generated (không commit)
│   └── styles/
│       └── tokens.css        # Design tokens (màu, type, spacing, radius, shadow, layout)
├── prisma/
│   ├── schema.prisma         # Datasource + generator; model nghiệp vụ thêm theo epic
│   └── migrations/           # Prisma Migrate migrations (commit)
├── prisma7.config.ts         # Prisma CLI config; dùng DATABASE_URL_UNPOOLED
├── .env.example              # Placeholder biến môi trường (được commit)
├── .env.local                # Secret local, bị .gitignore (không commit)
├── AGENTS.md                 # Hướng dẫn do Next.js sinh tự động
├── CONTRIBUTING.md
├── README.md
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── package-lock.json
└── tsconfig.json
```

Chưa có model nghiệp vụ hoặc dữ liệu truyện. Kết nối PostgreSQL dev/staging được
cấu hình qua biến môi trường (E01-03); Prisma schema và migration được thiết lập
ở E01-04. DB client ứng dụng, authentication và API nghiệp vụ thuộc các epic sau.

## Design system và layout (E01-02)

Toàn bộ token nằm trong `src/styles/tokens.css`; component dùng CSS Modules và
chỉ tham chiếu biến token, không hard-code màu/spacing. Base styles, focus ring
và utility tối thiểu (`.container`, `.visually-hidden`, `.skip-link`) nằm trong
`src/app/globals.css`. Khi có visual identity chính thức, chỉ thay giá trị
primitive trong `tokens.css`, không sửa từng component.

| Nhóm token | Ví dụ |
| --- | --- |
| Color | `--color-bg`, `--color-surface`, `--color-text-muted`, `--color-primary`, `--color-danger-soft`, `--color-focus-ring` |
| Typography | `--font-sans`, `--font-size-md`, `--font-weight-semibold`, `--line-height-relaxed` |
| Spacing | `--space-1` … `--space-12` (thang 4px) |
| Radius / shadow | `--radius-md`, `--shadow-md` |
| Layout / focus | `--container-max`, `--page-gutter`, `--focus-ring-width` |

Breakpoint (đồng bộ với E00-04 §2.1, không dùng được biến CSS trong `@media`):

| Thiết bị | Viewport | Shell |
| --- | --- | --- |
| Mobile | `< 640px` | Header 2 dòng (logo, search), bottom navigation cố định, footer dọc |
| Tablet | `640–1023px` | Header 1 dòng, search co giãn, bottom navigation |
| Desktop | `>= 1024px` | Header đầy đủ (logo, search, nav, tài khoản), không bottom navigation |
| Wide | `>= 1280px` | Nội dung giới hạn `--container-max` (1200px) |

Accessibility baseline: skip link tới `#main-content`, `:focus-visible` dùng
`--color-focus-ring` với offset, touch target tối thiểu 44px, active nav không
chỉ biểu thị bằng màu, tôn trọng `prefers-reduced-motion`.

Các route `/kham-pha`, `/thu-vien`, `/tai-khoan`, `/tim-kiem` và link footer là
placeholder cho E02/E03; hiện chưa có page tương ứng. E00-04 §17 vẫn để mở lựa
chọn “bottom navigation hay menu drawer”; tạm dùng bottom navigation vì
wireframe Homepage mobile vẽ rõ bottom bar — cần Product Owner xác nhận.

## Database — Neon PostgreSQL và Prisma (E01-03, E01-04)

Database provider đã chốt cho dev/staging là **Neon PostgreSQL**. E01-03 thiết lập
project, branch và biến môi trường kết nối; E01-04 khóa **Prisma ORM `7.10.1`**,
tạo Prisma schema khung, generator `prisma-client` và baseline migration.
Ứng dụng **chưa** có DB client/Prisma Client runtime — phần đó thuộc E01-05.

| Môi trường | Neon branch | Mục đích | Nơi lưu secret |
| --- | --- | --- | --- |
| Development | `dev` | Chạy local | `.env.local` (không commit) |
| Staging | `staging` | Môi trường staging khi có hạ tầng | Secret store của nền tảng deploy |
| Nền | `production` (default) | Branch nền trống, không dùng cho ứng dụng | Không cấu hình |

Project hiện tại: **NWH**, region **`aws-ap-southeast-1` (Singapore)** — phù hợp
độ trễ cho người dùng Việt Nam. Cần xác nhận lại region nếu muốn đổi.

### Tạo project và branch trên Neon Console

1. Đăng ký/đăng nhập <https://console.neon.tech> bằng **free plan**; không chọn
   compute/plan trả phí và không thực hiện upgrade.
2. Tạo project PostgreSQL cho NWH (region `aws-ap-southeast-1`).
3. Giữ branch default (`production`) trống làm branch nền; không trỏ ứng dụng
   vào branch này.
4. Tạo hai branch độc lập `dev` và `staging` từ branch nền trống.
5. Với từng branch: mở **Connect**, chọn đúng branch, database `neondb` và role
   `neondb_owner`, rồi sao chép **Pooled connection string** và **Direct
   connection string**.
6. Dán giá trị pooled vào `DATABASE_URL` và giá trị direct vào
   `DATABASE_URL_UNPOOLED` của môi trường tương ứng. Không gửi connection string
   qua chat, issue, PR, log hoặc screenshot.

Giữ nguyên tham số `sslmode=require` do Neon cung cấp; không tự sửa hostname
hoặc ghép connection string bằng tay.

### Biến môi trường

| Biến | Nội dung | Ghi chú |
| --- | --- | --- |
| `DATABASE_URL` | Pooled connection string của branch tương ứng | Bắt buộc; dùng cho application runtime; dev và staging dùng giá trị khác nhau |
| `DATABASE_URL_UNPOOLED` | Direct connection string của cùng branch | Bắt buộc cho Prisma CLI/migration; không dùng cho runtime traffic |
| `SHADOW_DATABASE_URL` | Direct connection tới database shadow riêng | Tùy chọn, chỉ cần cho `prisma migrate dev`; chưa cấu hình trong E01-04 |

Prisma ORM 7 **không còn hỗ trợ `directUrl`** trong schema/config. Prisma CLI dùng
`datasource.url` trong `prisma7.config.ts`, vì vậy file này trỏ trực tiếp tới
`DATABASE_URL_UNPOOLED`. Application runtime (E01-05) sẽ dùng adapter Neon với
`DATABASE_URL` pooled. Không chạy migration qua connection có hậu tố `-pooler`.

### Thiết lập local

```bash
cp .env.example .env.local
# Mở .env.local và điền:
#   DATABASE_URL          = pooled connection string của branch dev
#   DATABASE_URL_UNPOOLED = direct connection string của cùng branch dev
```

Nếu máy đã liên kết Neon CLI với project, có thể pull trực tiếp cả hai biến:

```bash
neon env pull --branch dev
```

Kiểm tra nhanh mà không in secret:

```bash
node --env-file=.env.local -e "for (const k of ['DATABASE_URL','DATABASE_URL_UNPOOLED']) { const u=new URL(process.env[k]); console.log(k,{pooled:u.hostname.includes('-pooler'),sslmode:u.searchParams.get('sslmode')}) }"
```

`DATABASE_URL` phải là pooled (hostname có `-pooler`); `DATABASE_URL_UNPOOLED`
phải là direct (không có `-pooler`). `.env.local` bị `.gitignore`; chỉ
`.env.example` (placeholder) được commit.

### Prisma — generate và migration (E01-04)

Prisma CLI/Client/Neon adapter được pin chính xác ở `7.10.1`. Không dùng
`npm install prisma` hoặc `npx prisma` không pin: npm `latest` của `prisma` hiện
trỏ tới Prisma 8 release candidate, không khớp `@prisma/client` 7.x.

```bash
npm run db:validate        # kiểm tra schema, không cần kết nối DB
npm run db:generate        # tạo Prisma Client vào src/generated/prisma
npm run db:status          # xem trạng thái migration trên branch đang cấu hình
npm run db:migrate:deploy  # áp dụng migration đã commit (CI/staging/production)
npm run db:migrate:dev -- --name <ten_migration>  # chỉ dev, cần shadow database
```

Quy tắc an toàn:

- Migration chỉ dùng `DATABASE_URL_UNPOOLED` (direct). Không dùng pooled URL.
- Không chạy `prisma migrate reset`, `db push --force-reset` hoặc
  `--accept-data-loss` khi chưa có phê duyệt rõ ràng.
- E01-04 chỉ có baseline migration rỗng trên branch `dev`; model nghiệp vụ đầu
  tiên thuộc E02/E03.
- `src/generated/prisma/` là build artifact, không commit; chạy `db:generate`
  sau khi clone hoặc sau mỗi lần đổi schema.
- Không chạy migration trên `staging`/`production` trong E01-04.

### Cấu hình staging

- Cấu hình `DATABASE_URL` (pooled) và `DATABASE_URL_UNPOOLED` (direct) trong
  secret store của nền tảng chạy staging, dùng giá trị của branch `staging`.
- Application runtime chỉ dùng `DATABASE_URL`; migration job dùng
  `DATABASE_URL_UNPOOLED` và chạy `prisma migrate deploy` trước khi deploy app.
- Không dùng chung secret với local dev và không commit giá trị thật.
- Nếu secret bị lộ, rotate credential trong Neon Console trước khi dùng lại.
- Chưa chạy migration trên staging/production trong E01-04. Khi chuẩn bị chạy,
  cần backup/branch an toàn, chạy `migrate status` trước và sau, và có kế hoạch
  forward-fix; không reset database.

### Phạm vi chưa bao gồm

DB client ứng dụng, Prisma Client runtime, env validation và health endpoint
thuộc **E01-05**. Model nghiệp vụ, authentication, catalog, rights, reader và
community thuộc các epic sau. E01-04 chỉ thiết lập Prisma tooling và baseline
migration; không thêm model nghiệp vụ.

## Bắt đầu đóng góp

### Yêu cầu hiện tại

- Git.
- Node.js `>=20.9.0` (đã kiểm chứng với `v24.18.0`).
- npm `11.16.0`.
- Tài khoản Neon (free plan) nếu cần thiết lập lại project/branch.
- Tài khoản GitHub có quyền truy cập repository.

### Clone repository

```bash
git clone https://github.com/phthanh1309/NWH.git
cd NWH
```

### Thiết lập môi trường ứng dụng

```bash
npm install
cp .env.example .env.local   # điền DATABASE_URL và DATABASE_URL_UNPOOLED của branch dev
npm run db:generate
npm run dev
```

`npm run db:generate` tạo Prisma Client vào `src/generated/prisma` (đã ignore).
Ứng dụng đọc `.env.local` tự động; không commit file này.

Development server mặc định chạy tại <http://localhost:3000>.

### Kiểm tra chất lượng

```bash
npm run db:validate
npm run db:generate
npm run lint
npm run typecheck
npm run build
```

`db:validate` và `db:generate` chạy offline (không cần kết nối database).
`db:status` và `db:migrate:*` cần `DATABASE_URL_UNPOOLED` của Neon branch dev.

Chạy bản production đã build:

```bash
npm run start
```

Chưa có lệnh test vì Vitest/Playwright thuộc E01-06.

## Quy tắc quan trọng

1. Không commit API keys, credentials, private keys, database URLs hoặc file môi trường thực.
2. Không push trực tiếp lên `main`; thay đổi phải đi qua pull request.
3. Không đưa secrets vào issue, PR description, log hoặc screenshot.
4. Mọi authorization phải được kiểm tra ở server; ẩn nút trên UI không phải biện pháp bảo vệ.
5. Không publish nội dung khi rights chưa verified.
6. Không thêm global feed hoặc DM vào MVP nếu Product Owner chưa thay đổi quyết định.
7. Không thực hiện database reset, force push, deploy production hoặc thao tác destructive nếu chưa được cho phép.
8. Migration Prisma chỉ dùng `DATABASE_URL_UNPOOLED` (direct), không dùng pooled URL; không chạy migration production khi chưa được duyệt.
9. Không dùng `prisma@latest` hoặc `npx prisma` không pin; CLI/Client/adapter phải cùng `7.10.1` cho đến khi có task nâng cấp riêng.

## Liên kết

- [GitHub repository](https://github.com/phthanh1309/NWH)
- [Epic E00 – Product Foundation](https://github.com/phthanh1309/NWH/issues/1)
- [E00-01 – Repository, README & Git governance](https://github.com/phthanh1309/NWH/issues/2)
