import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Globe2, Info } from "lucide-react";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import CountriesDirectory from "@/components/countries/CountriesDirectory";
import CountryCard from "@/components/countries/CountryCard";
import { countries, jobs } from "@/data";
import { countrySampleJobs } from "@/lib/country-presentation";
import { siteConfig } from "@/config/site";
import styles from "@/components/countries/Countries.module.css";

const description = `Explore A-One's ${countries.length} confirmed recruitment destinations across Asia, the Middle East and Europe. Discover recruitment fields and clearly labelled sample job listings.`;
export const metadata: Metadata = {
  title: { absolute: `Recruitment Destinations | ${siteConfig.name}` },
  description,
  alternates: { canonical: "/countries" },
  openGraph: { title: `Recruitment Destinations | ${siteConfig.name}`, description, url: `${siteConfig.url}/countries` },
};

export default function CountriesPage() {
  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <div className="container-padded">
          <Breadcrumbs items={[{ label: "Countries" }]} className={styles.breadcrumbs} />
          <div className={styles.directoryHero}>
            <div className={styles.heroCopy}>
              <p className={styles.eyebrow}>Global Recruitment Destinations</p>
              <h1>Explore opportunities<br /><span>around the world.</span></h1>
              <p>Discover A-One’s international recruitment markets. Explore the destinations, get to know the recruitment fields, and find your way to the sample roles.</p>
            </div>
            <div className={styles.heroGlobe} aria-hidden="true"><Globe2 strokeWidth={.6} /><span>Sri Lankan talent. International horizons.</span></div>
          </div>
          <p className={styles.heroFootnote}>{countries.length} confirmed recruitment destinations<span>For candidates & international employers</span></p>
        </div>
      </header>
      <div className={`container-padded ${styles.content}`}>
        <div className={styles.notice}><Info size={20} aria-hidden="true" /><p><strong>Recruitment markets, not a guarantee of live vacancies.</strong> Listings shown here are fictional development samples. Counts include expired examples and do not represent currently open or verified job offers.</p></div>
        <CountriesDirectory countries={countries} cards={countries.map((country) => <CountryCard key={country.slug} country={country} sampleCount={countrySampleJobs(jobs, country.slug).length} />)} />
        <section className={styles.employer} aria-labelledby="directory-employer-heading">
          <div><p className={styles.eyebrow}>For international employers</p><h2 id="directory-employer-heading">Looking for Sri Lankan talent?</h2><p>Explore A-One’s employer services and share your workforce requirements with the team.</p></div>
          <div className={styles.ctaActions}><Link href="/employers" className={styles.primary}>Explore employer services <ArrowUpRight size={18} aria-hidden="true" /></Link><Link href="/employers/request-manpower" className={styles.lightLink}>Request Manpower <ArrowUpRight size={17} aria-hidden="true" /></Link></div>
        </section>
      </div>
    </div>
  );
}
