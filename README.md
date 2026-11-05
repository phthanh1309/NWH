# Nova Wave Hub (NWH)

Nền tảng đọc truyện trực tuyến dành cho độc giả Việt Nam, nơi người đọc khám phá và theo dõi tác phẩm, tương tác quanh nội dung đọc; creator có thể gửi tác phẩm có quyền sử dụng phù hợp để được xem xét phát hành theo quy trình minh bạch.

> **Trạng thái hiện tại:** repository đang ở giai đoạn Product Foundation (E00). Chưa có ứng dụng chạy được, chưa có `package.json`, database hoặc môi trường triển khai. Không chạy lệnh cài đặt/build ứng dụng cho đến khi E01 xác nhận stack và khởi tạo project.

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
| E01 | Project Infrastructure | Chưa bắt đầu |
| E02–E11 | Auth, catalog, rights, reader, community và launch readiness | Backlog |

Không coi việc tạo issue hoặc tài liệu nháp là hoàn thành epic. Chỉ đánh dấu hoàn thành khi acceptance criteria có bằng chứng và được review.

## Repository hiện tại

Các tài liệu chính:

- `README.md`: tổng quan dự án và trạng thái repository.
- `CONTRIBUTING.md`: quy trình cộng tác, branch, commit và pull request.
- `.github/PULL_REQUEST_TEMPLATE.md`: checklist khi mở pull request.
- `.gitignore`: loại trừ file môi trường, secrets và artifacts phổ biến.

Cấu trúc tài liệu sản phẩm/kỹ thuật sẽ được bổ sung theo từng task E00; không tạo sẵn source tree hoặc cấu hình app trước E01.

## Bắt đầu đóng góp

### Yêu cầu hiện tại

- Git.
- Tài khoản GitHub có quyền truy cập repository.
- Không cần cài Node.js/package manager ở giai đoạn E00 vì repository chưa có ứng dụng.

### Clone repository

```bash
git clone https://github.com/phthanh1309/NWH.git
cd NWH
```

### Thiết lập môi trường ứng dụng

Chưa áp dụng. E01-01 sẽ xác nhận phiên bản runtime/package manager và bổ sung lệnh cài đặt, chạy dev, lint, typecheck, test và build sau khi stack được duyệt. Không tự suy đoán phiên bản hoặc tạo lockfile trong E00.

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
