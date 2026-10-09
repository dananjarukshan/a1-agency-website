import Link from "next/link";
import { ArrowUpRight, Info } from "lucide-react";
import styles from "./Categories.module.css";

export function CategorySampleNotice() {
  return <div className={styles.notice}><Info size={20} aria-hidden="true" /><p><strong>Demonstration listings, not verified live offers.</strong> Sample jobs are fictional development content. LKR salaries and age criteria are illustrative; vacancy conditions are not confirmed live employer terms. Listing counts include expired examples.</p></div>;
}

export function CategoryEmployerCTA({ confirmed = true }: { confirmed?: boolean }) {
  return (
    <section className={styles.employer} aria-labelledby="category-employer-heading">
      <div><p className={styles.eyebrow}>For international employers</p><h2 id="category-employer-heading">{confirmed ? "Looking for Sri Lankan talent?" : "Discuss your recruitment requirements."}</h2><p>Explore A-One’s employer services and share the roles, skills and workforce requirements you would like to discuss.</p></div>
      <div className={styles.ctaActions}><Link href="/employers" className={styles.primary}>For Employers <ArrowUpRight size={18} aria-hidden="true" /></Link><Link href="/employers/request-manpower" className={styles.lightLink}>Request Manpower <ArrowUpRight size={17} aria-hidden="true" /></Link></div>
    </section>
  );
}
