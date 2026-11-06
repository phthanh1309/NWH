import { NavLinks } from "./nav-links";
import styles from "./bottom-nav.module.css";

/**
 * Mobile navigation per the approved Homepage wireframe (E00-04 §4).
 * E00-04 §17 still lists "bottom navigation vs drawer" as an open UX
 * item; the wireframe explicitly draws a bottom bar, so that is the
 * default until the Product Owner decides otherwise.
 */
export function BottomNav() {
  return (
    <nav aria-label="Điều hướng di động" className={styles.nav}>
      <NavLinks variant="bottom" />
    </nav>
  );
}
