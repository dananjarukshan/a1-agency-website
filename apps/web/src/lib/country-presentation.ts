import type { Country, Job, JobCategory } from "@/types";

/** Match the Jobs directory's published sample set, including expired examples. */
export function countrySampleJobs(jobs: Job[], slug: string): Job[] {
  return jobs.filter((job) => job.country === slug && job.status === "active");
}

export function countryMatchesRegion(country: Country, region: string): boolean {
  if (!region || country.region === region) return true;
  // Europe also includes Europe & Asia; Southeast Asia remains its own region.
  return country.region.split(" & ").includes(region);
}

export function filterCountries(countries: Country[], search: string, region: string): Country[] {
  const query = search.trim().toLocaleLowerCase("en");
  return countries.filter((country) => countryMatchesRegion(country, region) &&
    [country.name, country.shortName ?? "", country.slug.replaceAll("-", " ")]
      .some((name) => name.toLocaleLowerCase("en").includes(query)));
}

export function relatedCountries(countries: Country[], current: Country, limit = 3): Country[] {
  const regionParts = current.region.split(" & ");
  const rank = (country: Country) => {
    if (country.region === current.region) return 0;
    return country.region.split(" & ").some((part) => regionParts.includes(part)) ? 1 : 2;
  };
  return countries.filter((country) => country.slug !== current.slug)
    .sort((a, b) => rank(a) - rank(b)).slice(0, limit);
}

/** Only exact catalog-name matches produce links; never guess a category slug. */
export function countryCategoryHref(label: string, categories: Pick<JobCategory, "name" | "slug">[]): string | undefined {
  const category = categories.find((item) => item.name.toLocaleLowerCase("en") === label.toLocaleLowerCase("en"));
  return category ? `/job-categories/${category.slug}` : undefined;
}
