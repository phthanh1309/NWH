# Nova Wave Hub (NWH)

Nền tảng đọc truyện trực tuyến dành cho độc giả Việt Nam, nơi người đọc khám phá và theo dõi tác phẩm, tương tác quanh nội dung đọc; creator có thể gửi tác phẩm có quyền sử dụng phù hợp để được xem xét phát hành theo quy trình minh bạch.

> **Trạng thái hiện tại:** E01-01 đã hoàn tất phần khởi tạo Next.js + TypeScript và kiểm chứng cục bộ (dev, lint, typecheck, build). Chưa có database, authentication, CI hoặc tính năng đọc truyện. Thay đổi đang chờ review/commit.

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
| E01 | Project Infrastructure | Đang thực hiện — E01-01 đã kiểm chứng, chờ review |
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
authentication, test framework hoặc CI trong E01-01.

## Cấu trúc repository

```text
.
├── .github/                  # Pull request template
├── src/
│   ├── app/                  # Next.js App Router
│   │   ├── layout.tsx
│   │   └── page.tsx
│   └── modules/              # Ranh giới module nghiệp vụ (modular monolith)
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
