"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { useSearchParams, usePathname } from "next/navigation";
import Link from "next/link";
import * as Dialog from "@radix-ui/react-dialog";
import { ArrowUpRight, Info, Search, SlidersHorizontal, X } from "lucide-react";
import { Breadcrumbs } from "@a1/ui";
import DirectoryJobCard from "./DirectoryJobCard";
import JobFilters from "./JobFilters";
import { jobs, countries, jobCategories } from "@/data";
import { experienceLevels, filterJobs, jobSearchQuery, paginateJobs, parseJobFilters, sortOptions, type JobDirectoryFilters } from "@/lib/job-search";
import styles from "./Jobs.module.css";

export default function JobsPageClient() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const filters = useMemo(() => parseJobFilters(searchParams), [searchParams]);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [now, setNow] = useState(() => new Date());
  const resultsHeading = useRef<HTMLHeadingElement>(null);
  // Refresh date-dependent status on long-lived tabs without changing the catalogue.
  useEffect(() => {
    const initial = setTimeout(() => setNow(new Date()), 0);
    const timer = setInterval(() => setNow(new Date()), 60000);
    return () => { clearTimeout(initial); clearInterval(timer); };
  }, []);
  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    const close = () => { if (media.matches) setMobileOpen(false); };
    media.addEventListener("change", close);
    return () => media.removeEventListener("change", close);
  }, []);
  const filtered = useMemo(() => filterJobs(jobs, filters, now), [filters, now]);
  const pagination = paginateJobs(filtered, filters.page);
  const href = (value: JobDirectoryFilters) => { const query = jobSearchQuery(value); return `${pathname}${query ? `?${query}` : ""}`; };

  // Native history integrates with Next's useSearchParams. The URL remains the
  // source of truth, including Back/Forward; text edits replace rather than flood history.
  const updateFilters = (value: JobDirectoryFilters, replace = false) => {
    const target = href(value);
    if (`${window.location.pathname}${window.location.search}` !== target) {
      if (replace) window.history.replaceState(null, "", target);
      else window.history.pushState(null, "", target);
    }
  };
  useEffect(() => {
    if (searchParams.has("currency") || (searchParams.has("page") && searchParams.get("page") !== String(pagination.page))) {
      const query = jobSearchQuery({ ...filters, page: pagination.page });
      window.history.replaceState(null, "", `${pathname}${query ? `?${query}` : ""}`);
    }
  }, [filters, pagination.page, pathname, searchParams]);

  const chips: { key: keyof JobDirectoryFilters; label: string }[] = [];
  if (filters.keyword) chips.push({ key: "keyword", label: `Keyword: ${filters.keyword}` });
  if (filters.country) chips.push({ key: "country", label: countries.find((country) => country.slug === filters.country)?.shortName ?? countries.find((country) => country.slug === filters.country)?.name ?? filters.country });
  if (filters.category) chips.push({ key: "category", label: jobCategories.find((category) => category.slug === filters.category)?.name ?? filters.category });
  if (filters.salaryMin) chips.push({ key: "salaryMin", label: `Minimum LKR ${filters.salaryMin.toLocaleString("en-US")}` });
  if (filters.experience) chips.push({ key: "experience", label: experienceLevels.find((item) => item.value === filters.experience)?.label ?? filters.experience });
  if (filters.employer) chips.push({ key: "employer", label: filters.employer });
  if (filters.datePosted) chips.push({ key: "datePosted", label: `Past ${filters.datePosted} days` });
  if (filters.featured) chips.push({ key: "featured", label: "Featured" });
  if (filters.closingSoon) chips.push({ key: "closingSoon", label: "Closing soon" });

  return (
    <Dialog.Root open={mobileOpen} onOpenChange={setMobileOpen}>
      <div className={styles.page}>
        <section className={styles.hero} aria-labelledby="jobs-heading"><div className="container-padded">
          <Breadcrumbs items={[{ label: "Jobs" }]} className={styles.breadcrumbs} />
          <div className={styles.heroCopy}><p className={styles.eyebrow}>Overseas opportunities</p><h1 id="jobs-heading">Find your next <span>overseas opportunity.</span></h1><p>Explore overseas vacancies by destination, career field and employment criteria.</p></div>
          <form className={styles.heroSearch} role="search" aria-label="Search jobs" onSubmit={(e) => { e.preventDefault(); updateFilters({ ...filters, page: 1 }); resultsHeading.current?.focus(); }}>
            <div><label htmlFor="hero-keyword">Job title or keyword</label><input id="hero-keyword" value={filters.keyword ?? ""} onChange={(e) => updateFilters({ ...filters, keyword: e.target.value || undefined, page: 1 }, true)} placeholder="What role are you looking for?" /></div>
            <div><label htmlFor="hero-country">Destination</label><select id="hero-country" value={filters.country ?? ""} onChange={(e) => updateFilters({ ...filters, country: e.target.value || undefined, page: 1 })}><option value="">All destinations</option>{countries.map((country) => <option key={country.slug} value={country.slug}>{country.shortName ?? country.name}</option>)}</select></div>
            <button type="submit" className={styles.primary}><Search size={18} aria-hidden="true" />Search Jobs</button>
          </form>
        </div></section>

        <div className={`container-padded ${styles.directory}`}>
          <p className={styles.demoNotice}><Info size={19} aria-hidden="true" /><span><strong>Sample vacancies.</strong> These are fictional development listings, not live job offers. LKR salaries and age criteria are illustrative sample data, not verified employer terms or exchange-rate conversions.</span></p>
          <div className={styles.layout}>
            <JobFilters filters={filters} onChange={updateFilters} totalResults={filtered.length} />
            <section className={styles.results} aria-labelledby="results-heading">
              <div className={styles.toolbar}><div><p className={styles.eyebrow}>Explore the directory</p><h2 id="results-heading" ref={resultsHeading} tabIndex={-1} aria-live="polite">{filtered.length} {filtered.length === 1 ? "opportunity" : "opportunities"}</h2><p className={styles.resultSummary}>Showing {pagination.jobs.length} of {filtered.length} sample vacancies</p></div><div className={styles.tools}><Dialog.Trigger className={styles.mobileTrigger}><SlidersHorizontal size={17} aria-hidden="true" />Filters{chips.length > 0 && <span>{chips.length}</span>}</Dialog.Trigger><div><label htmlFor="job-sort">Sort by</label><select id="job-sort" value={filters.sortBy ?? "latest"} onChange={(e) => updateFilters({ ...filters, sortBy: e.target.value as JobDirectoryFilters["sortBy"], page: 1 })}>{sortOptions.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}</select></div></div></div>
              {chips.length > 0 && <div className={styles.chips} aria-label="Active filters">{chips.map((chip) => <button key={chip.key} type="button" onClick={() => updateFilters({ ...filters, [chip.key]: undefined, page: 1 })} aria-label={`Remove filter: ${chip.label}`}>{chip.label}<X size={14} aria-hidden="true" /></button>)}<button type="button" className={styles.clearAll} onClick={() => updateFilters({})}>Clear All</button></div>}
              {pagination.jobs.length ? <><div className={styles.cardGrid}>{pagination.jobs.map((job) => <DirectoryJobCard key={job.id} job={job} now={now} />)}</div>{pagination.totalPages > 1 && <nav className={styles.pagination} aria-label="Jobs pagination">{pagination.page > 1 ? <Link scroll={false} href={href({ ...filters, page: pagination.page - 1 })}>Previous</Link> : <span aria-disabled="true">Previous</span>}{Array.from({ length: pagination.totalPages }, (_, index) => <Link key={index} scroll={false} href={href({ ...filters, page: index + 1 })} aria-current={pagination.page === index + 1 ? "page" : undefined} aria-label={`Page ${index + 1}`}>{index + 1}</Link>)}{pagination.page < pagination.totalPages ? <Link scroll={false} href={href({ ...filters, page: pagination.page + 1 })}>Next</Link> : <span aria-disabled="true">Next</span>}</nav>}</> : <div className={styles.empty}><Search size={35} aria-hidden="true" /><h3>No matching opportunities found.</h3><p>Try adjusting your destination, career field, salary or other filters.</p><div><button className={styles.primary} onClick={() => updateFilters({})}>Clear Filters</button><Link href="/contact">Contact A-One <ArrowUpRight size={17} aria-hidden="true" /></Link></div></div>}
            </section>
          </div>
          <section className={styles.guidance} aria-labelledby="guidance-heading"><div><p className={styles.eyebrow}>Your next step</p><h2 id="guidance-heading">Not sure which opportunity fits you?</h2><p>Talk with A-One about your skills and the recruitment journey.</p></div><div><Link href="/contact" className={styles.primary}>Contact A-One <ArrowUpRight size={18} aria-hidden="true" /></Link><Link href="/how-it-works" className={styles.secondary}>How Recruitment Works <ArrowUpRight size={16} aria-hidden="true" /></Link></div></section>
        </div>
      </div>
    </Dialog.Root>
  );
}
