import type { ReactNode } from "react";
import styles from "./EmployerCTA.module.css";

export default function EmployerShowcaseScene({ children }: { children: ReactNode }) {
  return (
    <section className={styles.section} aria-labelledby="employer-cta-heading">
      <div className={styles.scene}>
        <div className={styles.background} aria-hidden="true" />
        <div className={`container-padded ${styles.composition}`}>
          <div className={styles.panel}>{children}</div>
        </div>
      </div>
    </section>
  );
}
