"use client";

import { useRef, useState, type ReactNode } from "react";
import { ArrowUpRight, Globe2, Search, X } from "lucide-react";
import type { Country } from "@/types";
import { filterCountries } from "@/lib/country-presentation";
import styles from "./Countries.module.css";

// Cards are composed on the server; this small client boundary only filters them.
export default function CountriesDirectory({ countries, cards }: { countries: Country[]; cards: ReactNode[] }) {
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("");
  const searchInput = useRef<HTMLInputElement>(null);
  const regions = Array.from(new Set(countries.map((country) => country.region)));
  const matches = new Set(filterCountries(countries, search, region).map((country) => country.slug));
  const reset = () => { setSearch(""); setRegion(""); searchInput.current?.focus(); };

  return (
    <section className={styles.directory} aria-labelledby="destinations-heading">
      <div className={styles.sectionHeading}>
        <div><p className={styles.eyebrow}>Find your destination</p><h2 id="destinations-heading">A world of possibilities.</h2></div>
        <p>Explore our recruitment markets, then review the sample roles.</p>
      </div>
      <form role="search" aria-label="Find a recruitment country" className={styles.filters} onSubmit={(event) => event.preventDefault()}>
        <div><label htmlFor="country-search">Search countries</label><div className={styles.searchInput}><Search size={18} aria-hidden="true" /><input ref={searchInput} id="country-search" type="search" autoComplete="off" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Country name, e.g. UAE or Malaysia" aria-controls="country-results" /></div></div>
        <div><label htmlFor="country-region">Region</label><select id="country-region" value={region} onChange={(event) => setRegion(event.target.value)} aria-controls="country-results"><option value="">All regions</option>{regions.map((name) => <option key={name} value={name}>{name}</option>)}</select></div>
        <button type="button" className={styles.reset} onClick={reset} disabled={!search && !region}><X size={16} aria-hidden="true" />Clear filters</button>
      </form>
      <div className={styles.resultsBar}>
        <p role="status" aria-live="polite" aria-atomic="true"><strong>{matches.size}</strong> of {countries.length} destinations{region && ` · ${region}`}</p>
        <p>Cross-region destinations also appear in matching regions.</p>
      </div>
      <div id="country-results">
        {matches.size ? (
          <div className={styles.countryGrid}>{countries.map((country, index) => matches.has(country.slug) ? <div key={country.slug}>{cards[index]}</div> : null)}</div>
        ) : (
          <div className={styles.empty}>
            <Globe2 size={36} strokeWidth={1.3} aria-hidden="true" />
            <h3>No matching destinations</h3>
            <p>Try another country name or change the region. Clear the filters to explore all {countries.length} recruitment markets.</p>
            <button type="button" onClick={reset} className={styles.primary}>Show all countries <ArrowUpRight size={18} aria-hidden="true" /></button>
          </div>
        )}
      </div>
    </section>
  );
}
