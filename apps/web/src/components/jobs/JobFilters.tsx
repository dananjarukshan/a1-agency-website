"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { X, SlidersHorizontal } from "lucide-react";
import { countries, jobCategories, jobs } from "@/data";
import { experienceLevels, type JobDirectoryFilters } from "@/lib/job-search";
import styles from "./Jobs.module.css";

const employers = Array.from(new Set(jobs.map((job) => job.employer))).sort();

export default function JobFilters({ filters, onChange, totalResults }: {
  filters: JobDirectoryFilters;
  onChange: (filters: JobDirectoryFilters, replace?: boolean) => void;
  totalResults: number;
}) {
  const update = (key: keyof JobDirectoryFilters, value: string | number | boolean | undefined, replace = false) => onChange({ ...filters, [key]: value, page: 1 }, replace);
  const content = (prefix: string) => (
    <div className={styles.filterFields}>
      <div><label htmlFor={`${prefix}-keyword`}>Keyword</label><input id={`${prefix}-keyword`} value={filters.keyword ?? ""} onChange={(e) => update("keyword", e.target.value || undefined, true)} placeholder="Job title, skill…" /></div>
      <div><label htmlFor={`${prefix}-country`}>Destination</label><select id={`${prefix}-country`} value={filters.country ?? ""} onChange={(e) => update("country", e.target.value || undefined)}><option value="">All destinations</option>{countries.map((country) => <option key={country.slug} value={country.slug}>{country.shortName ?? country.name}</option>)}</select></div>
      <div><label htmlFor={`${prefix}-category`}>Career field</label><select id={`${prefix}-category`} value={filters.category ?? ""} onChange={(e) => update("category", e.target.value || undefined)}><option value="">All career fields</option>{jobCategories.map((category) => <option key={category.slug} value={category.slug}>{category.name}</option>)}</select></div>
      <div><label htmlFor={`${prefix}-salary`}>Minimum monthly salary (LKR)</label><input id={`${prefix}-salary`} type="number" min={0} step={1000} inputMode="numeric" value={filters.salaryMin ?? ""} onChange={(e) => update("salaryMin", e.target.value ? Number(e.target.value) : undefined, true)} placeholder="e.g. 150000" aria-describedby={`${prefix}-salary-help`} /><p id={`${prefix}-salary-help`}>Includes salary ranges that reach this amount.</p></div>
      <div><label htmlFor={`${prefix}-experience`}>Experience</label><select id={`${prefix}-experience`} value={filters.experience ?? ""} onChange={(e) => update("experience", e.target.value || undefined)}><option value="">Any experience</option>{experienceLevels.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}</select></div>
      <div><label htmlFor={`${prefix}-employer`}>Employer</label><select id={`${prefix}-employer`} value={filters.employer ?? ""} onChange={(e) => update("employer", e.target.value || undefined)}><option value="">All sample employers</option>{employers.map((employer) => <option key={employer} value={employer}>{employer}</option>)}</select></div>
      <div><label htmlFor={`${prefix}-posted`}>Date posted</label><select id={`${prefix}-posted`} value={filters.datePosted ?? ""} onChange={(e) => update("datePosted", e.target.value || undefined)}><option value="">Any time</option><option value="7">Past 7 days</option><option value="30">Past 30 days</option><option value="90">Past 90 days</option></select></div>
      <div className={styles.checks}><label><input type="checkbox" checked={filters.featured ?? false} onChange={(e) => update("featured", e.target.checked || undefined)} />Featured only</label><label><input type="checkbox" checked={filters.closingSoon ?? false} onChange={(e) => update("closingSoon", e.target.checked || undefined)} />Closing soon</label></div>
      <button type="button" className={styles.clearButton} onClick={() => onChange({})}>Clear Filters</button>
    </div>
  );
  return (
    <>
      <aside className={styles.sidebar} aria-label="Job filters"><h2><SlidersHorizontal size={18} aria-hidden="true" /> Refine your search</h2>{content("desktop-filter")}</aside>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.overlay} />
        <Dialog.Content className={styles.drawer}>
          <div className={styles.drawerHeader}><Dialog.Title>Filter opportunities</Dialog.Title><Dialog.Close className={styles.iconButton} aria-label="Close filters"><X size={22} aria-hidden="true" /></Dialog.Close></div>
          <Dialog.Description className={styles.drawerDescription}>Refine the sample vacancies by your preferences. Selections update the results immediately.</Dialog.Description>
          <div className={styles.drawerBody}>{content("mobile-filter")}</div>
          <div className={styles.drawerFooter}><Dialog.Close className={styles.primary}>View {totalResults} {totalResults === 1 ? "result" : "results"}</Dialog.Close></div>
        </Dialog.Content>
      </Dialog.Portal>
    </>
  );
}
