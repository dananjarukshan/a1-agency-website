import type { Country, Job, JobCategory } from "@/types";

/** Same published sample set as /jobs?category=, including expired examples. */
export function categorySampleJobs(jobs: Job[], slug: string): Job[] {
  return jobs.filter((job) => job.status === "active" && job.categorySlug === slug);
}

export function categorySampleCountries(countries: Country[], jobs: Job[]): Country[] {
  const slugs = new Set(jobs.map((job) => job.country));
  return countries.filter((country) => slugs.has(country.slug));
}

export function filterCategories<T extends Pick<JobCategory, "name" | "slug">>(categories: T[], search: string): T[] {
  const query = search.trim().toLocaleLowerCase("en");
  return categories.filter((category) => [category.name, category.slug.replaceAll("-", " ")]
    .some((value) => value.toLocaleLowerCase("en").includes(query)));
}

export function relatedCategories(categories: JobCategory[], current: JobCategory, limit = 3): JobCategory[] {
  return categories.filter((category) => category.slug !== current.slug)
    .sort((a, b) => Number(b.agencyConfirmed) - Number(a.agencyConfirmed)).slice(0, limit);
}
