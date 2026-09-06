"use client";

import { useState, useCallback, useEffect } from "react";
import { Search, SlidersHorizontal, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { countries, jobCategories, jobs } from "@/data";
import type { JobSearchFilters } from "@/types";

interface JobFiltersProps {
  filters: JobSearchFilters;
  onFiltersChange: (f: JobSearchFilters) => void;
  totalResults: number;
  className?: string;
}

const experienceLevels = [
  { value: "", label: "Any Experience" },
  { value: "no-experience", label: "No Experience Required" },
  { value: "entry", label: "Entry Level (1-2 years)" },
  { value: "mid", label: "Mid Level (3-5 years)" },
  { value: "senior", label: "Senior Level (5+ years)" },
] as const;

const sortOptions = [
  { value: "latest", label: "Latest First" },
  { value: "salary-high", label: "Salary: High to Low" },
  { value: "salary-low", label: "Salary: Low to High" },
  { value: "closing", label: "Closing Soon" },
] as const;

const employers = Array.from(new Set(jobs.map((job) => job.employer))).sort();
const currencies = Array.from(new Set(jobs.map((job) => job.currency))).sort();

export default function JobFilters({
  filters,
  onFiltersChange,
  totalResults,
  className,
}: JobFiltersProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const updateFilter = useCallback(
    <K extends keyof JobSearchFilters>(key: K, value: JobSearchFilters[K]) => {
      onFiltersChange({ ...filters, [key]: value, page: 1 });
    },
    [filters, onFiltersChange]
  );

  const clearFilters = () => {
    onFiltersChange({});
  };

  const hasActiveFilters =
    filters.keyword ||
    filters.country ||
    filters.category ||
    filters.currency ||
    filters.salaryMin ||
    filters.experience ||
    filters.employer ||
    filters.datePosted ||
    filters.featured ||
    filters.closingSoon;

  useEffect(() => {
    if (!mobileOpen) return;

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [mobileOpen]);

  const renderFiltersContent = (idPrefix: string) => (
    <div className="space-y-5">
      {/* Keyword */}
      <div>
        <label htmlFor={`${idPrefix}-keyword`} className="form-label">
          Keyword
        </label>
        <div className="relative">
          <Search
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            aria-hidden="true"
          />
          <input
            id={`${idPrefix}-keyword`}
            type="text"
            placeholder="Job title, skill..."
            value={filters.keyword ?? ""}
            onChange={(e) => updateFilter("keyword", e.target.value)}
            className="form-input pl-9"
          />
        </div>
      </div>

      {/* Country */}
      <div>
        <label htmlFor={`${idPrefix}-country`} className="form-label">
          Country
        </label>
        <div className="relative">
          <select
            id={`${idPrefix}-country`}
            value={filters.country ?? ""}
            onChange={(e) => updateFilter("country", e.target.value)}
            className="form-input appearance-none pr-8"
          >
            <option value="">All Countries</option>
            {countries.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.flag} {c.name}
              </option>
            ))}
          </select>
          <ChevronDown
            size={15}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
            aria-hidden="true"
          />
        </div>
      </div>

      {/* Category */}
      <div>
        <label htmlFor={`${idPrefix}-category`} className="form-label">
          Job Category
        </label>
        <div className="relative">
          <select
            id={`${idPrefix}-category`}
            value={filters.category ?? ""}
            onChange={(e) => updateFilter("category", e.target.value)}
            className="form-input appearance-none pr-8"
          >
            <option value="">All Categories</option>
            {jobCategories.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>
          <ChevronDown
            size={15}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
            aria-hidden="true"
          />
        </div>
      </div>

      {/* Salary */}
      <div>
        <p className="form-label">Minimum Advertised Salary</p>
        <div className="grid grid-cols-[88px_minmax(0,1fr)] gap-2">
          <label className="sr-only" htmlFor={`${idPrefix}-currency`}>Salary currency</label>
          <select
            id={`${idPrefix}-currency`}
            value={filters.currency ?? ""}
            onChange={(event) =>
              onFiltersChange({
                ...filters,
                currency: event.target.value || undefined,
                salaryMin: event.target.value ? filters.salaryMin : undefined,
                page: 1,
              })
            }
            className="form-input px-2"
          >
            <option value="">Any</option>
            {currencies.map((currency) => (
              <option key={currency} value={currency}>{currency}</option>
            ))}
          </select>
          <label className="sr-only" htmlFor={`${idPrefix}-salary-min`}>Minimum salary amount</label>
          <input
            id={`${idPrefix}-salary-min`}
            type="number"
            min={0}
            step={100}
            inputMode="numeric"
            disabled={!filters.currency}
            value={filters.salaryMin ?? ""}
            onChange={(event) =>
              updateFilter("salaryMin", event.target.value ? Number(event.target.value) : undefined)
            }
            placeholder="e.g. 1500"
            className="form-input disabled:cursor-not-allowed disabled:bg-slate-100"
          />
        </div>
        <p className="mt-1.5 text-[11px] leading-snug text-slate-500">
          Choose a currency before comparing salary amounts.
        </p>
      </div>

      {/* Experience */}
      <div>
        <label htmlFor={`${idPrefix}-experience`} className="form-label">
          Experience Level
        </label>
        <div className="relative">
          <select
            id={`${idPrefix}-experience`}
            value={filters.experience ?? ""}
            onChange={(e) =>
              updateFilter(
                "experience",
                e.target.value as JobSearchFilters["experience"]
              )
            }
            className="form-input appearance-none pr-8"
          >
            {experienceLevels.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <ChevronDown
            size={15}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
            aria-hidden="true"
          />
        </div>
      </div>

      {/* Employer */}
      <div>
        <label htmlFor={`${idPrefix}-employer`} className="form-label">Employer</label>
        <select
          id={`${idPrefix}-employer`}
          value={filters.employer ?? ""}
          onChange={(event) => updateFilter("employer", event.target.value || undefined)}
          className="form-input"
        >
          <option value="">All demo employers</option>
          {employers.map((employer) => (
            <option key={employer} value={employer}>{employer}</option>
          ))}
        </select>
      </div>

      {/* Date posted */}
      <div>
        <label htmlFor={`${idPrefix}-date-posted`} className="form-label">Date Posted</label>
        <select
          id={`${idPrefix}-date-posted`}
          value={filters.datePosted ?? ""}
          onChange={(event) =>
            updateFilter("datePosted", (event.target.value || undefined) as JobSearchFilters["datePosted"])
          }
          className="form-input"
        >
          <option value="">Any time</option>
          <option value="7">Past 7 days</option>
          <option value="30">Past 30 days</option>
          <option value="90">Past 90 days</option>
        </select>
      </div>

      {/* Toggles */}
      <div className="space-y-2.5">
        <label className="flex items-center gap-2.5 cursor-pointer group">
          <input
            type="checkbox"
            checked={filters.featured ?? false}
            onChange={(e) => updateFilter("featured", e.target.checked || undefined)}
            className="w-4 h-4 rounded border-slate-300 text-[#0f1f3d] focus:ring-[#0f1f3d]"
            aria-label="Show featured jobs only"
          />
          <span className="text-sm text-slate-700 group-hover:text-[#0f1f3d] transition-colors">
            Featured Jobs Only
          </span>
        </label>
        <label className="flex items-center gap-2.5 cursor-pointer group">
          <input
            type="checkbox"
            checked={filters.closingSoon ?? false}
            onChange={(e) => updateFilter("closingSoon", e.target.checked || undefined)}
            className="w-4 h-4 rounded border-slate-300 text-[#0f1f3d] focus:ring-[#0f1f3d]"
            aria-label="Show jobs closing soon"
          />
          <span className="text-sm text-slate-700 group-hover:text-[#0f1f3d] transition-colors">
            Closing Soon
          </span>
        </label>
      </div>

      {/* Clear */}
      {hasActiveFilters && (
        <button
          onClick={clearFilters}
          className="w-full btn btn-secondary btn-sm"
          aria-label="Clear all active filters"
        >
          <X size={14} />
          Clear Filters
        </button>
      )}
    </div>
  );

  return (
    <>
      {/* Mobile filter toggle */}
      <div className="lg:hidden flex items-center justify-between mb-4">
        <p className="text-sm text-slate-600">
          <strong>{totalResults}</strong> jobs found
        </p>
        <button
          onClick={() => setMobileOpen(true)}
          className="flex items-center gap-2 btn btn-secondary btn-sm"
          aria-expanded={mobileOpen}
          aria-controls="mobile-filters"
          aria-label="Open job filters"
        >
          <SlidersHorizontal size={15} />
          Filters
          {hasActiveFilters && (
            <span className="ml-1 w-5 h-5 rounded-full bg-[#0f1f3d] text-white text-xs flex items-center justify-center">
              !
            </span>
          )}
        </button>
      </div>

      {/* Mobile filter drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
          {/* Drawer */}
          <div
            id="mobile-filters"
            className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-white shadow-2xl flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-label="Job filters"
          >
            <div className="flex items-center justify-between p-4 border-b border-slate-200">
              <h2 className="font-bold text-[#0f1f3d]">Filter Jobs</h2>
              <button
                autoFocus
                onClick={() => setMobileOpen(false)}
                className="p-2 hover:bg-slate-100 rounded-md transition-colors"
                aria-label="Close filters"
              >
                <X size={18} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              {renderFiltersContent("mobile-filter")}
            </div>
            <div className="p-4 border-t border-slate-200">
              <button
                onClick={() => setMobileOpen(false)}
                className="w-full btn btn-primary"
              >
                Show {totalResults} Results
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside
        className={cn(
          "hidden lg:block bg-white border border-slate-200 rounded-xl p-5 sticky top-28",
          className
        )}
        aria-label="Job filters"
      >
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-bold text-[#0f1f3d] flex items-center gap-2">
            <SlidersHorizontal size={16} />
            Filter Jobs
          </h2>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="text-xs text-slate-500 hover:text-[#0f1f3d] flex items-center gap-1"
            >
              <X size={12} />
              Clear
            </button>
          )}
        </div>
        {renderFiltersContent("desktop-filter")}
      </aside>
    </>
  );
}

export { sortOptions };
