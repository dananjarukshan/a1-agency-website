import type { Country } from "@/types";
import { countries, jobs } from "@/data";
import { featuredCountrySlugs } from "@/config/featured-countries";
import FeaturedCountriesClient from "./FeaturedCountriesClient";
import styles from "./FeaturedCountries.module.css";

export type FeaturedCountry = Pick<
  Country,
  "id" | "slug" | "name" | "shortName" | "flag" | "summary" | "popularCategories" | "image"
> & {
  activeVacancyCount: number;
};

const featuredCountries: FeaturedCountry[] = featuredCountrySlugs.flatMap((slug) => {
  const country = countries.find((candidate) => candidate.slug === slug && candidate.featured);

  if (!country) return [];

  return [
    {
      id: country.id,
      slug: country.slug,
      name: country.name,
      shortName: country.shortName,
      flag: country.flag,
      summary: country.summary,
      popularCategories: country.popularCategories,
      image: country.image,
      activeVacancyCount: jobs.filter(
        (job) => job.country === country.slug && job.status === "active"
      ).length,
    },
  ];
});

export default function FeaturedCountries() {
  return (
    <section className={styles.section} aria-labelledby="featured-countries-heading">
      <div className="container-padded">
        <header className={styles.header}>
          <p className={styles.eyebrow}>Global Opportunities</p>
          <h2 id="featured-countries-heading" className={styles.heading}>
            Featured Countries
          </h2>
          <p className={styles.description}>
            Explore selected international markets where A-One connects Sri Lankan talent with
            overseas opportunities.
          </p>
        </header>

        <FeaturedCountriesClient countries={featuredCountries} />
      </div>
    </section>
  );
}
