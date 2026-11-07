# Nova Wave Hub (NWH)

Nền tảng đọc truyện trực tuyến dành cho độc giả Việt Nam, nơi người đọc khám phá và theo dõi tác phẩm, tương tác quanh nội dung đọc; creator có thể gửi tác phẩm có quyền sử dụng phù hợp để được xem xét phát hành theo quy trình minh bạch.

> **Trạng thái hiện tại:** E01-01 đã hoàn tất phần khởi tạo Next.js + TypeScript; E01-02 đã thiết lập design tokens, typography, spacing và responsive application shell theo wireframe E00-04; E01-03 đã thiết lập Neon PostgreSQL cho dev/staging ở mức cấu hình môi trường (chưa có Prisma/migration). Chưa có authentication, CI hoặc tính năng đọc truyện. Thay đổi đang chờ review/commit.

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
| E01 | Project Infrastructure | Đang thực hiện — E01-01, E01-02 đã kiểm chứng; E01-03 chờ review |
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
| Node.js tối thiểu | `>=20.9.0` |
| Package manager | `npm@11.16.0` |

Dependency được khóa bằng `package-lock.json`. Không thêm Tailwind, database,
authentication, test framework hoặc CI trong E01-01. E01-02 dùng CSS thuần:
global CSS cho tokens/base styles và CSS Modules cho component, không thêm
UI framework hay dependency mới. E01-03 chỉ cấu hình biến môi trường và tài
liệu kết nối Neon PostgreSQL; chưa thêm Prisma, schema, migration hay DB client
— các phần đó thuộc E01-04/E01-05.

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
│   └── styles/
│       └── tokens.css        # Design tokens (màu, type, spacing, radius, shadow, layout)
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

Chưa có Prisma, migration, schema nghiệp vụ hoặc dữ liệu truyện. Kết nối
PostgreSQL dev/staging được cấu hình qua biến môi trường (E01-03);
authentication và API nghiệp vụ thuộc các epic sau.

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

## Database — Neon PostgreSQL (E01-03)

Database provider đã chốt cho dev/staging là **Neon PostgreSQL**. Ứng dụng chưa
có Prisma, schema hay migration; E01-03 chỉ thiết lập project, branch và biến
môi trường kết nối.

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
   `neondb_owner`, rồi sao chép **Pooled connection string**.
6. Dán giá trị pooled vào `DATABASE_URL` của môi trường tương ứng. Không gửi
   connection string qua chat, issue, PR, log hoặc screenshot.

Giữ nguyên tham số `sslmode=require` do Neon cung cấp; không tự sửa hostname
hoặc ghép connection string bằng tay.

### Biến môi trường

| Biến | Nội dung | Ghi chú |
| --- | --- | --- |
| `DATABASE_URL` | Pooled connection string của branch tương ứng | Bắt buộc; dev và staging dùng giá trị khác nhau |

Direct connection string của Neon có sẵn trong Console nhưng **chưa được đặt
quy ước** trong E01-03. E01-04 (chọn Prisma version và cấu hình migration) sẽ
quyết định biến direct connection dùng cho migration.

### Thiết lập local

```bash
cp .env.example .env.local
# Mở .env.local và điền DATABASE_URL bằng pooled connection string của branch dev
```

Nếu máy đã liên kết Neon CLI với project, có thể pull trực tiếp:

```bash
neon env pull --branch dev --env DATABASE_URL
```

Kiểm tra nhanh mà không in secret:

```bash
node --env-file=.env.local -e "const u=new URL(process.env.DATABASE_URL); console.log({pooled:u.hostname.includes('-pooler.'),sslmode:u.searchParams.get('sslmode')})"
```

`.env.local` bị `.gitignore`; chỉ `.env.example` (placeholder) được commit.

### Cấu hình staging

- Cấu hình `DATABASE_URL` trong secret store của nền tảng chạy staging, dùng
  **pooled connection string của branch `staging`**.
- Không dùng chung secret với local dev và không commit giá trị thật.
- Nếu secret bị lộ, rotate credential trong Neon Console trước khi dùng lại.

### Phạm vi chưa bao gồm

Prisma, `schema.prisma`, migration và `prisma migrate` **không thuộc E01-03**;
sẽ được xử lý ở **E01-04**. DB client, env validation và health endpoint thuộc
**E01-05**.

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
cp .env.example .env.local   # rồi điền DATABASE_URL của branch dev
npm run dev
```

Ứng dụng đọc `.env.local` tự động; không commit file này.

Development server mặc định chạy tại <http://localhost:3000>.

### Kiểm tra chất lượng

```bash
npm run lint
npm run typecheck
npm run build
```

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

## Liên kết

- [GitHub repository](https://github.com/phthanh1309/NWH)
- [Epic E00 – Product Foundation](https://github.com/phthanh1309/NWH/issues/1)
- [E00-01 – Repository, README & Git governance](https://github.com/phthanh1309/NWH/issues/2)
