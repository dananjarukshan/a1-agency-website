import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowUpRight, BriefcaseBusiness, Compass, Info } from "lucide-react";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import CountryCard from "@/components/countries/CountryCard";
import CountryVisual from "@/components/countries/CountryVisual";
import CountryJobListings from "@/components/countries/CountryJobListings";
import { countries, jobs, jobCategories } from "@/data";
import { countryCategoryHref, countrySampleJobs, relatedCountries } from "@/lib/country-presentation";
import { siteConfig } from "@/config/site";
import { featuredCountryImageAlt } from "@/config/featured-countries";
import styles from "@/components/countries/Countries.module.css";

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return countries.map((country) => ({ slug: country.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const country = countries.find((item) => item.slug === slug);
  if (!country) return {};
  const title = `${country.name} Recruitment Destination | ${siteConfig.name}`;
  const description = `Explore ${country.name}, one of A-One's recruitment markets in ${country.region}. Review recruitment fields and fictional sample listings, where available.`;
  return {
    title: { absolute: title }, description,
    alternates: { canonical: `/countries/${country.slug}` },
    openGraph: {
      title, description, url: `${siteConfig.url}/countries/${country.slug}`,
      ...(featuredCountryImageAlt[country.slug] ? { images: [{ url: country.image, alt: featuredCountryImageAlt[country.slug] }] } : {}),
    },
  };
}

export default async function CountryPage({ params }: Props) {
  const { slug } = await params;
  const country = countries.find((item) => item.slug === slug);
  if (!country) notFound();
  const countryJobs = countrySampleJobs(jobs, country.slug);
  const related = relatedCountries(countries, country);
  const jobsHref = `/jobs?country=${country.slug}`;

  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <div className="container-padded">
          <Breadcrumbs items={[{ label: "Countries", href: "/countries" }, { label: country.name }]} className={styles.breadcrumbs} />
          <div className={styles.detailHero}>
            <div className={styles.heroCopy}>
              <p className={styles.eyebrow}>Explore a recruitment destination</p>
              <p className={styles.countryIdentity}><span aria-hidden="true">{country.flag}</span>{country.region}</p>
              <h1>{country.name}</h1>
              <p>Explore this A-One recruitment market, its recruitment fields and the sample roles listed for {country.shortName ?? country.name}.</p>
              <div className={styles.heroActions}><Link href={jobsHref} className={styles.primary}>Browse country jobs <ArrowUpRight size={18} aria-hidden="true" /><span className="sr-only"> in {country.name}</span></Link><span>{countryJobs.length ? `${countryJobs.length} sample ${countryJobs.length === 1 ? "listing" : "listings"} · not live offers` : "Recruitment market · no sample listings"}</span></div>
            </div>
            <CountryVisual country={country} hero />
          </div>
        </div>
      </header>

      <div className={`container-padded ${styles.content}`}>
        <div className={styles.notice}><Info size={20} aria-hidden="true" /><p><strong>Explore with clarity.</strong> A recruitment market does not guarantee a current vacancy. All job listings here are fictional development samples; salaries in LKR and age criteria are illustrative.</p></div>
        <div className={styles.overviewLayout}>
          <section className={styles.overview} aria-labelledby="country-overview-heading">
            <p className={styles.eyebrow}>Get to know the destination</p><h2 id="country-overview-heading">Recruitment in {country.shortName ?? country.name}</h2>
            <p className={styles.bodyCopy}>{country.summary}</p>
            <div className={styles.fields}>
              <h3>Recruitment fields</h3><p>These fields describe the market. They do not indicate currently open vacancies.</p>
              <ul>{country.popularCategories.map((label) => {
                const href = countryCategoryHref(label, jobCategories);
                return <li key={label}>{href ? <Link href={href}>{label}<ArrowUpRight size={15} aria-hidden="true" /></Link> : <span>{label}</span>}</li>;
              })}</ul>
            </div>
          </section>
          <aside className={styles.guidance} aria-labelledby="guidance-heading">
            <Compass size={28} strokeWidth={1.3} aria-hidden="true" /><p className={styles.eyebrow}>Plan your next step</p><h2 id="guidance-heading">Every role has its own requirements.</h2>
            <p>Eligibility, documentation, visa arrangements and employment conditions depend on the specific role and verified official requirements. Confirm the details with A-One before making plans.</p>
            <Link href="/how-it-works" className={styles.textLink}>How recruitment works <ArrowUpRight size={17} aria-hidden="true" /></Link><Link href="/contact" className={styles.textLink}>Contact A-One <ArrowUpRight size={17} aria-hidden="true" /></Link>
          </aside>
        </div>

        <section className={styles.vacancies} aria-labelledby="country-jobs-heading">
          <div className={styles.sectionHeading}><div><p className={styles.eyebrow}>Explore the sample roles</p><h2 id="country-jobs-heading">Sample listings in {country.shortName ?? country.name}</h2></div><span className={styles.listingCount}>{countryJobs.length} sample {countryJobs.length === 1 ? "listing" : "listings"}</span></div>
          {countryJobs.length > 0 ? <>
            <p className={styles.sectionIntro}>Fictional listings for the website preview. Expired examples remain visible and are labelled Closed; closed roles cannot accept applications.</p>
            <CountryJobListings jobs={countryJobs} />
            <div className={styles.listingActions}><Link href={jobsHref} className={styles.primary}>Browse all jobs in {country.shortName ?? country.name} <ArrowUpRight size={18} aria-hidden="true" /></Link><Link href="/countries" className={styles.textLink}>Explore other countries <ArrowUpRight size={17} aria-hidden="true" /></Link></div>
          </> : <div className={styles.empty}>
            <BriefcaseBusiness size={36} strokeWidth={1.3} aria-hidden="true" /><h3>No sample vacancies listed yet</h3>
            <p>{country.name} is an A-One recruitment market. There are currently no demonstration job listings for this country. Contact the team to discuss current recruitment information.</p>
            <div className={styles.emptyActions}><Link href="/jobs" className={styles.primary}>Browse All Jobs <ArrowUpRight size={18} aria-hidden="true" /></Link><Link href="/countries" className={styles.textLink}>Other Countries</Link><Link href="/contact" className={styles.textLink}>Contact A-One</Link></div>
          </div>}
        </section>

        <section className={styles.employer} aria-labelledby="country-employer-heading">
          <div><p className={styles.eyebrow}>For international employers</p><h2 id="country-employer-heading">Build your team with Sri Lankan talent.</h2><p>Discover A-One’s employer services and share the roles, skills and workforce requirements you would like to discuss.</p></div>
          <div className={styles.ctaActions}><Link href="/employers" className={styles.primary}>For Employers <ArrowUpRight size={18} aria-hidden="true" /></Link><Link href="/employers/request-manpower" className={styles.lightLink}>Request Manpower <ArrowUpRight size={17} aria-hidden="true" /></Link></div>
        </section>

        <section className={styles.related} aria-labelledby="related-destinations-heading">
          <div className={styles.sectionHeading}><div><p className={styles.eyebrow}>Continue your journey</p><h2 id="related-destinations-heading">Explore other destinations</h2></div><Link href="/countries" className={styles.textLink}>All countries <ArrowUpRight size={17} aria-hidden="true" /></Link></div>
          <div className={styles.countryGrid}>{related.map((item) => <CountryCard key={item.slug} country={item} sampleCount={countrySampleJobs(jobs, item.slug).length} />)}</div>
        </section>
      </div>
    </div>
  );
}
