import Link from "next/link";
import { ArrowUpRight, BriefcaseBusiness } from "lucide-react";
import type { Country } from "@/types";
import CountryVisual from "./CountryVisual";
import styles from "./Countries.module.css";

export default function CountryCard({ country, sampleCount, headingLevel = 3 }: {
  country: Country; sampleCount: number; headingLevel?: 2 | 3;
}) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  return (
    <article className={styles.card} aria-labelledby={`country-${country.slug}`}>
      <CountryVisual country={country} />
      {country.featured && <span className={styles.featured}>Featured destination</span>}
      <div className={styles.cardBody}>
        <p className={styles.cardRegion}><span aria-hidden="true">{country.flag}</span>{country.region}</p>
        <Heading id={`country-${country.slug}`}>{country.name}</Heading>
        <p className={styles.summary}>{country.summary}</p>
        <div className={styles.cardFields}>
          <p>Recruitment fields</p>
          <ul>{country.popularCategories.map((category) => <li key={category}>{category}</li>)}</ul>
        </div>
        <p className={styles.sampleCount}><BriefcaseBusiness size={16} aria-hidden="true" />
          {sampleCount > 0 ? `${sampleCount} sample ${sampleCount === 1 ? "listing" : "listings"}` : "Recruitment market · no sample listings"}
        </p>
        <Link href={`/countries/${country.slug}`} className={styles.cardLink} aria-label={`Explore Country: ${country.name}`}>
          Explore Country <ArrowUpRight size={18} aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
