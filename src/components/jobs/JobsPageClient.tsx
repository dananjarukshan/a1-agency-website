"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import JobCard from "@/components/jobs/JobCard";
import JobFilters, { sortOptions } from "@/components/jobs/JobFilters";
import EmptyState from "@/components/common/EmptyState";
import { jobs as allJobs } from "@/data";
import type { JobSearchFilters, Job } from "@/types";
import { isClosingSoon } from "@/lib/utils";

const JOBS_PER_PAGE = 9;

function filterJobs(jobs: Job[], filters: JobSearchFilters): Job[] {
  let result = jobs.filter((j) => j.status === "active");

  if (filters.keyword) {
    const kw = filters.keyword.toLowerCase();
    result = result.filter(
      (j) =>
        j.title.toLowerCase().includes(kw) ||
        j.categoryName.toLowerCase().includes(kw) ||
        j.countryName.toLowerCase().includes(kw) ||
        j.description.toLowerCase().includes(kw)
    );
  }

  if (filters.country) {
    result = result.filter((j) => j.country === filters.country);
  }

  if (filters.category) {
    result = result.filter((j) => j.categorySlug === filters.category);
  }

  if (filters.currency) {
    result = result.filter((j) => j.currency === filters.currency);
  }

  const salaryMin = filters.salaryMin;
  if (salaryMin) {
    result = result.filter((j) => (j.salaryMax ?? j.salaryMin ?? 0) >= salaryMin);
  }

  if (filters.experience) {
    result = result.filter((j) => j.experience === filters.experience);
  }

  if (filters.employer) {
    result = result.filter((j) => j.employer === filters.employer);
  }

  if (filters.datePosted) {
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - Number(filters.datePosted));
    result = result.filter((j) => new Date(j.publishedDate) >= cutoff);
  }

  if (filters.featured) {
    result = result.filter((j) => j.featured);
  }

  if (filters.closingSoon) {
    result = result.filter((j) => isClosingSoon(j.closingDate));
  }

  // Sort
  switch (filters.sortBy ?? "latest") {
    case "salary-high":
      result = [...result].sort((a, b) => (b.salaryMax ?? 0) - (a.salaryMax ?? 0));
      break;
    case "salary-low":
      result = [...result].sort((a, b) => (a.salaryMin ?? 0) - (b.salaryMin ?? 0));
      break;
    case "closing":
      result = [...result].sort(
        (a, b) => new Date(a.closingDate).getTime() - new Date(b.closingDate).getTime()
      );
      break;
    default:
      result = [...result].sort(
        (a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime()
      );
  }

  return result;
}

export default function JobsPageClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [filters, setFilters] = useState<JobSearchFilters>(() => ({
    keyword: searchParams.get("q") ?? undefined,
    country: searchParams.get("country") ?? undefined,
    category: searchParams.get("category") ?? undefined,
    currency: searchParams.get("currency") ?? undefined,
    salaryMin: searchParams.get("salaryMin")
      ? Number(searchParams.get("salaryMin"))
      : undefined,
    experience: (searchParams.get("experience") as JobSearchFilters["experience"]) ?? undefined,
    employer: searchParams.get("employer") ?? undefined,
    datePosted: (searchParams.get("datePosted") as JobSearchFilters["datePosted"]) ?? undefined,
    featured: searchParams.get("featured") === "true" ? true : undefined,
    closingSoon: searchParams.get("closingSoon") === "true" ? true : undefined,
    sortBy: (searchParams.get("sort") as JobSearchFilters["sortBy"]) ?? "latest",
    page: Number(searchParams.get("page") ?? "1"),
  }));

  const filtered = useMemo(() => filterJobs(allJobs, filters), [filters]);
  const page = filters.page ?? 1;
  const totalPages = Math.ceil(filtered.length / JOBS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * JOBS_PER_PAGE, page * JOBS_PER_PAGE);

  // Sync filters to URL
  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.keyword) params.set("q", filters.keyword);
    if (filters.country) params.set("country", filters.country);
    if (filters.category) params.set("category", filters.category);
    if (filters.currency) params.set("currency", filters.currency);
    if (filters.salaryMin) params.set("salaryMin", String(filters.salaryMin));
    if (filters.experience) params.set("experience", filters.experience);
    if (filters.employer) params.set("employer", filters.employer);
    if (filters.datePosted) params.set("datePosted", filters.datePosted);
    if (filters.featured) params.set("featured", "true");
    if (filters.closingSoon) params.set("closingSoon", "true");
    if (filters.sortBy && filters.sortBy !== "latest") params.set("sort", filters.sortBy);
    if ((filters.page ?? 1) > 1) params.set("page", String(filters.page));
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [filters, router, pathname]);

  const handleFiltersChange = useCallback((newFilters: JobSearchFilters) => {
    setFilters(newFilters);
  }, []);

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Filters sidebar */}
      <div className="lg:w-64 xl:w-72 flex-shrink-0">
        <JobFilters
          filters={filters}
          onFiltersChange={handleFiltersChange}
          totalResults={filtered.length}
        />
      </div>

      {/* Results */}
      <div className="flex-1 min-w-0">
        {/* Results bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
          <p className="text-sm text-slate-600">
            Showing{" "}
            <strong className="text-[#0f1f3d]">{paginated.length}</strong> of{" "}
            <strong className="text-[#0f1f3d]">{filtered.length}</strong> jobs
          </p>
          <div className="flex items-center gap-2">
            <label htmlFor="sort-select" className="text-sm text-slate-500">
              Sort by:
            </label>
            <div className="relative">
              <select
                id="sort-select"
                value={filters.sortBy ?? "latest"}
                onChange={(e) =>
                  setFilters((f) => ({
                    ...f,
                    sortBy: e.target.value as JobSearchFilters["sortBy"],
                    page: 1,
                  }))
                }
                className="text-sm border border-slate-200 rounded-md px-3 py-1.5 pr-8 bg-white text-slate-700 appearance-none outline-none focus:border-[#0f1f3d]"
              >
                {sortOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={13}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
              />
            </div>
          </div>
        </div>

        {/* Grid */}
        {paginated.length === 0 ? (
          <EmptyState
            title="No Jobs Found"
            description="No vacancies match your current filters. Try adjusting or clearing the filters to see more results."
            actionLabel="Clear Filters"
            onAction={() => setFilters({})}
          />
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-5">
              {paginated.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-10 flex items-center justify-center gap-2">
                <button
                  disabled={page <= 1}
                  onClick={() => setFilters((f) => ({ ...f, page: (f.page ?? 1) - 1 }))}
                  className="btn btn-secondary btn-sm disabled:opacity-40 disabled:cursor-not-allowed"
                  aria-label="Previous page"
                >
                  Previous
                </button>
                <div className="flex gap-1">
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setFilters((f) => ({ ...f, page: i + 1 }))}
                      className={`w-9 h-9 rounded-md text-sm font-medium transition-colors ${
                        page === i + 1
                          ? "bg-[#0f1f3d] text-white"
                          : "border border-slate-200 text-slate-600 hover:border-[#0f1f3d]"
                      }`}
                      aria-label={`Go to page ${i + 1}`}
                      aria-current={page === i + 1 ? "page" : undefined}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
                <button
                  disabled={page >= totalPages}
                  onClick={() => setFilters((f) => ({ ...f, page: (f.page ?? 1) + 1 }))}
                  className="btn btn-secondary btn-sm disabled:opacity-40 disabled:cursor-not-allowed"
                  aria-label="Next page"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
