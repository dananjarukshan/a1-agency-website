"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BriefcaseBusiness } from "lucide-react";
import type { FeaturedCountry } from "./FeaturedCountries";
import styles from "./FeaturedCountries.module.css";

type Props = {
  countries: FeaturedCountry[];
};

type CountryPresentationProps = {
  country: FeaturedCountry;
};

function CountryPresentation({ country }: CountryPresentationProps) {
  const vacancyLabel =
    country.activeVacancyCount > 0
      ? `${country.activeVacancyCount} sample ${country.activeVacancyCount === 1 ? "vacancy" : "vacancies"}`
      : "Recruiting market";

  return (
    <div id="featured-country-panel" className={styles.presentation} aria-live="polite">
      <div className={styles.visual}>
        <Image
          className={styles.visualImage}
          src={country.image}
          alt={`Abstract placeholder visual for the ${country.name} recruitment market`}
          fill
          sizes="(max-width: 767px) 100vw, 50vw"
        />
        <div className={styles.visualIdentity}>
          <span className={styles.flag} aria-hidden="true">{country.flag}</span>
          <span className={styles.visualName}>{country.name}</span>
        </div>
      </div>

      <div className={styles.content}>
        <p className={styles.marketLabel}>International recruitment market</p>
        <h3 className={styles.countryName}>{country.name}</h3>
        <p className={styles.summary}>{country.summary}</p>

        <div className={styles.categories}>
          <p className={styles.categoriesLabel}>Common recruitment fields</p>
          <ul className={styles.categoryList}>
            {country.popularCategories.map((category) => (
              <li key={category}>{category}</li>
            ))}
          </ul>
        </div>

        <div className={styles.actions}>
          <div className={styles.vacancyStatus}>
            <BriefcaseBusiness size={17} aria-hidden="true" />
            <span>{vacancyLabel}</span>
          </div>
          <Link className={styles.cta} href={`/countries/${country.slug}`}>
            View Opportunities
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}

type CountrySelectorProps = {
  countries: FeaturedCountry[];
  activeSlug: string;
  onSelect: (slug: string) => void;
};

function CountrySelector({ countries, activeSlug, onSelect }: CountrySelectorProps) {
  return (
    <div className={styles.selector} aria-label="Choose a featured country">
      {countries.map((country) => {
        const isActive = country.slug === activeSlug;

        return (
          <button
            key={country.slug}
            type="button"
            className={styles.selectorButton}
            aria-pressed={isActive}
            aria-controls="featured-country-panel"
            onClick={() => onSelect(country.slug)}
          >
            <span aria-hidden="true">{country.flag}</span>
            <span>{country.shortName ?? country.name}</span>
          </button>
        );
      })}
    </div>
  );
}

export default function FeaturedCountriesClient({ countries }: Props) {
  const [activeSlug, setActiveSlug] = useState(countries[0]?.slug ?? "");
  const activeCountry =
    countries.find((country) => country.slug === activeSlug) ?? countries[0];

  if (!activeCountry) return null;

  return (
    <div className={styles.explorer}>
      <CountryPresentation country={activeCountry} />
      <CountrySelector
        countries={countries}
        activeSlug={activeCountry.slug}
        onSelect={setActiveSlug}
      />
    </div>
  );
}
