import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowUpRight, BriefcaseBusiness, Globe2 } from "lucide-react";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import CategoryCard from "@/components/categories/CategoryCard";
import { CategoryEmployerCTA, CategorySampleNotice } from "@/components/categories/CategorySupport";
import SampleJobListings from "@/components/jobs/SampleJobListings";
import { countries, jobCategories, jobs } from "@/data";
import { categorySampleCountries, categorySampleJobs, relatedCategories } from "@/lib/category-presentation";
import { CategoryIcon } from "@/lib/category-icons";
import { siteConfig } from "@/config/site";
import styles from "@/components/categories/Categories.module.css";

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return jobCategories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = jobCategories.find((item) => item.slug === slug);
  if (!category) return {};
  const title = `${category.name} ${category.agencyConfirmed ? "Recruitment Field" : "Demo Job Category"} | ${siteConfig.name}`;
  const description = category.agencyConfirmed
    ? `Explore ${category.name}, an A-One agency-confirmed recruitment field. Review fictional sample jobs and destinations where listed. Salary and age criteria are illustrative.`
    : `Explore ${category.name}, a demonstration job category retained for sample listings and existing links. It is not currently an A-One agency-confirmed recruitment field.`;
  return {
    title: { absolute: title }, description,
    alternates: { canonical: `/job-categories/${category.slug}` },
    openGraph: { title, description, url: `${siteConfig.url}/job-categories/${category.slug}` },
  };
}

export default async function CategoryDetailPage({ params }: Props) {
  const { slug } = await params;
  const category = jobCategories.find((item) => item.slug === slug);
  if (!category) notFound();
  const sampleJobs = categorySampleJobs(jobs, category.slug);
  const destinations = categorySampleCountries(countries, sampleJobs);
  const related = relatedCategories(jobCategories, category);
  const jobsHref = `/jobs?category=${category.slug}`;

  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <div className="container-padded">
          <Breadcrumbs items={[{ label: "Job Categories", href: "/job-categories" }, { label: category.name }]} className={styles.breadcrumbs} />
          <div className={styles.detailHero}>
            <div className={styles.heroCopy}>
              <p className={styles.eyebrow}>{category.agencyConfirmed ? "Agency-confirmed recruitment field" : "Demo job category"}</p>
              <div className={styles.categoryIdentity}><span className={styles.heroIcon}><CategoryIcon name={category.icon} size={34} strokeWidth={1.4} aria-hidden="true" /></span><h1>{category.name}</h1></div>
              <p>{category.agencyConfirmed ? "Explore this recruitment field and review the sample roles and destinations represented in the directory." : "Explore this demonstration category, retained for sample vacancy data and existing links. It is not currently among A-One’s agency-confirmed recruitment fields."}</p>
              <div className={styles.heroActions}><Link href={jobsHref} className={styles.primary}>View All {category.name} Jobs <ArrowUpRight size={18} aria-hidden="true" /></Link><p>{sampleJobs.length} sample {sampleJobs.length === 1 ? "job" : "jobs"} · not live offers</p></div>
            </div>
          </div>
        </div>
      </header>
      <div className={`container-padded ${styles.content}`}>
        <CategorySampleNotice />
        <section className={styles.overview} aria-labelledby="category-overview-heading">
          <div><p className={styles.eyebrow}>{category.agencyConfirmed ? "The recruitment field" : "The demonstration category"}</p><h2 id="category-overview-heading">About {category.name}</h2><p className={styles.bodyCopy}>{category.description}</p></div>
          <div className={styles.overviewGuide}><h3>Start with the role details.</h3><p>Review each sample role’s responsibilities, requirements and closing date. Contact A-One for current recruitment information and confirmed employment terms.</p><Link href="/how-it-works" className={styles.textLink}>How recruitment works <ArrowUpRight size={17} aria-hidden="true" /></Link></div>
        </section>

        {destinations.length > 0 && <section className={styles.destinations} aria-labelledby="category-destinations-heading">
          <div><h2 id="category-destinations-heading">Destinations in these sample jobs</h2><p>Locations represented in the demonstration listings, not a statement of current hiring activity.</p></div>
          <ul>{destinations.map((country) => <li key={country.slug}><Link href={`/countries/${country.slug}`}><Globe2 size={16} aria-hidden="true" />{country.name}<ArrowUpRight size={16} aria-hidden="true" /></Link></li>)}</ul>
        </section>}

        <section className={styles.vacancies} aria-labelledby="category-jobs-heading">
          <div className={styles.sectionHeading}><div><p className={styles.eyebrow}>Explore the sample roles</p><h2 id="category-jobs-heading">Sample jobs in {category.name}</h2></div><span className={styles.countBadge}>{sampleJobs.length} sample {sampleJobs.length === 1 ? "job" : "jobs"}</span></div>
          {sampleJobs.length > 0 ? <>
            <p className={styles.sectionIntro}>Fictional listings for the website preview. Expired examples remain visible and are labelled Closed; closed roles cannot accept applications.</p>
            <SampleJobListings jobs={sampleJobs} className={styles.jobGrid} />
            <div className={styles.listingActions}><Link href={jobsHref} className={styles.primary}>View All {category.name} Jobs <ArrowUpRight size={18} aria-hidden="true" /></Link><Link href="/jobs" className={styles.textLink}>Browse All Jobs <ArrowUpRight size={17} aria-hidden="true" /></Link></div>
          </> : <div className={styles.empty}>
            <BriefcaseBusiness size={36} strokeWidth={1.3} aria-hidden="true" /><h3>No sample jobs listed yet</h3><p>{category.agencyConfirmed ? `${category.name} is an agency-confirmed recruitment field, but no demonstration jobs are currently listed here.` : "This demonstration category is retained for existing links. No sample jobs are currently listed here."} Explore other fields or contact A-One for current recruitment information.</p>
            <div className={styles.emptyActions}><Link href="/jobs" className={styles.primary}>Browse All Jobs <ArrowUpRight size={18} aria-hidden="true" /></Link><Link href="/job-categories" className={styles.textLink}>Explore Other Fields</Link><Link href="/countries" className={styles.textLink}>Explore Countries</Link><Link href="/contact" className={styles.textLink}>Contact A-One</Link></div>
          </div>}
        </section>
        <CategoryEmployerCTA confirmed={category.agencyConfirmed} />
        <section className={styles.related} aria-labelledby="related-fields-heading">
          <div className={styles.sectionHeading}><div><p className={styles.eyebrow}>Keep exploring</p><h2 id="related-fields-heading">Explore other recruitment fields</h2></div><Link href="/job-categories" className={styles.textLink}>All recruitment fields <ArrowUpRight size={17} aria-hidden="true" /></Link></div>
          <div className={styles.grid}>{related.map((item) => <CategoryCard key={item.slug} category={item} compact />)}</div>
        </section>
      </div>
    </div>
  );
}
