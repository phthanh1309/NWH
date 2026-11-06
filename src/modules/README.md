# Modules

Thư mục này chứa các module nghiệp vụ của NWH theo hướng **modular monolith**.

Quy ước:

- Mỗi module sở hữu domain, use case và adapter hạ tầng của mình.
- Module khác chỉ gọi qua public service/use case, không truy cập trực tiếp
  repository hoặc Prisma client xuyên module.
- Không tạo module rỗng trước khi có vertical slice tương ứng.
- Các module dự kiến: `auth`, `users`, `catalog`, `chapters`, `reader`,
  `library`, `community`, `notifications`, `submissions`, `moderation`,
  `admin`, `storage`.
