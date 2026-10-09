"use client";

import { useRef, useState, type ReactNode } from "react";
import { ArrowUpRight, Search, X } from "lucide-react";
import type { JobCategory } from "@/types";
import { filterCategories } from "@/lib/category-presentation";
import styles from "./Categories.module.css";

type CategoryEntry = Pick<JobCategory, "slug" | "name" | "agencyConfirmed"> & { card: ReactNode };

/** Server-rendered cards remain outside the search component's client bundle. */
export default function CategoryDirectory({ categories }: { categories: CategoryEntry[] }) {
  const [search, setSearch] = useState("");
  const searchInput = useRef<HTMLInputElement>(null);
  const matches = filterCategories(categories, search);
  const confirmed = matches.filter((category) => category.agencyConfirmed);
  const sample = matches.filter((category) => !category.agencyConfirmed);
  const reset = () => { setSearch(""); searchInput.current?.focus(); };

  return (
    <div className={styles.directory}>
      <form role="search" aria-label="Find a recruitment field" className={styles.search} onSubmit={(event) => event.preventDefault()}>
        <div><label htmlFor="category-search">Search by recruitment field or category</label><div className={styles.searchInput}><Search size={18} aria-hidden="true" /><input ref={searchInput} id="category-search" type="search" autoComplete="off" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="e.g. Hospitality, Driving or Healthcare" aria-controls="category-results" /></div></div>
        <button type="button" className={styles.reset} onClick={reset} disabled={!search}><X size={16} aria-hidden="true" />Clear search</button>
      </form>
      <p className={styles.resultCount} role="status" aria-live="polite" aria-atomic="true"><strong>{matches.length}</strong> of {categories.length} categories · {confirmed.length} confirmed fields · {sample.length} sample categories</p>
      <div id="category-results">
        {matches.length === 0 ? <section className={styles.empty} aria-labelledby="no-category-results">
          <Search size={34} strokeWidth={1.4} aria-hidden="true" /><h2 id="no-category-results">No matching recruitment fields</h2><p>Try another field or category name, or clear your search to explore the full directory.</p><button type="button" className={styles.primary} onClick={reset}>Show all categories <ArrowUpRight size={18} aria-hidden="true" /></button>
        </section> : <>
          <section aria-labelledby="confirmed-fields-heading">
            <div className={styles.sectionHeading}><div><p className={styles.eyebrow}>A-One recruitment expertise</p><h2 id="confirmed-fields-heading">Our confirmed recruitment fields</h2></div><span className={styles.countBadge}>{confirmed.length} {confirmed.length === 1 ? "field" : "fields"}</span></div>
            <p className={styles.sectionIntro}>Agency-confirmed fields for candidates and international employers. Sample job availability varies by field.</p>
            {confirmed.length ? <div className={styles.grid}>{confirmed.map((category) => <div key={category.slug}>{category.card}</div>)}</div> : <p className={styles.noGroupMatches}>No confirmed fields match this search. Matching demonstration categories are shown below.</p>}
          </section>
          <section className={styles.legacySection} aria-labelledby="sample-categories-heading">
            <div className={styles.sectionHeading}><div><p className={styles.eyebrow}>Demonstration directory</p><h2 id="sample-categories-heading">Additional Sample Job Categories</h2></div><span className={styles.countBadge}>{sample.length} sample {sample.length === 1 ? "category" : "categories"}</span></div>
            <p className={styles.sectionIntro}>These legacy categories are retained for demonstration vacancy data and existing links. They are not currently among A-One’s agency-confirmed recruitment fields.</p>
            {sample.length ? <div className={styles.legacyGrid}>{sample.map((category) => <div key={category.slug}>{category.card}</div>)}</div> : <p className={styles.noGroupMatches}>No additional sample categories match this search.</p>}
          </section>
        </>}
      </div>
    </div>
  );
}
