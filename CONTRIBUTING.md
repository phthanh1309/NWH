# Contributing to NWH

Tài liệu này quy định cách cộng tác trên repository Nova Wave Hub. Khi có khác biệt, Project Skill và quyết định sản phẩm đã được Product Owner duyệt là nguồn sự thật.

## 1. Trước khi bắt đầu

1. Đọc README và issue/task liên quan.
2. Xác nhận scope, dependencies, acceptance criteria và test plan trong issue.
3. Không tự mở rộng scope sang epic/task khác.
4. Nếu yêu cầu mơ hồ hoặc mâu thuẫn với Project Skill, hỏi Product Owner trước khi thay đổi.

Ở giai đoạn E00, repository chưa có application code. Không cài package, tạo database schema hoặc thêm cấu hình CI thuộc E01.

## 2. Branch convention

Tạo branch từ `main`, dùng tên ngắn, chữ thường, kebab-case:

- `feat/<issue>-<short-description>` — tính năng.
- `fix/<issue>-<short-description>` — sửa lỗi.
- `docs/<issue>-<short-description>` — tài liệu.
- `refactor/<issue>-<short-description>` — tái cấu trúc.
- `test/<issue>-<short-description>` — kiểm thử.
- `chore/<issue>-<short-description>` — công việc bảo trì.

Ví dụ: `docs/2-repo-governance`.

Không commit trực tiếp lên `main`. Không force-push branch dùng chung. Nếu cần cập nhật branch, dùng merge/rebase an toàn theo hướng dẫn của maintainer và không viết lại lịch sử đã được chia sẻ nếu chưa thống nhất.

## 3. Commit convention

Dùng Conventional Commits:

```text
<type>(<scope>): <short imperative summary>
```

Types thường dùng: `feat`, `fix`, `docs`, `refactor`, `test`, `chore`, `build`, `ci`.

Ví dụ:

- `docs(repo): add contribution guidelines`
- `chore(config): update gitignore`
- `feat(reader): add chapter navigation`

Một commit nên tập trung vào một thay đổi logic. Không đưa secrets, file build hoặc thay đổi ngoài scope vào commit.

## 4. Pull request policy

- Mọi thay đổi vào `main` phải qua pull request; PR nhỏ vẫn cần mô tả mục đích và tác động.
- PR nên liên kết issue, ví dụ `Closes #2` khi issue thực sự hoàn tất.
- Dùng draft khi còn đang làm; chuyển sang ready khi đã tự review và hoàn thành checklist.
- PR phải mô tả scope, cách kiểm chứng, rủi ro, ảnh hưởng dữ liệu/security và các mục chưa làm.
- Không merge khi còn review thread chưa giải quyết hoặc check bắt buộc thất bại.
- Ưu tiên **Squash and merge** để giữ lịch sử `main` gọn; không bật auto-merge nếu chưa có đủ required checks.
- Với thay đổi ảnh hưởng authorization, rights, moderation, upload hoặc dữ liệu nhạy cảm, cần review độc lập trước khi merge khi có reviewer phù hợp.
- Không tự approve PR của chính mình để giả lập independent review. Nếu repository chỉ có một maintainer, ghi rõ limitation này trong PR và yêu cầu review độc lập trước các thay đổi security-sensitive hoặc có rủi ro cao.

## 5. Branch protection cho `main`

Chính sách mong muốn (cần cấu hình trong GitHub Settings → Branches hoặc Rulesets):

1. Áp dụng rule cho branch `main`.
2. Require a pull request before merging.
3. Require conversation resolution.
4. Khi CI được thiết lập ở E01, require các status checks tương ứng (lint, typecheck, tests, build); không khai báo tên check chưa tồn tại.
5. Dismiss stale approvals khi có commit mới sau review.
6. Block force pushes và branch deletion.
7. Không cho bypass rule thường lệ; nếu có emergency bypass phải được Product Owner cho phép và ghi audit trong PR/issue.
8. Approval requirement phải phù hợp số maintainer thực tế: không đặt một required approval khiến repository single-maintainer bị khóa; khi có reviewer độc lập thì yêu cầu ít nhất một approval. Với thay đổi security-sensitive, không bỏ qua independent review chỉ vì rule kỹ thuật chưa enforce được.

**Lưu ý trạng thái:** công cụ GitHub hiện dùng trong phiên này cho phép đọc repo/branch và thao tác file/PR, nhưng không cung cấp thao tác đọc/cập nhật branch protection/ruleset. Vì vậy tài liệu này chốt policy đề xuất; trạng thái enforcement thực tế trên GitHub vẫn cần owner xác nhận trong Settings. Không tuyên bố branch protection đã bật nếu chưa kiểm chứng.

## 6. Checks và chất lượng

Hiện chưa có app hoặc CI nên chưa có lệnh kiểm thử ứng dụng. Khi E01 thiết lập tooling, PR phải chạy checks đã được cấu hình và README phải ghi đúng lệnh/phiên bản thực tế.

Trước khi gửi PR:

- [ ] Đã đọc issue và không vượt scope.
- [ ] Nội dung/đường dẫn/ảnh không vi phạm quyền sử dụng.
- [ ] Không có secret hoặc dữ liệu cá nhân trong diff.
- [ ] README/docs cập nhật nếu hành vi hoặc quy trình thay đổi.
- [ ] Test phù hợp đã chạy; ghi rõ nếu không có test hoặc không thể chạy.
- [ ] Đã xem lại toàn bộ diff và xử lý comment.
- [ ] Acceptance criteria có bằng chứng kiểm chứng.

## 7. Security và dữ liệu

- Secrets chỉ được lưu trong secret manager/environment phù hợp, không commit vào Git.
- File mẫu chỉ chứa placeholder, ví dụ `.env.example`; không chứa credential thật.
- Không tin dữ liệu client để quyết định authorization.
- Không đưa nội dung chưa xác minh quyền lên public.
- Không chạy migration phá hủy, reset DB, force push hoặc deploy production nếu chưa có phê duyệt rõ ràng.

## 8. Merge và hoàn tất

Chỉ merge khi acceptance criteria đạt, review/checks phù hợp đã hoàn tất và không còn blocker quan trọng. Sau merge, cập nhật issue bằng bằng chứng (PR, checks, tài liệu) và đóng issue khi thực sự đạt Definition of Done.
