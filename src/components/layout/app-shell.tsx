import type { ReactNode } from "react";

import { AppFooter } from "./app-footer";
import { AppHeader } from "./app-header";
import { BottomNav } from "./bottom-nav";
import styles from "./app-shell.module.css";

type AppShellProps = {
  children: ReactNode;
};

/**
 * Public application shell from E00-04 §3.1: header, centered main
 * content, footer. Mobile adds a bottom navigation bar.
 *
 * Reader and Admin/Creator workspaces may use a different shell when
 * their epic lands; this one targets the public reading experience.
 */
export function AppShell({ children }: AppShellProps) {
  return (
    <div className={styles.shell}>
      <a className="skip-link" href="#main-content">
        Bỏ qua điều hướng
      </a>
      <AppHeader />
      <main id="main-content" className={`container ${styles.main}`} tabIndex={-1}>
        {children}
      </main>
      <AppFooter />
      <BottomNav />
    </div>
  );
}
