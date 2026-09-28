import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown, ArrowRight, BriefcaseBusiness, Car, Coffee, Cog, Globe,
  HardHat, HeartPulse, Hotel, House, Landmark, Scissors, Shirt,
  Sparkles, Sprout, Users, type LucideIcon,
} from "lucide-react";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { countries, recruitmentFields } from "@/data";
import { siteConfig } from "@/config/site";
import fieldStyles from "@/components/home/JobCategories.module.css";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: { absolute: `Overseas Job Opportunities | ${siteConfig.name}` },
  description:
    "Explore overseas opportunities by country and career field with A-One. Discover international recruitment markets and work that matches the skills of Sri Lankan job seekers.",
  alternates: { canonical: "/opportunities" },
};

// Resolve the existing data's icon names using the homepage's Lucide vocabulary.
const fieldIcons: Record<string, LucideIcon> = {
  Car, Coffee, Cog, HardHat, HeartPulse, Hotel, House,
  Landmark, Scissors, Shirt, Sparkles, Sprout, Users,
};

export default function OpportunitiesPage() {
  const recruitingCountries = countries.filter((country) => country.active);

  return (
    <div className={styles.page}>
      <section className={styles.hero} aria-labelledby="opportunities-heading">
        <div className="container-padded">
          <Breadcrumbs items={[{ label: "Opportunities" }]} className={styles.breadcrumbs} />
          <div className={styles.heroContent}>
            <div>
              <p className={styles.eyebrow}>Global opportunities</p>
              <h1 id="opportunities-heading" className={styles.title}>Explore Overseas Opportunities</h1>
              <p className={styles.heroDescription}>
                Discover opportunities by destination or by the type of work that matches your skills and experience.
              </p>
            </div>
            <Link href="/jobs" className={styles.primaryCta}>
              Browse All Jobs <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <div className="container-padded">
        <nav className={styles.choices} aria-label="Ways to explore opportunities">
          <a href="#explore-countries" className={styles.choice}>
            <span className={styles.choiceIcon}><Globe size={25} strokeWidth={1.6} aria-hidden="true" /></span>
            <div>
              <h2 className={styles.choiceHeading}>Explore by Country</h2>
              <p>Choose an international recruitment market and explore relevant opportunities.</p>
              <span className={styles.choiceAction}>Browse countries <ArrowDown size={16} aria-hidden="true" /></span>
            </div>
          </a>
          <a href="#explore-careers" className={styles.choice}>
            <span className={styles.choiceIcon}><BriefcaseBusiness size={25} strokeWidth={1.6} aria-hidden="true" /></span>
            <div>
              <h2 className={styles.choiceHeading}>Explore by Career</h2>
              <p>Explore recruitment fields based on your skills, experience and career interests.</p>
              <span className={styles.choiceAction}>Browse career fields <ArrowDown size={16} aria-hidden="true" /></span>
            </div>
          </a>
        </nav>

        <section className={styles.directory} aria-labelledby="explore-countries">
          <div className={styles.sectionHeader}>
            <p className={styles.sectionEyebrow}>Find your destination</p>
            <h2 id="explore-countries" tabIndex={-1} className={styles.sectionHeading}>Explore by Country</h2>
            <p className={styles.sectionDescription}>Discover the international markets where A-One recruits Sri Lankan talent.</p>
          </div>
          <ul className={styles.grid}>
            {recruitingCountries.map((country) => (
              <li key={country.slug}>
                <Link href={`/countries/${country.slug}`} className={styles.countryCard} aria-label={`Explore opportunities in ${country.name}`}>
                  <span className={styles.countryImage}>
                    <Image src={country.image} alt="" fill sizes="48px" className={styles.thumbnail} />
                  </span>
                  <div className={styles.countryBody}>
                    <h3 className={styles.cardTitle}>{country.name}</h3>
                    <p className={styles.marketStatus}>Recruiting market</p>
                  </div>
                  <span className={styles.cardAction}>View opportunities <ArrowRight size={15} aria-hidden="true" /></span>
                </Link>
              </li>
            ))}
          </ul>
          <div className={styles.directoryFooter}>
            <Link href="/countries" className={styles.directoryLink}>View Country Directory <ArrowRight size={17} aria-hidden="true" /></Link>
          </div>
        </section>

        <section className={styles.directory} aria-labelledby="explore-careers">
          <div className={styles.sectionHeader}>
            <p className={styles.sectionEyebrow}>Find your field</p>
            <h2 id="explore-careers" tabIndex={-1} className={styles.sectionHeading}>Explore by Career</h2>
            <p className={styles.sectionDescription}>Explore our recruitment fields and find work connected to your skills and experience.</p>
          </div>
          <ul className={styles.grid}>
            {recruitmentFields.map((category) => {
              const Icon = fieldIcons[category.icon] ?? Users;
              return (
                <li key={category.slug}>
                  <Link href={`/job-categories/${category.slug}`} className={fieldStyles.tile} aria-label={`Explore ${category.name} opportunities`}>
                    <span className={fieldStyles.icon}><Icon size={22} strokeWidth={1.6} aria-hidden="true" /></span>
                    <div className={fieldStyles.tileBody}>
                      <h3 className={fieldStyles.title}>{category.name}</h3>
                      <span className={fieldStyles.tileAction}>View opportunities <ArrowRight size={15} aria-hidden="true" /></span>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className={styles.directoryFooter}>
            <Link href="/job-categories" className={styles.directoryLink}>View All Job Categories <ArrowRight size={17} aria-hidden="true" /></Link>
          </div>
        </section>

        <section className={styles.finalCta} aria-labelledby="next-opportunity-heading">
          <div>
            <h2 id="next-opportunity-heading">Ready to find your next opportunity?</h2>
            <p>Browse current vacancies or contact A-One if you need guidance.</p>
          </div>
          <div className={styles.ctaActions}>
            <Link href="/jobs" className={styles.primaryCta}>Browse All Jobs <ArrowRight size={18} aria-hidden="true" /></Link>
            <Link href="/contact" className={styles.secondaryCta}>Contact A-One</Link>
          </div>
        </section>
      </div>
    </div>
  );
}
