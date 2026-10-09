import Link from "next/link";
import { ArrowUpRight, Globe2 } from "lucide-react";
import type { JobCategory } from "@/types";
import { CategoryIcon } from "@/lib/category-icons";
import styles from "./Categories.module.css";

export default function CategoryCard({ category, sampleCount = 0, destinationCount = 0, compact = false }: {
  category: JobCategory; sampleCount?: number; destinationCount?: number; compact?: boolean;
}) {
  return (
    <article className={`${styles.card} ${compact ? styles.compactCard : ""}`} aria-labelledby={`category-${category.slug}`}>
      <div className={styles.cardTop}>
        <span className={styles.cardIcon}><CategoryIcon name={category.icon} size={27} strokeWidth={1.5} aria-hidden="true" /></span>
        <p>{category.agencyConfirmed ? "Recruitment field" : "Demo job category"}</p>
      </div>
      <h3 id={`category-${category.slug}`}>{category.name}</h3>
      <p className={styles.description}>{category.description}</p>
      {!compact && <div className={styles.cardFacts}>
        <p>{sampleCount ? `${sampleCount} sample ${sampleCount === 1 ? "job" : "jobs"}` : "No sample jobs listed yet"}</p>
        {destinationCount > 0 && <p><Globe2 size={15} aria-hidden="true" />{destinationCount} {destinationCount === 1 ? "destination" : "destinations"} in sample jobs</p>}
      </div>}
      <Link href={`/job-categories/${category.slug}`} className={styles.cardLink} aria-label={`Explore ${category.agencyConfirmed ? "Field" : "Sample Category"}: ${category.name}`}>
        {category.agencyConfirmed ? "Explore Field" : "Explore Sample Category"}<ArrowUpRight size={18} aria-hidden="true" />
      </Link>
    </article>
  );
}
