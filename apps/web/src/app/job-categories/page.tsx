import type { Metadata } from "next";
import { ArrowUpRight, BriefcaseBusiness } from "lucide-react";
import Link from "next/link";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import CategoryCard from "@/components/categories/CategoryCard";
import CategoryDirectory from "@/components/categories/CategoryDirectory";
import { CategoryEmployerCTA, CategorySampleNotice } from "@/components/categories/CategorySupport";
import { countries, jobCategories, jobs, recruitmentFields } from "@/data";
import { categorySampleCountries, categorySampleJobs } from "@/lib/category-presentation";
import { siteConfig } from "@/config/site";
import styles from "@/components/categories/Categories.module.css";

const description = `Explore A-One's ${recruitmentFields.length} agency-confirmed recruitment fields and a separate directory of demonstration job categories. Review sample roles, illustrative LKR salaries and destinations.`;
export const metadata: Metadata = {
  title: { absolute: `Recruitment Fields & Job Categories | ${siteConfig.name}` },
  description,
  alternates: { canonical: "/job-categories" },
  openGraph: { title: `Recruitment Fields | ${siteConfig.name}`, description, url: `${siteConfig.url}/job-categories` },
};

export default function JobCategoriesPage() {
  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <div className="container-padded">
          <Breadcrumbs items={[{ label: "Job Categories" }]} className={styles.breadcrumbs} />
          <div className={styles.directoryHero}>
            <div className={styles.heroCopy}><p className={styles.eyebrow}>Recruitment Fields</p><h1>Explore careers by<br /><span>recruitment field.</span></h1><p>Find your starting point by profession or skill area. Explore A-One’s confirmed recruitment fields, then review the sample roles and destinations.</p></div>
            <div className={styles.heroMark} aria-hidden="true"><BriefcaseBusiness size={120} strokeWidth={.8} /><span>Skills. People. Possibilities.</span></div>
          </div>
          <div className={styles.heroFootnote}><p>{recruitmentFields.length} agency-confirmed recruitment fields</p><Link href="/countries">Prefer to explore by destination? <ArrowUpRight size={16} aria-hidden="true" /></Link></div>
        </div>
      </header>
      <div className={`container-padded ${styles.content}`}>
        <CategorySampleNotice />
        <CategoryDirectory categories={jobCategories.map((category) => {
          const sampleJobs = categorySampleJobs(jobs, category.slug);
          return {
            slug: category.slug, name: category.name, agencyConfirmed: category.agencyConfirmed,
            card: <CategoryCard category={category} sampleCount={sampleJobs.length} destinationCount={categorySampleCountries(countries, sampleJobs).length} compact={!category.agencyConfirmed} />,
          };
        })} />
        <CategoryEmployerCTA />
      </div>
    </div>
  );
}
