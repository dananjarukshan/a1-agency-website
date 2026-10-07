import type { Job, JobSearchFilters } from "@/types";
import { jobClosingState } from "./job-presentation";

export type JobDirectoryFilters = Omit<JobSearchFilters, "currency">;
export const JOBS_PER_PAGE = 9;
export const experienceLevels = [
  { value: "no-experience", label: "No Experience Required" },
  { value: "entry", label: "Entry Level (1-2 years)" },
  { value: "mid", label: "Mid Level (3-5 years)" },
  { value: "senior", label: "Senior Level (5+ years)" },
] as const;
export const sortOptions = [
  { value: "latest", label: "Latest first" },
  { value: "salary-high", label: "Salary: high to low" },
  { value: "salary-low", label: "Salary: low to high" },
  { value: "closing", label: "Closing date" },
] as const;

export function parseJobFilters(params: Pick<URLSearchParams, "get">): JobDirectoryFilters {
  const salary = Number(params.get("salaryMin"));
  const page = Number(params.get("page") ?? 1);
  const experience = experienceLevels.find((item) => item.value === params.get("experience"))?.value;
  const sortBy = sortOptions.find((item) => item.value === params.get("sort"))?.value ?? "latest";
  const datePosted = ["7", "30", "90"].includes(params.get("datePosted") ?? "") ? params.get("datePosted") as JobDirectoryFilters["datePosted"] : undefined;
  return {
    keyword: params.get("q") || undefined, country: params.get("country") || undefined,
    category: params.get("category") || undefined, employer: params.get("employer") || undefined,
    salaryMin: Number.isFinite(salary) && salary > 0 ? salary : undefined,
    experience, sortBy, datePosted,
    featured: params.get("featured") === "true" || undefined,
    closingSoon: params.get("closingSoon") === "true" || undefined,
    page: Number.isInteger(page) && page > 0 ? page : 1,
  };
}

export function jobSearchQuery(filters: JobDirectoryFilters): string {
  const params = new URLSearchParams();
  if (filters.keyword) params.set("q", filters.keyword);
  if (filters.country) params.set("country", filters.country);
  if (filters.category) params.set("category", filters.category);
  if (filters.salaryMin && Number.isFinite(filters.salaryMin) && filters.salaryMin > 0) params.set("salaryMin", String(filters.salaryMin));
  if (filters.experience) params.set("experience", filters.experience);
  if (filters.employer) params.set("employer", filters.employer);
  if (filters.datePosted) params.set("datePosted", filters.datePosted);
  if (filters.featured) params.set("featured", "true");
  if (filters.closingSoon) params.set("closingSoon", "true");
  if (filters.sortBy && filters.sortBy !== "latest") params.set("sort", filters.sortBy);
  if ((filters.page ?? 1) > 1) params.set("page", String(filters.page));
  return params.toString();
}

export function filterJobs(jobs: Job[], filters: JobDirectoryFilters, now = new Date()): Job[] {
  let result = jobs.filter((job) => job.status === "active");
  if (filters.keyword) {
    const keyword = filters.keyword.toLowerCase();
    result = result.filter((job) => [job.title, job.categoryName, job.countryName, job.description].some((value) => value.toLowerCase().includes(keyword)));
  }
  if (filters.country) result = result.filter((job) => job.country === filters.country);
  if (filters.category) result = result.filter((job) => job.categorySlug === filters.category);
  // Preserve the existing threshold semantics: the advertised range can reach this amount.
  if (filters.salaryMin) result = result.filter((job) => (job.salaryMax ?? job.salaryMin ?? 0) >= filters.salaryMin!);
  if (filters.experience) result = result.filter((job) => job.experience === filters.experience);
  if (filters.employer) result = result.filter((job) => job.employer === filters.employer);
  if (filters.datePosted) {
    const cutoff = new Date(now);
    cutoff.setDate(cutoff.getDate() - Number(filters.datePosted));
    result = result.filter((job) => new Date(job.publishedDate) >= cutoff);
  }
  if (filters.featured) result = result.filter((job) => job.featured);
  if (filters.closingSoon) result = result.filter((job) => jobClosingState(job.closingDate, now).closingSoon);
  switch (filters.sortBy) {
    case "salary-high": return result.sort((a, b) => (b.salaryMax ?? 0) - (a.salaryMax ?? 0));
    case "salary-low": return result.sort((a, b) => (a.salaryMin ?? 0) - (b.salaryMin ?? 0));
    case "closing": return result.sort((a, b) => Date.parse(a.closingDate) - Date.parse(b.closingDate));
    default: return result.sort((a, b) => Date.parse(b.publishedDate) - Date.parse(a.publishedDate));
  }
}

export function paginateJobs(jobs: Job[], requestedPage = 1) {
  const totalPages = Math.max(1, Math.ceil(jobs.length / JOBS_PER_PAGE));
  const page = Math.min(totalPages, Math.max(1, Number.isInteger(requestedPage) ? requestedPage : 1));
  return { page, totalPages, jobs: jobs.slice((page - 1) * JOBS_PER_PAGE, page * JOBS_PER_PAGE) };
}
