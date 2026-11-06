"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import styles from "./nav-links.module.css";

type NavVariant = "header" | "bottom";

type NavItem = {
  href: string;
  label: string;
};

/**
 * Primary areas from E00-04 (catalog, library, account).
 * Routes are placeholders until E02/E03 ship the corresponding pages.
 */
const NAV_ITEMS: NavItem[] = [
  { href: "/", label: "Trang chủ" },
  { href: "/kham-pha", label: "Khám phá" },
  { href: "/thu-vien", label: "Thư viện" },
  { href: "/tai-khoan", label: "Tài khoản" },
];

type NavLinksProps = {
  variant?: NavVariant;
};

function isCurrentPath(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function NavLinks({ variant = "header" }: NavLinksProps) {
  const pathname = usePathname();

  return (
    <ul className={styles.list} data-variant={variant} role="list">
      {NAV_ITEMS.map((item) => (
        <li key={item.href}>
          <Link
            className={styles.link}
            href={item.href}
            aria-current={isCurrentPath(pathname, item.href) ? "page" : undefined}
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
