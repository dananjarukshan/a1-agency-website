import Link from "next/link";
import {
  ArrowRight, Car, Coffee, Cog, HardHat, HeartPulse, Hotel,
  House, Landmark, Scissors, Shirt, Sparkles, Sprout, Users,
  type LucideIcon,
} from "lucide-react";
import { recruitmentFields } from "@/data";
import JobCategoryGrid from "./JobCategoryGrid";
import styles from "./JobCategories.module.css";

const iconMap: Record<string, LucideIcon> = {
  Car, Coffee, Cog, HardHat, HeartPulse, Hotel, House,
  Landmark, Scissors, Shirt, Sparkles, Sprout, Users,
};

export default function JobCategories() {
  return (
    <section className={styles.section} aria-labelledby="categories-heading">
      <div className="container-padded">
        <div className={styles.header}>
          <div>
            <p className={styles.eyebrow}>Recruitment expertise</p>
            <h2 id="categories-heading" className={styles.heading}>Fields We Recruit For</h2>
            <p className={styles.description}>
              Connecting Sri Lankan talent with overseas opportunities across a wide range of industries.
            </p>
          </div>
          <Link href="/job-categories" className={styles.directoryLink}>
            View all categories <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </div>

        <JobCategoryGrid>
          {recruitmentFields.map((category) => {
            const Icon = iconMap[category.icon] ?? Users;
            return (
              <li key={category.slug}>
                <Link
                  href={`/job-categories/${category.slug}`}
                  className={styles.tile}
                  aria-label={`Explore ${category.name} opportunities`}
                >
                  <span className={styles.icon}>
                    <Icon size={22} strokeWidth={1.6} aria-hidden="true" />
                  </span>
                  <div className={styles.tileBody}>
                    <h3 className={styles.title}>{category.name}</h3>
                    <span className={styles.tileAction}>
                      View opportunities <ArrowRight size={15} aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              </li>
            );
          })}
        </JobCategoryGrid>
      </div>
    </section>
  );
}
