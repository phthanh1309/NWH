import Link from "next/link";

import { NavLinks } from "./nav-links";
import styles from "./app-header.module.css";

export function AppHeader() {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Link className={styles.brand} href="/">
          Nova Wave Hub
        </Link>

        <form className={styles.search} role="search" action="/tim-kiem" method="get">
          <label className="visually-hidden" htmlFor="site-search">
            Tìm truyện
          </label>
          <input
            autoComplete="off"
            className={styles.searchInput}
            id="site-search"
            name="q"
            placeholder="Tìm truyện, tác giả…"
            type="search"
          />
          <button className={styles.searchButton} type="submit">
            Tìm
          </button>
        </form>

        <div className={styles.actions}>
          <nav aria-label="Điều hướng chính" className={styles.primaryNav}>
            <NavLinks />
          </nav>
          <Link className={styles.account} href="/tai-khoan">
            Tài khoản
          </Link>
        </div>
      </div>
    </header>
  );
}
