# Nova Wave Hub (NWH)

Nền tảng đọc truyện trực tuyến dành cho độc giả Việt Nam, nơi người đọc khám phá và theo dõi tác phẩm, tương tác quanh nội dung đọc; creator có thể gửi tác phẩm có quyền sử dụng phù hợp để được xem xét phát hành theo quy trình minh bạch.

> **Trạng thái hiện tại:** E01-01 đã hoàn tất phần khởi tạo Next.js + TypeScript; E01-02 đã thiết lập design tokens, typography, spacing và responsive application shell theo wireframe E00-04. Chưa có database, authentication, CI hoặc tính năng đọc truyện. Thay đổi đang chờ review/commit.

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
| E01 | Project Infrastructure | Đang thực hiện — E01-01 đã kiểm chứng; E01-02 chờ review |
| E02–E11 | Auth, catalog, rights, reader, community và launch readiness | Backlog |

Không coi việc tạo issue hoặc tài liệu nháp là hoàn thành epic. Chỉ đánh dấu hoàn thành khi acceptance criteria có bằng chứng và được review.

## Stack hiện tại

| Thành phần | Phiên bản |
| --- | --- |
| Next.js (App Router, Turbopack) | `16.4.5` |
| React / React DOM | `19.3.0` |
| TypeScript | `5.9.3` |
| ESLint + `eslint-config-next` | `9.39.5` / `16.4.5` |
| Node.js tối thiểu | `>=20.9.0` |
| Package manager | `npm@11.16.0` |

Dependency được khóa bằng `package-lock.json`. Không thêm Tailwind, database,
authentication, test framework hoặc CI trong E01-01. E01-02 dùng CSS thuần:
global CSS cho tokens/base styles và CSS Modules cho component, không thêm
UI framework hay dependency mới.

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
├── AGENTS.md                 # Hướng dẫn do Next.js sinh tự động
├── CONTRIBUTING.md
├── README.md
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── package-lock.json
└── tsconfig.json
```

Chưa có database, Prisma, authentication, API nghiệp vụ hoặc dữ liệu truyện.

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

## Bắt đầu đóng góp

### Yêu cầu hiện tại

- Git.
- Node.js `>=20.9.0` (đã kiểm chứng với `v24.18.0`).
- npm `11.16.0`.
- Tài khoản GitHub có quyền truy cập repository.

### Clone repository

```bash
git clone https://github.com/phthanh1309/NWH.git
cd NWH
```

### Thiết lập môi trường ứng dụng

```bash
npm install
npm run dev
```

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
