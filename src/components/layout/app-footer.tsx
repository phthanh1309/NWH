import Link from "next/link";

import styles from "./app-footer.module.css";

const FOOTER_LINKS = [
  { href: "/gioi-thieu", label: "Giới thiệu" },
  { href: "/dieu-khoan", label: "Điều khoản" },
  { href: "/chinh-sach-noi-dung", label: "Chính sách nội dung" },
  { href: "/lien-he", label: "Liên hệ" },
];

export function AppFooter() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.brandBlock}>
          <p className={styles.brand}>Nova Wave Hub</p>
          <p className={styles.tagline}>
            Nền tảng đọc truyện cộng đồng dành cho độc giả Việt Nam.
          </p>
        </div>

        <nav aria-label="Liên kết chân trang">
          <ul className={styles.links} role="list">
            {FOOTER_LINKS.map((link) => (
              <li key={link.href}>
                <Link className={styles.link} href={link.href}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className={`container ${styles.legal}`}>
        <p>© {new Date().getFullYear()} Nova Wave Hub.</p>
        <p>Chỉ publish nội dung khi quyền sử dụng đã được xác minh.</p>
      </div>
    </footer>
  );
}
